"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { calculateYearsOfExperience } from "@/lib/utils";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const YEARS_OF_EXPERIENCE = calculateYearsOfExperience("2019-10-01");

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-4 lg:pt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white to-emerald-100 -z-10" />
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20">
          <div className="lg:w-3/5 order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6 lg:hidden">
              <ScrollReveal>
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src="/newavatar.png"
                    alt="Hamal Saefudin"
                    fill
                    className="object-cover rounded-full shadow-lg"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <span className="inline-block px-3 py-1 bg-white/80 backdrop-blur-sm border border-[#E5E7EB] text-[#16A34A] text-xs font-medium rounded-full shadow-sm">
                  Open for collaboration
                </span>
              </ScrollReveal>
            </div>

            <ScrollReveal>
              <span className="hidden lg:inline-block px-4 py-1 bg-white/80 backdrop-blur-sm border border-[#E5E7EB] text-[#16A34A] text-sm font-medium rounded-full mb-6 shadow-sm">
                Open for collaboration
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F2937] mb-6">
                Hi, I&apos;m <span className="text-[#22C55E]">Hamal Saefudin</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl sm:text-2xl text-[#6B7280] mb-8 max-w-2xl">
                Experienced Mobile Application Developer with {YEARS_OF_EXPERIENCE}+ years of expertise in React Native, Flutter, and ReactJS
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="flex flex-col sm:flex-row items-start gap-4 mb-8">
              <a href="#projects">
                <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white font-medium px-8 h-12 rounded-full shadow-lg shadow-[#22C55E]/25">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" className="border-2 border-[#22C55E] text-[#22C55E] hover:bg-[#DCFCE7] hover:text-[#22C55E] h-12 rounded-full px-8">
                  Contact Me
                </Button>
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.4} className="flex items-center gap-6">
              <a
                href="https://github.com/HamalSaefudin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B7280] hover:text-[#22C55E] transition-colors hover:scale-110 transform"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/hamal-saefudin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B7280] hover:text-[#22C55E] transition-colors hover:scale-110 transform"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:hamalsaefudin48@gmail.com"
                className="text-[#6B7280] hover:text-[#22C55E] transition-colors hover:scale-110 transform"
              >
                <Mail className="h-6 w-6" />
              </a>
            </ScrollReveal>
          </div>

          <div className="lg:w-2/5 flex justify-center order-1 lg:order-2 hidden lg:flex">
            <ScrollReveal delay={0.2}>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <Image
                  src="/newavatar.png"
                  alt="Hamal Saefudin"
                  fill
                  className="object-cover rounded-full shadow-xl"
                  priority
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
