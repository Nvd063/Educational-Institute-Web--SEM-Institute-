import type { ReactNode } from "react";
import { cn } from "../../utilities/cn";

type PanelProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

export function Panel({ children, className, interactive = false }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-6 shadow-card smooth-transition",
        interactive && "card-hover-gold",
        className,
      )}
    >
      {children}
    </div>
  );
}

type InfoCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function InfoCard({ title, description, icon, footer, className }: InfoCardProps) {
  return (
    <Panel interactive className={cn("flex h-full flex-col", className)}>
      {icon ? (
        <span className="mb-4 inline-flex size-11 items-center justify-center rounded-md bg-secondary text-royal">
          {icon}
        </span>
      ) : null}
      <h3>{title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{description}</p>
      {footer ? <div className="mt-5">{footer}</div> : null}
    </Panel>
  );
}
