import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Faq as FaqT } from "@/data/types";
import { SectionHeading } from "./SectionHeading";

/** SSS bölümü. FAQPage şeması sayfa @graph'ına faqSchema() ile eklenir. */
export function Faq({ faqs, title = "Sıkça sorulan sorular", lead }: { faqs: FaqT[]; title?: string; lead?: string }) {
  return (
    <section aria-labelledby="sss" className="container-page py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading id="sss" eyebrow="SSS" title={title} lead={lead} />
        <Accordion type="single" collapsible className="border-t border-border">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`q-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
