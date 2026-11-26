# Перенос на GitHub `Megalife1111/megalifik`

Пока **весь актуальный код** лежит в `main` (включая LMS и `deploy/`). После переноса можно удалить старый репозиторий.

## Способ 1 — импорт на GitHub (проще всего)

1. **Не удаляйте** старый репозиторий, пока не проверите новый.
2. Откройте https://github.com/Megalife1111/megalifik
3. Если репо пустое: **Settings** → **Import a repository** (или создайте импорт с [github.com/new/import](https://github.com/new/import)).
4. **Old repository URL:** `https://github.com/ycarcapital-create/megalife`
5. Дождитесь окончания импорта (ветки и история сохранятся).

## Способ 2 — push с вашего ПК

```bash
git clone --mirror https://github.com/ycarcapital-create/megalife.git megalife-mirror
cd megalife-mirror
git remote set-url --push origin https://github.com/Megalife1111/megalifik.git
git push --mirror
```

Или из уже клонированного каталога:

```bash
git remote add megalifik https://github.com/Megalife1111/megalifik.git
git push megalifik --all
git push megalifik --tags
```

## Способ 3 — доступ агенту Cursor

Чтобы облачный агент мог пушить сам:

1. Подключите аккаунт **Megalife1111** к GitHub в Cursor **или**
2. Добавьте [GitHub App Cursor](https://github.com/apps/cursor) / collaborator с write на `megalifik`.

Затем напишите в чат агенту: «пуш в megalifik готов».

## После переноса

- Клон на сервере: `git clone https://github.com/Megalife1111/megalifik.git /var/www/megalife`
- Проверьте, что на `main` есть последний коммит с обновлённым `deploy/install.sh` (`REPO_URL` → megalifik).
- Удалите старый репозиторий, когда `main` на megalifik совпадает по содержимому.