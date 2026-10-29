import { products } from "@/data/products";
import { regions } from "@/data/regions";
import { sectors } from "@/data/sectors";
import { solutions } from "@/data/solutions";
import { tools } from "./nav";

/** İç linkleme yardımcıları — yalnızca var olan sayfalara link üretir */
export const solutionLinks = (slugs: string[]) =>
  slugs.flatMap((s) => {
    const x = solutions.find((y) => y.slug === s);
    return x ? [{ label: x.name, href: `/cozumler/${x.slug}`, text: x.excerpt }] : [];
  });

export const sectorLinks = (slugs: string[]) =>
  slugs.flatMap((s) => {
    const x = sectors.find((y) => y.slug === s);
    return x ? [{ label: x.name, href: `/sektorler/${x.slug}` }] : [];
  });

export const regionLinks = (slugs: string[]) =>
  slugs.flatMap((s) => {
    const x = regions.find((y) => y.slug === s);
    return x ? [{ label: x.name, href: `/bolgeler/${x.slug}` }] : [];
  });

export const toolLinks = (slugs: string[]) =>
  slugs.flatMap((s) => {
    const x = tools.find((y) => y.slug === s);
    return x ? [{ label: x.name, href: `/araclar/${x.slug}`, text: x.short }] : [];
  });

export const productLinks = (slugs: string[] = []) =>
  slugs.flatMap((s) => {
    const x = products.find((y) => y.slug === s && y.status === "published");
    return x ? [{ label: x.name, href: `/urunler/${x.slug}` }] : [];
  });
