'use client';
import { useEffect, useRef } from 'react';

const COLORS = ['#f0c88a','#ffffff','#ffdf9e','#e8a0a0','#fff0d0','#ffd700','#ff9999','#ffe4b5'];

interface Piece {
  x: number; y: number;
  vx: number; vy: number;
  rot: number; rotV: number;
  w: number; h: number;
  color: string;
  alpha: number;
  shape: 'rect' | 'circle';
}

function launch(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  const W = canvas.width;
  const H = canvas.height;
  const pieces: Piece[] = [];

  // Burst from two bottom corners + center bottom
  const origins = [W * 0.2, W * 0.5, W * 0.8];
  origins.forEach(ox => {
    for (let i = 0; i < 40; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
      const speed = 4 + Math.random() * 7;
      pieces.push({
        x: ox, y: H,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.18,
        w: 5 + Math.random() * 6,
        h: 3 + Math.random() * 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 1,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      });
    }
  });

  let raf: number;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    let alive = false;
    pieces.forEach(p => {
      p.vy += 0.18;           // gravity
      p.x  += p.vx;
      p.y  += p.vy;
      p.rot += p.rotV;
      p.alpha -= 0.012;
      if (p.alpha <= 0) return;
      alive = true;
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
    });
    if (alive) raf = requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, W, H);
  }
  raf = requestAnimationFrame(draw);
  return () => cancelAnimationFrame(raf);
}

export default function ConfettiEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firedRef  = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width  = rect.width;
      canvas.height = rect.height;
    }
    resize();

    let timer: ReturnType<typeof setTimeout>;

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          resize();
          launch(canvas);
          // Re-fire after 1.8s for a double burst
          timer = setTimeout(() => { resize(); launch(canvas); }, 1800);
          io.disconnect();
        }
      });
    }, { threshold: 0.3 });

    io.observe(canvas.parentElement!);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 5,
      }}
    />
  );
}
