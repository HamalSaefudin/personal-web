"use client";

import { motion } from "framer-motion";
import { Smartphone, Code2, Server, TestTube } from "lucide-react";

const skills = [
  {
    category: "Mobile Development",
    color: "bg-blue-600",
    iconColor: "text-white",
    description: "Expert in building cross-platform apps using React Native and Flutter with Redux, Redux Saga, and SQLite",
    icon: Smartphone,
  },
  {
    category: "Frontend Engineering",
    color: "bg-emerald-600",
    iconColor: "text-white",
    description: "Proficient in ReactJS, TypeScript, HTML, CSS, React Query, and Storybook",
    icon: Code2,
  },
  {
    category: "Backend & Tools",
    color: "bg-violet-600",
    iconColor: "text-white",
    description: "Experience with Node.js, Azure AD, JWT authentication, Sentry, and App Center Codepush",
    icon: Server,
  },
  {
    category: "Testing",
    color: "bg-orange-500",
    iconColor: "text-white",
    description: "Skilled in Jest, React Testing Library, and React Native Testing Library",
    icon: TestTube,
  },
];

export function Skills() {
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section id="skills" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.5 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <div className="space-y-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, x: reducedMotion ? 0 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: reducedMotion ? 0.1 : 0.5, delay: reducedMotion ? 0 : index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                >
                   <div className={`w-10 h-10 rounded-lg ${skill.color} flex items-center justify-center flex-shrink-0`}>
                     <Icon className={`h-5 w-5 ${skill.iconColor}`} />
                   </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{skill.category}</h4>
                    <p className="text-sm text-foreground-muted">{skill.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
