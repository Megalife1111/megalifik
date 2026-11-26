#!/usr/bin/env bash
# Установка на чистый Ubuntu 22.04/24.04 (запуск: sudo bash deploy/install.sh)
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/megalife}"
REPO_URL="${REPO_URL:-https://github.com/Megalife1111/megalifik.git}"
NODE_MAJOR="${NODE_MAJOR:-20}"

if [[ "${EUID:-}" -ne 0 ]]; then
  echo "Запустите с sudo: sudo bash deploy/install.sh"
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y git nginx curl ca-certificates build-essential python3 \
  php-fpm php-cli php-curl

if ! command -v node >/dev/null || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt "$NODE_MAJOR" ]]; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
fi

mkdir -p "$(dirname "$APP_DIR")"
if [[ ! -d "$APP_DIR/.git" ]]; then
  git clone "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR/server"
if [[ ! -f .env ]]; then
  cp ../deploy/env.example .env
  echo "Отредактируйте $APP_DIR/server/.env (SESSION_SECRET, LMS_PUBLIC_URL, админ для seed)"
fi

npm install
npm run migrate
set -a
# shellcheck source=/dev/null
source .env 2>/dev/null || true
set +a
npm run seed

chown -R www-data:www-data "$APP_DIR/server/data"
chmod 750 "$APP_DIR/server/data"

cp "$APP_DIR/deploy/megalife.service" /etc/systemd/system/megalife.service
systemctl daemon-reload
systemctl enable megalife
systemctl restart megalife

PHP_SOCK="$(ls /run/php/php*-fpm.sock 2>/dev/null | head -1)"
if [[ -n "$PHP_SOCK" ]]; then
  sed "s|unix:/run/php/php8.2-fpm.sock|unix:${PHP_SOCK}|" \
    "$APP_DIR/deploy/nginx-megalife.conf" > /etc/nginx/sites-available/megalife
else
  cp "$APP_DIR/deploy/nginx-megalife.conf" /etc/nginx/sites-available/megalife
fi

ln -sf /etc/nginx/sites-available/megalife /etc/nginx/sites-enabled/megalife
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo ""
echo "Готово. Дальше:"
echo "  1) Пропишите server_name и DNS на IP сервера"
echo "  2) certbot --nginx -d example.com"
echo "  3) TELEGRAM_BOT_TOKEN в php-fpm (см. deploy/php-fpm-telegram.env)"
echo "  4) curl -s http://127.0.0.1:3000/api/health"