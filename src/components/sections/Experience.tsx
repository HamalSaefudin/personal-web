"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  {
    role: "Mobile Application Developer",
    company: "PT. Tiga Daya Digital Indonesia (Triputra Group)",
    period: "Sep 2023 - Present",
    type: "Full-time",
    description: "Update react native & expo SDK version for current HRIS application",
  },
  {
    role: "Frontend Developer",
    company: "Danamas",
    period: "Jul 2023 - Sep 2023",
    type: "Contract",
    description: "Develop and maintain Danamas borrower mobile apps using React Native and TypeScript",
  },
  {
    role: "Mobile Application Developer",
    company: "Mandala Multifinance",
    period: "Mar 2022 - Jul 2023",
    type: "Full-time",
    description: "Develop interactive mobile apps for our collector",
  },
  {
    role: "Freelance Mobile Application Developer",
    company: "KODEGIRI",
    period: "Feb 2022 - Okt 2022",
    type: "Freelance",
    description: "Develop Android & iOS mobile application for booking hotel using React Native & TypeScript",
  },
  {
    role: "Frontend Developer",
    company: "Quadrant Synergy International",
    period: "Aug 2019 - Mar 2022",
    type: "Full-time",
    description: "Developing a website for a real estate purchasing company using React.js, Redux, and Redux Saga",
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
  exit: { opacity: 0, x: -6, transition: { duration: 0.2 } },
};

export function Experience() {
  const [showAll, setShowAll] = useState(false);
  const visibleExperiences = showAll ? experiences : experiences.slice(0, 3);

  return (
    <section id="experience" className="py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-sm font-medium text-foreground-secondary uppercase tracking-wider mb-6"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35 }}
        >
          Experience
        </motion.h2>

        <div className="divide-y divide-border">
          <AnimatePresence mode="popLayout">
            {visibleExperiences.map((exp, i) => (
              <motion.div
                key={`${exp.role}-${exp.company}`}
                className="py-5"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                  <h3 className="font-semibold">{exp.role}</h3>
                  <span className="text-sm text-foreground-secondary tabular-nums">{exp.period}</span>
                </div>
                <p className="text-sm text-foreground-secondary mb-1">{exp.company}</p>
                <p className="text-sm text-foreground-secondary">{exp.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {experiences.length > 3 && (
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 text-sm font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {showAll ? "Show less" : `Show all ${experiences.length} positions`}
          </motion.button>
        )}
      </div>
    </section>
  );
}
