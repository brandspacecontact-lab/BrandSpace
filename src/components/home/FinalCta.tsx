import { site } from "@/data/site";
import { mailUrl, telUrl } from "@/lib/whatsapp";
import { Headline } from "@/components/ui/Headline";
import { SectionLabel } from "@/components/ui/Section";
import { WhatsAppButton, TextLink } from "@/components/ui/Button";

export function FinalCta({
  title = "Ready to build\nyour *space?*",
  body = "Tell us where your business is today and where you want it to be. We’ll come back with honest, practical ideas for your next step.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="grain relative overflow-hidden bg-green text-ink">
      <div aria-hidden className="pointer-events-none absolute -right-[10vw] -top-[20vw] h-[60vw] w-[60vw] rounded-full border border-ink/10" />
      <div aria-hidden className="pointer-events-none absolute -right-[2vw] -top-[12vw] h-[44vw] w-[44vw] rounded-full border border-ink/10" />
      <div className="container-bs relative z-[2] py-20 sm:py-24 lg:py-32">
        <SectionLabel tone="green">Start your project</SectionLabel>
        <Headline
          id="cta-title"
          as="h2"
          text={title}
          className="font-display-tight mt-6 text-[clamp(2.6rem,6.4vw,5.4rem)] font-semibold"
          accentClassName="font-serif italic font-normal tracking-[-0.02em]"
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <p className="max-w-lg text-[1.05rem] leading-relaxed text-ink/75 lg:col-span-5">{body}</p>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center lg:col-span-7 lg:justify-end">
            <WhatsAppButton variant="dark" size="lg">
              Start Your Project
            </WhatsAppButton>
            <TextLink href="/contact">Send a project brief</TextLink>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-3 border-t border-ink/15 pt-8 text-[0.95rem] text-ink/70">
          <a href={telUrl} className="hover:text-ink">
            {site.phone.display}
          </a>
          <a href={mailUrl} className="hover:text-ink">
            {site.email}
          </a>
          <span>
            {site.address.locality}, {site.address.region}
          </span>
        </div>
      </div>
    </section>
  );
}
