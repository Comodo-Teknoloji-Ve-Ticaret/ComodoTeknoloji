"use client";

import { useEffect, useRef } from "react";

/**
 * Hero arka planı: fareye tepki veren canlı ağ topolojisi (2D canvas).
 * - Düğümler yavaşça süzülür, yakın düğümler arasında bağlantı çizgileri oluşur
 * - İmleç yaklaşınca düğümler imlece bağlanır ve hafifçe çekilir
 * - Fare hareketi kıvılcım izi bırakır; basılı tutup sürükleyince düğümler itilir
 * - Tıklama, dışa yayılan bir sinyal dalgası üretir
 * Ekran dışında ve sekme gizliyken durur; "hareketi azalt" tercihinde tek kare statik çizilir.
 */
type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Spark = { x: number; y: number; vx: number; vy: number; life: number };
type Ripple = { x: number; y: number; r: number; life: number };

const LINK = 140;
const MOUSE_LINK = 190;

export default function InteractiveNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    const sparks: Spark[] = [];
    const ripples: Ripple[] = [];
    const mouse = { x: -9999, y: -9999, inside: false, down: false, lx: 0, ly: 0 };
    let colors = { p: "#f7931e", a: "#ffc23d" };
    let raf = 0;
    let running = false;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = { p: cs.getPropertyValue("--primary").trim() || colors.p, a: cs.getPropertyValue("--accent").trim() || colors.a };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(28, Math.min(95, Math.round((w * h) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.2 + Math.random() * 1.8,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Düğüm–düğüm bağlantıları
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.p;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          ctx.globalAlpha = (1 - Math.sqrt(d2) / LINK) * 0.28;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      // İmleç bağlantıları
      if (mouse.inside) {
        ctx.strokeStyle = colors.a;
        ctx.lineWidth = 1.2;
        for (const n of nodes) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d > MOUSE_LINK) continue;
          ctx.globalAlpha = (1 - d / MOUSE_LINK) * 0.75;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      // Düğümler
      for (const n of nodes) {
        const near = mouse.inside && Math.hypot(n.x - mouse.x, n.y - mouse.y) < MOUSE_LINK;
        ctx.globalAlpha = near ? 0.95 : 0.55;
        ctx.fillStyle = near ? colors.a : colors.p;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r + 1 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // Kıvılcımlar
      ctx.fillStyle = colors.a;
      for (const s of sparks) {
        ctx.globalAlpha = Math.max(0, s.life) * 0.9;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.6 * s.life + 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      // Sinyal dalgaları
      ctx.strokeStyle = colors.a;
      for (const r of ripples) {
        ctx.globalAlpha = Math.max(0, r.life) * 0.6;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const update = () => {
      for (const n of nodes) {
        if (mouse.inside) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy) || 1;
          if (mouse.down && d < 230) {
            // Sürüklerken it
            n.vx -= (dx / d) * 0.5;
            n.vy -= (dy / d) * 0.5;
          } else if (d < MOUSE_LINK) {
            // Yaklaşınca hafifçe çek
            n.vx += (dx / d) * 0.012;
            n.vy += (dy / d) * 0.012;
          }
        }
        // Dalga itmesi
        for (const r of ripples) {
          const d = Math.hypot(n.x - r.x, n.y - r.y);
          if (Math.abs(d - r.r) < 18) {
            n.vx += ((n.x - r.x) / (d || 1)) * 0.35 * r.life;
            n.vy += ((n.y - r.y) / (d || 1)) * 0.35 * r.life;
          }
        }
        n.vx *= 0.975;
        n.vy *= 0.975;
        // Taban süzülme hızı
        const sp = Math.hypot(n.vx, n.vy);
        if (sp < 0.12) {
          n.vx += (Math.random() - 0.5) * 0.04;
          n.vy += (Math.random() - 0.5) * 0.04;
        }
        if (sp > 4) {
          n.vx = (n.vx / sp) * 4;
          n.vy = (n.vy / sp) * 4;
        }
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.life -= 0.022;
        if (s.life <= 0) sparks.splice(i, 1);
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += 6;
        r.life -= 0.018;
        if (r.life <= 0) ripples.splice(i, 1);
      }
    };

    const loop = () => {
      update();
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const toLocal = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top, inside: e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom };
    };
    const onMove = (e: PointerEvent) => {
      const p = toLocal(e);
      mouse.inside = p.inside;
      if (!p.inside) return;
      const moved = Math.hypot(p.x - mouse.lx, p.y - mouse.ly);
      mouse.x = p.x;
      mouse.y = p.y;
      if (moved > 7 && sparks.length < 160) {
        const n = mouse.down ? 4 : 1;
        for (let i = 0; i < n; i++) {
          sparks.push({
            x: p.x,
            y: p.y,
            vx: (Math.random() - 0.5) * (mouse.down ? 3 : 1.2),
            vy: (Math.random() - 0.5) * (mouse.down ? 3 : 1.2),
            life: 1,
          });
        }
        mouse.lx = p.x;
        mouse.ly = p.y;
      }
    };
    const onDown = (e: PointerEvent) => {
      const p = toLocal(e);
      if (!p.inside) return;
      mouse.down = true;
      ripples.push({ x: p.x, y: p.y, r: 4, life: 1 });
    };
    const onUp = () => (mouse.down = false);
    const onLeave = () => (mouse.inside = false);

    readColors();
    resize();
    draw();
    if (reduce) return;

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()), { threshold: 0 });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
