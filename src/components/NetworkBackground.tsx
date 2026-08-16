"use client";

import { useEffect, useRef } from "react";

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const c: HTMLCanvasElement = canvas;
    const context: CanvasRenderingContext2D = ctx;

    let animationId: number;
    let width = (c.width = window.innerWidth);
    let height = (c.height = window.innerHeight);

    const NUM_POINTS = 70;
    const MAX_DIST = 140;

    type Point = { x: number; y: number; vx: number; vy: number };
    const points: Point[] = Array.from({ length: NUM_POINTS }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    function resize() {
      width = c.width = window.innerWidth;
      height = c.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);

    function draw() {
      context.clearRect(0, 0, width, height);

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            context.strokeStyle = `rgba(16, 185, 129, ${1 - dist / MAX_DIST})`;
            context.lineWidth = 0.6;
            context.beginPath();
            context.moveTo(points[i].x, points[i].y);
            context.lineTo(points[j].x, points[j].y);
            context.stroke();
          }
        }
      }

      for (const p of points) {
        context.fillStyle = "rgba(59, 130, 246, 0.8)";
        context.beginPath();
        context.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        context.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
    />
  );
}