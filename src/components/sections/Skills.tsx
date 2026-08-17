"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/SectionEyebrow";

export function Skills() {
  const skills = [
    { name: "React Native", level: "Expert" },
    { name: "Flutter", level: "Expert" },
    { name: "ReactJS", level: "Proficient" },
    { name: "TypeScript", level: "Proficient" },
    { name: "JavaScript", level: "Expert" },
    { name: "Redux / Redux Saga", level: "Expert" },
    { name: "Node.js", level: "Intermediate" },
    { name: "Jest", level: "Proficient" },
    { name: "SQLite", level: "Proficient" },
    { name: "Azure AD", level: "Intermediate" },
    { name: "HTML / CSS", level: "Proficient" },
    { name: "Storybook", level: "Intermediate" },
  ];

  return (
    <section id="skills" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionEyebrow number="04">Skills</SectionEyebrow>

        <div className="flex max-w-4xl flex-wrap gap-2">
          {skills.map((skill, i) => (
            <motion.span
              key={skill.name}
              aria-label={`${skill.name}: ${skill.level}`}
              className="rounded-full border border-ink px-3 py-1.5 text-sm text-ink"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
            >
              {skill.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
