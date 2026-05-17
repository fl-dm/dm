import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

export const flash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export const pro = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function ask(prompt: string, usePro = false): Promise<string> {
  const model = usePro ? pro : flash;
  const result = await model.generateContent(prompt);
  return result.response.text();
}
