import { execSync } from "node:child_process";

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

  execSync("node src/migrate.js", { stdio: "inherit" });
  execSync("node src/seed.js", { stdio: "inherit" });
}

main();