"use client";

import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-[#F3F4F6] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-[#1F2937] mb-4">
              Hamal<span className="text-[#22C55E]">.</span>
            </h3>
            <p className="text-[#6B7280] mb-4">
              Experienced Mobile Application Developer with 5+ years of expertise in React Native, Flutter, and ReactJS.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/HamalSaefudin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B7280] hover:text-[#22C55E] transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/hamal-saefudin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B7280] hover:text-[#22C55E] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:hamalsaefudin48@gmail.com"
                className="text-[#6B7280] hover:text-[#22C55E] transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#1F2937] uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:hamalsaefudin48@gmail.com"
                className="flex items-center gap-2 text-[#6B7280] hover:text-[#22C55E] transition-colors"
              >
                <Mail className="h-4 w-4" />
                hamalsaefudin48@gmail.com
              </a>
              <div className="flex items-center gap-2 text-[#6B7280]">
                <MapPin className="h-4 w-4" />
                Jakarta, Indonesia
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#1F2937] uppercase tracking-wider mb-4">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {["React Native", "Flutter", "ReactJS", "TypeScript", "Redux", "Jest"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-white border border-[#E5E7EB] text-[#6B7280] text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E7EB] mt-8 pt-8 text-center text-[#6B7280] text-sm">
          <p>&copy; {new Date().getFullYear()} Hamal Saefudin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
