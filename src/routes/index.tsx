import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TrustMarquee } from "@/components/site/TrustMarquee";
import { Services } from "@/components/site/Services";
import { CaseStudies } from "@/components/site/CaseStudies";
import { Testimonials } from "@/components/site/Testimonials";
import { Pricing } from "@/components/site/Pricing";

import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { COMPANY } from "@/lib/site-content";
import { captureAttribution } from "@/lib/analytics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "100xiq — Growth Marketing Agency, Engineered" },
      {
        name: "description",
        content:
          "100xiq is the growth-engineered ecosystem helping ambitious brands dominate attention, traffic, leads, and revenue. SEO, performance marketing, automation, and CRO — engineered for compounding outcomes.",
      },
      { name: "keywords", content: "growth marketing agency, SEO, performance marketing, programmatic SEO, conversion rate optimization, 100xiq" },
      { property: "og:title", content: "100xiq — Growth Marketing Agency, Engineered" },
      { property: "og:description", content: "Turn attention into revenue. Marketing engineered for domination." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: COMPANY.url },
      { property: "og:site_name", content: COMPANY.name },
      { property: "og:image", content: `${COMPANY.url}/og/home.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "640" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "100xiq — Growth Marketing, Engineered" },
      { name: "twitter:description", content: "Turn attention into revenue." },
      { name: "twitter:image", content: `${COMPANY.url}/og/home.jpg` },
    ],
    links: [
      { rel: "canonical", href: COMPANY.url },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <JsonLd webSite faq reviews />
      <Navbar />
      <main>
        <Hero />
        <TrustMarquee />
        
        <Services />
        <CaseStudies />
        
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
