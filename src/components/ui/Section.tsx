import { cn } from "@/lib/utils";
import { Headline } from "@/components/ui/Headline";

export type Tone = "ink" | "ink-2" | "paper" | "paper-2" | "green";

/**
 * Every section on the site is built from these two pieces, so the whole
 * site keeps one vertical rhythm and one heading hierarchy instead of a
 * set of bespoke layouts. `tone` picks the brand surface.
 */

const surfaces: Record<Tone, string> = {
  ink: "bg-ink text-paper",
  "ink-2": "bg-ink-2 text-paper",
  paper: "bg-paper text-ink",
  "paper-2": "bg-paper-2 text-ink",
  green: "bg-green text-ink",
};

const isDarkText = (tone: Tone) => tone === "paper" || tone === "paper-2" || tone === "green";

export function Section({
  id,
  tone = "ink",
  labelledBy,
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative py-20 sm:py-24 lg:py-28", surfaces[tone], className)}
    >
      <div className="container-bs relative z-[2]">{children}</div>
    </section>
  );
}

/** Eyebrow + index, title, intro and an optional action, in one block. */
export function SectionHeading({
  id,
  index,
  label,
  title,
  intro,
  action,
  tone = "ink",
  align = "split",
  className,
}: {
  id?: string;
  index?: string;
  label: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
  tone?: Tone;
  /** "split" puts the intro beside the title on large screens; "stack" keeps it below. */
  align?: "split" | "stack";
  className?: string;
}) {
  const dark = isDarkText(tone);

  return (
    <div className={cn(align === "split" && "lg:grid lg:grid-cols-12 lg:items-end lg:gap-10", className)}>
      <div className={cn(align === "split" && "lg:col-span-7")}>
        <SectionLabel index={index} tone={tone}>
          {label}
        </SectionLabel>
        <Headline
          id={id}
          as="h2"
          text={title}
          className="font-display-tight mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-semibold"
          accentClassName={cn(
            "font-serif italic font-normal tracking-[-0.02em]",
            tone === "green" ? "text-ink/70" : dark ? "text-green-deep" : "text-green",
          )}
        />
      </div>
      {(intro || action) && (
        <div
          className={cn(
            "mt-6 flex flex-col gap-6",
            align === "split" && "lg:col-span-5 lg:mt-0 lg:items-start",
          )}
        >
          {intro && (
            <p
              className={cn(
                "max-w-xl text-[1.05rem] leading-relaxed",
                tone === "green" ? "text-ink/75" : dark ? "text-ink/70" : "text-paper/65",
              )}
            >
              {intro}
            </p>
          )}
          {action}
        </div>
      )}
    </div>
  );
}

/** Editorial section marker, e.g. "(02) Selected Work". */
export function SectionLabel({
  index,
  children,
  className,
  tone = "ink",
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
}) {
  const dark = isDarkText(tone);
  return (
    <p className={cn("eyebrow flex items-center gap-3", dark ? "text-ink/65" : "text-paper/60", className)}>
      <span
        className={cn("inline-block h-[7px] w-[7px] rounded-full", tone === "green" ? "bg-ink" : "bg-green")}
        aria-hidden
      />
      {index && <span className={dark ? "text-ink/55" : "text-paper/50"}>({index})</span>}
      <span>{children}</span>
    </p>
  );
}

/** Hairline rule used to separate blocks inside a section. */
export function Rule({ tone = "ink", className }: { tone?: Tone; className?: string }) {
  return (
    <hr
      aria-hidden
      className={cn("border-0 border-t", isDarkText(tone) ? "border-ink/12" : "border-paper/12", className)}
    />
  );
}
