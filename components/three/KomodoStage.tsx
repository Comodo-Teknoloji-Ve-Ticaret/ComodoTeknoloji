"use client";

import { useProgress } from "@react-three/drei";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState } from "react";
import { ComodoLogo } from "@/components/brand/ComodoLogo";
import { modelUrl, pickMode, type Mode } from "./model";

const KomodoScene = dynamic(() => import("./KomodoScene"), { ssr: false });



/** WebGL desteği yoksa veya sahne hata verirse statik göz amblemine düş */
class SceneBoundary extends Component<{ children: React.ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function Loader() {
  const { progress, active } = useProgress();
  return (
    <AnimatePresence>
      {active && (
        <m.div
          className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="glass w-56 rounded-xl px-4 py-3 font-mono text-[11px] text-muted">
            <div className="flex justify-between">
              <span>KOMODO UYANIYOR…</span>
              <span className="tabular-nums text-accent">%{Math.round(progress)}</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-2">
              <m.div className="h-full origin-left bg-gradient-to-r from-primary to-accent" animate={{ scaleX: progress / 100 }} />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

const statusChips = [
  { label: "Web sitesi güvende", dot: "bg-accent" },
  { label: "Kamera kayıtta", dot: "bg-danger" },
  { label: "Ağ izleniyor", dot: "bg-success" },
];

/** Kamera vizörü çerçevesi + durum etiketleri (dekoratif) */
function Hud({ reduce, away }: { reduce: boolean; away: boolean }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("tr-TR", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const corner = "absolute size-6 border-accent/70";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:text-[11px]">
      <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
      <div className="absolute left-4 top-3 flex items-center gap-2">
        <m.span className="size-2 rounded-full bg-danger" animate={reduce ? undefined : { opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
        CAM-01 ·{" "}
        {away ? <span className="text-amber">HEDEF KADRAJ DIŞI</span> : "CANLI"}
      </div>
      <div className="absolute right-4 top-3 tabular-nums">{time}</div>
      <div className="absolute left-4 top-8 hidden text-accent/80 sm:block">Varanus komodoensis · Nöbette</div>
      <ul className="absolute bottom-3 right-3 hidden flex-wrap justify-end gap-2 sm:flex">
        {statusChips.map((c, i) => (
          <m.li
            key={c.label}
            className="glass flex items-center gap-2 rounded-lg px-2.5 py-1.5 normal-case tracking-normal text-fg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={`size-1.5 rounded-full ${c.dot}`} /> {c.label}
          </m.li>
        ))}
      </ul>
    </div>
  );
}

export function KomodoStage() {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const drag = useRef({ offset: 0, velocity: 0, dragging: false });
  const press = useRef<{ x: number; y: number; lastX: number; moved: number } | null>(null);
  const [scanSignal, setScanSignal] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [flash, setFlash] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [away, setAway] = useState(false);
  const reduce = !!useReducedMotion();
  const [mode, setMode] = useState<Mode>("pending");
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);

  // LCP'yi geciktirmemek için model, tarayıcı boşa çıkınca yüklenmeye başlar
  useEffect(() => {
    setFinePointer(matchMedia("(pointer: fine)").matches);
    setMode(pickMode());
    const start = () => setReady(true);
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 1500 });
    else setTimeout(start, 600);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      // Sürükleme: yatay hareket ejderi döndürür, hız bırakınca ataletle sürer
      const p = press.current;
      if (p) {
        const dx = e.clientX - p.lastX;
        p.lastX = e.clientX;
        p.moved += Math.abs(dx);
        if (p.moved > 5) {
          drag.current.dragging = true;
          drag.current.velocity = dx * 0.009;
          drag.current.offset += dx * 0.009;
        }
      }
    };
    const onUp = () => {
      const p = press.current;
      if (!p) return;
      press.current = null;
      setInteracted(true);
      if (p.moved <= 5) {
        // Tıklama: taramayı başlat
        setScanSignal((n) => n + 1);
        setFlash(true);
        setTimeout(() => setFlash(false), 1600);
      }
      drag.current.dragging = false;
    };
    // Kaçış ilerlemesi: sahnenin ortası ekranın ortasını geçince başlar, ~sahne boyu kadar kaydırmada tamamlanır.
    // Mobilde sahne önce görünür, kullanıcı aşağı devam ettikçe komodo kaçar.
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const v = (window.innerHeight * 0.5 - (r.top + r.height * 0.5)) / (r.height * 0.85);
      scroll.current = Math.min(1, Math.max(0, v));
      setAway(scroll.current > 0.6);
    };
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const show3d = ready && (mode === "full" || mode === "lite");

  return (
    <div
      ref={wrap}
      data-cursor={show3d && finePointer && !reduce ? "Sürükle" : undefined}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse" || reduce || !show3d) return;
        press.current = { x: e.clientX, y: e.clientY, lastX: e.clientX, moved: 0 };
        drag.current.velocity = 0;
      }}
      className={`relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-3xl border border-border bg-[radial-gradient(ellipse_at_50%_70%,color-mix(in_srgb,var(--primary)_22%,transparent),transparent_65%)] ${show3d && finePointer && !reduce ? "cursor-grab active:cursor-grabbing" : ""}`}
    >
      <div aria-hidden className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* 3D yüklenene kadar ve yedek durumda: ışıklı Comodo logosu */}
      <AnimatePresence>
        {!show3d && (
          <m.div key="eye" className="absolute inset-0 grid place-items-center" exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5 }}>
            <ComodoLogo fluid className="w-2/5 max-w-56" />
          </m.div>
        )}
      </AnimatePresence>

      {show3d && (
        <SceneBoundary onError={() => setMode("fallback")}>
          <m.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.2 }}>
            <KomodoScene
              url={modelUrl(mode)}
              lite={mode === "lite"}
              reduceMotion={reduce}
              active={inView}
              pointer={pointer}
              scroll={scroll}
              drag={drag}
              scanSignal={scanSignal}
            />
          </m.div>
          <Loader />
        </SceneBoundary>
      )}

      <Hud reduce={reduce} away={away && show3d && !reduce} />

      {/* Etkileşim ipuçları (yalnızca fare kullanan cihazlarda) */}
      <AnimatePresence>
        {show3d && finePointer && !reduce && !interacted && !away && (
          <m.p
            key="hint"
            aria-hidden
            className="glass pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-[11px] text-fg"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: [0, 1, 1, 0.6, 1], y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2.2, duration: 2.4 }}
          >
            ⟲ Sürükleyerek çevirin · Tıklayıp tarayın
          </m.p>
        )}
        {flash && (
          <m.p
            key="flash"
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3.5 py-1.5 font-mono text-[11px] font-semibold text-primary-fg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            ● Tarama başlatıldı — tehdit yok
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
