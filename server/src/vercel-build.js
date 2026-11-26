import { execSync } from "node:child_process";
import path from "path";
import { fileURLToPath } from "url";

const serverRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function run(script) {
  execSync(`node ${script}`, { stdio: "inherit", cwd: serverRoot });
}

function main() {
  if (process.env.VERCEL && !process.env.TURSO_DATABASE_URL) {
    console.error(`
[Vercel build] TURSO_DATABASE_URL не задан.
Добавьте в Vercel → Project → Settings → Environment Variables:
  TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, SESSION_SECRET,
  LMS_ADMIN_EMAIL, LMS_ADMIN_PASSWORD
См. deploy/VERCEL.md
`);
    process.exit(1);
  }

  run("src/migrate.js");
  run("src/seed.js");
}

main();