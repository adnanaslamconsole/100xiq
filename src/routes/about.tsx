import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { CTA } from "@/components/site/CTA";
import { COMPANY, PAGE_FAQS } from "@/lib/site-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About 100xiq — The AI Growth Team Behind Category Leaders" },
      {
        name: "description",
        content:
          "100xiq is a senior-only, AI-augmented growth team helping ambitious brands compound traffic, leads, and revenue. Founded by operators, engineered for outcomes.",
      },
      { property: "og:title", content: "About 100xiq" },
      { property: "og:description", content: "The AI growth team behind category leaders." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${COMPANY.url}/about` },
    ],
    links: [{ rel: "canonical", href: `${COMPANY.url}/about` }],
  }),
  component: AboutPage,
});

const values = [
  { t: "Outcome over output", d: "We don't bill hours. We engineer compounding outcomes." },
  { t: "Senior, only", d: "No juniors on your account. Every operator has 8+ years of leverage." },
  { t: "AI-native, human-led", d: "We deploy AI to multiply senior judgment, never replace it." },
  { t: "Brutally honest", d: "If we're not the right fit, we'll tell you in the first call." },
];

const team = [
  { name: "Aarav Kapoor", role: "CEO · Growth Strategy", focus: "ex-VP Growth at 2 unicorns" },
  { name: "Sara Lin", role: "Head of Performance", focus: "$200M+ in paid spend managed" },
  { name: "Vikram Joshi", role: "Head of SEO", focus: "Programmatic SEO architect" },
  { name: "Maya Reddy", role: "Head of AI Systems", focus: "Built 40+ production AI pipelines" },
];

function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <JsonLd faq faqs={PAGE_FAQS.about} />
      <Navbar />
      <main className="pt-32 pb-10">
        <section className="relative">
          <div className="absolute inset-0 bg-hero-aurora opacity-50" />
          <div className="relative mx-auto max-w-5xl px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">About</p>
            <h1 className="mt-4 font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight">
              We build growth <span className="text-gradient-brand">systems</span>,
              <br /> not campaigns.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              100xiq was founded by operators who got tired of agencies optimizing for retainer
              length instead of revenue. We assembled a senior-only team, gave them AI superpowers,
              and aligned every dollar to outcomes you can prove.
            </p>
          </div>
        </section>

        <section className="relative mt-24">
          <div className="mx-auto max-w-5xl px-6 grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Mission</p>
              <h2 className="mt-3 font-display text-3xl font-semibold">
                Help 1,000 ambitious brands 100x their growth this decade.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Marketing is no longer a creative function — it's a compounding engineering
                discipline. We're building the team and the tools to lead that shift.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Operating principles</p>
              <ul className="mt-3 space-y-4">
                {values.map((v) => (
                  <li key={v.t} className="rounded-2xl glass p-5">
                    <div className="font-display text-lg">{v.t}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{v.d}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="relative mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Leadership</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold">
              Operators, not account managers.
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m) => (
                <div key={m.name} className="rounded-3xl glass card-shadow p-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-brand grid place-items-center font-display text-xl glow-shadow">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="mt-4 font-display text-lg">{m.name}</div>
                  <div className="text-xs text-cyan-glow">{m.role}</div>
                  <div className="mt-2 text-xs text-muted-foreground">{m.focus}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mt-24">
          <div className="mx-auto max-w-5xl px-6 grid gap-6 md:grid-cols-4">
            {[
              { k: "Revenue generated", v: "$420M+" },
              { k: "Brands scaled", v: "80+" },
              { k: "Avg. client tenure", v: "26 mo" },
              { k: "Client NPS", v: "84" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl glass p-6">
                <div className="font-display text-3xl text-gradient">{s.v}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
