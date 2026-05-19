export function TrustMarquee() {
  const logos = [
    "NEXORA", "LUMEN", "ATLAS", "VERTEX", "QUANTA", "AURORA",
    "HELIX", "NORTH★", "OBSIDIAN", "PRISM", "NIMBUS", "CIPHER",
  ];
  return (
    <section className="relative py-16 border-y border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-8">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Trusted by ambitious teams worldwide
        </p>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex w-max animate-marquee gap-16 px-8">
          {[...logos, ...logos].map((l, i) => (
            <div
              key={i}
              className="font-display text-2xl font-semibold tracking-[0.25em] text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
