import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Achievement } from "../../data/achievements";
import { AchievementCard } from "./AchievementCard";
import { cn } from "../../utilities/cn";

type AchievementTimelineProps = {
  years: number[];
  activeYear: number;
  onSelectYear: (year: number) => void;
  achievements: Achievement[];
};

export function AchievementTimeline({
  years,
  activeYear,
  onSelectYear,
  achievements,
}: AchievementTimelineProps) {
  const reduced = useReducedMotion();

  return (
    <div>
      {/* Year rail */}
      <div className="relative overflow-x-auto pb-2">
        <div aria-hidden="true" className="absolute left-0 right-0 top-[1.4rem] h-px bg-border" />
        <ol className="relative flex min-w-max items-start gap-8 px-1 sm:gap-14">
          {years.map((year) => {
            const active = year === activeYear;
            const count = achievements.filter((item) => item.year === year).length;
            return (
              <li key={year}>
                <button
                  type="button"
                  onClick={() => onSelectYear(year)}
                  aria-pressed={active}
                  className="btn-lightening-glimpse group flex flex-col items-center gap-2 text-center"
                >
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-full border-2 bg-background text-xs font-semibold transition-colors duration-200",
                      active
                        ? "border-gold bg-navy text-navy-foreground"
                        : "border-border text-muted-foreground group-hover:border-royal group-hover:text-royal",
                    )}
                  >
                    {count}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-semibold transition-colors duration-200",
                      active ? "text-navy" : "text-muted-foreground group-hover:text-royal",
                    )}
                  >
                    {year}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Showing {achievements.filter((item) => item.year === activeYear).length} recorded{" "}
        {achievements.filter((item) => item.year === activeYear).length === 1 ? "entry" : "entries"}{" "}
        from {activeYear}.
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeYear}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {achievements
            .filter((item) => item.year === activeYear)
            .map((item) => (
              <AchievementCard key={item.id} achievement={item} />
            ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
