import type { Certification, Milestone } from "@/content/types";
import { DisplayHeading } from "@/components/ui/display-heading";
import { ChapterMarker } from "@/components/ui/chapter-marker";
import { JourneyStack } from "@/components/motion/journey-stack";

type JourneyProps = {
  title: string;
  aside: string;
  headline: { lead: string; emphasis: string };
  certificationsLabel: string;
  milestones: Milestone[];
  certifications: Certification[];
};

/**
 * Timeline that builds from the ground up: on wide screens 2019 sits at the
 * base and each later year stacks on top. DOM order stays chronological.
 */
export function Journey({
  title,
  aside,
  headline,
  certificationsLabel,
  milestones,
  certifications,
}: JourneyProps) {
  return (
    <section id="journey" aria-labelledby="journey-title" className="border-t border-line">
      <JourneyStack className="grid gap-y-12 px-(--gutter) py-[clamp(88px,calc(140*var(--u)),210px)] lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-[calc(32.66vw-var(--gutter))_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-y-0 lg:py-[clamp(20px,min(calc(40*var(--u)),4.5vh),60px)]">
        <div className="lg:col-start-1 lg:row-start-1 lg:pr-[calc(48*var(--u))]">
          <ChapterMarker number="02" title={title} className="hidden lg:flex" />
          <DisplayHeading
            id="journey-title"
            lead={headline.lead}
            emphasis={headline.emphasis}
            className="max-w-[13ch] text-display lg:mt-7 lg:text-[clamp(40px,calc(56*var(--u)),84px)]"
          />
          <div className="mt-6 lg:mt-4">
            <ChapterMarker number="02" title={title} className="lg:hidden" />
            <p className="mt-3 font-display text-[clamp(20px,calc(24*var(--u)),32px)] leading-[1.1] italic text-faint lg:mt-0">
              {aside}
            </p>
          </div>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:flex lg:flex-col lg:justify-end">
          <div className="relative [--row-y:1.5rem] [--year:clamp(40px,calc(50*var(--u)),68px)] lg:[--row-y:clamp(8px,min(calc(20*var(--u)),2.4vh),28px)] lg:[--year:clamp(32px,min(calc(44*var(--u)),6vh),62px)]">
            <span
              data-journey-spine
              aria-hidden="true"
              className="absolute bottom-0 left-[3px] top-0 w-px origin-top bg-line-strong lg:origin-bottom"
            />
            <ol className="flex flex-col lg:flex-col-reverse">
              {milestones.map((milestone) => {
                const ahead = milestone.when === "Next";
                return (
                  <li
                    key={milestone.when}
                    data-journey-block
                    className="relative grid gap-2 py-(--row-y) pl-8 md:grid-cols-[calc(150*var(--u))_minmax(0,0.9fr)_minmax(0,1.5fr)] md:items-baseline md:gap-x-[calc(32*var(--u))] lg:items-center lg:pl-[calc(44*var(--u))]"
                  >
                    <span
                      data-journey-rule
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px origin-left bg-line"
                    />
                    <span
                      data-journey-node
                      aria-hidden="true"
                      className={`absolute left-0 top-[calc(var(--row-y)+var(--year)*0.5-3px)] size-[7px] rounded-full ${
                        ahead ? "border border-faint bg-ground" : "bg-ink"
                      }`}
                    />
                    <p
                      data-journey-year
                      data-journey-part
                      className={`font-display text-(length:--year) leading-none tabular ${
                        ahead ? "italic text-faint" : "text-ink"
                      }`}
                    >
                      {milestone.when}
                    </p>
                    <h3
                      data-journey-part
                      className={`font-display text-[clamp(21px,calc(26*var(--u)),38px)] leading-[1.1] lg:text-[clamp(19px,calc(22*var(--u)),32px)] ${
                        ahead ? "italic text-muted" : "text-ink"
                      }`}
                    >
                      {milestone.title}
                    </h3>
                    <p data-journey-part className="max-w-[52ch] text-[15px] leading-[1.5] text-pretty text-muted lg:text-[clamp(14px,calc(14.5*var(--u)),18px)] lg:leading-[1.45]">
                      {milestone.body}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div
          data-journey-certs
          className="lg:col-start-1 lg:row-start-2 lg:self-end lg:pr-[calc(48*var(--u))]"
        >
          <h3 className="font-mono text-label uppercase tracking-[0.14em] text-muted">
            {certificationsLabel}
          </h3>
          <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:mt-4 lg:grid-cols-1 lg:gap-y-0">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                className="flex flex-col gap-1 lg:flex-row lg:items-baseline lg:justify-between lg:gap-4 lg:border-t lg:border-line lg:py-[clamp(6px,1vh,10px)]"
              >
                <span className="text-[15px] text-ink">{cert.name}</span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                  {cert.issuer} <span className="tabular">{cert.year}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </JourneyStack>
    </section>
  );
}
