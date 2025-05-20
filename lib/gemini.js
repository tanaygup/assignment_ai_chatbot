import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDKtX0Qk5Py-7_WYuVTTZLJJXfpny3XrSg");

export async function chatWithPDF(prompt, context) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });

    const result = await chat.sendMessage(
      `Context from PDF: ${context}\n\nUser Question: ${prompt}`
    );
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error in Gemini API:", error);
    throw error;
  }
}

export async function summarizePDF(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Please provide a concise summary of the following text from a PDF document: ${text}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error summarizing PDF:", error);
    throw error;
  }
}