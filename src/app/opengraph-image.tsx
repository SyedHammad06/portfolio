import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site";
import { about, hero } from "@/content/profile";

export const alt = `${siteConfig.name}, AI Engineer in Bengaluru`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "src/assets/fonts");
const [serif, serifItalic, mono] = await Promise.all([
  readFile(join(fontDir, "InstrumentSerif-Regular.ttf")),
  readFile(join(fontDir, "InstrumentSerif-Italic.ttf")),
  readFile(join(fontDir, "DMMono-Regular.ttf")),
]);

const ink = "#f1ebe5";
const muted = "#a6a39d";
const line = "rgba(241,235,229,0.18)";
const signal = "#ec8838";

const path = [
  [905, 352],
  [985, 398],
  [1062, 410],
  [1134, 474],
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080808",
          padding: "56px 64px",
          color: ink,
          position: "relative",
        }}
      >
        <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 }}>
          {path.slice(1).map(([x, y], i) => (
            <line
              key={`${x}-${y}`}
              x1={path[i][0]}
              y1={path[i][1]}
              x2={x}
              y2={y}
              stroke={signal}
              strokeWidth="2"
            />
          ))}
          {path.map(([x, y]) => (
            <circle key={`n-${x}`} cx={x} cy={y} r="5" fill={signal} />
          ))}
        </svg>
        <div
          style={{
            display: "flex",
            fontFamily: "DM Mono",
            fontSize: 22,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: muted,
          }}
        >
          {hero.roles}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontFamily: "Instrument Serif", fontSize: 168, lineHeight: 1 }}>
            {hero.firstName}&nbsp;
            <span style={{ fontStyle: "italic", color: signal }}>{hero.lastName}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontFamily: "Instrument Serif",
              fontSize: 36,
              color: muted,
              maxWidth: 820,
            }}
          >
            {hero.thesis}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${line}`,
            paddingTop: 22,
            fontFamily: "DM Mono",
            fontSize: 20,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: muted,
          }}
        >
          <span>{siteConfig.location}</span>
          <span>{about.aside}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "DM Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
