"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.3, ease: [0.23, 1, 0.32, 1] as const },
    }),
  };

  return (
    <section id="overview" className="relative border-b border-border">
      <div className="relative z-10 mx-auto max-w-[958px] px-6 lg:px-[54px]">
        <div className="flex min-h-[640px] flex-col justify-center py-20 lg:min-h-[740px]">
          <motion.p
            className="font-mono text-[11px] tracking-[1px] text-accent"
            initial="hidden"
            animate="visible"
            variants={reveal}
            custom={0}
          >
            [ MOBILE APPLICATION DEVELOPER · JAKARTA, INDONESIA ]
          </motion.p>

          <motion.h1
            className="mt-8 max-w-[720px] text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[52px] lg:text-[64px] lg:leading-[63px]"
            initial="hidden"
            animate="visible"
            variants={reveal}
            custom={0.06}
          >
            Hi, I&apos;m Hamal.
            <br />
            I build reliable
            <br />
            mobile products.
          </motion.h1>

          <motion.p
            className="mt-10 max-w-[425px] text-[15px] leading-6 text-foreground-secondary sm:text-[17px] sm:leading-[26px]"
            initial="hidden"
            animate="visible"
            variants={reveal}
            custom={0.12}
          >
            Mobile Application Developer with 6+ years of experience in React Native, ReactJS,
            Flutter and TypeScript.
          </motion.p>

          <motion.div
            className="mt-12"
            initial="hidden"
            animate="visible"
            variants={reveal}
            custom={0.18}
          >
            <a
              href="mailto:hamalsaefudin48@gmail.com"
              className="inline-flex items-center gap-[14px] bg-accent px-[18px] py-[14px] font-mono text-[11px] font-semibold tracking-[0.7px] text-accent-foreground transition-opacity hover:opacity-90"
            >
              GET IN TOUCH
              <ArrowUpRight aria-hidden="true" className="size-[15px]" />
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute right-[54px] top-[255px] hidden lg:block" aria-hidden="true">
        <div className="relative h-[260px] w-[220px]">
          <div className="absolute left-[10px] top-[10px] size-[200px] rounded-full border border-border" />
          <div className="absolute left-[57px] top-[57px] size-[106px] rounded-full border border-accent" />
          <div className="absolute left-[96px] top-[96px] size-[30px] -rotate-45 bg-accent" />
          <p className="absolute left-0 top-[232px] font-mono text-[10px] tracking-[1px] text-foreground-secondary">
            STACK // RN · FLUTTER · TS
          </p>
        </div>
      </div>
    </section>
  );
}
