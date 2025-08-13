import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyD1XHXG6o0kUZPICnLs1E-vzXxMaHVc2RE");

export async function getProductSuggestion(productName) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(
      `Give me a short, source for this product: ${productName}`
    );

    // Safety check in case the response is missing
    if (!result || !result.response) {
      throw new Error("No response from Gemini API");
    }

    const text = result.response.text();
    return text;
  } catch (error) {
    console.error("Gemini API error:", error.message || error);
    return "Could not fetch AI suggestion.";
  }
}
