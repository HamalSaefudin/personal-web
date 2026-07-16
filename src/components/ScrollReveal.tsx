"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right";
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  className = "",
  animation = "fade-up"
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  
  const animations = {
    "fade-up": { opacity: reducedMotion ? 0 : 1, y: reducedMotion ? 0 : 15 },
    "fade-in": { opacity: reducedMotion ? 0 : 1, y: 0 },
    "slide-left": { opacity: reducedMotion ? 0 : 1, x: reducedMotion ? 0 : -20 },
    "slide-right": { opacity: reducedMotion ? 0 : 1, x: reducedMotion ? 0 : 20 },
  };
  
  return (
    <motion.div
      ref={ref}
      initial={animations[animation]}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : animations[animation]}
      transition={{
        duration: reducedMotion ? 0.1 : 0.4,
        delay: reducedMotion ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
