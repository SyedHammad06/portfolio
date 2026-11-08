import type { Project } from "@/content/types";
import { DisplayHeading } from "@/components/ui/display-heading";
import { Disclosure } from "@/components/ui/disclosure";
import { RollingLink } from "@/components/ui/rolling-link";
import { Chapter } from "./chapter";

type SelectedWorkProps = {
  title: string;
  aside: string;
  headline: { lead: string; emphasis: string };
  intro: string;
  moreLabel: string;
  projects: Project[];
};

function ProjectLinks({ project }: { project: Project }) {
  if (!project.href && !project.repo) return null;
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {project.href ? <RollingLink href={project.href} label="Visit site" arrow external /> : null}
      {project.repo ? <RollingLink href={project.repo} label="Source" arrow external /> : null}
    </div>
  );
}

export function SelectedWork({ title, aside, headline, intro, moreLabel, projects }: SelectedWorkProps) {
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);

  return (
    <Chapter
      id="work"
      number="03"
      title={title}
      aside={aside}
      heading={
        <DisplayHeading
          id="work-title"
          lead={headline.lead}
          emphasis={headline.emphasis}
          className="max-w-[13ch] text-display"
        />
      }
    >
      <p data-reveal className="mt-8 max-w-[52ch] text-lede leading-[1.55] text-pretty text-muted">
        {intro}
      </p>

      <ol className="mt-[clamp(56px,calc(88*var(--u)),128px)] border-t border-line">
        {featured.map((project) => (
          <li key={project.slug} data-reveal className="border-b border-line">
            <article
              aria-labelledby={`project-${project.slug}`}
              className="grid gap-6 py-[clamp(36px,calc(56*var(--u)),80px)] md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-x-[calc(56*var(--u))]"
            >
              <div>
                <h3
                  id={`project-${project.slug}`}
                  className="font-display text-title leading-[1.02] text-balance text-ink"
                >
                  {project.title}
                </h3>
                <p className="mt-4 font-mono text-label uppercase tracking-[0.14em] text-muted">
                  {project.category} <span aria-hidden="true">/</span>{" "}
                  <span className="text-faint">{project.context}</span>
                </p>
                {project.result ? (
                  <p className="mt-6 font-display text-[clamp(22px,calc(28*var(--u)),40px)] leading-none italic text-ink">
                    {project.result}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-6">
                <p className="max-w-[48ch] text-[clamp(16px,calc(17*var(--u)),22px)] leading-[1.6] text-pretty text-muted">
                  {project.summary}
                </p>
                <ul aria-label="Stack" className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <ProjectLinks project={project} />
              </div>
            </article>
          </li>
        ))}
      </ol>

      <div data-reveal className="mt-[clamp(56px,calc(88*var(--u)),128px)]">
        <Disclosure summary={moreLabel} meta={`${more.length} projects`}>
          <ul>
            {more.map((project) => (
              <li
                key={project.slug}
                className="grid gap-3 border-b border-line py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_auto] md:items-baseline md:gap-x-[calc(40*var(--u))]"
              >
                <div>
                  <h4 className="font-display text-[clamp(24px,calc(30*var(--u)),42px)] leading-[1.05] text-ink">
                    {project.title}
                  </h4>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                    {project.category} / {project.context}
                  </p>
                </div>
                <p className="max-w-[56ch] text-[16px] leading-[1.6] text-pretty text-muted">
                  {project.summary}
                  {project.result ? <span className="text-ink"> {project.result}.</span> : null}
                </p>
                <ProjectLinks project={project} />
              </li>
            ))}
          </ul>
        </Disclosure>
      </div>
    </Chapter>
  );
}
