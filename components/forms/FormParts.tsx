"use client";

import { Lock } from "lucide-react";
import Link from "next/link";
import { forwardRef } from "react";
import { site } from "@/lib/site";

export function FieldError({ message, id }: { message?: string; id?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-danger">
      {message}
    </p>
  );
}

/** KVKK onay kutusu — önceden işaretli DEĞİL */
export const KvkkCheckbox = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { error?: string }>(
  ({ error, id = "kvkk", ...props }, ref) => (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-muted">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={!!error}
          className="mt-0.5 size-4.5 shrink-0 cursor-pointer accent-[var(--primary)]"
          {...props}
        />
        <span>
          <Link href="/kvkk" target="_blank" className="text-accent underline underline-offset-2">
            KVKK Aydınlatma Metni
          </Link>
          &apos;ni okudum; bilgilerimin talebime dönüş yapılması amacıyla işlenmesini kabul ediyorum.
        </span>
      </label>
      <FieldError message={error} />
    </div>
  ),
);
KvkkCheckbox.displayName = "KvkkCheckbox";

/** Honeypot alanı: ekran okuyuculardan ve görünümden gizli */
export const Honeypot = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
    <label>
      Web sitesi
      <input ref={ref} type="text" tabIndex={-1} autoComplete="off" {...props} />
    </label>
  </div>
));
Honeypot.displayName = "Honeypot";

export function TrustNote() {
  return (
    <p className="flex items-center gap-2 text-xs text-muted">
      <Lock className="size-3.5 shrink-0" aria-hidden />
      {site.responseTimeText} · Bilgileriniz KVKK kapsamında korunur
    </p>
  );
}
