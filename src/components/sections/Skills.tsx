"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Smartphone, Code2, Server, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Mobile",
    icon: Smartphone,
    skills: ["React Native", "Flutter", "Dart", "Expo", "Redux", "Redux Toolkit", "SQLite", "Codepush"],
  },
  {
    title: "Frontend",
    icon: Code2,
    skills: ["ReactJS", "TypeScript", "HTML", "CSS", "Redux Saga", "React Query", "Storybook", "AngularJS"],
  },
  {
    title: "Backend / Tools",
    icon: Server,
    skills: ["Node.js", "Azure AD", "JWT", "Sentry", "App Center", "WatermelonDB"],
  },
  {
    title: "Testing",
    icon: Wrench,
    skills: ["Jest", "React Testing Library", "React Native Testing Library"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-[#F3F4F6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1F2937] mb-4">
            Technical <span className="text-[#22C55E]">Skills</span>
          </h2>
          <p className="text-[#6B7280] text-center max-w-2xl mx-auto mb-12">
            Proficient in modern mobile and web development technologies
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-[#22C55E]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#1F2937]">
                    <category.icon className="h-5 w-5 text-[#22C55E]" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-white text-[#1F2937] border border-[#E5E7EB] hover:bg-[#E5E7EB] transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
