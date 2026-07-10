# Profibaza API — Документация

## Changelog

### 2026-07-10
- Добавлено поле `workUnit` в `WorkerProfession` — единица измерения работы. Enum: `PIECE` (штука), `SQ_METER` (кв. м), `METER` (пог. м), `KILOGRAMM` (кг), `HOUR` (час). По умолчанию `null`. Доступно при создании и обновлении специальности (`POST /api/worker/profession`, `PUT /api/worker/profession/:id`).

---

**Base URL:** `http://localhost:8080/api`  
**Swagger UI:** `http://localhost:8080/docs`  
**Статические файлы:** `http://localhost:8080/public`

## Аутентификация

Все защищённые маршруты требуют заголовок:

```
Authorization: Bearer <token>
```

JWT-токен выдаётся при логине. Payload содержит: `sub` (userId), `role`, `active`, `roleUID` (id профиля роли).

---

## Содержание

- [Auth — Авторизация](#auth--авторизация)
- [User — Пользователь](#user--пользователь)
- [Client — Клиент](#client--клиент)
- [Worker — Работник](#worker--работник)
- [Legal — Юридическое лицо](#legal--юридическое-лицо)
- [Investor — Инвестор](#investor--инвестор)
- [Admin — Администратор](#admin--администратор)
- [Pay — Оплата](#pay--оплата)
- [Opt — Публичные данные](#opt--публичные-данные)

---

## Auth — Авторизация

### POST `/api/auth/login`
Вход по номеру телефона и паролю. Возвращает JWT-токен.

**Запрос:**
```json
{
  "phone": "998901234567",
  "password": "secret123"
}
```

**Ответ:**
```json
{
  "ok": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST `/api/auth/register`
Регистрация нового пользователя. Роли: `CLIENT`, `WORKER`, `LEGAL`, `INVESTOR`.

**Запрос:**
```json
{
  "name": "Алишер",
  "surname": "Каримов",
  "middleName": "Бахтиёрович",
  "gender": "MALE",
  "birthday": "1995-06-15",
  "phone": "998901234567",
  "email": "user@example.com",
  "password": "secret123",
  "role": "CLIENT",
  "address1": "Ташкент",
  "address2": "Юнусабад",
  "address3": "Чиланзар"
}
```

> Для роли `INVESTOR` дополнительно: `activityType` (string), `investmentAmount` (number).

**Ответ:**
```json
{ "ok": true }
```

---

### POST `/api/auth/send-otp?phone=998901234567`
Отправляет OTP-код на указанный номер телефона.

**Query параметр:** `phone` — номер в формате `998XXXXXXXXX`

**Ответ:**
```json
{ "ok": true }
```

---

### POST `/api/auth/verify-otp`
Верификация OTP-кода.

**Запрос:**
```json
{
  "phone": "998901234567",
  "code": "123456"
}
```

**Ответ:**
```json
{ "ok": true }
```

---

## User — Пользователь

> Все маршруты требуют JWT.

### GET `/api/user/me`
Получить данные текущего пользователя.

**Ответ:**
```json
{
  "ok": true,
  "data": {
    "id": "uuid",
    "name": "Алишер",
    "surname": "Каримов",
    "middleName": "Бахтиёрович",
    "phone": "998901234567",
    "email": "user@example.com",
    "gender": "MALE",
    "birthday": "1995-06-15T00:00:00.000Z",
    "avatar": "filename.jpg",
    "role": "CLIENT",
    "active": true,
    "balance": 0
  }
}
```

---

### PUT `/api/user/update`
Обновить ФИО, телефон или email пользователя.

**Запрос:**
```json
{
  "name": "Алишер",
  "surname": "Каримов",
  "middleName": "Бахтиёрович",
  "phone": "998901234567",
  "email": "new@example.com"
}
```

**Ответ:**
```json
{ "ok": true }
```

---

### PUT `/api/user/update-password`
Изменить пароль (требует старый пароль).

**Запрос:**
```json
{
  "oldPassword": "oldSecret",
  "password": "newSecret123"
}
```

**Ответ:**
```json
{ "ok": true }
```

---

### POST `/api/user/update-avatar`
Загрузить аватар пользователя. `multipart/form-data`, поле `file`.

**Ответ:**
```json
{ "ok": true }
```

---

### GET `/api/user/avatar`
Скачать аватар текущего пользователя. Возвращает файл изображения.

---

### POST `/api/user/request-reset-password` *(публичный)*
Запрос на сброс пароля — отправляет OTP на телефон.

**Запрос:**
```json
{ "phone": "998901234567" }
```

**Ответ:**
```json
{
  "ok": true,
  "data": { "requestId": "uuid" }
}
```

---

### POST `/api/user/reset-password` *(публичный)*
Сбросить пароль по коду из OTP.

**Запрос:**
```json
{
  "requestId": "uuid",
  "code": "123456",
  "password": "newSecret123"
}
```

**Ответ:**
```json
{ "ok": true }
```

---

### POST `/api/user/request-activation`
Запросить активацию аккаунта (для работников).

**Ответ:**
```json
{ "ok": true }
```

---

### POST `/api/user/process-activation`
Завершить процесс активации аккаунта.

**Ответ:**
```json
{ "ok": true }
```

---

## Client — Клиент

> Все маршруты требуют JWT. Роль: `CLIENT`.

### GET `/api/client/me`
Получить профиль клиента.

**Ответ:**
```json
{
  "ok": true,
  "data": {
    "id": "uuid",
    "address1": "Ташкент",
    "address2": "Юнусабад",
    "address3": "Чиланзар",
    "userId": "uuid"
  }
}
```

---

### PUT `/api/client/update-address`
Обновить адрес клиента.

**Запрос:**
```json
{
  "address1": "Ташкент",
  "address2": "Юнусабад",
  "address3": "Чиланзар"
}
```

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Ma'lumot yangilandi" }
}
```

---

### POST `/api/client/create-order`
Создать заказ для работника.

**Запрос:**
```json
{
  "workerProfessionId": "uuid",
  "description": "Нужно покрасить стены в квартире",
  "deadline": "2026-08-01",
  "address1": "Ташкент",
  "address2": "Юнусабад",
  "address3": "Чиланзар",
  "budget": 500000
}
```

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Buyurtma yaratildi va ustaga jo'natildi" }
}
```

---

### GET `/api/client/orders`
Получить список заказов клиента (включает комментарии и данные работника).

**Ответ:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "uuid",
      "description": "Нужно покрасить стены",
      "deadline": "2026-08-01T00:00:00.000Z",
      "status": "NEW",
      "budget": 500000,
      "address1": "Ташкент",
      "address2": "Юнусабад",
      "address3": "Чиланзар",
      "files": [],
      "comments": [],
      "workerProfession": {
        "worker": {
          "user": {
            "name": "Бобур",
            "surname": "Юсупов",
            "phone": "998901111111",
            "avatar": "filename.jpg"
          }
        }
      }
    }
  ]
}
```

---

### POST `/api/client/order/:id/upload-file`
Загрузить фото или видео к заказу. `multipart/form-data`, поле `file`.  
Допустимые форматы: `jpg`, `jpeg`, `png`, `mp4`, `avi`, `mkv`.

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Fayl yuklandi" }
}
```

---

### POST `/api/client/comment/:id`
Оставить отзыв к заказу (`:id` — ID заказа).

**Запрос:**
```json
{
  "comment": "Отличная работа, всем доволен",
  "rate": 5
}
```

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Izoh qabul qilindi" }
}
```

---

## Worker — Работник

> Все маршруты требуют JWT. Роль: `WORKER`.

### PUT `/api/worker/profile`
Обновить профиль работника (образование/должность).

**Запрос:**
```json
{
  "position": "DIPLOMA"
}
```

> `position`: `TEHNIKUM` | `DIPLOMA`

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Ma'lumot yangilandi" }
}
```

---

### GET `/api/worker/profession`
Получить все специальности работника.

**Ответ:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "uuid",
      "minPrice": 100000,
      "maxPrice": 500000,
      "rating": 4.5,
      "hasTeam": false,
      "teamMemberCount": 1,
      "readyForHugeProject": true,
      "inventory": "Кисти, валики",
      "competitions": "Первое место на выставке 2024",
      "jobType": "SOLO",
      "workUnit": "SQ_METER",
      "profession": { "nameUz": "Rassomlik", "nameRu": "Живопись" },
      "schedule": {
        "monday": true, "mondayStart": "09:00", "mondayEnd": "18:00",
        "tuesday": true, "tuesdayStart": "09:00", "tuesdayEnd": "18:00",
        "wednesday": true, "wednesdayStart": "09:00", "wednesdayEnd": "18:00",
        "thursday": true, "thursdayStart": "09:00", "thursdayEnd": "18:00",
        "friday": true, "fridayStart": "09:00", "fridayEnd": "18:00",
        "saturday": true, "saturdayStart": null, "saturdayEnd": null,
        "sunday": false, "sundayStart": null, "sundayEnd": null
      },
      "locations": [],
      "experience": [],
      "demos": []
    }
  ]
}
```

> `mondayStart`/`mondayEnd` = `null` означает режим **24/7** для этого дня.

---

### POST `/api/worker/profession`
Добавить специальность работнику.

**Запрос:**
```json
{
  "professionId": "uuid",
  "minPrice": 100000,
  "maxPrice": 500000,
  "hasTeam": false,
  "teamMemberCount": 1,
  "readyForHugeProject": false,
  "inventory": "Кисти, валики",
  "competitions": null,
  "jobType": "SOLO",
  "workUnit": "SQ_METER",
  "locations": [
    { "latitude": "41.2995", "longitude": "69.2401", "radius": 10 }
  ],
  "schedule": {
    "monday": true,
    "mondayStart": "09:00",
    "mondayEnd": "18:00",
    "tuesday": true,
    "tuesdayStart": null,
    "tuesdayEnd": null,
    "wednesday": false,
    "wednesdayStart": null,
    "wednesdayEnd": null,
    "thursday": true,
    "thursdayStart": "09:00",
    "thursdayEnd": "17:00",
    "friday": true,
    "fridayStart": "09:00",
    "fridayEnd": "17:00",
    "saturday": false,
    "saturdayStart": null,
    "saturdayEnd": null,
    "sunday": false,
    "sundayStart": null,
    "sundayEnd": null
  }
}
```

> `jobType`: `SOLO` | `EMPLOYEE` | `ABROAD`  
> `workUnit`: `PIECE` | `SQ_METER` | `METER` | `KILOGRAMM` | `HOUR` | `null` (опционально)  
> Время в формате `HH:MM`. `null` = 24/7 (если день активен).

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Mutaxasislik qo'shildi" }
}
```

---

### PUT `/api/worker/profession/:id`
Обновить специальность (`:id` — ID специальности).

**Запрос:** (все поля опциональные)
```json
{
  "minPrice": 150000,
  "maxPrice": 600000,
  "hasTeam": true,
  "teamMemberCount": 3,
  "inventory": "Компрессор, пульверизатор",
  "jobType": "EMPLOYEE",
  "readyForHugeProject": true,
  "schedule": {
    "monday": true,
    "mondayStart": "08:00",
    "mondayEnd": "20:00",
    "tuesday": true,
    "tuesdayStart": null,
    "tuesdayEnd": null,
    "wednesday": true,
    "wednesdayStart": "08:00",
    "wednesdayEnd": "20:00",
    "thursday": true,
    "thursdayStart": "08:00",
    "thursdayEnd": "20:00",
    "friday": true,
    "fridayStart": "08:00",
    "fridayEnd": "20:00",
    "saturday": false,
    "saturdayStart": null,
    "saturdayEnd": null,
    "sunday": false,
    "sundayStart": null,
    "sundayEnd": null
  }
}
```

**Ответ:**
```json
{ "ok": true }
```

---

### POST `/api/worker/profession/upload-demo/:id`
Загрузить демо-файл к специальности (`:id` — ID специальности).  
`multipart/form-data`, поле `file`. Форматы: `jpg`, `jpeg`, `png`, `mp4`, `avi`, `mkv`.

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Fayl qo'shildi" }
}
```

---

### GET `/api/worker/profession/demos/:id`
Получить демо-файлы специальности (`:id` — ID специальности).

**Ответ:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "uuid",
      "fileId": "abc123.jpg",
      "comment": null,
      "workerProfessionId": "uuid",
      "createdAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### POST `/api/worker/profession/:id/experience`
Добавить опыт работы к специальности (`:id` — ID специальности).

**Запрос:**
```json
{
  "startedAt": 2018,
  "endedAt": 2022,
  "jobPlace": "ООО СтройМастер",
  "jobDescription": "Малярные работы, покраска фасадов"
}
```

> `endedAt` — опционально (null = по настоящее время).

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Qo'shildi" }
}
```

---

### PUT `/api/worker/profession/experience/:id`
Обновить запись об опыте (`:id` — ID записи опыта).

**Запрос:** (все поля опциональные)
```json
{
  "startedAt": 2019,
  "endedAt": null,
  "jobPlace": "ООО РемонтПро",
  "jobDescription": "Руководитель малярной бригады"
}
```

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Ma'lumot yangilandi" }
}
```

---

### POST `/api/worker/upload-document`
Загрузить документ работника. `multipart/form-data`, поле `file`.

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Hujjat qo'shildi" }
}
```

---

### GET `/api/worker/documents`
Получить список документов работника.

**Ответ:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "uuid",
      "fileId": "doc_abc123.pdf",
      "type": "DIPLOMA",
      "workerId": "uuid"
    }
  ]
}
```

---

### GET `/api/worker/documents/:id`
Скачать документ по `fileId` (`:id` — `fileId`). Возвращает файл.

---

### GET `/api/worker/demos/:id`
Скачать демо-файл по `fileId` (`:id` — `fileId`). Возвращает файл.

---

### GET `/api/worker/new-orders`
Получить новые заказы (ещё не принятые в работу).

**Ответ:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "uuid",
      "description": "Покраска комнат",
      "deadline": "2026-08-01T00:00:00.000Z",
      "status": "NEW",
      "budget": 500000,
      "address1": "Ташкент",
      "client": {
        "address1": "Ташкент",
        "user": {
          "name": "Алишер",
          "surname": "Каримов",
          "phone": "998901234567",
          "avatar": "filename.jpg"
        }
      }
    }
  ]
}
```

---

### GET `/api/worker/orders?status=PROGRESS`
Получить заказы работника с фильтром по статусу.

**Query параметры:**
| Параметр | Тип | Описание |
|---|---|---|
| `status` | string | `NEW` \| `PROGRESS` \| `DONE` \| `REJECTED` (опционально) |

**Ответ:** аналогично `/worker/new-orders` (включает комментарии).

---

### POST `/api/worker/accept-order/:id`
Принять заказ в работу (статус → `PROGRESS`).

**Ответ:**
```json
{
  "ok": true,
  "message": "Buyurtma qabul qilindi"
}
```

---

### POST `/api/worker/reject-order/:id`
Отклонить заказ (статус → `REJECTED`).

**Ответ:**
```json
{
  "ok": true,
  "message": "Buyurtma bekor qilindi"
}
```

---

### POST `/api/worker/finish-order/:id`
Завершить заказ (статус → `DONE`). Требует минимум 3 загруженных материала.

**Ответ:**
```json
{
  "ok": true,
  "message": "Buyurtma yakunlandi"
}
```

---

### POST `/api/worker/upload-order-material/:id`
Загрузить фото/видео материал по завершённому заказу (`:id` — ID заказа).  
`multipart/form-data`, поле `file`. Форматы: `jpg`, `jpeg`, `png`, `mp4`, `avi`, `mkv`.

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Material yuklandi" }
}
```

