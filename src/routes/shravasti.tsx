import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, ExternalLink, FileText, MapPinned, QrCode, Sparkles } from "lucide-react";
import { COMPANY } from "@/lib/site-content";

const pdfDocuments = [
  {
    title: "Shravasti",
    description: "Primary overview of the Shravasti destination and visitor experience.",
    url: new URL("../assets/Shravasti.pdf", import.meta.url).href,
  },
  {
    title: "Shravasti Book",
    description: "Detailed travel and storytelling guide for exploring the region.",
    url: new URL("../assets/Shravasti_Book.pdf", import.meta.url).href,
  },
  {
    title: "Eco Tourism",
    description: "Sustainable tourism and conservation-focused context for the destination.",
    url: new URL("../assets/eco-tourism.pdf", import.meta.url).href,
  },
  {
    title: "Tourism Brief English",
    description: "Concise English brief summarizing tourism positioning and opportunities.",
    url: new URL("../assets/Tourism_Brief_English.pdf", import.meta.url).href,
  },
];

const qrTarget = `${COMPANY.url}/shravasti`;
const qrImage = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrTarget)}&size=640x640&margin=2&format=png&color=0f172a&bgcolor=f8fafc`;

export const Route = createFileRoute("/shravasti")({
  head: () => ({
    meta: [
      { title: "Shravasti PDF Hub | 100xiq" },
      {
        name: "description",
        content: "Explore all Shravasti PDF resources in one place. Scan the QR code or open the collection of tourism, sustainability, and destination guides.",
      },
      { property: "og:title", content: "Shravasti PDF Hub" },
      {
        property: "og:description",
        content: "Open the full collection of Shravasti tourism and eco-tourism PDFs from one premium landing page.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${COMPANY.url}/shravasti` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Shravasti PDF Hub" },
      {
        name: "twitter:description",
        content: "Scan the QR code to access all Shravasti PDFs in one place.",
      },
    ],
    links: [{ rel: "canonical", href: `${COMPANY.url}/shravasti` }],
  }),
  component: ShravastiPage,
});

function ShravastiPage() {
  const qrUrl = typeof window !== "undefined" ? `${window.location.origin}/shravasti` : qrTarget;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(135deg,_#020817_0%,_#0f172a_45%,_#111827_100%)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to 100xiq
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
            <MapPinned className="h-3.5 w-3.5" />
            Shravasti resources
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 shadow-[0_30px_90px_rgba(15,23,42,0.7)] backdrop-blur-sm">
          <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
            <div className="space-y-8">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Travel brief collection
                </div>

                <div className="space-y-4">
                  <h1 className="max-w-xl text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
                    Shravasti in one clean digital hub.
                  </h1>
                  <p className="max-w-xl text-base leading-7 text-slate-300 md:text-lg">
                    Scan the QR code to open this page, or browse the full collection of tourism, eco-tourism, and editorial PDFs below.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={pdfDocuments[0].url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open first PDF
                </a>
                <a
                  href={pdfDocuments[0].url}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "4 documents", value: "Tourism + eco guides" },
                  { label: "1 QR hub", value: "Fast access on mobile" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{stat.label}</div>
                    <div className="mt-2 text-lg font-semibold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-md rounded-[2rem] border border-emerald-400/30 bg-white p-4 shadow-[0_25px_60px_rgba(16,185,129,0.25)] sm:p-5">
                <div className="relative overflow-hidden rounded-[1.5rem] border-4 border-slate-900 bg-white p-3">
                  <img
                    src={qrImage}
                    alt="QR code to open the Shravasti PDF resources page"
                    className="block h-full w-full rounded-xl object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-slate-900 bg-emerald-500 text-xl font-black text-slate-950 shadow-lg">
                      S
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-slate-100 p-3 text-slate-900">
                  <div className="flex items-center gap-2">
                    <QrCode className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-semibold">Scan to open</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600">{qrUrl}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pdfDocuments.map((document) => (
            <a
              key={document.title}
              href={document.url}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 text-left shadow-[0_20px_40px_rgba(15,23,42,0.4)] transition hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-slate-900"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                    <FileText className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                    PDF
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">{document.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{document.description}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-medium text-emerald-300">
                <span>Open document</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
