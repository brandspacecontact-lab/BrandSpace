import Image from "next/image";
import Link from "next/link";
import { formatMetric, projects, type Metric } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { ArrowUpRight } from "@/components/ui/Icons";

/** One headline result per featured project, shown as an editorial ledger. */
const rows: { slug: string; pick: "revenue" | "roas" | "leads" }[] = [
  { slug: "rovauto", pick: "leads" },
  { slug: "casa-de-grande", pick: "roas" },
  { slug: "zobhunger", pick: "leads" },
  { slug: "bar-code", pick: "revenue" },
];

export function Results() {
  const items = rows
    .map(({ slug, pick }) => {
      const project = projects.find((p) => p.slug === slug);
      if (!project) return null;
      return { project, metric: project.metrics[pick] as Metric };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <Section tone="paper" labelledBy="results-title">
      <SectionHeading
        id="results-title"
        index="04"
        label="Results"
        title={"Growth you can *measure.*"}
        intro="We agree on the numbers that matter before we start — then report on them plainly. Here’s what that looks like across recent work."
        tone="paper"
      />

      <ol className="mt-14 border-t border-ink/15 lg:mt-20">
        {items.map(({ project, metric }) => (
          <li key={project.slug}>
            <Link
              href={`/portfolio/${project.slug}`}
              className="group grid grid-cols-12 items-center gap-x-4 gap-y-3 border-b border-ink/15 py-8 transition-colors duration-200 hover:bg-ink/[0.03] sm:py-9"
            >
              <div className="col-span-12 flex items-center gap-4 sm:col-span-4">
                <span className="relative hidden h-14 w-24 shrink-0 overflow-hidden rounded-[4px] bg-ink sm:block">
                  {project.preview && (
                    <Image src={project.preview.src} alt="" fill sizes="120px" className="object-cover object-top" />
                  )}
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold tracking-[-0.02em]">{project.name}</span>
                  <span className="block text-sm text-ink/60">{project.industry}</span>
                </span>
              </div>
              <div className="col-span-7 sm:col-span-4">
                <span className="font-display-tight block text-[clamp(2.4rem,5vw,4rem)] font-semibold tabular-nums text-ink transition-colors duration-200">
                  {formatMetric(metric)}
                </span>
              </div>
              <div className="col-span-5 flex items-center justify-between gap-4 sm:col-span-4">
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-[0.12em] text-green-deep">
                    {metric.label}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-ink/65">{metric.context}</span>
                </span>
                <ArrowUpRight
                  size={22}
                  className="hidden shrink-0 text-ink/30 transition-colors duration-200 group-hover:text-green-deep sm:block"
                />
              </div>
            </Link>
          </li>
        ))}
      </ol>
      <PlaceholderNote status={items.map((x) => x.project.metrics.status)} tone="dark" className="mt-6" />
    </Section>
  );
}
