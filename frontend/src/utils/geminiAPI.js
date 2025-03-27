import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY; // Ensure key is set
if (!API_KEY) {
  throw new Error("API Key is missing! Please check your .env file.");
}

const genAI = new GoogleGenAI({ apiKey: API_KEY });

export const getGeminiResponse = async (userInput) => {
  try {
    const model = genAI.models.get("gemini-2.0-flash");
    const result = await model.generateContent(userInput);
    const response = await result.response.text();

    return response || "Sorry, I couldn't understand that.";
  } catch (error) {
    console.error("Error fetching response:", error);
    return "Oops! Something went wrong.";
  }
};