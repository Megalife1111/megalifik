#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
if [[ ! -d node_modules ]]; then
  npm install
fi
npm run migrate
npm run seed
echo ""
echo "Откройте в браузере:"
echo "  http://127.0.0.1:3000/portal/login.html"
echo "  http://127.0.0.1:3000/portal/dashboard.html"
echo ""
npm start