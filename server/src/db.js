export {
  dataDir,
  dbPath,
  ensureDataDir,
  useRemoteDb,
  initDb,
  sqlExec,
  sqlGet,
  sqlAll,
  sqlRun,
  getLibsqlClient,
  getSqliteDb,
} from "./db/drivers.js";

/** @deprecated use sqlGet/sqlAll/sqlRun — kept for migrate one-liners during transition */
export const db = {
  exec: (sql) => {
    throw new Error("Use sqlExec() — db.exec is sync-only and removed on Vercel.");
  },
  prepare: () => {
    throw new Error("Use sqlGet/sqlAll/sqlRun — db.prepare is sync-only.");
  },
};