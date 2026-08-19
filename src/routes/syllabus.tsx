import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  Award,
  CheckCircle2,
  ChevronDown,
  BookOpenCheck,
  HelpCircle,
  Clock,
  Calendar,
  AlertTriangle,
  Search,
  FileQuestion,
  Trophy,
  Activity,
  Heart,
  Check,
  Compass,
  Eye,
  Flag,
  HeartHandshake,
  Target,
  Shield,
  Scale,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MainLayout } from "../layouts/MainLayout";
import { PageHeader } from "../components/common/PageHeader";
import { SectionHeading } from "../components/common/SectionHeading";
import { Panel, InfoCard } from "../components/common/Card";
import { Reveal } from "../components/common/Reveal";
import { GoldenIslamicBackground } from "../components/effects/GoldenIslamicBackground";
import { StarMotif } from "../components/common/StarMotif";
import { LinkButton, Button } from "../components/common/Button";
import { Counter } from "../components/common/Counter";
import { cn } from "../utilities/cn";

// Data Imports
import { syllabusLevels, type SyllabusLevel } from "../data/syllabus";
import { searchByRollNumber } from "../lib/results";
import type { StudentResult } from "../types/results";
import {
  learningExperience,
  academicActivities,
  extracurricular,
  developmentSkills,
  studentEvents,
  studentJourney,
} from "../data/students";
import { achievementCategories, achievementYears, achievements } from "../data/achievements";
import { categoryIcons } from "../components/achievements/AchievementCard";
import { coreValues, missionCommitments, visionMilestones } from "../data/mission-vision";

const title = "Tarbiyah & Academics";
const description =
  "Discover Sirat-e-Mustaqeem's structured curriculum blending scientific exploration, Qur'anic literacy (Tajweed), manners (Adab), and core board preparation.";

