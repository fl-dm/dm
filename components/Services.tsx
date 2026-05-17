const services = [
  {
    icon: "🤖",
    title: "Master Agent Systems",
    description:
      "One agent that orchestrates many. Give it a goal — it figures out the steps, calls the right sub-agents, and delivers results.",
    price: "From $800",
  },
  {
    icon: "🔍",
    title: "Opportunity Finder Agent",
    description:
      "AI that scans your market, competitors, and leads to surface the highest-ROI moves you should be making right now.",
    price: "From $500",
  },
  {
    icon: "💬",
    title: "Auto-Reply & Follow-Up",
    description:
      "Never lose a lead. AI reads inbound messages, qualifies prospects, and sends smart replies — across email, SMS, or iMessage.",
    price: "From $400",
  },
  {
    icon: "📋",
    title: "Proposal Generator",
    description:
      "Feed in a business name. Get back a tailored pitch with pricing, deliverables, and talking points in under 60 seconds.",
    price: "From $300",
  },
  {
    icon: "📊",
    title: "Business Intelligence Agent",
    description:
      "Connects to your data and tells you what's actually happening — customer trends, churn signals, revenue patterns.",
    price: "From $600",
  },
  {
    icon: "⚡",
    title: "Rapid AI Audit",
    description:
      "30-minute session where I analyze your business and give you the top 3 AI quick wins with exact implementation plans.",
    price: "Free",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">What I build</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Practical AI systems that solve real problems and pay for themselves fast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-violet-500/50 transition-all hover:bg-gray-900/80"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.description}</p>
              <span className="text-violet-400 font-semibold text-sm">{s.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
