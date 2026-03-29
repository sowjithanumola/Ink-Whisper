import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateLetter(
  purpose: string,
  recipient: string,
  tone: string,
  context: string
): Promise<string> {
  const prompt = `Write a ${tone} letter to ${recipient} about: ${purpose}. 
Context: ${context}.
Please provide a polished letter with a proper greeting, body, and closing.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are an expert letter writer. Generate clear, elegant, and well-structured letters. Keep them concise and focused on the purpose provided.",
    },
  });

  if (!response.text) {
    console.error("Gemini API response:", response);
    throw new Error("No text returned from Gemini API");
  }

  return response.text;
}
