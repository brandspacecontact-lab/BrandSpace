import { pillars } from "@/data/approach";
import { pad2 } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/ui/Section";

export function WhyBrandSpace() {
  return (
    <Section tone="ink-2" labelledBy="why-title" className="grain overflow-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      >
        <div className="hairline-grid absolute inset-0 opacity-50" />
      </div>

      <SectionHeading
        id="why-title"
        index="03"
        label="Why BrandSpace"
        title={"Growth isn’t luck.\nIt’s *engineered.*"}
        intro="Five principles shape every project we take on — whether it’s a single landing page or a complete digital presence."
        tone="ink-2"
      />

      <ol className="mt-14 grid gap-px overflow-hidden rounded-[6px] bg-paper/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {pillars.map((p, i) => (
          <li key={p.title} className="flex flex-col bg-ink-2 p-7 lg:p-9">
            <p className="eyebrow flex items-center gap-3 text-paper/55">
              <span className="text-green">{pad2(i + 1)}</span>
              <span className="h-px w-7 bg-paper/20" aria-hidden />
              Principle
            </p>
            <h3 className="font-display-tight mt-5 text-[clamp(1.6rem,2.4vw,2rem)] font-semibold">{p.title}</h3>
            <p className="mt-4 font-serif text-[1.3rem] italic leading-snug text-paper/85">{p.line}</p>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-paper/60">{p.body}</p>
          </li>
        ))}
        {/* Five principles fill a two- or three-up grid evenly with one spacer */}
        <li aria-hidden className="hidden bg-ink-2 sm:block" />
      </ol>
    </Section>
  );
}
