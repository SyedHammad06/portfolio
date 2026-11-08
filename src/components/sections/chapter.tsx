import type { ReactNode } from "react";
import { ChapterMarker } from "@/components/ui/chapter-marker";

type ChapterProps = {
  id: string;
  number: string;
  title: string;
  /** Short line under the running head. */
  aside?: string;
  heading: ReactNode;
  /** Decorative layer painted behind the chapter's content. */
  background?: ReactNode;
  className?: string;
  children: ReactNode;
};

function RunningHead({ number, title, aside }: Pick<ChapterProps, "number" | "title" | "aside">) {
  return (
    <>
      <ChapterMarker number={number} title={title} />
      {aside ? (
        <p className="mt-3 max-w-[18ch] font-display text-[clamp(20px,calc(24*var(--u)),32px)] leading-[1.1] italic text-faint lg:mt-4">
          {aside}
        </p>
      ) : null}
    </>
  );
}

/**
 * A numbered chapter: running head in a margin column that lines up with the
 * header nav (32.66vw), content in the column to its right. Below lg the
 * running head follows the heading instead of sitting above it.
 */
export function Chapter({ id, number, title, aside, heading, background, className = "", children }: ChapterProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`border-t border-line px-(--gutter) py-[clamp(88px,calc(140*var(--u)),210px)] ${
        background ? "relative isolate overflow-clip" : ""
      } ${className}`}
    >
      {background}
      <div className="grid lg:grid-cols-[calc(32.66vw-var(--gutter))_minmax(0,1fr)]">
        <div
          data-reveal
          className="hidden lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:block lg:self-start"
        >
          <RunningHead number={number} title={title} aside={aside} />
        </div>
        <div className="min-w-0 lg:pr-[calc(40*var(--u))]">
          {heading}
          <div data-reveal className="mt-6 lg:hidden">
            <RunningHead number={number} title={title} aside={aside} />
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
