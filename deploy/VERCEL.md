# Деплой на Vercel

Статика (HTML, CSS, JS, картинки) отдаётся CDN Vercel. API и Telegram — serverless-функция `api/index.js` (Express).

## 1. База данных (обязательно для продакшена)

Локальный SQLite на Vercel **не сохраняется**. Нужен **Turso** (совместим с SQLite):

1. [turso.tech](https://turso.tech) → создать БД  
2. В Vercel → Project → **Settings → Environment Variables**:

| Переменная | Значение |
|------------|----------|
| `TURSO_DATABASE_URL` | `libsql://…` |
| `TURSO_AUTH_TOKEN` | токен Turso |
| `SESSION_SECRET` | длинная случайная строка |
| `NODE_ENV` | `production` |
| `LMS_PUBLIC_URL` | `https://ваш-домен.vercel.app` |
| `LMS_ADMIN_EMAIL` | email админа |
| `LMS_ADMIN_PASSWORD` | пароль (при первом build сработает seed) |
| `TELEGRAM_BOT_TOKEN` | от @BotFather |

Опционально:

- `TELEGRAM_CHAT_ID_MAIN` (по умолчанию `-447087970`)
- `TELEGRAM_CHAT_ID_HOMEWORK` (по умолчанию `-695447439`)

При **build** выполняются `migrate` + `seed` (идемпотентно).

## 2. Подключить репозиторий

1. [vercel.com/new](https://vercel.com/new) → Import **Megalife1111/megalifik**
2. Framework: **Other** (используется `vercel.json`)
3. Добавить переменные окружения (Turso, секреты)
4. Deploy

## 3. Локальная разработка (как раньше)

Без Turso — SQLite в `server/data/`:

```bash
./start-lms.sh
```

С имитацией Vercel:

```bash
npm install
export TURSO_DATABASE_URL=… TURSO_AUTH_TOKEN=…
npm run vercel-build
vercel dev
```

## 4. Отличия от VPS

| | VPS | Vercel |
|---|-----|--------|
| SQLite на диске | да | нет (Turso) |
| PHP | php-fpm | Node `/api/telegram` + rewrite `send_*.php` |
| `LMS_PROTECT_LEGACY` | да | нет (статика без middleware) |

## 5. Проверка после деплоя

- `GET /api/health` → `{"ok":true,"vercel":true}`
- `/portal/dashboard.html`
- Вход админа, каталог курсов
- Тестовая отправка с занятия → Telegram (если задан `TELEGRAM_BOT_TOKEN`)