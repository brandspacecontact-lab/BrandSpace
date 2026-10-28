"use client";

import Link from "next/link";
import { useState } from "react";
import { testimonials } from "@/data/testimonials";
import { cn, pad2 } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Avatar } from "@/components/ui/Avatar";
import { ArrowRight } from "@/components/ui/Icons";

/** Client feedback, navigated manually (no autoplay, no scroll triggers). */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const t = testimonials[index]!;

  const select = (next: number) => setIndex((next + count) % count);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      select(index - 1);
    }
  };

  return (
    <Section tone="paper" labelledBy="feedback-title">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id="feedback-title"
          index="07"
          label="Client Feedback"
          title={"In their *words.*"}
          tone="paper"
          align="stack"
        />
        <div className="flex items-center gap-3" onKeyDown={onKey}>
          <span className="mr-3 text-sm tabular-nums text-ink/65" aria-live="polite">
            {pad2(index + 1)} / {pad2(count)}
          </span>
          <button
            type="button"
            onClick={() => select(index - 1)}
            aria-label="Previous testimonial"
            className="grid h-14 w-14 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <ArrowRight size={20} className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => select(index + 1)}
            aria-label="Next testimonial"
            className="grid h-14 w-14 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <figure className="mt-12 grid gap-10 border-t border-ink/15 pt-12 lg:mt-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <div className="flex items-center gap-4 lg:flex-col lg:items-start">
            <Avatar name={t.name} photo={t.photo} size={72} />
            <figcaption>
              <span className="block font-display text-lg font-semibold tracking-[-0.02em]">{t.name}</span>
              <span className="block text-sm text-ink/65">
                {t.role}, {t.company}
              </span>
              {t.project && (
                <Link
                  href={`/portfolio/${t.project}`}
                  className="mt-3 inline-block text-sm font-medium text-green-deep underline-offset-4 hover:underline"
                >
                  Read the case study
                </Link>
              )}
            </figcaption>
          </div>
        </div>
        <blockquote className="lg:col-span-9">
          <p className="font-serif text-[clamp(1.5rem,3vw,2.6rem)] italic leading-[1.22] tracking-[-0.01em] text-ink">
            <span className="text-green-deep">“</span>
            {t.quote}
            <span className="text-green-deep">”</span>
          </p>
          <PlaceholderNote status={t.status} tone="dark" className="mt-8">
            Sample testimonial for layout — to be replaced with approved client feedback.
          </PlaceholderNote>
        </blockquote>
      </figure>

      <div className="mt-10 flex gap-2" role="group" aria-label="Choose testimonial" onKeyDown={onKey}>
        {testimonials.map((x, i) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={i === index}
            aria-label={`${x.company} testimonial`}
            onClick={() => select(i)}
            className="group relative h-8 flex-1"
          >
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/15 transition-colors group-hover:bg-ink/40" />
            <span
              className={cn(
                "absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-ink transition-opacity duration-200",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          </button>
        ))}
      </div>
    </Section>
  );
}
