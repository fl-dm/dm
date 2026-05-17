"use client";

import { useState } from "react";
import Link from "next/link";
import { Opportunity } from "@/lib/agents/opportunityFinder";
import { Proposal } from "@/lib/agents/proposalGenerator";

type Tab = "opportunities" | "proposal" | "research";

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("opportunities");
  const [input, setInput] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [research, setResearch] = useState("");
  const [error, setError] = useState("");

  async function runAgent(userRequest: string, extra?: object) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userRequest, ...extra }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function findOpps() {
    const result = await runAgent(`Find AI opportunities for: ${input}`);
    if (result?.data) setOpportunities(result.data as Opportunity[]);
  }

  async function genProposal() {
    if (!selectedOpp) return;
    const result = await runAgent("generate a proposal", {
      businessName,
      selectedOpportunity: selectedOpp,
    });
    if (result?.data) setProposal(result.data as Proposal);
  }

  async function doResearch() {
    const result = await runAgent(input || "AI opportunities in 2025");
    if (result?.data) setResearch(typeof result.data === "string" ? result.data : JSON.stringify(result.data, null, 2));
  }

  const diffColor: Record<string, string> = {
    Easy: "bg-green-500/20 text-green-400",
    Medium: "bg-yellow-500/20 text-yellow-400",
    Hard: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-violet-400 font-bold text-lg">← Back to site</Link>
        <h1 className="font-semibold text-white">AI Agent Dashboard</h1>
        <div className="w-24" />
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex gap-2 mb-8 border-b border-gray-800 pb-4">
          {(["opportunities", "proposal", "research"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg font-medium capitalize text-sm transition-all ${
                tab === t
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {t === "opportunities" ? "Find Opportunities" : t === "proposal" ? "Generate Proposal" : "Market Research"}
            </button>
          ))}
        </div>

        {tab === "opportunities" && (
          <div className="space-y-6">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && findOpps()}
                placeholder="Describe a business or industry (e.g. local real estate agency)"
                className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
              />
              <button
                onClick={findOpps}
                disabled={loading || !input}
                className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 px-6 py-3 rounded-xl font-semibold transition-all"
              >
                {loading ? "Finding..." : "Find Wins"}
              </button>
            </div>

            {error && <p className="text-red-400">{error}</p>}

            <div className="space-y-4">
              {opportunities.map((opp, i) => (
                <div
                  key={i}
                  onClick={() => { setSelectedOpp(opp); setTab("proposal"); }}
                  className="bg-gray-900 border border-gray-800 hover:border-violet-500/50 rounded-2xl p-6 cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-gray-500 text-xs uppercase tracking-wide">{opp.industry}</span>
                      <h3 className="text-white font-semibold text-lg mt-0.5">{opp.aiSolution}</h3>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${diffColor[opp.difficulty]}`}>
                        {opp.difficulty}
                      </span>
                      <span className="text-violet-400 text-sm font-semibold">{opp.estimatedValue}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{opp.painPoint}</p>
                  <div className="flex flex-wrap gap-2">
                    {opp.talkingPoints.map((pt, j) => (
                      <span key={j} className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full">{pt}</span>
                    ))}
                  </div>
                  <p className="text-violet-400 text-xs mt-3">Click to generate proposal →</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "proposal" && (
          <div className="space-y-6">
            {selectedOpp && (
              <div className="bg-violet-900/20 border border-violet-500/30 rounded-xl p-4 text-sm text-violet-300">
                Selected: <strong>{selectedOpp.aiSolution}</strong> — {selectedOpp.industry}
              </div>
            )}
            <div className="flex gap-3">
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Business name to address proposal to"
                className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
              />
              <button
                onClick={genProposal}
                disabled={loading || !selectedOpp || !businessName}
                className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 px-6 py-3 rounded-xl font-semibold transition-all"
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
            {!selectedOpp && (
              <p className="text-gray-500 text-sm">Go to &quot;Find Opportunities&quot; and click one to select it first.</p>
            )}
            {error && <p className="text-red-400">{error}</p>}
            {proposal && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Subject line</label>
                  <p className="text-white font-semibold mt-1">{proposal.subject}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Hook</label>
                  <p className="text-gray-300 mt-1 italic">&quot;{proposal.hook}&quot;</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Body</label>
                  <p className="text-gray-300 mt-1 whitespace-pre-line">{proposal.body}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">Price</label>
                    <p className="text-violet-400 font-semibold mt-1">{proposal.price}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">Timeline</label>
                    <p className="text-white mt-1">{proposal.timeline}</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Deliverables</label>
                  <ul className="mt-2 space-y-1">
                    {proposal.deliverables.map((d, i) => (
                      <li key={i} className="text-gray-300 text-sm flex gap-2"><span className="text-violet-400">+</span>{d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">Call to action</label>
                  <p className="text-green-400 mt-1 font-medium">{proposal.cta}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "research" && (
          <div className="space-y-6">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && doResearch()}
                placeholder="e.g. healthcare AI, local service businesses, ecommerce..."
                className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
              />
              <button
                onClick={doResearch}
                disabled={loading}
                className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 px-6 py-3 rounded-xl font-semibold transition-all"
              >
                {loading ? "Researching..." : "Research"}
              </button>
            </div>
            {error && <p className="text-red-400">{error}</p>}
            {research && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">{research}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
