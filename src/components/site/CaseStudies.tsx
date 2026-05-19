import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { CASE_STUDIES } from "@/lib/site-content";

export function CaseStudies() {
  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Proof</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
              Outcomes our competitors <span className="text-gradient-brand">screenshot</span>.
            </h2>
          </div>
          <Link
            to="/contact"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Talk to our team →
          </Link>
        </div>

        <div className="mt-16 space-y-6">
          {CASE_STUDIES.map((c, i) => (
            <motion.article
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative grid gap-8 md:grid-cols-[1.2fr_1fr] items-center rounded-3xl glass card-shadow p-8 md:p-12 overflow-hidden"
            >
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-glow/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.tag}</div>
                <div className="mt-2 font-display text-2xl text-cyan-glow">{c.name}</div>
                <h3 className="mt-4 font-display text-3xl md:text-4xl font-semibold leading-tight">
                  {c.headline}
                </h3>
                <Link
                  to="/case/$slug"
                  params={{ slug: c.slug }}
                  className="mt-6 inline-flex items-center text-sm hover:text-cyan-glow transition-colors"
                >
                  Read the playbook
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
              <div className="relative grid grid-cols-3 gap-3">
                {c.metrics.slice(0, 3).map((m) => (
                  <div
                    key={m.k}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center"
                  >
                    <div className="font-display text-2xl md:text-3xl font-semibold text-gradient">
                      {m.v}
                    </div>
                    <div className="mt-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                      {m.k}
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
