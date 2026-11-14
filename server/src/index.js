import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import connectSqlite3 from "connect-sqlite3";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.js";
import coursesRoutes from "./routes/courses.js";
import adminRoutes from "./routes/admin.js";
import { attachSessionUser } from "./middleware/auth.js";
import { dataDir, db } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..", "..");
const PORT = Number(process.env.PORT || 3000);
const SQLiteStore = connectSqlite3(session);

const app = express();

app.set("trust proxy", 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));

const sessionMiddleware = session({
  store: new SQLiteStore({ dir: dataDir, db: "sessions.sqlite" }),
  secret: process.env.SESSION_SECRET || "megalife-dev-secret-change-me",
  resave: false,
  saveUninitialized: false,
  name: "megalife.sid",
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
});

app.use(sessionMiddleware);
app.use(attachSessionUser);

function csrfGuard(req, res, next) {
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) return next();
  if (req.path.startsWith("/auth/login") || req.path.startsWith("/auth/register")) {
    return next();
  }
  const token = req.get("x-csrf-token");
  if (!token || token !== req.session?.csrfToken) {
    return res.status(403).json({ error: "Недействительный CSRF-токен." });
  }
  next();
}

app.use("/api", csrfGuard);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Слишком много запросов. Попробуйте позже." },
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

/** Resolve legacy content URL -> material id for progress widget injection */
app.get("/api/legacy/material-by-path", (req, res) => {
  if (!req.session?.userId) return res.json({ material: null });
  const p = req.query.path;
  if (!p) return res.json({ material: null });
  const material = db
    .prepare(`SELECT id, course_id, title FROM materials WHERE content_url = ? AND is_active = 1`)
    .get(p);
  res.json({ material: material || null });
});

if (process.env.LMS_PROTECT_LEGACY === "true") {
  app.use((req, res, next) => {
    const protectedPrefixes = ["/courses/", "/homework/", "/english/", "/reading/"];
    if (!protectedPrefixes.some((p) => req.path.startsWith(p))) return next();
    if (!req.session?.userId) {
      return res.redirect(`/portal/login.html?next=${encodeURIComponent(req.originalUrl)}`);
    }
    return next();
  });
}

app.use(express.static(rootDir, { index: ["index.html"] }));

app.listen(PORT, () => {
  console.log(`MegaLife LMS on http://localhost:${PORT}`);
});