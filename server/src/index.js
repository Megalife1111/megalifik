import app from "./createApp.js";

const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, () => {
  console.log(`MegaLife LMS on http://localhost:${PORT}`);
});