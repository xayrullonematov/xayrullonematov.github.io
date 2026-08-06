"use client";

import { useEffect, useRef, useMemo } from "react";
import { useExhibition } from "@/lib/ExhibitionContext";
import { chapters } from "@/data/journey";
import { getInterpolatedPalette } from "@/lib/progress";

// ─── Helpers ─────────────────────────────────────────────────────────

function clamp(val: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, val));
}

function mapRange(
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
}

function clampedMap(
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return clamp(
    mapRange(val, inMin, inMax, outMin, outMax),
    Math.min(outMin, outMax),
    Math.max(outMin, outMax)
  );
}

function lerpColor(a: string, b: string, t: number): string {
  const hex = (c: string) => {
    if (c.startsWith("#")) c = c.slice(1);
    if (c.length === 3) c = c.split("").map((x) => x + x).join("");
    return parseInt(c, 16);
  };
  const numA = hex(a);
  const numB = hex(b);
  const rA = (numA >> 16) & 255;
  const gA = (numA >> 8) & 255;
  const bA = numA & 255;
  const rB = (numB >> 16) & 255;
  const gB = (numB >> 8) & 255;
  const bB = numB & 255;

  const r = Math.round(rA + (rB - rA) * t);
  const g = Math.round(gA + (gB - gA) * t);
  const bv = Math.round(bA + (bB - bA) * t);

  return `#${((1 << 24) + (r << 16) + (g << 8) + bv).toString(16).slice(1)}`;
}

const PHASE_COLORS = [
  { t: 0.0, c: "#d4a574" }, // Marks
  { t: 0.15, c: "#7da5c2" }, // Fragments
  { t: 0.3, c: "#a5d6a7" }, // Lines
  { t: 0.45, c: "#f06f52" }, // Modules
  { t: 0.6, c: "#7257e8" }, // Networks
  { t: 0.75, c: "#60a5fa" }, // Intelligence
  { t: 0.9, c: "#f6f4ef" }, // Open Edges
  { t: 1.0, c: "#f6f4ef" },
];

function getPhaseColor(vc: number) {
  for (let i = 0; i < PHASE_COLORS.length - 1; i++) {
    if (vc >= PHASE_COLORS[i].t && vc <= PHASE_COLORS[i + 1].t) {
      const t = (vc - PHASE_COLORS[i].t) / (PHASE_COLORS[i + 1].t - PHASE_COLORS[i].t);
      return lerpColor(PHASE_COLORS[i].c, PHASE_COLORS[i + 1].c, t);
    }
  }
  return PHASE_COLORS[PHASE_COLORS.length - 1].c;
}

// ─── Types ───────────────────────────────────────────────────────────

interface GraphNode {
  id: number;
  clusterIndex: number;
  bx: number; // base scattered x
  by: number; // base scattered y
  cx: number; // clustered x
  cy: number; // clustered y
  ex: number; // open edge x
  ey: number; // open edge y
  seed: number;
}

interface GraphEdge {
  a: number;
  b: number;
  type: "intra" | "inter";
}

// ─── Component ───────────────────────────────────────────────────────