---

### POST `/api/worker/feedback/:id`
Ответить на отзыв клиента (`:id` — ID комментария).

**Запрос:**
```json
{
  "feedback": "Спасибо за оценку, рады были помочь!"
}
```

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Izoh qoldirildi" }
}
```

---

### POST `/api/worker/create-offer`
Откликнуться на вакансию.

**Запрос:**
```json
{
  "vacancyId": "uuid",
  "workerProfessionId": "uuid"
}
```

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Taklif yuborildi" }
}
```

---

### GET `/api/worker/offers`
Получить список откликов работника на вакансии.

**Ответ:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "uuid",
      "status": "NEW",
      "message": null,
      "vacancy": {
        "title": "Маляр-штукатур",
        "description": "Требуется на постоянной основе",
        "salary": 3000000
      },
      "workerProfession": {
        "profession": { "nameUz": "Rassomlik", "nameRu": "Живопись" }
      }
    }
  ]
}
```

---

### GET `/api/worker/search-vacancies?search=маляр&minSalary=1000000&maxSalary=5000000`
Поиск вакансий по названию и диапазону зарплаты.

**Query параметры:**
| Параметр | Тип | Описание |
|---|---|---|
| `search` | string | Поисковая строка |
| `minSalary` | number | Минимальная зарплата (по умолчанию 0) |
| `maxSalary` | number | Максимальная зарплата (по умолчанию 0) |

**Ответ:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "uuid",
      "title": "Маляр-штукатур",
      "salary": 3000000,
      "description": "Требуется на постоянной основе",
      "legal": { "name": "ООО СтройГрупп" }
    }
  ]
}
```

