"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { navigation, site } from "@/data/site";
import { whatsappUrl, telUrl, mailUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { ArrowUpRight, WhatsApp } from "@/components/ui/Icons";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // The bar is always in place; it only gains a solid background once the
  // page has left the top, so the header never sits on top of the hero type.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Close the menu on navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- route change must dismiss the overlay
    setOpen(false);
  }, [pathname]);

  // Lock scroll + focus management + Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const menu = menuRef.current;
    const focusables = () =>
      Array.from(menu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const els = [toggleRef.current!, ...focusables()];
        const first = els[0]!;
        const last = els[els.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled && !open
            ? "border-b border-paper/[0.08] bg-ink/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-bs flex h-[var(--header-h)] items-center justify-between gap-3 sm:gap-6">
          <Logo className="relative z-10" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block py-2 text-[0.85rem] font-medium transition-colors duration-200",
                        active ? "text-paper" : "text-paper/65 hover:text-paper",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-0 -bottom-0.5 h-px bg-green transition-opacity duration-200",
                          active ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Let’s Grow — chat with BrandSpace on WhatsApp (opens in a new tab)"
              className="inline-flex h-11 items-center gap-2.5 whitespace-nowrap rounded-full bg-green pl-4 pr-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-200 hover:bg-green-bright sm:pl-5 sm:text-[0.76rem] sm:tracking-[0.14em]"
            >
              Let’s Grow
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-green">
                <WhatsApp size={16} />
              </span>
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-paper/15 bg-ink/40 backdrop-blur-md transition-colors hover:border-paper/40 lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <span
                aria-hidden
                className={cn(
                  "absolute h-px w-[18px] bg-paper transition-transform duration-300",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "absolute h-px w-[18px] bg-paper transition-transform duration-300",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-ink transition-opacity duration-200 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="hairline-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <nav aria-label="Mobile" className="container-bs relative flex flex-1 flex-col justify-center pt-[var(--header-h)]">
          <ul className="space-y-1">
            {navigation.map((item, i) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-baseline gap-4 py-2 font-display text-[clamp(2.2rem,9vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.04em] transition-colors",
                      active ? "text-green" : "text-paper hover:text-green",
                    )}
                  >
                    <span className="font-sans text-xs font-medium tracking-[0.2em] text-paper/55">0{i + 1}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="container-bs relative grid gap-6 border-t border-paper/10 py-8 sm:grid-cols-2">
          <div className="space-y-2 text-sm text-paper/70">
            <a href={mailUrl} className="block hover:text-paper">{site.email}</a>
            <a href={telUrl} className="block hover:text-paper">{site.phone.display}</a>
          </div>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-between rounded-full bg-green pl-6 pr-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink sm:justify-self-end"
          >
            Start Your Project
            <span className="ml-5 grid h-10 w-10 place-items-center rounded-full bg-ink text-green">
              <ArrowUpRight size={18} />
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
