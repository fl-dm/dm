const steps = [
  {
    num: "01",
    title: "Free AI Audit",
    desc: "Tell me about your business. I run my opportunity finder agent and surface the top 3 quick wins specific to you.",
  },
  {
    num: "02",
    title: "I build it fast",
    desc: "Most agents ship in 1–2 weeks. You see working demos before you pay the full amount.",
  },
  {
    num: "03",
    title: "You make money",
    desc: "Agents run 24/7. They save you time, follow up with leads, and surface opportunities you'd have missed.",
  },
  {
    num: "04",
    title: "We scale it",
    desc: "Once the first agent proves ROI, we add more. Build a full AI-powered operation over time.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How it works</h2>
          <p className="text-gray-400 text-lg">Simple process. Real results.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-5">
              <div className="text-violet-400 font-bold text-3xl font-mono w-12 shrink-0">
                {s.num}
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
