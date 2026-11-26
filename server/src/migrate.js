import { sqlExec, sqlAll, initDb } from "./db.js";

const migrations = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  phone TEXT UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'blocked')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  access_mode TEXT NOT NULL DEFAULT 'open'
    CHECK (access_mode IN ('open', 'closed', 'selected', 'approval')),
  theme TEXT,
  legacy_index_path TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS materials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  content_type TEXT NOT NULL DEFAULT 'legacy_html'
    CHECK (content_type IN ('legacy_html', 'external', 'placeholder')),
  content_url TEXT NOT NULL,
  is_required INTEGER NOT NULL DEFAULT 1,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS course_access (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('granted', 'pending', 'rejected', 'blocked')),
  admin_comment TEXT,
  decided_by INTEGER REFERENCES users(id),
  decided_at TEXT,
  requested_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (user_id, course_id)
);

CREATE TABLE IF NOT EXISTS material_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  material_id INTEGER NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started'
  CHECK (status IN ('not_started', 'in_progress', 'completed')),
  completed_at TEXT,
  metadata TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (user_id, material_id)
);

CREATE TABLE IF NOT EXISTS login_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  identifier TEXT NOT NULL,
  attempted_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_materials_course ON materials(course_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_progress_user ON material_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_course_access_user ON course_access(user_id);
CREATE INDEX IF NOT EXISTS idx_login_attempts_id ON login_attempts(identifier, attempted_at);
`;

async function main() {
  await initDb();
  await sqlExec(migrations);
  const courseCols = await sqlAll(`PRAGMA table_info(courses)`);
  if (!courseCols.some((c) => c.name === "cover_image")) {
    await sqlExec(`ALTER TABLE courses ADD COLUMN cover_image TEXT`);
  }

  await sqlExec(`
CREATE TABLE IF NOT EXISTS children (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INTEGER,
  grade TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_children_user ON children(user_id);
`);

  const userCols = await sqlAll(`PRAGMA table_info(users)`);
  if (!userCols.some((c) => c.name === "parent_first_name")) {
    await sqlExec(`ALTER TABLE users ADD COLUMN parent_first_name TEXT`);
  }
  if (!userCols.some((c) => c.name === "parent_last_name")) {
    await sqlExec(`ALTER TABLE users ADD COLUMN parent_last_name TEXT`);
  }

  await sqlExec(`
    UPDATE courses SET access_mode = 'selected'
    WHERE slug IN ('megachtivo', 'neurochtivo', 'prochtivo');
    UPDATE users SET parent_first_name = COALESCE(parent_first_name, name)
    WHERE parent_first_name IS NULL AND name IS NOT NULL;
  `);

  console.log("Migrations applied.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});