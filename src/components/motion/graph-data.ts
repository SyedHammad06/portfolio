// Deterministic retrieval graph in a normalized box (0..1 on both axes).
// Anchor positions follow the approved hero comp; the rest is seeded scatter.

export type GraphNode = {
  x: number;
  y: number;
  /** Per-node phase for idle drift. */
  phase: number;
  /** 0..1 ink weight: fades toward the field's rim, varies node to node. */
  weight: number;
  anchor?: { label: string; side: "left" | "right" | "top" };
};

export type GraphData = {
  nodes: GraphNode[];
  edges: Array<[number, number]>;
  /** Orange path drawn on load: indices into nodes. */
  primaryPath: number[];
  /** Ink path that links as the visitor scrolls. */
  scrollPath: number[];
};

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildGraph(labels: string[]): GraphData {
  const random = mulberry32(1792);
  const [top, topRight, start, right, bottomLeft, end] = labels;

  const anchors: GraphNode[] = [
    { x: 0.36, y: 0.13, phase: 0, weight: 1, anchor: { label: top, side: "top" } },
    { x: 0.72, y: 0.155, phase: 0, weight: 1, anchor: { label: topRight, side: "right" } },
    { x: 0.14, y: 0.39, phase: 0, weight: 1, anchor: { label: start, side: "left" } },
    { x: 0.81, y: 0.46, phase: 0, weight: 1, anchor: { label: right, side: "right" } },
    { x: 0.21, y: 0.82, phase: 0, weight: 1, anchor: { label: bottomLeft, side: "left" } },
    { x: 0.73, y: 0.87, phase: 0, weight: 1, anchor: { label: end, side: "right" } },
  ];
  const hopA: GraphNode = { x: 0.3, y: 0.49, phase: 0, weight: 1 };
  const hopB: GraphNode = { x: 0.51, y: 0.57, phase: 0, weight: 1 };
  const hopC: GraphNode = { x: 0.55, y: 0.24, phase: 0, weight: 1 };

  const nodes: GraphNode[] = [...anchors, hopA, hopB, hopC];

  while (nodes.length < 74) {
    const x = random();
    const y = random();
    const dx = (x - 0.5) / 0.56;
    const dy = (y - 0.5) / 0.6;
    const rim = Math.sqrt(dx * dx + dy * dy);
    if (rim > 1) continue;
    if (nodes.some((node) => Math.hypot(node.x - x, (node.y - y) * 0.64) < 0.045)) continue;
    const fade = rim < 0.55 ? 1 : 1 - (rim - 0.55) / 0.45;
    const weight = Math.max(0.08, fade * fade) * (0.55 + random() * 0.45);
    nodes.push({ x, y, phase: random() * Math.PI * 2, weight });
  }

  const edgeSet = new Set<string>();
  const edges: Array<[number, number]> = [];
  const addEdge = (a: number, b: number) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (a === b || edgeSet.has(key)) return;
    edgeSet.add(key);
    edges.push([a, b]);
  };

  nodes.forEach((node, index) => {
    const nearest = nodes
      .map((other, otherIndex) => ({
        otherIndex,
        distance: Math.hypot(other.x - node.x, (other.y - node.y) * 0.64),
      }))
      .filter((entry) => entry.otherIndex !== index)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
    nearest.forEach((entry) => addEdge(index, entry.otherIndex));
  });

  const primaryPath = [2, 6, 7, 5];
  const scrollPath = [0, 8, 1, 3];
  for (const path of [primaryPath, scrollPath]) {
    for (let i = 0; i < path.length - 1; i++) addEdge(path[i], path[i + 1]);
  }

  return { nodes, edges, primaryPath, scrollPath };
}
