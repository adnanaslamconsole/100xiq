import { motion } from "framer-motion";
import {
  Search, Target, Bot, Share2, FileText, Filter,
  Palette, MonitorSmartphone, MousePointerClick, Globe2, MessageSquare, Flame,
} from "lucide-react";

const services = [
  { icon: Search, title: "SEO Domination", desc: "Programmatic + topical authority engines that own the SERP." },
  { icon: Target, title: "Performance Marketing", desc: "Paid acquisition tuned for ROAS, not vanity clicks." },
  { icon: Bot, title: "AI Marketing Automation", desc: "Always-on systems that learn, segment, and convert." },
  { icon: Share2, title: "Social Media Growth", desc: "Audience compounding with creative-led storytelling." },
  { icon: FileText, title: "Content Systems", desc: "Editorial machines built for scale and search." },
  { icon: Filter, title: "Funnel Engineering", desc: "Every step modeled, tested, and tuned for revenue." },
  { icon: Palette, title: "Branding", desc: "Premium identity systems that command attention." },
  { icon: MonitorSmartphone, title: "Web Design", desc: "High-converting, cinematic websites that sell." },
  { icon: MousePointerClick, title: "Conversion Optimization", desc: "Lift compounding through experimentation." },
  { icon: Globe2, title: "Programmatic SEO", desc: "Thousands of pages, one intelligent system." },
  { icon: MessageSquare, title: "AI Chatbots", desc: "24/7 sales agents trained on your brand." },
  { icon: Flame, title: "Viral Creative Strategy", desc: "Hooks, scripts, and assets engineered to spread." },
];

export function Services() {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Capabilities</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            A complete <span className="text-gradient-brand">growth stack</span>,
            engineered to compound.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Replace your fragmented agencies with one intelligent system.
            Every channel, every funnel, every signal — orchestrated.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                className="group relative rounded-2xl glass p-6 overflow-hidden hover:border-white/20 transition-all"
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-brand opacity-0 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-violet-glow/40 transition-colors">
                    <Icon className="h-5 w-5 text-cyan-glow" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <div className="mt-5 flex items-center text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    Learn more <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
