"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCanHover } from "@/hooks/useCanHover";
import { SectionEyebrow } from "@/components/SectionEyebrow";

const projects = [
  {
    title: "DDMS Mobile Apps",
    category: "Mobile App",
    year: "2023",
    description:
      "Blood Donor Management System mobile application for Triputra Group",
    tech: "React Native, Expo SDK, Redux",
    link: "https://play.google.com/store/apps/details?id=id.co.dayagroup.ddms",
  },
  {
    title: "Prohace",
    category: "HR Tech",
    year: "2023",
    description:
      "HR management and employee solutions platform for Eksad Technology",
    tech: "React Native, Flutter, Redux Saga",
    link: "https://play.google.com/store/apps/details?id=com.eksad.cx.prohace",
  },
  {
    title: "Danamas App",
    category: "Fintech",
    year: "2023",
    description: "Peer-to-peer lending mobile application for borrowers",
    tech: "React Native, TypeScript, Jest",
    link: "https://play.google.com/store/apps/details?id=com.danamas.mergingapp",
  },
  {
    title: "Mantis Go",
    category: "Mobile App",
    year: "2022",
    description: "Mobile application for collectors at Mandala Multifinance",
    tech: "React Native, SQLite, Redux Toolkit",
    link: "https://play.google.com/store/apps/details?id=com.mantisgo",
  },
  {
    title: "Miruum",
    category: "Hotel Booking",
    year: "2022",
    description: "Hotel booking mobile application",
    tech: "React Native, TypeScript, Redux Toolkit Query",
    link: "https://www.instagram.com/miruum.id/",
  },
  {
    title: "Mirecruit",
    category: "HR Tech",
    year: "2021",
    description: "Agent recruitment mobile application for Manulife",
    tech: "React Native, JWT, CodePush",
    link: "https://play.google.com/store/apps/details?id=com.manulife",
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
  exit: { opacity: 0, x: -6, transition: { duration: 0.2 } },
};

export function FeaturedProjects() {
  const [showAll, setShowAll] = useState(false);
  const canHover = useCanHover();
  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionEyebrow>Selected Projects</SectionEyebrow>

        <div className="divide-y divide-border">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, i) => (
              <motion.div
                key={project.title}
                className="py-5"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
              >
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:opacity-70 transition-opacity"
                    >
                      {project.title}
                    </a>
                  ) : (
                    <span className="font-semibold">{project.title}</span>
                  )}
                  <span className="text-sm text-foreground-secondary tabular-nums flex-shrink-0">
                    {project.year}
                  </span>
                </div>
                <p className="text-sm text-foreground-secondary mb-1">
                  {project.description}
                </p>
                <p className="text-xs text-foreground-secondary">
                  {project.tech}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {projects.length > 4 && (
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 text-sm font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
            whileHover={canHover ? { scale: 1.02 } : undefined}
            whileTap={{ scale: 0.98 }}
          >
            {showAll ? "Show less" : `View all ${projects.length} projects`}
          </motion.button>
        )}
      </div>
    </section>
  );
}
