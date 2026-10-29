"use client";

import { ChevronDown, Phone } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/lib/nav";
import { site, telLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background,border-color] duration-300",
        scrolled ? "border-border bg-bg/85 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = pathname.startsWith(item.href.split("/").slice(0, 2).join("/")) && item.href !== "/";
              return (
                <li key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-1 rounded-lg px-3 py-2 text-[0.92rem] font-medium transition-colors hover:text-fg",
                      active ? "text-fg" : "text-muted",
                    )}
                  >
                    {item.label}
                    {item.children && <ChevronDown aria-hidden className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />}
                  </Link>
                  {item.children && (
                    <div className="invisible absolute left-1/2 top-full w-[34rem] -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <ul className="glass grid grid-cols-2 gap-1 rounded-2xl p-2 shadow-2xl">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="block rounded-xl p-3 transition-colors hover:bg-surface-2">
                              <span className="block text-sm font-semibold">{c.label}</span>
                              <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted">{c.description}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a href={telLink()} className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:text-fg xl:flex">
            <Phone className="size-4" aria-hidden />
            {site.phone}
          </a>
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/ucretsiz-kesif">Ücretsiz Keşif</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
