"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const experiences = [
  {
    role: "Mobile Application Developer",
    company: "PT. Tiga Daya Digital Indonesia (Triputra Group)",
    period: "Sep 2023 - Present",
    type: "FULLTIME",
    isCurrent: true,
    description: "Update react native & expo SDK version for current HRIS application",
  },
  {
    role: "Frontend Developer",
    company: "Danamas",
    period: "Jul 2023 - Sep 2023",
    type: "CONTRACT",
    isCurrent: false,
    description: "Develop and maintain feature danamas borrower mobile apps using react native and typescript",
  },
  {
    role: "Mobile Application Developer",
    company: "Mandala Multifinance",
    period: "Mar 2022 - Jul 2023",
    type: "FULLTIME",
    isCurrent: false,
    description: "Develop interactive mobile apps for our collector",
  },
  {
    role: "Freelance Mobile Application Developer",
    company: "KODEGIRI",
    period: "Feb 2022 - Okt 2022",
    type: "FREELANCE",
    isCurrent: false,
    description: "Develop android & ios mobile application for booking hotel using React Native & Typescript",
  },
  {
    role: "Frontend Developer",
    company: "Quadrant Synergy International",
    period: "Agu 2019 - Mar 2022",
    type: "FULLTIME",
    isCurrent: false,
    description: "Developing a website for a real estate purchasing company using React.js, Redux, and Redux Saga",
  },
];

export function Experience() {
  const [showAll, setShowAll] = useState(false);
  const visibleExperiences = showAll ? experiences : experiences.slice(0, 3);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section id="experience" className="py-12 px-4 sm:px-6 lg:px-8" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="sr-only">Experience History</h2>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.5 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-foreground">Experience History</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.5, delay: reducedMotion ? 0 : 0.1 }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
        >
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 bg-muted border-b border-border text-xs font-medium text-foreground-muted uppercase tracking-wider">
            <div className="col-span-5">Role &amp; Company</div>
            <div className="col-span-3">Period</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Description</div>
          </div>

          <div className="lg:hidden grid grid-cols-2 gap-2 px-4 py-3 bg-muted border-b border-border text-xs font-medium text-foreground-muted uppercase tracking-wider">
            <div>Details</div>
            <div className="text-right">Info</div>
          </div>

          <div className="divide-y divide-border">
            {visibleExperiences.map((exp, index) => (
              <motion.div
                key={`${exp.role}-${exp.company}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reducedMotion ? 0.1 : 0.3, delay: reducedMotion ? 0 : index * 0.05 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 px-4 lg:px-6 py-4 items-start lg:items-center hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="col-span-1 lg:col-span-5">
                  <div className="flex items-center gap-2">
                    {exp.isCurrent && (
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1 lg:mt-0" />
                    )}
                    <div>
                      <span className="font-medium text-foreground block">{exp.role}</span>
                      <span className="text-sm text-foreground-muted">{exp.company}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 lg:col-span-3 text-sm text-foreground-muted">
                  <span className="lg:hidden font-medium text-xs text-foreground-muted uppercase tracking-wider">Period: </span>
                  {exp.period}
                </div>
                <div className="col-span-1 lg:col-span-2">
                  <span className="lg:hidden font-medium text-xs text-foreground-muted uppercase tracking-wider">Type: </span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      exp.type === "FULLTIME"
                        ? "bg-primary/10 text-primary"
                        : exp.type === "CONTRACT"
                        ? "bg-secondary/10 text-secondary"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    {exp.type}
                  </span>
                </div>
                <div className="col-span-1 lg:col-span-2 text-sm text-foreground-muted">
                  <span className="lg:hidden font-medium text-xs text-foreground-muted uppercase tracking-wider">Description: </span>
                  {exp.description}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="px-4 lg:px-6 py-4 border-t border-border">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label={showAll ? "Show less experiences" : "Show more experiences"}
            >
              {showAll ? (
                <>
                  Show Less
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show More
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
