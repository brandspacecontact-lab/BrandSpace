import Image from "next/image";
import { pillars } from "@/data/approach";
import { Headline } from "@/components/ui/Headline";

/**
 * A single statement between the work and the principles, set over the
 * brand's network artwork. Static — it simply scrolls past.
 */
export function EditorialBreak() {
  return (
    <section aria-labelledby="belief-title" className="relative isolate overflow-hidden bg-ink text-paper">
      <Image
        src="/brand/network-grid.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-70"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-ink)_0%,rgb(7_9_8/0.72)_28%,rgb(7_9_8/0.78)_70%,var(--color-ink)_100%)]"
      />

      <div className="container-bs relative z-[2] py-24 sm:py-32 lg:py-40">
        <p className="eyebrow flex items-center gap-3 text-paper/65">
          <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-green" />
          What we believe
        </p>
        <Headline
          id="belief-title"
          as="h2"
          text={"Growth is built,\n*not guessed.*"}
          className="font-display-tight mt-6 max-w-[12ch] text-[clamp(2.6rem,6.4vw,5.4rem)] font-semibold"
        />
        <div className="mt-12 flex flex-col gap-6 border-t border-paper/15 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md font-serif text-[clamp(1.25rem,2vw,1.7rem)] italic leading-snug text-paper/85">
            {pillars[0].line}
          </p>
          <ul
            className="flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-paper/60"
            aria-label="Our principles"
          >
            {pillars.map((p) => (
              <li key={p.title}>{p.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
