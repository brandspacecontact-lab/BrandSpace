"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** Briefly marks the heading a reader just jumped to (see .prose-bs [data-flash]). */
function flash(el: HTMLElement) {
  el.removeAttribute("data-flash");
  // Restart the animation even when the same heading is chosen twice.
  void el.offsetWidth;
  el.setAttribute("data-flash", "");
  window.setTimeout(() => el.removeAttribute("data-flash"), 1600);
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    els.forEach((e) => io.observe(e));
    // Arriving with a #hash: highlight that section once it has been scrolled to.
    const fromHash = window.location.hash && document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (fromHash && els.includes(fromHash)) window.setTimeout(() => flash(fromHash), 400);
    return () => io.disconnect();
  }, [items]);

  /**
   * The browser performs the jump itself — `html { scroll-padding-top }`
   * keeps the heading clear of the fixed header. We only mark the heading
   * and move keyboard focus to the content the reader chose.
   */
  const go = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    setActive(id);
    flash(target);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };

  if (!items.length) return null;
  return (
    <nav aria-label="On this page">
      <p className="eyebrow text-ink/65">On this page</p>
      <ol className="mt-5 space-y-1 border-l border-ink/10">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={() => go(item.id)}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 text-[0.88rem] leading-snug transition-colors duration-200",
                active === item.id
                  ? "border-green-deep font-medium text-ink"
                  : "border-transparent text-ink/65 hover:text-ink",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