export const Route = createFileRoute("/syllabus")({
  head: () => ({
    meta: [
      { title: `${title} | Sirat-e-Mustaqeem Educational System` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Sirat-e-Mustaqeem Educational System` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TarbiyahAcademicsPage,
});

// Interactive Growth Areas
const growthPathway = [
  {
    area: "Qur'an",
    desc: "Basic Nazra Qur'an reading, recognition of letters, and building a spiritual connection from the early years.",
    details: "Students begin with Juz Amma recitation and progress daily in the morning assembly.",
    icon: BookOpen,
  },
  {
    area: "Tajweed",
    desc: "Advanced phonetical rule implementation, correct articulation points (Makharij), and beautiful modulation.",
    details:
      "Evaluated twice per term by certified Qaris to maintain provincial-level recitation standards.",
    icon: Sparkles,
  },
  {
    area: "Islamic Studies",
    desc: "Seerah research projects, learning practical daily ethics, memorising masnoon supplications, and Aqeedah studies.",
    details: "Bridging classrooms and homes through interactive diaries and character worksheets.",
    icon: Heart,
  },
  {
    area: "Academic Excellence",
    desc: "Karachi Board curriculum sciences, practical laboratory logs, and structured mathematics concepts.",
    details:
      "Small class sizes (capped at 28) enable active mentorship and outstanding Board positions.",
    icon: Award,
  },
  {
    area: "Character & Tarbiyah",
    desc: "Embodying the Sunnah, practice of respect (Adab), community service initiatives, and leadership habits.",
    details:
      "Focusing on Amanah, Sabr, and Khidmat to graduate well-rounded contributors to society.",
    icon: HeartHandshake,
  },
];

function TarbiyahAcademicsPage() {
  const reduced = useReducedMotion();

  // Scroll hash handler to offset sticky header
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          setTimeout(() => {
            const navbarOffset = 90; // Adjust for sticky header height
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: elementPosition - navbarOffset,
              behavior: "smooth",
            });
          }, 100);
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // 1. Syllabus State
  const [activeLevel, setActiveLevel] = useState<SyllabusLevel>("Primary");
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const currentLevelData = syllabusLevels.find((l) => l.level === activeLevel)!;

  // 2. Schedule State
  const [activeScheduleTab, setActiveScheduleTab] = useState<"daily" | "calendar">("daily");

  // 3. Evaluations (Results) State
  const [query, setQuery] = useState("");
  const [resultStatus, setResultStatus] = useState<
    "idle" | "searching" | "found" | "not-found" | "empty"
  >("idle");
  const [resultData, setResultData] = useState<StudentResult | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runResultSearch = useCallback((rollNumber: string) => {
    const trimmed = rollNumber.trim();
    if (!trimmed) {
      setResultStatus("empty");
      setResultData(null);
      return;
    }
    setResultStatus("searching");
    setResultData(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const found = searchByRollNumber(trimmed);
      if (found) {
        setResultData(found);
        setResultStatus("found");
      } else {
        setResultStatus("not-found");
      }
    }, 450);
  }, []);

  // 4. Achievements State
  const [achFilter, setAchFilter] = useState<string>("All");
  const [activeAchYear, setActiveAchYear] = useState<number>(achievementYears[0] ?? 2025);
  const filteredAchievements = useMemo(() => {
    return achFilter === "All"
      ? achievements
      : achievements.filter((a) => a.category === achFilter);
  }, [achFilter]);

  // 5. Growth Journey Interactive State
  const [activeGrowthIndex, setActiveGrowthIndex] = useState<number>(0);

  return (
    <MainLayout>
      <PageHeader eyebrow="Sirat-e-Mustaqeem" title={title} description={description} />

      {/* ================= SYLLABUS SECTION ================= */}
      <section
        id="syllabus"
        className="relative overflow-hidden section-y border-b border-border scroll-mt-24"
      >
        <GoldenIslamicBackground variant="subtle" />
        <div className="container-page relative z-10">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Section 1: Syllabus"
              title="A Unified Approach to Science and Revelation"
              description="Explore class subject lists, prescribed reference textbooks, term-wise topic breakdowns, and assessments."
            />
          </Reveal>

          {/* Custom Modern Tabs */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-card">
              {(["Primary", "Middle", "Secondary"] as SyllabusLevel[]).map((level) => {
                const active = activeLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => {
                      setActiveLevel(level);
                      setExpandedSubject(null);
                    }}
                    aria-pressed={active}
                    className={cn(
                      "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer",
                      active
                        ? "bg-navy text-navy-foreground shadow-md"
                        : "text-muted-foreground hover:text-navy",
                    )}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level Overview Block */}
          <Reveal delay={0.08} className="mt-10 max-w-4xl mx-auto">
            <Panel className="relative overflow-hidden border-t-4 border-t-gold bg-gradient-to-br from-card via-card to-secondary/30">
              <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-royal">
                    {currentLevelData.classes}
                  </span>
                  <h2 className="mt-2 text-2xl font-bold text-navy">
                    {currentLevelData.level} Wing Overview
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {currentLevelData.intro}
                  </p>
                </div>
                <div className="rounded-lg border border-gold/20 bg-gold/5 p-5 text-center">
                  <BookOpen className="mx-auto size-8 text-gold" />
                  <p className="mt-3 font-heading text-lg font-semibold text-navy">
                    {currentLevelData.subjects.length} Subjects
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Fully documented syllabus
                  </p>
                </div>
              </div>
            </Panel>
          </Reveal>

          {/* Accordions for Subjects */}
          <div className="mt-10 max-w-4xl mx-auto space-y-4">
            {currentLevelData.subjects.map((subj, idx) => {
              const isOpen = expandedSubject === subj.id;
              return (
                <Reveal key={subj.id} delay={idx * 0.05}>
                  <div
                    className={cn(
                      "rounded-lg border bg-card transition-all duration-300 shadow-card",
                      isOpen ? "border-royal/50 ring-1 ring-royal/20" : "border-border",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedSubject(isOpen ? null : subj.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between p-5 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-royal">
                          <BookOpenCheck className="size-5" />
                        </span>
                        <div>
                          <h3 className="text-base font-bold text-navy">{subj.name}</h3>
                          <p className="text-xs text-muted-foreground">{subj.summary}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="hidden text-xs font-medium text-muted-foreground sm:inline-block">
                          {subj.periodsPerWeek} periods/week
                        </span>
                        <ChevronDown
                          className={cn(
                            "size-5 text-muted-foreground transition-transform duration-300",
                            isOpen && "rotate-180 text-royal",
                          )}
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-border bg-surface/50 p-5 animate-in fade-in duration-300">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-md bg-card p-4 border border-border">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                              Prescribed Textbook
                            </span>
                            <p className="mt-1 text-sm font-semibold text-navy">{subj.textbook}</p>
                          </div>
                          <div className="rounded-md bg-card p-4 border border-border">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                              Class Periods Allocation
                            </span>
                            <p className="mt-1 text-sm font-semibold text-navy">
                              {subj.periodsPerWeek} Periods per working week
                            </p>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="text-xs uppercase font-bold tracking-wider text-royal mb-3">
                            Term-wise Topic Breakdowns
                          </h4>
                          <div className="grid gap-4 sm:grid-cols-2">
                            {subj.units.map((unit) => (
                              <div
                                key={unit.term}
                                className="rounded-md border border-gold/10 bg-card p-4 shadow-sm"
                              >
                                <p className="font-heading text-sm font-bold text-gold border-b border-border pb-1.5 mb-2.5">
                                  {unit.term}
                                </p>
                                <ul className="space-y-2">
                                  {unit.topics.map((topic) => (
                                    <li
                                      key={topic}
                                      className="flex items-start gap-2 text-xs text-muted-foreground"
                                    >
                                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-royal" />
                                      <span>{topic}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 rounded-md bg-navy/5 border border-navy/10 p-4 flex gap-3">
                          <HelpCircle className="size-5 shrink-0 text-royal mt-0.5" />
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-navy">
                              Assessment & Grading Policy
                            </span>
                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                              {subj.assessment}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SCHEDULE SECTION ================= */}
      <section
        id="schedule"
        className="relative overflow-hidden section-y bg-surface border-b border-border scroll-mt-24"
      >
        <div className="container-page relative z-10 max-w-4xl">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Section 2: Daily Timetable & Calendar"
              title="Structured Schedules for Learning & Worship"
              description="Check our daily block timings, recess breaks, assembly parameters, and major terminal events."
            />
          </Reveal>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-card">
              <button
                type="button"
                onClick={() => setActiveScheduleTab("daily")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer",
                  activeScheduleTab === "daily"
                    ? "bg-navy text-navy-foreground shadow-md"
                    : "text-muted-foreground hover:text-navy",
                )}
              >
                Daily Timings
              </button>
              <button
                type="button"
                onClick={() => setActiveScheduleTab("calendar")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer",
                  activeScheduleTab === "calendar"
                    ? "bg-navy text-navy-foreground shadow-md"
                    : "text-muted-foreground hover:text-navy",
                )}
              >
                Academic Calendar
              </button>
            </div>
          </div>

          {activeScheduleTab === "daily" ? (
            <div className="relative mt-12 pl-6 sm:pl-10">
              <span
                aria-hidden="true"
                className="absolute left-[1.4rem] top-2 bottom-2 w-0.5 bg-gold/30 sm:left-[2.1rem]"
              />
              <div className="space-y-6">
                {[
                  {
                    title: "Morning Dhikr & Assembly",
                    time: "08:00 AM – 08:20 AM",
                    desc: "Quran recitation, translation, and daily character guidance circles.",
                  },
                  {
                    title: "Nazra & Tajweed Circle",
                    time: "08:20 AM – 09:00 AM",
                    desc: "Arabic pronunciation makharij drills in groups.",
                  },
                  {
                    title: "Core Academic Periods",
                    time: "09:00 AM – 10:20 AM",
                    desc: "Scientific concepts, lab experimentation, or english grammar modules.",
                  },
                  {
                    title: "Interval Recess",
                    time: "10:20 AM – 10:45 AM",
                    desc: "Lunch and social interactions supporting Ukhuwwah principles.",
                  },
                  {
                    title: "Further Lectures",
                    time: "10:45 AM – 12:45 PM",
                    desc: "Urdu Literature, Calligraphy, Computer design, or General Studies.",
                  },
                  {
                    title: "Zuhr Congregational Salah",
                    time: "12:45 PM – 01:15 PM",
                    desc: "Wudhu routine and Zuhr prayer in the designated school assembly hall.",
                  },
                  {
                    title: "Evaluation & Dismissal",
                    time: "01:15 PM – 02:00 PM",
                    desc: "Homework logger diary marking and clean-up duties before home.",
                  },
                ].map((timing, idx) => (
                  <Reveal key={timing.title} delay={idx * 0.05}>
                    <div className="relative flex gap-6 sm:gap-10">
                      <span className="absolute -left-[1.7rem] top-1.5 z-10 flex size-6 items-center justify-center rounded-full border border-gold bg-card text-gold sm:-left-[2.6rem] sm:size-10">
                        <Clock className="size-3.5 sm:size-5" />
                      </span>
                      <div className="flex-1 rounded-lg border border-border bg-card p-4 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
                          <h3 className="text-base font-bold text-navy">{timing.title}</h3>
                          <span className="text-xs font-bold text-gold">{timing.time}</span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">{timing.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-10">
              <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-card">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-navy text-navy-foreground text-xs uppercase tracking-wider">
                      <th className="p-4">Date</th>
                      <th className="p-4">Event</th>
                      <th className="p-4">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-xs text-foreground">
                    {[
                      {
                        date: "August 18, 2026",
                        event: "First Term Commencement",
                        remarks: "Orientation and syllabus folders distribution.",
                      },
                      {
                        date: "September 15, 2026",
                        event: "Seerat-un-Nabi ﷺ Day",
                        remarks: "Qirat assemblies, Naat reciting, and character trophies.",
                      },
                      {
                        date: "October 10, 2026",
                        event: "Mid-Term Evaluations",
                        remarks: "Detailed monthly progress testing worksheets.",
                      },
                      {
                        date: "November 05, 2026",
                        event: "Parent-Teacher Dialogue Circle",
                        remarks: "Individual discussion of academic and spiritual markers.",
                      },
                      {
                        date: "December 15–24, 2026",
                        event: "Terminal Exams",
                        remarks: "First term comprehensive examination papers.",
                      },
                    ].map((item, idx) => (
                      <tr key={idx} className="hover:bg-secondary/25 transition-colors">
                        <td className="p-4 font-semibold text-navy whitespace-nowrap">
                          {item.date}
                        </td>
                        <td className="p-4 font-semibold text-royal">{item.event}</td>
                        <td className="p-4 text-muted-foreground">{item.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex gap-3 rounded-lg border border-gold/20 bg-gold/5 p-4 text-xs text-amber-900">
                <AlertTriangle className="size-4 shrink-0 text-gold mt-0.5" />
                <p>
                  Lunar schedules (Ramadan, Eid) depend entirely on local sighting announcements.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= RESULTS / EVALUATION SECTION ================= */}
      <section
        id="results"
        className="relative overflow-hidden section-y border-b border-border scroll-mt-24"
      >
        <GoldenIslamicBackground variant="medium" />
        <div className="container-page relative z-10 max-w-3xl">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Section 3: Evaluations"
              title="Official Result Registry & Card Query"
              description="Access terminal examination rankings, percentage markings, and student profiles using roll numbers."
            />
          </Reveal>

          <Panel className="mt-10 overflow-hidden">
            <div className="border-b border-border bg-surface px-6 py-5">
              <h2 className="text-lg">Online Student Report Finder</h2>
              <p className="text-xs text-muted-foreground">
                Type the student roll number issued on the official admit card.
              </p>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  placeholder="e.g. 2025-101"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-royal"
                />
                <Button onClick={() => runResultSearch(query)} className="min-w-[8rem]">
                  <Search className="size-4" /> Search
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-muted-foreground">Sample values:</span>
                {["2025-101", "2025-103", "2025-202"].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setQuery(val);
                      runResultSearch(val);
                    }}
                    className="rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] text-foreground hover:bg-secondary"
                  >
                    {val}
                  </button>
                ))}
              </div>

              {resultStatus === "empty" && (
                <p className="mt-3 text-xs text-destructive">Please type a valid roll number.</p>
              )}
              {resultStatus === "searching" && (
                <div className="mt-6 text-center py-6">
                  <div className="inline-block size-6 animate-spin rounded-full border-2 border-border border-t-royal" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Searching student databases...
                  </p>
                </div>
              )}
              {resultStatus === "not-found" && (
                <div className="mt-6 rounded-lg border border-dashed border-border p-6 text-center">
                  <FileQuestion className="mx-auto size-8 text-muted-foreground" />
                  <p className="mt-2 text-xs font-semibold text-navy">
                    No records matches roll number "{query}"
                  </p>
                </div>
              )}

              {resultStatus === "found" && resultData && (
                <div className="mt-6 rounded-lg border border-border bg-card p-5 animate-in fade-in duration-300">
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-between border-b border-border pb-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-royal">
                        {resultData.className} · Session {resultData.session}
                      </p>
                      <h3 className="text-lg font-bold text-navy mt-1">{resultData.studentName}</h3>
                      <p className="text-xs text-muted-foreground">
                        Roll Number:{" "}
                        <span className="font-semibold text-foreground">
                          {resultData.rollNumber}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-navy px-3 py-1.5 rounded-md text-navy-foreground text-center">
                        <span className="text-[8px] uppercase tracking-wider text-gold">Grade</span>
                        <p className="text-base font-bold">{resultData.grade}</p>
                      </div>
                      <div className="bg-surface px-3 py-1.5 rounded-md text-navy text-center">
                        <span className="text-[8px] uppercase tracking-wider text-muted-foreground">
                          Percentage
                        </span>
                        <p className="text-base font-bold">{resultData.percentage}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-navy mb-2">
                      Subject Performance Matrix
                    </h4>
                    <div className="space-y-3">
                      {resultData.subjects.map((subj) => {
                        const pct = (subj.obtainedMarks / subj.totalMarks) * 100;
                        const barColor =
                          pct >= 80 ? "bg-gold" : pct >= 60 ? "bg-royal" : "bg-destructive";
                        return (
                          <div
                            key={subj.name}
                            className="grid grid-cols-[1fr_6rem] items-center gap-2 text-xs"
                          >
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="font-semibold text-navy">{subj.name}</span>
                                <span className="text-muted-foreground">
                                  {subj.obtainedMarks} / {subj.totalMarks}
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                  className={cn("h-full rounded-full", barColor)}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-right font-bold text-navy">
                              {pct.toFixed(1)}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Panel>
        </div>
      </section>

      {/* ================= INTERACTIVE STUDENT GROWTH PATHWAY ================= */}
      <section className="relative overflow-hidden section-y bg-navy text-navy-foreground">
        <StarMotif className="pointer-events-none absolute -right-20 -top-20 size-80 text-gold/10" />
        <div className="container-page relative z-10 max-w-5xl">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Tarbiyah In Practice"
              title="Student Growth & Learning Journey"
              description="Click each milestone below to explore how a student progresses from early childhood recitation up to moral maturity."
              className="mb-10 text-navy-foreground"
            />
          </Reveal>

          {/* Path timeline buttons */}
          <div className="relative mt-8">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-navy-foreground/15 -translate-y-1/2 hidden md:block" />
            {/* Horizontal Pathway line filling */}
            <div
              className="absolute top-1/2 left-0 h-1 bg-gold -translate-y-1/2 hidden md:block transition-all duration-500"
              style={{ width: `${(activeGrowthIndex / (growthPathway.length - 1)) * 100}%` }}
            />

            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6 md:gap-0">
              {growthPathway.map((item, index) => {
                const isActive = activeGrowthIndex === index;
                const isPassed = index < activeGrowthIndex;
                const Icon = item.icon;
                return (
                  <div key={item.area} className="flex flex-col items-center flex-1">
                    <button
                      type="button"
                      onClick={() => setActiveGrowthIndex(index)}
                      className={cn(
                        "size-12 rounded-full border-2 bg-navy flex items-center justify-center transition-all duration-300 cursor-pointer",
                        isActive
                          ? "border-gold bg-gold text-navy-foreground scale-110 shadow-lg"
                          : isPassed
                            ? "border-gold/75 bg-navy text-gold"
                            : "border-navy-foreground/30 text-navy-foreground/60",
                      )}
                      aria-label={`Milestone: ${item.area}`}
                    >
                      <Icon className="size-5" />
                    </button>
                    <span
                      className={cn(
                        "mt-2 text-xs font-semibold tracking-wider uppercase",
                        isActive ? "text-gold font-bold" : "text-navy-foreground/60",
                      )}
                    >
                      {item.area}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details container with animations */}
          <div className="mt-10 max-w-2xl mx-auto bg-navy-foreground/5 border border-navy-foreground/10 rounded-xl p-6 min-h-[180px] flex flex-col justify-center animate-in fade-in duration-300">
            <p className="text-xs uppercase font-bold tracking-widest text-gold mb-1">
              Journey Stage {activeGrowthIndex + 1}: {growthPathway[activeGrowthIndex]?.area || ""} Program
            </p>
            <h3 className="text-xl font-bold text-navy-foreground">
              {growthPathway[activeGrowthIndex]?.area || ""} Development
            </h3>
            <p className="mt-3 text-sm text-navy-foreground/80 leading-relaxed">
              {growthPathway[activeGrowthIndex]?.desc || ""}
            </p>
            <p className="mt-3 text-xs text-gold/80 italic">
              * {growthPathway[activeGrowthIndex]?.details || ""}
            </p>
          </div>
        </div>
      </section>

      {/* ================= STUDENTS SECTION ================= */}
      <section
        id="students"
        className="relative overflow-hidden section-y border-b border-border scroll-mt-24"
      >
        <div className="container-page relative z-10 max-w-5xl">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Section 4: Student Life"
              title="Daily Life & Tarbiyah Pursuits"
              description="Learn about our student assembly habits, calligraphy societies, sportsmanship tournaments, and house rules."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Morning Assembly",
                copy: "Dhikr, recitation, and ethical lessons starting the day in remembrance.",
                icon: Clock,
              },
              {
                label: "Tajweed Circles",
                copy: "Small peer coaching sessions correcting letter articulation (Makharij).",
                icon: Sparkles,
              },
              {
                label: "Calligraphy Club",
                copy: "Traditional Naskh and Thuluth arts decoration post workshops.",
                icon: BookOpenCheck,
              },
              {
                label: "Sportsmanship",
                copy: "Cricket leagues prioritizing behavior metrics and team integrity.",
                icon: Trophy,
              },
            ].map((cell, idx) => (
              <Reveal key={cell.label} delay={idx * 0.06}>
                <Panel
                  interactive
                  className="h-full border-t-2 border-t-gold text-center flex flex-col items-center"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-secondary text-royal mb-4">
                    <cell.icon className="size-5" />
                  </span>
                  <h3 className="text-base font-bold text-navy">{cell.label}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{cell.copy}</p>
                </Panel>
              </Reveal>
            ))}
          </div>

          {/* Stepper learning pathway milestones */}
          <div className="mt-12 max-w-3xl mx-auto rounded-lg border border-border p-6 bg-card">
            <h3 className="text-lg font-bold text-navy border-b border-border pb-2.5 mb-4">
              Six Core Character Virtues Required
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 text-xs text-muted-foreground">
              {[
                {
                  title: "Manners & Respect (Adab)",
                  desc: "Showing proper conduct towards guides, class scholars, and pages.",
                },
                {
                  title: "Trusteeship (Amanah)",
                  desc: "Absolute academic honesty in examinations and home essays.",
                },
                {
                  title: "Compassion (Rahmah)",
                  desc: "Coaching juniors and supporting classmates who struggle.",
                },
                {
                  title: "Steadfastness (Istiqamah)",
                  desc: "Punctual arrivals and daily congregational prayer routines.",
                },
                {
                  title: "Service (Khidmat)",
                  desc: "Campus cleanup circles and local charity collection drives.",
                },
                {
                  title: "Reflection (Tafakkur)",
                  desc: "Analyzing scientific proofs with logic aligned with revelations.",
                },
              ].map((virtue) => (
                <div key={virtue.title} className="flex gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-royal mt-0.5" />
                  <div>
                    <strong className="text-navy block">{virtue.title}</strong>
                    <p className="mt-0.5">{virtue.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACHIEVEMENTS SECTION ================= */}
      <section
        id="achievements"
        className="relative overflow-hidden section-y bg-surface border-b border-border scroll-mt-24"
      >
        <StarMotif className="pointer-events-none absolute -left-20 bottom-10 size-80 text-royal/5" />
        <div className="container-page relative z-10 max-w-5xl">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Section 5: Achievements"
              title="Milestones of Academic & Qur'anic Excellence"
              description="A record of top board ranks, provincial Qirat honors, and Sadaqah community achievements."
            />
          </Reveal>

          {/* Categories Filtering buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["All", ...achievementCategories].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setAchFilter(cat)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold border transition-all cursor-pointer",
                  achFilter === cat
                    ? "bg-navy text-navy-foreground border-navy"
                    : "bg-card text-muted-foreground border-border hover:border-royal",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.slice(0, 6).map((item, idx) => {
              const Icon = categoryIcons[item.category] || Trophy;
              return (
                <Reveal key={item.id} delay={idx * 0.05}>
                  <Panel
                    interactive
                    className="h-full flex flex-col justify-between border-t-2 border-t-transparent hover:border-t-gold"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="inline-flex size-9 items-center justify-center rounded bg-secondary text-royal">
                          <Icon className="size-4" />
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">
                          {item.year}
                        </span>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-royal font-bold">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold text-navy mt-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                        {item.person}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">{item.description}</p>
                    </div>
                    {item.metric && (
                      <p className="mt-4 text-xs font-bold text-navy bg-gold/15 px-2.5 py-1 rounded inline-flex w-fit items-center gap-1">
                        <Trophy className="size-3.5 text-gold" /> {item.metric}
                      </p>
                    )}
                  </Panel>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION SECTION ================= */}
      <section
        id="mission-vision"
        className="relative overflow-hidden section-y border-b border-border scroll-mt-24"
      >
        <GoldenIslamicBackground variant="subtle" />
        <div className="container-page relative z-10 max-w-5xl">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Section 6: Guiding Principles"
              title="Mission, Vision & Spiritual Goals"
              description="Learn about our fundamental targets to build faith, expand Hifz study opportunities, and serve local community sectors."
            />
          </Reveal>

          {/* Split Content / Alternate layouts */}
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <Panel className="border-l-4 border-l-gold h-full bg-card">
                <span className="text-xs uppercase font-bold tracking-widest text-gold block mb-2">
                  Our Mission Commitments
                </span>
                <h3 className="text-xl font-bold text-navy mb-4">Inspiring Faith & Mind</h3>
                <ul className="space-y-3.5 text-xs text-muted-foreground">
                  {missionCommitments.map((com) => (
                    <li key={com.title} className="flex gap-2">
                      <Check className="size-4 shrink-0 text-gold mt-0.5" />
                      <div>
                        <strong className="text-navy">{com.title}</strong> — {com.body}
                      </div>
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>

            <Reveal delay={0.08}>
              <Panel className="border-l-4 border-l-royal h-full bg-card">
                <span className="text-xs uppercase font-bold tracking-widest text-royal block mb-2">
                  Our Vision Milestones
                </span>
                <h3 className="text-xl font-bold text-navy mb-4">Mapping Our Progression</h3>
                <div className="space-y-4">
                  {visionMilestones.map((mile) => (
                    <div
                      key={mile.year}
                      className="border-b border-border pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="text-[10px] font-bold text-gold bg-gold/5 px-2 py-0.5 rounded border border-gold/15">
                        {mile.year}
                      </span>
                      <strong className="text-navy block mt-1.5 text-xs">{mile.title}</strong>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{mile.body}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= POLICIES SECTION ================= */}
      <section
        id="policies"
        className="relative overflow-hidden section-y bg-surface border-b border-border scroll-mt-24"
      >
        <div className="container-page relative z-10 max-w-5xl">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Section 7: Regulations"
              title="Official Rules & Safeguarding Standards"
              description="Learn about dress codes, corrective discipline routines, and parent tuition guidelines."
            />
          </Reveal>

          {/* Comparison table / card styles */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <Panel className="bg-card h-full">
                <h3 className="text-base font-bold text-navy border-b border-border pb-2 mb-3">
                  Male Student Uniform
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[9px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">
                      Allowed
                    </span>
                    <p className="mt-1 text-muted-foreground">
                      Off-white Shalwar Qameez, Navy blue waistcoat, neat short haircuts, black
                      shoes.
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-destructive bg-destructive/5 border border-destructive/10 px-2 py-0.5 rounded">
                      Not Allowed
                    </span>
                    <p className="mt-1 text-muted-foreground">
                      Jeans, graphic shirts, hair gel shapes, wrist straps, or gold chains.
                    </p>
                  </div>
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={0.08}>
              <Panel className="bg-card h-full">
                <h3 className="text-base font-bold text-navy border-b border-border pb-2 mb-3">
                  Female Student Uniform
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[9px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">
                      Allowed
                    </span>
                    <p className="mt-1 text-muted-foreground">
                      White Shalwar Qameez, Green Sash/Dopatta, plain white head scarf, neat black
                      shoes.
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-destructive bg-destructive/5 border border-destructive/10 px-2 py-0.5 rounded">
                      Not Allowed
                    </span>
                    <p className="mt-1 text-muted-foreground">
                      Makeup, jewelry, open nail paint, high heels, or complex colored pins.
                    </p>
                  </div>
                </div>
              </Panel>
            </Reveal>
          </div>

          <div className="mt-6 rounded-lg bg-navy/5 border border-navy/10 p-5 text-xs text-muted-foreground max-w-3xl mx-auto flex gap-3">
            <Shield className="size-5 shrink-0 text-royal mt-0.5" />
            <div>
              <strong className="text-navy block mb-1">Campus Safety & Zero Bullying Policy</strong>
              All class blocks operate under constant supervision. Physical altercations or
              behavioral violations lead directly to warning diary marks, PTM assemblies, or
              registration probations.
            </div>
          </div>
        </div>
      </section>

      {/* Quote Block CTA */}
      <section className="mb-8 section-y bg-navy text-navy-foreground relative overflow-hidden">
        <StarMotif className="pointer-events-none absolute -bottom-32 left-8 size-80 text-navy-foreground/5" />
        <div className="container-page relative z-10 max-w-3xl text-center">
          <Reveal>
            <p className="font-heading text-xl italic text-gold">
              &ldquo;Establish prayers and hold fast to the rope of Allah.&rdquo;
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-navy-foreground/75">
              — Foundation of Tarbiyah Leadership
            </p>
            <p className="mt-5 text-sm text-navy-foreground/80 leading-relaxed">
              Become a part of our community. Submit enrollment worksheets, schedule orientation
              visits, or discuss intermediate career routes with our advisors today.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <LinkButton to="/admissions" variant="gold">
                Enrollment Procedure
              </LinkButton>
              <LinkButton
                to="/contact"
                className="border border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10"
              >
                Contact Mentors
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </MainLayout>
  );
}
