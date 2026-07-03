"use client";

import { useEffect, useRef } from "react";

/**
 * Matrix-style digital rain — green falling glyphs over a dark backdrop.
 * Designed as a subtle, masked section background (not a full screen takeover).
 *
 * Themed touches:
 *  - Katakana + digits + a few network symbols (like a packet capture stream)
 *  - Brighter "leading" glyph per column (the classic Matrix head)
 *  - Fade overlay so content stays readable
 *  - Respects prefers-reduced-motion (static dim render)
 */
export function MatrixRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const FONT_SIZE = 16;
    const CHARS =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789{}[]<>+-*/=.:;".split(
        ""
      );

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let columns = 0;
    let drops: { y: number; speed: number; len: number }[] = [];
    let frame = 0;
    let lastTime = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.max(1, Math.floor(width / FONT_SIZE));
      // Initialize drops at random heights so it doesn't "start" all at once
      drops = Array.from({ length: columns }, () => ({
        y: Math.random() * -height,
        speed: 0.6 + Math.random() * 0.9,
        len: 8 + Math.floor(Math.random() * 14),
      }));
      // Paint a single dim frame for reduced-motion users
      if (reduceMotion) drawStatic();
    };

    const drawStatic = () => {
      ctx.fillStyle = "rgba(10, 12, 14, 0.9)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${FONT_SIZE}px "Geist Mono", ui-monospace, monospace`;
      for (let i = 0; i < columns; i++) {
        const x = i * FONT_SIZE;
        const d = drops[i];
        for (let j = 0; j < d.len; j++) {
          const y = d.y + j * FONT_SIZE;
          if (y < 0 || y > height) continue;
          const alpha = (1 - j / d.len) * 0.25;
          ctx.fillStyle = `rgba(0, 255, 120, ${alpha})`;
          ctx.fillText(
            CHARS[Math.floor(Math.random() * CHARS.length)],
            x,
            y
          );
        }
      }
    };

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      // Throttle to ~20fps for the trailing-fade aesthetic + perf
      if (time - lastTime < 50) return;
      lastTime = time;
      frame++;

      // Trailing fade: paint a translucent dark rect each frame
      ctx.fillStyle = "rgba(10, 12, 14, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${FONT_SIZE}px "Geist Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < columns; i++) {
        const d = drops[i];
        const x = i * FONT_SIZE;
        // Draw the trailing tail of this drop
        for (let j = 0; j < d.len; j++) {
          const y = d.y - j * FONT_SIZE;
          if (y < -FONT_SIZE || y > height) continue;
          const alpha = (1 - j / d.len) * 0.55;
          // Leading glyph is bright green/white; trail is dim green
          if (j === 0) {
            ctx.fillStyle = `rgba(180, 255, 200, ${0.85})`;
          } else {
            ctx.fillStyle = `rgba(0, 255, 120, ${alpha})`;
          }
          ctx.fillText(
            CHARS[Math.floor(Math.random() * CHARS.length)],
            x,
            y
          );
        }

        // Advance drop
        d.y += d.speed * FONT_SIZE * 0.5;
        // Reset when off-screen, with randomization so columns don't sync
        if (d.y - d.len * FONT_SIZE > height) {
          d.y = -FONT_SIZE;
          d.speed = 0.6 + Math.random() * 0.9;
          d.len = 8 + Math.floor(Math.random() * 14);
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduceMotion) {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
