import { ask } from "@/lib/gemini";

export interface Opportunity {
  industry: string;
  painPoint: string;
  aiSolution: string;
  estimatedValue: string;
  difficulty: "Easy" | "Medium" | "Hard";
  talkingPoints: string[];
}

export async function findOpportunities(context: string): Promise<Opportunity[]> {
  const prompt = `You are an AI business development agent. Your job is to find easy-win opportunities for an AI consulting freelancer to approach businesses.

Context from the user: ${context}

Generate 5 specific, actionable business opportunities where AI agents can create clear ROI. Focus on:
- Small to medium businesses that are behind on AI adoption
- Problems that can be solved with simple agent automation
- Quick wins that can be delivered in 1-4 weeks
- Things that clearly save time or make money

Return a JSON array with exactly this structure (no markdown, just JSON):
[
  {
    "industry": "string",
    "painPoint": "specific problem they have",
    "aiSolution": "exact AI agent solution to build",
    "estimatedValue": "e.g. $500-2000/month saved",
    "difficulty": "Easy|Medium|Hard",
    "talkingPoints": ["point1", "point2", "point3"]
  }
]`;

  const raw = await ask(prompt);
  const cleaned = raw.replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(cleaned);
}
