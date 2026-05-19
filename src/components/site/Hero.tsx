import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useBookCall } from "./BookCallDialog";
import { Events, trackEvent } from "@/lib/analytics";

export function Hero() {
  const { open } = useBookCall();
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-32 pb-20">
      {/* Aurora background */}
      <div className="absolute inset-0 bg-hero-aurora" />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="noise absolute inset-0" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 -left-20 h-72 w-72 rounded-full bg-violet-glow/30 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-0 h-80 w-80 rounded-full bg-electric/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-glow opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-glow" />
          </span>
          AI Growth Intelligence · Now scaling 80+ brands
        </motion.div>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.95] tracking-tight"
            >
              Turn attention
              <br />
              into <span className="text-gradient-brand">revenue</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 max-w-xl text-lg text-muted-foreground"
            >
              100xiq is the growth-engineered ecosystem behind ambitious brands.
              We engineer marketing systems that compound traffic, leads, and
              revenue — without the agency bloat.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={() => {
                  trackEvent(Events.CtaClick, { location: "hero_primary" });
                  open("hero");
                }}
                className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-medium text-primary-foreground glow-shadow transition-transform hover:scale-[1.04]"
              >
                Book Growth Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-medium hover:bg-white/[0.08] transition-colors"
              >
                See Case Studies
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-12 grid grid-cols-3 gap-6 max-w-lg"
            >
              {[
                { v: "$420M+", l: "Revenue generated" },
                { v: "8.4x", l: "Avg. ROAS" },
                { v: "97%", l: "Client retention" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-semibold text-gradient">
                    {s.v}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Floating dashboard card */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-brand opacity-20 blur-3xl rounded-[2rem]" />
            <div className="relative glass card-shadow rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-cyan-glow" />
                  <span className="text-xs text-muted-foreground">
                    Growth Intelligence · Live
                  </span>
                </div>
                <span className="text-xs text-cyan-glow">↑ 312%</span>
              </div>

              <div className="mt-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Pipeline Velocity
                </div>
                <div className="mt-1 font-display text-4xl font-semibold">
                  $1.84M<span className="text-cyan-glow">/wk</span>
                </div>
              </div>

              {/* fake chart */}
              <div className="mt-6 h-32 relative">
                <svg viewBox="0 0 300 120" className="w-full h-full">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.68 0.25 295)" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="oklch(0.68 0.25 295)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.8 }}
                    d="M0,90 C40,80 60,70 90,55 C120,40 150,60 180,40 C210,20 240,30 270,15 L300,10"
                    fill="none"
                    stroke="oklch(0.72 0.2 255)"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M0,90 C40,80 60,70 90,55 C120,40 150,60 180,40 C210,20 240,30 270,15 L300,10 L300,120 L0,120 Z"
                    fill="url(#g1)"
                  />
                </svg>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3" /> CAC ↓
                  </div>
                  <div className="mt-1 font-display text-lg">−42%</div>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Zap className="h-3 w-3" /> Conversions
                  </div>
                  <div className="mt-1 font-display text-lg">12,847</div>
                </div>
              </div>
            </div>

            {/* floating mini cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 -bottom-6 glass card-shadow rounded-2xl p-3 hidden sm:block"
            >
              <div className="text-[10px] text-muted-foreground">CTR</div>
              <div className="font-display text-base">8.92%</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-10 glass card-shadow rounded-2xl p-3 hidden sm:block"
            >
              <div className="text-[10px] text-muted-foreground">ROAS</div>
              <div className="font-display text-base text-cyan-glow">9.4x</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
