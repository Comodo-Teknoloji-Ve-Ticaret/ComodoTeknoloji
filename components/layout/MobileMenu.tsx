"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/lib/nav";
import { site, telLink, whatsappLink } from "@/lib/site";

/** Spring ile açılan tam ekran mobil menü. Radix Dialog odak kilidi ve ESC desteği sağlar. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" aria-label="Menüyü aç" className="grid size-10 place-items-center rounded-xl hover:bg-surface-2 lg:hidden">
          <Menu className="size-5" />
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content forceMount asChild aria-describedby={undefined}>
              <m.div
                className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-bg/95 backdrop-blur-xl lg:hidden"
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              >
                <Dialog.Title className="sr-only">Site menüsü</Dialog.Title>
                <div className="container-page flex h-16 items-center justify-between">
                  <span className="font-bold">{site.name}</span>
                  <Dialog.Close asChild>
                    <button type="button" aria-label="Menüyü kapat" className="grid size-10 place-items-center rounded-xl hover:bg-surface-2">
                      <X className="size-5" />
                    </button>
                  </Dialog.Close>
                </div>
                <nav aria-label="Mobil menü" className="container-page flex-1 pb-8">
                  <m.ul
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
                    className="space-y-6 pt-4"
                  >
                    {mainNav.map((item) => (
                      <m.li
                        key={item.label}
                        variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 26 } } }}
                      >
                        <Link href={item.href} className="text-2xl font-bold">
                          {item.label}
                        </Link>
                        {item.children && (
                          <ul className="mt-2 grid gap-1 border-l border-border pl-4">
                            {item.children.map((c) => (
                              <li key={c.href}>
                                <Link href={c.href} className="block py-1.5 text-muted hover:text-fg">
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </m.li>
                    ))}
                  </m.ul>
                  <div className="mt-10 grid gap-3">
                    <Button asChild size="lg">
                      <Link href="/ucretsiz-kesif">Ücretsiz Keşif Planla</Link>
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button asChild variant="whatsapp">
                        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                          <MessageCircle /> WhatsApp
                        </a>
                      </Button>
                      <Button asChild variant="outline">
                        <a href={telLink()}>
                          <Phone /> Ara
                        </a>
                      </Button>
                    </div>
                  </div>
                </nav>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
