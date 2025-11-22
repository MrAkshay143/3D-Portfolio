import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChatResponse = async (
  userMessage: string,
  chatHistory: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const model = "gemini-2.5-flash";
    
    // Convert internal chat history format to Gemini format if needed, 
    // but for single-turn or simple state managed externally, we can just use generateContent 
    // with system instruction for simplicity, or maintain a chat session.
    // Here we will use a fresh chat session for the context window approach 
    // or simply pass the history in a stateless manner if we were using a backend.
    // Since we are client-side, let's use the Chat API properly.

    // Map history to API format
    const history = chatHistory.map(msg => ({
      role: msg.role,
      parts: msg.parts
    }));

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("I'm having trouble connecting to the neural network right now. Please try again later.");
  }
};