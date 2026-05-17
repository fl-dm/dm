import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const FAST_MODEL = "llama-3.3-70b-versatile";
const SMART_MODEL = "llama-3.3-70b-versatile";

export async function ask(prompt: string, usePro = false): Promise<string> {
  const model = usePro ? SMART_MODEL : FAST_MODEL;
  const completion = await groq.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 2048,
  });
  return completion.choices[0]?.message?.content ?? "";
}
