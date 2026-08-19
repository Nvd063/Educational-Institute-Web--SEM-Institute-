import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { MapPin } from "lucide-react";
import { useRef } from "react";
import heroImage from "../../assets/hero.jpeg";
import heroBackgroundImage from "../../assets/hero-section.jpeg";
import { site } from "../../data/site";
import { LinkButton } from "../common/Button";
import { IslamicGeometry } from "../effects/IslamicGeometry";

const words = ["Nurturing", "Faith,", "Knowledge,", "and", "Character"];

export function HeroSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.06]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 40]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useTransform(mouseX, [0, 1], ["30%", "70%"]);
  const glowY = useTransform(mouseY, [0, 1], ["20%", "60%"]);
  const parallaxX = useTransform(mouseX, [0, 1], [-8, 8]);
  const parallaxY = useTransform(mouseY, [0, 1], [-6, 6]);
  const lightPos = useMotionTemplate`radial-gradient(600px circle at ${glowX} ${glowY}, oklch(0.79 0.12 82 / 0.14), transparent 65%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="hero-section relative isolate min-h-[92vh] overflow-hidden bg-[#071a32] text-navy-foreground"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 50]),
          }}
        >
          <img
            src={heroBackgroundImage}
            alt=""
            className="h-full w-full object-cover"
            style={{
              filter: reduced
                ? "brightness(0.95) saturate(1.15) contrast(1.05)"
                : "blur(1.5px) brightness(0.9) saturate(1.25) contrast(1.08)",
              transform: reduced ? "scale(1.02)" : "scale(1.06)",
              opacity: 0.96,
            }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,50,0.28),rgba(10,28,52,0.22),rgba(7,26,50,0.32))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,191,75,0.18),transparent_38%)]" />
        <div className="hero-grid-pattern absolute inset-0" aria-hidden="true" />
        <div className="hero-sheen absolute inset-0" aria-hidden="true" />
      </div>

      {/* Living background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-glow hero-glow-a" />
        <div className="hero-glow hero-glow-b" />
        <div className="hero-glow hero-glow-c" />
        <IslamicGeometry variant="grid" className="text-navy-foreground" opacity={0.05} />
        <IslamicGeometry
          variant="star"
          className="absolute -left-16 top-24 size-48 text-gold sm:size-64"
          opacity={0.07}
        />
        <IslamicGeometry
          variant="star"
          className="absolute -right-10 bottom-32 size-56 text-royal sm:size-72"
          opacity={0.06}
        />
        <IslamicGeometry
          variant="arch"
          className="absolute right-0 top-1/4 hidden w-48 text-gold lg:block xl:w-64"
          opacity={0.08}
        />
        {/* Floating particles */}
        {["12%", "28%", "72%", "88%"].map((left, i) => (
          <span
            key={left}
            className="hero-particle"
            style={{
              left,
              top: `${18 + i * 16}%`,
              animationDelay: `${i * 1.4}s`,
            }}
          />
        ))}
      </div>

      <div className="container-page relative z-10 grid min-h-[92vh] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        {/* Content — glass panel */}
        <motion.div style={{ y: contentY }} className="relative">
          <div className="glass-panel hero-glass relative max-w-2xl p-6 sm:p-8 lg:p-10">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-60"
              style={{ background: lightPos }}
            />
            <div className="glass-shimmer pointer-events-none" aria-hidden="true" />

            <motion.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="brand-ribbon mb-6 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-navy/30 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur-sm"
            >
              <MapPin className="size-3.5" /> Premier Campus · Since {site.established}
            </motion.p>

            <h1 className="font-heading text-[clamp(2.25rem,1.6rem+2.8vw,3.75rem)] leading-[1.08] tracking-[-0.02em] text-navy-foreground">
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  className={
                    word === "Faith," || word === "Knowledge,"
                      ? "hero-accent-word mr-[0.28em] inline-block"
                      : "mr-[0.28em] inline-block"
                  }
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.65,
                    delay: 0.15 + i * 0.08,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-navy-foreground/82"
            >
              Sirat-e-Mustaqeem Educational System provides a complete Islamic education from Play
              Group through Matriculation on one campus. We meaningfully nurture young minds through
              Qur'anic guidance, authentic Islamic knowledge, and core sciences—helping students
              grow with faith (Iman), character (Akhlaq), academic wisdom, and life purpose.
            </motion.p>

            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.68 }}
              className="hero-motto mt-5 flex flex-wrap items-center gap-3"
            >
              {['Iman', 'Ilm', 'Akhlaq'].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-gold/30 bg-gold/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold"
                >
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <LinkButton to="/admissions" size="lg" variant="gold" className="premium-btn">
                Admissions Procedure
              </LinkButton>
              <LinkButton
                to="/syllabus"
                size="lg"
                variant="ghost"
                className="premium-btn-ghost border border-navy-foreground/25 bg-navy-foreground/5 text-navy-foreground backdrop-blur-sm hover:bg-navy-foreground/12"
              >
                Tarbiyah Curriculum
              </LinkButton>
            </motion.div>

            <motion.dl
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-navy-foreground/12 pt-6"
            >
              {[
                { k: "Education Stream", v: "Play Group – Matric" },
                { k: "Tarbiyah Cap", v: "28 students" },
                { k: "Board Affiliation", v: "Board of Secondary Education" },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-navy-foreground/50">
                    {item.k}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-gold">{item.v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </motion.div>

        {/* Hero image composition */}
        <motion.div
          style={{ y: imageY, x: parallaxX }}
          className="relative mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end"
        >
          <motion.div style={{ y: parallaxY }} className="hero-image-wrap group">
            {/* Enhanced ambient glow behind image - more prominent */}
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-gold/30 via-royal/20 to-gold/10 blur-3xl opacity-80"
            />

            {/* Subtle glow aura around logo */}
            <motion.div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-gold/15 to-royal/10 blur-xl opacity-70"
              animate={{
                opacity: reduced ? 0.7 : [0.6, 0.85, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="hero-image-frame relative overflow-hidden rounded-[1.75rem] shadow-2xl">
              <motion.img
                src={heroImage}
                alt="Sirat-e-Mustaqeem — Knowledge is Light. Islamic education with Qur'an, academic excellence, and character development."
                width={1024}
                height={1024}
                loading="eager"
                fetchPriority="high"
                style={{ scale: imageScale }}
                className="hero-image relative z-[1] aspect-[4/5] w-full object-cover object-center sm:aspect-[5/6]"
              />

              {/* Glass overlay strip */}
              <div className="glass-strip absolute inset-x-4 bottom-4 z-[2] rounded-xl px-4 py-3 sm:inset-x-5 sm:bottom-5 sm:px-5 sm:py-4">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
                  العلم نور
                </p>
                <p className="mt-0.5 font-heading text-sm font-semibold text-navy-foreground sm:text-base">
                  Knowledge is Light
                </p>
              </div>

              {/* Vignette & edge fade */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-navy/70 via-transparent to-navy/20"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[3] [box-shadow:inset_0_0_80px_oklch(0.15_0.06_264_/_0.45)]"
              />
            </div>

            {/* Floating badges */}
            <div className="glass-badge absolute -left-2 top-[18%] z-[4] hidden sm:block lg:-left-6">
              <span className="text-[0.65rem] uppercase tracking-[0.14em] text-gold">Faith</span>
              <span className="mt-0.5 block font-heading text-sm font-semibold text-navy-foreground">
                Iman
              </span>
            </div>
            <div className="glass-badge absolute -right-1 top-[42%] z-[4] hidden sm:block lg:-right-5">
              <span className="text-[0.65rem] uppercase tracking-[0.14em] text-gold">
                Knowledge
              </span>
              <span className="mt-0.5 block font-heading text-sm font-semibold text-navy-foreground">
                Ilm
              </span>
            </div>
            <div className="glass-badge absolute -bottom-2 left-[12%] z-[4] hidden sm:block lg:-bottom-4">
              <span className="text-[0.65rem] uppercase tracking-[0.14em] text-gold">
                Character
              </span>
              <span className="mt-0.5 block font-heading text-sm font-semibold text-navy-foreground">
                Akhlaq
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
}
