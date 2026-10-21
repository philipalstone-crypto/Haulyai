const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "100kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "Alstone Hauly AI starter backend" });
});

// Demo endpoint only. Connect a real AI provider here on the server.
// Keep API keys in server environment variables; never place them in public JS.
app.post("/api/chat", (req, res) => {
  const message = String(req.body?.message || "").trim();
  if (!message) return res.status(400).json({ error: "Please enter a message." });

  res.json({
    reply: "Thanks for your question! This is the starter demo response. To enable real AI answers, connect an AI provider securely in server.js using a server-side API key."
  });
});

app.listen(PORT, () => {
  console.log(`Alstone Hauly AI is running on port ${PORT}`);
});
