"use client";

import { useEffect } from "react";
import { ComodoLogo } from "./ComodoLogo";

const BRAND = "COMODO TEKNOLOJİ";

/**
 * Giriş animasyonu (yalnızca ana sayfada, oturum başına bir kez).
 * - Görünürlüğü <head>'deki satır içi script belirler (html[data-intro]); JS yoksa hiç görünmez.
 * - İçerik animasyonları saf CSS'tir, hidrasyonu beklemeden oynar.
 * - Hidrasyon olmazsa CSS failsafe 3,2 sn sonra perdeyi kaldırır.
 * - "Hareketi azalt" tercihinde script perdeyi hiç açmaz.
 */
export function IntroCurtain() {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.dataset.intro) return;
    const exit = setTimeout(() => html.classList.add("intro-exit"), 1500);
    const done = setTimeout(() => {
      delete html.dataset.intro;
      html.classList.remove("intro-exit");
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {
        /* gizli mod */
      }
    }, 2350);
    return () => {
      clearTimeout(exit);
      clearTimeout(done);
    };
  }, []);

  return (
    <div className="intro-curtain" aria-hidden>
      <div className="intro-half intro-top" />
      <div className="intro-half intro-bottom" />
      <div className="intro-scan" />
      <div className="intro-center">
        <div className="intro-logo">
          <svg className="intro-ring" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="92" fill="none" stroke="#F7931E" strokeWidth="1.5" strokeDasharray="4 10" opacity="0.7" />
            <path d="M100 14 A86 86 0 0 1 186 100" fill="none" stroke="#FFC23D" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <ComodoLogo size={112} priority />
        </div>
        <p className="intro-brand">
          {BRAND.split("").map((c, i) => (
            <span key={i} className="intro-letter" style={{ "--i": i } as React.CSSProperties}>
              {c === " " ? " " : c}
            </span>
          ))}
        </p>
        <p className="intro-tagline">Bekçi nöbete başlıyor…</p>
        <div className="intro-bar">
          <span />
        </div>
      </div>
    </div>
  );
}

/** <head> içine basılan, perdeyi boyamadan önce açan satır içi script */
export const introScript = `try{var d=document.documentElement;if(location.pathname==="/"&&!sessionStorage.getItem("intro-seen")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="1"}}catch(e){}`;
