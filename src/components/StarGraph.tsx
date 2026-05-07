"use client";

import { useRef, useEffect, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  baseRadius: number;
  label: string;
  quote: string;
  phase: number;
}

interface Connection {
  from: number;
  to: number;
  particleProgress: number;
  particleSpeed: number;
}

interface BackgroundStar {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  phase: number;
}

const starData = [
  {
    label: "Consciousness",
    quote: '"I think, therefore I am." — Descartes',
  },
  {
    label: "Ethics",
    quote: '"The unexamined life is not worth living." — Socrates',
  },
  {
    label: "Knowledge",
    quote: '"I know that I know nothing." — Socrates',
  },
  {
    label: "Freedom",
    quote: '"Man is condemned to be free." — Sartre',
  },
  {
    label: "Reality",
    quote: '"We are what we repeatedly do." — Aristotle',
  },
  {
    label: "Purpose",
    quote: '"He who has a why can bear any how." — Nietzsche',
  },
];

export function StarGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const bgStarsRef = useRef<BackgroundStar[]>([]);
  const hoveredRef = useRef<number>(-1);
  const mouseRef = useRef({ x: 0, y: 0 });
  const tooltipOpacityRef = useRef<number[]>([]);

  const initializeData = useCallback((width: number, height: number) => {
    const cx = width / 2;
    const cy = height / 2;
    const spread = Math.min(width, height) * 0.42;

    const stars: Star[] = [
      {
        x: cx,
        y: cy,
        baseRadius: 5,
        label: "You",
        quote: '"The only true wisdom is knowing you know nothing." — Socrates',
        phase: 0,
      },
      ...starData.map((data, i) => {
        const angle = (i / starData.length) * Math.PI * 2 - Math.PI / 2;
        const dist = spread * (0.7 + Math.random() * 0.3);
        return {
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          baseRadius: 2.5 + Math.random() * 2,
          label: data.label,
          quote: data.quote,
          phase: Math.random() * Math.PI * 2,
        };
      }),
    ];

    const connections: Connection[] = starData.map((_, i) => ({
      from: 0,
      to: i + 1,
      particleProgress: Math.random(),
      particleSpeed: 0.0015 + Math.random() * 0.0025,
    }));

    connections.push(
      { from: 1, to: 3, particleProgress: Math.random(), particleSpeed: 0.002 },
      { from: 2, to: 5, particleProgress: Math.random(), particleSpeed: 0.0018 },
      { from: 4, to: 6, particleProgress: Math.random(), particleSpeed: 0.0022 }
    );

    const bgStars: BackgroundStar[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.3 + Math.random() * 0.7,
      opacity: 0.1 + Math.random() * 0.25,
      twinkleSpeed: 0.001 + Math.random() * 0.003,
      phase: Math.random() * Math.PI * 2,
    }));

    starsRef.current = stars;
    connectionsRef.current = connections;
    bgStarsRef.current = bgStars;
    tooltipOpacityRef.current = new Array(stars.length).fill(0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initializeData(w, h);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      const stars = starsRef.current;
      let found = -1;
      for (let i = 0; i < stars.length; i++) {
        const dx = mouseRef.current.x - stars[i].x;
        const dy = mouseRef.current.y - stars[i].y;
        if (Math.sqrt(dx * dx + dy * dy) < 30) {
          found = i;
          break;
        }
      }
      hoveredRef.current = found;
      canvas.style.cursor = found >= 0 ? "pointer" : "default";
    };

    const onMouseLeave = () => {
      hoveredRef.current = -1;
      canvas.style.cursor = "default";
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const drawTooltip = (
      star: Star,
      opacity: number
    ) => {
      if (opacity <= 0.01) return;

      ctx.save();
      ctx.globalAlpha = opacity;

      const padding = 12;
      const maxWidth = 220;
      const lineHeight = 15;

      ctx.font = "11px var(--font-geist-sans), system-ui, sans-serif";

      // Word-wrap the quote
      const words = star.quote.split(" ");
      const lines: string[] = [];
      let currentLine = "";
      for (const word of words) {
        const test = currentLine ? `${currentLine} ${word}` : word;
        if (ctx.measureText(test).width > maxWidth - padding * 2) {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = test;
        }
      }
      if (currentLine) lines.push(currentLine);

      const boxW = maxWidth;
      const boxH = lines.length * lineHeight + padding * 2;
      const boxX = star.x - boxW / 2;
      const boxY = star.y - star.baseRadius * 3 - boxH - 8;

      // Box background
      ctx.fillStyle = "rgba(0, 0, 0, 0.92)";
      const r = 8;
      ctx.beginPath();
      ctx.moveTo(boxX + r, boxY);
      ctx.lineTo(boxX + boxW - r, boxY);
      ctx.quadraticCurveTo(boxX + boxW, boxY, boxX + boxW, boxY + r);
      ctx.lineTo(boxX + boxW, boxY + boxH - r);
      ctx.quadraticCurveTo(boxX + boxW, boxY + boxH, boxX + boxW - r, boxY + boxH);
      ctx.lineTo(boxX + r, boxY + boxH);
      ctx.quadraticCurveTo(boxX, boxY + boxH, boxX, boxY + boxH - r);
      ctx.lineTo(boxX, boxY + r);
      ctx.quadraticCurveTo(boxX, boxY, boxX + r, boxY);
      ctx.closePath();
      ctx.fill();

      // Border
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Arrow
      ctx.beginPath();
      ctx.moveTo(star.x - 6, boxY + boxH);
      ctx.lineTo(star.x, boxY + boxH + 6);
      ctx.lineTo(star.x + 6, boxY + boxH);
      ctx.fillStyle = "rgba(0, 0, 0, 0.92)";
      ctx.fill();

      // Text
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.textAlign = "left";
      for (let l = 0; l < lines.length; l++) {
        ctx.fillText(lines[l], boxX + padding, boxY + padding + 10 + l * lineHeight);
      }

      ctx.restore();
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const now = Date.now();

      ctx.clearRect(0, 0, w, h);

      const stars = starsRef.current;
      const connections = connectionsRef.current;
      const bgStars = bgStarsRef.current;
      const tooltipOpacity = tooltipOpacityRef.current;

      // Background stars
      for (const bg of bgStars) {
        const twinkle = bg.opacity + Math.sin(now * bg.twinkleSpeed + bg.phase) * 0.12;
        ctx.beginPath();
        ctx.arc(bg.x, bg.y, bg.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.04, twinkle)})`;
        ctx.fill();
      }

      // Connections
      for (const conn of connections) {
        const from = stars[conn.from];
        const to = stars[conn.to];
        if (!from || !to) continue;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.lineWidth = 0.7;
        ctx.stroke();

        conn.particleProgress = (conn.particleProgress + conn.particleSpeed) % 1;
        const px = from.x + (to.x - from.x) * conn.particleProgress;
        const py = from.y + (to.y - from.y) * conn.particleProgress;

        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.65)";
        ctx.fill();

        const grad = ctx.createRadialGradient(px, py, 0, px, py, 8);
        grad.addColorStop(0, "rgba(255,255,255,0.25)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Stars + labels
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const pulse = 1 + Math.sin(now * 0.002 + star.phase) * 0.15;
        const r = star.baseRadius * pulse;
        const isHovered = hoveredRef.current === i;

        // Animate tooltip opacity
        const target = isHovered ? 1 : 0;
        tooltipOpacity[i] += (target - tooltipOpacity[i]) * 0.12;

        // Glow (brighter when hovered)
        const glowMultiplier = isHovered ? 1.6 : 1;
        const glowRadius = r * (i === 0 ? 10 : 6) * glowMultiplier;
        const glow = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, glowRadius
        );
        glow.addColorStop(0, `rgba(255,255,255,${(i === 0 ? 0.4 : 0.25) * glowMultiplier})`);
        glow.addColorStop(0.5, "rgba(255,255,255,0.06)");
        glow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(star.x, star.y, r * (isHovered ? 1.3 : 1), 0, Math.PI * 2);
        ctx.fillStyle = i === 0 ? "#ffffff" : "rgba(255,255,255,0.9)";
        ctx.fill();

        // Label
        ctx.font = `${isHovered ? "600 11px" : "10px"} var(--font-geist-sans), system-ui, sans-serif`;
        ctx.fillStyle = `rgba(255,255,255,${isHovered ? 0.7 : 0.35})`;
        ctx.textAlign = "center";
        ctx.fillText(star.label, star.x, star.y + r + 18);
      }

      // Tooltips (draw on top)
      for (let i = 0; i < stars.length; i++) {
        if (tooltipOpacity[i] > 0.01) {
          drawTooltip(stars[i], tooltipOpacity[i]);
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initializeData]);

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
