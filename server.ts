import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini API Client to prevent startup crash if key is missing
let aiClient: any = null;
function getGemini() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please add it to Secrets in Settings.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Dental AI Siri Assistant API Route
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array provided." });
    }

    const ai = getGemini();

    // Map message history into the contents format expected by Gemini
    // Ensure we send structured messages
    const formattedContents = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    // Add a highly specialized, clean dental clinician assistant context instruction
    const systemInstruction = 
      "You are Siri Dental, the state-of-the-art interactive AI Assistant for Pearl Dental Clinic in Cupertino, built with Apple-style elegance, clean clarity, and warmth. " +
      "Your tone must be highly professional, clinical, helpful, and concise. Speak clearly to patient concerns, always prioritize dental hygiene facts and gentle treatment support. " +
      "You guide users with diagnostic wisdom (reminding them that clinical checkups are necessary) and suggest bookings. " +
      "If a patient asks about booking procedures, treatments, teeth pain, or veneers, answer their questions with elegant medical logic, and encourage them to click 'Book Appointment' on the screen. " +
      "Do not output technical markup, keep explanations short and easy to digest (max 2-3 short, clean sentences).";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const aiText = response.text || "I am here to assist you with your smile. Please let me know how I can help.";
    return res.json({ text: aiText });
  } catch (error: any) {
    console.error("Gemini Assistant Error:", error);
    return res.status(500).json({ 
      error: error.message || "An issue occurred while processing your query with Siri Dental." 
    });
  }
});

// Setup Vite Dev Server / Static Production Server
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev server mounted as Express middleware.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static build from: " + distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dental Clinic server listening on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
