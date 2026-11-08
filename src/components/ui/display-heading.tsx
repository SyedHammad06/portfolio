type DisplayHeadingProps = {
  lead: string;
  emphasis?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

/** Serif display heading with an italic second clause, the page's signature voice. */
export function DisplayHeading({
  lead,
  emphasis,
  as: Tag = "h2",
  id,
  className = "",
}: DisplayHeadingProps) {
  return (
    <Tag
      id={id}
      data-reveal
      className={`font-display font-normal leading-[0.98] tracking-[-0.02em] text-balance text-ink ${className}`}
    >
      {lead}
      {emphasis ? (
        <>
          {" "}
          <em className="italic">{emphasis}</em>
        </>
      ) : null}
    </Tag>
  );
}
