-- =============================================================
-- PROFIBAZA DUMMY DATA
-- All user passwords: password123
-- Bcrypt hash used: $2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
-- =============================================================

-- =============================================================
-- 1. USERS
-- =============================================================
INSERT INTO users (id, name, surname, middle_name, gender, birthday, phone, email, password, avatar, active, balance, role, created_at, updated_at) VALUES
  ('00000002-0000-0000-0000-000000000000', 'Sardor',  'Toshmatov', 'Baxtiyorovich', 'MALE',   '1995-03-20', '+998901000002', 'sardor@profibaza.uz',  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, true,   50000, 'CLIENT',   NOW(), NOW()),
  ('00000003-0000-0000-0000-000000000000', 'Malika',  'Yusupova',  'Ibrohimovna',   'FEMALE', '1988-07-11', '+998901000003', 'malika@profibaza.uz',  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, true,  100000, 'LEGAL',    NOW(), NOW()),
  ('00000004-0000-0000-0000-000000000000', 'Bobur',   'Rahimov',   'Sherzodovich',  'MALE',   '1980-12-05', '+998901000004', 'bobur@profibaza.uz',   '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, true,  200000, 'INVESTOR', NOW(), NOW()),
  ('00000005-0000-0000-0000-000000000000', 'Jasur',   'Nazarov',   'Umidovich',     'MALE',   '1992-06-18', '+998901000005', 'jasur@profibaza.uz',   '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, true,       0, 'WORKER',   NOW(), NOW()),
  ('00000006-0000-0000-0000-000000000000', 'Nilufar', 'Karimova',  'Bekhzodovna',   'FEMALE', '1993-09-25', '+998901000006', 'nilufar@profibaza.uz', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, true,   30000, 'CLIENT',   NOW(), NOW()),
  ('00000007-0000-0000-0000-000000000000', 'Otabek',  'Mirzayev',  'Ismoilovich',   'MALE',   '1990-04-12', '+998901000007', 'otabek@profibaza.uz',  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, true,       0, 'WORKER',   NOW(), NOW());

-- =============================================================
-- 2. ADMIN PROFILE
-- =============================================================
INSERT INTO admins (id, user_id, created_at, updated_at) VALUES
  ('a0000001-0000-0000-0000-000000000000', '00000001-0000-0000-0000-000000000000', NOW(), NOW());

-- =============================================================
-- 3. CLIENT PROFILES
-- =============================================================
INSERT INTO clients (id, address1, address2, address3, user_id, created_at, updated_at) VALUES
  ('c0000001-0000-0000-0000-000000000000', '11', '1101', '110101', '00000002-0000-0000-0000-000000000000', NOW(), NOW()),
  ('c0000002-0000-0000-0000-000000000000', '11', '1102', '110201', '00000006-0000-0000-0000-000000000000', NOW(), NOW());

-- =============================================================
-- 4. LEGAL PROFILE
-- =============================================================
INSERT INTO legals (id, name, address1, address2, address3, user_id, created_at, updated_at) VALUES
  ('l0000001-0000-0000-0000-000000000000', 'Qurilish MChJ', '11', '1101', '110101', '00000003-0000-0000-0000-000000000000', NOW(), NOW());

-- =============================================================
-- 5. INVESTOR PROFILE
-- =============================================================
INSERT INTO investors (id, name, activity_type, investition_amount, address1, address2, address3, user_id, created_at, updated_at) VALUES
  ('i0000001-0000-0000-0000-000000000000', 'Rahimov Investitsiyalar', 'Qurilish va ko''chmas mulk', 5000000000, '11', '1101', '110101', '00000004-0000-0000-0000-000000000000', NOW(), NOW());

-- =============================================================
-- 6. WORKER PROFILES
-- =============================================================
INSERT INTO workers (id, address1, address2, address3, user_id, created_at, updated_at) VALUES
  ('w0000001-0000-0000-0000-000000000000', '11', '1101', '110101', '00000005-0000-0000-0000-000000000000', NOW(), NOW()),
  ('w0000002-0000-0000-0000-000000000000', '11', '1102', '110201', '00000007-0000-0000-0000-000000000000', NOW(), NOW());

-- =============================================================
-- 7. CONTACTS
-- (client_id, legal_id, worker_id each have @unique — max 1 per profile)
-- =============================================================
INSERT INTO contacts (id, person, contact, type, client_id, legal_id, investor_id, worker_id, created_at, updated_at) VALUES
  ('ct000001-0000-0000-0000-000000000000', 'Sardor Toshmatov',    '+998901000002',     'PHONE', 'c0000001-0000-0000-0000-000000000000', NULL,                                    NULL,                                    NULL,                                    NOW(), NOW()),
  ('ct000002-0000-0000-0000-000000000000', 'Nilufar Karimova',    '+998901000006',     'PHONE', 'c0000002-0000-0000-0000-000000000000', NULL,                                    NULL,                                    NULL,                                    NOW(), NOW()),
  ('ct000003-0000-0000-0000-000000000000', 'Malika Yusupova',     'malika@qurilish.uz','EMAIL', NULL,                                    'l0000001-0000-0000-0000-000000000000', NULL,                                    NULL,                                    NOW(), NOW()),
  ('ct000004-0000-0000-0000-000000000000', 'Bobur Rahimov',       '+998901000004',     'PHONE', NULL,                                    NULL,                                    'i0000001-0000-0000-0000-000000000000', NULL,                                    NOW(), NOW()),
  ('ct000005-0000-0000-0000-000000000000', 'Bobur Rahimov Email', 'bobur@invest.uz',   'EMAIL', NULL,                                    NULL,                                    'i0000001-0000-0000-0000-000000000000', NULL,                                    NOW(), NOW()),
  ('ct000006-0000-0000-0000-000000000000', 'Jasur Nazarov',       '+998901000005',     'PHONE', NULL,                                    NULL,                                    NULL,                                    'w0000001-0000-0000-0000-000000000000', NOW(), NOW()),
  ('ct000007-0000-0000-0000-000000000000', 'Otabek Mirzayev',     '+998901000007',     'PHONE', NULL,                                    NULL,                                    NULL,                                    'w0000002-0000-0000-0000-000000000000', NOW(), NOW());

-- =============================================================
-- 8. DOCUMENTS
-- =============================================================
INSERT INTO documents (id, "fileId", type, client_id, legal_id, investor_id, worker_id, created_at, updated_at) VALUES
  ('d0000001-0000-0000-0000-000000000000', 'document/sardor_passport.jpg',   'PASSPORT',    'c0000001-0000-0000-0000-000000000000', NULL,                                    NULL,                                    NULL,                                    NOW(), NOW()),
  ('d0000002-0000-0000-0000-000000000000', 'document/nilufar_id.jpg',        'ID_CARD',     'c0000002-0000-0000-0000-000000000000', NULL,                                    NULL,                                    NULL,                                    NOW(), NOW()),
  ('d0000003-0000-0000-0000-000000000000', 'document/malika_id.jpg',         'ID_CARD',     NULL,                                    'l0000001-0000-0000-0000-000000000000', NULL,                                    NULL,                                    NOW(), NOW()),
  ('d0000004-0000-0000-0000-000000000000', 'document/bobur_passport.jpg',    'PASSPORT',    NULL,                                    NULL,                                    'i0000001-0000-0000-0000-000000000000', NULL,                                    NOW(), NOW()),
  ('d0000005-0000-0000-0000-000000000000', 'document/jasur_passport.jpg',    'PASSPORT',    NULL,                                    NULL,                                    NULL,                                    'w0000001-0000-0000-0000-000000000000', NOW(), NOW()),
  ('d0000006-0000-0000-0000-000000000000', 'document/jasur_diploma.jpg',     'DIPLOMA',     NULL,                                    NULL,                                    NULL,                                    'w0000001-0000-0000-0000-000000000000', NOW(), NOW()),
  ('d0000007-0000-0000-0000-000000000000', 'document/jasur_cert.jpg',        'CERTIFICATE', NULL,                                    NULL,                                    NULL,                                    'w0000001-0000-0000-0000-000000000000', NOW(), NOW()),
  ('d0000008-0000-0000-0000-000000000000', 'document/otabek_passport.jpg',   'PASSPORT',    NULL,                                    NULL,                                    NULL,                                    'w0000002-0000-0000-0000-000000000000', NOW(), NOW());

-- =============================================================
-- 9. PROFESSION CATEGORIES
-- =============================================================
INSERT INTO profession_categories (id, name_uz, name_ru, created_at, updated_at) VALUES
  ('pc000001-0000-0000-0000-000000000000', 'Qurilish',   'Строительство', NOW(), NOW()),
  ('pc000002-0000-0000-0000-000000000000', 'Elektr',     'Электрика',     NOW(), NOW()),
  ('pc000003-0000-0000-0000-000000000000', 'Santexnika', 'Сантехника',    NOW(), NOW()),
  ('pc000004-0000-0000-0000-000000000000', 'Dizayn',     'Дизайн',        NOW(), NOW());

-- =============================================================
-- 10. PROFESSIONS
-- =============================================================
INSERT INTO professions (id, name_uz, name_ru, "categoryId", created_at, updated_at) VALUES
  ('pr000001-0000-0000-0000-000000000000', 'Ganchkor',          'Лепщик',              'pc000001-0000-0000-0000-000000000000', NOW(), NOW()),
  ('pr000002-0000-0000-0000-000000000000', 'G''ishtchi',        'Каменщик',            'pc000001-0000-0000-0000-000000000000', NOW(), NOW()),
  ('pr000003-0000-0000-0000-000000000000', 'Elektrik',          'Электрик',            'pc000002-0000-0000-0000-000000000000', NOW(), NOW()),
  ('pr000004-0000-0000-0000-000000000000', 'Santexnik',         'Сантехник',           'pc000003-0000-0000-0000-000000000000', NOW(), NOW()),
  ('pr000005-0000-0000-0000-000000000000', 'Interyer dizayner', 'Дизайнер интерьера',  'pc000004-0000-0000-0000-000000000000', NOW(), NOW());

-- =============================================================
-- 11. WORKER PROFESSIONS
-- =============================================================
INSERT INTO worker_profession (id, min_price, max_price, rating, has_team, team_member_count, ready_for_huge_project, inventory, competitions, job_type, worker_id, profession_id, created_at, updated_at) VALUES
  ('wp000001-0000-0000-0000-000000000000', 100000, 300000, 4.5, true,  3, true,  'Shpatel, lenta, bo''yoq', 'Toshkent Qurilish Cup 2023', 'SOLO',     'w0000001-0000-0000-0000-000000000000', 'pr000001-0000-0000-0000-000000000000', NOW(), NOW()),
  ('wp000002-0000-0000-0000-000000000000', 150000, 500000, 4.2, false, 1, false, NULL,                      NULL,                          'EMPLOYEE', 'w0000001-0000-0000-0000-000000000000', 'pr000003-0000-0000-0000-000000000000', NOW(), NOW()),
  ('wp000003-0000-0000-0000-000000000000',  80000, 200000, 3.8, false, 1, false, 'Kalit to''plami',         NULL,                          'SOLO',     'w0000002-0000-0000-0000-000000000000', 'pr000004-0000-0000-0000-000000000000', NOW(), NOW());

-- =============================================================
-- 12. WORKER PROFESSION DEMOS
-- =============================================================
INSERT INTO worker_profession_demo (id, "fileId", comment, profession_id, created_at) VALUES
  ('wd000001-0000-0000-0000-000000000000', 'demo/jasur_ganch_1.jpg',       'Ganch ishi namunasi - uy',     'wp000001-0000-0000-0000-000000000000', NOW()),
  ('wd000002-0000-0000-0000-000000000000', 'demo/jasur_ganch_2.jpg',       'Ganch ishi namunasi - ofis',   'wp000001-0000-0000-0000-000000000000', NOW()),
  ('wd000003-0000-0000-0000-000000000000', 'demo/jasur_elektr_1.jpg',      'Elektr montaj ishi',           'wp000002-0000-0000-0000-000000000000', NOW()),
  ('wd000004-0000-0000-0000-000000000000', 'demo/otabek_santekhnik_1.jpg', 'Santexnika o''rnatish loyiha', 'wp000003-0000-0000-0000-000000000000', NOW());

-- =============================================================
-- 13. SCHEDULES (one per worker profession, @unique enforced)
-- =============================================================
INSERT INTO schedules (id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, "workerProfessionId", created_at, updated_at) VALUES
  ('sc000001-0000-0000-0000-000000000000', true, true, true, true, true, true,  false, 'wp000001-0000-0000-0000-000000000000', NOW(), NOW()),
  ('sc000002-0000-0000-0000-000000000000', true, true, true, true, true, false, false, 'wp000002-0000-0000-0000-000000000000', NOW(), NOW()),
  ('sc000003-0000-0000-0000-000000000000', true, true, true, true, true, true,  true,  'wp000003-0000-0000-0000-000000000000', NOW(), NOW());

-- =============================================================
-- 14. LOCATIONS
-- (Tashkent area coordinates)
-- =============================================================
INSERT INTO locations (id, latitude, longitude, radius, "workProfessionId", created_at, updated_at) VALUES
  ('lo000001-0000-0000-0000-000000000000', 41.2995, 69.2401, 10.0, 'wp000001-0000-0000-0000-000000000000', NOW(), NOW()),
  ('lo000002-0000-0000-0000-000000000000', 41.3111, 69.2797,  5.0, 'wp000001-0000-0000-0000-000000000000', NOW(), NOW()),
  ('lo000003-0000-0000-0000-000000000000', 41.2545, 69.2128, 15.0, 'wp000002-0000-0000-0000-000000000000', NOW(), NOW()),
  ('lo000004-0000-0000-0000-000000000000', 41.3400, 69.3100,  8.0, 'wp000003-0000-0000-0000-000000000000', NOW(), NOW());

-- =============================================================
-- 15. EXPERIENCE
-- (started_at / ended_at store year as Int)
-- =============================================================
INSERT INTO experience (id, started_at, ended_at, job_place, job_description, "workerProfessionId", created_at, updated_at) VALUES
  ('ex000001-0000-0000-0000-000000000000', 2018, 2021, 'Mega Qurilish MChJ',   'Ganch ishlari bajarish',                    'wp000001-0000-0000-0000-000000000000', NOW(), NOW()),
  ('ex000002-0000-0000-0000-000000000000', 2021, NULL, 'Freelance',             'Mustaqil ganch ustasi',                     'wp000001-0000-0000-0000-000000000000', NOW(), NOW()),
  ('ex000003-0000-0000-0000-000000000000', 2019, 2022, 'Energiya Servis',       'Elektr montaj ishlari',                     'wp000002-0000-0000-0000-000000000000', NOW(), NOW()),
  ('ex000004-0000-0000-0000-000000000000', 2022, NULL, 'Freelance',             'Mustaqil elektrik',                         'wp000002-0000-0000-0000-000000000000', NOW(), NOW()),
  ('ex000005-0000-0000-0000-000000000000', 2015, 2019, 'Suv Ta''minot MChJ',   'Santexnika o''rnatish va ta''mirlash',      'wp000003-0000-0000-0000-000000000000', NOW(), NOW()),
  ('ex000006-0000-0000-0000-000000000000', 2019, NULL, 'Freelance',             'Mustaqil santexnik',                        'wp000003-0000-0000-0000-000000000000', NOW(), NOW());

-- =============================================================
-- 16. ORDERS
-- =============================================================
INSERT INTO orders (id, start_at, end_at, rejected_at, deadline, description, status, budget, address1, address2, address3, files, client_id, legal_id, investor_id, worker_profession_id, created_at, updated_at) VALUES
  ('or000001-0000-0000-0000-000000000000', '2026-06-01 09:00:00', '2026-06-10 18:00:00', NULL,                  '2026-06-15', 'Uy ichidagi ganch ishlari',                  'DONE',     2000000, '11', '1101', '110101', '{}', 'c0000001-0000-0000-0000-000000000000', NULL,                                    NULL,                                    'wp000001-0000-0000-0000-000000000000', NOW(), NOW()),
  ('or000002-0000-0000-0000-000000000000', '2026-06-20 09:00:00', NULL,                  NULL,                  '2026-07-20', 'Ofis binosi elektr tarmog''ini yangilash',   'PROGRESS', 5000000, '11', '1101', '110101', '{}', NULL,                                    'l0000001-0000-0000-0000-000000000000', NULL,                                    'wp000002-0000-0000-0000-000000000000', NOW(), NOW()),
  ('or000003-0000-0000-0000-000000000000', NULL,                  NULL,                  NULL,                  '2026-08-01', 'Yangi binoda santexnika o''rnatish',         'NEW',      3000000, '11', '1101', '110101', '{}', NULL,                                    NULL,                                    'i0000001-0000-0000-0000-000000000000', 'wp000003-0000-0000-0000-000000000000', NOW(), NOW()),
  ('or000004-0000-0000-0000-000000000000', NULL,                  NULL,                  '2026-06-18 10:00:00', '2026-07-01', 'Hovli ganch ishlari',                        'REJECTED', 1500000, '11', '1102', '110201', '{}', 'c0000002-0000-0000-0000-000000000000', NULL,                                    NULL,                                    'wp000001-0000-0000-0000-000000000000', NOW(), NOW());

-- =============================================================
-- 17. COMMENTS
-- =============================================================
INSERT INTO comments (id, text, rating, feedback, order_id, client_id, legal_id, investor_id, created_at) VALUES
  ('cm000001-0000-0000-0000-000000000000', 'Ish juda yaxshi bajarildi, tavsiya etaman!', 5, 'Vaqtida tugatildi',    'or000001-0000-0000-0000-000000000000', 'c0000001-0000-0000-0000-000000000000', NULL, NULL, NOW()),
  ('cm000002-0000-0000-0000-000000000000', 'Yaxshi usta, lekin biroz kech keldi',         4, NULL,                   'or000001-0000-0000-0000-000000000000', 'c0000001-0000-0000-0000-000000000000', NULL, NULL, NOW());

-- =============================================================
-- 18. TRANSACTIONS
-- =============================================================
INSERT INTO transactions (id, user_id, amount, description, status, created_at) VALUES
  ('tr000001-0000-0000-0000-000000000000', '00000002-0000-0000-0000-000000000000',  50000, 'Balans to''ldirish Payme orqali', 'PAID',     NOW()),
  ('tr000002-0000-0000-0000-000000000000', '00000003-0000-0000-0000-000000000000', 100000, 'Balans to''ldirish Payme orqali', 'PAID',     NOW()),
  ('tr000003-0000-0000-0000-000000000000', '00000004-0000-0000-0000-000000000000', 200000, 'Balans to''ldirish Payme orqali', 'PAID',     NOW()),
  ('tr000004-0000-0000-0000-000000000000', '00000006-0000-0000-0000-000000000000',  30000, 'Balans to''ldirish Payme orqali', 'PAID',     NOW()),
  ('tr000005-0000-0000-0000-000000000000', '00000002-0000-0000-0000-000000000000',  20000, 'To''lov kutilmoqda',              'CREATED',  NOW()),
  ('tr000006-0000-0000-0000-000000000000', '00000004-0000-0000-0000-000000000000',  15000, 'Bekor qilingan to''lov',          'DECLINED', NOW());

-- =============================================================
-- 19. VACANCIES
-- =============================================================
INSERT INTO vacancies (id, title, salary, description, active, "legalId", investor_id, created_at, updated_at) VALUES
  ('va000001-0000-0000-0000-000000000000', 'Tajribali Elektrik',             3000000, 'Ofis binosi uchun doimiy elektrik kerak. 3 yillik tajriba talab etiladi.',               true,  'l0000001-0000-0000-0000-000000000000', NULL,                                    NOW(), NOW()),
  ('va000002-0000-0000-0000-000000000000', 'Qurilish Loyiha Boshqaruvchisi', 8000000, 'Katta qurilish loyihasini boshqarish uchun mutaxassis kerak. 5+ yillik tajriba.',        true,  NULL,                                    'i0000001-0000-0000-0000-000000000000', NOW(), NOW()),
  ('va000003-0000-0000-0000-000000000000', 'Santexnik Yordamchi',            1500000, 'Santexnika ishlari uchun yordamchi kerak.',                                              false, 'l0000001-0000-0000-0000-000000000000', NULL,                                    NOW(), NOW());

-- =============================================================
-- 20. OFFERS
-- =============================================================
INSERT INTO offers (id, status, message, "vacancyId", "workerProfessionId", created_at, updated_at) VALUES
  ('of000001-0000-0000-0000-000000000000', 'NEW',      'Elektrik lavozimiga ariza beraman, 5 yillik tajribam bor', 'va000001-0000-0000-0000-000000000000', 'wp000002-0000-0000-0000-000000000000', NOW(), NOW()),
  ('of000002-0000-0000-0000-000000000000', 'ACCEPTED', 'Santexnika ishlari bo''yicha ariza bermoqchiman',          'va000003-0000-0000-0000-000000000000', 'wp000003-0000-0000-0000-000000000000', NOW(), NOW()),
  ('of000003-0000-0000-0000-000000000000', 'DECLINED', NULL,                                                        'va000002-0000-0000-0000-000000000000', 'wp000001-0000-0000-0000-000000000000', NOW(), NOW());

-- =============================================================
-- 21. PROJECTS
-- (no created_at/updated_at in schema)
-- =============================================================
INSERT INTO projects (id, status, capacity, partners, description, "investorId") VALUES
  ('pj000001-0000-0000-0000-000000000000', 'BUILDING', 'LARGE',  ARRAY['Mega Qurilish MChJ', 'Toshkent Beton', 'EcoDesign'], '20 qavatli turar-joy binosi qurilishi, Toshkent shahri',   'i0000001-0000-0000-0000-000000000000'),
  ('pj000002-0000-0000-0000-000000000000', 'PLANNED',  'MIDDLE', ARRAY['Zavod Servis'],                                       'Yangi sanoat zavodi qurilishi, Toshkent viloyati',          'i0000001-0000-0000-0000-000000000000'),
  ('pj000003-0000-0000-0000-000000000000', 'DONE',     'SMALL',  ARRAY[]::text[],                                             'Kichik omborxona qurilishi (yakunlangan)',                   'i0000001-0000-0000-0000-000000000000');

-- =============================================================
-- 22. PROJECT EMPLOYMENT
-- (no created_at/updated_at in schema)
-- =============================================================
INSERT INTO project_employment (id, profession, count, start_date, end_date, "employmentType", "workGraph", "projectId") VALUES
  ('pe000001-0000-0000-0000-000000000000', 'Ganchkor',           10, '2026-07-01', '2026-12-31', 'CONTRACT',  'FULLTIME', 'pj000001-0000-0000-0000-000000000000'),
  ('pe000002-0000-0000-0000-000000000000', 'Elektrik',            5, '2026-07-01', '2027-03-31', 'EMPLOYEE',  'FULLTIME', 'pj000001-0000-0000-0000-000000000000'),
  ('pe000003-0000-0000-0000-000000000000', 'Santexnik',           3, '2026-08-01', '2027-01-31', 'FREELANCE', 'PARTTIME', 'pj000001-0000-0000-0000-000000000000'),
  ('pe000004-0000-0000-0000-000000000000', 'Qurilish brigadiri',  2, '2026-09-01', '2027-06-30', 'EMPLOYEE',  'FULLTIME', 'pj000002-0000-0000-0000-000000000000'),
  ('pe000005-0000-0000-0000-000000000000', 'Dizayner',            1, '2026-09-15', '2027-02-28', 'FREELANCE', 'FLEX',     'pj000002-0000-0000-0000-000000000000');

-- =============================================================
-- 23. OTP
-- =============================================================
INSERT INTO otp (id, code, phone, verified, sent_at) VALUES
  ('ot000001-0000-0000-0000-000000000000', '123456', '+998901000099', false, NOW()),
  ('ot000002-0000-0000-0000-000000000000', '654321', '+998901000088', true,  NOW() - INTERVAL '5 minutes'),
  ('ot000003-0000-0000-0000-000000000000', '111222', '+998901000077', false, NOW() - INTERVAL '2 minutes');

-- =============================================================
-- 24. RESET PASSWORD REQUESTS
-- =============================================================
INSERT INTO "reset-password-requests" (id, phone, code, expires_at, created_at) VALUES
  ('rp000001-0000-0000-0000-000000000000', '+998901000002', '789012', NOW() + INTERVAL '15 minutes', NOW()),
  ('rp000002-0000-0000-0000-000000000000', '+998901000005', '345678', NOW() - INTERVAL '1 hour',     NOW() - INTERVAL '1 hour');
