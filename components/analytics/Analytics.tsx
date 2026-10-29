"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { readConsent, type Consent } from "./track";

/** GA4 ölçüm kimliği (herkese açık bir değerdir); ortam değişkeniyle ezilebilir */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-7JHZ442CKR";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

/**
 * GA4 ve Microsoft Clarity yalnızca KVKK çerez onayı verildikten sonra yüklenir.
 * Google'ın verdiği gtag.js kodunun karşılığıdır; <head>'e doğrudan yapıştırmak onaysız yükleme yapacağı için burada.
 */
export function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(!!readConsent()?.analytics);
    const onChange = (e: Event) => setAllowed(!!(e as CustomEvent<Consent>).detail?.analytics);
    window.addEventListener("consent-change", onChange);
    return () => window.removeEventListener("consent-change", onChange);
  }, []);

  if (!allowed) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
          <Script id="ga4" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {CLARITY_ID && (
        <Script id="clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}
    </>
  );
}
