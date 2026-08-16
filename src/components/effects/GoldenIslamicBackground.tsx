import { motion } from "framer-motion";
import { IslamicGeometry } from "./IslamicGeometry";

interface GoldenIslamicBackgroundProps {
  variant?: "subtle" | "medium" | "prominent";
  className?: string;
}

/**
 * Reusable Islamic-themed background effects with gold accents
 * Adds beautiful, interactive layers above the background
 */
export function GoldenIslamicBackground({
  variant = "medium",
  className = "",
}: GoldenIslamicBackgroundProps) {
  const isSubtle = variant === "subtle";
  const isProminent = variant === "prominent";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Base gradient overlay with gold tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-royal/3" />

      {/* Animated geometric patterns */}
      <IslamicGeometry
        variant="grid"
        className="absolute inset-0 text-gold"
        opacity={isSubtle ? 0.02 : isProminent ? 0.08 : 0.04}
      />

      {/* Primary star pattern - top right */}
      <motion.div
        animate={{
          opacity: isSubtle ? [0.04, 0.08, 0.04] : isProminent ? [0.08, 0.14, 0.08] : [0.06, 0.1, 0.06],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-20 -top-32 size-96"
      >
        <IslamicGeometry
          variant="star"
          className="text-gold"
          opacity={1}
        />
      </motion.div>

      {/* Secondary star pattern - bottom left */}
      <motion.div
        animate={{
          opacity: isSubtle ? [0.03, 0.07, 0.03] : isProminent ? [0.07, 0.13, 0.07] : [0.05, 0.09, 0.05],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute -bottom-40 -left-32 size-80"
      >
        <IslamicGeometry
          variant="star"
          className="text-gold"
          opacity={1}
        />
      </motion.div>

      {/* Arch pattern - right side */}
      <motion.div
        animate={{
          opacity: isSubtle ? [0.02, 0.06, 0.02] : isProminent ? [0.06, 0.12, 0.06] : [0.04, 0.08, 0.04],
          x: [0, 8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute right-0 top-1/3 w-72 h-72"
      >
        <IslamicGeometry
          variant="arch"
          className="text-gold"
          opacity={1}
        />
      </motion.div>

      {/* Decorative circles/orbs with glow effect */}
      {isProminent && (
        <>
          <motion.div
            className="absolute top-1/4 right-1/3 w-40 h-40 rounded-full"
            animate={{
              boxShadow: [
                "0 0 40px rgba(234, 191, 75, 0.15)",
                "0 0 80px rgba(234, 191, 75, 0.25)",
                "0 0 40px rgba(234, 191, 75, 0.15)",
              ],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-32 h-32 rounded-full"
            animate={{
              boxShadow: [
                "0 0 30px rgba(234, 191, 75, 0.1)",
                "0 0 60px rgba(234, 191, 75, 0.2)",
                "0 0 30px rgba(234, 191, 75, 0.1)",
              ],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
          />
        </>
      )}

      {/* Floating particles */}
      {!isSubtle &&
        ["8%", "32%", "64%", "92%"].map((left, i) => (
          <motion.span
            key={left}
            className="absolute w-1 h-1 rounded-full bg-gold/30"
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
            style={{
              left,
              top: `${15 + i * 18}%`,
            }}
          />
        ))}

      {/* Radial gradient accent */}
      <div className="absolute inset-0 bg-radial-gradient(circle_at_30%_20%,rgba(234,191,75,0.1),transparent_40%)" />
      <div className="absolute inset-0 bg-radial-gradient(circle_at_70%_80%,rgba(75,0,130,0.05),transparent_50%)" />

      {/* Light shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
