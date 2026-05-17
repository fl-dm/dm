import { ask } from "@/lib/gemini";
import { Opportunity } from "./opportunityFinder";

export interface Proposal {
  subject: string;
  hook: string;
  body: string;
  cta: string;
  price: string;
  deliverables: string[];
  timeline: string;
}

export async function generateProposal(
  opportunity: Opportunity,
  businessName: string
): Promise<Proposal> {
  const prompt = `You are an expert freelance AI consultant writing an outreach proposal. Be concise, specific, and value-focused. No fluff.

Business: ${businessName}
Industry: ${opportunity.industry}
Their pain point: ${opportunity.painPoint}
Your solution: ${opportunity.aiSolution}
Value: ${opportunity.estimatedValue}

Write a short, punchy cold outreach proposal. Return JSON only (no markdown):
{
  "subject": "email subject line",
  "hook": "1 sentence opener that shows you understand their problem",
  "body": "2-3 paragraph pitch, specific and concrete",
  "cta": "clear call to action",
  "price": "suggested price range",
  "deliverables": ["deliverable1", "deliverable2", "deliverable3"],
  "timeline": "e.g. 2 weeks"
}`;

  const raw = await ask(prompt, true);
  const cleaned = raw.replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(cleaned);
}
