import { COMPANY, FAQS, TESTIMONIALS } from "@/lib/site-content";

type FaqItem = { q: string; a: string };
type Review = { name: string; role?: string; rating: number; quote: string };
type Props = {
  faq?: boolean;
  webSite?: boolean;
  faqs?: FaqItem[];
  reviews?: Review[] | boolean;
};

export function JsonLd({ faq = false, webSite = false, faqs, reviews }: Props) {
  const faqList: FaqItem[] = faqs && faqs.length ? faqs : FAQS;
  const reviewList: Review[] | null =
    reviews === true ? TESTIMONIALS : Array.isArray(reviews) ? reviews : null;

  const organization: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: COMPANY.url,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    description: COMPANY.description,
    logo: `${COMPANY.url}${COMPANY.logo || "/og/home.jpg"}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.locality,
      addressRegion: COMPANY.address.region,
      postalCode: COMPANY.address.postalCode,
      addressCountry: COMPANY.address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: COMPANY.email,
        telephone: COMPANY.phone,
        areaServed: "Worldwide",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: Object.values(COMPANY.social),
    areaServed: "Worldwide",
  };

  if (reviewList && reviewList.length) {
    const ratings = reviewList.map((r) => r.rating);
    const avg = ratings.reduce((s, n) => s + n, 0) / ratings.length;
    organization.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(2),
      bestRating: "5",
      worstRating: "1",
      ratingCount: reviewList.length,
      reviewCount: reviewList.length,
    };
    organization.review = reviewList.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: "5",
        worstRating: "1",
      },
      author: { "@type": "Person", name: r.name },
      reviewBody: r.quote,
      ...(r.role ? { publisher: { "@type": "Organization", name: r.role } } : {}),
    }));
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY.name,
    url: COMPANY.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${COMPANY.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      {webSite && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
        />
      )}
      {faq && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
    </>
  );
}
