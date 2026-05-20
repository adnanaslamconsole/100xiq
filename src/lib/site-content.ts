// Single source of truth for site copy — used across routes, SEO, and JSON-LD.

export const COMPANY = {
  name: "100xiq",
  legalName: "100xiq Digital",
  tagline: "Turn attention into revenue.",
  description:
    "100xiq is the growth ecosystem behind ambitious brands. We engineer marketing systems that compound traffic, leads, and revenue — without the agency bloat.",
  email: "contact@100xiq.com",
  phone: "+91-7897773335",
  phoneDisplay: "+91 78977 73335",
  address: {
    street: "1st Cross, Anjandari Layout, Hennur",
    locality: "Bengaluru",
    region: "Karnataka",
    postalCode: "560043",
    country: "IN",
  },
  addressDisplay: "1st Cross, Anjandari Layout, Hennur, Bengaluru, Karnataka 560043, India",
  social: {
    twitter: "https://twitter.com/100xiq",
    linkedin: "https://linkedin.com/company/100xiq",
    instagram: "https://instagram.com/100xiq",
    youtube: "https://youtube.com/@100xiq",
  },
  url: "https://100xiq.com",
  logo: "/og/home.jpg",
  defaultLocale: "en-US",
  locales: [
    "en-US",
    "en-GB",
    "en-IN",
    "fr-FR",
    "de-DE",
    "es-ES",
    "pt-BR",
    "nl-NL",
    "sv-SE",
    "x-default",
  ],
};

export const SERVICES = [
  {
    slug: "seo-domination",
    title: "SEO Domination",
    short: "Programmatic SEO + topical authority that compounds for years.",
    long: "We build AI-assisted content engines, technical foundations, and link ecosystems that capture demand at every stage of intent. From 0 → 100K+ organic sessions in 12 months is our baseline, not the ceiling.",
    deliverables: [
      "Technical SEO audit & remediation",
      "Topical authority maps (AI clustered)",
      "Programmatic page generation at scale",
      "Digital PR & authority link acquisition",
      "Weekly rank & revenue dashboards",
    ],
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    short: "Paid media engineered for ROAS, LTV, and category dominance.",
    long: "Meta, Google, TikTok, YouTube, and emerging channels — orchestrated by a single growth team. We build creative testing systems, attribution models, and bidding logic that consistently outperform in-house and agency benchmarks.",
    deliverables: [
      "Full-funnel paid strategy",
      "Creative testing system (20+ ads/week)",
      "MMM + incrementality modeling",
      "Landing page CRO",
      "Daily optimization & weekly review",
    ],
  },
  {
    slug: "growth-automation",
    title: "Growth Automation",
    short: "Custom workflows that replace 10 marketing hires.",
    long: "We deploy production-grade automations across content, outreach, lifecycle, and analytics. Your team gets superpowers; your competitors get left behind.",
    deliverables: [
      "Content production pipelines",
      "Lifecycle / CRM automation",
      "Outbound SDR systems",
      "Reporting & insight dashboards",
      "Custom internal tools",
    ],
  },
  {
    slug: "funnel-engineering",
    title: "Funnel Engineering",
    short: "Conversion-obsessed funnels designed by behavioral psychologists.",
    long: "Landing pages, onboarding flows, checkout, pricing, upsells — every pixel and word optimized against real user data. Average uplift on first iteration: 38%.",
    deliverables: [
      "Conversion audit & teardown",
      "High-converting landing pages",
      "Checkout & onboarding optimization",
      "A/B testing infrastructure",
      "Quarterly CRO roadmap",
    ],
  },
  {
    slug: "brand-strategy",
    title: "Brand & Positioning",
    short: "Category-defining positioning that makes price irrelevant.",
    long: "Most brands compete on features. We help you define a category, own a wedge, and build the narrative that makes acquisition cheaper and retention sticky.",
    deliverables: [
      "Positioning workshop",
      "Messaging architecture",
      "Visual identity refresh",
      "Brand guidelines",
      "Launch narrative",
    ],
  },
];

