import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { useBookCall } from "./BookCallDialog";
import { Events, trackEvent } from "@/lib/analytics";
import { COMPANY } from "@/lib/site-content";

export function CTA() {
  const { open } = useBookCall();
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] glass card-shadow p-10 md:p-20 text-center">
          <div className="absolute inset-0 bg-hero-aurora opacity-80" />
          <div className="absolute inset-0 grid-bg opacity-50" />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-violet-glow/30 blur-3xl"
          />

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">The window is closing</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight">
              Your competitors are
              <br /> already <span className="text-gradient-brand">scaling</span>.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Attention is the new currency. Let's make sure you own it.
              Book a 30-minute growth call — no decks, just leverage.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  trackEvent(Events.CtaClick, { location: "cta_section_primary" });
                  open("cta_section");
                }}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-4 text-base font-medium text-primary-foreground glow-shadow transition-transform hover:scale-[1.04]"
              >
                Book Growth Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={`mailto:${COMPANY.email}`}
                onClick={() => trackEvent(Events.CtaClick, { location: "cta_section_email" })}
                className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-base font-medium hover:bg-white/[0.08]"
              >
                {COMPANY.email}
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3 text-sm text-muted-foreground max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center gap-2">
                <Phone className="h-4 w-4 text-cyan-glow" />
                <a href={`tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`} className="hover:text-foreground">
                  {COMPANY.phoneDisplay}
                </a>
              </div>
              <div className="inline-flex items-center justify-center gap-2">
                <Mail className="h-4 w-4 text-cyan-glow" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-foreground">
                  {COMPANY.email}
                </a>
              </div>
              <div className="inline-flex items-center justify-center gap-2 text-center">
                <MapPin className="h-4 w-4 text-cyan-glow shrink-0" />
                <span>{COMPANY.addressDisplay}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
              <span>Avg. response under 2h</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span>NDA on first call</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span>Limited to 4 new brands / quarter</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
