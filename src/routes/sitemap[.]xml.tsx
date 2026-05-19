import { createFileRoute } from "@tanstack/react-router";
import { CASE_STUDIES, COMPANY } from "@/lib/site-content";

const STATIC_PATHS = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/services", priority: "0.9", changefreq: "monthly" },
  { path: "/pricing", priority: "0.9", changefreq: "monthly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const today = new Date().toISOString().slice(0, 10);
        const urls: string[] = [];

        const locales: string[] = Array.isArray(COMPANY.locales) ? COMPANY.locales : [COMPANY.defaultLocale || "en-US"];

        function localePrefix(l: string) {
          if (l === "x-default" || l === "en-US") return "/";
          return `/${l.toLowerCase()}/`;
        }

        for (const s of STATIC_PATHS) {
          const loc = `${COMPANY.url}${s.path}`;
          const alternates = locales
            .map((l) => {
              const prefix = localePrefix(l);
              // avoid duplicating root slash
              const href = `${COMPANY.url}${prefix === "/" ? s.path : `${prefix.replace(/\/$/, "")}${s.path}`}`;
              return `    <xhtml:link rel="alternate" hreflang="${l}" href="${href}"/>`;
            })
            .join("\n");

          urls.push(
            `  <url>\n    <loc>${loc}</loc>\n${alternates}\n    <lastmod>${today}</lastmod>\n    <changefreq>${s.changefreq}</changefreq>\n    <priority>${s.priority}</priority>\n  </url>`,
          );
        }

        for (const c of CASE_STUDIES) {
          const path = `/case/${c.slug}`;
          const loc = `${COMPANY.url}${path}`;
          const alternates = locales
            .map((l) => {
              const prefix = localePrefix(l);
              const href = `${COMPANY.url}${prefix === "/" ? path : `${prefix.replace(/\/$/, "")}${path}`}`;
              return `    <xhtml:link rel="alternate" hreflang="${l}" href="${href}"/>`;
            })
            .join("\n");

          urls.push(
            `  <url>\n    <loc>${loc}</loc>\n${alternates}\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
          );
        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
