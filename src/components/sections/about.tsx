import type { Discipline } from "@/content/types";
import { AmbientDots } from "@/components/motion/ambient";
import { DisplayHeading } from "@/components/ui/display-heading";
import { Chapter } from "./chapter";
import { Disciplines } from "./disciplines";

type AboutProps = {
  title: string;
  aside: string;
  headline: { lead: string; emphasis: string };
  body: string[];
  disciplinesKicker: string;
  disciplines: Discipline[];
};

export function About({ title, aside, headline, body, disciplinesKicker, disciplines }: AboutProps) {
  return (
    <Chapter
      id="about"
      number="01"
      title={title}
      aside={aside}
      background={<AmbientDots />}
      heading={
        <DisplayHeading
          id="about-title"
          lead={headline.lead}
          emphasis={headline.emphasis}
          className="max-w-[14ch] text-display"
        />
      }
    >
      <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-[calc(56*var(--u))]">
        {body.map((paragraph) => (
          <p
            key={paragraph}
            data-reveal
            className="max-w-[46ch] text-lede leading-[1.55] text-pretty text-muted first:text-ink"
          >
            {paragraph}
          </p>
        ))}
      </div>
      <Disciplines kicker={disciplinesKicker} disciplines={disciplines} />
    </Chapter>
  );
}
