# MegaLife LMS

Репозиторий: **https://github.com/Megalife1111/megalifik**

**Деплой на Vercel:** см. [deploy/VERCEL.md](./deploy/VERCEL.md) (Turso + env).  
**Деплой на VPS:** см. [deploy/WHAT_TO_PROVIDE.md](./deploy/WHAT_TO_PROVIDE.md).

Платформа обучения поверх существующих HTML-материалов.

## Запуск на своём компьютере

LMS **не работает**, если открыть только файл `index.html` или `portal/login.html` двойным щелчком (`file://…`). Нужен запущенный **Node-сервер** на **вашей** машине — `localhost` в браузере это всегда ваш ПК, а не облачный агент.

**Из корня репозитория:**

```bash
chmod +x start-lms.sh   # Linux / macOS, один раз
./start-lms.sh
```

**Или вручную:**

```bash
cd server
npm install
npm run migrate
npm run seed
npm start
```

Откройте **полный** адрес (обязательно порт **3000**):

- Вход: [http://127.0.0.1:3000/portal/login.html](http://127.0.0.1:3000/portal/login.html)
- Каталог курсов (можно **без входа**): [http://127.0.0.1:3000/portal/dashboard.html](http://127.0.0.1:3000/portal/dashboard.html)

Старая главная с плитками без авторизации: [http://127.0.0.1:3000/](http://127.0.0.1:3000/)

### Если «не открывается»

| Симптом | Что сделать |
|--------|-------------|
| «Сайт недоступен» / connection refused | В терминале нет `npm start` — запустите `./start-lms.sh` или `cd server && npm start`. Дождитесь строки `MegaLife LMS on http://localhost:3000`. |
| Открыли `localhost` без `:3000` | Укажите порт: `http://localhost:3000/portal/login.html` |
| Открыли HTML-файл с диска | Так API недоступен — только через сервер, см. выше. |
| Работаете в **Cloud Agent** в Cursor | Сервер крутится на удалённой VM. Пробросьте порт **3000** (Ports / Forwarded Ports) или запустите LMS **локально** у себя по инструкции. |
| Порт 3000 занят | `PORT=3001 npm start` и открывайте `http://127.0.0.1:3001/portal/login.html` |
| Нет Node.js | Установите LTS с [nodejs.org](https://nodejs.org/) (нужна версия 18+). |

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

## Деплой на VPS

См. [deploy/WHAT_TO_PROVIDE.md](deploy/WHAT_TO_PROVIDE.md) — что передать для установки, и `deploy/install.sh` для Ubuntu.