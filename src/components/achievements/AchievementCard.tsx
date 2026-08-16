import {
  Award,
  FlaskConical,
  GraduationCap,
  HandHeart,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Achievement, AchievementCategory } from "../../data/achievements";
import { Panel } from "../common/Card";
import { cn } from "../../utilities/cn";

export const categoryIcons: Record<AchievementCategory, LucideIcon> = {
  Academic: GraduationCap,
  Competitions: Trophy,
  Research: FlaskConical,
  Sports: Award,
  Leadership: Users,
  Community: HandHeart,
};

type AchievementCardProps = {
  achievement: Achievement;
  className?: string;
};

export function AchievementCard({ achievement, className }: AchievementCardProps) {
  const Icon = categoryIcons[achievement.category];

  return (
    <Panel
      interactive
      className={cn(
        "flex h-full flex-col border-t-2 border-t-transparent hover:border-t-gold smooth-transition",
        achievement.featured && "border-t-gold bg-surface",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="icon-hover inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-secondary text-royal smooth-transition">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="rounded-full bg-navy px-3 py-1 text-xs font-semibold tracking-[0.12em] text-navy-foreground smooth-transition hover:bg-gold hover:text-gold-foreground hover:drop-shadow-[0_0_8px_oklch(0.79_0.12_82_/_0.3)]">
          {achievement.year}
        </span>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-royal smooth-transition hover:text-gold hover:drop-shadow-[0_0_6px_oklch(0.79_0.12_82_/_0.3)]">
        {achievement.category}
      </p>
      <h3 className="mt-2">{achievement.title}</h3>
      <p className="mt-1 text-sm font-medium text-foreground">{achievement.person}</p>
      <p className="mt-3 flex-1 text-sm text-muted-foreground">{achievement.description}</p>

      {achievement.metric ? (
        <p className="mt-5 icon-hover inline-flex w-fit items-center gap-2 rounded-md bg-gold/15 px-3 py-1.5 text-sm font-semibold text-navy smooth-transition hover:bg-gold/25 hover:drop-shadow-[0_0_12px_oklch(0.79_0.12_82_/_0.25)]">
          <Trophy className="size-4 text-gold" aria-hidden="true" />
          {achievement.metric}
        </p>
      ) : null}
    </Panel>
  );
}
