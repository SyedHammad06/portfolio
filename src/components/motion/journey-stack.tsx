"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";

const TOWER = "(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";
const FLOW = "(max-width: 1023px) and (prefers-reduced-motion: no-preference), (max-height: 639px) and (prefers-reduced-motion: no-preference)";
const SLOT = 0.65;

type Palette = { signal: string; ink: string };

/**
 * One milestone's entrance: the row descends out of a blur, its hairline
 * draws across, the node pops with a brief signal flash, and the year, title
 * and body fade down in turn.
 */
function land(tl: gsap.core.Timeline, block: HTMLElement, at: number, drop: number | (() => number), palette: Palette) {
  const rule = block.querySelector("[data-journey-rule]");
  const node = block.querySelector<HTMLElement>("[data-journey-node]");
  const parts = block.querySelectorAll("[data-journey-part]");
  const hollow = node?.classList.contains("bg-ground");

  tl.fromTo(
    block,
    { opacity: 0, y: drop, filter: "blur(12px)" },
    { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
    at,
  )
    .fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, at + 0.1)
    .fromTo(
      parts,
      { opacity: 0, y: -28, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out", stagger: 0.1 },
      at + 0.15,
    )
    .fromTo(node, { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(3)" }, at + 0.3);

  if (node && !hollow) {
    tl.set(node, { backgroundColor: palette.signal }, at + 0.3)
      .to(node, { backgroundColor: palette.ink, duration: 0.3, ease: "power1.out" }, at + 0.8);
  }
  return tl;
}

/**
 * Journey motion. Wide, tall screens pin the chapter and build the stack from
 * the base as you scroll; smaller screens land each row as it scrolls in.
 * Reduced motion leaves the server-rendered timeline untouched.
 */
export function JourneyStack({ className, children }: { className?: string; children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = frame.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      const css = getComputedStyle(document.documentElement);
      const palette: Palette = {
        signal: css.getPropertyValue("--color-signal").trim() || "#ec8838",
        ink: css.getPropertyValue("--color-ink").trim() || "#f1ebe5",
      };

      mm.add(TOWER, () => {
        const blocks = gsap.utils.toArray<HTMLElement>("[data-journey-block]", root);
        const years = blocks.map((block) => block.querySelector<HTMLElement>("[data-journey-year]"));
        const spine = root.querySelector("[data-journey-spine]");
        const certs = root.querySelector("[data-journey-certs]");
        const header = document.querySelector("header");
        const muted = getComputedStyle(blocks[0]?.lastElementChild ?? root).color;

        gsap.set(spine, { scaleY: 0, transformOrigin: "50% 100%" });
        gsap.set(certs, { opacity: 0, y: -16 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            pin: true,
            start: () => `top top+=${header?.offsetHeight ?? 0}`,
            end: () => `+=${blocks.length * window.innerHeight * SLOT}`,
            scrub: 0.8,
            refreshPriority: 1,
            invalidateOnRefresh: true,
          },
        });

        blocks.forEach((block, i) => {
          tl.to(spine, { scaleY: (i + 1) / blocks.length, duration: 0.9 }, i);
          land(tl, block, i, () => -window.innerHeight * 0.28, palette);

          const year = years[i - 1];
          if (year && !year.classList.contains("italic")) {
            tl.to(year, { color: muted, duration: 0.4 }, i + 0.45);
          }
        });

        tl.to(certs, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, blocks.length);
      });

      mm.add(FLOW, () => {
        const blocks = gsap.utils.toArray<HTMLElement>("[data-journey-block]", root);
        const spine = root.querySelector("[data-journey-spine]");
        const list = root.querySelector("ol");

        gsap.fromTo(
          spine,
          { scaleY: 0, transformOrigin: "50% 0%" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top 80%", end: "bottom 60%", scrub: 0.6 },
          },
        );

        const fold = window.innerHeight * 0.92;
        const offscreen = blocks.filter((block) => block.getBoundingClientRect().top > fold);
        const landings = new Map(
          offscreen.map((block) => [block, land(gsap.timeline({ paused: true }), block, 0, -40, palette)]),
        );

        ScrollTrigger.batch(offscreen, {
          start: "top 88%",
          onEnter: (batch) =>
            batch.forEach((block, i) => gsap.delayedCall(i * 0.28, () => landings.get(block as HTMLElement)?.timeScale(1).play())),
          onLeaveBack: (batch) =>
            batch.forEach((block) => landings.get(block as HTMLElement)?.timeScale(1.4).reverse()),
        });
      });

      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope: frame },
  );

  return (
    <div ref={frame} data-journey-frame className={className}>
      {children}
    </div>
  );
}
