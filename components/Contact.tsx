"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 px-6 bg-gray-950">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Get your free AI audit</h2>
          <p className="text-gray-400 text-lg">
            Tell me about your business. I&apos;ll come back with 3 specific AI wins you can
            act on — no pitch, no fluff.
          </p>
        </div>

        {status === "sent" ? (
          <div className="bg-violet-900/30 border border-violet-500/40 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-white text-xl font-semibold mb-2">Got it!</h3>
            <p className="text-gray-400">I&apos;ll review your business and send back opportunities within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="Francisco"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Company / Business</label>
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="What do you do?"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">What&apos;s your biggest time sink or missed opportunity? *</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                placeholder="e.g. We spend hours manually following up with leads..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white py-4 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02]"
            >
              {status === "sending" ? "Sending..." : "Send — it's free"}
            </button>
            {status === "error" && (
              <p className="text-red-400 text-sm text-center">Something went wrong. Email me directly.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
