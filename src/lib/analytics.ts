// Lightweight, vendor-agnostic conversion tracking.
// - Captures UTM params + referrer once per session (sessionStorage)
// - Emits events to dataLayer (GA4/GTM), fbq (Meta Pixel), and console
// - All hooks are safe on SSR and no-op when the pixels aren't installed

const SS_KEY = "x100_attr_v1";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
  first_seen_at?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const existing = sessionStorage.getItem(SS_KEY);
    if (existing) return JSON.parse(existing) as Attribution;

    const url = new URL(window.location.href);
    const attr: Attribution = {
      referrer: document.referrer || undefined,
      landing_page: window.location.pathname + window.location.search,
      first_seen_at: new Date().toISOString(),
    };
    for (const k of UTM_KEYS) {
      const v = url.searchParams.get(k);
      if (v) (attr as Record<string, string>)[k] = v;
    }
    sessionStorage.setItem(SS_KEY, JSON.stringify(attr));
    return attr;
  } catch {
    return {};
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(SS_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : captureAttribution();
  } catch {
    return {};
  }
}

type Win = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

export function trackEvent(
  name: string,
  payload: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;
  const w = window as Win;
  const enriched = { event: name, ...payload, ...getAttribution() };

  // GA4 / GTM
  try {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(enriched);
    w.gtag?.("event", name, payload);
  } catch {}

  // Meta Pixel
  try {
    w.fbq?.("trackCustom", name, payload);
  } catch {}

  // Dev visibility
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[track]", name, enriched);
  }
}

// Canonical events used across the site
export const Events = {
  CtaClick: "cta_click",
  LeadFormOpen: "lead_form_open",
  LeadFormStart: "lead_form_start",
  LeadFormSubmit: "lead_form_submit",
  LeadFormSuccess: "lead_form_success",
  LeadFormError: "lead_form_error",
  WhatsAppClick: "whatsapp_click",
  CaseStudyView: "case_study_view",
  PricingView: "pricing_view",
} as const;