export const CASE_STUDIES = [
  {
    slug: "aurora-atelier",
    tag: "DTC · Fashion",
    name: "Aurora Atelier",
    headline: "From $80K → $2.4M MRR in 9 months.",
    summary:
      "A premium fashion brand stuck at $80K MRR with rising CAC. We rebuilt their growth engine end-to-end: positioning, paid, creative, lifecycle, and SEO.",
    timeline: "9 months",
    industry: "DTC Fashion",
    region: "North America + EU",
    services: ["Performance Marketing", "Brand & Positioning", "Funnel Engineering"],
    metrics: [
      { k: "Revenue", v: "+2,900%" },
      { k: "ROAS", v: "9.2x" },
      { k: "CAC", v: "−54%" },
      { k: "AOV", v: "+38%" },
    ],
    before: {
      mrr: "$80K",
      roas: "1.8x",
      cac: "$78",
      retention: "21%",
      notes: "Reliant on one channel. Creative burnout every 3 weeks. No lifecycle program.",
    },
    after: {
      mrr: "$2.4M",
      roas: "9.2x",
      cac: "$36",
      retention: "54%",
      notes: "5-channel mix. 40+ winning creatives in rotation. Email/SMS drives 28% of revenue.",
    },
    chapters: [
      {
        title: "Diagnosis",
        body:
          "Single-channel dependency, undifferentiated brand voice, and zero retention infrastructure. We mapped 14 leakage points across the funnel in week one.",
      },
      {
        title: "Repositioning",
        body:
          "Re-anchored the brand from 'modern minimalist clothing' to 'investment-grade essentials for the new creative class.' Price perception jumped instantly.",
      },
      {
        title: "Creative engine",
        body:
          "Built an AI-assisted creative production system shipping 25+ ad variants weekly. Hook-rate doubled within 6 weeks.",
      },
      {
        title: "Lifecycle",
        body:
          "Designed a 12-flow Klaviyo + SMS architecture. Returning customer revenue 4.7x'd in 90 days.",
      },
    ],
    gallery: [
      { title: "Hero ad system", caption: "AI-orchestrated creative rotation" },
      { title: "Dashboard", caption: "Live ROAS & cohort tracking" },
      { title: "Brand refresh", caption: "Repositioned identity system" },
    ],
    quote: {
      text:
        "100xiq didn't just run our ads — they rebuilt the way we think about growth. We went from praying for a good month to forecasting growth quarter by quarter.",
      author: "Hanyu",
      role: "CEO, Aurora Atelier",
    },
    ogImage: "/og/aurora-atelier.jpg",
  },
  {
    slug: "helix-cloud",
    tag: "B2B SaaS",
    name: "Helix Cloud",
    headline: "12,400 SQLs sourced from organic in one quarter.",
    summary:
      "A late-stage data infrastructure platform plateauing on paid. We engineered a programmatic SEO + content authority play that now drives the majority of pipeline.",
    timeline: "6 months",
    industry: "B2B SaaS · Data Infrastructure",
    region: "Global",
    services: ["SEO Domination", "Growth Automation", "Funnel Engineering"],
    metrics: [
      { k: "Organic Traffic", v: "+812%" },
      { k: "SQLs", v: "12,400" },
      { k: "Pipeline", v: "$48M" },
      { k: "CAC payback", v: "4.1 mo" },
    ],
    before: {
      mrr: "Paid-dominant pipeline",
      roas: "—",
      cac: "$2,400 blended",
      retention: "NDR 108%",
      notes: "Brand-search dominant. Zero defensible long-tail. Sales reliant on outbound.",
    },
    after: {
      mrr: "Organic = 61% of pipeline",
      roas: "—",
      cac: "$890 blended",
      retention: "NDR 134%",
      notes: "Authority on 6,400+ top-3 keywords. AI-assisted content shipping daily.",
    },
    chapters: [
      {
        title: "Topical mapping",
        body:
          "Built an AI-clustered topical authority map of 14,000 queries spanning the entire data stack. Identified 38 'flagship' clusters worth $12M+ in annual demand.",
      },
      {
        title: "Programmatic build",
        body:
          "Deployed an internal content pipeline generating 38,000+ targeted pages, each validated by SMEs and product engineers before publishing.",
      },
      {
        title: "Conversion layer",
        body:
          "Replaced static blog CTAs with intent-aware product demos. SQL conversion rate from organic 3.4x'd.",
      },
    ],
    gallery: [
      { title: "Topical map", caption: "14K queries clustered by intent" },
      { title: "Pipeline view", caption: "$48M sourced from organic" },
      { title: "AI content pipeline", caption: "From brief → publish in <2h" },
    ],
    quote: {
      text:
        "What 100xiq built is now our biggest growth lever. It's compounding every single week and our CAC keeps dropping.",
      author: "Dev Sharma",
      role: "VP Marketing, Helix Cloud",
    },
    ogImage: "/og/helix-cloud.jpg",
  },
  {
    slug: "vertex-market",
    tag: "Marketplace",
    name: "Vertex Market",
    headline: "Programmatic SEO engine: 38K ranking pages.",
    summary:
      "A two-sided marketplace burning cash on paid acquisition. We built a programmatic engine that now indexes 38K pages and generates the majority of supply + demand inbounds.",
    timeline: "8 months",
    industry: "Marketplace",
    region: "India + SEA",
    services: ["SEO Domination", "Growth Automation", "Performance Marketing"],
    metrics: [
      { k: "Indexed Pages", v: "38,210" },
      { k: "Top-3 Keywords", v: "6,400" },
      { k: "Revenue", v: "+412%" },
      { k: "Paid share", v: "82% → 31%" },
    ],
    before: {
      mrr: "Paid-only growth",
      roas: "2.1x",
      cac: "Rising 14% MoM",
      retention: "Marketplace churn 38%",
      notes: "Liquidity issues on both sides. Indexed pages: ~400.",
    },
    after: {
      mrr: "Organic + paid blend",
      roas: "5.8x",
      cac: "−61%",
      retention: "Marketplace churn 19%",
      notes: "38,210 indexed pages. Top-3 on 6,400 commercial keywords.",
    },
    chapters: [
      {
        title: "Supply mapping",
        body:
          "Identified 12 page templates that could be programmatically generated against the marketplace catalog with zero thin-content risk.",
      },
      {
        title: "AI enrichment",
        body:
          "Each page was enriched with AI-generated unique commentary, supply liquidity, reviews, and structured data. Indexation rate: 96%.",
      },
      {
        title: "Demand capture",
        body:
          "Layered conversion-tuned CTAs and intent routing on top. Organic now converts 2.4x better than paid.",
      },
    ],
    gallery: [
      { title: "Template library", caption: "12 SEO-grade page templates" },
      { title: "Indexation tracker", caption: "38K live, 96% indexed" },
      { title: "Liquidity dashboard", caption: "Real-time supply/demand" },
    ],
    quote: {
      text:
        "Our cost of growth dropped by half while revenue 4x'd. The programmatic engine 100xiq built is now a moat we couldn't replicate internally in 2 years.",
      author: "Karan Goel",
      role: "Co-founder, Vertex Market",
    },
    ogImage: "/og/vertex-market.jpg",
  },
];

