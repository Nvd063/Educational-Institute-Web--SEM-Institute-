import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpenCheck,
  Brain,
  CalendarDays,
  Handshake,
  Megaphone,
  MessagesSquare,
  Palette,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { MainLayout } from "../layouts/MainLayout";
import { PageHeader } from "../components/common/PageHeader";
import { SectionHeading } from "../components/common/SectionHeading";
import { InfoCard, Panel } from "../components/common/Card";
import { Reveal } from "../components/common/Reveal";
import { StarMotif } from "../components/common/StarMotif";
import { LinkButton } from "../components/common/Button";
import { JourneyTimeline } from "../components/students/JourneyTimeline";
import { AchievementCard } from "../components/achievements/AchievementCard";
import {
  academicActivities,
  developmentSkills,
  extracurricular,
  learningExperience,
  studentEvents,
  studentJourney,
} from "../data/students";
import { achievements } from "../data/achievements";

const title = "Student Life";
const description =
  "A day at Sirat-e-Mustaqeem runs from morning Dhikr assembly to core sciences, calligraphy workshops, and sports—fostering character (Akhlaq), manners (Adab), and academic focus.";

const developmentIcons = [MessagesSquare, ShieldCheck, Handshake, Brain, Sparkles, BookOpenCheck];

export const Route = createFileRoute("/students")({
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
  component: StudentsPage,
});

function StudentsPage() {
  const highlights = achievements.filter((item) => item.featured).slice(0, 3);

  return (
    <MainLayout>
      <PageHeader eyebrow="Campus" title={title} description={description} />

      {/* Learning experience */}
      <section className="relative overflow-hidden section-y">
        <StarMotif className="pointer-events-none absolute -left-24 -top-20 size-72 text-gold/10" />
        <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Tarbiyah in Action"
              title="What Learning Looks Like on an Ordinary Tuesday"
              description="Our classes bridge core academic science with spiritual reflection (Tafakkur). Students handle experimental setups, translate Qur'anic vocabulary, and present their findings."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton to="/achievements" variant="gold">
                Academic & Qur'an Honours
              </LinkButton>
              <LinkButton to="/admissions" variant="secondary">
                Explore Admissions
              </LinkButton>
            </div>
          </Reveal>
          <div className="space-y-4">
            {learningExperience.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <Panel interactive className="flex gap-4">
                  <span className="mt-1 font-heading text-lg text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <h3>{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                  </span>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Academic activities */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Tarbiyah Circles"
              title="Beneficial Pursuits Beyond the Textbook"
              description="A steady schedule of Hifz circles, Seerah research, and Arabic vocabulary exercises throughout the school year."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {academicActivities.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <InfoCard
                  title={item.title}
                  description={item.body}
                  icon={<BookOpenCheck className="size-5" aria-hidden="true" />}
                  footer={
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-royal">
                      {item.meta}
                    </span>
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Extracurricular */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Student Societies"
              title="Clubs, Sports, and Caring Communities"
              description="Student-led activities focusing on teamwork, Islamic calligraphy, Naat/Qirat practice, and charitable welfare."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {extracurricular.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <Panel interactive className="flex h-full flex-col border-l-4 border-l-royal/30">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-royal">
                    {item.meta}
                  </span>
                  <h3 className="mt-2">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.body}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Development */}
      <section className="section-y bg-navy text-navy-foreground">
        <div className="container-page">
          <Reveal>
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Character Growth
              </p>
              <h2 className="text-navy-foreground">
                Six Core Skills of a Sirat-e-Mustaqeem Graduate
              </h2>
              <span aria-hidden="true" className="mt-4 block h-0.5 w-14 bg-gold" />
              <p className="mt-4 text-navy-foreground/80">
                While exam grades are critical, we place equal importance on nurturing trust,
                empathy (Ukhuwwah), critical reflection (Tafakkur), and professional ethics.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {developmentSkills.map((skill, index) => {
              const Icon = developmentIcons[index] ?? Sparkles;
              return (
                <Reveal key={skill.title} delay={index * 0.05}>
                  <div className="border-t border-navy-foreground/15 pt-5">
                    <Icon className="size-6 text-gold" aria-hidden="true" />
                    <h3 className="mt-4 text-navy-foreground">{skill.title}</h3>
                    <p className="mt-2 text-sm text-navy-foreground/75">{skill.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="School Events"
              title="Annual Programs That Shape Student Growth"
              description="A structured timeline of Seerah programs, Calligraphy days, and Sportsmanship contests."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {studentEvents.map((event, index) => (
              <Reveal key={event.name} delay={index * 0.05}>
                <Panel
                  interactive
                  className={index === 0 ? "h-full bg-surface border-t-2 border-t-gold" : "h-full"}
                >
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-royal">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    {event.when}
                  </span>
                  <h3 className="mt-3">{event.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{event.body}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement highlights */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Recognition"
                title="A few results we are proud of"
                description="Selected highlights from the full record kept on the achievements page."
              />
              <LinkButton to="/achievements" variant="secondary">
                <Trophy className="size-4" aria-hidden="true" />
                View all achievements
              </LinkButton>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {highlights.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.06}>
                <AchievementCard achievement={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="relative overflow-hidden section-y">
        <StarMotif className="pointer-events-none absolute -right-24 bottom-0 size-80 text-royal/5" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="The student journey"
              title="From orientation to graduation"
              description="Select a milestone to see what it involves and what a student walks away with."
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <JourneyTimeline milestones={studentJourney} />
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section className="section-y bg-navy text-navy-foreground">
        <div className="container-page flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <Megaphone className="size-7 text-gold" aria-hidden="true" />
            <h2 className="mt-4 text-navy-foreground">Visit and Experience a School Day</h2>
            <p className="mt-3 text-navy-foreground/80">
              Parents are welcome to attend a morning assembly, hear Qirat recitations, and see our
              Tarbiyah program in action.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LinkButton to="/contact" variant="gold">
              <Users className="size-4" aria-hidden="true" />
              Arrange a Visit
            </LinkButton>
            <LinkButton
              to="/gallery"
              variant="secondary"
              className="border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10"
            >
              <Palette className="size-4" aria-hidden="true" />
              Campus Gallery
            </LinkButton>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
