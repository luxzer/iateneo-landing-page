"use client";

import { useRef, useEffect } from "react";

export function BackgroundStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let frame: number;

    interface BgStar {
      x: number;
      y: number;
      r: number;
      phase: number;
      speed: number;
      baseOpacity: number;
    }

    let stars: BgStar[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = document.documentElement.scrollHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.floor((w * h) / 8000);
      const count = Math.min(density, 500);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.3 + Math.random() * 1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0008 + Math.random() * 0.002,
        baseOpacity: 0.08 + Math.random() * 0.2,
      }));
    };

    resize();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(document.body);

    const draw = () => {
      const now = Date.now();
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const opacity =
          s.baseOpacity + Math.sin(now * s.speed + s.phase) * 0.08;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.03, opacity)})`;
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
