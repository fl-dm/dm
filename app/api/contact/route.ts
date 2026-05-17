import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Log lead — wire up email/Supabase here later
    console.log("[LEAD]", { name, email, company, message, ts: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
