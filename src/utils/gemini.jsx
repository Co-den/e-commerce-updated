import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
const genAI = new GoogleGenAI({
  apiKey: "AIzaSyD1XHXG6o0kUZPICnLs1E-vzXxMaHVc2RE",
});

export async function getProductSuggestion(productName) {
  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      prompt: `Give me a short, catchy marketing suggestion or interesting fact for this product: ${productName}`,
      maxOutputTokens: 50,
      temperature: 0.7,
    });
    return result.responseId.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Could not fetch AI suggestion.";
  }
}
