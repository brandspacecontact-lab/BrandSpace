"use client";

import { useEffect, useId, useState } from "react";
import { services, type Service } from "@/data/services";
import { cn, pad2 } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/ui/Button";
import { Check, Plus } from "@/components/ui/Icons";
import { ServiceVisual } from "./ServiceVisual";

const serviceMessage = (s: Service) =>
  `Hi BrandSpace, I’m interested in ${s.name} and would like to discuss my business/project.`;

/** What / how / outcome for one service. */
function Copy({ s }: { s: Service }) {
  return (
    <>
      <div className="grid gap-7 sm:grid-cols-2 sm:gap-10">
        <div>
          <h4 className="eyebrow text-ink/60">What we do</h4>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-ink/80">{s.what}</p>
        </div>
        <div>
          <h4 className="eyebrow text-ink/60">How we do it</h4>
          <ul className="mt-3 space-y-2.5">
            {s.how.map((h) => (
              <li key={h} className="flex gap-3 text-[0.95rem] leading-snug text-ink/80">
                <Check size={16} className="mt-0.5 shrink-0 text-green-deep" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-6 border-t border-ink/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-md">
          <h4 className="eyebrow text-ink/60">Business outcome</h4>
          <p className="mt-2 font-serif text-[1.45rem] italic leading-snug text-ink">{s.outcome}</p>
        </div>
        <WhatsAppButton variant="dark" message={serviceMessage(s)} label={`Talk to BrandSpace about ${s.name} on WhatsApp`}>
          Talk to BrandSpace
        </WhatsAppButton>
      </div>
    </>
  );
}

export function Services() {
  const [active, setActive] = useState(0);
  const baseId = useId();

  // Deep links such as /#meta-ads (used in the footer) open that service.
  useEffect(() => {
    const sync = () => {
      const i = services.findIndex((s) => `#${s.slug}` === window.location.hash);
      if (i >= 0) setActive(i);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const current = services[active]!;

  return (
    <Section id="services" tone="paper" labelledBy="services-title">
      <SectionHeading
        id="services-title"
        index="01"
        label="Services"
        title={"Five disciplines.\n*One growth system.*"}
        intro="Each service stands on its own, but they’re designed to work together — so your website, search, social and ads compound instead of competing for budget."
        tone="paper"
      />

      <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
        {/* Index */}
        <ul className="border-t border-ink/10 lg:col-span-5" role="list">
          {services.map((s, i) => {
            const isActive = i === active;
            const panelId = `${baseId}-panel-${i}`;
            return (
              <li key={s.slug} id={s.slug} className="scroll-mt-28 border-b border-ink/10">
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onClick={() => setActive(i)}
                  className="group relative flex w-full items-center gap-5 py-6 text-left"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-px left-0 h-px w-full bg-green-deep transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className={cn("w-8 text-xs font-medium tabular-nums", isActive ? "text-green-deep" : "text-ink/55")}>
                    {pad2(i + 1)}
                  </span>
                  <span className="flex-1">
                    <span
                      className={cn(
                        "block font-display text-[clamp(1.3rem,2.2vw,1.8rem)] font-semibold leading-tight tracking-[-0.03em] transition-colors duration-200",
                        isActive ? "text-ink" : "text-ink/65 group-hover:text-ink",
                      )}
                    >
                      {s.name}
                    </span>
                    <span className="mt-1.5 block text-sm text-ink/60">{s.kicker}</span>
                  </span>
                  <span
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-200",
                      isActive ? "border-ink bg-ink text-green" : "border-ink/15 text-ink/60 group-hover:border-ink/40",
                    )}
                    aria-hidden
                  >
                    <Plus size={18} />
                  </span>
                </button>
                {/* Inline details on small screens */}
                <div
                  id={panelId}
                  role="region"
                  aria-label={s.name}
                  className={cn("lg:hidden", isActive ? "block" : "hidden")}
                >
                  <div className="grid gap-8 pb-10 pt-2">
                    <div className="aspect-[16/10] overflow-hidden rounded-[6px] bg-ink">
                      <ServiceVisual kind={s.visual} className="h-full w-full" />
                    </div>
                    <Copy s={s} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Detail panel on large screens */}
        <div className="hidden lg:col-span-7 lg:block">
          <div className="sticky top-[calc(var(--header-h)+2rem)]">
            <p className="eyebrow mb-5 flex items-center gap-3 text-green-deep">
              <span className="tabular-nums">{pad2(active + 1)}</span>
              <span aria-hidden className="h-px w-8 bg-green-deep/50" />
              <span>{current.name}</span>
            </p>
            <div key={current.slug} className="panel-in">
              <div className="aspect-[40/26] overflow-hidden rounded-[6px] bg-ink">
                <ServiceVisual kind={current.visual} className="h-full w-full" />
              </div>
              <div className="mt-8 grid gap-8">
                <Copy s={current} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
