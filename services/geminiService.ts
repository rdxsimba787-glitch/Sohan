
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Use the correct initialization for GoogleGenAI with a named parameter and direct environment variable access.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateServerLogs = async (serverName: string, action: 'start' | 'stop') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a realistic sequence of Minecraft server logs for a server named "${serverName}" performing a "${action}" sequence. Include timestamps and common Java/PaperMC log prefixes like [INFO], [WARN], etc. Output must be a JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    // Fix: Access the .text property directly and ensure it's trimmed and valid for parsing.
    return JSON.parse(response.text?.trim() || '[]');
  } catch (error) {
    console.error("Error generating logs:", error);
    return [
      `[${new Date().toLocaleTimeString()}] [Server thread/INFO]: Starting minecraft server version 1.20.1`,
      `[${new Date().toLocaleTimeString()}] [Server thread/INFO]: Loading properties`,
      `[${new Date().toLocaleTimeString()}] [Server thread/INFO]: Default game type: SURVIVAL`,
      `[${new Date().toLocaleTimeString()}] [Server thread/INFO]: Generating keypair`,
      `[${new Date().toLocaleTimeString()}] [Server thread/INFO]: Starting Minecraft server on *:25565`,
      `[${new Date().toLocaleTimeString()}] [Server thread/INFO]: Using default channel type`,
      `[${new Date().toLocaleTimeString()}] [Server thread/INFO]: Preparing level "world"`,
      `[${new Date().toLocaleTimeString()}] [Server thread/INFO]: Preparing start region for dimension minecraft:overworld`,
      `[${new Date().toLocaleTimeString()}] [Server thread/INFO]: Done (1.4s)! For help, type "help"`
    ];
  }
};

export const getSmartAdminAdvice = async (currentLogs: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a Pterodactyl Panel AI Assistant. Based on these logs: ${currentLogs.slice(-10).join('\n')}, give a brief (1 sentence) status update or advice for the server admin.`,
    });
    // Fix: Access .text property directly.
    return response.text || "Server is operating within normal parameters.";
  } catch (error) {
    return "Server is operating within normal parameters.";
  }
};
