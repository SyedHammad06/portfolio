import type { CSSProperties } from "react";

/** Grid cells counted from the top-right corner, so they line up with the right-anchored dot texture. */
const DOTS: Array<{ x: number; y: number; signal?: boolean }> = [
  { x: 1, y: 2 },
  { x: 3, y: 1, signal: true },
  { x: 5, y: 4 },
  { x: 2, y: 6 },
  { x: 8, y: 2 },
  { x: 7, y: 7, signal: true },
  { x: 10, y: 5 },
  { x: 4, y: 9 },
  { x: 12, y: 1 },
  { x: 1, y: 11 },
];

export function AmbientDots() {
  return (
    <div aria-hidden="true" className="ambient ambient-dots">
      {DOTS.map(({ x, y, signal }, index) => (
        <span
          key={index}
          className={`ambient-dot${signal ? " is-signal" : ""}`}
          style={{ "--x": x, "--y": y, "--i": index } as CSSProperties}
        />
      ))}
    </div>
  );
}

export function AmbientSweep() {
  return (
    <div aria-hidden="true" className="ambient ambient-sweep">
      <span className="ambient-sweep-band" />
    </div>
  );
}

export function AmbientBeacon() {
  return (
    <div aria-hidden="true" className="ambient ambient-beacon">
      {[0, 1, 2].map((index) => (
        <span key={index} className="ambient-ring" style={{ "--i": index } as CSSProperties} />
      ))}
      <span className="ambient-beacon-core" />
    </div>
  );
}
