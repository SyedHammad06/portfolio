import type { ReactNode } from "react";
import { ArrowUpRight } from "./icons";

type Variant = "solid" | "outline" | "plain";

type RollingLinkProps = {
  href: string;
  label: string;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
  className?: string;
  icon?: ReactNode;
};

const variants: Record<Variant, string> = {
  solid:
    "rounded-full bg-ink text-ground px-[1.6em] h-[3.5em] hover:bg-white",
  outline:
    "rounded-full border border-line-strong text-ink px-[1.6em] h-[3.5em] hover:border-ink",
  plain: "text-ink",
};

/** Link whose label rolls up to a duplicate on hover. Screen readers hear the label once. */
export function RollingLink({
  href,
  label,
  variant = "plain",
  arrow = false,
  external = false,
  className = "",
  icon,
}: RollingLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-[0.9em] font-mono text-[max(11px,calc(12*var(--u)))] uppercase tracking-[0.12em] whitespace-nowrap transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      <span className="relative inline-flex overflow-hidden leading-[1.25]">
        <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full motion-reduce:transition-none motion-off:transition-none">
          {label}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0 motion-reduce:transition-none motion-off:transition-none"
        >
          {label}
        </span>
      </span>
      {icon ??
        (arrow ? (
          <ArrowUpRight className="size-[1.15em] shrink-0 transition-transform duration-500 ease-out-expo group-hover:-translate-y-px group-hover:translate-x-px" />
        ) : null)}
      {external ? <span className="sr-only">(opens in a new tab)</span> : null}
    </a>
  );
}
