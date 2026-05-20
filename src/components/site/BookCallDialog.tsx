import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";
import { Events, getAttribution, trackEvent } from "@/lib/analytics";
import { COMPANY } from "@/lib/site-content";

export type SimulatorExtras = {
  sim_mrr?: number;
  sim_growth?: number;
  sim_plan?: string;
  sim_id?: string;
  sim_roi?: number;
  sim_incremental_12mo?: number;
};

type Ctx = {
  open: (source?: string, extras?: { simulator?: SimulatorExtras }) => void;
  close: () => void;
};
const BookCallCtx = createContext<Ctx | null>(null);

export function useBookCall() {
  const ctx = useContext(BookCallCtx);
  if (!ctx) throw new Error("useBookCall must be inside <BookCallProvider>");
  return ctx;
}

const WHATSAPP_NUMBER = "917897773335"; // +91 7897773335 in wa.me format

function readSimFromUrl(): SimulatorExtras | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const sp = new URLSearchParams(window.location.search);
    const mrr = Number(sp.get("sim_mrr"));
    const growth = Number(sp.get("sim_growth"));
    const plan = sp.get("sim_plan") || undefined;
    const id = sp.get("sim_id") || undefined;
    if (!Number.isFinite(mrr) && !plan && !id) return undefined;
    return {
      sim_mrr: Number.isFinite(mrr) && mrr > 0 ? mrr : undefined,
      sim_growth: Number.isFinite(growth) ? growth : undefined,
      sim_plan: plan,
      sim_id: id,
    };
  } catch {
    return undefined;
  }
}

type FormState = {
  name: string;
  email: string;
  company: string;
  website: string;
  budget: "" | "<10k" | "10-25k" | "25-75k" | "75k+" | "not_sure";
  message: string;
  hp: string;
};
const empty: FormState = { name: "", email: "", company: "", website: "", budget: "", message: "", hp: "" };

const budgets: Array<{ value: FormState["budget"]; label: string }> = [
  { value: "<10k", label: "Under $10K / mo" },
  { value: "10-25k", label: "$10K – $25K / mo" },
  { value: "25-75k", label: "$25K – $75K / mo" },
  { value: "75k+", label: "$75K+ / mo" },
  { value: "not_sure", label: "Not sure yet" },
];

function validate(s: FormState): Partial<Record<keyof FormState, string>> {
  const errs: Partial<Record<keyof FormState, string>> = {};
  if (s.name.trim().length < 2) errs.name = "Please enter your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email.trim())) errs.email = "Enter a valid email";
  if (s.website && s.website.length > 255) errs.website = "Too long";
  if (s.message.length > 2000) errs.message = "Keep it under 2000 chars";
  return errs;
}

function buildWhatsAppMessage(
  form: FormState,
  source: string,
  simulator: SimulatorExtras | undefined,
  attribution: ReturnType<typeof getAttribution>,
): string {
  const fmtMoney = (n?: number) =>
    typeof n === "number" && isFinite(n)
      ? n >= 1_000_000
        ? `$${(n / 1_000_000).toFixed(2)}M`
        : n >= 1_000
          ? `$${(n / 1_000).toFixed(1)}K`
          : `$${Math.round(n).toLocaleString()}`
      : undefined;

  const lines: string[] = [];
  lines.push(`*New growth-call request — ${COMPANY.name}*`);
  lines.push("");
  lines.push(`*Name:* ${form.name.trim()}`);
  lines.push(`*Email:* ${form.email.trim()}`);
  if (form.company.trim()) lines.push(`*Company:* ${form.company.trim()}`);
  if (form.website.trim()) lines.push(`*Website:* ${form.website.trim()}`);
  if (form.budget) lines.push(`*Budget:* ${budgets.find((b) => b.value === form.budget)?.label ?? form.budget}`);
  if (form.message.trim()) {
    lines.push("");
    lines.push(`*Goal:* ${form.message.trim()}`);
  }
  if (source) {
    lines.push("");
    lines.push(`_Source: ${source}_`);
  }
  if (simulator) {
    const s = simulator;
    lines.push("");
    lines.push("*ROI Simulator scenario:*");
    if (s.sim_plan) lines.push(`• Plan: ${s.sim_plan}`);
    if (s.sim_mrr) lines.push(`• Current MRR: ${fmtMoney(s.sim_mrr)}`);
    if (typeof s.sim_growth === "number") lines.push(`• Monthly growth: ${s.sim_growth}%`);
    if (typeof s.sim_roi === "number") lines.push(`• Projected ROI: ${s.sim_roi.toFixed(1)}x`);
    if (typeof s.sim_incremental_12mo === "number")
      lines.push(`• Incremental (12mo): ${fmtMoney(s.sim_incremental_12mo)}`);
    if (s.sim_id) lines.push(`• Scenario ID: ${s.sim_id}`);
  }
  const a = attribution;
  const attrLines = [
    a.utm_source && `utm_source=${a.utm_source}`,
    a.utm_medium && `utm_medium=${a.utm_medium}`,
    a.utm_campaign && `utm_campaign=${a.utm_campaign}`,
    a.referrer && `ref=${a.referrer}`,
    a.landing_page && `landing=${a.landing_page}`,
  ].filter(Boolean);
  if (attrLines.length) {
    lines.push("");
    lines.push(`_Attribution: ${attrLines.join(" · ")}_`);
  }
  return lines.join("\n");
}

