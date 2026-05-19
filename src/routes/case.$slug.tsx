import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft, MapPin, Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { CASE_STUDIES, COMPANY, PAGE_FAQS, type CaseStudy } from "@/lib/site-content";
import { useBookCall } from "@/components/site/BookCallDialog";
import { Events, trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/case/$slug")({
  loader: ({ params }) => {
    const study = CASE_STUDIES.find((c) => c.slug === params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.study;
    if (!s) return { meta: [{ title: "Case study not found · 100xiq" }] };
    const title = `${s.name} — ${s.headline.replace(/\.$/, "")} | 100xiq`;
    const desc = s.summary;
    const og = s.ogImage ? `${COMPANY.url}${s.ogImage}` : `${COMPANY.url}/og/home.jpg`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${COMPANY.url}/case/${s.slug}` },
        { property: "og:image", content: og },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "640" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: og },
      ],
      links: [{ rel: "canonical", href: `${COMPANY.url}/case/${s.slug}` }],
    };
  },
  component: CaseDetail,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-center px-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">404</p>
        <h1 className="mt-3 font-display text-4xl">Case study not found</h1>
        <Link to="/" className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← Back home
        </Link>
      </div>
    </div>
  ),
});

function CaseDetail() {
  const { study } = Route.useLoaderData() as { study: CaseStudy };
  const { open } = useBookCall();
  const [animateMetrics, setAnimateMetrics] = useState(false);

  useEffect(() => {
    trackEvent(Events.CaseStudyView, { slug: study.slug, name: study.name });
    const t = setTimeout(() => setAnimateMetrics(true), 200);
    return () => clearTimeout(t);
  }, [study.slug, study.name]);

  const ldArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.headline,
    description: study.summary,
    image: study.ogImage ? `${COMPANY.url}${study.ogImage}` : undefined,
    author: { "@type": "Organization", name: COMPANY.name },
    publisher: { "@type": "Organization", name: COMPANY.name, url: COMPANY.url },
    mainEntityOfPage: `${COMPANY.url}/case/${study.slug}`,
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <JsonLd faq faqs={PAGE_FAQS.case} />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldArticle) }}
      />
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="relative">
          <div className="absolute inset-0 bg-hero-aurora opacity-50" />
          <div className="relative mx-auto max-w-5xl px-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3 w-3" /> All case studies
            </Link>
            <div className="mt-6 text-xs uppercase tracking-[0.3em] text-cyan-glow">{study.tag}</div>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
              {study.name}
            </h1>
            <p className="mt-4 font-display text-xl sm:text-2xl text-muted-foreground max-w-3xl">
              {study.headline}
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <Meta label="Timeline" value={study.timeline} />
              <Meta label="Industry" value={study.industry} />
              <Meta label="Region" value={study.region} />
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="relative mt-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {study.metrics.map((m, i) => (
                <motion.div
                  key={m.k}
                  initial={{ opacity: 0, y: 20 }}
                  animate={animateMetrics ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl glass card-shadow p-6"
                >
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    {m.k}
                  </div>
                  <div className="mt-3 font-display text-4xl font-semibold text-gradient">
                    {m.v}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="relative mt-20">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">The brief</p>
            <p className="mt-4 text-lg text-foreground/90 leading-relaxed">{study.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {study.services.map((s) => (
                <span
                  key={s}
                  className="rounded-full glass px-3 py-1.5 text-xs text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Before / After */}
        <section className="relative mt-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Before · After</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              The transformation, plainly.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <BeforeAfterCard kind="before" data={study.before} />
              <BeforeAfterCard kind="after" data={study.after} />
            </div>
          </div>
        </section>

        {/* Chapters */}
        <section className="relative mt-20">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">The playbook</p>
            <div className="mt-8 space-y-10">
              {study.chapters.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative pl-10 border-l border-white/10"
                >
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-gradient-brand glow-shadow" />
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Chapter {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-semibold">{c.title}</h3>
                  <p className="mt-3 text-foreground/85 leading-relaxed">{c.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="relative mt-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Inside the system</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {study.gallery.map((g, i) => (
                <motion.figure
                  key={g.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group rounded-3xl glass card-shadow overflow-hidden"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-violet-glow/20 via-electric/10 to-transparent grid place-items-center overflow-hidden">
                    <div className="absolute inset-0 grid-bg opacity-50" />
                    <div className="relative font-display text-2xl text-gradient">
                      {g.title}
                    </div>
                  </div>
                  <figcaption className="p-4 text-xs text-muted-foreground">
                    {g.caption}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="relative mt-20">
          <div className="mx-auto max-w-3xl px-6">
            <div className="rounded-3xl glass card-shadow p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 h-56 w-56 rounded-full bg-violet-glow/20 blur-3xl" />
              <div className="relative">
                <p className="font-display text-xl sm:text-2xl leading-relaxed">
                  &ldquo;{study.quote.text}&rdquo;
                </p>
                <div className="mt-6 text-sm">
                  <div className="text-foreground">{study.quote.author}</div>
                  <div className="text-muted-foreground">{study.quote.role}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative mt-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight">
              Want results like <span className="text-gradient-brand">{study.name}'s</span>?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              We take on a max of 4 brands per quarter. Book a 30-minute call — we'll bring
              leverage points specific to your business.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  trackEvent(Events.CtaClick, { location: "case_detail_footer", slug: study.slug });
                  open(`case_detail:${study.slug}`);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-medium text-primary-foreground glow-shadow hover:scale-[1.03] transition-transform"
              >
                Book Growth Call <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/"
                hash="work"
                className="inline-flex items-center rounded-full glass px-7 py-3.5 text-sm font-medium hover:bg-white/[0.08]"
              >
                See more case studies
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {COMPANY.addressDisplay}</span>
              <span className="inline-flex items-center gap-1.5"><Phone className="h-3 w-3" /> {COMPANY.phoneDisplay}</span>
              <span className="inline-flex items-center gap-1.5"><Mail className="h-3 w-3" /> {COMPANY.email}</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl glass p-5">
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-lg">{value}</div>
    </div>
  );
}

function BeforeAfterCard({
  kind,
  data,
}: {
  kind: "before" | "after";
  data: { mrr: string; roas: string; cac: string; retention: string; notes: string };
}) {
  const isAfter = kind === "after";
  return (
    <div
      className={`rounded-3xl border p-7 ${
        isAfter
          ? "glass card-shadow border-cyan-glow/30"
          : "bg-white/[0.02] border-white/10"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-[11px] uppercase tracking-[0.3em] ${
            isAfter ? "text-cyan-glow" : "text-muted-foreground"
          }`}
        >
          {kind}
        </span>
        {isAfter && (
          <span className="text-[11px] uppercase tracking-widest text-cyan-glow">with 100xiq</span>
        )}
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
        <Row k="MRR / Pipeline" v={data.mrr} accent={isAfter} />
        <Row k="ROAS" v={data.roas} accent={isAfter} />
        <Row k="CAC" v={data.cac} accent={isAfter} />
        <Row k="Retention" v={data.retention} accent={isAfter} />
      </dl>
      <p className={`mt-6 text-sm ${isAfter ? "text-foreground/90" : "text-muted-foreground"}`}>
        {data.notes}
      </p>
    </div>
  );
}

function Row({ k, v, accent }: { k: string; v: string; accent: boolean }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">{k}</dt>
      <dd
        className={`mt-1 font-display text-lg ${accent ? "text-gradient" : "text-foreground"}`}
      >
        {v}
      </dd>
    </div>
  );
}
