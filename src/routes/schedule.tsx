import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock, AlertTriangle, HelpCircle, CheckSquare } from "lucide-react";
import { MainLayout } from "../layouts/MainLayout";
import { PageHeader } from "../components/common/PageHeader";
import { SectionHeading } from "../components/common/SectionHeading";
import { Panel } from "../components/common/Card";
import { Reveal } from "../components/common/Reveal";
import { StarMotif } from "../components/common/StarMotif";
import { GoldenIslamicBackground } from "../components/effects/GoldenIslamicBackground";
import { LinkButton } from "../components/common/Button";
import { cn } from "../utilities/cn";

const title = "Calendar & Schedule";
const description =
  "Daily block schedules, prayer timings, term dates, and parent-teacher meeting schedules for the current academic session.";

export const Route = createFileRoute("/schedule")({
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
  component: SchedulePage,
});

// Daily Timetable Data
const classTimings = [
  { activity: "Morning Assembly & Dhikr", time: "08:00 AM – 08:20 AM", desc: "Starting the day in remembrance of Allah, recitation of Surah Yaseen / Morning Adhkar." },
  { activity: "Qur'an & Tajweed Circle", time: "08:20 AM – 09:00 AM", desc: "Nazra recitation, makharij correction, and memorisation (Hifz) circles." },
  { activity: "Academic Period 1", time: "09:00 AM – 09:40 AM", desc: "Core sciences or mathematics lectures." },
  { activity: "Academic Period 2", time: "09:40 AM – 10:20 AM", desc: "English language study, phonics and grammar drills." },
  { activity: "Recess (Interval)", time: "10:20 AM – 10:45 AM", desc: "Healthy lunch break and social Ukhuwwah interaction." },
  { activity: "Academic Period 3", time: "10:45 AM – 11:25 AM", desc: "Urdu literature, calligraphy practice, or computer lab." },
  { activity: "Academic Period 4", time: "11:25 AM – 12:05 PM", desc: "General science, laboratory experiment hours." },
  { activity: "Academic Period 5", time: "12:05 PM – 12:45 PM", desc: "Islamic history, Seerah studies, or moral education." },
  { activity: "Zuhr Prayer preparation & Salah", time: "12:45 PM – 01:15 PM", desc: "Wudhu routine, Adhan, and congregational Zuhr prayer in the school hall." },
  { activity: "Revision & Character Circle", time: "01:15 PM – 02:00 PM", desc: "Daily evaluation, homework diary logging, and Adab assembly before home." },
];

// Academic Calendar Events
const calendarEvents = [
  { date: "August 18, 2026", event: "First Term Commencement", status: "Upcoming", details: "Orientation and syllabus distribution for classes Play Group to X." },
  { date: "September 15, 2026", event: "Seerat-un-Nabi ﷺ Day", status: "Special Program", details: "Annual Seerah contest, Husn-e-Naat reciting, and character awards." },
  { date: "October 10, 2026", event: "First Mid-Term Evaluations", status: "Examinations", details: "Week-long monthly assessments checking academic progression." },
  { date: "November 05, 2026", event: "Parent-Teacher Dialogue Circle", status: "PTM", details: "Detailed review of academic sheets and character/spiritual checkups." },
  { date: "December 15–24, 2026", event: "First Term Terminal Exams", status: "Examinations", details: "Comprehensive mid-year examinations testing term modules." },
  { date: "December 25 – Jan 05, 2027", event: "Winter Recess Vacation", status: "Holidays", details: "School closes for winter holidays. Reopens on January 6, 2027." },
];

