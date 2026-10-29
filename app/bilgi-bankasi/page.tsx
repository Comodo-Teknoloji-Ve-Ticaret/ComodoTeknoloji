import { JsonLd } from "@/components/JsonLd";
import { PostList } from "@/components/sections/PostList";
import { PageHero } from "@/components/sections/PageHero";
import { getAllPosts } from "@/lib/content";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Bilgi Bankası: Network, CCTV ve 5651 Rehberleri",
  description: "Otel Wi-Fi, güvenlik kamerası, plaka tanıma, zayıf akım ve 5651 loglama hakkında mühendislerimizin hazırladığı uygulamalı rehberler.",
  path: "/bilgi-bankasi",
});

export default function BlogIndex() {
  const posts = getAllPosts().map(({ content: _c, ...meta }) => meta);
  const crumbs = [{ name: "Bilgi Bankası", href: "/bilgi-bankasi" }];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Bilgi Bankası"
        title="Mühendislerimizden uygulamalı rehberler"
        definition="Bilgi Bankası; otel, fabrika, site ve işletmelerin network, güvenlik kamerası, plaka tanıma, zayıf akım ve 5651 loglama kararlarını verirken ihtiyaç duyduğu teknik bilgileri, sahadaki proje deneyimimize dayanarak tablolar ve somut örneklerle anlatan rehber arşivimizdir."
      />
      <section className="container-page py-12">
        <PostList posts={posts} />
      </section>
    </>
  );
}
