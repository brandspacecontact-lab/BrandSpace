import { processSteps } from "@/data/approach";
import { pad2 } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Process() {
  return (
    <Section tone="ink" labelledBy="process-title">
      <SectionHeading
        id="process-title"
        index="05"
        label="Our Process"
        title={"From first call\nto *compounding growth.*"}
        intro="A clear, collaborative rhythm — so you always know what’s happening, what’s next and why."
        tone="ink"
      />

      <ol className="relative mt-14 border-t border-paper/10 pt-14 lg:mt-20 lg:pt-20">
        {/* Spine joining the step markers */}
        <span aria-hidden className="absolute bottom-10 left-[15px] top-[4.5rem] w-px bg-paper/12 lg:top-[6.5rem]" />
        {processSteps.map((s, i) => (
          <li key={s.title} className="relative pb-12 pl-14 last:pb-0 sm:pb-14 sm:pl-16">
            <span
              aria-hidden
              className="absolute left-0 top-0.5 grid h-[31px] w-[31px] place-items-center rounded-full border border-green bg-green text-[0.62rem] font-semibold tabular-nums text-ink"
            >
              {pad2(i + 1)}
            </span>
            <h3 className="font-display-tight text-[clamp(1.7rem,3vw,2.6rem)] font-semibold uppercase">{s.title}</h3>
            <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-paper/65">{s.body}</p>
            <p className="eyebrow mt-4 text-green">→ {s.output}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
