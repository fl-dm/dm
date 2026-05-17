import { ask } from "@/lib/gemini";
import { findOpportunities, Opportunity } from "./opportunityFinder";
import { generateProposal, Proposal } from "./proposalGenerator";

export type AgentTask =
  | "find_opportunities"
  | "generate_proposal"
  | "analyze_business"
  | "market_research";

export interface AgentResult {
  task: AgentTask;
  status: "success" | "error";
  data: unknown;
  summary: string;
}

export interface MasterAgentInput {
  userRequest: string;
  businessName?: string;
  selectedOpportunity?: Opportunity;
}

async function analyzeRequest(request: string): Promise<AgentTask> {
  const prompt = `Classify this user request into exactly one of these tasks:
- find_opportunities
- generate_proposal
- analyze_business
- market_research

Request: "${request}"

Reply with just the task name, nothing else.`;

  const task = (await ask(prompt)).trim() as AgentTask;
  return task;
}

async function analyzeBusiness(name: string, context: string): Promise<string> {
  return ask(`Analyze this business quickly and identify their top 3 AI opportunities with specific ROI numbers.
Business: ${name}
Context: ${context}

Be specific and concrete. 200 words max.`);
}

async function doMarketResearch(topic: string): Promise<string> {
  return ask(`Do quick market research on AI opportunities in: ${topic}

Cover:
1. Top 3 industries ripe for AI automation right now
2. Average deal sizes for each
3. Easiest entry point

150 words max. Be specific.`);
}

export async function runMasterAgent(
  input: MasterAgentInput
): Promise<AgentResult> {
  const task = await analyzeRequest(input.userRequest);

  try {
    switch (task) {
      case "find_opportunities": {
        const opportunities = await findOpportunities(input.userRequest);
        return {
          task,
          status: "success",
          data: opportunities,
          summary: `Found ${opportunities.length} opportunities ranked by difficulty`,
        };
      }

      case "generate_proposal": {
        if (!input.selectedOpportunity || !input.businessName) {
          throw new Error("Need a business name and selected opportunity");
        }
        const proposal = await generateProposal(
          input.selectedOpportunity,
          input.businessName
        );
        return {
          task,
          status: "success",
          data: proposal,
          summary: `Generated proposal for ${input.businessName}`,
        };
      }

      case "analyze_business": {
        const analysis = await analyzeBusiness(
          input.businessName ?? "Unknown",
          input.userRequest
        );
        return {
          task,
          status: "success",
          data: analysis,
          summary: "Business analysis complete",
        };
      }

      case "market_research": {
        const research = await doMarketResearch(input.userRequest);
        return {
          task,
          status: "success",
          data: research,
          summary: "Market research complete",
        };
      }

      default: {
        const fallback = await ask(input.userRequest);
        return {
          task: "market_research",
          status: "success",
          data: fallback,
          summary: "General AI response",
        };
      }
    }
  } catch (err) {
    return {
      task,
      status: "error",
      data: null,
      summary: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
