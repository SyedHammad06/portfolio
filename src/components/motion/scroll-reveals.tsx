"use client";

import { EASE_OUT, gsap, ScrollTrigger, useGSAP } from "./gsap";
import { useMotion } from "./use-motion";

const LANDING_SECTIONS = "#journey, #work, #process, #contact";
const LIFTED = { opacity: 0, y: -40, filter: "blur(12px)" };

/**
 * One orchestrator for every `[data-reveal]` element below the fold.
 * Content is visible in the server HTML; only elements still offscreen at
 * mount are hidden, then revealed in batches as they scroll in. From Journey
 * onward they descend out of a blur and lift back out when scrolled back
 * above. Opacity only (never visibility), so hidden elements stay focusable;
 * focus reveals them.
 */
export function ScrollReveals() {
  const { enabled } = useMotion();

  useGSAP(
    () => {
      if (!enabled) return;

      const fold = window.innerHeight * 0.92;
      const targets = gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .filter((el) => el.getBoundingClientRect().top > fold);
      if (targets.length === 0) return;

      const landing = targets.filter((el) => el.closest(LANDING_SECTIONS));
      const rising = targets.filter((el) => !landing.includes(el));

      const rise = (batch: Element[]) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: EASE_OUT,
          stagger: 0.08,
          overwrite: true,
        });

      const land = (batch: Element[]) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          overwrite: true,
          clearProps: "filter",
        });

      const lift = (batch: Element[]) =>
        gsap.to(batch, { ...LIFTED, duration: 0.5, ease: "power2.in", stagger: 0.05, overwrite: true });

      gsap.set(rising, { opacity: 0, y: 32 });
      ScrollTrigger.batch(rising, { start: "clamp(top 88%)", once: true, onEnter: rise });

      gsap.set(landing, LIFTED);
      ScrollTrigger.batch(landing, { start: "clamp(top 88%)", onEnter: land, onLeaveBack: lift });

      const onFocus = (event: FocusEvent) => {
        const host = (event.target as Element | null)?.closest("[data-reveal]") as HTMLElement | null;
        if (!host || !targets.includes(host)) return;
        (landing.includes(host) ? land : rise)([host]);
      };
      document.addEventListener("focusin", onFocus);

      // Trigger positions are measured once; re-measure whenever the page height
      // changes without a window resize (fonts, disclosures, tabs, the loader's scrollbar).
      let measured = document.documentElement.scrollHeight;
      let pending = 0;
      const remeasure = () => {
        window.clearTimeout(pending);
        pending = window.setTimeout(() => {
          const height = document.documentElement.scrollHeight;
          if (height === measured) return;
          ScrollTrigger.refresh();
          measured = document.documentElement.scrollHeight;
        }, 150);
      };
      const observer = new ResizeObserver(remeasure);
      observer.observe(document.body);
      window.addEventListener("site:loaded", remeasure);
      void document.fonts.ready.then(remeasure);

      return () => {
        document.removeEventListener("focusin", onFocus);
        observer.disconnect();
        window.removeEventListener("site:loaded", remeasure);
        window.clearTimeout(pending);
      };
    },
    { dependencies: [enabled], revertOnUpdate: true },
  );

  return null;
}
