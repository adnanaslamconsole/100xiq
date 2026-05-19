import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { CTA } from "@/components/site/CTA";
import { SERVICES, COMPANY, PAGE_FAQS } from "@/lib/site-content";
import { useBookCall } from "@/components/site/BookCallDialog";
import { Events, trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — SEO, Paid, Growth Automation & CRO | 100xiq" },
      {
        name: "description",
        content:
          "Full-stack growth services from 100xiq: programmatic SEO, performance marketing, Growth automation, funnel engineering, and brand positioning — engineered for compounding revenue.",
      },
      { property: "og:title", content: "100xiq Services" },
      { property: "og:description", content: "Growth services engineered for compounding revenue." },
      { property: "og:url", content: `${COMPANY.url}/services` },
    ],
    links: [{ rel: "canonical", href: `${COMPANY.url}/services` }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { open } = useBookCall();
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <JsonLd faq faqs={PAGE_FAQS.services} />
      <Navbar />
      <main className="pt-32 pb-10">
        <section className="relative">
          <div className="absolute inset-0 bg-hero-aurora opacity-50" />
          <div className="relative mx-auto max-w-5xl px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Services</p>
            <h1 className="mt-4 font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight">
              One team. Every growth lever, <span className="text-gradient-brand">engineered</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              We don't sell channels — we install operating systems. Each engagement combines
              strategy, execution, and AI tooling so your growth compounds quarter after quarter.
            </p>
          </div>
        </section>

        <section className="relative mt-20">
          <div className="mx-auto max-w-6xl px-6 space-y-6">
            {SERVICES.map((s, i) => (
              <article
                key={s.slug}
                id={s.slug}
                className="grid gap-8 md:grid-cols-[1fr_1.2fr] items-start rounded-3xl glass card-shadow p-8 md:p-12"
              >
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold">{s.title}</h2>
                  <p className="mt-3 text-muted-foreground">{s.short}</p>
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent(Events.CtaClick, { location: "services_page", service: s.slug });
                      open(`services:${s.slug}`);
                    }}
                    className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-glow hover:text-foreground transition-colors"
                  >
                    Scope this engagement <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <p className="text-foreground/90 leading-relaxed">{s.long}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-cyan-glow" />
                        <span className="text-foreground/85">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
