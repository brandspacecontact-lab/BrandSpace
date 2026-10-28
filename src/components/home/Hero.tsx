import Image from "next/image";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { Headline } from "@/components/ui/Headline";
import { LogoMark } from "@/components/ui/Logo";
import { WhatsAppButton, TextLink } from "@/components/ui/Button";

/**
 * Static opening statement: brand lockup, promise, the two ways to start a
 * conversation, and the facts a prospective client checks first. The city
 * still is a single image — nothing here moves or reacts to scroll.
 */
export function Hero() {
  const facts = [
    { label: "Based in", value: `${site.address.locality}, ${site.address.region}` },
    { label: "Disciplines", value: `${services.length} growth services` },
    { label: "Direct line", value: site.phone.display },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink text-paper">
      {/* City still — desktop crop and a portrait crop for phones */}
      <Image
        src="/brand/hero-city-wide.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-center sm:block"
      />
      <Image
        src="/brand/hero-city-portrait.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center sm:hidden"
      />
      {/* Grade: keep the type legible and blend into the section below */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(7_9_8/0.92)_0%,rgb(7_9_8/0.72)_38%,rgb(7_9_8/0.86)_78%,var(--color-ink)_100%)]"
      />
      <div aria-hidden className="absolute inset-0 bg-green-ink/20 mix-blend-multiply" />

      <div className="container-bs relative z-[2] pb-16 pt-[calc(var(--header-h)+4.5rem)] sm:pb-20 sm:pt-[calc(var(--header-h)+7rem)] lg:pb-24 lg:pt-[calc(var(--header-h)+9rem)]">
        <div className="max-w-4xl">
          <p className="flex items-center gap-3">
            <LogoMark size={34} eager className="h-[30px] w-[30px]" />
            <span className="eyebrow text-paper/70">Digital Growth Agency · {site.address.locality}</span>
          </p>

          <Headline
            id="hero-title"
            as="h1"
            text={"Built to make your business\nthe *obvious choice.*"}
            className="font-display-tight mt-7 text-[clamp(2.5rem,5.6vw,4.9rem)] font-semibold sm:mt-9"
          />

          <p className="mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-paper/75 sm:text-lg">
            BrandSpace builds the website, search presence, social media and advertising that turn attention into
            customers — designed as one system, measured against the numbers you actually care about.
          </p>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <WhatsAppButton size="lg">Start Growing</WhatsAppButton>
            <TextLink href="#services">Explore what we do</TextLink>
          </div>
        </div>

        {/* The facts a prospective client checks first */}
        <dl className="mt-16 grid gap-px overflow-hidden rounded-[6px] border border-paper/12 bg-paper/10 sm:mt-20 sm:grid-cols-3 lg:mt-24">
          {facts.map((f) => (
            <div key={f.label} className="bg-ink/85 px-6 py-5 backdrop-blur-sm">
              <dt className="eyebrow text-[0.62rem] text-paper/55">{f.label}</dt>
              <dd className="mt-2 font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-paper">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
