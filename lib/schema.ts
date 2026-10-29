import type { Faq, Product, Solution } from "@/data/types";
import { solutions } from "@/data/solutions";
import { ogKey } from "./og";
import { absoluteUrl, serviceAreas, site } from "./site";

/**
 * JSON-LD @graph mimarisi. Tüm varlıklar @id ile birbirine bağlanır:
 *   #business (LocalBusiness/ProfessionalService) ← provider / publisher
 *   #website  (WebSite)
 * Sayfa bazlı şemalar (Service, Product, FAQPage, BreadcrumbList, BlogPosting)
 * bu kimliklere referans verir.
 */
export const BUSINESS_ID = `${site.url}/#business`;
export const WEBSITE_ID = `${site.url}/#website`;

type Thing = Record<string, unknown>;

const areaServed = serviceAreas.map((a) => ({
  "@type": a.slug === "antalya-merkez" ? "City" : "AdministrativeArea",
  name: a.slug === "antalya-merkez" ? "Antalya" : `${a.name}, Antalya`,
}));

export function businessSchema(): Thing {
  const hasCoords = site.geo.lat !== null && site.geo.lng !== null;
  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/logo.png"),
    telephone: site.phoneE164,
    email: site.email,
    priceRange: site.priceRange,
    ...(site.foundingYear ? { foundingDate: String(site.foundingYear) } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.district,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    ...(hasCoords ? { geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng } } : {}),
    openingHoursSpecification: site.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed,
    ...(site.googleMapsUrl ? { hasMap: site.googleMapsUrl } : {}),
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
    ...(site.googleRating
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: site.googleRating.value, reviewCount: site.googleRating.count } }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Bilişim ve güvenlik sistemleri hizmetleri",
      itemListElement: solutions.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", "@id": `${absoluteUrl(`/cozumler/${s.slug}`)}#service`, name: s.name },
      })),
    },
  };
}

export function websiteSchema(): Thing {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: "tr-TR",
    publisher: { "@id": BUSINESS_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${site.url}/bilgi-bankasi?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function serviceSchema(s: Solution): Thing {
  const url = absoluteUrl(`/cozumler/${s.slug}`);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.h1,
    serviceType: s.serviceType,
    description: s.definition,
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed,
    audience: { "@type": "BusinessAudience", audienceType: s.audience.join(", ") },
  };
}

export function productSchema(p: Product): Thing {
  const url = absoluteUrl(`/urunler/${p.slug}`);
  const offers =
    p.pricing.priceRange
      ? { "@type": "AggregateOffer", priceCurrency: "TRY", lowPrice: p.pricing.priceRange.min, highPrice: p.pricing.priceRange.max, seller: { "@id": BUSINESS_ID } }
      : p.pricing.startingPrice
        ? { "@type": "Offer", priceCurrency: "TRY", price: p.pricing.startingPrice, availability: "https://schema.org/InStock", seller: { "@id": BUSINESS_ID } }
        : undefined;
  return {
    "@type": p.kind,
    "@id": `${url}#product`,
    name: p.name,
    description: p.oneLiner,
    url,
    brand: { "@type": "Brand", name: p.brand },
    ...(p.kind === "SoftwareApplication" ? { applicationCategory: "SecurityApplication", operatingSystem: p.operatingSystem } : { category: p.category }),
    ...(offers ? { offers } : {}),
    // aggregateRating yalnızca gerçek yorumlar varsa eklenmelidir.
  };
}

export function faqSchema(faqs: Faq[], pageUrl: string): Thing {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbSchema(items: Crumb[]): Thing {
  const all = [{ name: "Ana Sayfa", href: "/" }, ...items];
  return {
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

export function articleSchema(a: {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: { name: string; jobTitle?: string; url?: string; knowsAbout?: string[] };
  citations?: Thing[];
}): Thing {
  const url = absoluteUrl(`/bilgi-bankasi/${a.slug}`);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: a.title,
    description: a.description,
    url,
    mainEntityOfPage: url,
    inLanguage: "tr-TR",
    datePublished: a.datePublished,
    dateModified: a.dateModified,
    image: absoluteUrl(`/og/${ogKey(`/bilgi-bankasi/${a.slug}`)}.png`),
    author: {
      "@type": "Person",
      name: a.author.name,
      ...(a.author.jobTitle ? { jobTitle: a.author.jobTitle } : {}),
      ...(a.author.url ? { sameAs: [a.author.url] } : {}),
      ...(a.author.knowsAbout ? { knowsAbout: a.author.knowsAbout } : {}),
      worksFor: { "@id": BUSINESS_ID },
    },
    publisher: { "@id": BUSINESS_ID },
    isPartOf: { "@id": WEBSITE_ID },
    ...(a.citations?.length ? { citation: a.citations } : {}),
  };
}

/** Atıf yapılan kaynaklar → schema.org "citation" (CreativeWork listesi) */
export function citationList(items: { title: string; publisher: string; url?: string; year?: string }[]) {
  return items.map((s) => ({
    "@type": "CreativeWork",
    name: s.title,
    publisher: { "@type": "Organization", name: s.publisher },
    ...(s.url ? { url: s.url } : {}),
    ...(s.year ? { datePublished: s.year } : {}),
  }));
}

/** Sayfa düğümü: içerik ve atıfları sayfa düzeyinde bağlar */
export function webPageSchema(p: { url: string; name: string; description: string; about?: string; citations?: Thing[]; dateModified?: string }): Thing {
  return {
    "@type": "WebPage",
    "@id": `${p.url}#webpage`,
    url: p.url,
    name: p.name,
    description: p.description,
    inLanguage: "tr-TR",
    isPartOf: { "@id": WEBSITE_ID },
    ...(p.about ? { about: { "@id": p.about } } : {}),
    ...(p.dateModified ? { dateModified: p.dateModified } : {}),
    ...(p.citations?.length ? { citation: p.citations } : {}),
  };
}

/** Portföy: CreativeWork listesi (yalnızca gerçek URL'li projeler) */
export function portfolioSchema(items: { title: string; description: string; url?: string; image?: string; category: string }[], pageUrl: string): Thing {
  return {
    "@type": "ItemList",
    "@id": `${pageUrl}#portfolio`,
    name: `${site.name} web ve yazılım projeleri`,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": p.category === "E-ticaret" || p.category === "Kurumsal web sitesi" ? "WebSite" : "SoftwareApplication",
        name: p.title,
        description: p.description,
        ...(p.url ? { url: p.url } : {}),
        ...(p.image ? { image: absoluteUrl(p.image) } : {}),
        creator: { "@id": BUSINESS_ID },
      },
    })),
  };
}

/** Sayfa şemalarını site geneli varlıklarla tek bir @graph'ta birleştirir */
export function graph(...nodes: (Thing | undefined | false)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [businessSchema(), websiteSchema(), ...nodes.filter(Boolean)],
  };
}
