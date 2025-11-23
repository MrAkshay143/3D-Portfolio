
import { GoogleGenAI } from "@google/genai";

export const generateChatResponse = async (
  userMessage: string,
  chatHistory: { role: string; parts: { text: string }[] }[],
  systemInstruction: string,
  modelName: string = "gemini-2.5-flash",
  apiKey?: string
): Promise<string> => {
  try {
    // Determine which API key to use
    // Prioritize the user-provided key from Admin Panel, then fallback to environment variable
    const keyToUse = apiKey && apiKey.trim() !== "" ? apiKey : process.env.API_KEY;

    if (!keyToUse) {
        return "Error: API Key is missing. Please configure it in the Admin Panel or environment variables.";
    }

    // Initialize the client dynamically to support changing keys at runtime
    const ai = new GoogleGenAI({ apiKey: keyToUse });

    // Map history to API format
    const history = chatHistory.map(msg => ({
      role: msg.role,
      parts: msg.parts
    }));

    const chat = ai.chats.create({
      model: modelName,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the neural network right now. Please check the API Key configuration or try again later.";
  }
};
