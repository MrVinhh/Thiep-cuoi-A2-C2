'use client';
import { useEffect } from 'react';

export default function ClientEffects() {
  useEffect(() => {
    // ── Scroll Reveal ──
    const revealMap: [string, string, string][] = [
      ['#save-the-date .monogram',        '',           ''],
      ['#save-the-date .std-subtext',     '',           'delay-1'],
      ['#save-the-date .std-separator',   '',           'delay-2'],
      ['#save-the-date .std-title-row',   '',           'delay-2'],
      ['#save-the-date .std-date',        '',           'delay-3'],
      ['#save-the-date .polaroid-grid',    'from-scale', 'delay-2'],
      ['#save-the-date .direction-btn',   '',           'delay-3'],
      ['#invitation .inv-tagline',        '',           'delay-1'],
      ['#invitation .inv-parents',        '',           'delay-2'],
      ['#invitation .inv-tagline-sub',    'from-scale', 'delay-2'],
      ['#invitation .inv-couple',         'from-scale', 'delay-3'],
      ['#invitation .inv-details-box',    '',           'delay-4'],
      ['#invitation .venue-name',         '',           'delay-4'],
      ['#invitation .venue-addr',         '',           'delay-5'],
      ['#couple .couple-message',         '',           'delay-1'],
      ['#couple .cn-name:first-of-type',  'from-left',  'delay-1'],
      ['#couple .cn-and-row',             '',           'delay-2'],
      ['#couple .cn-name:last-of-type',   'from-right', 'delay-3'],
      ['#timeline .section-label',        '',           ''],
      ['#timeline .section-title',        '',           'delay-1'],
      ['#timeline .section-script',       'from-scale', 'delay-2'],
      ['#timeline .tl-item:nth-child(1)', 'from-left',  'delay-1'],
      ['#timeline .tl-item:nth-child(2)', 'from-right', 'delay-2'],
      ['#timeline .tl-item:nth-child(3)', 'from-left',  'delay-3'],
      ['#timeline .tl-item:nth-child(4)', 'from-right', 'delay-4'],
      ['#album .album-title',             '',           ''],
      ['#album .album-love',              'from-scale', 'delay-1'],
      ['#album .album-grid',              '',           'delay-2'],
      ['#album .album-strip',             '',           'delay-3'],
      ['#countdown .countdown-script',    'from-scale', ''],
      ['#countdown .countdown-grid',      '',           'delay-1'],
      ['#thankyou .ty-script',            'from-scale', 'delay-1'],
      ['#thankyou .ty-text',              '',           'delay-2'],
      ['#thankyou .ty-heart',             '',           'delay-3'],
    ];

    revealMap.forEach(([sel, extra, delay]) => {
      const el = document.querySelector(sel);
      if (!el) return;
      el.classList.add('reveal');
      if (extra) el.classList.add(extra);
      if (delay) el.classList.add(delay);
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // ── Sparkle on click ──
    function onClickSparkle(e: MouseEvent) {
      for (let i = 0; i < 6; i++) {
        const dot = document.createElement('div');
        dot.className = 'sparkle-dot';
        const angle = (i / 6) * Math.PI * 2;
        const dist  = 16 + Math.random() * 16;
        dot.style.left = (e.clientX + Math.cos(angle) * dist - 5) + 'px';
        dot.style.top  = (e.clientY + Math.sin(angle) * dist - 5) + 'px';
        document.body.appendChild(dot);
        setTimeout(() => dot.remove(), 800);
      }
    }
    document.addEventListener('click', onClickSparkle);

    // ── Parallax (target hero img-box only; couple uses .couple-bg) ──
    const parallaxTargets = Array.from(
      document.querySelectorAll<HTMLElement>('#hero .img-box')
    );

    function onScroll() {
      parallaxTargets.forEach(el => {
        const rect = el.getBoundingClientRect();
        const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.1;
        el.style.transform = `translateY(${offset}px)`;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Polaroid 3D tilt ──
    const polaroids = Array.from(document.querySelectorAll<HTMLElement>('.polaroid'));
    function tiltHandler(this: HTMLElement, e: MouseEvent) {
      const rect = this.getBoundingClientRect();
      const rx = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
      const ry = (0.5 - (e.clientX - rect.left) / rect.width) * 16;
      this.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;
    }
    function tiltLeave(this: HTMLElement) { this.style.transform = ''; }
    polaroids.forEach(p => {
      p.addEventListener('mousemove', tiltHandler);
      p.addEventListener('mouseleave', tiltLeave);
    });

    // ── Divider line grow ──
    const lineIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.transform = 'scaleX(1)';
          lineIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll<HTMLElement>('.divider-line, .std-separator, .inv-divider').forEach(el => {
      el.style.transformOrigin = 'center';
      el.style.transform = 'scaleX(0)';
      el.style.transition = 'transform 0.8s cubic-bezier(.4,0,.2,1)';
      lineIO.observe(el);
    });

    return () => {
      document.removeEventListener('click', onClickSparkle);
      window.removeEventListener('scroll', onScroll);
      polaroids.forEach(p => {
        p.removeEventListener('mousemove', tiltHandler);
        p.removeEventListener('mouseleave', tiltLeave);
      });
      io.disconnect();
      lineIO.disconnect();
    };
  }, []);

  return null;
}
