import app from "../server/src/createApp.js";

export default function handler(req, res) {
  return app(req, res);
}

export const config = {
  maxDuration: 30,
};