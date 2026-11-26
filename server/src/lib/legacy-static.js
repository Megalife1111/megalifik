import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { sqlGet, sqlAll } from "../db.js";
import { getCourseAccessState, userCanAccessMaterial } from "./access.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..", "..", "..");

const PROTECTED_PREFIXES = [
  "/courses/",
  "/homework/",
  "/english/",
  "/reading/",
  "/reading-speed/",
  "/conformity/",
  "/texts/",
  "/reading-by-algorithm/",
];

export function isProtectedLegacyPath(urlPath) {
  if (!urlPath || urlPath.startsWith("/api") || urlPath.startsWith("/portal")) return false;
  if (urlPath === "/motivational-trainer.html") return true;
  if (urlPath === "/memory.html" || urlPath === "/emotional-intelligence.html") return true;
  return PROTECTED_PREFIXES.some((p) => urlPath.startsWith(p));
}

async function courseForLegacyPath(urlPath) {
  const direct = await sqlGet(
    `SELECT id, access_mode FROM courses WHERE legacy_index_path = ? AND is_active = 1`,
    [urlPath],
  );
  if (direct) return direct;

  const material = await sqlGet(
    `SELECT m.id, c.id AS course_id, c.access_mode
     FROM materials m
     JOIN courses c ON c.id = m.course_id
     WHERE m.content_url = ? AND m.is_active = 1 AND c.is_active = 1`,
    [urlPath],
  );
  if (material) return { id: material.course_id, access_mode: material.access_mode, materialId: material.id };

  const courses = await sqlAll(`SELECT id, access_mode, legacy_index_path FROM courses WHERE is_active = 1`);
  for (const c of courses) {
    if (c.legacy_index_path && urlPath.startsWith(c.legacy_index_path.replace(/\/[^/]+$/, "/"))) {
      return c;
    }
    const prefixMaterials = await sqlGet(
      `SELECT m.id FROM materials m WHERE m.course_id = ? AND m.is_active = 1 AND ? LIKE m.content_url || '%' LIMIT 1`,
      [c.id, urlPath],
    );
    if (prefixMaterials) return { id: c.id, access_mode: c.access_mode, materialId: prefixMaterials.id };
  }
  return null;
}

export async function checkLegacyPathAccess(userId, urlPath) {
  if (!isProtectedLegacyPath(urlPath)) return { allowed: true, publicAsset: true };

  if (!userId) return { allowed: false, reason: "login_required" };

  const hit = await courseForLegacyPath(urlPath);
  if (!hit) return { allowed: true, unknownPath: true };

  if (hit.materialId) {
    const m = await userCanAccessMaterial(userId, hit.materialId);
    return { allowed: m.allowed, reason: m.reason };
  }

  const course = await sqlGet(`SELECT * FROM courses WHERE id = ?`, [hit.id]);
  const access = await getCourseAccessState(userId, course);
  return { allowed: access.canView, reason: access.status };
}

export function resolveLegacyFile(urlPath) {
  const safe = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  const abs = path.join(rootDir, safe);
  if (!abs.startsWith(rootDir)) return null;
  if (!fs.existsSync(abs) || fs.statSync(abs).isDirectory()) return null;
  return abs;
}