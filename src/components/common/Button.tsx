import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../utilities/cn";

type Variant = "primary" | "secondary" | "gold" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-60 golden-glow-hover";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-navy-foreground hover:bg-royal hover:shadow-[0_0_20px_oklch(0.79_0.12_82_/_0.3)]",
  secondary: "border border-navy/25 bg-card text-navy hover:bg-secondary hover:border-gold/40 hover:shadow-[0_0_16px_oklch(0.79_0.12_82_/_0.2)]",
  gold: "bg-gold text-gold-foreground hover:bg-gold/85 hover:shadow-[0_0_24px_oklch(0.79_0.12_82_/_0.4)]",
  ghost: "text-navy hover:bg-secondary hover:shadow-[0_0_12px_oklch(0.79_0.12_82_/_0.15)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-12 px-6 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps & Omit<ComponentProps<"button">, "children" | "className">;
type LinkButtonProps = CommonProps & { to: string };

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return <button className={cn(base, "btn-lightening-glimpse", variants[variant], sizes[size], className)} {...props} />;
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  to,
  children,
}: LinkButtonProps) {
  return (<Link to={to} className={cn(base, "btn-lightening-glimpse", variants[variant], sizes[size], className)}>{children}</Link>);
}
