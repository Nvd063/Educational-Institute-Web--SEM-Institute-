import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  FileText,
  Mail,
  MapPin,
  Phone,
  Search,
  UserCheck,
  ChevronDown
} from "lucide-react";
import { MainLayout } from "../layouts/MainLayout";
import { PageHeader } from "../components/common/PageHeader";
import { AdmissionForm } from "../components/admissions/AdmissionForm";
import { Button } from "../components/ui/button";
import { GoldenIslamicBackground } from "../components/effects/GoldenIslamicBackground";
import { site } from "../data/site";


const title = "Admissions";
const description =
  "Admission applications are welcomed for Play Group through Class VIII, with a dedicated evaluation and interview stage for Class IX. Apply online in simple steps.";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: `${title} | Sirat-e-Mustaqeem Educational System` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Sirat-e-Mustaqeem Educational System` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdmissionsPage,
});

const process = [
  {
    step: "01",
    label: "Explore",
    icon: Search,
    text: "Visit our campus or browse our Tarbiyah syllabus, results, and student journey pages to see how our ethos fits your child's upbringing.",
  },
  {
    step: "02",
    label: "Prepare Documents",
    icon: FileText,
    text: "Collect required documents: B-Form, past school leaving certificates, character remarks, and parent/guardian CNIC photocopies.",
  },
  {
    step: "03",
    label: "Apply Online",
    icon: ClipboardList,
    text: "Fill out the structured five-step online admission form below and submit it directly to our office via WhatsApp or email.",
  },
  {
    step: "04",
    label: "Ethical Evaluation",
    icon: UserCheck,
    text: "The Tarbiyah team reviews documents and conducts a friendly readiness check; Class IX applications involve a character interview.",
  },
  {
    step: "05",
    label: "Enrolment Confirmed",
    icon: FileCheck2,
    text: "Upon confirmation, complete standard fee dues at the office to collect class timetables, book lists, and Islamic dress uniform details.",
  },
];

const requirements = [
  {
    title: "Student Identification",
    description:
      "A photocopy of the student's B-Form is required. Older applicants may provide their CNIC for admission verification.",
  },
  {
    title: "Parent / Guardian Identification",
    description:
      "Photocopies of both parents' or the legal guardian's CNIC are required for student and family verification.",
  },
  {
    title: "Academic Records",
    description:
      "The original character certificate and previous result card should be provided to help us review the student's academic and personal record.",
  },
  {
    title: "School Leaving Certificate",
    description:
      "A school leaving certificate from the previous recognized institution is required to complete the transfer and admission process.",
  },
  {
    title: "Recent Photographs",
    description:
      "Four recent passport-size photographs with a plain and respectful background are required for the student's admission record.",
  },
  {
    title: "Vaccination Record",
    description:
      "A valid vaccination record is required for students applying to Play Group, Nursery, and Class I.",
  },
];

const timeline = [
  { label: "Application Issuance", value: "1 – 20 August" },
  { label: "Assessments & Interviews", value: "22 – 28 August" },
  { label: "Confirmation & Orientation", value: "First week of September" },
];

function AdmissionsPage() {
  return (
    <MainLayout>
      <PageHeader eyebrow="Student Enrolment" title={title} description={description} />

      {/* Introduction */}
      <section className="border-b border-border bg-background">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:py-16">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">
              Admission Guidelines
            </p>
            <h2 className="mt-3">A Welcoming and Structured Admission Journey</h2>
            <p className="mt-4 text-muted-foreground">
              Sirat-e-Mustaqeem Educational System welcomes applications from families looking for a
              holistic balance between rigorous science education and authentic Islamic values. We
              assess applicants based on age-appropriate learning readiness, social etiquettes, and
              character disposition.
            </p>
            <p className="mt-3 text-muted-foreground">
              Available seats are allocated in order of application completion. Since we maintain
              small class cap sizes (28 students) to preserve Tarbiyah quality, we recommend
              initiating applications early in the session.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="min-h-11 w-full sm:w-auto">
                <a href="#apply">Apply Online Now</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-11 w-full sm:w-auto">
                <Link to="/contact">Discuss with the Office</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-card sm:p-6">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-5 shrink-0 text-royal" />
              <h3 className="min-w-0 text-lg text-navy">Key Session Dates</h3>
            </div>
            <dl className="mt-4 space-y-3">
              {timeline.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="text-sm font-semibold text-navy">{item.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">
              Office Hours: Monday to Saturday, 8:00 a.m. – 2:00 p.m.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative border-b border-border bg-surface overflow-hidden">
        <GoldenIslamicBackground variant="subtle" />
        <div className="container-page relative z-10 py-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">
            Admissions Process
          </p>
          <h2 className="mt-3">Five Steps to Joining Our Community</h2>
        <ol className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {process.map(({ step, label, icon: Icon, text }) => (
    <li
      key={step}
      className="relative h-full overflow-hidden rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-2 right-3 font-heading text-6xl font-bold leading-none text-secondary"
      >
        {step}
      </span>

      <div className="relative grid size-10 place-items-center rounded-lg bg-navy text-navy-foreground">
        <Icon className="size-5" />
      </div>

      <h3 className="relative mt-4 text-lg text-navy">
        <span className="text-royal">{step}</span> {label}
      </h3>

      <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
        {text}
      </p>
    </li>
  ))}
</ol>
        </div>
      </section>

      {/* Requirements */}
      <section className="border-b border-border bg-background">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-2 lg:py-16">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">
              Requirements
            </p>
            <h2 className="mt-3">What to Bring to the Office</h2>
            <p className="mt-4 text-muted-foreground">
              Parents and guardians are kindly requested to bring the student’s original documents at the time of admission for verification. All original documents will be carefully reviewed and returned immediately after the verification process. A complete and accurate admission file is essential for confirming the student’s enrollment, assessing their academic and Islamic learning background, and securing their place at Sirat-e-Mustaqeem. This information also helps us provide appropriate placement and support across our academic, Qur’an, Islamic Studies, and Tarbiyah programs, ensuring every student begins their educational journey in a well-organized and nurturing environment.
            </p>
          </div>
          <div className="space-y-3">
  {requirements.map((item, index) => (
    <details
      key={item.title}
      className="group rounded-lg border border-border bg-card"
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 p-4">
        <FileCheck2 className="size-5 shrink-0 text-royal" />

        <span className="flex-1 text-sm font-medium text-foreground">
          {item.title}
        </span>

        <ChevronDown
          className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-180"
        />
      </summary>

      <div className="px-4 pb-4 pl-12">
        <p className="text-sm leading-6 text-muted-foreground">
          {item.description}
        </p>
      </div>
    </details>
  ))}
</div>
        </div>
      </section>

      {/* Form */}


{/* Form */}

<section id="apply" className="relative scroll-mt-20 border-b border-border bg-surface overflow-hidden">

  <GoldenIslamicBackground variant="medium" />

  <div className="container-page relative z-10 py-12 lg:py-16">

    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">
      Application Form
    </p>

    <h2 className="mt-3">Online Admission Application</h2>

    <p className="mt-4 max-w-2xl text-muted-foreground">
      Complete the form sections. Your progress is saved locally. Send the final details to
      the admissions office on the last step.
    </p>

    <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8 xl:gap-10">

      <div className="max-w-3xl">
        <AdmissionForm />
      </div>

      {/* Right side content */}

      <div className="relative isolate h-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-card p-6 shadow-lg md:p-8">

        <video
          src="/videos/islamic-classroom.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

        <div className="relative z-10 flex h-full flex-col justify-between text-white">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-gold animate-fade-in">
              Begin Your Blessed Journey
            </p>
          </div>

          <div>

            <h3 className="mt-3 text-3xl font-bold leading-tight animate-fade-in-up">
              Cultivating Minds & Souls with Sirat-e-Mustaqeem
            </h3>

            <p className="mt-4 text-base leading-relaxed text-white/90 animate-fade-in-up animation-delay-200">
              At Sirat-e-Mustaqeem, we nurture holistic growth by seamlessly blending rigorous academic excellence
              with profound Islamic Tarbiyah. Our unique approach cultivates not just intellect, but also character,
              spirituality, and a deep understanding of Islamic values, preparing students to lead with wisdom
              and integrity in both worlds.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">

              {[
                "Qur’an & Tajweed",
                "Islamic Studies",
                "Character Building",
                "Academic Growth",
              ].map((highlight, index) => (

                <div
                  key={highlight}
                  className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-white/20 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >

                  <CheckCircle2 className="size-4 shrink-0 text-gold" />

                  <span>{highlight}</span>

                </div>

              ))}

            </div>

          </div>

          {/* Subtle Islamic pattern overlay */}

          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a3a3a3' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '20px 20px',
              maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
            }}
          ></div>

        </div>

      </div>

    </div>

  </div>

</section>

      {/* Contact CTA */}
      <section className="bg-navy text-navy-foreground mb-8">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:py-16">
          <div className="min-w-0">
            <h2 className="text-navy-foreground">Still Have Questions About Admissions?</h2>
            <p className="mt-4 text-navy-foreground/80">
              Our admissions team is here to assist you with curriculum, Tajweed support streams,
              fee details, and installaments. Connect with us or arrange a visit.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="min-h-11 w-full sm:w-auto">
                <Link to="/contact">Contact the Office</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-11 w-full border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 sm:w-auto"
              >
                <a href="#apply">Apply Online</a>
              </Button>
            </div>
          </div>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-gold" />
              <span className="min-w-0">{site.whatsapp} (Admissions office)</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-gold" />
              <span className="min-w-0 break-words">{site.email}</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-gold" />
              <span className="min-w-0">{site.address}</span>
            </li>
          </ul>
        </div>
      </section>
    </MainLayout>
  );
}
