"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "./icons";

type DisclosureProps = {
  summary: string;
  /** Trailing count or note on the trigger, e.g. "5 projects". */
  meta?: string;
  children: ReactNode;
  className?: string;
};

/** Button-driven disclosure. Closed content is inert, so it is skipped by focus and screen readers. */
export function Disclosure({ summary, meta, children, className = "" }: DisclosureProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="group flex min-h-16 w-full items-center justify-between gap-6 border-y border-line py-5 text-left focus-visible:rounded-sm"
      >
        <span className="font-display text-title leading-none text-ink">{summary}</span>
        <span className="flex shrink-0 items-center gap-4 font-mono text-label uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-ink">
          {meta ? <span className="hidden sm:inline">{meta}</span> : null}
          <span className="grid size-10 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-ink">
            <Plus
              className={`size-4 transition-transform duration-500 ease-out-expo motion-reduce:transition-none motion-off:transition-none ${
                open ? "rotate-45" : ""
              }`}
            />
          </span>
        </span>
      </button>
      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-500 ease-out-expo motion-reduce:transition-none motion-off:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
