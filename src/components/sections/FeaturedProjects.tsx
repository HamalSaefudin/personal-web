"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "DDMS Mobile Apps",
    tag: "MOBILE APP",
    description: "Blood Donor Management System mobile application for Triputra Group",
    tech: ["React Native", "Expo SDK", "Redux"],
    link: "https://play.google.com/store/apps/details?id=id.co.dayagroup.ddms",
  },
  {
    title: "Prohace",
    tag: "HR TECH",
    description: "HR management and employee solutions platform for Eksad Technology",
    tech: ["React Native", "Flutter", "Redux Saga"],
    link: "https://play.google.com/store/apps/details?id=com.eksad.cx.prohace",
  },
  {
    title: "Danamas App",
    tag: "FINTECH",
    description: "Peer-to-peer lending mobile application for borrowers",
    tech: ["React Native", "TypeScript", "Jest"],
    link: "https://play.google.com/store/apps/details?id=com.danamas.mergingapp",
  },
  {
    title: "Mantis Go",
    tag: "MOBILE APP",
    description: "Mobile application for collectors at Mandala Multifinance",
    tech: ["React Native", "SQLite", "Redux Toolkit"],
    link: "https://play.google.com/store/apps/details?id=com.mantisgo",
  },
  {
    title: "Miruum",
    tag: "HOTEL BOOKING",
    description: "Hotel booking mobile application (not released)",
    tech: ["React Native", "TypeScript", "Redux Toolkit Query"],
    link: "https://www.instagram.com/miruum.id/",
  },
  {
    title: "Agent Aid",
    tag: "HR TECH",
    description: "Internal mobile application for agent recruitment at insurance company",
    tech: ["React Native", "Azure AD", "WatermelonDB"],
  },
  {
    title: "Mirecruit",
    tag: "HR TECH",
    description: "Agent recruitment mobile application for Manulife",
    tech: ["React Native", "JWT", "CodePush"],
    link: "https://play.google.com/store/apps/details?id=com.manulife",
  },
];

export function FeaturedProjects() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 3);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section id="projects" className="py-12 px-4 sm:px-6 lg:px-8" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="sr-only">Featured Projects</h2>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.5 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-2xl font-bold text-foreground">Featured Projects</h2>
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="text-foreground-muted hover:text-foreground text-sm cursor-pointer"
          >
            {showAll ? "Show Less" : "View All"}
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {visibleProjects.map((project, index) => (
              <motion.button
                key={project.title}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : -20 }}
                transition={{ duration: reducedMotion ? 0.1 : 0.3, delay: reducedMotion ? 0 : index * 0.05 }}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer w-full text-left border-border bg-card text-card-foreground"
                onClick={() => project.link && window.open(project.link, '_blank')}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                    {project.tag}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-foreground-muted group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-foreground-muted mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-muted text-foreground-muted text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <span className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors">
                    View Project
                    <ExternalLink className="h-3 w-3" />
                  </span>
                )}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
