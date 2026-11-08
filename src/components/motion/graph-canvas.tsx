"use client";

import { useEffect, useMemo, useRef } from "react";
import { buildGraph, type GraphData } from "./graph-data";
import { useMotion } from "./use-motion";
import { ScrollTrigger } from "./gsap";

const INK: [number, number, number] = [241 / 255, 235 / 255, 229 / 255];
const SIGNAL: [number, number, number] = [236 / 255, 136 / 255, 56 / 255];

type Batch = { lines: number[]; points: number[] };
type Layer = { color: [number, number, number]; batch: Batch };

interface Renderer {
  resize(width: number, height: number, dpr: number): void;
  draw(layers: Layer[]): void;
  dispose(): void;
}

const VERTEX = `#version 300 es
in vec2 a_pos;
in float a_alpha;
in float a_size;
uniform vec2 u_res;
out float v_alpha;
void main() {
  vec2 clip = a_pos / u_res * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = a_size;
  v_alpha = a_alpha;
}`;

const FRAGMENT = `#version 300 es
precision mediump float;
uniform vec3 u_color;
uniform float u_round;
in float v_alpha;
out vec4 outColor;
void main() {
  float alpha = v_alpha;
  if (u_round > 0.5) {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    alpha *= smoothstep(0.5, 0.36, r);
  }
  outColor = vec4(u_color * alpha, alpha);
}`;

function createWebGLRenderer(canvas: HTMLCanvasElement): Renderer | null {
  const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, antialias: true, alpha: true });
  if (!gl) return null;

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;

  const buffer = gl.createBuffer();
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  const stride = 4 * 4;
  const attributes: Array<[string, number, number]> = [
    ["a_pos", 2, 0],
    ["a_alpha", 1, 8],
    ["a_size", 1, 12],
  ];
  for (const [name, size, offset] of attributes) {
    const location = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, stride, offset);
  }
  const uRes = gl.getUniformLocation(program, "u_res");
  const uColor = gl.getUniformLocation(program, "u_color");
  const uRound = gl.getUniformLocation(program, "u_round");

  gl.useProgram(program);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  return {
    resize(width, height) {
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uRes, width, height);
    },
    draw(layers) {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      for (const { color, batch } of layers) {
        gl.uniform3f(uColor, color[0], color[1], color[2]);
        if (batch.lines.length) {
          gl.uniform1f(uRound, 0);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(batch.lines), gl.DYNAMIC_DRAW);
          gl.drawArrays(gl.LINES, 0, batch.lines.length / 4);
        }
        if (batch.points.length) {
          gl.uniform1f(uRound, 1);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(batch.points), gl.DYNAMIC_DRAW);
          gl.drawArrays(gl.POINTS, 0, batch.points.length / 4);
        }
      }
    },
    dispose() {
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    },
  };
}