function SchedulePage() {
  const [activeTab, setActiveTab] = useState<"daily" | "calendar">("daily");

  return (
    <MainLayout>
      <PageHeader eyebrow="Tarbiyah & Academics" title={title} description={description} />

      {/* Tabs Selector */}
      <section className="relative overflow-hidden pt-12 pb-6">
        <GoldenIslamicBackground variant="subtle" />
        <div className="container-page relative z-10 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-card">
            <button
              onClick={() => setActiveTab("daily")}
              className={cn(
                "rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer",
                activeTab === "daily" ? "bg-navy text-navy-foreground shadow-md" : "text-muted-foreground hover:text-navy"
              )}
            >
              Daily School Timings
            </button>
            <button
              onClick={() => setActiveTab("calendar")}
              className={cn(
                "rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer",
                activeTab === "calendar" ? "bg-navy text-navy-foreground shadow-md" : "text-muted-foreground hover:text-navy"
              )}
            >
              Academic Calendar Events
            </button>
          </div>
        </div>
      </section>

      {/* Tab 1: Daily Timings using a vertical Timeline UI */}
      {activeTab === "daily" && (
        <section className="section-y bg-surface relative overflow-hidden">
          <div className="container-page relative z-10 max-w-4xl">
            <Reveal>
              <SectionHeading
                align="center"
                eyebrow="Daily Routine"
                title="A Structured Day Centered Around Prayer & Knowledge"
                description="Our school timings are designed to balance core scientific topics, Arabic studies, and communal Zuhr prayer."
              />
            </Reveal>

            {/* Timeline UI */}
            <div className="relative mt-12 pl-6 sm:pl-10">
              <span
                aria-hidden="true"
                className="absolute left-[1.4rem] top-2 bottom-2 w-0.5 bg-gold/30 sm:left-[2.1rem]"
              />
              <div className="space-y-8">
                {classTimings.map((timing, idx) => (
                  <Reveal key={timing.activity} delay={idx * 0.05}>
                    <div className="relative flex gap-6 sm:gap-10">
                      {/* Timeline dot */}
                      <span className="absolute -left-[1.7rem] top-1.5 z-10 flex size-6 items-center justify-center rounded-full border border-gold bg-card text-gold sm:-left-[2.6rem] sm:size-10">
                        <Clock className="size-3.5 sm:size-5" />
                      </span>
                      <div className="flex-1 rounded-lg border border-border bg-card p-5 shadow-card hover:border-gold/30 transition-colors">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
                          <h3 className="text-base font-bold text-navy">{timing.activity}</h3>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-gold bg-gold/5 px-2.5 py-1 rounded-md border border-gold/10">
                            {timing.time}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{timing.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab 2: Academic Calendar Events using a Table and Highlights */}
      {activeTab === "calendar" && (
        <section className="section-y bg-surface relative overflow-hidden">
          <div className="container-page relative z-10 max-w-5xl">
            <Reveal>
              <SectionHeading
                align="center"
                eyebrow="Key Dates"
                title="Academic Session Calendar"
                description="Keep track of terminal examination schedules, monthly assessments, and national holidays."
              />
            </Reveal>

            {/* Responsive Table Layout */}
            <Reveal delay={0.06} className="mt-10">
              <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-card">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-navy text-navy-foreground text-xs uppercase tracking-wider">
                      <th className="p-4 sm:p-5">Date</th>
                      <th className="p-4 sm:p-5">Academic Event / Program</th>
                      <th className="p-4 sm:p-5">Category</th>
                      <th className="p-4 sm:p-5">Remarks / Scope</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm text-foreground">
                    {calendarEvents.map((event) => (
                      <tr key={event.event} className="hover:bg-secondary/25 transition-colors">
                        <td className="p-4 sm:p-5 font-semibold text-navy whitespace-nowrap">{event.date}</td>
                        <td className="p-4 sm:p-5 font-semibold text-royal">{event.event}</td>
                        <td className="p-4 sm:p-5">
                          <span
                            className={cn(
                              "inline-block rounded-full px-2.5 py-1 text-xs font-semibold",
                              event.status === "Examinations" && "bg-destructive/10 text-destructive border border-destructive/20",
                              event.status === "Special Program" && "bg-gold/10 text-amber-800 border border-gold/20",
                              event.status === "PTM" && "bg-royal/10 text-royal border border-royal/20",
                              event.status === "Holidays" && "bg-navy/10 text-navy border border-navy/20",
                              event.status === "Upcoming" && "bg-secondary text-foreground border border-border"
                            )}
                          >
                            {event.status}
                          </span>
                        </td>
                        <td className="p-4 sm:p-5 text-muted-foreground">{event.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            {/* Note alert section */}
            <Reveal delay={0.12} className="mt-8">
              <div className="flex gap-4 rounded-lg border border-gold/20 bg-gold/5 p-5 text-sm text-amber-900">
                <AlertTriangle className="size-5 shrink-0 text-gold" />
                <p>
                  <strong>Please Note:</strong> Exact Islamic holiday dates are subject to lunar sightings.
                  Specific circulars will be issued in advance and notified via official parent broadcast groups.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-y bg-navy text-navy-foreground relative overflow-hidden">
        <StarMotif className="pointer-events-none absolute -right-16 -top-16 size-64 text-gold/10" />
        <div className="container-page relative z-10 max-w-3xl text-center">
          <Reveal>
            <h2 className="text-navy-foreground">Need a printable prospectus copy?</h2>
            <p className="mt-4 text-navy-foreground/80 leading-relaxed">
              We provide a complete PDF guidebook explaining academic schedules, textbooks, assessment formats,
              and code of conduct rules.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <LinkButton to="/contact" variant="gold">
                Get Prospectus via WhatsApp
              </LinkButton>
              <LinkButton to="/admissions" className="border border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10">
                Admission Rules
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </MainLayout>
  );
}
