# MegaLife LMS

Платформа обучения поверх существующих HTML-материалов.

## Запуск

```bash
cd server
npm install
npm run migrate
npm run seed
npm start
```

Откройте `http://localhost:3000/portal/login.html`

**Админ по умолчанию (после seed):** `admin@megalife.local` / `Admin12345`

Переменные окружения:

- `PORT` — порт (по умолчанию 3000)
- `SESSION_SECRET` — секрет сессии
- `LMS_ADMIN_EMAIL`, `LMS_ADMIN_PASSWORD` — учётка администратора при seed
- `LMS_PROTECT_LEGACY=true` — редирект на вход для прямого доступа к `/courses/*`
- `NODE_ENV=production` — secure cookies, без выдачи dev-ссылки сброса пароля

## Архитектура

- **Статика** — прежние страницы занятий (`courses/`, `homework/`, …)
- **API** — Node.js + Express + SQLite (`server/`)
- **Портал** — `portal/` + `css/lms.css` + `js/lms/`
- Материалы в БД ссылаются на `content_url` существующих HTML-страниц

## Сброс пароля

В режиме разработки API `forgot-password` возвращает `devResetUrl`. В production подключите SMTP/SMS-отправку (заготовка — таблица `password_reset_tokens`).