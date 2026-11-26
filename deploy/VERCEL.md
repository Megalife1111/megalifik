# Деплой на Vercel

Статика (HTML, CSS, JS, картинки) отдаётся CDN Vercel. API и Telegram — serverless-функция `api/[...path].js` (Express).

**Install на Vercel:** в корне лежит `.npmrc` (`omit=dev`), чтобы даже при `npm install` не собирался нативный `better-sqlite3` (локальный SQLite только для dev). В `vercel.json` задано `npm ci --omit=dev`. Если в Vercel → **Settings → Build** переопределён Install Command, оставьте `npm ci --omit=dev` или пусто (сработает `.npmrc`).

## 1. База данных (обязательно для продакшена)

Локальный SQLite на Vercel **не сохраняется**. Нужен **Turso** (совместим с SQLite):

1. [turso.tech](https://turso.tech) → создать БД  
2. В Vercel → Project → **Settings → Environment Variables** (для **Production**, **Preview** и **Build**):

| Переменная | Значение |
|------------|----------|
| `TURSO_DATABASE_URL` | `libsql://…` |
| `TURSO_AUTH_TOKEN` | токен Turso |
| `SESSION_SECRET` | длинная случайная строка |
| `NODE_ENV` | `production` |
| `LMS_ADMIN_EMAIL` | email админа |
| `LMS_ADMIN_PASSWORD` | пароль (при build сработает seed) |
| `TELEGRAM_BOT_TOKEN` | от @BotFather |

`LMS_PUBLIC_URL` можно не задавать: на Vercel подставится `https://$VERCEL_URL` автоматически. Для своего домена укажите `https://ваш-домен.ru`.

Опционально:

- `TELEGRAM_CHAT_ID_MAIN` (по умолчанию `-447087970`)
- `TELEGRAM_CHAT_ID_HOMEWORK` (по умолчанию `-695447439`)

При **build** выполняются `migrate` + `seed` (идемпотентно).

## 2. Подключить репозиторий

1. [vercel.com/new](https://vercel.com/new) → Import **Megalife1111/megalifik**
2. Framework: **Other** (используется `vercel.json`)
3. Добавить переменные окружения (Turso, секреты)
4. **Settings → Git**: репозиторий `Megalife1111/megalifik`, ветка **Production = main**
5. Deploy

Если сайт показывает `DEPLOYMENT_NOT_FOUND` — в **Deployments** сделайте **Redeploy** или заново **Import** репозитория.

## 3. Локальная разработка (как раньше)

Без Turso — SQLite в `server/data/`:

```bash
./start-lms.sh
```

С имитацией Vercel:

```bash
npm install --include=dev
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