import { cn } from "../../utilities/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-royal smooth-transition hover:text-gold hover:drop-shadow-[0_0_8px_oklch(0.79_0.12_82_/_0.4)]">
          {eyebrow}
        </p>
      ) : null}
      <Heading>{title}</Heading>
      <span
        aria-hidden="true"
        className={cn("mt-4 block h-0.5 w-14 bg-gradient-to-r from-gold to-gold/60 smooth-transition hover:shadow-[0_0_12px_oklch(0.79_0.12_82_/_0.35)]", align === "center" && "mx-auto")}
      />
      {description ? <p className="mt-4 text-muted-foreground smooth-transition hover:text-foreground/80 hover:drop-shadow-[0_0_4px_oklch(0.79_0.12_82_/_0.2)]">{description}</p> : null}
    </div>
  );
}