export function WorldCanvas() {
  const { state, reducedMotion, isMobile } = useExhibition();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  
  // Keep a mutable ref of the state so the requestAnimationFrame loop
  // always reads the freshest values without tearing down the effect.
  const stateRef = useRef(state);
  stateRef.current = state;

  // Generate graph elements once based on device
  const { nodes, edges, numClusters } = useMemo(() => {
    // 40% particles for mobile
    const numNodes = isMobile ? 60 : 150;
    const nClusters = isMobile ? 5 : 12;

    const clusters = Array.from({ length: nClusters }, () => {
      // Keep clusters away from the horizontal center (avoid 0.25 to 0.75)
      let cx = Math.random();
      if (cx > 0.25 && cx < 0.75) {
        cx = cx > 0.5 ? cx + 0.25 : cx - 0.25;
      }
      return {
        x: clamp(cx, 0.05, 0.95),
        y: 0.1 + Math.random() * 0.8,
      };
    });

    const ns: GraphNode[] = [];
    for (let i = 0; i < numNodes; i++) {
      const clusterIndex = i % nClusters;
      const cc = clusters[clusterIndex];
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.15;
      const cx = cc.x + Math.cos(angle) * radius;
      const cy = cc.y + Math.sin(angle) * radius;

      // Push outward for the open edges phase
      const ex = cx < 0.5 ? cx - 0.3 - Math.random() * 0.4 : cx + 0.3 + Math.random() * 0.4;
      const ey = cy < 0.5 ? cy - 0.3 - Math.random() * 0.4 : cy + 0.3 + Math.random() * 0.4;

      // Keep scattered marks away from the horizontal center too
      let bx = Math.random();
      if (bx > 0.25 && bx < 0.75) {
        bx = bx > 0.5 ? bx + 0.25 : bx - 0.25;
      }
      bx = clamp(bx, 0.05, 0.95);

      ns.push({
        id: i,
        clusterIndex,
        bx,
        by: Math.random(),
        cx,
        cy,
        ex,
        ey,
        seed: Math.random(),
      });
    }

    const es: GraphEdge[] = [];
    ns.forEach((n1, i) => {
      // Intra-cluster edges (Lines phase)
      const same = ns.filter((n, j) => n.clusterIndex === n1.clusterIndex && i !== j);
      if (same.length > 0) {
        es.push({ a: i, b: same[Math.floor(Math.random() * same.length)].id, type: "intra" });
        if (Math.random() > 0.5 && same.length > 1) {
          es.push({ a: i, b: same[Math.floor(Math.random() * same.length)].id, type: "intra" });
        }
      }
      // Inter-cluster edges (Networks phase)
      if (Math.random() > 0.8) {
        const diff = ns.filter((n) => n.clusterIndex !== n1.clusterIndex);
        if (diff.length > 0) {
          es.push({ a: i, b: diff[Math.floor(Math.random() * diff.length)].id, type: "inter" });
        }
      }
    });

    return { nodes: ns, edges: es, numClusters: nClusters };
  }, [isMobile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener("resize", resize);
    resize();

    const render = (time: number) => {
      const currentState = stateRef.current;
      const vc = currentState.visualComplexity;
      const t = reducedMotion ? 0 : time / 1000;
      
      const palette = getInterpolatedPalette(currentState);
      const phaseColor = getPhaseColor(vc);

      // ─── Background & Ambient Glow ──────────────────────────────────
      ctx.fillStyle = palette.bg;
      ctx.fillRect(0, 0, width, height);

      if (palette.glow) {
        const gradient = ctx.createRadialGradient(
          width / 2, height / 2, 0,
          width / 2, height / 2, Math.max(width, height) * 0.8
        );
        gradient.addColorStop(0, palette.glow);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // ─── Node Positions ─────────────────────────────────────────────
      const positions = nodes.map((n) => {
        // Clustering interpolation (0.15 -> 0.3)
        const clusterWeight = clampedMap(vc, 0.15, 0.3, 0, 1);
        // Open edges outward expansion (0.9 -> 1.0) for half the nodes
        const openEdgeWeight = n.seed > 0.5 ? clampedMap(vc, 0.9, 1.0, 0, 1) : 0;

        let lx = n.bx * (1 - clusterWeight) + n.cx * clusterWeight + (n.ex - n.cx) * openEdgeWeight;
        let ly = n.by * (1 - clusterWeight) + n.cy * clusterWeight + (n.ey - n.cy) * openEdgeWeight;

        // Organic drift
        if (!reducedMotion) {
          lx += Math.sin(t * 0.5 + n.seed * 100) * 0.01;
          ly += Math.cos(t * 0.4 + n.seed * 100) * 0.01;
        }

        return { x: lx * width, y: ly * height };
      });

      // ─── 1. Marks (0.0 -> 0.15 fade in) ─────────────────────────────
      const markAlpha = clampedMap(vc, 0.0, 0.15, 0, 1);
      if (markAlpha > 0) {
        ctx.fillStyle = phaseColor;
        ctx.globalAlpha = markAlpha;
        const isRect = vc > 0.45;

        positions.forEach((p, i) => {
          const n = nodes[i];
          const size = isRect ? 4 : 2 + n.seed * 2;
          if (isRect) {
            ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
          } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // ─── 2/3. Fragments & Lines (0.15 -> 0.45) ──────────────────────
      const intraAlpha = clampedMap(vc, 0.15, 0.45, 0, 0.6);
      if (intraAlpha > 0) {
        ctx.strokeStyle = phaseColor;
        ctx.globalAlpha = intraAlpha;
        ctx.lineWidth = 1;
        ctx.beginPath();
        edges
          .filter((e) => e.type === "intra")
          .forEach((e) => {
            ctx.moveTo(positions[e.a].x, positions[e.a].y);
            ctx.lineTo(positions[e.b].x, positions[e.b].y);
          });
        ctx.stroke();
      }

      // ─── 4. Modules (0.45 -> 0.6) ───────────────────────────────────
      const moduleAlpha = clampedMap(vc, 0.45, 0.6, 0, 0.3);
      if (moduleAlpha > 0) {
        ctx.strokeStyle = phaseColor;
        ctx.globalAlpha = moduleAlpha;
        ctx.lineWidth = 1;
        
        for (let c = 0; c < numClusters; c++) {
          let minX = width, minY = height, maxX = 0, maxY = 0;
          let hasNodes = false;
          
          nodes.forEach((n) => {
            if (n.clusterIndex === c) {
              hasNodes = true;
              const p = positions[n.id];
              if (p.x < minX) minX = p.x;
              if (p.y < minY) minY = p.y;
              if (p.x > maxX) maxX = p.x;
              if (p.y > maxY) maxY = p.y;
            }
          });
          
          if (hasNodes) {
            const pad = 12;
            ctx.strokeRect(
              minX - pad,
              minY - pad,
              (maxX - minX) + pad * 2,
              (maxY - minY) + pad * 2
            );
          }
        }
      }

      // ─── 5. Networks (0.6 -> 0.75) ──────────────────────────────────
      const interAlpha = clampedMap(vc, 0.6, 0.75, 0, 0.5);
      if (interAlpha > 0) {
        ctx.strokeStyle = phaseColor;
        ctx.globalAlpha = interAlpha;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        edges
          .filter((e) => e.type === "inter")
          .forEach((e) => {
            ctx.moveTo(positions[e.a].x, positions[e.a].y);
            ctx.lineTo(positions[e.b].x, positions[e.b].y);
          });
        ctx.stroke();
      }

      // ─── 6. Intelligence (0.75 -> 0.9) ──────────────────────────────
      const intelAlpha = clampedMap(vc, 0.75, 0.9, 0, 1);
      if (intelAlpha > 0 && !reducedMotion) {
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = intelAlpha;
        edges
          .filter((e) => e.type === "inter")
          .forEach((e, i) => {
            const p1 = positions[e.a];
            const p2 = positions[e.b];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const t_pulse = (t * 0.4 + i * 0.1) % 1;
            
            ctx.beginPath();
            ctx.arc(p1.x + dx * t_pulse, p1.y + dy * t_pulse, 2.5, 0, Math.PI * 2);
            ctx.fill();
          });
      }

      // ─── 7. Open Edges (0.9 -> 1.0) ─────────────────────────────────
      const openEdgeAlpha = clampedMap(vc, 0.9, 1.0, 0, 0.5);
      if (openEdgeAlpha > 0) {
        ctx.strokeStyle = phaseColor;
        ctx.globalAlpha = openEdgeAlpha;
        ctx.lineWidth = 1;
        ctx.beginPath();
        nodes.forEach((n) => {
          // Draw connecting trails to nodes that didn't move
          if (n.seed <= 0.5) {
            const p = positions[n.id];
            const tx = n.ex * width;
            const ty = n.ey * height;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + (tx - p.x) * openEdgeAlpha, p.y + (ty - p.y) * openEdgeAlpha);
          }
        });
        ctx.stroke();
      }

      // Reset alpha
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, nodes, edges, numClusters]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
