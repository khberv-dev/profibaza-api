# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run start:dev       # watch mode (recommended during development)
npm run start:debug     # debug + watch mode

# Build & production
npm run build           # compile TypeScript
npm run start:prod      # run compiled output

# Code quality
npm run lint            # ESLint with auto-fix
npm run format          # Prettier format

# Testing
npm run test            # run all unit tests
npm run test:watch      # watch mode
npm run test:cov        # with coverage
npm run test:e2e        # end-to-end tests

# Database (Prisma)
npx prisma migrate dev  # apply migrations in dev
npx prisma generate     # regenerate Prisma client after schema changes
npx prisma studio       # open Prisma Studio GUI
```

To run a single test file: `npx jest src/modules/worker/worker.service.spec.ts`

## Environment Variables

Required in `.env`:
```
DATABASE_URL=           # PostgreSQL connection string
PORT=8080
JWT_KEY=                # JWT signing secret
HOST_URL=               # Base URL for file serving
PAYME_SUBSCRIBE_API_URL=
PAYME_SUBSCRIBE_API_ID=
PAYME_SUBSCRIBE_API_KEY=
SMS_SERVICE_URL=
SMS_SERVICE_LOGIN=
SMS_SERVICE_PASSWORD=
```

## Architecture

**Stack**: NestJS 11 + TypeScript, PostgreSQL via Prisma ORM, JWT/Passport auth.

**API**: Global prefix `/api`, Swagger UI at `/docs`, port 8080 by default. Static files served from `./files/` at `/public`.

### Module Structure

Each feature module follows a **Controller → Service → Repository** pattern:
- **Repository**: wraps Prisma queries (data access only)
- **Service**: business logic, throws `BadRequestException` with `{ ok: false, message: { uz: '...' } }` shape
- **Controller**: HTTP layer, uses decorators for auth

Some services bypass the repository layer and call `DatabaseService` (which extends `PrismaClient`) directly for simple queries.

Modules under `src/modules/`:
| Module | Purpose |
|---|---|
| `auth` | Login, register, OTP send/verify |
| `user` | Profile update, avatar, password reset |
| `worker` | Worker professions, documents, orders, resume PDF generation |
| `client` | Client orders, comments |
| `legal` | Legal entity profile, vacancies, offers |
| `investor` | Investor profile, projects, vacancies |
| `suggestion` | Public search: workers by order/location, professions, investor listings |
| `payment` | Payme Subscribe card payments → user balance top-up |
| `admin` | Admin operations and initial data seeding (`init.service.ts`) |
| `cron` | Hourly worker profession rating recalculation |
| `document` | Shared document repository |
| `notification` | OTP via external SMS service |
| `database` | `DatabaseService` (PrismaClient singleton) |

### Authentication & Authorization

- Global `JwtAuthGuard` applied to all routes by default
- `@Public()` decorator marks routes as unauthenticated
- `@User()` decorator extracts the JWT payload from the request
- JWT payload shape (`JwtPayload`): `{ sub: userId, role, active, roleUID }`
  - `roleUID` is the profile id for the user's role (e.g., `Client.id`, `Worker.id`)
  - Workers start with `active: false`; all other roles auto-activate on registration

### Data Model Key Relationships

- `User` has one optional profile per role: `Client`, `Legal`, `Investor`, `Worker`, `Admin`
- `WorkerProfession` is the central entity for workers — it holds pricing, rating, schedule, locations, experience, and demo files
- `Order` belongs to a `WorkerProfession` and is created by `Client`, `Legal`, or `Investor`
- `Comment` belongs to an `Order` and optionally to a `Client`/`Legal`/`Investor`
- Worker `rating` on `WorkerProfession` is recalculated hourly by `RatingCron`
- Address fields (`address1`, `address2`, `address3`) map to region/district/village from static JSON assets in `src/assets/location/`

### Response Convention

All responses follow `{ ok: true, data: ... }` on success or `{ ok: false, message: { uz: '...' } }` on error. Error messages are in Uzbek.

### File Storage

Files are stored locally under `./files/` at the process working directory:
- `files/document/` — worker/client/legal/investor documents
- `files/demo/` — worker profession demo files
- `files/resume/` — generated PDF resumes (keyed by `workerProfessionId`)
- `files/avatar/` — user avatars

Multer interceptors handle uploads (`avatar.interceptor.ts`, `document.interceptor.ts`, etc.).