export const TESTIMONIALS = [
  { quote: "100xiq replaced four agencies and 10x'd our pipeline in a single quarter. The closest thing to magic I've seen in 12 years of marketing.", name: "Sara Lindqvist", role: "CMO, Helix Cloud", rating: 5 },
  { quote: "We thought our growth was plateaued. Their AI engine found leverage we didn't know existed. Revenue is up 312% YoY.", name: "Marcus Chen", role: "Founder, Aurora Atelier", rating: 5 },
  { quote: "Cinematic creative, surgical paid, and SEO that compounds. Every dollar feels like it works ten.", name: "Hanyu", role: "VP Growth, Vertex Market", rating: 5 },
  { quote: "It's not an agency. It's a growth operating system. We can't imagine scaling without them.", name: "Jonas Weber", role: "CEO, Quanta AI", rating: 5 },
  { quote: "Our CAC dropped 54% while LTV doubled. They are operators, not just marketers.", name: "Amelia Rossi", role: "CRO, Lumen Labs", rating: 5 },
  { quote: "Three site-of-the-day wins, infinite leads. 100xiq is the unfair advantage.", name: "Devon Park", role: "Head of Brand, Obsidian", rating: 5 },
  { quote: "The dashboards alone are worth the retainer. Every Monday we walk in knowing exactly which lever moved revenue.", name: "Noor Abadi", role: "Head of Growth, Northwind Labs", rating: 5 },
  { quote: "They onboarded faster than our last in-house hire and shipped 14 experiments in month one.", name: "Theo Garnier", role: "CEO, Lumière Health", rating: 5 },
  { quote: "We finally stopped guessing. The AI attribution layer 100xiq installed is the clearest signal we've ever had.", name: "Hana Watanabe", role: "VP Marketing, Kintsugi Cloud", rating: 5 },
];

