import Image from "next/image";

/**
 * Comodo logosu + marka efektleri (saf CSS; sunucu bileşeni, hidrasyon beklemeden oynar):
 * - Logonun üzerinden periyodik ışık geçer (logo şekliyle maskelenmiş)
 * - Komodonun gözünde nabız gibi atan kırmızı ışık
 * Göz koordinatları kaynak logonun 500×500 piksel düzlemine göredir.
 */
export function ComodoLogo({
  size = 112,
  fluid = false,
  shine = true,
  eye = true,
  slow = false,
  priority = false,
  className = "",
}: {
  size?: number;
  /** true: genişlik className ile belirlenir (kare oran korunur) */
  fluid?: boolean;
  shine?: boolean;
  eye?: boolean;
  /** Header gibi küçük ve sürekli görünen yerlerde daha seyrek ışık */
  slow?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const src = !fluid && size <= 64 ? "/logo-96.webp" : "/logo-512.webp";
  return (
    <span
      className={`comodo-logo relative inline-block shrink-0 ${fluid ? "aspect-square" : ""} ${className}`}
      style={fluid ? undefined : { width: size, height: size }}
    >
      <Image src={src} alt="" width={fluid ? 512 : size} height={fluid ? 512 : size} priority={priority} className="size-full select-none" draggable={false} />
      {shine && (
        <span aria-hidden className={`comodo-shine ${slow ? "comodo-shine-slow" : ""}`}>
          <span />
        </span>
      )}
      {eye && (
        <svg aria-hidden viewBox="0 0 500 500" className="pointer-events-none absolute inset-0 size-full overflow-visible">
          <defs>
            <radialGradient id="comodo-eye-halo">
              <stop offset="0" stopColor="#ff2d2d" stopOpacity="0.95" />
              <stop offset="0.45" stopColor="#ff2d2d" stopOpacity="0.35" />
              <stop offset="1" stopColor="#ff2d2d" stopOpacity="0" />
            </radialGradient>
            <filter id="comodo-eye-blur" x="-100%" y="-300%" width="300%" height="700%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          <circle className="comodo-eye-halo" cx="218.5" cy="160.5" r="34" fill="url(#comodo-eye-halo)" />
          <polygon className="comodo-eye" points="203.5,165 211.5,156.5 233.5,156.5 225.5,165" fill="#ff5a4f" filter="url(#comodo-eye-blur)" />
          <polygon className="comodo-eye" points="205,164 212.5,157.5 231.5,157.5 224.5,164" fill="#ff1f1f" />
          <circle className="comodo-eye-spark" cx="214" cy="159" r="1.6" fill="#fff" />
        </svg>
      )}
    </span>
  );
}
