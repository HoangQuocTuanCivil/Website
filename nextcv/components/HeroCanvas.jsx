"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Canvas animation logic ported from hero-scene.js
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let W, H, stars = [], nebulas = [], shooters = [];

    function resize() {
        const sec = c.parentElement;
        W = c.width  = sec.clientWidth;
        H = c.height = sec.clientHeight;
    }

    function init() {
        stars = [];
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * W, y: Math.random() * H,
                r: Math.random() * 1.3 + 0.25,
                a: Math.random() * Math.PI * 2,
                va: (Math.random() - 0.5) * 0.018,
                vx: (Math.random() - 0.5) * 0.055,
                vy: (Math.random() - 0.5) * 0.055
            });
        }
        nebulas = [];
        for(let i=0; i<3; i++) {
            nebulas.push({
                x: Math.random()*W, y: Math.random()*H,
                r: Math.random()*400 + 200,
                color: i%2===0 ? 'rgba(237,28,36,0.03)' : 'rgba(0,157,1,0.02)',
                vx: (Math.random()-0.5)*0.2, vy: (Math.random()-0.5)*0.2
            });
        }
        shooters = [];
    }

    let rafId;
    function draw() {
        ctx.clearRect(0, 0, W, H);
        
        nebulas.forEach(n => {
            const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
            grd.addColorStop(0, n.color);
            grd.addColorStop(1, 'transparent');
            ctx.fillStyle = grd;
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI*2); ctx.fill();
            n.x += n.vx; n.y += n.vy;
            if (n.x < -n.r) n.x = W + n.r; if (n.x > W + n.r) n.x = -n.r;
            if (n.y < -n.r) n.y = H + n.r; if (n.y > H + n.r) n.y = -n.r;
        });

        stars.forEach(s => {
            s.a += s.va; s.x += s.vx; s.y += s.vy;
            if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
            if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
            ctx.globalAlpha = Math.abs(Math.sin(s.a));
            ctx.fillStyle = 'white';
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill();
        });
        ctx.globalAlpha = 1;

        if (Math.random() < 0.005) {
            shooters.push({ x: Math.random()*W, y: 0, vx: 4+Math.random()*3, vy: 4+Math.random()*3, len: 40+Math.random()*40, life: 1 });
        }
        for(let i=shooters.length-1; i>=0; i--) {
            let sh = shooters[i];
            ctx.beginPath();
            ctx.moveTo(sh.x, sh.y);
            ctx.lineTo(sh.x - sh.vx*sh.len*0.1, sh.y - sh.vy*sh.len*0.1);
            ctx.strokeStyle = 'rgba(255,255,255,' + sh.life + ')';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            sh.x += sh.vx; sh.y += sh.vy;
            sh.life -= 0.015;
            if (sh.life <= 0) shooters.splice(i, 1);
        }

        rafId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="hero-section">
      <canvas id="heroCosmosCanvas" ref={canvasRef}></canvas>
      <div className="container hero-container view-3d">
        <div className="hero-content float-box" style={{ animationDelay: '0.2s' }}>
          <div className="hero-badge pulse" data-i18n="hero.badge" suppressHydrationWarning>⚡ Kiến tạo Tương lai</div>
          <h1 className="hero-title" data-i18n="hero.title" suppressHydrationWarning>ĐỔI MỚI: SÁNG TẠO, <br /><span className="highlight-green">CÔNG NGHỆ</span></h1>
          <p className="hero-subtitle" data-i18n="hero.subtitle" suppressHydrationWarning>Cung cấp giải pháp số hóa toàn diện và thiết kế đột phá cho tương lai.</p>
          <div className="hero-buttons">
            <Link href="/services" className="btn btn-primary" data-i18n="hero.cta_primary" suppressHydrationWarning>Khám phá</Link>
            <a href="tel:+84399762377" className="btn btn-secondary" data-i18n="hero.cta_secondary" suppressHydrationWarning>Liên hệ ngay</a>
          </div>
        </div>
      </div>
    </section>
  );
}
