"use client";

import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export function Hero() {
  return (
    <section id="overview" className="pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.h1
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-b from-foreground to-foreground-secondary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          Hi, I&apos;m Hamal
        </motion.h1>

        <motion.p
          className="text-lg text-foreground-secondary leading-relaxed mb-8 max-w-xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
        >
          Mobile Application Developer with 5+ years of expertise in React
          Native, and ReactJS. Based in Jakarta, Indonesia.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.04, delayChildren: 0.16 },
            },
          }}
        >
          {[
            {
              label: "Get in touch",
              href: "mailto:hamalsaefudin48@gmail.com?subject=Hiring Inquiry",
            },
            { label: "GitHub", href: "https://github.com/HamalSaefudin" },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/hamal-saefudin",
            },
          ].map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="text-sm font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
              variants={itemVariants}
              custom={0}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        <div className="flex items-start gap-10 sm:gap-14 border-t border-border pt-6">
          {[
            { value: "6+", label: "Years Experience" },
            { value: "10+", label: "Projects Completed" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className={i > 0 ? "border-l border-border pl-10 sm:pl-14" : ""}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.24 + i * 0.06 }}
            >
              <p className="text-4xl font-bold tracking-tight bg-gradient-to-b from-primary to-primary/70 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm text-foreground-secondary mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