export function BookCallProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string>("unknown");
  const [simulator, setSimulator] = useState<SimulatorExtras | undefined>(undefined);
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [done, setDone] = useState(false);
  const [touched, setTouched] = useState(false);

  const ctx = useMemo<Ctx>(
    () => ({
      open: (src, extras) => {
        const sim = extras?.simulator ?? readSimFromUrl();
        setSource(src ?? "unknown");
        setSimulator(sim);
        setIsOpen(true);
        setDone(false);
        trackEvent(Events.LeadFormOpen, { source: src ?? "unknown", ...(sim ?? {}) });
      },
      close: () => setIsOpen(false),
    }),
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    if (!touched) {
      setTouched(true);
      trackEvent(Events.LeadFormStart, { source });
    }
    setForm((f) => ({ ...f, [k]: v }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot: silently succeed for bots
    if (form.hp.trim().length > 0) {
      setDone(true);
      return;
    }
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    trackEvent(Events.LeadFormSubmit, { source, ...(simulator ?? {}) });
    try {
      const attribution = getAttribution();
      const text = buildWhatsAppMessage(form, source, simulator, attribution);
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      trackEvent(Events.WhatsAppClick, {
        source,
        channel: "whatsapp",
        whatsapp_number: WHATSAPP_NUMBER,
        message_length: text.length,
        has_budget: Boolean(form.budget),
        has_goal: form.message.trim().length > 0,
        company: form.company.trim() || undefined,
        website: form.website.trim() || undefined,
        ...(simulator ?? {}),
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
      });
      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (!win) {
        // Popup blocked — fall back to same-tab navigation
        window.location.href = url;
      }
      setDone(true);
      setForm(empty);
      setTouched(false);
      trackEvent(Events.LeadFormSuccess, { source, channel: "whatsapp", ...(simulator ?? {}) });
      toast.success("Opening WhatsApp — send the message to reach our team instantly.");
    } catch (err) {
      console.error(err);
      trackEvent(Events.LeadFormError, { source, error: String(err) });
      toast.error(`Something went wrong. Email ${COMPANY.email} and we'll respond fast.`);
    }
  };

  return (
    <BookCallCtx.Provider value={ctx}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/70 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto my-8 max-w-xl rounded-3xl glass card-shadow p-8 sm:p-10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="bookcall-title"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-5 top-5 h-9 w-9 rounded-full glass grid place-items-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {done ? (
                <div className="text-center py-6">
                  <div className="mx-auto h-14 w-14 rounded-full bg-gradient-brand grid place-items-center glow-shadow">
                    <CheckCircle2 className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h2 className="mt-6 font-display text-2xl sm:text-3xl font-semibold">
                    WhatsApp opened.
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
                    Tap send in WhatsApp to deliver your brief. A senior strategist will reach out
                    within 2 business hours.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-primary-foreground glow-shadow"
                    >
                      Close
                    </button>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="rounded-full glass px-6 py-3 text-sm font-medium hover:bg-white/[0.08]"
                    >
                      Email us instead
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">
                    Book Growth Call
                  </p>
                  <h2
                    id="bookcall-title"
                    className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight"
                  >
                    Let's engineer your <span className="text-gradient-brand">next 10x</span>.
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    30 minutes. No decks. We'll come prepared with leverage points specific to your
                    business. Submitting opens WhatsApp with your brief prefilled.
                  </p>

                  {/* honeypot */}
                  <input
                    type="text"
                    name="company_address"
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="hidden"
                    value={form.hp}
                    onChange={(e) => update("hp", e.target.value)}
                  />

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Field label="Your name *" error={errors.name}>
                      <input
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        autoComplete="name"
                        className={inputCls}
                        placeholder="Enter your name"
                      />
                    </Field>
                    <Field label="Work email *" error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        autoComplete="email"
                        className={inputCls}
                        placeholder="Enter your email"
                      />
                    </Field>
                    <Field label="Company">
                      <input
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        autoComplete="organization"
                        className={inputCls}
                        placeholder="Enter company name"
                      />
                    </Field>
                    <Field label="Website" error={errors.website}>
                      <input
                        value={form.website}
                        onChange={(e) => update("website", e.target.value)}
                        autoComplete="url"
                        className={inputCls}
                        placeholder="Enter website"
                      />
                    </Field>
                    <Field label="Monthly budget" className="sm:col-span-2">
                      <select
                        value={form.budget}
                        onChange={(e) => update("budget", e.target.value as FormState["budget"])}
                        className={inputCls}
                      >
                        <option value="">Select a range</option>
                        {budgets.map((b) => (
                          <option key={b.value} value={b.value}>
                            {b.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="What are you trying to unlock?" error={errors.message} className="sm:col-span-2">
                      <textarea
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        rows={3}
                        className={`${inputCls} resize-none`}
                        placeholder="Eg. Wea are at $100K MRR, want to break $500k in 6 months."
                      />
                    </Field>
                  </div>

                  <button
                    type="submit"
                    className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-4 text-sm font-medium text-primary-foreground glow-shadow transition-transform hover:scale-[1.01]"
                  >
                    Send via WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Replies on WhatsApp · Avg. response under 2h · 4 brands / quarter
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BookCallCtx.Provider>
  );
}

const inputCls =
  "w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-cyan-glow/50 focus:bg-white/[0.06] transition-colors";

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
