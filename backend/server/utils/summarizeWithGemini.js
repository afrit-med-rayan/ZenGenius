// summarizeWithGemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const summarizeText = async (text) => {
  try {
    const prompt = `
      Summarize the following PDF content into concise bullet points.
      Highlight important sections and key ideas:\n\n${text}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini summarization failed:", error);
    throw new Error("Failed to summarize text with Gemini.");
  }
};
export const generateFlashcardsFromText = async (summaryText) => {
  try {
    const prompt = `
    Turn the following summary into a list of flashcards.
    Each flashcard should be in the format:
    Q: [Question]
    A: [Answer]

    Here's the summary:
    ${summaryText}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini flashcard generation failed:", error);
    throw new Error("Failed to generate flashcards.");
  }
};
