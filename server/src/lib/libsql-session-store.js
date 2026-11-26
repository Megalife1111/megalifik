import { createRequire } from "module";
import { getLibsqlClient } from "../db/drivers.js";

const require = createRequire(import.meta.url);
const { Store } = require("express-session");

const TABLE = `CREATE TABLE IF NOT EXISTS express_sessions (
  sid TEXT PRIMARY KEY,
  sess TEXT NOT NULL,
  expired INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_express_sessions_expired ON express_sessions (expired);`;

export class LibsqlSessionStore extends Store {
  constructor() {
    super();
    this._ready = import("../db/drivers.js").then(({ initDb, sqlExec }) =>
      initDb().then(() => sqlExec(TABLE)),
    );
  }

  async _client() {
    await this._ready;
    const client = getLibsqlClient();
    if (!client) throw new Error("LibsqlSessionStore requires TURSO_DATABASE_URL");
    return client;
  }

  get(sid, callback) {
    this._client()
      .then((client) =>
        client.execute({
          sql: `SELECT sess, expired FROM express_sessions WHERE sid = ? AND expired > ?`,
          args: [sid, Date.now()],
        }),
      )
      .then((r) => {
        const row = r.rows[0];
        if (!row) return callback(null, null);
        const raw = typeof row === "object" && !Array.isArray(row) ? row.sess : row[0];
        const sess = JSON.parse(String(raw));
        callback(null, sess);
      })
      .catch((err) => callback(err));
  }

  set(sid, sess, callback) {
    const expired = sess.cookie?.expires
      ? new Date(sess.cookie.expires).getTime()
      : Date.now() + 7 * 24 * 60 * 60 * 1000;
    const payload = JSON.stringify(sess);
    this._client()
      .then((client) =>
        client.execute({
          sql: `INSERT INTO express_sessions (sid, sess, expired) VALUES (?, ?, ?)
                ON CONFLICT(sid) DO UPDATE SET sess = excluded.sess, expired = excluded.expired`,
          args: [sid, payload, expired],
        }),
      )
      .then(() => callback(null))
      .catch((err) => callback(err));
  }

  destroy(sid, callback) {
    this._client()
      .then((client) =>
        client.execute({ sql: `DELETE FROM express_sessions WHERE sid = ?`, args: [sid] }),
      )
      .then(() => callback(null))
      .catch((err) => callback(err));
  }

  touch(sid, sess, callback) {
    this.set(sid, sess, callback);
  }
}