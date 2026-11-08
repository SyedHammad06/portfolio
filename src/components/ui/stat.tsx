import type { CSSProperties } from "react";
import type { Stat as StatData } from "@/content/types";

type StatProps = StatData & {
  className?: string;
  style?: CSSProperties;
};

/** One term/value pair inside a `<dl>`. Visual order can put the label first without changing DOM order. */
export function Stat({ value, label, labelFirst, className = "", style }: StatProps) {
  return (
    <div className={className} style={style}>
      <dt className={labelFirst ? "order-first" : "order-last"}>{label}</dt>
      <dd className="tabular">{value}</dd>
    </div>
  );
}
