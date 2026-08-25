import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { handleChatRequest } from "./src/server/chatHandler";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// AI Assistant Endpoint (shared logic also powers the Vercel function in api/chat.ts)
app.post("/api/chat", async (req, res) => {
  const { status, json } = await handleChatRequest(req.body);
  res.status(status).json(json);
});

// Quick FAQ endpoint for instant offline manual tips
app.get("/api/manual/topics", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
