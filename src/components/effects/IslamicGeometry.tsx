import { cn } from "../../utilities/cn";

type IslamicGeometryProps = {
  className?: string;
  variant?: "star" | "arch" | "grid";
  opacity?: number;
};

export function IslamicGeometry({
  className,
  variant = "star",
  opacity = 0.04,
}: IslamicGeometryProps) {
  if (variant === "arch") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 200 120"
        className={cn("pointer-events-none select-none", className)}
        style={{ opacity }}
      >
        <path
          d="M20 120 V60 Q100 0 180 60 V120"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M40 120 V70 Q100 20 160 70 V120"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.35"
        />
      </svg>
    );
  }

  if (variant === "grid") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:72px_72px]",
          className,
        )}
        style={{ opacity }}
      />
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      className={cn("pointer-events-none select-none animate-geo-drift", className)}
      style={{ opacity }}
    >
      <path
        d="M60 4 73 22 93 15 93 37 112 47 99 62 112 78 93 88 93 110 73 103 60 122 47 103 27 110 27 88 8 78 21 62 8 47 27 37 27 15 47 22Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <circle cx="60" cy="62" r="18" fill="none" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  );
}
