"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface ScrollProgressRingProps {
  /**
   * Size of the ring in pixels
   * @default 64
   */
  size?: number;
  /**
   * Stroke width of the progress ring
   * @default 5
   */
  strokeWidth?: number;
  /**
   * Distance from the bottom edge in pixels
   * @default 24
   */
  bottomOffset?: number;
  /**
   * Distance from the right edge in pixels
   * @default 24
   */
  rightOffset?: number;
  /**
   * Whether to show the percentage text
   * @default true
   */
  showPercentage?: boolean;
}

export function ScrollProgressRing({
  size = 64,
  strokeWidth = 5,
  bottomOffset = 24,
  rightOffset = 24,
  showPercentage = true,
}: ScrollProgressRingProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const svgRef = useRef<HTMLButtonElement>(null);

  // Update scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      setScrollProgress(value);
      // Show ring when user has scrolled down
      setIsVisible(value > 0.01);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Scroll to top function with smooth animation
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Calculate ring dimensions
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - scrollProgress);

  // Calculate percentage to display
  const percentage = Math.round(scrollProgress * 100);

  // If reduced motion is preferred, don't show the component
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.button
      ref={svgRef}
      onClick={handleScrollToTop}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      whileHover={{
        scale: isHovering ? 1.1 : 1,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        opacity: { duration: 0.3 },
        scale: { duration: 0.3, type: "spring", stiffness: 200, damping: 30 },
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="pointer-events-auto fixed z-50 flex items-center justify-center rounded-full bg-gradient-to-br from-royal/15 to-gold/15 backdrop-blur-sm transition-colors duration-300 hover:from-royal/25 hover:to-gold/25 dark:from-royal/20 dark:to-gold/20 dark:hover:from-royal/35 dark:hover:to-gold/35 shadow-lg hover:shadow-xl"
      style={{
        bottom: `${bottomOffset}px`,
        right: `${rightOffset}px`,
        width: size,
        height: size,
      }}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      {/* Background glow effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 blur-md"
        style={{
          background: isHovering
            ? "radial-gradient(circle, rgba(69, 90, 165, 0.25) 0%, transparent 70%)"
            : "transparent",
        }}
      />

      {/* SVG Ring */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute rotate-[-90deg] drop-shadow-[0_0_20px_rgba(69,90,165,0.4)] dark:drop-shadow-[0_0_20px_rgba(198,166,50,0.3)]"
      >
        {/* Background circle - more visible */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="fill-none stroke-border/50 dark:stroke-border/40"
          strokeWidth={strokeWidth}
        />

        {/* Progress ring - animated and bolder */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="fill-none stroke-royal drop-shadow-md dark:stroke-gold"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            mass: 1,
          }}
          filter="drop-shadow(0 0 12px rgba(69, 90, 165, 0.5)) drop-shadow(0 0 20px rgba(198, 166, 50, 0.3))"
        />
      </svg>

      {/* Percentage text - only show if percentage is > 0 */}
      {showPercentage && percentage > 0 && (
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center font-heading text-sm font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-royal dark:text-gold">{percentage}</span>
          <span className="text-[0.5rem] leading-none text-royal/70 dark:text-gold/70">
            %
          </span>
        </motion.div>
      )}

      {/* Arrow icon - show at 0% or when hovering */}
      {(percentage === 0 || isHovering) && (
        <motion.div
          className="relative z-10 flex items-center justify-center"
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 2 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUp className="h-5 w-5 text-royal dark:text-gold" strokeWidth={3} />
        </motion.div>
      )}
    </motion.button>
  );
}

/**
 * ScrollProgressRing Component
 *
 * A premium circular progress indicator that:
 * - Shows scroll position as a filled ring
 * - Displays scroll percentage inside the ring
 * - Provides one-click scroll-to-top functionality
 * - Includes smooth animations and hover effects
 * - Respects user preferences for reduced motion
 * - Supports light and dark modes
 * - Is fully accessible with ARIA labels
 * - Works responsively across all device sizes
 *
 * Usage:
 * ```tsx
 * import { ScrollProgressRing } from "@/components/effects/ScrollProgressRing"
 *
 * export function Layout() {
 *   return (
 *     <>
 *       <YourPageContent />
 *       <ScrollProgressRing />
 *     </>
 *   )
 * }
 * ```
 *
 * Customization:
 * ```tsx
 * <ScrollProgressRing
 *   size={64}
 *   strokeWidth={4}
 *   bottomOffset={32}
 *   rightOffset={32}
 *   showPercentage={true}
 * />
 * ```
 */
