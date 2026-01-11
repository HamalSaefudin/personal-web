"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Separator } from "@/components/ui/separator";
import { Briefcase, GraduationCap, Code2, Users } from "lucide-react";

const experiences = [
  {
    title: "Mobile Application Developer",
    company: "PT. Tiga Daya Digital Indonesia (Triputra Group)",
    period: "Sep 2023 - Present",
    description: [
      "Update react native & expo SDK version for current HRIS application",
      "Update react native version from 0.55 to 0.72 for client application",
      "Conduct code review for mobile developer team",
      "Implement codepush for delivering bugs fixing and feature updates",
      "Develop warehouse application using Flutter with shared preferences",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Danamas",
    period: "Jul 2023 - Sep 2023",
    description: [
      "Develop and maintain Danamas borrower mobile apps using React Native and TypeScript",
      "Create & maintain unit tests for borrower mobile apps using Jest and React Native Testing Library",
      "Fix bugs and adjust existing features for borrower website using AngularJS",
    ],
  },
  {
    title: "Mobile Application Developer",
    company: "Mandala Multifinance",
    period: "Mar 2022 - Jul 2023",
    description: [
      "Develop interactive mobile apps for collectors",
      "Discuss with UI/UX team and Project Manager about design limitations",
      "Handle offline-first case using SQLite",
      "Update React Native version for current project",
    ],
  },
  {
    title: "Freelance Mobile Application Developer",
    company: "KODEGIRI",
    period: "Feb 2022 - Oct 2022",
    description: [
      "Develop Android & iOS hotel booking application using React Native & TypeScript",
      "Using Redux Toolkit as state management library",
      "Using Redux Toolkit Query & Axios for handling HTTP requests",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Quadrant Synergy International",
    period: "Aug 2019 - Mar 2022",
    description: [
      "Develop website for real estate purchasing company using React.js, Redux, and Redux Saga",
      "Build mobile application for agent recruitment using React Native",
      "Set up Sentry for crash reporting",
      "Implement Azure AD and JWT tokens for secure authentication",
      "Use CodePush for easy app updates and WatermelonDB for offline-first cases",
    ],
  },
];

const education = {
  school: "Binus University Online Learning",
  degree: "Bachelor of Computer Science",
  period: "Jun 2020 - Jul 2024",
};

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1F2937] mb-4">
            About <span className="text-[#22C55E]">Me</span>
          </h2>
          <p className="text-[#6B7280] text-center max-w-2xl mx-auto mb-12">
            Experienced Mobile Application Developer with 4 years of expertise. Proficient in utilizing React Native and Flutter for mobile application development, as well as ReactJS for web applications.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          <ScrollReveal delay={0.1}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="h-6 w-6 text-[#22C55E]" />
                <h3 className="text-xl font-bold text-[#1F2937]">Experience</h3>
              </div>
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <Card key={index} className="border-l-4 border-l-[#22C55E]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-[#1F2937] text-base">{exp.title}</CardTitle>
                      <p className="text-[#0D9488] text-sm font-medium">{exp.company}</p>
                      <p className="text-[#6B7280] text-xs">{exp.period}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="text-[#6B7280] text-sm flex items-start gap-2">
                            <span className="text-[#22C55E] mt-1">•</span>
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-6 w-6 text-[#22C55E]" />
                <h3 className="text-xl font-bold text-[#1F2937]">Education</h3>
              </div>
              <Card className="border-l-4 border-l-[#22C55E]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#1F2937]">{education.school}</CardTitle>
                  <p className="text-[#0D9488] text-sm font-medium">{education.degree}</p>
                  <p className="text-[#6B7280] text-xs">{education.period}</p>
                </CardHeader>
              </Card>

              <Separator className="my-6" />

              <div className="flex items-center gap-3 mb-6">
                <Code2 className="h-6 w-6 text-[#22C55E]" />
                <h3 className="text-xl font-bold text-[#1F2937]">What I Do</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-[#22C55E]" />
                      <span className="font-medium text-[#1F2937]">Mobile Development</span>
                    </div>
                    <p className="text-[#6B7280] text-sm">
                      Building cross-platform mobile apps using React Native and Flutter
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 className="h-5 w-5 text-[#22C55E]" />
                      <span className="font-medium text-[#1F2937]">Web Development</span>
                    </div>
                    <p className="text-[#6B7280] text-sm">
                      Creating responsive web applications with ReactJS and TypeScript
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
