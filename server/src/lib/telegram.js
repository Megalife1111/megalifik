const DEFAULT_CHAT_MAIN = "-447087970";
const DEFAULT_CHAT_HOMEWORK = "-695447439";

function token() {
  const t = process.env.TELEGRAM_BOT_TOKEN;
  if (!t) throw new Error("TELEGRAM_BOT_TOKEN is not set");
  return t;
}

function escapeTelegramText(s) {
  return String(s ?? "").replace(/\r\n/g, "\n");
}

export async function sendTelegramMessage(chatId, htmlLines) {
  const text = escapeTelegramText(htmlLines.join("\n"));
  const url = `https://api.telegram.org/bot${token()}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      parse_mode: "HTML",
      text,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram sendMessage failed: ${res.status} ${body}`);
  }
}

export async function sendTelegramDocument(chatId, buffer, filename) {
  const url = `https://api.telegram.org/bot${token()}/sendDocument`;
  const form = new FormData();
  form.append("chat_id", String(chatId));
  form.append("document", new Blob([buffer]), filename);
  const res = await fetch(url, { method: "POST", body: form });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram sendDocument failed: ${res.status} ${body}`);
  }
}

export function resolveChatId(kind) {
  if (kind === "homework") {
    return process.env.TELEGRAM_CHAT_ID_HOMEWORK || DEFAULT_CHAT_HOMEWORK;
  }
  return process.env.TELEGRAM_CHAT_ID_MAIN || DEFAULT_CHAT_MAIN;
}

/** Build legacy-style HTML message from POST body (jQuery form fields). */
export function buildResultsMessage(body) {
  const name = body.name;
  const surname = body.surname;
  if (!name || !surname) return null;

  const lines = [`<u>${name} ${surname}</u>`];
  if (body.title) lines.push(`<b>${body.title}</b>`);
  if (body.test) lines.push(`<b>${body.test}</b>`);
  if (body.result) lines.push(String(body.result));
  return lines;
}

export async function handleLegacyTelegramPost(req, res, chatKind) {
  try {
    const body = req.body || {};
    const lines = buildResultsMessage(body);
    if (!lines) {
      res.status(400).send("");
      return;
    }
    const chatId = resolveChatId(chatKind);
    await sendTelegramMessage(chatId, lines);

    if (body.file && typeof body.file === "string" && body.file.includes("base64")) {
      const raw = body.file.replace(/^data:image\/png;base64,/, "").replace(/ /g, "+");
      const buffer = Buffer.from(raw, "base64");
      const filename = `${body.name} ${body.surname} ${body.title || ""} ${body.test || ""}.png`
        .trim()
        .replace(/\s+/g, " ");
      await sendTelegramDocument(chatId, buffer, filename || "screenshot.png");
    }
    res.status(200).send("");
  } catch (err) {
    console.error(err);
    res.status(500).send("");
  }
}