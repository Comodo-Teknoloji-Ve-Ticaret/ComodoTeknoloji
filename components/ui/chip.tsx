"use client";

import { cn } from "@/lib/utils";

/** Serbest metin yerine seçim çipleri (radio veya checkbox davranışı) */
export function ChipGroup<T extends string>({
  name,
  options,
  value,
  onChange,
  multiple = false,
  label,
  error,
}: {
  name: string;
  options: readonly { value: T; label: string }[];
  value: T | T[] | undefined;
  onChange: (v: T | T[]) => void;
  multiple?: boolean;
  label: string;
  error?: string;
}) {
  const isSelected = (v: T) => (Array.isArray(value) ? value.includes(v) : value === v);
  return (
    <fieldset aria-invalid={!!error}>
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2" role={multiple ? "group" : "radiogroup"}>
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              "cursor-pointer select-none rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
              isSelected(o.value) ? "border-accent bg-accent/15 text-fg" : "border-border text-muted hover:text-fg",
            )}
          >
            <input
              type={multiple ? "checkbox" : "radio"}
              name={name}
              value={o.value}
              checked={isSelected(o.value)}
              className="sr-only"
              onChange={() => {
                if (!multiple) return onChange(o.value);
                const arr = Array.isArray(value) ? value : [];
                onChange(arr.includes(o.value) ? arr.filter((x) => x !== o.value) : [...arr, o.value]);
              }}
            />
            {o.label}
          </label>
        ))}
      </div>
      {error && <p className="mt-1.5 text-sm text-danger">{error}</p>}
    </fieldset>
  );
}
