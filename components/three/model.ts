/**
 * 3D model seçimi: hero ve sayfa koşucusu aynı dosyayı kullanır (tarayıcı önbelleğinden gelir).
 * - full: masaüstü (5,6 MB)  - lite: mobil / yavaş bağlantı / düşük bellek (2,8 MB)
 * - fallback: WebGL yok veya veri tasarrufu açık → 3D yüklenmez
 */
export type Mode = "pending" | "full" | "lite" | "fallback";

export function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function pickMode(): Mode {
  if (!hasWebGL()) return "fallback";
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (conn?.saveData) return "fallback";
  const slow = conn?.effectiveType && ["slow-2g", "2g", "3g"].includes(conn.effectiveType);
  const small = window.matchMedia("(max-width: 767px)").matches;
  const lowMem = ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) < 4;
  return slow || small || lowMem ? "lite" : "full";
}

export const modelUrl = (mode: Mode) => (mode === "lite" ? "/models/komodo-lite.glb" : "/models/komodo.glb");
