import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Launch",
    price: "$8K",
    cadence: "/month",
    desc: "For ambitious challengers ready to install a real growth engine.",
    features: ["Full audit + strategy", "1 paid channel mastery", "Creative system + assets", "Weekly optimization sprints", "Slack + dashboard access"],
  },
  {
    name: "Scale",
    price: "$22K",
    cadence: "/month",
    desc: "For teams ready to compound across paid, organic, and lifecycle.",
    features: ["Everything in Launch", "Multi-channel orchestration", "Programmatic SEO engine", "Growth automation + chatbots", "Conversion lab (CRO)", "Bi-weekly executive reviews"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    desc: "For category leaders who refuse to lose. Custom systems, custom outcomes.",
    features: ["Dedicated growth pod", "Custom AI infrastructure", "Brand + identity systems", "Global market expansion", "C-suite advisory", "Quarterly off-sites"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Engagements</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            Premium retainers.
            <br /><span className="text-gradient-brand">Asymmetric returns.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            We onboard a limited number of brands per quarter. If we say yes, we go all-in.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 flex flex-col ${
                t.popular
                  ? "bg-gradient-brand text-primary-foreground glow-shadow"
                  : "glass card-shadow"
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-background border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-cyan-glow">
                  Most chosen
                </span>
              )}
              <div className="font-display text-2xl font-semibold">{t.name}</div>
              <p className={`mt-2 text-sm ${t.popular ? "text-white/80" : "text-muted-foreground"}`}>{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold">{t.price}</span>
                <span className={`text-sm ${t.popular ? "text-white/80" : "text-muted-foreground"}`}>{t.cadence}</span>
              </div>
              <ul className="mt-8 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${t.popular ? "text-white" : "text-cyan-glow"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-transform hover:scale-[1.02] ${
                  t.popular
                    ? "bg-background text-foreground"
                    : "bg-gradient-brand text-primary-foreground glow-shadow"
                }`}
              >
                Apply to work with us
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
