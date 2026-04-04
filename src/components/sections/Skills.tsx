"use client";

import { motion } from "framer-motion";

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
    <section id="skills" className="py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-sm font-medium text-foreground-secondary uppercase tracking-wider mb-6"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35 }}
        >
          Skills
        </motion.h2>

        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {skills.map((skill, i) => (
            <motion.span
              key={skill.name}
              className="text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
            >
              {skill.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
