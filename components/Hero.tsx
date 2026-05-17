"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-24 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-black to-black pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 border border-violet-500/30 rounded-full px-4 py-1.5 text-sm text-violet-300 mb-8">
          <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
          AI agents that make your business money
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold leading-tight tracking-tight mb-6">
          I build AI agents
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
            that actually work.
          </span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          Custom AI automation for small and mid-size businesses. From lead follow-up to
          full agent pipelines — I find the quick wins and ship them fast.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="#contact"
            className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
          >
            Get a free opportunity audit
          </Link>
          <Link
            href="/dashboard"
            className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
          >
            Try the agent live
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap gap-8 text-sm text-gray-500">
          {["Lead qualification agents", "Auto-reply systems", "Opportunity finders", "Custom pipelines"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="text-violet-400">+</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