export const PAGE_FAQS: Record<string, { q: string; a: string }[]> = {
  pricing: [
    { q: "Why do you start at $8K/month?", a: "Sub-$8K engagements can't fund the senior pod, AI infrastructure, and creative production we deploy on every account. We'd rather refer smaller brands than under-deliver." },
    { q: "Are there setup fees?", a: "No. The first 30 days include onboarding, audits, and infrastructure setup at no additional cost beyond the retainer." },
    { q: "Can I cancel?", a: "Yes. Every retainer has a 30-day kill-switch in month one and rolling 30-day notice thereafter. We earn the renewal every month." },
    { q: "What's included in Enterprise?", a: "A dedicated growth pod, custom AI infrastructure, brand systems, market expansion, and direct C-suite advisory. Pricing starts at $60K/month and is scoped per outcome." },
  ],
  services: [
    { q: "Do you specialize by channel or by outcome?", a: "By outcome. We assemble the channel mix that compounds for your business — paid, SEO, lifecycle, and product-led — under a single growth strategy." },
    { q: "Can you replace our existing agencies?", a: "Yes — most of our clients consolidate 2–4 agencies into 100xiq within the first 60 days." },
    { q: "Do you ship creative in-house?", a: "Yes. We run an AI-assisted creative studio producing 20+ ad variants per week with senior strategists and designers in the loop." },
    { q: "How do you measure success?", a: "Every engagement starts with a north-star scorecard (revenue, pipeline, CAC, LTV) reviewed weekly with executives." },
  ],
  about: [
    { q: "Who founded 100xiq?", a: "100xiq was founded by senior operators from category-defining DTC, B2B SaaS, and marketplace brands who wanted to build the agency they always wished existed." },
    { q: "Where is your team based?", a: `Our HQ is at ${"1st Cross, Anjandari Layout, Hennur, Bengaluru"}. The team is distributed across India, Europe, and North America.` },
    { q: "How big is your team?", a: "Senior-only. Every account is led by operators with 8+ years of experience — no juniors learning on your dollar." },
  ],
  contact: [
    { q: "How quickly will I hear back?", a: "Within one business day. Most qualified inbounds get a Loom audit within 48 hours." },
    { q: "What should I bring to the first call?", a: "Top-line revenue, current channel mix, last 90-day metrics, and your biggest open question. We'll come ready with leverage points." },
    { q: "Do you sign NDAs?", a: "Yes — happy to sign yours or use our mutual NDA before the first call." },
  ],
  case: [
    { q: "Can I talk to the client directly?", a: "Yes — for serious inbounds we facilitate reference calls with the operators behind every case study." },
    { q: "Are these results typical?", a: "We only publish case studies when the outcome significantly exceeds category benchmarks. Most engagements see meaningful lift inside 90 days." },
    { q: "Can you replicate this for my brand?", a: "We start with a paid audit + leverage map. If we can't see a clear path to a 3x return on the engagement, we say no." },
  ],
};

export const FAQS = [
  {
    q: "What kind of brands do you work with?",
    a: "We partner with ambitious DTC, B2B SaaS, and marketplace brands typically doing between $1M and $100M in revenue and ready to compound. We take on a maximum of 4 new brands per quarter to protect quality.",
  },
  {
    q: "How fast can we expect results?",
    a: "Paid performance: meaningful lift inside 30 days. SEO and programmatic: significant compounding from month 3, with the steepest curve between months 6–18.",
  },
  {
    q: "Do you work on retainer or project basis?",
    a: "Both. Most partnerships are 6 or 12-month growth retainers. We also run focused 90-day sprints for repositioning, funnel rebuilds, or programmatic launches.",
  },
  {
    q: "How are you different from a traditional agency?",
    a: "We operate as an embedded growth team, not a vendor. We're senior-only (no juniors learning on your account), AI-augmented across every workflow, and outcome-aligned — not retainer-aligned.",
  },
  {
    q: "Do you guarantee results?",
    a: "We don't promise specific numbers, but every engagement starts with a clear scorecard and a 30-day kill-switch. If we're not delivering, you don't pay the second invoice.",
  },
  {
    q: "Where are you based?",
    a: `Our HQ is at ${"1st Cross, Anjandari Layout, Hennur, Bengaluru"}. Our team is distributed across India, Europe, and North America so we cover every timezone our clients sell in.`,
  },
];

export type CaseStudy = (typeof CASE_STUDIES)[number];
