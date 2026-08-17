"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionEyebrow } from "@/components/SectionEyebrow";

const projects = [
  {
    title: "DDMS Mobile Apps",
    category: "Mobile App",
    year: "2023",
    description: "Blood Donor Management System mobile application for Triputra Group",
    tech: "React Native, Expo SDK, Redux",
    link: "https://play.google.com/store/apps/details?id=id.co.dayagroup.ddms",
  },
  {
    title: "Prohace",
    category: "HR Tech",
    year: "2023",
    description: "HR management and employee solutions platform for Eksad Technology",
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
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.25, ease: [0.23, 1, 0.32, 1] as const },
  }),
  exit: { opacity: 0, y: 8, transition: { duration: 0.18 } },
};

export function FeaturedProjects() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionEyebrow number="05">Selected Projects</SectionEyebrow>

        <div className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, i) => (
              <motion.article
                key={project.title}
                className="rounded-[24px] border border-ink bg-cream-paper p-6 sm:p-8"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-secondary">
                      {project.category}
                    </p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-xl font-medium tracking-[-0.02em] text-ink transition-[transform,color] duration-200 ease-out hover:translate-x-0.5"
                    >
                      {project.title}
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </a>
                  </div>
                  <span className="shrink-0 text-sm tabular-nums text-foreground-secondary">
                    {project.year}
                  </span>
                </div>
                <p className="mt-8 max-w-md text-base leading-7 text-foreground-secondary">
                  {project.description}
                </p>
                <p className="mt-6 border-t border-ink/30 pt-4 text-sm text-foreground-secondary">
                  {project.tech}
                </p>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {projects.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 inline-flex min-h-10 items-center rounded-full border border-ink px-4 text-sm font-medium text-ink transition-[transform,background-color,color] duration-[160ms] ease-out hover:bg-ink hover:text-background active:scale-[0.97]"
          >
            {showAll ? "Show less" : `View all ${projects.length} projects`}
          </button>
        )}
      </div>
    </section>
  );
}
