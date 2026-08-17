"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { Button } from "@/components/ui/button";

const links = [
  { label: "GitHub", href: "https://github.com/HamalSaefudin" },
  { label: "LinkedIn", href: "https://linkedin.com/in/hamal-saefudin" },
];

const reveal = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.25, ease: [0.23, 1, 0.32, 1] as const },
  }),
};

export function Hero() {
  return (
    <section id="overview" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionEyebrow number="01">Overview</SectionEyebrow>

          <motion.h1
            className="text-balance text-5xl font-medium leading-[1.08] tracking-[-0.04em] text-ink sm:text-7xl"
            initial="hidden"
            animate="visible"
            variants={reveal}
            custom={0.04}
          >
            Hi, I&apos;m Hamal.
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary"
            initial="hidden"
            animate="visible"
            variants={reveal}
            custom={0.1}
          >
            Mobile Application Developer with 5+ years of expertise in React Native
            and ReactJS. Based in Jakarta, Indonesia.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            initial="hidden"
            animate="visible"
            variants={reveal}
            custom={0.16}
          >
            <Button asChild>
              <a href="mailto:hamalsaefudin48@gmail.com?subject=Hiring Inquiry">
                Get in touch
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-[24px] border border-ink px-6 py-3.5 text-sm font-medium text-ink transition-[transform,background-color,color] duration-[160ms] ease-out hover:bg-ink hover:text-background active:scale-[0.97]"
              >
                {link.label}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mx-auto mt-20 grid max-w-3xl grid-cols-2 border-y border-ink py-8 text-left sm:mt-28"
          initial="hidden"
          animate="visible"
          variants={reveal}
          custom={0.24}
        >
          {[
            { value: "6+", label: "Years experience" },
            { value: "10+", label: "Projects completed" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={index === 1 ? "border-l border-ink pl-6 sm:pl-10" : "pr-6 sm:pr-10"}
            >
              <p className="text-4xl font-medium tracking-[-0.04em] text-ink sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-foreground-secondary">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
