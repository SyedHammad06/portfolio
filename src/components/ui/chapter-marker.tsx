type ChapterMarkerProps = {
  number: string;
  title: string;
  className?: string;
};

/** Running head in the margin column, like a magazine folio. Not an eyebrow over the heading. */
export function ChapterMarker({ number, title, className = "" }: ChapterMarkerProps) {
  return (
    <p
      className={`flex items-baseline gap-3 font-mono text-label uppercase tracking-[0.14em] text-muted ${className}`}
    >
      <span className="tabular text-ink">{number}</span>
      <span aria-hidden="true" className="h-px w-6 translate-y-[-0.3em] bg-line-strong" />
      <span>{title}</span>
    </p>
  );
}
