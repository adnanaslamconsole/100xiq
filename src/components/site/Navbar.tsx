import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useBookCall } from "./BookCallDialog";
import { Events, trackEvent } from "@/lib/analytics";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { open } = useBookCall();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/services", label: "Services" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${
            scrolled ? "glass card-shadow" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-lg bg-gradient-brand blur-md opacity-70" />
              <div className="relative h-8 w-8 rounded-lg bg-gradient-brand grid place-items-center font-display font-bold text-sm">
                ∞
              </div>
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">
              100x<span className="text-gradient-brand">iq</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="hover:text-foreground transition-colors relative group"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-brand transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              trackEvent(Events.CtaClick, { location: "navbar" });
              open("navbar");
            }}
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-primary-foreground glow-shadow transition-transform hover:scale-[1.03]"
          >
            Book a Call
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
