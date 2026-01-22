"use client";

import { motion } from "framer-motion";
import { Smartphone, Code2, Server, Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const skills = [
  {
    title: "Mobile Dev",
    tagline: "Main Focus",
    description: "6+ Years",
    subDescription: "React Native & Flutter",
    bgColor: "bg-primary",
    iconColor: "text-primary-foreground",
    icon: Smartphone,
    textColor: "text-primary-foreground",
  },
  {
    title: "Web Dev",
    tagline: "Secondary",
    description: "10+ Project",
    subDescription: "React, TypeScript",
    bgColor: "bg-secondary",
    iconColor: "text-secondary-foreground",
    icon: Code2,
    textColor: "text-secondary-foreground",
  },
  {
    title: "Full Stack",
    tagline: "Skills",
    description: "",
    subDescription: "Node, Jest & CI/CD",
    bgColor: "bg-gray-900",
    bgColorDark: "bg-black",
    iconColor: "text-primary",
    icon: Server,
    tags: ["React Native", "Flutter", "ReactJS", "TypeScript", "+4 more"],
    textColor: "text-white",
  },
];

export function Hero() {
  const { resolvedTheme } = useTheme();
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDark = resolvedTheme === "dark";

  return (
    <section id="overview" className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Hi, I'm <span className="text-primary">Hamal</span>
          </h1>
          <p className="text-xl text-foreground-secondary max-w-3xl">
            Experienced Mobile Application Developer with 5+ years of expertise in React Native, Flutter, and ReactJS development.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.5, delay: reducedMotion ? 0 : 0.1 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <a
            href="mailto:hamalsaefudin48@gmail.com?subject=Hiring Inquiry"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary-hover rounded-full px-6 py-2.5 font-medium transition-colors cursor-pointer"
          >
            Hire Me
          </a>
          
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/HamalSaefudin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2.5 rounded-full bg-surface border border-border text-foreground-muted hover:text-foreground hover:border-primary transition-colors cursor-pointer"
              aria-label="GitHub Profile"
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/hamal-saefudin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2.5 rounded-full bg-[#0077B5] text-white hover:bg-[#006097] transition-colors cursor-pointer"
              aria-label="LinkedIn Profile"
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:hamalsaefudin48@gmail.com"
              className="inline-flex items-center justify-center p-2.5 rounded-full bg-surface border border-border text-foreground-muted hover:text-foreground hover:border-primary transition-colors cursor-pointer"
              aria-label="Email Me"
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            const bgClass = isDark && skill.bgColorDark ? skill.bgColorDark : skill.bgColor;
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0.1 : 0.5, delay: reducedMotion ? 0 : 0.1 + index * 0.1 }}
                className={`${bgClass} rounded-2xl p-6 relative overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                style={{ minHeight: "180px" }}
              >
                <Icon className={`absolute bottom-10 right-4 w-28 h-28 ${skill.iconColor} opacity-15`} />
                
                <div className="relative z-10">
                  <span className={`text-xs font-medium uppercase tracking-wider ${skill.textColor}`}>
                    {skill.tagline}
                  </span>
                  <h3 className={`text-2xl font-bold ${skill.textColor} mt-1 mb-3`}>
                    {skill.title}
                  </h3>
                </div>
                
                <div className="relative z-10">
                  <p className={`text-sm mt-1 ${skill.textColor}`}>
                    {skill.subDescription}
                  </p>
                  <p className={`text-4xl mt-2 font-bold ${skill.textColor}`}>
                    {skill.description}
                  </p>
                </div>

                <div className="mt-auto">
                  {skill.tags && (
                    <div className="flex flex-wrap gap-2 mt-4 relative z-10 max-w-[250px]">
                    {skill.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-white/20 text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
