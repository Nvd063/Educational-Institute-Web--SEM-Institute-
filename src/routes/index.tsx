"use client";

import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  Compass,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Images,
  Landmark,
  Lightbulb,
  MapPin,
  Medal,
  PenLine,
  ShieldCheck,
  Sparkles,
  Sprout,
  Target,
  Trophy,
  X,
} from "lucide-react";
import { MainLayout } from "../layouts/MainLayout";
import { LinkButton } from "../components/common/Button";
import { Panel } from "../components/common/Card";
import { SectionHeading } from "../components/common/SectionHeading";
import { Reveal } from "../components/common/Reveal";
import { Counter } from "../components/common/Counter";
import { GoldenIslamicBackground } from "../components/effects/GoldenIslamicBackground";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "../components/ui/dialog";
import { site } from "../data/site";
import lockup from "../assets/lockup.jpeg";
import crest from "../assets/crest.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guiding Hearts. Inspiring Minds. Shaping Futures." },
      {
        name: "description",
        content:
          "Guiding Hearts. Inspiring Minds. Shaping Futures. Sirat-e-Mustaqeem offers complete Islamic education from Play Group to Matriculation, integrating Tajweed, Arabic, and core sciences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:title",
        content: "Guiding Hearts. Inspiring Minds. Shaping Futures.",
      },
      {
        property: "og:description",
        content:
          "Guiding Hearts. Inspiring Minds. Shaping Futures. Play Group to Matriculation — integrating structured academics, Qur'anic Tajweed, and character development (Tarbiyah).",
      },
    ],
  }),
  component: HomePage,
});

