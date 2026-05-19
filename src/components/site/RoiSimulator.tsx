import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Copy, Download, Link2, Sparkles, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import { Events, getAttribution, trackEvent } from "@/lib/analytics";
import { useBookCall } from "@/components/site/BookCallDialog";

const PLAN_MODEL: Record<
  "Launch" | "Scale" | "Enterprise",
  { monthlyLift: number; investment: number; tagline: string }
> = {
  Launch: { monthlyLift: 0.08, investment: 8000, tagline: "1 channel mastery" },
  Scale: { monthlyLift: 0.14, investment: 22000, tagline: "Multi-channel compounding" },
  Enterprise: { monthlyLift: 0.21, investment: 60000, tagline: "Category dominance" },
};

const PLANS = ["Launch", "Scale", "Enterprise"] as const;
type Plan = (typeof PLANS)[number];

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${Math.round(n).toLocaleString()}`;
}

function project(mrr: number, growth: number, months: number, lift: number) {
  const monthlyBaseline = growth / 100;
  const baseline: number[] = [];
  const lifted: number[] = [];
  let b = mrr;
  let l = mrr;
  for (let i = 0; i < months; i++) {
    b = b * (1 + monthlyBaseline);
    l = l * (1 + monthlyBaseline + lift);
    baseline.push(b);
    lifted.push(l);
  }
  return { baseline, lifted };
}

// Debounce helper for slider tracking
function useDebouncedTracking<T>(value: T, name: string, extra: () => Record<string, unknown>, delay = 600) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const id = window.setTimeout(() => {
      trackEvent(name, { value, ...extra() });
    }, delay);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
}

export function RoiSimulator() {
  const { open } = useBookCall();

  // Hydrate initial state from URL (shareable links)
  const initial = (() => {
    const def = { mrr: 120_000, growth: 4, plan: "Scale" as Plan };
    if (typeof window === "undefined") return def;
    try {
      const sp = new URLSearchParams(window.location.search);
      const mrr = Number(sp.get("sim_mrr"));
      const growth = Number(sp.get("sim_growth"));
      const planRaw = sp.get("sim_plan");
      const plan = (PLANS as readonly string[]).includes(planRaw ?? "")
        ? (planRaw as Plan)
        : def.plan;
      return {
        mrr: Number.isFinite(mrr) && mrr > 0 ? Math.min(2_000_000, Math.max(10_000, mrr)) : def.mrr,
        growth: Number.isFinite(growth) ? Math.min(15, Math.max(0, growth)) : def.growth,
        plan,
      };
    } catch {
      return def;
    }
  })();

  const [mrr, setMrr] = useState(initial.mrr);
  const [growth, setGrowth] = useState(initial.growth);
  const [plan, setPlan] = useState<Plan>(initial.plan);
  const fired = useRef(false);
  const planFired = useRef<Set<string>>(new Set());

  const months = 12;
  const { baseline, lifted } = useMemo(
    () => project(mrr, growth, months, PLAN_MODEL[plan].monthlyLift),
    [mrr, growth, plan]
  );

  const baselineEnd = baseline[baseline.length - 1] ?? mrr;
  const liftedEnd = lifted[lifted.length - 1] ?? mrr;
  const incrementalArr = lifted.map((v, i) => v - baseline[i]);
  const incremental12mo = incrementalArr.reduce((s, n) => s + n, 0);
  const investment = PLAN_MODEL[plan].investment * months;
  const roi = investment > 0 ? incremental12mo / investment : 0;

  // Track view + prefill source once
  useEffect(() => {
    if (!fired.current) {
      fired.current = true;
      const sp = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const prefilled = sp ? sp.has("sim_mrr") || sp.has("sim_growth") || sp.has("sim_plan") : false;
      trackEvent("roi_simulator_view", {
        initial_plan: plan,
        initial_mrr: mrr,
        initial_growth: growth,
        prefilled,
        sim_share_id: sp?.get("sim_id") ?? undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced slider tracking
  useDebouncedTracking(mrr, "roi_simulator_mrr_change", () => ({ plan, growth }));
  useDebouncedTracking(growth, "roi_simulator_growth_change", () => ({ plan, mrr }));

  useEffect(() => {
    if (!planFired.current.has(plan)) {
      planFired.current.add(plan);
      trackEvent("roi_simulator_plan_select", { plan, mrr, growth });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  const max = Math.max(...lifted);
  const W = 600;
  const H = 220;
  const path = (arr: number[]) =>
    arr
      .map((v, i) => {
        const x = (i / (arr.length - 1)) * W;
        const y = H - (v / max) * H;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  const area = (arr: number[]) => `${path(arr)} L${W},${H} L0,${H} Z`;

  // ----- Shareable link with attribution preserved -----
  function buildShareUrl() {
    const attr = getAttribution();
    const url = new URL(window.location.href);
    url.searchParams.set("sim_mrr", String(mrr));
    url.searchParams.set("sim_growth", String(growth));
    url.searchParams.set("sim_plan", plan);
    url.searchParams.set("sim_id", `${plan.toLowerCase()}-${Date.now().toString(36)}`);
    // Preserve / set attribution for end-to-end conversion measurement
    if (attr.utm_source) url.searchParams.set("utm_source", attr.utm_source);
    if (attr.utm_medium) url.searchParams.set("utm_medium", attr.utm_medium);
    if (attr.utm_campaign) url.searchParams.set("utm_campaign", attr.utm_campaign);
    if (attr.utm_term) url.searchParams.set("utm_term", attr.utm_term);
    if (attr.utm_content) url.searchParams.set("utm_content", attr.utm_content);
    // Always tag share-source so re-shares are attributable even without UTMs
    if (!url.searchParams.get("utm_source")) url.searchParams.set("utm_source", "roi_share");
    if (!url.searchParams.get("utm_medium")) url.searchParams.set("utm_medium", "share_link");
    return url.toString();
  }

  async function handleCopyShare() {
    const link = buildShareUrl();
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Share link copied", { description: "Pre-fills these exact parameters." });
    } catch {
      toast.error("Could not copy. Long-press to copy manually.");
    }
    trackEvent("roi_simulator_share_link", { plan, mrr, growth, roi: Number(roi.toFixed(2)) });
  }

  function summaryText() {
    return [
      `100xiq ROI Simulator — ${plan} engagement`,
      ``,
      `Inputs:`,
      `  • Current MRR: ${fmt(mrr)}`,
      `  • Monthly growth: ${growth}%`,
      `  • Engagement: ${plan} (${PLAN_MODEL[plan].tagline})`,
      ``,
      `12-month projection:`,
      `  • Baseline @ M12:        ${fmt(baselineEnd)}`,
      `  • With 100xiq @ M12:     ${fmt(liftedEnd)}`,
      `  • Incremental revenue:   ${fmt(incremental12mo)}`,
      `  • 12mo engagement cost:  ${fmt(investment)}`,
      `  • Projected ROI:         ${roi.toFixed(1)}x`,
      ``,
      `Modeled on senior-pod execution velocity. Real outcomes vary.`,
      `100xiq — https://100xiq.com`,
    ].join("\n");
  }

  async function handleCopySummary() {
    try {
      await navigator.clipboard.writeText(summaryText());
      toast.success("Summary copied to clipboard");
    } catch {
      toast.error("Could not copy summary.");
    }
    trackEvent("roi_simulator_copy_summary", { plan, mrr, growth, roi: Number(roi.toFixed(2)) });
  }

  function renderChartImage(): { dataUrl: string; w: number; h: number } | null {
    if (typeof document === "undefined") return null;
    const dpr = Math.min(2, (typeof window !== "undefined" && window.devicePixelRatio) || 1);
    const w = 1000;
    const h = 280;
    const canvas = document.createElement("canvas");
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = "#0b0b14";
    ctx.fillRect(0, 0, w, h);

    const pad = { l: 56, r: 24, t: 24, b: 40 };
    const cw = w - pad.l - pad.r;
    const ch = h - pad.t - pad.b;
    const localMax = Math.max(...lifted, 1);
    const localMin = 0;

    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + (ch / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.l, y);
      ctx.lineTo(pad.l + cw, y);
      ctx.stroke();
    }
    // Y labels
    ctx.fillStyle = "rgba(180,190,210,0.5)";
    ctx.font = "11px Helvetica, Arial, sans-serif";
    for (let i = 0; i <= 4; i++) {
      const v = localMax - ((localMax - localMin) / 4) * i;
      const y = pad.t + (ch / 4) * i + 4;
      const label = v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : `$${Math.round(v / 1000)}K`;
      ctx.textAlign = "right";
      ctx.fillText(label, pad.l - 8, y);
    }
    // X labels (months)
    ctx.textAlign = "center";
    for (let i = 0; i < months; i += 2) {
      const x = pad.l + (cw / (months - 1)) * i;
      ctx.fillText(`M${i + 1}`, x, h - 14);
    }

    const toPt = (arr: number[], i: number) => {
      const x = pad.l + (cw / (arr.length - 1)) * i;
      const y = pad.t + ch - (arr[i] / localMax) * ch;
      return [x, y] as const;
    };

    // Lifted area fill
    const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + ch);
    grad.addColorStop(0, "rgba(34,211,238,0.45)");
    grad.addColorStop(1, "rgba(34,211,238,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(pad.l, pad.t + ch);
    for (let i = 0; i < lifted.length; i++) {
      const [x, y] = toPt(lifted, i);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(pad.l + cw, pad.t + ch);
    ctx.closePath();
    ctx.fill();

    // Baseline (dashed)
    ctx.strokeStyle = "rgba(180,190,210,0.55)";
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < baseline.length; i++) {
      const [x, y] = toPt(baseline, i);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Lifted (solid cyan)
    ctx.setLineDash([]);
    ctx.strokeStyle = "rgb(34,211,238)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < lifted.length; i++) {
      const [x, y] = toPt(lifted, i);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    return { dataUrl: canvas.toDataURL("image/png"), w, h };
  }

  function handleExportPdf() {
    const doc = new jsPDF({ unit: "pt", format: "letter" });
    const left = 56;
    const right = 555;
    let y = 72;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("100xiq — ROI Projection", left, y);
    y += 10;
    doc.setDrawColor(180);
    doc.line(left, y, right, y);
    y += 26;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`${plan} engagement`, left, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(110);
    doc.text(PLAN_MODEL[plan].tagline, left + 130, y);
    doc.setTextColor(20);
    y += 28;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Inputs", left, y);
    y += 6;
    doc.setDrawColor(220);
    doc.line(left, y, right, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    [
      ["Current MRR", fmt(mrr)],
      ["Current monthly growth", `${growth}%`],
      ["Engagement", `${plan} — ${fmt(PLAN_MODEL[plan].investment)}/mo`],
    ].forEach(([k, v]) => {
      doc.text(k, left, y);
      doc.text(v, right, y, { align: "right" });
      y += 18;
    });

    y += 14;
    doc.setFont("helvetica", "bold");
    doc.text("12-month projection", left, y);
    y += 6;
    doc.line(left, y, right, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    [
      ["Baseline @ Month 12", fmt(baselineEnd)],
      ["With 100xiq @ Month 12", fmt(liftedEnd)],
      ["Incremental revenue (12mo)", fmt(incremental12mo)],
      ["Engagement cost (12mo)", fmt(investment)],
    ].forEach(([k, v]) => {
      doc.text(k, left, y);
      doc.text(v, right, y, { align: "right" });
      y += 18;
    });

    y += 12;
    doc.setFillColor(15, 15, 25);
    doc.roundedRect(left, y, 499, 64, 8, 8, "F");
    doc.setTextColor(255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("PROJECTED ROI", left + 18, y + 24);
    doc.setFontSize(28);
    doc.text(`${roi.toFixed(1)}x`, left + 481, y + 40, { align: "right" });
    doc.setTextColor(20);
    y += 88;

    // Mini chart rendered as PNG via canvas — embeds Baseline vs Lifted curve
    const chart = renderChartImage();
    const chartW = 499;
    const chartH = chart ? Math.round((chart.h / chart.w) * chartW) : 140;
    if (chart) {
      doc.addImage(chart.dataUrl, "PNG", left, y, chartW, chartH, undefined, "FAST");
    } else {
      doc.setDrawColor(220);
      doc.rect(left, y, chartW, chartH);
    }
    y += chartH + 12;
    doc.setFontSize(8);
    doc.setTextColor(110);
    doc.text("— Baseline    — With 100xiq", left, y);
    y += 18;
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text(
      "Modeled on senior-pod execution velocity. Real outcomes vary by category, brand maturity, and offer-market fit.",
      left,
      y,
      { maxWidth: 499 }
    );
    y += 22;

    // Attribution / UTM footer — preserved from session
    const attr = getAttribution();
    const attrRows: Array<[string, string | undefined]> = [
      ["UTM source", attr.utm_source],
      ["UTM medium", attr.utm_medium],
      ["UTM campaign", attr.utm_campaign],
      ["UTM term", attr.utm_term],
      ["UTM content", attr.utm_content],
      ["Referrer", attr.referrer],
      ["Landing page", attr.landing_page],
      ["Scenario ID", `${plan.toLowerCase()}-${Date.now().toString(36)}`],
    ].filter(([, v]) => v && String(v).length > 0) as Array<[string, string]>;

    if (attrRows.length) {
      // Page break if footer would overflow
      if (y > 680) {
        doc.addPage();
        y = 72;
      }
      doc.setDrawColor(220);
      doc.line(left, y, right, y);
      y += 14;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(110);
      doc.text("Attribution", left, y);
      y += 12;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(130);
      attrRows.forEach(([k, v]) => {
        const safe = String(v).slice(0, 110);
        doc.text(k, left, y);
        doc.text(safe, right, y, { align: "right" });
        y += 11;
      });
    }

    y += 14;
    doc.setTextColor(20);
    doc.setFontSize(10);
    doc.text(`Generated ${new Date().toLocaleDateString()} — 100xiq.com`, left, y);

    doc.save(`100xiq-roi-${plan.toLowerCase()}.pdf`);
    trackEvent("roi_simulator_export_pdf", {
      plan,
      mrr,
      growth,
      roi: Number(roi.toFixed(2)),
      utm_source: attr.utm_source,
      utm_campaign: attr.utm_campaign,
    });
  }

  return (
    <section className="relative mt-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-cyan-glow">
            <Sparkles className="h-3 w-3" /> Live Growth Simulator
          </div>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            See your <span className="text-gradient-brand">12-month compounding</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Drag the levers. Watch the curve. This is the same model our strategists run on day one
            — calibrated against 200+ engagements.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid lg:grid-cols-5 gap-6"
        >
          {/* Controls */}
          <div className="lg:col-span-2 rounded-3xl glass card-shadow p-7 space-y-7">
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-sm font-medium">Current MRR</label>
                <span className="font-display text-xl">{fmt(mrr)}</span>
              </div>
              <input
                type="range"
                min={10_000}
                max={2_000_000}
                step={5_000}
                value={mrr}
                onChange={(e) => setMrr(Number(e.target.value))}
                className="mt-3 w-full accent-cyan-glow"
                aria-label="Current MRR"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>$10K</span><span>$2M</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-sm font-medium">Current monthly growth</label>
                <span className="font-display text-xl">{growth}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={15}
                step={0.5}
                value={growth}
                onChange={(e) => setGrowth(Number(e.target.value))}
                className="mt-3 w-full accent-cyan-glow"
                aria-label="Monthly growth"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>0%</span><span>15%</span>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-3">Pick your engagement</div>
              <div className="grid grid-cols-3 gap-2">
                {PLANS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlan(p)}
                    className={`rounded-xl px-3 py-3 text-xs font-medium transition-all ${
                      plan === p
                        ? "bg-gradient-brand text-primary-foreground glow-shadow scale-[1.02]"
                        : "glass hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="font-display text-sm">{p}</div>
                    <div className={`mt-1 text-[10px] ${plan === p ? "text-white/80" : "text-muted-foreground"}`}>
                      {PLAN_MODEL[p].tagline}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const simId = `${plan.toLowerCase()}-${Date.now().toString(36)}`;
                const simPayload = {
                  sim_mrr: mrr,
                  sim_growth: growth,
                  sim_plan: plan,
                  sim_id: simId,
                  sim_roi: Number(roi.toFixed(2)),
                  sim_incremental_12mo: Math.round(incremental12mo),
                };
                // Dedicated event for ROI simulator CTA — includes full simulator state.
                trackEvent("roi_simulator_cta_click", {
                  location: "roi_simulator_cta",
                  ...simPayload,
                });
                // Keep the canonical cta_click for funnel parity with other CTAs.
                trackEvent(Events.CtaClick, {
                  location: "roi_simulator_cta",
                  ...simPayload,
                });
                open(`roi_simulator:${plan.toLowerCase()}`, { simulator: simPayload });
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-3.5 text-sm font-medium text-primary-foreground glow-shadow hover:scale-[1.02] transition-transform"
            >
              Lock in this trajectory <ArrowRight className="h-4 w-4" />
            </button>

            {/* Export / share row */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={handleExportPdf}
                className="inline-flex items-center justify-center gap-1.5 rounded-full glass px-3 py-2.5 text-[11px] font-medium hover:bg-white/[0.08] transition-colors"
                aria-label="Download projection as PDF"
              >
                <Download className="h-3.5 w-3.5" /> PDF
              </button>
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center justify-center gap-1.5 rounded-full glass px-3 py-2.5 text-[11px] font-medium hover:bg-white/[0.08] transition-colors"
                aria-label="Copy summary to clipboard"
              >
                <Copy className="h-3.5 w-3.5" /> Summary
              </button>
              <button
                type="button"
                onClick={handleCopyShare}
                className="inline-flex items-center justify-center gap-1.5 rounded-full glass px-3 py-2.5 text-[11px] font-medium hover:bg-white/[0.08] transition-colors"
                aria-label="Copy shareable link"
              >
                <Link2 className="h-3.5 w-3.5" /> Share
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground/70 text-center -mt-3">
              Share link pre-fills these exact parameters and preserves attribution.
            </p>
          </div>

          {/* Chart + KPIs */}
          <div className="lg:col-span-3 rounded-3xl glass card-shadow p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-cyan-glow" /> 12-month MRR projection
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/60" /> Baseline
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-glow" /> With 100xiq {plan}
                </span>
              </div>
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full h-[220px]" preserveAspectRatio="none">
              <defs>
                <linearGradient id="liftFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--cyan-glow, 190 90% 60%))" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="hsl(var(--cyan-glow, 190 90% 60%))" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((g) => (
                <line key={g} x1={0} x2={W} y1={H * g} y2={H * g} stroke="currentColor" strokeOpacity="0.06" />
              ))}
              <motion.path
                key={`area-${plan}-${mrr}-${growth}`}
                d={area(lifted)}
                fill="url(#liftFill)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.path
                key={`base-${plan}-${mrr}-${growth}`}
                d={path(baseline)}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.35"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7 }}
              />
              <motion.path
                key={`lift-${plan}-${mrr}-${growth}`}
                d={path(lifted)}
                fill="none"
                stroke="hsl(var(--cyan-glow, 190 90% 60%))"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <Kpi label="Baseline @ M12" value={fmt(baselineEnd)} />
              <Kpi label="100xiq @ M12" value={fmt(liftedEnd)} accent />
              <Kpi label="Incremental (12mo)" value={fmt(incremental12mo)} accent />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-center">
              <Kpi label="Engagement (12mo)" value={fmt(investment)} />
              <Kpi label="Projected ROI" value={`${roi.toFixed(1)}x`} accent />
            </div>
            <p className="mt-4 text-[11px] text-muted-foreground/80 text-center">
              Modeled on senior-pod execution velocity. Real outcomes vary by category, brand
              maturity, and offer-market fit. Strategists calibrate this on call one.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Kpi({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-2xl glass p-4">
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div
        className={`mt-1.5 font-display text-xl sm:text-2xl ${
          accent ? "text-gradient-brand" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}
