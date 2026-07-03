"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hub: boolean;
  pulse: number;
};

type Pulse = {
  fromIdx: number;
  toIdx: number;
  t: number;
  speed: number;
};

const NODE_COLOR = "167, 139, 250"; // violet-400
const PULSE_COLOR = "196, 181, 253"; // violet-300 (brighter)
const HUB_COLOR = "216, 180, 254"; // violet-200

export function NetworkBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let frame = 0;

    const MAX_DIST = 170;

    const initNodes = () => {
      const count = Math.max(
        14,
        Math.min(30, Math.floor((width * height) / 36000))
      );
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1.4 + Math.random() * 1.8,
        hub: i % 7 === 0, // occasional hub nodes (like core routers)
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      // update node positions
      if (!reduceMotion) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x <= 0 || n.x >= width) n.vx *= -1;
          if (n.y <= 0 || n.y >= height) n.vy *= -1;
          n.x = Math.max(0, Math.min(width, n.x));
          n.y = Math.max(0, Math.min(height, n.y));
          n.pulse += 0.03;
        }
      }

      // draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.45;
            ctx.strokeStyle = `rgba(${NODE_COLOR}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // draw nodes with glow
      for (const n of nodes) {
        const breathe = reduceMotion
          ? 1
          : 0.75 + Math.sin(n.pulse) * 0.25;
        const color = n.hub ? HUB_COLOR : NODE_COLOR;
        // glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${0.06 * breathe})`;
        ctx.fill();
        // core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (n.hub ? 1.4 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${0.85 * breathe})`;
        ctx.fill();
      }

      // spawn data pulses along existing edges
      if (!reduceMotion && Math.random() < 0.05 && pulses.length < 8) {
        const i = Math.floor(Math.random() * nodes.length);
        const j = Math.floor(Math.random() * nodes.length);
        if (i !== j) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.hypot(dx, dy) < MAX_DIST) {
            pulses.push({
              fromIdx: i,
              toIdx: j,
              t: 0,
              speed: 0.012 + Math.random() * 0.016,
            });
          }
        }
      }

      // update + draw pulses (data packets traveling along edges)
      pulses = pulses.filter((p) => p.t < 1);
      for (const p of pulses) {
        if (!reduceMotion) p.t += p.speed;
        const a = nodes[p.fromIdx];
        const b = nodes[p.toIdx];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        // trailing tail
        const tailLen = 0.08;
        const tx = a.x + (b.x - a.x) * Math.max(0, p.t - tailLen);
        const ty = a.y + (b.y - a.y) * Math.max(0, p.t - tailLen);
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, `rgba(${PULSE_COLOR}, 0)`);
        grad.addColorStop(1, `rgba(${PULSE_COLOR}, 0.9)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        // packet head
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PULSE_COLOR}, 0.95)`;
        ctx.shadowColor = `rgba(${NODE_COLOR}, 0.9)`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
