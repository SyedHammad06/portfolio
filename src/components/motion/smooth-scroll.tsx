"use client";

import { useEffect } from "react";
import { useMotion } from "./use-motion";

/** Fraction of the native wheel distance each notch travels. */
const WHEEL_SPEED = 0.55;
/** Share of the remaining distance covered per 60fps frame; lower is heavier. */
const EASE = 0.05;
/** Bounds for how long an in-page anchor glide takes, scaled by distance. */
const GLIDE_MIN_MS = 700;
const GLIDE_MAX_MS = 1400;
/** Milliseconds of glide per pixel travelled, before clamping. */
const GLIDE_MS_PER_PX = 0.5;

function canScrollInside(start: EventTarget | null, deltaY: number) {
  let el = start instanceof Element ? start : null;
  while (el && el !== document.body && el !== document.documentElement) {
    const { overflowY } = getComputedStyle(el);
    if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) return true;
    }
    el = el.parentElement;
  }
  return false;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Heavy, eased wheel scrolling on the window, plus eased glides for in-page anchor links. Keyboard, touch and scrollbar stay native. */
export function SmoothScroll() {
  const { enabled } = useMotion();

  useEffect(() => {
    if (!enabled) return;

    let target = window.scrollY;
    let current = target;
    let raf = 0;
    let last = 0;
    let glide = 0;

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    const stopGlide = () => {
      if (glide) {
        cancelAnimationFrame(glide);
        glide = 0;
      }
    };

    const step = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 1000 / 60;
      last = now;
      current += (target - current) * (1 - Math.pow(1 - EASE, dt / (1000 / 60)));
      if (Math.abs(target - current) < 0.5) current = target;
      window.scrollTo(0, current);
      if (current === target) {
        raf = 0;
        last = 0;
      } else {
        raf = requestAnimationFrame(step);
      }
    };

    const glideTo = (to: number) => {
      stopGlide();
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        last = 0;
      }
      const from = window.scrollY;
      const distance = to - from;
      if (Math.abs(distance) < 1) return;

      const duration = Math.min(GLIDE_MAX_MS, Math.max(GLIDE_MIN_MS, Math.abs(distance) * GLIDE_MS_PER_PX));
      const startedAt = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - startedAt) / duration);
        window.scrollTo(0, from + distance * easeInOutCubic(t));
        glide = t < 1 ? requestAnimationFrame(tick) : 0;
      };
      glide = requestAnimationFrame(tick);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (!link || (link.target && link.target !== "_self")) return;

      const href = link.getAttribute("href") ?? "";
      const id = decodeURIComponent(href.slice(1));

      let y = 0;
      if (id) {
        const el = document.getElementById(id);
        if (!el) return;
        const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
        y = el.getBoundingClientRect().top + window.scrollY - offset;
      }

      event.preventDefault();
      if (window.location.hash !== href) window.history.pushState(window.history.state, "", href);
      glideTo(Math.min(maxScroll(), Math.max(0, y)));
    };

    const onWheel = (event: WheelEvent) => {
      stopGlide();
      if (event.ctrlKey || event.defaultPrevented || event.deltaY === 0) return;
      if (getComputedStyle(document.body).overflow === "hidden") return;
      if (getComputedStyle(document.documentElement).overflow === "hidden") return;
      if (canScrollInside(event.target, event.deltaY)) return;

      event.preventDefault();
      if (!raf) target = current = window.scrollY;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      target = Math.min(maxScroll(), Math.max(0, target + event.deltaY * unit * WHEEL_SPEED));
      if (!raf) raf = requestAnimationFrame(step);
    };

    const onUserInterrupt = () => stopGlide();

    const onScroll = () => {
      if (!raf) target = current = window.scrollY;
    };

    document.addEventListener("click", onClick);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onUserInterrupt, { passive: true });
    window.addEventListener("keydown", onUserInterrupt);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      stopGlide();
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onUserInterrupt);
      window.removeEventListener("keydown", onUserInterrupt);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);

  return null;
}
