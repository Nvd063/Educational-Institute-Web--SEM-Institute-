import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const narrow = window.matchMedia("(max-width: 1024px)").matches;
    setEnabled(finePointer && !narrow && !reduced);

    if (!finePointer || narrow || reduced) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest("a, button, [role='button'], input, textarea, select, label"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY, reduced]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[200] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/80 mix-blend-difference"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[199] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30"
        animate={{ width: hovering ? 44 : 28, height: hovering ? 44 : 28 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ x: springX, y: springY }}
      />
    </>
  );
}
