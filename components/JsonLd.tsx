/**
 * JSON-LD'yi server-side basar. `<` karakteri kaçışlanır (XSS / </script> kırılmasına karşı).
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
