import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { COMPANY, PAGE_FAQS } from "@/lib/site-content";
import { useBookCall } from "@/components/site/BookCallDialog";
import { Events, trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact 100xiq — Book a Growth Call" },
      {
        name: "description",
        content: `Talk to 100xiq about your growth goals. Email ${COMPANY.email}, call ${COMPANY.phoneDisplay}, or book a 30-minute strategy call.`,
      },
      { property: "og:title", content: "Contact 100xiq" },
      { property: "og:description", content: "Book a 30-minute growth call. Avg. response under 2h." },
      { property: "og:url", content: `${COMPANY.url}/contact` },
    ],
    links: [{ rel: "canonical", href: `${COMPANY.url}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { open } = useBookCall();
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <JsonLd faq faqs={PAGE_FAQS.contact} />
      <Navbar />
      <main className="pt-32 pb-20">
        <section className="relative">
          <div className="absolute inset-0 bg-hero-aurora opacity-50" />
          <div className="relative mx-auto max-w-5xl px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Contact</p>
            <h1 className="mt-4 font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight">
              Let's <span className="text-gradient-brand">talk growth</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Fastest way to start: book a 30-minute strategy call. Prefer email or phone? We're
              listed below — average response time is under 2 hours.
            </p>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => {
                  trackEvent(Events.CtaClick, { location: "contact_hero" });
                  open("contact_page");
                }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-medium text-primary-foreground glow-shadow hover:scale-[1.03] transition-transform"
              >
                Book Growth Call →
              </button>
            </div>
          </div>
        </section>

        <section className="relative mt-20">
          <div className="mx-auto max-w-5xl px-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Card icon={<Mail className="h-5 w-5 text-cyan-glow" />} label="Email">
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-foreground hover:text-cyan-glow transition-colors"
              >
                {COMPANY.email}
              </a>
            </Card>
            <Card icon={<Phone className="h-5 w-5 text-cyan-glow" />} label="Phone">
              <a
                href={`tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`}
                className="text-foreground hover:text-cyan-glow transition-colors"
              >
                {COMPANY.phoneDisplay}
              </a>
            </Card>
            <Card icon={<MapPin className="h-5 w-5 text-cyan-glow" />} label="HQ">
              <span className="text-foreground">{COMPANY.addressDisplay}</span>
            </Card>
            <Card icon={<Clock className="h-5 w-5 text-cyan-glow" />} label="Hours">
              <span className="text-foreground">Mon–Sat · 9 AM – 8 PM IST</span>
            </Card>
          </div>
        </section>

        <section className="relative mt-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-3xl overflow-hidden glass card-shadow">
              <iframe
                title="100xiq HQ map"
                src="https://www.google.com/maps?q=Anjandari+Layout+Hennur+Bengaluru&output=embed"
                loading="lazy"
                className="w-full h-[360px] border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Card({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl glass card-shadow p-6">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-3 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
