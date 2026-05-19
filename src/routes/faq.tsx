import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { CTA } from "@/components/site/CTA";
import { FAQS, COMPANY } from "@/lib/site-content";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — 100xiq Growth Agency" },
      {
        name: "description",
        content:
          "Answers about 100xiq's engagements, pricing, results, and operating model. Built for ambitious founders and operators.",
      },
      { property: "og:title", content: "100xiq FAQ" },
      { property: "og:url", content: `${COMPANY.url}/faq` },
    ],
    links: [{ rel: "canonical", href: `${COMPANY.url}/faq` }],
  }),
  component: FAQPage,
});

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <JsonLd faq />
      <Navbar />
      <main className="pt-32 pb-10">
        <section className="relative">
          <div className="absolute inset-0 bg-hero-aurora opacity-50" />
          <div className="relative mx-auto max-w-3xl px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">FAQ</p>
            <h1 className="mt-4 font-display text-5xl sm:text-6xl font-semibold tracking-tight">
              The honest <span className="text-gradient-brand">answers</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Everything we get asked before, during, and after engagements — answered plainly.
            </p>
          </div>
        </section>

        <section className="relative mt-16">
          <div className="mx-auto max-w-3xl px-6 space-y-3">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="rounded-2xl glass card-shadow">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg">{f.q}</span>
                    <Plus
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-cyan-glow" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
