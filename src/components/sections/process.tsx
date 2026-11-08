import type { Discipline } from "@/content/types";
import { AmbientSweep } from "@/components/motion/ambient";
import { DisplayHeading } from "@/components/ui/display-heading";
import { Tabs } from "@/components/ui/tabs";
import { Chapter } from "./chapter";

type ProcessProps = {
  title: string;
  aside: string;
  headline: { lead: string; emphasis: string };
  intro: string;
  disciplines: Discipline[];
};

export function Process({ title, aside, headline, intro, disciplines }: ProcessProps) {
  return (
    <Chapter
      id="process"
      number="04"
      title={title}
      aside={aside}
      background={<AmbientSweep />}
      heading={
        <DisplayHeading
          id="process-title"
          lead={headline.lead}
          emphasis={headline.emphasis}
          className="max-w-[13ch] text-display"
        />
      }
    >
      <p data-reveal className="mt-8 max-w-[52ch] text-lede leading-[1.55] text-pretty text-muted">
        {intro}
      </p>
      <div data-reveal className="mt-[clamp(48px,calc(72*var(--u)),104px)]">
        <Tabs
          label="Process by discipline"
          items={disciplines.map((discipline) => ({
            id: `process-${discipline.id}`,
            label: discipline.label,
            detail: discipline.area,
            panel: (
              <ol className="grid gap-x-px overflow-hidden rounded-[2px] bg-line md:grid-cols-3 md:grid-rows-[auto_auto_auto]">
                {discipline.steps.map((step, index) => (
                  <li
                    key={step.title}
                    data-reveal
                    className="row-span-3 grid grid-rows-subgrid bg-ground py-[clamp(20px,calc(28*var(--u)),40px)] md:px-[clamp(20px,calc(28*var(--u)),40px)] md:first:pl-0"
                  >
                    <p className="mb-[clamp(32px,calc(56*var(--u)),80px)] font-display text-[clamp(56px,calc(88*var(--u)),128px)] leading-[0.8] italic text-faint tabular">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display text-[clamp(26px,calc(32*var(--u)),46px)] leading-[1.05] text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[34ch] text-[clamp(15px,calc(16*var(--u)),20px)] leading-[1.6] text-pretty text-muted">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            ),
          }))}
        />
      </div>
    </Chapter>
  );
}
