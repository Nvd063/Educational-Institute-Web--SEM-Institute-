import { createFileRoute } from "@tanstack/react-router";
import { Shield, Sparkles, Scale, GraduationCap, Users, Clock, CheckSquare } from "lucide-react";
import { MainLayout } from "../layouts/MainLayout";
import { PageHeader } from "../components/common/PageHeader";
import { SectionHeading } from "../components/common/SectionHeading";
import { Panel } from "../components/common/Card";
import { Reveal } from "../components/common/Reveal";
import { StarMotif } from "../components/common/StarMotif";
import { GoldenIslamicBackground } from "../components/effects/GoldenIslamicBackground";
import { LinkButton } from "../components/common/Button";

const title = "School Policies";
const description =
  "Official guidelines regulating student dress codes, attendance records, discipline metrics, fee timelines, and campus safety rules.";

export const Route = createFileRoute("/policies")({
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
  component: PoliciesPage,
});

// Uniform & Grooming guidelines (Comparisons)
const uniformGuidelines = [
  { item: "Male Students (Standard Classes)", allowed: "Off-white Shalwar Qameez, navy blue waistcoat, and black shoes. Hair must be short and neatly cut.", disallowed: "Jeans, shirts, styling gels, necklaces, wrist bands, or long hairstyles." },
  { item: "Female Students (Standard Classes)", allowed: "White Shalwar Qameez, green Sash/Dopatta, and black shoes. Hair must be tied neatly in a plain braid.", disallowed: "Makeup, nail polish, jewelry, open hair styles, heels, or colored pins." },
  { item: "Early Years Wing (PG – KG)", allowed: "Comfortable designated track suit style uniform, black sneakers. Plain white head-covering (optional).", disallowed: "Loose slippers, toys, watches, or designer outerwear." },
];

// Disciplinary & Ethical Conduct Steps
const conductSteps = [
  { step: "Step 1: First Verbal Warning", desc: "The class teacher counsels the student regarding the behavior violation, noting the incident details in the internal portal." },
  { step: "Step 2: Written Warning in Diary", desc: "A written notice is logged in the student's diary for parental signature. The section mentor meets the student." },
  { step: "Step 3: Parent Counseling Meeting", desc: "A formal meeting is scheduled at the school office with parents, the section mentor, and principal to draft a correction plan." },
  { step: "Step 4: Probation Period", desc: "The student's behavior is monitored for two weeks. Consistent violation leads to suspension or registration withdrawal." },
];

function PoliciesPage() {
  return (
    <MainLayout>
      <PageHeader eyebrow="Institution" title={title} description={description} />

      {/* Comparison Section - Uniform Code */}
      <section className="section-y bg-surface relative overflow-hidden">
        <GoldenIslamicBackground variant="subtle" />
        <div className="container-page relative z-10 max-w-5xl">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Dress Code"
              title="Uniform & Grooming Standards"
              description="Our uniform is designed to reflect Islamic modesty, simplicity, and equality among all students."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {uniformGuidelines.map((u, i) => (
              <Reveal key={u.item} delay={i * 0.08}>
                <Panel className="h-full border-t-4 border-t-gold bg-card flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-navy border-b border-border pb-2.5 mb-4">{u.item}</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                          Approved Uniform
                        </span>
                        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{u.allowed}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-destructive bg-destructive/5 px-2 py-0.5 rounded border border-destructive/10">
                          Not Allowed
                        </span>
                        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{u.disallowed}</p>
                      </div>
                    </div>
                  </div>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow / Step-by-Step - Disciplinary Procedure */}
      <section className="section-y relative overflow-hidden">
        <StarMotif className="pointer-events-none absolute -left-20 -top-24 size-72 text-gold/10" />
        <div className="container-page max-w-4xl relative z-10">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Character Correction"
              title="Code of Conduct & Disciplinary Steps"
              description="We approach discipline (Tarbiyah) as a corrective, counseling, and restorative process rather than punitive punishment."
            />
          </Reveal>

          {/* Stepper Steps */}
          <div className="mt-12 relative pl-6 sm:pl-10">
            <span
              aria-hidden="true"
              className="absolute left-[1.4rem] top-2 bottom-2 w-0.5 bg-border sm:left-[2.1rem]"
            />
            <div className="space-y-6">
              {conductSteps.map((step, idx) => (
                <Reveal key={step.step} delay={idx * 0.05}>
                  <div className="relative flex gap-6 sm:gap-10">
                    <span className="absolute -left-[1.7rem] top-1 z-10 flex size-6 items-center justify-center rounded-full bg-navy text-gold text-xs font-bold sm:-left-[2.6rem] sm:size-10 sm:text-sm">
                      {idx + 1}
                    </span>
                    <div className="flex-1 rounded-lg border border-border bg-card p-5 shadow-sm">
                      <h3 className="text-base font-bold text-navy">{step.step}</h3>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlight blocks - Academic Attendance & Fee Rules */}
      <section className="section-y bg-surface relative overflow-hidden">
        <div className="container-page relative z-10 max-w-4xl">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Guidelines"
              title="Attendance & Financial Terms"
              description="Please review our policies regarding minimum attendance requirements and school fee cycles."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <Panel className="border-l-4 border-l-royal bg-card h-full">
                <div className="flex gap-4">
                  <Clock className="size-6 text-royal shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-navy">90% Attendance Policy</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      Students must maintain at least 90% attendance to qualify for term examinations. 
                      Sick leave requests require an official medical document signed by a registered practitioner, 
                      submitted to the office within 48 hours of return.
                    </p>
                  </div>
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={0.08}>
              <Panel className="border-l-4 border-l-gold bg-card h-full">
                <div className="flex gap-4">
                  <Scale className="size-6 text-gold shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-navy">Fee Payment & Timelines</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      Monthly school tuition fees are due by the 10th of every calendar month. 
                      Late submissions incur a fine of PKR 100 per week. Academic credentials, result cards,
                      and term exam roll numbers will be withheld until all outstanding dues are settled.
                    </p>
                  </div>
                </div>
              </Panel>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Campus Safety Code Section */}
      <section className="section-y bg-navy text-navy-foreground relative overflow-hidden">
        <StarMotif className="pointer-events-none absolute -bottom-32 right-8 size-80 text-navy-foreground/5" />
        <div className="container-page relative z-10 max-w-3xl text-center">
          <Reveal>
            <Shield className="mx-auto size-12 text-gold mb-4" />
            <h2 className="text-navy-foreground">Safeguarding & Student Protection</h2>
            <p className="mt-4 text-sm text-navy-foreground/80 leading-relaxed">
              We implement a strict zero-tolerance policy against physical violence, bullying, vandalism, or inappropriate language on campus. 
              Our campus is monitored by security guards and continuous CCTV surveillance to ensure a secure, peaceful environment.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <LinkButton to="/contact" variant="gold">
                Report a Concern
              </LinkButton>
              <LinkButton to="/about" className="border border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10">
                Explore Leadership
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </MainLayout>
  );
}
