import { createElement, Fragment } from "react";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

/**
 * Display headline. Wrap accent words in *asterisks* to set them in the
 * italic serif accent, e.g. "Build your *space*." Use "\n" to force a line
 * break. Server-rendered and static — the page never animates on scroll.
 */
export function Headline({
  text,
  as = "h2",
  className,
  accentClassName = "font-serif italic font-normal tracking-[-0.02em] text-green",
  id,
}: {
  text: string;
  as?: Tag;
  className?: string;
  accentClassName?: string;
  id?: string;
}) {
  const content = text.split("\n").map((line, li, lines) => {
    const segments = line.split(/(\*[^*]+\*)/g).filter(Boolean);
    return (
      <Fragment key={li}>
        {segments.map((seg, si) => {
          const accent = seg.startsWith("*") && seg.endsWith("*");
          return accent ? (
            <span key={si} className={accentClassName}>
              {seg.slice(1, -1)}
            </span>
          ) : (
            <Fragment key={si}>{seg}</Fragment>
          );
        })}
        {li < lines.length - 1 && <br />}
      </Fragment>
    );
  });

  return createElement(as, { id, className: cn(className) }, content);
}
