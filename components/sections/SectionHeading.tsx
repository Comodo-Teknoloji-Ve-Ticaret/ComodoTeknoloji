import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  align = "left",
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  id?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
}) {
  const H = as;
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          <Scramble text={eyebrow.toLocaleUpperCase("tr-TR")} />
        </p>
      )}
      <H id={id} className="text-[length:var(--text-h2)]">
        {title}
      </H>
      {lead && <p className="mt-4 text-lg text-muted">{lead}</p>}
    </Reveal>
  );
}
