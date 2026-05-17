import { NextRequest, NextResponse } from "next/server";
import { runMasterAgent } from "@/lib/agents/masterAgent";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userRequest, businessName, selectedOpportunity } = body;

    if (!userRequest) {
      return NextResponse.json({ error: "userRequest is required" }, { status: 400 });
    }

    const result = await runMasterAgent({ userRequest, businessName, selectedOpportunity });
    return NextResponse.json(result);
  } catch (err) {
    console.error("[agent]", err);
    return NextResponse.json({ error: "Agent failed" }, { status: 500 });
  }
}
