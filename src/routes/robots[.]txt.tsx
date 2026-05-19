import { createFileRoute } from "@tanstack/react-router";
import { COMPANY } from "@/lib/site-content";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        const body = `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${COMPANY.url}/sitemap.xml\n`;
        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
