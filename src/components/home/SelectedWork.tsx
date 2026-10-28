import Link from "next/link";
import { projects } from "@/data/portfolio";
import { services } from "@/data/services";
import { pad2 } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BrowserFrame } from "@/components/portfolio/BrowserFrame";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/Icons";

const serviceName = (slug: string) => services.find((s) => s.slug === slug)?.shortName ?? slug;

export function SelectedWork() {
  const featured = projects.filter((p) => p.featured);

  return (
    <Section tone="ink" labelledBy="work-title">
      <SectionHeading
        id="work-title"
        index="02"
        label="Selected Work"
        title={"Websites that *work as hard*\nas the businesses behind them."}
        intro="Recent builds for hospitality, nightlife, automotive and workforce brands — each designed around how their customers actually decide."
        action={<ButtonLink href="/portfolio" variant="outline">View all projects</ButtonLink>}
        tone="ink"
      />

      <div className="mt-14 grid gap-x-8 gap-y-14 border-t border-paper/10 pt-14 md:grid-cols-2 lg:mt-20 lg:gap-y-20 lg:pt-20">
        {featured.map((p, i) => (
          <article key={p.slug}>
            <Link
              href={`/portfolio/${p.slug}`}
              className="group block"
              aria-label={`${p.name} — view case study`}
            >
              <BrowserFrame project={p} sizes="(min-width: 768px) 46vw, 100vw" />
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <p className="eyebrow text-paper/55">
                    <span className="text-green">{pad2(i + 1)}</span> · {p.industry}
                  </p>
                  <h3 className="mt-2 font-display text-[clamp(1.5rem,2.2vw,2.1rem)] font-semibold tracking-[-0.03em] transition-colors duration-200 group-hover:text-green">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 text-paper/65">{p.summary}</p>
                </div>
                <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-paper/20 transition-colors duration-200 group-hover:border-green group-hover:bg-green group-hover:text-ink">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Services delivered">
                {p.services.map((s) => (
                  <li key={s} className="rounded-full border border-paper/15 px-3 py-1 text-[0.72rem] text-paper/60">
                    {serviceName(s)}
                  </li>
                ))}
              </ul>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-14 flex flex-col gap-6 border-t border-paper/10 pt-10 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
        <p className="font-serif text-[clamp(1.5rem,2.4vw,2.1rem)] italic leading-snug text-paper/90">
          Six launches. Five industries. One approach.
        </p>
        <ButtonLink href="/portfolio">Explore the portfolio</ButtonLink>
      </div>
    </Section>
  );
}
