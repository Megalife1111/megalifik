import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const dataDir = path.join(__dirname, "..", "..", "data");
export const dbPath = path.join(dataDir, "lms.sqlite");

export function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

export function useRemoteDb() {
  return Boolean(process.env.TURSO_DATABASE_URL);
}

function rowFromLibsql(row, columns) {
  if (!row) return undefined;
  if (row && typeof row === "object" && !Array.isArray(row)) return row;
  if (!columns?.length) return undefined;
  const out = {};
  for (let i = 0; i < columns.length; i++) {
    out[columns[i]] = row[i];
  }
  return out;
}

/** @type {import("@libsql/client").Client | null} */
let libsqlClient = null;
/** @type {import("better-sqlite3").Database | null} */
let sqliteDb = null;

export async function initDb() {
  if (useRemoteDb()) {
    if (!libsqlClient) {
      const { createClient } = await import("@libsql/client");
      libsqlClient = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
      });
    }
    return;
  }
  if (!sqliteDb) {
    ensureDataDir();
    const Database = (await import("better-sqlite3")).default;
    sqliteDb = new Database(dbPath);
    sqliteDb.pragma("journal_mode = WAL");
    sqliteDb.pragma("foreign_keys = ON");
  }
}

export async function sqlExec(sql) {
  await initDb();
  if (libsqlClient) {
    const parts = sql
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const part of parts) {
      await libsqlClient.execute(part);
    }
    return;
  }
  sqliteDb.exec(sql);
}

export async function sqlGet(sql, args = []) {
  await initDb();
  if (libsqlClient) {
    const r = await libsqlClient.execute({ sql, args });
    return rowFromLibsql(r.rows[0], r.columns);
  }
  return sqliteDb.prepare(sql).get(...args);
}

export async function sqlAll(sql, args = []) {
  await initDb();
  if (libsqlClient) {
    const r = await libsqlClient.execute({ sql, args });
    return r.rows.map((row) => rowFromLibsql(row, r.columns));
  }
  return sqliteDb.prepare(sql).all(...args);
}

export async function sqlRun(sql, args = []) {
  await initDb();
  if (libsqlClient) {
    const r = await libsqlClient.execute({ sql, args });
    return {
      changes: r.rowsAffected,
      lastInsertRowid: Number(r.lastInsertRowid),
    };
  }
  return sqliteDb.prepare(sql).run(...args);
}

export function getLibsqlClient() {
  return libsqlClient;
}

export function getSqliteDb() {
  return sqliteDb;
}