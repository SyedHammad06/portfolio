import type { CSSProperties } from "react";
import type { Stat as StatData } from "@/content/types";
import { GraphCanvas } from "@/components/motion/graph-canvas";
import { RollingLink } from "@/components/ui/rolling-link";
import { Stat } from "@/components/ui/stat";

type HeroProps = {
  roles: string;
  location: string;
  firstName: string;
  lastName: string;
  thesis: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  graphLabels: string[];
  stats: StatData[];
};

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

const ctaSize =
  "lg:h-[calc(56*var(--u))] lg:px-[calc(26*var(--u))] lg:text-[calc(15*var(--u))] lg:tracking-[0.06em] lg:gap-[calc(18*var(--u))]";

export function Hero({
  roles,
  location,
  firstName,
  lastName,
  thesis,
  primaryCta,
  secondaryCta,
  graphLabels,
  stats,
}: HeroProps) {
  return (
    <section id="top" aria-labelledby="hero-title" className="hero">
      <p className="hero-roles enter" style={stagger(1)}>
        {roles}
      </p>
      <p className="hero-location enter" style={stagger(2)}>
        {location}
      </p>

      <h1 id="hero-title" className="hero-title enter" style={stagger(3)}>
        {firstName} <em>{lastName}</em>
      </h1>

      <p className="hero-thesis enter" style={stagger(4)}>
        {thesis}
      </p>

      <div className="hero-ctas enter" style={stagger(5)}>
        <RollingLink
          href={primaryCta.href}
          label={primaryCta.label}
          variant="solid"
          arrow
          className={ctaSize}
        />
        <RollingLink
          href={secondaryCta.href}
          label={secondaryCta.label}
          variant="outline"
          arrow
          className={ctaSize}
        />
      </div>

      <GraphCanvas labels={graphLabels} className="hero-graph enter" />

      <div aria-hidden="true" className="hero-rule enter-rule" style={stagger(6)} />

      <dl className="hero-stats">
        {stats.map((stat, index) => (
          <Stat key={stat.label} {...stat} className="hero-stat enter" style={stagger(7 + index)} />
        ))}
      </dl>
    </section>
  );
}
