import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import type { TimelineMilestone } from "../../data/students";
import { Panel } from "../common/Card";
import { cn } from "../../utilities/cn";

type JourneyTimelineProps = {
  milestones: TimelineMilestone[];
};

export function JourneyTimeline({ milestones }: JourneyTimelineProps) {
  const [activeId, setActiveId] = useState(milestones[0]?.id ?? "");
  const reduced = useReducedMotion();
  const activeIndex = Math.max(
    0,
    milestones.findIndex((m) => m.id === activeId),
  );
  const active = milestones[activeIndex];

  if (!active) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_1.15fr] lg:gap-12">
      {/* Rail */}
      <ol className="relative space-y-1 border-l border-border pl-6">
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 w-px bg-gold transition-[height] duration-300"
          style={{ height: `${((activeIndex + 1) / milestones.length) * 100}%` }}
        />
        {milestones.map((milestone, index) => {
          const isActive = milestone.id === activeId;
          const isPassed = index < activeIndex;
          return (
            <li key={milestone.id} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[1.9rem] top-4 flex size-4 items-center justify-center rounded-full border-2 bg-background transition-colors duration-200",
                  isActive
                    ? "border-gold bg-gold"
                    : isPassed
                      ? "border-gold/60 bg-gold/40"
                      : "border-border",
                )}
              />
              <button
                type="button"
                onClick={() => setActiveId(milestone.id)}
                aria-pressed={isActive}
                className={cn(
                  "flex w-full items-start gap-3 rounded-md px-3 py-3 text-left transition-colors duration-200",
                  isActive ? "bg-secondary" : "hover:bg-secondary/60",
                )}
              >
                <span className="flex-1">
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-royal">
                    {milestone.stage}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block font-heading text-base",
                      isActive ? "text-navy" : "text-foreground",
                    )}
                  >
                    {milestone.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground lg:hidden">
                    {milestone.summary}
                  </span>
                </span>
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    "mt-1 size-4 shrink-0 transition-transform duration-200",
                    isActive ? "translate-x-0.5 text-gold" : "text-muted-foreground",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ol>

      {/* Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Panel className="h-full border-l-4 border-l-gold">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">
              Step {activeIndex + 1} of {milestones.length} · {active.stage}
            </p>
            <h3 className="mt-3 text-2xl">{active.title}</h3>
            <p className="mt-3 text-muted-foreground">{active.detail}</p>
            <ul className="mt-6 space-y-2">
              {active.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  {outcome}
                </li>
              ))}
            </ul>
          </Panel>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
