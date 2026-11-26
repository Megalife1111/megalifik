import { Router } from "express";
import { handleLegacyTelegramPost } from "../lib/telegram.js";

const router = Router();

router.post("/test", (req, res) => handleLegacyTelegramPost(req, res, "main"));
router.post("/homework", (req, res) => handleLegacyTelegramPost(req, res, "homework"));
router.post("/reading", (req, res) => handleLegacyTelegramPost(req, res, "main"));
router.post("/emotional", (req, res) => handleLegacyTelegramPost(req, res, "main"));
router.post("/trainer", (req, res) => handleLegacyTelegramPost(req, res, "main"));
router.post("/conformity", (req, res) => handleLegacyTelegramPost(req, res, "main"));
router.post("/memory", (req, res) => handleLegacyTelegramPost(req, res, "main"));

export default router;