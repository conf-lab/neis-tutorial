import { handleChatRequest } from "../src/server/chatHandler.js";

// Vercel serverless function for POST /api/chat.
// Vercel auto-detects any file under /api as a route (api/chat.ts -> /api/chat),
// separate from the Express dev server in server.ts used for local `npm run dev`.
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { status, json } = await handleChatRequest(req.body);
  res.status(status).json(json);
}
