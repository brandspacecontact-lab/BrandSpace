import Link from "next/link";
import { postsByDate } from "@/data/blog";
import { readingTime } from "@/lib/blog";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Cover } from "@/components/blog/Cover";
import { CategoryTag, PostCard, PostMeta, ReadCue } from "@/components/blog/PostCard";

/** Homepage "Latest thinking": the featured article plus the two most recent. */
export function Insights() {
  const posts = postsByDate();
  const featured = posts.find((p) => p.featured) ?? posts[0]!;
  const supporting = posts.filter((p) => p.slug !== featured.slug).slice(0, 2);

  return (
    <Section tone="paper-2" labelledBy="insights-title">
      <SectionHeading
        id="insights-title"
        index="06"
        label="Insights"
        title={"Latest *thinking.*"}
        intro="Ideas on websites, search, social, advertising, branding and business growth — written for business owners, not marketers."
        action={<ButtonLink href="/blog" variant="outline-dark">Explore all insights</ButtonLink>}
        tone="paper-2"
      />

      {/* Featured article */}
      <article className="group relative mt-14 lg:mt-20">
        <Cover
          photo={featured.cover}
          sizes="(min-width: 1536px) 1400px, 100vw"
          className="aspect-[4/3] rounded-[10px] sm:aspect-[16/9] lg:aspect-[21/9]"
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-4">
              <span aria-hidden className="h-px w-12 bg-green-deep" />
              <CategoryTag slug={featured.category} light />
            </p>
            <h3 className="mt-5 font-display text-[clamp(1.75rem,3.2vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink transition-colors duration-200 group-hover:text-green-deep">
              <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0 after:z-[1] after:content-['']">
                <span className="text-balance-safe">{featured.title}</span>
              </Link>
            </h3>
          </div>
          <div className="lg:col-span-5 lg:pt-10">
            <p className="text-[1.05rem] leading-relaxed text-ink/65">{featured.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <PostMeta post={featured} minutes={readingTime(featured.slug)} className="text-ink/65" />
              <ReadCue light />
            </div>
          </div>
        </div>
      </article>

      {/* Two supporting articles */}
      <div className="mt-16 grid gap-14 border-t border-ink/10 pt-14 md:grid-cols-2 md:gap-10 lg:mt-20 lg:pt-16">
        {supporting.map((p) => (
          <PostCard key={p.slug} post={p} minutes={readingTime(p.slug)} tone="light" variant="wide" />
        ))}
      </div>
    </Section>
  );
}
