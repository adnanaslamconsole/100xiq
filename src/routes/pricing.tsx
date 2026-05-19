import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Minus } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { RoiSimulator } from "@/components/site/RoiSimulator";
import { COMPANY, PAGE_FAQS } from "@/lib/site-content";
import { useBookCall } from "@/components/site/BookCallDialog";
import { Events, captureAttribution, getAttribution, trackEvent } from "@/lib/analytics";

const OG = `${COMPANY.url}/og/pricing.jpg`;

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Growth Engagements That Compound | 100xiq" },
      {
        name: "description",
        content:
          "Transparent retainers for ambitious brands: Launch ($8K), Scale ($22K), and Enterprise (custom). Compare what's included and book a growth call.",
      },
      { property: "og:title", content: "100xiq Pricing — Built for Compounding" },
      { property: "og:description", content: "Launch, Scale, and Enterprise growth engagements. Compare and book a call." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${COMPANY.url}/pricing` },
      { property: "og:image", content: OG },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "640" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "100xiq Pricing" },
      { name: "twitter:description", content: "Engagements engineered for asymmetric returns." },
      { name: "twitter:image", content: OG },
    ],
    links: [{ rel: "canonical", href: `${COMPANY.url}/pricing` }],
  }),
  component: PricingPage,
});

const TIERS = [
  {
    name: "Launch",
    price: "$8K",
    cadence: "/month",
    desc: "For ambitious challengers ready to install a real growth engine.",
    features: [
      "Full audit + 90-day strategy",
      "1 paid channel mastery",
      "Creative system + 10 ads/mo",
      "Weekly optimization sprints",
      "Slack + dashboard access",
    ],
  },
  {
    name: "Scale",
    price: "$22K",
    cadence: "/month",
    desc: "For teams ready to compound across paid, organic, and lifecycle.",
    popular: true,
    features: [
      "Everything in Launch",
      "Multi-channel orchestration",
      "Programmatic SEO engine",
      "Growth automation + chatbots",
      "Conversion lab (CRO)",
      "Bi-weekly executive reviews",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "from $60K/mo",
    desc: "For category leaders who refuse to lose. Custom systems, custom outcomes.",
    features: [
      "Dedicated growth pod",
      "Custom AI infrastructure",
      "Brand + identity systems",
      "Global market expansion",
      "C-suite advisory",
      "Quarterly off-sites",
    ],
  },
];

const COMPARISON: { label: string; values: (boolean | string)[] }[] = [
  { label: "Senior-only growth pod", values: [true, true, true] },
  { label: "Dedicated strategist", values: [true, true, true] },
  { label: "Paid channels managed", values: ["1", "Up to 5", "Unlimited"] },
  { label: "Ad creatives / month", values: ["10", "25+", "50+ custom"] },
  { label: "Programmatic SEO engine", values: [false, true, true] },
  { label: "Growth automation workflows", values: [false, true, true] },
  { label: "Lifecycle (Email/SMS)", values: [false, true, true] },
  { label: "CRO + landing-page lab", values: ["Light", true, true] },
  { label: "Brand & positioning", values: [false, "Module", true] },
  { label: "Custom AI infrastructure", values: [false, false, true] },
  { label: "Executive reviews", values: ["Monthly", "Bi-weekly", "Weekly"] },
  { label: "Reporting dashboards", values: [true, true, "Custom BI"] },
  { label: "Slack collaboration", values: [true, true, true] },
  { label: "Onboarding time", values: ["14 days", "10 days", "7 days"] },
];

function PricingPage() {
  const { open } = useBookCall();
  const faqs = PAGE_FAQS.pricing;
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const seenPlans = useRef<Set<string>>(new Set());

  useEffect(() => {
    captureAttribution();
    const attr = getAttribution();
    trackEvent(Events.PricingView, {
      page: "/pricing",
      utm_source: attr.utm_source,
      utm_medium: attr.utm_medium,
      utm_campaign: attr.utm_campaign,
      referrer: attr.referrer,
    });
  }, []);

  useEffect(() => {
    if (!cardsRef.current || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const tier = (e.target as HTMLElement).dataset.tier;
            if (tier && !seenPlans.current.has(tier)) {
              seenPlans.current.add(tier);
              trackEvent("pricing_plan_view", { tier });
            }
          }
        }
      },
      { threshold: 0.5 }
    );
    cardsRef.current.querySelectorAll("[data-tier]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const offerLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "growth-engineered marketing retainer",
    provider: { "@type": "Organization", name: COMPANY.name, url: COMPANY.url },
    offers: TIERS.map((t) => ({
      "@type": "Offer",
      name: t.name,
      price: t.price.replace(/[^0-9]/g, "") || undefined,
      priceCurrency: "USD",
      description: t.desc,
      url: `${COMPANY.url}/pricing`,
    })),
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <JsonLd faq faqs={faqs} reviews />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }}
      />
      <Navbar />
      <main className="pt-32 pb-10">
        <section className="relative">
          <div className="absolute inset-0 bg-hero-aurora opacity-50" />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Pricing</p>
            <h1 className="mt-4 font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight">
              Engagements built for <span className="text-gradient-brand">compounding</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              We onboard a maximum of 4 brands per quarter. Pricing is transparent and outcome-aligned —
              no hidden fees, no annual lock-ins, 30-day kill-switch in month one.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="relative mt-20" id="plans">
          <div ref={cardsRef} className="mx-auto max-w-7xl px-6 grid gap-6 lg:grid-cols-3">
            {TIERS.map((t, i) => (
              <motion.div
                key={t.name}
                data-tier={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative rounded-3xl p-8 flex flex-col ${
                  t.popular ? "bg-gradient-brand text-primary-foreground glow-shadow" : "glass card-shadow"
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
                <button
                  type="button"
                  onClick={() => {
                    const attr = getAttribution();
                    trackEvent(Events.CtaClick, {
                      location: "pricing_card",
                      tier: t.name,
                      price: t.price,
                      utm_source: attr.utm_source,
                      utm_medium: attr.utm_medium,
                      utm_campaign: attr.utm_campaign,
                      referrer: attr.referrer,
                    });
                    trackEvent("pricing_plan_select", { tier: t.name, price: t.price });
                    open(`pricing:${t.name.toLowerCase()}`);
                  }}
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform hover:scale-[1.02] ${
                    t.popular ? "bg-background text-foreground" : "bg-gradient-brand text-primary-foreground glow-shadow"
                  }`}
                >
                  Book Growth Call <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Live ROI Simulator — unique conversion lever */}
        <RoiSimulator />

        {/* Comparison */}
        <section className="relative mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Compare</p>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                Every plan, side by side.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Senior-only execution across every tier. Capacity, surface area, and AI infrastructure scale with you.
              </p>
            </div>

            <div className="mt-12 overflow-x-auto rounded-3xl glass card-shadow">
              <table className="w-full text-sm min-w-[720px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-5 font-medium text-muted-foreground">What's included</th>
                    {TIERS.map((t) => (
                      <th key={t.name} className="text-left p-5 font-display text-base">
                        <div className="flex flex-col">
                          <span>{t.name}</span>
                          <span className="text-xs text-muted-foreground font-normal mt-1">
                            {t.price}
                            <span className="text-muted-foreground/70"> {t.cadence}</span>
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.label} className={i % 2 ? "bg-white/[0.015]" : ""}>
                      <td className="p-5 text-foreground/90">{row.label}</td>
                      {row.values.map((v, j) => (
                        <td key={j} className="p-5">
                          {typeof v === "boolean" ? (
                            v ? (
                              <Check className="h-4 w-4 text-cyan-glow" />
                            ) : (
                              <Minus className="h-4 w-4 text-muted-foreground/50" />
                            )
                          ) : (
                            <span className="text-foreground/90">{v}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative mt-28">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Pricing FAQ</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight">Common questions.</h2>
            <div className="mt-8 divide-y divide-white/10 rounded-3xl glass">
              {faqs.map((f) => (
                <details key={f.q} className="group p-6">
                  <summary className="flex cursor-pointer items-center justify-between font-display text-lg">
                    {f.q}
                    <span className="text-cyan-glow transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative mt-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight">
              Ready to see what we'd build for you?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Book a 30-minute growth call. We'll walk you through a custom leverage map for your business — no pitch deck.
            </p>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  const attr = getAttribution();
                  trackEvent(Events.CtaClick, {
                    location: "pricing_footer",
                    utm_source: attr.utm_source,
                    utm_medium: attr.utm_medium,
                    utm_campaign: attr.utm_campaign,
                  });
                  open("pricing_footer");
                }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-medium text-primary-foreground glow-shadow hover:scale-[1.03] transition-transform"
              >
                Book Growth Call <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
