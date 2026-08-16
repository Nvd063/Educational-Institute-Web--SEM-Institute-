import { motion, useReducedMotion } from "framer-motion";
import { IslamicGeometry } from "../effects/IslamicGeometry";

const concepts = [
  { label: "Qur'an", angle: 0, radius: 1 },
  { label: "Sunnah", angle: 60, radius: 1 },
  { label: "Tarbiyah", angle: 120, radius: 1 },
  { label: "Akhlaq", angle: 180, radius: 1 },
  { label: "Adab", angle: 240, radius: 1 },
  { label: "Ilm", angle: 300, radius: 1 },
];

export function IslamicEducationOrbit() {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto mt-12 flex aspect-square w-full max-w-md items-center justify-center lg:max-w-lg">
      <IslamicGeometry variant="star" className="absolute size-[115%] text-gold/10" opacity={1} />

      {/* Orbit rings */}
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full border border-gold/15" />
      <div
        aria-hidden="true"
        className="absolute inset-[22%] rounded-full border border-royal/10"
      />

      {/* Central hub */}
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel relative z-10 flex size-28 flex-col items-center justify-center rounded-full text-center sm:size-32"
      >
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-gold">
          Core of
        </span>
        <span className="font-heading text-lg font-semibold text-navy sm:text-xl">Tarbiyah</span>
      </motion.div>

      {/* Orbiting concepts */}
      {concepts.map((item, i) => {
        const rad = (item.angle * Math.PI) / 180;
        const x = Math.cos(rad) * 42;
        const y = Math.sin(rad) * 42;

        return (
          <motion.div
            key={item.label}
            className="absolute z-10"
            style={{
              left: `calc(50% + ${x}%)`,
              top: `calc(50% + ${y}%)`,
              transform: "translate(-50%, -50%)",
            }}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
          >
            <div className="glass-badge min-w-[4.5rem] text-center">
              <span className="font-heading text-sm font-semibold text-navy">{item.label}</span>
            </div>
          </motion.div>
        );
      })}

      {/* Connecting lines */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full text-gold/20"
        viewBox="0 0 100 100"
      >
        {concepts.map((item) => {
          const rad = (item.angle * Math.PI) / 180;
          const x2 = 50 + Math.cos(rad) * 38;
          const y2 = 50 + Math.sin(rad) * 38;
          return (
            <line
              key={item.label}
              x1="50"
              y1="50"
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.3"
            />
          );
        })}
      </svg>
    </div>
  );
}