---

### GET `/api/worker/download-resume/:id`
Скачать резюме работника в формате PDF (`:id` — ID специальности). Возвращает PDF-файл.

---

## Legal — Юридическое лицо

> Все маршруты требуют JWT. Роль: `LEGAL`.

### GET `/api/legal/me`
Получить профиль юридического лица.

**Ответ:**
```json
{
  "ok": true,
  "data": {
    "id": "uuid",
    "name": "ООО СтройГрупп",
    "address1": "Ташкент",
    "address2": "Яккасарай",
    "address3": "Центр"
  }
}
```

---

### PUT `/api/legal/update-profile`
Обновить название компании.

**Запрос:**
```json
{ "name": "ООО СтройГрупп Плюс" }
```

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Ma'lumot yangilandi" }
}
```

---

### PUT `/api/legal/update-address`
Обновить адрес юридического лица.

**Запрос:**
```json
{
  "address1": "Ташкент",
  "address2": "Яккасарай",
  "address3": "Центр"
}
```

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Ma'lumot yangilandi" }
}
```

---

### POST `/api/legal/create-order`
Создать заказ работнику.

**Запрос:** аналогично [`POST /api/client/create-order`](#post-apiclientcreate-order)

**Ответ:**
```json
{
  "ok": true,
  "message": { "uz": "Buyurtma yaratildi va ustaga jo'natildi" }
}
```

---

### GET `/api/legal/orders`
Получить заказы юридического лица.

**Ответ:** аналогично [`GET /api/client/orders`](#get-apiclientorders)

---

### POST `/api/legal/comment/:id`
Оставить отзыв к заказу.

**Запрос:** аналогично [`POST /api/client/comment/:id`](#post-apiclientcommentid)

---

### POST `/api/legal/contacts`
Добавить контактное лицо.

**Запрос:**
```json
{
  "person": "Иванов Иван",
  "contact": "998901234567",
  "type": "PHONE"
}
```

> `type`: `PHONE` | `EMAIL`

**Ответ:**
```json
{ "ok": true }
```

---

### GET `/api/legal/vacancies`
Получить список вакансий юридического лица.

**Ответ:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "uuid",
      "title": "Маляр-штукатур",
      "salary": 3000000,
      "description": "Требуется на постоянной основе",
      "active": true
    }
  ]
}
```

---

### GET `/api/legal/vacancies/:id`
Получить вакансию по ID.

**Ответ:**
```json
{
  "ok": true,
  "data": {
    "id": "uuid",
    "title": "Маляр-штукатур",
    "salary": 3000000,
    "description": "Требуется на постоянной основе",
    "active": true,
    "offers": []
  }
}
```

---

### POST `/api/legal/create-vacancy`
Создать вакансию.

**Запрос:**
```json
{
  "title": "Маляр-штукатур",
  "salary": 3000000,
  "description": "Требуется специалист для ремонтных работ"
}
```

**Ответ:**
```json
{ "ok": true }
```

---

### PUT `/api/legal/update-vacancy/:id`
Обновить вакансию (`:id` — ID вакансии).

**Запрос:** (все поля опциональные)
```json
{
  "title": "Электрик",
  "salary": 4000000,
  "description": "Опыт от 2 лет",
  "active": false
}
```

**Ответ:**
```json
{ "ok": true }
```

---

### GET `/api/legal/offers`
Получить отклики на вакансии.

**Ответ:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "uuid",
      "status": "NEW",
      "message": null,
      "workerProfession": {
        "worker": {
          "user": { "name": "Бобур", "phone": "998901111111" }
        }
      }
    }
  ]
}
```

