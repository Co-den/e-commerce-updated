import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
const genAI = new GoogleGenAI({
  apiKey: "AIzaSyD1XHXG6o0kUZPICnLs1E-vzXxMaHVc2RE",
});

export async function getProductSuggestion(productName) {
  try {
    // Call Gemini to get a product suggestion
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Give me a short, catchy marketing suggestion or interesting fact for this product: ${productName}`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 50,
        temperature: 0.7,
      },
    });

    // Extract and return the text response
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Could not fetch AI suggestion.";
  }
}
