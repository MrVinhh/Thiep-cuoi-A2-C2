'use client';
import { useEffect, useRef } from 'react';

export default function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const COLORS = ['#e8d5a0','#d4bc80','#c9a254','#f0e4b8','#ddd0a0'];
    let W = 0, H = 0, raf: number;

    function resize() {
      W = Math.min(480, window.innerWidth);
      H = window.innerHeight;
      canvas!.width = W;
      canvas!.height = H;
    }
    resize();
    window.addEventListener('resize', resize);

    class Petal {
      x = 0; y = 0; r = 0; rot = 0; rotSpeed = 0;
      vy = 0; vx = 0; alpha = 0; color = '';
      swing = 0; swingSpeed = 0; swingAmp = 0;

      constructor() { this.reset(true); }

      reset(init: boolean) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * -H : -20;
        this.r = 3 + Math.random() * 5;
        this.rot = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.04;
        this.vy = 0.6 + Math.random() * 0.8;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.alpha = 0.4 + Math.random() * 0.5;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.swing = Math.random() * Math.PI * 2;
        this.swingSpeed = 0.02 + Math.random() * 0.02;
        this.swingAmp = 0.5 + Math.random() * 1;
      }

      update() {
        this.swing += this.swingSpeed;
        this.x += this.vx + Math.sin(this.swing) * this.swingAmp;
        this.y += this.vy;
        this.rot += this.rotSpeed;
        if (this.y > H + 20) this.reset(false);
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.r, this.r * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const petals = Array.from({ length: 28 }, () => new Petal());

    function loop() {
      ctx.clearRect(0, 0, W, H);
      petals.forEach(p => { p.update(); p.draw(); });
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="petal-canvas" />;
}
