"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

const projects = [
  {
    title: "DDMS Mobile Apps",
    category: "Mobile App",
    year: "2023",
    tech: "React Native · Expo SDK · Redux",
    swatch: "#233b46",
    link: "https://play.google.com/store/apps/details?id=id.co.dayagroup.ddms",
  },
  {
    title: "Prohace",
    category: "HR Tech",
    year: "2023",
    tech: "React Native · Flutter · Redux Saga",
    swatch: "#332e59",
    link: "https://play.google.com/store/apps/details?id=com.eksad.cx.prohace",
  },
  {
    title: "Danamas App",
    category: "Fintech",
    year: "2023",
    tech: "React Native · TypeScript · Jest",
    swatch: "#23443c",
    link: "https://play.google.com/store/apps/details?id=com.danamas.mergingapp",
  },
  {
    title: "Mantis Go",
    category: "Mobile App",
    year: "2022",
    tech: "React Native · SQLite · Redux Toolkit",
    swatch: "#24324a",
    link: "https://play.google.com/store/apps/details?id=com.mantisgo",
  },
  {
    title: "Miruum",
    category: "Hotel Booking",
    year: "2022",
    tech: "React Native · TypeScript · Redux Toolkit Query",
    swatch: "#4a3b23",
    link: "https://www.instagram.com/miruum.id/",
  },
  {
    title: "Mirecruit",
    category: "HR Tech",
    year: "2021",
    tech: "React Native · JWT · CodePush",
    swatch: "#3b2352",
    link: "https://play.google.com/store/apps/details?id=com.manulife",
  },
];

export function FeaturedProjects() {
  const [showAll, setShowAll] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="border-b border-border">
      <div className="mx-auto max-w-[958px] px-6 py-16 lg:px-[54px] lg:py-[72px]">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-[10px]">
            <p className="font-mono text-[11px] tracking-[1px] text-accent">
              01 — SELECTED PROJECTS
            </p>
            <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-foreground sm:text-[38px]">
              Apps people use.
            </h2>
          </div>
          <p className="font-mono text-[11px] tracking-[1px] text-foreground-secondary">
            [ 06 PROJECTS ]
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {visibleProjects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 border border-border bg-panel px-5 py-5 transition-colors hover:border-foreground-secondary sm:px-6"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                transition={{ duration: 0.2, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="flex items-center gap-[22px]">
                  <span className="font-mono text-[12px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-[7px]">
                    <p className="font-mono text-[11px] tracking-[0.8px] text-foreground-secondary">
                      {project.category.toUpperCase()} · {project.year}
                    </p>
                    <h3 className="text-[20px] font-medium tracking-[-0.02em] text-foreground sm:text-[25px]">
                      {project.title}
                    </h3>
                    <p className="text-[13px] text-foreground-secondary">{project.tech}</p>
                  </div>
                </div>
                <div className="flex items-center gap-[17px]">
                  <span
                    aria-hidden="true"
                    className="hidden h-[48px] w-[64px] border border-border sm:block"
                    style={{ backgroundColor: project.swatch }}
                  />
                  <ArrowUpRight aria-hidden="true" className="size-[21px] text-foreground" />
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mt-6 flex items-center gap-[10px] border border-border px-4 py-3 font-mono text-[11px] font-semibold tracking-[0.6px] text-foreground transition-colors hover:border-foreground-secondary"
        >
          {showAll ? "SHOW LESS" : "LOAD 3 MORE PROJECTS"}
          <Plus aria-hidden="true" className="size-[15px] text-accent" />
        </button>
      </div>
    </section>
  );
}
