import { createFileRoute } from "@tanstack/react-router";
import { Compass, Eye, Flag, HeartHandshake, Target } from "lucide-react";
import { MainLayout } from "../layouts/MainLayout";
import { PageHeader } from "../components/common/PageHeader";
import { SectionHeading } from "../components/common/SectionHeading";
import { Panel } from "../components/common/Card";
import { Reveal } from "../components/common/Reveal";
import { StarMotif } from "../components/common/StarMotif";
import { LinkButton } from "../components/common/Button";
import { coreValues, missionCommitments, visionMilestones } from "../data/mission-vision";

const title = "Mission & Vision";
const description =
  "Our guiding principles focus on nurturing knowledge (Ilm) and character (Akhlaq), aligning our classes and community around authentic Islamic values.";

const commitmentIcons = [Target, Eye, HeartHandshake, Compass];

export const Route = createFileRoute("/mission-vision")({
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
  component: MissionVisionPage,
});

function MissionVisionPage() {
  return (
    <MainLayout>
      <PageHeader eyebrow="Our Mission" title={title} description={description} />

      {/* Mission statement */}
      <section className="relative overflow-hidden section-y">
        <StarMotif className="pointer-events-none absolute -left-24 -top-24 size-72 text-royal/10" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Our Commitments"
              title="To Nurture Faith and Inspire Academic Excellence"
              description="Our mission guides our curriculum updates, teacher selections, and the regular evaluations we hold to nurture noble characters (Akhlaq)."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {missionCommitments.map((item, i) => {
              const Icon = commitmentIcons[i % commitmentIcons.length]!;
              return (
                <Reveal key={item.title} delay={i * 0.08}>
                  <Panel interactive className="flex h-full flex-col border-t-4 border-t-gold">
                    <span className="mb-4 inline-flex size-11 items-center justify-center rounded-md bg-secondary text-royal">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                  </Panel>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision timeline */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Our Vision"
              title="Where Sirat-e-Mustaqeem is Heading"
              description="Clear, values-driven milestones mapping our curriculum upgrades and community contribution."
            />
          </Reveal>
          <ol className="relative mt-12 space-y-8">
            <span
              aria-hidden="true"
              className="absolute left-[1.4rem] top-2 bottom-2 hidden w-px bg-border sm:block"
            />
            {visionMilestones.map((milestone, i) => (
              <Reveal key={milestone.year} delay={i * 0.1}>
                <li className="relative flex gap-5 sm:pl-0">
                  <span className="relative z-10 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-royal shadow-card">
                    <Flag className="size-5" />
                  </span>
                  <Panel interactive className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                      {milestone.year}
                    </p>
                    <h3 className="mt-1">{milestone.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{milestone.body}</p>
                  </Panel>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Core values */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Core Values"
              title="The Pillars of Our Tarbiyah Program"
              description="These six values guide our assessments and daily behavior, helping students grow spiritually and intellectually."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, i) => (
              <Reveal key={value.name} delay={i * 0.06}>
                <div className="group relative h-full overflow-hidden rounded-lg border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-raised">
                  <StarMotif className="pointer-events-none absolute -right-8 -top-8 size-28 text-royal/5 transition-colors duration-300 group-hover:text-gold/25" />
                  <p className="relative font-heading text-lg font-semibold text-royal">
                    {value.name}
                  </p>
                  <span
                    aria-hidden="true"
                    className="relative mt-3 block h-0.5 w-10 bg-gold transition-all duration-300 group-hover:w-16"
                  />
                  <p className="relative mt-3 text-sm text-muted-foreground">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-navy py-14 text-navy-foreground lg:py-20">
        <StarMotif className="pointer-events-none absolute -bottom-32 right-8 size-80 text-navy-foreground/5" />
        <div className="container-page relative text-center">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Observe Our Classes
            </p>
            <h2 className="mx-auto max-w-2xl text-navy-foreground">
              Experience Our Values in Action
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-navy-foreground/80">
              We invite parents to visit our campus, observe a morning assembly, and meet our
              teachers. Let us demonstrate how we blend academic depth with moral character.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <LinkButton to="/admissions" variant="gold">
                Explore Admissions
              </LinkButton>
              <LinkButton
                to="/about"
                className="border border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10"
              >
                Read About Us
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </MainLayout>
  );
}
