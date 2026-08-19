import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Trophy } from "lucide-react";
import { MainLayout } from "../layouts/MainLayout";
import { PageHeader } from "../components/common/PageHeader";
import { SectionHeading } from "../components/common/SectionHeading";
import { Panel } from "../components/common/Card";
import { Reveal } from "../components/common/Reveal";
import { StarMotif } from "../components/common/StarMotif";
import { Counter } from "../components/common/Counter";
import { LinkButton } from "../components/common/Button";
import { AchievementCard, categoryIcons } from "../components/achievements/AchievementCard";
import { AchievementTimeline } from "../components/achievements/AchievementTimeline";
import {
  achievementCategories,
  achievementYears,
  achievements,
  type AchievementCategory,
} from "../data/achievements";
import { cn } from "../utilities/cn";

const title = "Achievements";
const description =
  "Board positions, inter-school competition results, student research, sport and community work recorded session by session at Sirat-e-Mustaqeem Educational System.";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: `${title} | Sirat-e-Mustaqeem Educational System` },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: `${title} | Sirat-e-Mustaqeem Educational System` },
      { property: "og:description", content: description },
    ],
  }),
  component: AchievementsPage,
});

type Filter = AchievementCategory | "All";

function AchievementsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeYear, setActiveYear] = useState(achievementYears[0] ?? 0);

  const filtered = useMemo(
    () => (filter === "All" ? achievements : achievements.filter((a) => a.category === filter)),
    [filter],
  );

  const featured = achievements.filter((item) => item.featured);

  return (
    <MainLayout>
      <PageHeader eyebrow="Recognition" title={title} description={description} />

      {/* Hero summary */}
      <section className="relative overflow-hidden border-b border-border bg-surface py-12 lg:py-16">
        <StarMotif className="pointer-events-none absolute -right-16 -top-16 size-64 text-gold/10" />
        <div className="container-page grid gap-8 sm:grid-cols-3">
          {[
            { value: achievements.length, label: "Recorded achievements", suffix: "" },
            { value: achievementCategories.length, label: "Categories of recognition", suffix: "" },
            { value: achievementYears.length, label: "Sessions on record", suffix: "" },
          ].map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <p className="font-heading text-4xl text-navy">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <span aria-hidden="true" className="mt-3 block h-0.5 w-10 bg-gold" />
              <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Highlights"
              title="The results we point to first"
              description="Three entries that best describe what students here are capable of."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.06}>
                <AchievementCard achievement={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Categories + filtered grid */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Categories"
              title="Browse by the kind of achievement"
              description="Filter the full record by academics, competitions, research, sport, leadership or community work."
            />
          </Reveal>

          <Reveal delay={0.06}>
            <div
              className="mt-8 flex flex-wrap gap-2.5"
              role="group"
              aria-label="Filter achievements by category"
            >
              {(["All", ...achievementCategories] as Filter[]).map((category) => {
                const Icon = category === "All" ? Sparkles : categoryIcons[category];
                const active = filter === category;
                const count =
                  category === "All"
                    ? achievements.length
                    : achievements.filter((a) => a.category === category).length;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setFilter(category)}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200",
                      active
                        ? "border-navy bg-navy text-navy-foreground"
                        : "border-border bg-card text-navy hover:border-royal hover:text-royal",
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {category}
                    <span className={cn("text-xs", active ? "text-gold" : "text-muted-foreground")}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item, index) => (
              <Reveal key={item.id} delay={Math.min(index, 5) * 0.05}>
                <AchievementCard achievement={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Year timeline */}
      <section className="relative overflow-hidden section-y">
        <StarMotif className="pointer-events-none absolute -left-24 bottom-10 size-80 text-royal/5" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Chronology"
              title="Explore the record year by year"
              description="Select a session on the rail to see everything recorded in that year."
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <AchievementTimeline
              years={achievementYears}
              activeYear={activeYear}
              onSelectYear={setActiveYear}
              achievements={achievements}
            />
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section className="section-y bg-navy text-navy-foreground">
        <div className="container-page flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <Trophy className="size-7 text-gold" aria-hidden="true" />
            <h2 className="mt-4 text-navy-foreground">
              Behind every result is an ordinary school day
            </h2>
            <p className="mt-3 text-navy-foreground/80">
              The clubs, workshops and projects that produce these results run every week on campus.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LinkButton to="/students" variant="gold">
              Explore student life
            </LinkButton>
            <LinkButton
              to="/results"
              variant="secondary"
              className="border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10"
            >
              Examination results
            </LinkButton>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