function create2DRenderer(canvas: HTMLCanvasElement): Renderer | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  let dpr = 1;
  return {
    resize(_width, _height, nextDpr) {
      dpr = nextDpr;
    },
    draw(layers) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = dpr;
      for (const { color, batch } of layers) {
        const rgb = color.map((channel) => Math.round(channel * 255)).join(",");
        for (let i = 0; i < batch.lines.length; i += 8) {
          ctx.strokeStyle = `rgba(${rgb},${batch.lines[i + 2]})`;
          ctx.beginPath();
          ctx.moveTo(batch.lines[i], batch.lines[i + 1]);
          ctx.lineTo(batch.lines[i + 4], batch.lines[i + 5]);
          ctx.stroke();
        }
        for (let i = 0; i < batch.points.length; i += 4) {
          ctx.fillStyle = `rgba(${rgb},${batch.points[i + 2]})`;
          ctx.beginPath();
          ctx.arc(batch.points[i], batch.points[i + 1], batch.points[i + 3] / 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    },
    dispose() {},
  };
}

type Frame = {
  time: number;
  primary: number;
  scroll: number;
  pointer: { x: number; y: number } | null;
  width: number;
  height: number;
  dpr: number;
  motion: boolean;
};

function buildLayers(graph: GraphData, frame: Frame): Layer[] {
  const { width, height, dpr, time, pointer, motion } = frame;
  const drift = motion ? 0.006 : 0;
  const positions = graph.nodes.map((node) => {
    const still = node.anchor || node.phase === 0;
    const dx = still ? 0 : Math.sin(time * 0.35 + node.phase) * drift;
    const dy = still ? 0 : Math.cos(time * 0.28 + node.phase * 1.3) * drift;
    return [(node.x + dx) * width, (node.y + dy) * height] as const;
  });

  const proximity = (x: number, y: number) => {
    if (!pointer) return 0;
    const distance = Math.hypot(x - pointer.x * dpr, y - pointer.y * dpr);
    return Math.max(0, 1 - distance / (120 * dpr));
  };

  const ink: Batch = { lines: [], points: [] };
  for (const [a, b] of graph.edges) {
    const [ax, ay] = positions[a];
    const [bx, by] = positions[b];
    const glow = Math.max(proximity(ax, ay), proximity(bx, by));
    const weight = Math.min(graph.nodes[a].weight, graph.nodes[b].weight);
    const alpha = (0.1 + glow * 0.3) * weight;
    ink.lines.push(ax, ay, alpha, 1, bx, by, alpha, 1);
  }
  graph.nodes.forEach((node, index) => {
    const [x, y] = positions[index];
    const glow = proximity(x, y);
    const size = (node.anchor ? 5 : 3) * dpr + glow * 2 * dpr;
    const alpha = ((node.anchor ? 0.85 : 0.4) + glow * 0.4) * node.weight;
    ink.points.push(x, y, Math.min(alpha, 1), size);
  });

  const tracePath = (path: number[], progress: number, batch: Batch, alpha: number, nodeSize: number) => {
    const points = path.map((index) => positions[index]);
    const lengths = points.slice(1).map((point, i) => Math.hypot(point[0] - points[i][0], point[1] - points[i][1]));
    const total = lengths.reduce((sum, length) => sum + length, 0);
    let remaining = progress * total;
    batch.points.push(points[0][0], points[0][1], alpha, nodeSize);
    for (let i = 0; i < lengths.length && remaining > 0; i++) {
      const t = Math.min(1, remaining / lengths[i]);
      const [ax, ay] = points[i];
      const [bx, by] = points[i + 1];
      const ex = ax + (bx - ax) * t;
      const ey = ay + (by - ay) * t;
      batch.lines.push(ax, ay, alpha, 1, ex, ey, alpha, 1);
      if (t === 1) batch.points.push(bx, by, alpha, nodeSize);
      remaining -= lengths[i];
    }
    return { points, lengths, total };
  };

  const scrollTrace: Batch = { lines: [], points: [] };
  if (frame.scroll > 0) tracePath(graph.scrollPath, frame.scroll, scrollTrace, 0.75, 4.5 * dpr);

  const signal: Batch = { lines: [], points: [] };
  const route = tracePath(graph.primaryPath, frame.primary, signal, 1, 6 * dpr);

  if (motion && frame.primary >= 1) {
    let travel = ((time * 0.22) % 1) * route.total;
    for (let i = 0; i < route.lengths.length; i++) {
      if (travel <= route.lengths[i]) {
        const t = travel / route.lengths[i];
        const [ax, ay] = route.points[i];
        const [bx, by] = route.points[i + 1];
        signal.points.push(ax + (bx - ax) * t, ay + (by - ay) * t, 0.95, 4 * dpr);
        break;
      }
      travel -= route.lengths[i];
    }
  }

  return [
    { color: INK, batch: ink },
    { color: INK, batch: scrollTrace },
    { color: SIGNAL, batch: signal },
  ];
}

type GraphCanvasProps = {
  labels: string[];
  className?: string;
};

/** Live retrieval graph: an NL2SQL route lights up on load, a second route links as you scroll. */
export function GraphCanvas({ labels, className = "" }: GraphCanvasProps) {
  const graph = useMemo(() => buildGraph(labels), [labels]);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { enabled: motion } = useMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const renderer = createWebGLRenderer(canvas) ?? create2DRenderer(canvas);
    if (!renderer) return;

    const frame: Frame = {
      time: 0,
      primary: motion ? 0 : 1,
      scroll: 0,
      pointer: null,
      width: 0,
      height: 0,
      dpr: 1,
      motion,
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      frame.dpr = Math.min(window.devicePixelRatio || 1, 2);
      frame.width = Math.max(1, Math.round(rect.width * frame.dpr));
      frame.height = Math.max(1, Math.round(rect.height * frame.dpr));
      canvas.width = frame.width;
      canvas.height = frame.height;
      renderer.resize(frame.width, frame.height, frame.dpr);
      renderer.draw(buildLayers(graph, frame));
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const trigger = ScrollTrigger.create({
      trigger: container.closest("section") ?? container,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        frame.scroll = Math.min(1, self.progress * 1.8);
        if (!motion) renderer.draw(buildLayers(graph, frame));
      },
    });

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      frame.pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onPointerLeave = () => {
      frame.pointer = null;
    };

    let raf = 0;
    let visible = true;
    let start = 0;
    let loaded = "loaded" in document.documentElement.dataset;
    const onLoaded = () => {
      loaded = true;
    };
    window.addEventListener("site:loaded", onLoaded);
    const tick = (now: number) => {
      if (!start && loaded) start = now;
      const elapsed = start ? (now - start) / 1000 : 0;
      frame.time = elapsed;
      const drawIn = Math.min(1, Math.max(0, (elapsed - 0.5) / 1.6));
      frame.primary = 1 - Math.pow(1 - drawIn, 3);
      renderer.draw(buildLayers(graph, frame));
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (motion && visible && !raf) raf = requestAnimationFrame(tick);
    });
    intersection.observe(canvas);

    if (motion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("site:loaded", onLoaded);
      intersection.disconnect();
      resizeObserver.disconnect();
      trigger.kill();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      renderer.dispose();
    };
  }, [graph, motion]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="A live knowledge graph: multimodal data travels through agentic RAG, NL2SQL, and forecasting to insight."
        className="absolute inset-0 size-full"
      />
      {graph.nodes.map((node, index) =>
        node.anchor ? (
          <span
            key={index}
            aria-hidden="true"
            className={`pointer-events-none absolute font-mono text-[max(9px,calc(11*var(--u)))] uppercase leading-[1.35] tracking-[0.14em] whitespace-pre text-ink/85 ${
              node.anchor.side === "left"
                ? "-translate-x-[calc(100%+12px)] -translate-y-1/2 text-right"
                : node.anchor.side === "right"
                  ? "translate-x-[12px] -translate-y-1/2"
                  : "-translate-x-1/2 -translate-y-[calc(100%+10px)]"
            }`}
            style={{ left: `${node.x * 100}%`, top: `${node.y * 100}%` }}
          >
            {node.anchor.label}
          </span>
        ) : null,
      )}
    </div>
  );
}
