import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-content";
import { useBookCall } from "@/components/site/BookCallDialog";
import { Events, trackEvent } from "@/lib/analytics";

export function Testimonials() {
  const avg = (TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / TESTIMONIALS.length).toFixed(1);
  const { open } = useBookCall();

  return (
    <section className="relative scroll-mt-24 py-32" id="testimonials">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Voices</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
              Loved by founders.
              <br />
              <span className="text-gradient-brand">Feared</span> by competitors.
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-full glass px-4 py-2.5 self-start md:self-end">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-cyan-glow text-cyan-glow" />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold">{avg}/5</span>
              <span className="text-muted-foreground"> · {TESTIMONIALS.length}+ verified reviews</span>
            </div>
          </div>
        </div>

        <div className="mt-16 columns-1 md:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
          {TESTIMONIALS.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="break-inside-avoid rounded-2xl glass p-6 hover:border-violet-glow/30 transition-colors"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-cyan-glow text-cyan-glow" />
                ))}
              </div>
              <blockquote className="mt-3 text-base leading-relaxed text-foreground/90">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="h-9 w-9 rounded-full bg-gradient-brand grid place-items-center text-xs font-semibold">
                  {r.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center text-center">
          <p className="text-sm text-muted-foreground max-w-md">
            Join the operators using 100xiq as their unfair growth advantage.
          </p>
          <button
            type="button"
            onClick={() => {
              trackEvent(Events.CtaClick, { location: "testimonials_cta" });
              open("testimonials_cta");
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-medium text-primary-foreground glow-shadow hover:scale-[1.03] transition-transform"
          >
            Book Growth Call <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
