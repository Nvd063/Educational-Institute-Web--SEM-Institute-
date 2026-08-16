import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpenCheck,
  Building2,
  FlaskConical,
  HeartHandshake,
  HelpCircle,
  Lightbulb,
  Users,
} from "lucide-react";
import { MainLayout } from "../layouts/MainLayout";
import { PageHeader } from "../components/common/PageHeader";
import { SectionHeading } from "../components/common/SectionHeading";
import { Panel } from "../components/common/Card";
import { Reveal } from "../components/common/Reveal";
import { StarMotif } from "../components/common/StarMotif";
import { LinkButton } from "../components/common/Button";
import { GoldenIslamicBackground } from "../components/effects/GoldenIslamicBackground";
import { approach, environment, studentSupport, values } from "../data/about";
import { site } from "../data/site";

const title = "About Our School";
const description =
  "Sirat-e-Mustaqeem Educational System has served families since 2009, combining robust national curriculum sciences with authentic Qur'anic studies and Tarbiyah.";

const approachIcons = [BookOpenCheck, FlaskConical, Lightbulb, Users];
const environmentIcons = [Building2, FlaskConical, Users, Lightbulb];

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  return (
    <MainLayout>
      <PageHeader eyebrow="Our Institution" title={title} description={description} />

      {/* Founding statement */}
      <section className="relative overflow-hidden section-y">
        <StarMotif className="pointer-events-none absolute -right-20 -top-24 size-72 text-gold/10" />
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Established 2009"
              title="A Foundation Built on Beneficial Knowledge"
              description={`Sirat-e-Mustaqeem began with a single primary block and a deep-rooted commitment to Tarbiyah. Today, it nurtures students from Play Group through Matriculation on a unified campus in ${site.address.split(",").slice(0, 2).join(", ")}.`}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Panel className="border-l-4 border-l-gold">
              <p className="text-lg text-foreground">
                We evaluate our success not by physical structures, but by the character, faith
                (Iman), and wisdom a child displays upon graduation. To nurture a student who reads,
                reasons, and acts with integrity (Amanah) and compassion (Rahmah) is our sacred
                goal.
              </p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-royal">
                — Our Founding Principle
              </p>
            </Panel>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="relative section-y bg-surface overflow-hidden">
        <GoldenIslamicBackground variant="medium" />
        <div className="container-page relative z-10">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Our Methodology"
              title="Four Tarbiyah Habits That Shape Every Lesson"
              description="Nurturing students in both science and revelation, establishing steady habits from early years to Matriculation."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((item, i) => {
              const Icon = approachIcons[i % approachIcons.length]!;
              return (
                <Reveal key={item.title} delay={i * 0.08}>
                  <Panel interactive className="flex h-full flex-col">
                    <span className="mb-4 inline-flex size-11 items-center justify-center rounded-md bg-secondary text-royal">
                      <Icon className="size-5" />
                    </span>
                    <h3>{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                  </Panel>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Our Core Values"
              title="Islamic Values Applied to Everyday Learning"
              description="We translate Islamic terminology into everyday interactions, character markings, and collaborative play."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.label} delay={i * 0.06}>
                <Panel interactive className="flex h-full gap-5">
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="inline-flex size-14 items-center justify-center rounded-full bg-navy text-gold font-heading text-sm font-semibold">
                      {value.label}
                    </span>
                    {i < values.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="mt-3 hidden h-full w-px flex-1 bg-border sm:block"
                      />
                    ) : null}
                  </div>
                  <div>
                    <h3 className="text-lg">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{value.body}</p>
                  </div>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Environment */}
      <section className="relative section-y bg-surface overflow-hidden">
        <GoldenIslamicBackground variant="medium" />
        <div className="container-page relative z-10">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Our Facilities"
              title="A Structured Environment Supporting Islamic Values"
              description="Our classrooms and facilities are designed to encourage close mentorship and individual attention."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {environment.map((item, i) => {
              const Icon = environmentIcons[i % environmentIcons.length]!;
              return (
                <Reveal key={item.title} delay={i * 0.08}>
                  <Panel interactive className="flex h-full flex-col">
                    <span className="mb-4 inline-flex size-11 items-center justify-center rounded-md bg-navy text-gold">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-base">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                  </Panel>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student support */}
      <section className="relative overflow-hidden bg-navy py-14 text-navy-foreground lg:py-20">
        <StarMotif className="pointer-events-none absolute -bottom-32 left-8 size-80 text-navy-foreground/5" />
        <div className="container-page relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Tarbiyah & Support
            </p>
            <h2 className="text-navy-foreground">Attending to Each Child's Progress</h2>
            <span aria-hidden="true" className="mt-4 block h-0.5 w-14 bg-gold" />
            <p className="mt-4 max-w-xl text-navy-foreground/80">
              Our small class sizes allow teachers to form a deep bond with students. We track
              academic results, prayer routines, and manners, partnering closely with parents after
              every evaluation cycle.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton to="/admissions" variant="gold">
                Apply for Admission
              </LinkButton>
              <LinkButton
                to="/contact"
                className="border border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10"
              >
                Ask a Question
              </LinkButton>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {studentSupport.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 rounded-lg border border-navy-foreground/15 bg-navy-foreground/5 p-4"
                >
                  <HelpCircle className="mt-0.5 size-5 shrink-0 text-gold" />
                  <span className="text-sm text-navy-foreground/85">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <Panel className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <HeartHandshake className="size-6 shrink-0 text-royal" />
                <div>
                  <h2 className="text-lg">Want to visit our campus and meet our mentors?</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You are welcome to observe our classes and prayer times during office hours,{" "}
                    {site.officeHours.toLowerCase()}.
                  </p>
                </div>
              </div>
              <LinkButton to="/contact" variant="secondary">
                Arrange a Visit
              </LinkButton>
            </Panel>
          </Reveal>
        </div>
      </section>
    </MainLayout>
  );
}
