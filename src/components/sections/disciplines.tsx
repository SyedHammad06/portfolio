import type { Discipline } from "@/content/types";
import { Tabs } from "@/components/ui/tabs";

type DisciplinesProps = {
  kicker: string;
  disciplines: Discipline[];
};

export function Disciplines({ kicker, disciplines }: DisciplinesProps) {
  return (
    <div className="mt-[clamp(72px,calc(112*var(--u)),160px)]">
      <h3 data-reveal className="font-display text-title leading-none text-ink">
        {kicker}
      </h3>
      <Tabs
        label="Disciplines"
        className="mt-8"
        items={disciplines.map((discipline) => ({
          id: discipline.id,
          label: discipline.label,
          detail: discipline.area,
          panel: (
            <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-[calc(56*var(--u))]">
              <p className="font-display text-[clamp(28px,calc(40*var(--u)),58px)] leading-[1.04] text-balance text-ink">
                {discipline.headline}
              </p>
              <div>
                <p className="max-w-[52ch] text-lede leading-[1.55] text-pretty text-muted">
                  {discipline.body}
                </p>
                <ul aria-label="Tools" className="mt-8 flex flex-wrap gap-2">
                  {discipline.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ),
        }))}
      />
    </div>
  );
}
