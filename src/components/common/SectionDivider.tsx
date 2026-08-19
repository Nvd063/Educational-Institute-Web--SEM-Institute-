import { cn } from "../../utilities/cn";

type SectionDividerProps = {
  className?: string;
  flip?: boolean;
  from?: "navy" | "surface" | "background";
  to?: "navy" | "surface" | "background";
};

const fillMap = {
  navy: "var(--color-navy)",
  surface: "var(--color-surface)",
  background: "var(--color-background)",
};

export function SectionDivider({
  className,
  flip = false,
  from = "background",
  to = "surface",
}: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative -mt-px h-16 w-full overflow-hidden sm:h-20", className)}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={cn("absolute inset-0 size-full", flip && "rotate-180")}
      >
        <path
          d="M0,32 C360,80 720,0 1080,32 C1260,48 1380,64 1440,48 L1440,80 L0,80 Z"
          fill={fillMap[to]}
        />
        <path
          d="M0,0 L1440,0 L1440,28 C1260,12 1080,52 720,20 C360,-12 180,8 0,28 Z"
          fill={fillMap[from]}
          opacity="0.95"
        />
      </svg>
    </div>
  );
}
