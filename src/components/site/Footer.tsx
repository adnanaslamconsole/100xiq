import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { COMPANY } from "@/lib/site-content";

export function Footer() {
  const cols = [
    {
      title: "Services",
      links: [
        { label: "SEO Domination", to: "/services", hash: "seo-domination" },
        { label: "Performance Marketing", to: "/services", hash: "performance-marketing" },
        { label: "Growth Automation", to: "/services", hash: "growth-automation" },
        { label: "Funnel Engineering", to: "/services", hash: "funnel-engineering" },
        { label: "Brand & Positioning", to: "/services", hash: "brand-strategy" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", to: "/about" },
        { label: "Case Studies", to: "/", hash: "work" },
        { label: "Pricing", to: "/pricing" },
        { label: "FAQ", to: "/faq" },
        { label: "Contact", to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-white/5 mt-10">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-glow/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-brand grid place-items-center font-display font-bold">∞</div>
              <span className="font-display text-lg font-semibold">
                100x<span className="text-gradient-brand">iq</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              The growth-engineered ecosystem behind ambitious brands. Engineered to compound.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { s: "X", href: COMPANY.social.twitter },
                { s: "IG", href: COMPANY.social.instagram },
                { s: "LI", href: COMPANY.social.linkedin },
                { s: "YT", href: COMPANY.social.youtube },
              ].map((s) => (
                <a
                  key={s.s}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 w-9 rounded-full glass grid place-items-center text-xs hover:border-cyan-glow/40 transition-colors"
                >
                  {s.s}
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      hash={l.hash}
                      className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Get in touch</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-cyan-glow" />
                <span className="text-foreground/85">{COMPANY.addressDisplay}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-cyan-glow" />
                <a
                  href={`tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`}
                  className="text-foreground/85 hover:text-foreground"
                >
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-glow" />
                <a href={`mailto:${COMPANY.email}`} className="text-foreground/85 hover:text-foreground">
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/5 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
