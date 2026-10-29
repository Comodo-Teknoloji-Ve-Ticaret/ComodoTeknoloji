"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    clarity?: (...args: unknown[]) => void;
  }
}

export const CONSENT_KEY = "kvkk-consent-v1";
export type Consent = { analytics: boolean; date: string };

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function writeConsent(c: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
  } catch {
    /* gizli mod vb. — onay yalnızca bu oturum için geçerli kalır */
  }
  window.dispatchEvent(new CustomEvent("consent-change", { detail: c }));
}

/** GA4 olayı gönderir; analitik onayı yoksa veya script yüklenmediyse sessizce geçer */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}
