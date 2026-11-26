import { execSync } from "node:child_process";
import path from "path";
import { fileURLToPath } from "url";

const serverRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function run(script) {
  execSync(`node ${script}`, { stdio: "inherit", cwd: serverRoot });
}

function main() {
  if (!process.env.TURSO_DATABASE_URL) {
    console.warn(`
[Vercel build] TURSO_DATABASE_URL не задан — migrate/seed пропущены.
Чтобы БД инициализировалась при сборке, в Vercel → Settings → Environment Variables
отметьте переменные Turso и админа для среды **Build** (не только Production).
После добавления — Redeploy. См. deploy/VERCEL.md
`);
    return;
  }

  run("src/migrate.js");
  run("src/seed.js");
}

main();