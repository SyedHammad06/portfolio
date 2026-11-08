"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = {
  id: string;
  label: string;
  /** Smaller line under the label, e.g. the discipline's area. */
  detail?: string;
  panel: ReactNode;
};

type TabsProps = {
  /** Accessible name for the tablist. */
  label: string;
  items: TabItem[];
  className?: string;
};

/** ARIA tabs pattern with automatic activation: arrows, Home and End move focus and selection. */
export function Tabs({ label, items, className = "" }: TabsProps) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(active + 1),
      ArrowLeft: () => select(active - 1),
      Home: () => select(0),
      End: () => select(items.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className="grid grid-cols-3 border-b border-line"
      >
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={`group relative -mb-px flex min-h-11 flex-col items-start gap-1 rounded-none border-b pb-4 pt-2 pr-3 text-left transition-colors duration-300 focus-visible:rounded-sm ${
                selected ? "border-ink text-ink" : "border-transparent text-faint hover:text-muted"
              }`}
            >
              <span className="font-mono text-label uppercase tracking-[0.14em]">{item.label}</span>
              {item.detail ? (
                <span className="hidden text-[14px] sm:block">{item.detail}</span>
              ) : null}
            </button>
          );
        })}
      </div>
      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={index !== active}
          tabIndex={0}
          className="tab-panel pt-10 focus-visible:rounded-sm"
        >
          {item.panel}
        </div>
      ))}
    </div>
  );
}
