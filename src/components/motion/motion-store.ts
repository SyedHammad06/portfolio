// Motion preference shared by GSAP and the graph canvas: the OS setting decides.

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function read(): boolean {
  return !window.matchMedia(REDUCED_QUERY).matches;
}

export function subscribeMotion(listener: () => void) {
  const query = window.matchMedia(REDUCED_QUERY);
  const onChange = () => {
    document.documentElement.dataset.motion = read() ? "on" : "off";
    listener();
  };
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function getMotion(): boolean {
  return read();
}

/** Server render assumes motion on; the client corrects before paint via the inline script. */
export function getServerMotion(): boolean {
  return true;
}

/** Runs inline in <head> so data-motion is correct before first paint. */
export const motionBootScript = `try{document.documentElement.dataset.motion=matchMedia("${REDUCED_QUERY}").matches?"off":"on"}catch(e){}`;
