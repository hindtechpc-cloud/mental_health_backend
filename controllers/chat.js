import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export const geminiChatController = async (req, res) => {
  console.log("➡ Controller hit");

  if (res.headersSent) {
    console.log("⚠ Response already sent by someone else!");
    return;
  }

  try {
    const { message } = req.body;
    console.log("User message:", message);

    const result = await model.generateContent(message);
    const reply = result.response.text();
    console.log("Gemini reply:", reply);

    if (res.headersSent) {
      console.log("⚠ Response already sent before Gemini finished!");
      return;
    }


    let aiText = "";
    if (reply.output && reply.output[0]?.content) {
      // Gemini returns an array of content objects
      aiText = reply.output[0].content
        .map((c) => c.text)
        .join(" ")
        // Post-process to make it human-readable:
        .replace(/\n{2,}/g, "\n")       // remove excessive line breaks
        .replace(/- /g, "• ")           // convert lists to bullets
        .replace(/\|.*?\|/g, "")        // remove table formatting
        .trim();
    }

    res.json({ reply: reply });
    console.log("📤 Response sent:", { reply: aiText });

  } catch (error) {
    console.error("Gemini Controller Error:", error.message);
    if (!res.headersSent) {
      return res.status(500).json({ reply: "Gemini API failed" });
    }
  }
};

