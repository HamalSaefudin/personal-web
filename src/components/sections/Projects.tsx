"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  company: string;
  description: string;
  technologies: string[];
  playStoreUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: "DDMS Mobile Apps",
    company: "PT. Tiga Daya Digital Indonesia",
    description: "Digital Document Management System mobile application for Triputra Group employees. Features document viewing, approval workflows, and real-time notifications.",
    technologies: ["React Native", "TypeScript", "Redux Toolkit", "CodePush"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=id.co.dayagroup.ddms",
  },
  {
    title: "Prohace",
    company: "PT. Tiga Daya Digital Indonesia",
    description: "Employee management and attendance tracking application. Includes GPS-based check-in, leave requests, and payroll overview.",
    technologies: ["React Native", "Flutter", "Redux Saga", "SQLite"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.eksad.cx.prohace",
  },
  {
    title: "Danamas App",
    company: "Danamas",
    description: "Peer-to-peer lending platform for borrowers. Features loan applications, repayment tracking, and account management.",
    technologies: ["React Native", "TypeScript", "Jest", "AngularJS"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.danamas.mergingapp",
  },
  {
    title: "Mandala Multifinance Apps",
    company: "Mandala Multifinance",
    description: "Collection management app for financial institution. Features offline-first capabilities, payment tracking, and customer communication.",
    technologies: ["React Native", "SQLite", "Redux", "CodePush"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.mantisgo",
  },
  {
    title: "Miruum",
    company: "KODEGIRI",
    description: "Hotel booking application for Indonesian market. Features room reservations, payment integration, and booking management.",
    technologies: ["React Native", "TypeScript", "Redux Toolkit", "Axios"],
    playStoreUrl: "https://www.instagram.com/miruum.id/",
  },
  {
    title: "Mirecruit",
    company: "Quadrant Synergy International",
    description: "Agent recruitment application for Manulife Indonesia. Features application tracking, document upload, and interview scheduling.",
    technologies: ["React Native", "Azure AD", "WatermelonDB", "Sentry"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.manulife",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1F2937] mb-4">
            Featured <span className="text-[#22C55E]">Projects</span>
          </h2>
          <p className="text-[#6B7280] text-center max-w-2xl mx-auto mb-12">
            A selection of mobile applications I&apos;ve developed and maintained
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader>
                  <CardTitle className="text-[#1F2937] text-lg">{project.title}</CardTitle>
                  <p className="text-[#0D9488] text-sm font-medium">{project.company}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-[#6B7280] text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs border-[#E5E7EB] text-[#6B7280]"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  {project.playStoreUrl && (
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 bg-[#22C55E] hover:bg-[#16A34A] text-[#1F2937]"
                      asChild
                    >
                      <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View App
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
