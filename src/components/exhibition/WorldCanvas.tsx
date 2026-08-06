"use client";

import { useEffect, useRef, useMemo } from "react";
import { useExhibition } from "@/lib/ExhibitionContext";
import { getInterpolatedPalette } from "@/lib/progress";

// ─── Helpers ─────────────────────────────────────────────────────────

function clamp(val: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, val));
}

function clampedMap(val: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return clamp(
    outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin),
    Math.min(outMin, outMax),
    Math.max(outMin, outMax)
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(x => x + x).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function lerpColor(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bv = Math.round(ab + (bb - ab) * t);
  return `#${((1 << 24) + (r << 16) + (g << 8) + bv).toString(16).slice(1)}`;
}

// ─── Types ───────────────────────────────────────────────────────────

interface Particle {
  x: number; // 0–1 normalized
  y: number;
  seed: number;
  size: number;
  angle: number;     // for fragment lines
  lineLen: number;   // fragment line length (normalized)
  clusterX: number;  // clustered position
  clusterY: number;
  exitX: number;     // open-edges exit position
  exitY: number;
  clusterId: number;
}

interface Edge {
  a: number;
  b: number;
  type: "intra" | "inter";
}

// ─── Component ───────────────────────────────────────────────────────

export function WorldCanvas() {
  const { state, reducedMotion, isMobile } = useExhibition();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef(state);
  stateRef.current = state;

  const COUNT = isMobile ? 80 : 180;
  const CLUSTERS = isMobile ? 6 : 14;

  const { particles, edges } = useMemo(() => {
    const clusterCenters = Array.from({ length: CLUSTERS }, () => {
      let cx = Math.random();
      // Keep clusters away from horizontal center so they don't overlap text
      if (cx > 0.3 && cx < 0.7) cx = cx > 0.5 ? cx + 0.2 : cx - 0.2;
      return { x: clamp(cx, 0.05, 0.95), y: 0.08 + Math.random() * 0.84 };
    });

    const ps: Particle[] = Array.from({ length: COUNT }, (_, i) => {
      const clusterId = i % CLUSTERS;
      const cc = clusterCenters[clusterId];
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.14;
      const cx = clamp(cc.x + Math.cos(angle) * r, 0.02, 0.98);
      const cy = clamp(cc.y + Math.sin(angle) * r, 0.02, 0.98);

      // Scattered base position — also avoid horizontal center
      let bx = Math.random();
      if (bx > 0.3 && bx < 0.7) bx = bx > 0.5 ? bx + 0.2 : bx - 0.2;
      bx = clamp(bx, 0.02, 0.98);

      // Exit position for open-edges phase — explode outward
      const ex = cx < 0.5 ? cx - 0.35 - Math.random() * 0.35 : cx + 0.35 + Math.random() * 0.35;
      const ey = cy < 0.5 ? cy - 0.35 - Math.random() * 0.35 : cy + 0.35 + Math.random() * 0.35;

      return {
        x: bx,
        y: Math.random(),
        seed: Math.random(),
        size: 1.5 + Math.random() * 2.5,
        angle: Math.random() * Math.PI * 2,
        lineLen: 0.015 + Math.random() * 0.04,
        clusterX: cx,
        clusterY: cy,
        exitX: ex,
        exitY: ey,
        clusterId,
      };
    });

    const es: Edge[] = [];
    ps.forEach((p, i) => {
      const same = ps.filter((q, j) => q.clusterId === p.clusterId && j !== i);
      if (same.length > 0) {
        es.push({ a: i, b: same[Math.floor(Math.random() * same.length)].seed * same.length | 0, type: "intra" });
        if (Math.random() > 0.55 && same.length > 1) {
          es.push({ a: i, b: same[Math.floor(Math.random() * same.length)].seed * same.length | 0, type: "intra" });
        }
      }
      if (Math.random() > 0.82) {
        const diff = ps.filter(q => q.clusterId !== p.clusterId);
        if (diff.length > 0) {
          const target = diff[Math.floor(Math.random() * diff.length)];
          es.push({ a: i, b: ps.indexOf(target), type: "inter" });
        }
      }
    });

    return { particles: ps, edges: es };
  }, [COUNT, CLUSTERS]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    window.addEventListener("resize", resize);
    resize();

    const render = (time: number) => {
      const s = stateRef.current;
      const vc = s.visualComplexity;
      const t = reducedMotion ? 0 : time / 1000;

      // ── Background ─────────────────────────────────────────────────
      const pal = getInterpolatedPalette(s);
      ctx.fillStyle = pal.bg;
      ctx.fillRect(0, 0, W, H);

      // Ambient radial glow using chapter glow value
      if (pal.glow && pal.glow !== "transparent") {
        const grad = ctx.createRadialGradient(W * 0.5, H * 0.55, 0, W * 0.5, H * 0.55, Math.max(W, H) * 0.75);
        grad.addColorStop(0, pal.glow);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      const accent = pal.primary;

      // Compute current particle positions
      const clusterWeight = clampedMap(vc, 0.15, 0.38, 0, 1);
      const openWeight = clampedMap(vc, 0.88, 1.0, 0, 1);

      const pos = particles.map((p) => {
        const ow = p.seed > 0.45 ? openWeight : 0;
        let lx = p.x * (1 - clusterWeight) + p.clusterX * clusterWeight + (p.exitX - p.clusterX) * ow;
        let ly = p.y * (1 - clusterWeight) + p.clusterY * clusterWeight + (p.exitY - p.clusterY) * ow;
        if (!reducedMotion) {
          lx += Math.sin(t * 0.4 + p.seed * 80) * 0.008;
          ly += Math.cos(t * 0.35 + p.seed * 80) * 0.008;
        }
        return { x: lx * W, y: ly * H };
      });

      // ── Phase 0–1: Stone — coarse scattered dots ────────────────────
      const stoneAlpha = clampedMap(vc, 0.0, 0.18, 0, 0.5);
      if (stoneAlpha > 0) {
        ctx.globalAlpha = stoneAlpha;
        ctx.fillStyle = accent;
        pos.forEach((p, i) => {
          const drift = reducedMotion ? 0 : Math.sin(t * 0.3 + particles[i].seed * 60) * 4;
          ctx.beginPath();
          ctx.arc(p.x + drift, p.y + drift * 0.5, particles[i].size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // ── Phase 2: Fragments — short broken diagonal lines ───────────
      const fragAlpha = clampedMap(vc, 0.15, 0.35, 0, 0.35);
      if (fragAlpha > 0) {
        ctx.globalAlpha = fragAlpha;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1;
        particles.forEach((p, i) => {
          const px = pos[i].x;
          const py = pos[i].y;
          const len = p.lineLen * W;
          const a = p.angle + (reducedMotion ? 0 : t * 0.1);
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + Math.cos(a) * len, py + Math.sin(a) * len);
          ctx.stroke();
        });
      }

      // ── Phase 3: Structure — geometric grid lines ───────────────────
      const gridAlpha = clampedMap(vc, 0.3, 0.52, 0, 0.1);
      if (gridAlpha > 0) {
        ctx.globalAlpha = gridAlpha;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 0.5;
        const hSteps = 8;
        const vSteps = 8;
        ctx.beginPath();
        for (let i = 1; i < hSteps; i++) {
          const y = (H / hSteps) * i;
          ctx.moveTo(0, y);
          ctx.lineTo(W, y);
        }
        for (let i = 1; i < vSteps; i++) {
          const x = (W / vSteps) * i;
          ctx.moveTo(x, 0);
          ctx.lineTo(x, H);
        }
        ctx.stroke();
      }

      // ── Phase 4: Modules — cluster bounding boxes ──────────────────
      const moduleAlpha = clampedMap(vc, 0.45, 0.62, 0, 0.28);
      if (moduleAlpha > 0) {
        ctx.globalAlpha = moduleAlpha;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1;
        for (let c = 0; c < CLUSTERS; c++) {
          let minX = W, minY = H, maxX = 0, maxY = 0, has = false;
          particles.forEach((p, i) => {
            if (p.clusterId === c) {
              has = true;
              if (pos[i].x < minX) minX = pos[i].x;
              if (pos[i].y < minY) minY = pos[i].y;
              if (pos[i].x > maxX) maxX = pos[i].x;
              if (pos[i].y > maxY) maxY = pos[i].y;
            }
          });
          if (has) {
            const pad = 10;
            ctx.strokeRect(minX - pad, minY - pad, (maxX - minX) + pad * 2, (maxY - minY) + pad * 2);
          }
        }
      }

      // ── Phase 5: Networks — inter-cluster edges ─────────────────────
      const netAlpha = clampedMap(vc, 0.6, 0.76, 0, 0.45);
      if (netAlpha > 0) {
        ctx.globalAlpha = netAlpha;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1;
        ctx.beginPath();
        edges.filter(e => e.type === "inter").forEach(e => {
          if (pos[e.a] && pos[e.b]) {
            ctx.moveTo(pos[e.a].x, pos[e.a].y);
            ctx.lineTo(pos[e.b].x, pos[e.b].y);
          }
        });
        ctx.stroke();

        // Also draw intra edges at this phase
        ctx.globalAlpha = netAlpha * 0.6;
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        edges.filter(e => e.type === "intra").forEach(e => {
          if (pos[e.a] && pos[e.b]) {
            ctx.moveTo(pos[e.a].x, pos[e.a].y);
            ctx.lineTo(pos[e.b].x, pos[e.b].y);
          }
        });
        ctx.stroke();
      }

      // ── Phase 6: Intelligence — pulsing data flow dots ─────────────
      const intelAlpha = clampedMap(vc, 0.75, 0.9, 0, 1);
      if (intelAlpha > 0 && !reducedMotion) {
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = intelAlpha * 0.8;
        edges.filter(e => e.type === "inter").forEach((e, i) => {
          if (!pos[e.a] || !pos[e.b]) return;
          const p1 = pos[e.a], p2 = pos[e.b];
          const tp = (t * 0.35 + i * 0.13) % 1;
          ctx.beginPath();
          ctx.arc(p1.x + (p2.x - p1.x) * tp, p1.y + (p2.y - p1.y) * tp, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // ── Phase 7: Open Edges — nodes fly outward ─────────────────────
      const openAlpha = clampedMap(vc, 0.88, 1.0, 0, 0.5);
      if (openAlpha > 0) {
        ctx.strokeStyle = accent;
        ctx.globalAlpha = openAlpha;
        ctx.lineWidth = 1;
        ctx.beginPath();
        particles.forEach((p, i) => {
          if (p.seed <= 0.45) {
            ctx.moveTo(pos[i].x, pos[i].y);
            ctx.lineTo(pos[i].x + (p.exitX * W - pos[i].x) * openAlpha,
                       pos[i].y + (p.exitY * H - pos[i].y) * openAlpha);
          }
        });
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, particles, edges, CLUSTERS]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
