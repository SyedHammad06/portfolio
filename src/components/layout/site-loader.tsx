import type { CSSProperties } from "react";
import { loader } from "@/content/profile";

const MIN_SHOW_MS = 3300;
const MAX_SHOW_MS = 6000;

/** Sets data-loaded once the page has loaded and the roll has had time to land, capped so a stalled asset can't trap the visitor. */
const readyScript = `(function(){var d=document.documentElement;function ready(){if(d.dataset.loaded)return;d.dataset.loaded="true";dispatchEvent(new Event("site:loaded"))}if(d.dataset.motion==="off")return ready();function later(){setTimeout(ready,Math.max(0,${MIN_SHOW_MS}-performance.now()))}if(document.readyState==="complete")later();else addEventListener("load",later);setTimeout(ready,${MAX_SHOW_MS})})()`;

const noscriptStyle = `.site-loader{display:none}:root:not([data-loaded]){overflow:auto}:root:not([data-loaded]) :is(.enter,.enter-rule){animation-play-state:running}`;

export function SiteLoader() {
  const last = loader.words.length - 1;
  return (
    <>
      <div className="site-loader" role="status">
        <span className="sr-only">Loading</span>
        <div aria-hidden="true" className="site-loader-drum">
          {loader.words.map((word, index) => (
            <span
              key={word}
              className={index === last ? "site-loader-word is-last" : "site-loader-word"}
              style={{ "--i": index } as CSSProperties}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: readyScript }} />
      <noscript dangerouslySetInnerHTML={{ __html: `<style>${noscriptStyle}</style>` }} />
    </>
  );
}