const pillars = [
  {
    title: "Tarbiyah & Character",
    description:
      "Integrating Islamic manners (Adab), moral values, and character development into all aspects of student life.",
    icon: HeartHandshake,
  },
  {
    title: "Academic Excellence",
    description:
      "Fully structured lessons, science practicals, and BSEK Board preparation matching strict standard criteria.",
    icon: BookOpenCheck,
  },
  {
    title: "Spiritual Growth",
    description:
      "Structured Qur'an recitation (Nazra), Tajweed, daily congregational prayers, and Seerah studies.",
    icon: Sprout,
  },
  {
    title: "Beneficial Skills",
    description:
      "Computer literacy, analytical reflection (Tafakkur), and bilingual confidence for active contribution to society.",
    icon: Lightbulb,
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Muslim Students", detail: "Nurtured on one campus" },
  {
    value: 25,
    suffix: "+",
    label: "Tarbiyah Mentors",
    detail: "Combining academic & Islamic qualifications",
  },
  {
    value: 12,
    suffix: "+",
    label: "Tarbiyah Programs",
    detail: "Qur'an, Calligraphy, and Service circles",
  },
  {
    value: 100,
    suffix: "%",
    label: "Matric Pass Rate",
    detail: "Upholding high academic standards",
  },
];

const programmes = [
  {
    title: "Early Years & Foundational Qaida",
    range: "Play Group – Class II",
    description:
      "Foundational literacy and number sense combined with basic Tajweed phonics and Qaida.",
    icon: Sparkles,
    to: "/syllabus",
  },
  {
    title: "Primary & Middle School Tarbiyah",
    range: "Class III – VIII",
    description:
      "Core academic curriculum integrated with Arabic language, Seerah, and Islamic studies.",
    icon: Landmark,
    to: "/syllabus",
  },
  {
    title: "Secondary & Board Preparation",
    range: "Class IX – X",
    description:
      "Matric Science and General groups prepared with academic depth and professional ethics.",
    icon: FlaskConical,
    to: "/results",
  },
];

const journey = [
  {
    step: "Discover",
    copy: "Visit our campus and witness our Tarbiyah environment.",
    icon: Compass,
    to: "/about",
  },
  {
    step: "Apply",
    copy: "Submit the registration documents and entry assessment.",
    icon: PenLine,
    to: "/admissions",
  },
  {
    step: "Tarbiyah",
    copy: "Follow our daily curriculum of faith, knowledge, and manners.",
    icon: BookOpenCheck,
    to: "/syllabus",
  },
  {
    step: "Evaluate",
    copy: "Monitor progress in academic results and character metrics.",
    icon: Trophy,
    to: "/results",
  },
  {
    step: "Serve & Lead",
    copy: "Contribute to community welfare initiatives and student clubs.",
    icon: GraduationCap,
    to: "/students",
  },
];

const achievements = [
  {
    title: "Top Matric Board Position",
    year: "2025",
    copy: "Our student secured a high board position with distinctions in science and Islamic studies.",
    icon: Medal,
  },
  {
    title: "Provincial Husn-e-Qirat Honour",
    year: "2025",
    copy: "First place in the provincial Tajweed and Qur'anic recitation competition.",
    icon: Award,
  },
  {
    title: "Science Fair Environment Award",
    year: "2024",
    copy: "Awarded runner-up for an environmental project highlighting the Islamic value of stewardship.",
    icon: FlaskConical,
  },
];

const galleryTiles = [
  {
    label: "Qur’an Learning Sessions",
    caption: "Students developing Qur’anic knowledge and recitation skills",
    image:
      "https://images.pexels.com/photos/33451744/pexels-photo-33451744.jpeg",
  },
  {
    label: "Islamic Studies Classes",
    caption: "Interactive lessons on Islamic teachings and values",
    image:
      "https://images.pexels.com/photos/448877/pexels-photo-448877.jpeg",
  },
  {
    label: "Adab & Character Building",
    caption: "Students learning Islamic manners, respect and good character",
    image:
      "https://images.pexels.com/photos/20738436/pexels-photo-20738436.jpeg",
  },
  {
    label: "Seerat-un-Nabi ﷺ Programme",
    caption: "School gathering focused on the life and teachings of Prophet Muhammad ﷺ",
    image:
      "https://cats.edu.pk/wp-content/uploads/2025/10/SHO_6245.jpg",
  },
];

/** Eight-point star motif taken from the school crest. */
function StarMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <path
        d="M50 2 61 18 79 12 79 31 96 39 84 52 96 65 79 73 79 92 61 86 50 102 39 86 21 92 21 73 4 65 16 52 4 39 21 31 21 12 39 18Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function HomePage() {
  const [selectedTile, setSelectedTile] = useState<(typeof galleryTiles)[number] | null>(null);

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-navy text-navy-foreground">
        <StarMotif className="pointer-events-none absolute -right-24 -top-28 hidden size-[26rem] text-gold/15 sm:block" />
        <StarMotif className="pointer-events-none absolute -bottom-40 -left-32 size-[24rem] text-royal/25" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:64px_64px]"
        />
        <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <MapPin className="size-3.5" /> Premier Campus · Since {site.established}
            </p>
            <h1 className="home-hero-headline">Guiding Hearts. Inspiring Minds. Shaping Futures.</h1>
            <p className="mt-5 max-w-xl text-lg text-navy-foreground/80">
              Sirat-e-Mustaqeem Educational System provides a complete Islamic education from Play
              Group through Matriculation on one campus. We meaningfully nurture young minds through
              Qur'anic guidance, authentic Islamic knowledge, and core sciences—helping students
              grow with faith (Iman), characters (Akhlaq), academic wisdom, and life purpose.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton to="/admissions" size="lg" variant="gold">
                Admissions Procedure
              </LinkButton>
              <LinkButton
                to="/syllabus"
                size="lg"
                className="border border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10"
              >
                Tarbiyah Curriculum
              </LinkButton>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-navy-foreground/15 pt-6">
              {[
                { k: "Education Stream", v: "Play Group – Matric" },
                { k: "Tarbiyah Cap", v: "28 students" },
                { k: "Board Affiliation", v: "Board of Secondary Education" },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="text-xs uppercase tracking-[0.14em] text-navy-foreground/55">
                    {item.k}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-gold">{item.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.12} className="justify-self-center lg:justify-self-end">
            <div className="home-logo-shell relative">
              <div className="home-logo-glow" aria-hidden="true" />
              <div className="home-logo-shimmer" aria-hidden="true" />
              <div
                className="absolute inset-0 -rotate-3 rounded-2xl border border-gold/30"
                aria-hidden="true"
              />
              <img
                src={lockup}
                alt="Sirat-e-Mustaqeem Educational System crest with the motto Nurturing Faith, Knowledge, and Character"
                width={734}
                height={734}
                className="home-logo-image relative w-64 rounded-2xl border border-navy-foreground/10 shadow-raised sm:w-80 lg:w-[22rem]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust / introduction */}
      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Tarbiyah & Learning"
              title="An Islamic School Built on Knowledge, Faith & Character"
              description="Sirat-e-Mustaqeem Educational System is committed to providing children with a strong academic foundation alongside authentic Islamic education. We believe parents deserve clarity, trust, and consistency, which is why our academic planning, syllabus, assessments, and school activities are organized with transparency. From the early years through Matriculation, we nurture students with beneficial knowledge (Ilm Nafi'), Islamic values, high manners (Adab), and a sense of responsibility—preparing them to succeed in both this world and the Hereafter."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: ShieldCheck,
                  t: "Registered Campus",
                  d: "Recognised by the Sindh Education Department, offering a structured, trusted, and safe learning environment.",
                },
                {
                  icon: Target,
                  t: "Tarbiyah Calendar",
                  d: "Term plans, assessments, holidays, and spiritual assembly schedules are shared with parents in advance.",
                },
                {
                  icon: Landmark,
                  t: "One Campus Journey",
                  d: "Providing consistency from Play Group up to Matriculation, allowing steady spiritual and intellectual growth.",
                },
                {
                  icon: HeartHandshake,
                  t: "Collaborative Mentorship",
                  d: "Regular parent-teacher dialogues focus on academic achievements and the development of noble character (Akhlaq).",
                },
              ].map((item) => (
                <Panel key={item.t} interactive className="flex gap-3">
                  <item.icon className="mt-0.5 size-5 shrink-0 text-royal" />
                  <div>
                    <p className="font-semibold text-navy">{item.t}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
                  </div>
                </Panel>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Sirat-e-Mustaqeem */}
      <section className="relative section-y bg-surface overflow-hidden">
        <GoldenIslamicBackground variant="medium" />
        <div className="container-page relative z-10">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Why Choose Us"
              title="Four Commitments Behind Every School Day"
              description="Every kid is nurtured spiritually and academically, with milestones measured and shared consistently."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-lg border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-raised">
                  <StarMotif className="pointer-events-none absolute -right-8 -top-8 size-28 text-royal/5 transition-colors duration-300 group-hover:text-gold/25" />
                  <span className="relative mb-4 inline-flex size-11 items-center justify-center rounded-md bg-secondary text-royal transition-colors duration-300 group-hover:bg-navy group-hover:text-gold">
                    <item.icon className="size-5" />
                  </span>
                  <h3 className="relative text-base sm:text-lg font-bold">{item.title}</h3>
                  <p className="relative mt-2 text-sm text-muted-foreground">{item.description}</p>
                  <span
                    aria-hidden="true"
                    className="mt-5 block h-0.5 w-8 bg-gold transition-all duration-300 group-hover:w-16"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Animated statistics */}
      <section className="relative overflow-hidden bg-navy py-14 text-navy-foreground lg:py-20">
        <StarMotif className="pointer-events-none absolute -bottom-32 right-8 size-80 text-navy-foreground/5" />
        <div className="container-page relative">
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Our School in Numbers
            </p>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-navy-foreground/65">
              Reflecting our active community in the current session.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="text-center">
                <p className="font-heading text-4xl font-semibold text-gold lg:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 font-semibold">{stat.label}</p>
                <p className="mt-1 text-sm text-navy-foreground/60">{stat.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Academic highlights */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Tarbiyah Streams"
              title="Three Stages, One Continuous Journey of Faith & Knowledge"
              description="Our students transition smoothly between academic levels under unified mentorship, maintaining a strong values-driven routine."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {programmes.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <Link
                  to={p.to}
                  className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-royal/40 hover:shadow-raised"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-md bg-navy text-gold">
                    <p.icon className="size-5" />
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-royal">
                    {p.range}
                  </p>
                  <h3 className="mt-1">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                    Explore Details
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Student journey */}
      <section className="relative section-y bg-surface overflow-hidden">
        <GoldenIslamicBackground variant="medium" />
        <div className="container-page relative z-10">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Student Pathway"
              title="From First Step to Graduation with Purpose"
              description="Nurturing academic progress, Qur'anic Tajweed, and practical ethics in five steps."
            />
          </Reveal>
          <ol className="relative mt-12 grid gap-6 md:grid-cols-5">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block"
            />
            {journey.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.08}>
                <li className="relative list-none">
                  <Link to={s.to} className="group block text-center md:text-left">
                    <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-full border border-border bg-card text-royal shadow-card transition-colors duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-gold">
                      <s.icon className="size-5" />
                    </span>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Step {i + 1}
                    </p>
                    <p className="font-heading text-lg font-semibold text-navy">{s.step}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.copy}</p>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Achievement preview */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Honours & Milestones"
                title="Recent Achievements by Our Students"
                description="A selection of highlights in Qur'an, Science, and Community Service from the last two sessions."
              />
              <LinkButton to="/achievements" variant="secondary">
                View All Achievements
              </LinkButton>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {achievements.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <Panel interactive className="flex h-full flex-col border-l-4 border-l-gold">
                  <div className="flex items-center justify-between">
                    <a.icon className="size-5 text-royal" />
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {a.year}
                    </span>
                  </div>
                  <h3 className="mt-4">{a.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{a.copy}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="relative section-y bg-surface overflow-hidden">
        <GoldenIslamicBackground variant="subtle" />
        <div className="container-page relative z-10">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Campus Life Gallery"
                title="A Glimpse into Our Tarbiyah Environment"
                description="Dhikr circles, science practicals, classical calligraphy, and communal gatherings."
              />
              <LinkButton to="/gallery" variant="secondary">
                <Images className="size-4" /> Open Gallery
              </LinkButton>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryTiles.map((tile, i) => (
              <Reveal key={tile.label} delay={i * 0.07}>
                <button
                  onClick={() => setSelectedTile(tile)}
                  className="group relative block w-full aspect-[4/3] overflow-hidden rounded-lg border border-border bg-navy cursor-pointer"
                >
                  <img
                    src={tile.image}
                    alt={tile.label}
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-4 text-left">
                    <span className="block font-heading text-base font-semibold text-navy-foreground">
                      {tile.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-navy-foreground/65">
                      {tile.caption}
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          {/* Gallery Image Modal */}
          <Dialog open={selectedTile !== null} onOpenChange={(open) => !open && setSelectedTile(null)}>
            <DialogOverlay className="bg-black/80 cursor-pointer" onClick={() => setSelectedTile(null)} />
            <DialogContent className="w-11/12 max-w-4xl border-0 bg-transparent p-0 shadow-none flex items-center justify-center">
              {selectedTile && (
                <div className="relative w-full rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
                  <img
                    src={selectedTile.image}
                    alt={selectedTile.label}
                    className="w-full rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTile(null);
                    }}
                    className="absolute top-4 right-4 z-50 rounded-full bg-black/70 hover:bg-black/90 p-3 text-white hover:text-gold transition-all duration-200 hover:scale-110"
                    aria-label="Close modal"
                    type="button"
                  >
                    <X className="size-5" />
                  </button>
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-semibold text-white">
                      {selectedTile.label}
                    </h3>
                    <p className="mt-3 text-base text-gray-200">
                      {selectedTile.caption}
                    </p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Admission CTA */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-navy px-6 py-12 text-center text-navy-foreground sm:px-12 lg:py-16">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-16 top-6 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(244,203,102,0.42),rgba(244,203,102,0.18)_30%,transparent_68%)] blur-3xl opacity-80 animate-pulse" />
                <div className="absolute -right-12 bottom-2 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(244,203,102,0.38),rgba(244,203,102,0.12)_28%,transparent_70%)] blur-3xl opacity-80 animate-pulse [animation-delay:1.2s]" />
                <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 bg-[radial-gradient(circle,rgba(244,203,102,0.12),transparent_68%)] blur-2xl" />
              </div>
              <StarMotif className="pointer-events-none absolute -left-16 -top-16 size-64 text-gold/10" />
              <StarMotif className="pointer-events-none absolute -bottom-20 -right-12 size-72 text-navy-foreground/5" />
              <div className="relative mx-auto max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Enrollment Open
                </p>
                <div className="relative mt-3">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                    <div className="absolute -left-8 -top-8 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(244,203,102,0.35),rgba(244,203,102,0.12)_30%,transparent_65%)] blur-3xl opacity-70 animate-pulse" />
                    <div className="absolute -right-8 bottom-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(244,203,102,0.30),rgba(244,203,102,0.08)_28%,transparent_68%)] blur-3xl opacity-70 animate-pulse [animation-delay:1.5s]" />
                  </div>
                  <h2 className="home-cta-title relative">
                    Begin Your Child's Journey at Sirat-e-Mustaqeem
                  </h2>
                </div>
                <p className="mt-4 text-navy-foreground/75">
                  Forms for Play Group to Class VIII are issued at the school office during{" "}
                  {site.officeHours}. Admission to Class IX is verified via academic records and an
                  ethical evaluation with the section mentor.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <LinkButton to="/admissions" size="lg" variant="gold">
                    Explore Admissions
                  </LinkButton>
                  <LinkButton
                    to="/contact"
                    size="lg"
                    className="border border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10"
                  >
                    Contact the Office
                  </LinkButton>
                </div>
                <p className="mt-6 text-sm text-navy-foreground/55">{site.address}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </MainLayout>
  );
}
