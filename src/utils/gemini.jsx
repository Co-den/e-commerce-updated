import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);

export async function getProductSuggestion(productName) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Give me a short, catchy marketing suggestion or interesting fact for this product: ${productName}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Could not fetch AI suggestion.";
  }
}