---

### POST `/api/legal/accept-offer/:id`
Принять отклик работника (`:id` — ID отклика).

**Запрос:**
```json
{ "message": "Добро пожаловать в команду!" }
```

**Ответ:**
```json
{ "ok": true }
```

---

### POST `/api/legal/decline-offer/:id`
Отклонить отклик работника (`:id` — ID отклика).

**Запрос:**
```json
{ "message": "К сожалению, вакансия уже закрыта" }
```

**Ответ:**
```json
{ "ok": true }
```

---

## Investor — Инвестор

> Все маршруты требуют JWT. Роль: `INVESTOR`.

### GET `/api/investor/me`
Получить профиль инвестора.

**Ответ:**
```json
{
  "ok": true,
  "data": {
    "id": "uuid",
    "name": "Акционерное общество Иноком",
    "activityType": "Строительство",
    "investmentAmount": 5000000,
    "address1": "Ташкент",
    "address2": "Мирзо-Улугбек",
    "address3": null
  }
}
```

---

### PUT `/api/investor/update-address`
Обновить адрес инвестора.

**Запрос:** аналогично [`PUT /api/legal/update-address`](#put-apilegalupdate-address)

---

### POST `/api/investor/contacts`
Добавить контактное лицо.

**Запрос:** аналогично [`POST /api/legal/contacts`](#post-apilegalcontacts)

---

### GET `/api/investor/vacancies`
Получить вакансии инвестора.

**Ответ:** аналогично [`GET /api/legal/vacancies`](#get-apilegalvacancies)

---

### GET `/api/investor/vacancies/:id`
Получить вакансию по ID.

---

### POST `/api/investor/create-vacancy`
Создать вакансию.

**Запрос:** аналогично [`POST /api/legal/create-vacancy`](#post-apilegalcreate-vacancy)

---

### POST `/api/investor/projects`
Создать проект инвестора.

**Запрос:**
```json
{
  "capacity": "LARGE",
  "partners": ["ООО СтройПартнёр", "ИП Иванов"],
  "description": "Строительство жилого комплекса на 200 квартир",
  "employment": [
    {
      "profession": "Маляр",
      "count": 10,
      "startDate": "2026-09-01",
      "endDate": "2027-03-01",
      "employmentType": "CONTRACT",
      "workGraph": "FULLTIME"
    }
  ]
}
```

> `capacity`: `SMALL` | `MIDDLE` | `LARGE`  
> `employmentType`: `EMPLOYEE` | `FREELANCE` | `CONTRACT`  
> `workGraph`: `FULLTIME` | `PARTTIME` | `FLEX`

**Ответ:**
```json
{ "ok": true }
```

---

### GET `/api/investor/projects`
Получить проекты инвестора.

**Ответ:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "uuid",
      "status": "PLANNED",
      "capacity": "LARGE",
      "partners": ["ООО СтройПартнёр"],
      "description": "Строительство ЖК",
      "employment": [
        {
          "profession": "Маляр",
          "count": 10,
          "employmentType": "CONTRACT",
          "workGraph": "FULLTIME"
        }
      ]
    }
  ]
}
```

---

### POST `/api/investor/create-order`
Создать заказ работнику.

**Запрос:** аналогично [`POST /api/client/create-order`](#post-apiclientcreate-order)

---

### GET `/api/investor/orders`
Получить заказы инвестора.

---

### GET `/api/investor/offers`
Получить отклики на вакансии инвестора.

---

### POST `/api/investor/accept-offer/:id`
Принять отклик работника.

**Запрос:** аналогично [`POST /api/legal/accept-offer/:id`](#post-apilegalaccept-offerid)

---

### POST `/api/investor/decline-offer/:id`
Отклонить отклик работника.

**Запрос:** аналогично [`POST /api/legal/decline-offer/:id`](#post-apilegaldecline-offerid)

---

### POST `/api/investor/comment/:id`
Оставить отзыв к заказу.

**Запрос:** аналогично [`POST /api/client/comment/:id`](#post-apiclientcommentid)

---

## Admin — Администратор

> Все маршруты требуют JWT. Роль: `ADMIN`.

### GET `/api/admin/overall`
Получить общую статистику платформы (количество пользователей, заказов, транзакций).

**Ответ:**
```json
{
  "ok": true,
  "data": {
    "users": 1200,
    "orders": 340,
    "transactions": 150
  }
}
```

---

### GET `/api/admin/invoices?page=1&limit=10`
Получить список транзакций с пагинацией.

**Query параметры:**
| Параметр | Тип | По умолчанию | Описание |
|---|---|---|---|
| `page` | number | `1` | Номер страницы |
| `limit` | number | `10` | Количество записей |

**Ответ:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "uuid",
      "amount": 50000,
      "status": "PAID",
      "description": "Пополнение баланса",
      "createdAt": "2026-07-01T10:00:00.000Z",
      "user": { "name": "Алишер", "phone": "998901234567" }
    }
  ]
}
```

---

## Pay — Оплата

> Оплата через Payme Subscribe (пополнение баланса пользователя).

### POST `/api/pay/process-card`
Инициировать оплату банковской картой.

**Запрос:**
```json
{
  "invoice": "uuid-транзакции",
  "card": "8600123456781234",
  "expire": "0128"
}
```

**Ответ:**
```json
{
  "ok": true,
  "data": { "token": "payme_token_string" }
}
```

---

### POST `/api/pay/verify-card`
Подтвердить оплату OTP-кодом из SMS.

**Запрос:**
```json
{
  "invoice": "uuid-транзакции",
  "token": "payme_token_string",
  "code": "123456"
}
```

**Ответ:**
```json
{ "ok": true }
```

---

## Opt — Публичные данные

> Маршруты без аутентификации.

### GET `/api/opt/order/search`
Поиск специальностей работников по фильтрам.

**Query параметры:**
| Параметр | Тип | Описание |
|---|---|---|
| `minPrice` | number | Минимальная цена |
| `maxPrice` | number | Максимальная цена |
| `long` | number | Долгота (для геопоиска) |
| `lat` | number | Широта (для геопоиска) |
| `radius` | number | Радиус поиска (км) |
| `professions` | string | ID профессий через запятую |
| `address1` | string | Регион |
| `address2` | string | Район |
| `address3` | string | Населённый пункт |
| `day` | string | День недели: `monday` \| `tuesday` \| `wednesday` \| `thursday` \| `friday` \| `saturday` \| `sunday` |
| `time` | string | Время в формате `HH:MM` — фильтр по рабочим часам (работает только вместе с `day`) |

> Если `day` указан без `time` — возвращаются работники, у которых этот день рабочий.  
> Если указаны оба — дополнительно проверяется, что `time` входит в рабочие часы. Работники с `null` (режим 24/7) всегда проходят фильтр по времени.

**Ответ:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "uuid",
      "minPrice": 100000,
      "maxPrice": 500000,
      "rating": 4.5,
      "hasTeam": false,
      "teamMemberCount": 1,
      "readyForHugeProject": false,
      "jobType": "SOLO",
      "isBusy": false,
      "locations": [
        { "longitude": 69.2401, "latitude": 41.2995 }
      ],
      "profession": { "nameUz": "Rassomlik", "nameRu": "Живопись" },
      "worker": {
        "address1": "Ташкент",
        "address2": "Юнусабад",
        "address3": "Чиланзар",
        "user": { "name": "Бобур", "surname": "Юсупов", "middleName": "Акбарович", "avatar": "filename.jpg" }
      }
    }
  ]
}
```

> `isBusy: true` — у работника есть активный заказ в статусе `PROGRESS`.

---

### GET `/api/opt/order/search/:id`
Получить специальность работника по ID.

**Ответ:**
```json
{
  "ok": true,
  "data": {
    "id": "uuid",
    "minPrice": 100000,
    "maxPrice": 500000,
    "rating": 4.8,
    "hasTeam": false,
    "inventory": "Кисти, валики",
    "schedule": { "monday": true, "mondayStart": "09:00", "mondayEnd": "18:00" },
    "experience": [],
    "demos": []
  }
}
```

---

### GET `/api/opt/professions`
Получить все категории профессий со списком профессий.

**Ответ:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "uuid",
      "nameUz": "Qurilish",
      "nameRu": "Строительство",
      "professions": [
        { "id": "uuid", "nameUz": "Rassomlik", "nameRu": "Живопись" }
      ]
    }
  ]
}
```

