"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { RollingLink } from "@/components/ui/rolling-link";
import { navItems } from "./nav-items";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ground">
      <div className="flex h-(--header-h) items-center justify-between px-(--gutter)">
        <a
          href="#top"
          className="enter font-display text-[clamp(20px,calc(27*var(--u)),34px)] leading-none text-ink"
        >
          {siteConfig.name}
        </a>

        <nav aria-label="Primary" className="absolute left-[32.66%] hidden lg:block">
          <ul className="flex items-center gap-[calc(58*var(--u))]">
            {navItems.map((item, index) => (
              <li key={item.href} className="enter" style={{ "--i": index + 1 } as React.CSSProperties}>
                <RollingLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>

        <RollingLink
          href="#contact"
          label="Let's talk"
          variant="outline"
          arrow
          className="enter hidden! h-[calc(46*var(--u))]! px-[calc(20*var(--u))]! text-[max(11px,calc(13*var(--u)))]! border-ink/60! lg:inline-flex!"
        />

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 items-center rounded-full border border-line-strong px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <div aria-hidden="true" className="enter-rule h-px bg-line-strong" />

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-(--header-h) overflow-y-auto bg-ground px-(--gutter) pb-10 pt-8 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {[...navItems, { label: "Let's talk", href: "#contact" }].map((item) => (
              <li key={item.href} className="border-b border-line">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-5 font-display text-5xl leading-none text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
