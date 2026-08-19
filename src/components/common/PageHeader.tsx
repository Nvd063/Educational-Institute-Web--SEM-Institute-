import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <section className="page-header-shell relative isolate overflow-hidden border-b border-border bg-navy text-navy-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="page-header-glow page-header-glow-one" />
        <div className="page-header-glow page-header-glow-two" />
        <div className="page-header-glow page-header-glow-three" />
        <div className="page-header-sheen" />
        {[
          { left: "12%", top: "16%" },
          { left: "26%", top: "52%" },
          { left: "52%", top: "26%" },
          { left: "70%", top: "58%" },
          { left: "82%", top: "36%" },
        ].map((particle, index) => (
          <span
            key={`${particle.left}-${particle.top}`}
            className="page-header-particle"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: `${index * 1.2}s`,
            }}
          />
        ))}
      </div>

      <div className="container-page relative z-10 py-14 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-navy-foreground/70">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link to="/" className="hover:text-gold">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="text-gold">
              {title}
            </li>
          </ol>
        </nav>
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="page-section-title">{title}</h1>
        <p className="mt-4 max-w-2xl text-navy-foreground/80">{description}</p>
      </div>
    </section>
  );
}