---

### POST `/api/opt/professions`
Создать категорию профессии с вложенными профессиями.

**Запрос:**
```json
{
  "nameUz": "Qurilish",
  "nameRu": "Строительство",
  "professions": [
    { "nameUz": "Rassomlik", "nameRu": "Живопись" },
    { "nameUz": "Gips", "nameRu": "Штукатурка" }
  ]
}
```

**Ответ:**
```json
{ "ok": true }
```

---

### GET `/api/opt/investor`
Получить список всех инвесторов (публичные данные).

**Ответ:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "uuid",
      "name": "АО Иноком",
      "activityType": "Строительство",
      "investmentAmount": 5000000,
      "address1": "Ташкент"
    }
  ]
}
```

---

### GET `/api/opt/investor/:id`
Получить данные инвестора по ID.

**Ответ:**
```json
{
  "ok": true,
  "data": {
    "id": "uuid",
    "name": "АО Иноком",
    "activityType": "Строительство",
    "investmentAmount": 5000000,
    "projects": [],
    "vacancies": []
  }
}
```

---

### GET `/api/opt/location/regions`
Получить список регионов.

**Ответ:**
```json
{
  "ok": true,
  "data": [
    { "id": 1, "nameUz": "Toshkent", "nameRu": "Ташкент" }
  ]
}
```

---

### GET `/api/opt/location/districts/:region`
Получить районы региона (`:region` — ID региона, число).

**Ответ:**
```json
{
  "ok": true,
  "data": [
    { "id": 101, "nameUz": "Yunusobod", "nameRu": "Юнусабад" }
  ]
}
```

---

### GET `/api/opt/location/villages/:district`
Получить населённые пункты района (`:district` — ID района, число).

**Ответ:**
```json
{
  "ok": true,
  "data": [
    { "id": 10101, "nameUz": "Chilonzor", "nameRu": "Чиланзар" }
  ]
}
```

---

## Коды ошибок

Все ошибки возвращаются в формате:

```json
{
  "ok": false,
  "message": {
    "uz": "Xabar matni"
  }
}
```

| HTTP-статус | Описание |
|---|---|
| `400` | Неверные данные запроса / бизнес-ошибка |
| `401` | Не авторизован (нет или неверный токен) |
| `403` | Доступ запрещён (недостаточно прав) |
| `404` | Ресурс не найден |
| `500` | Внутренняя ошибка сервера |
