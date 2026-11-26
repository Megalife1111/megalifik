# Что передать, чтобы развернуть MegaLife на вашем VPS

## Важно: где работает «агент»

Автоматический агент Cursor **по умолчанию не на вашем сервере**. Чтобы **я** выполнил установку сам, нужен **SSH-доступ с этой среды на ваш VPS** (IP в белом списке / ключ).  
Без SSH вы (или админ) можете за **10–20 минут** поднять всё сами:

```bash
sudo apt install -y git
git clone https://github.com/Megalife1111/megalifik.git /var/www/megalife
cd /var/www/megalife
# заполните server/.env по deploy/env.example
sudo bash deploy/install.sh
```

---

## Минимальный набор для деплоя

### 1. Доступ к серверу (если деплой делает агент)

| Что | Формат |
|-----|--------|
| IP или hostname | `203.0.113.10` |
| SSH-пользователь | обычно `root` или `ubuntu` / `debian` |
| Авторизация | **приватный SSH-ключ** (предпочтительно) или временный пароль |
| Порт SSH | если не 22 |
| ОС | Ubuntu 22.04/24.04 (желательно) |

**Не присылайте** root-пароль в открытый чат, если можно — только ключ, добавленный на сервер.

### 2. Домен

| Что | Зачем |
|-----|--------|
| Домен | `megalife.example.com` |
| DNS | A-запись **на IP VPS** (уже настроена или данные для проверки) |

### 3. Секреты приложения

| Переменная | Кто задаёт |
|------------|------------|
| `SESSION_SECRET` | случайная строка (32+ байт) — могу сгенерировать на сервере |
| `LMS_PUBLIC_URL` | `https://ваш-домен` |
| `LMS_ADMIN_EMAIL` / `LMS_ADMIN_PASSWORD` | первый администратор (после seed) |
| `TELEGRAM_BOT_TOKEN` | бот для PHP (`send_*.php`) |
| Chat ID Telegram | сейчас в PHP захардкожен — скажите, если нужен **ваш** chat_id |

### 4. Репозиторий

| Вариант |
|---------|
| Публичный репозиторий `Megalife1111/megalifik` — клон с GitHub |
| Или **ваш форк** + deploy key / SSH deploy |

### 5. Опционально

| Параметр | Значение |
|----------|----------|
| `LMS_PROTECT_LEGACY=true` | закрыть прямые ссылки на занятия без входа |
| Путь установки | по умолчанию `/var/www/megalife` |
| Почта SMTP | позже, для сброса пароля в production |

---

## Что сделает установка

1. Node 20, Nginx, PHP-FPM, build-зависимости для SQLite  
2. `git clone`, `npm install`, `migrate`, `seed`  
3. **systemd** `megalife` → порт 3000  
4. **Nginx**: прокси на Node + `send_*.php` → PHP-FPM  
5. Права на `server/data/` для `www-data`  
6. (Отдельно) **certbot** для HTTPS  

---

## Чеклист для сообщения агенту (скопируйте и заполните)

```
Сервер:
  IP:
  SSH user:
  SSH port: 22
  Ключ: [добавлен на сервер / пришлю в Cursor Secrets]

Домен:
  Имя:
  DNS уже на IP: да/нет

Админ LMS:
  Email:
  Пароль: [лучше в секретах, не в чате]

Telegram:
  TELEGRAM_BOT_TOKEN: [секрет]
  Chat ID (если не дефолт в репо):

Репозиторий:
  URL ветки: main / другая

Опции:
  LMS_PROTECT_LEGACY: true/false
  Путь APP_DIR: /var/www/megalife
```

---

## Что проверить после деплоя

- `https://домен/portal/dashboard.html` — каталог  
- `https://домен/portal/login.html` — вход  
- `https://домен/api/health` → `{"ok":true}`  
- Отправка теста с занятия → сообщение в Telegram  
- Вход админом → `/portal/admin.html`

---

## Если SSH агенту недоступен

1. Подключитесь к VPS по SSH сами.  
2. Выполните `sudo bash deploy/install.sh`.  
3. Отредактируйте `server/.env` и `nginx` `server_name`.  
4. `sudo certbot --nginx`.  
5. Настройте `TELEGRAM_BOT_TOKEN` в php-fpm.

Пришлите в чат вывод `curl http://127.0.0.1:3000/api/health` и фрагмент `journalctl -u megalife -n 30` — помогу отладить.