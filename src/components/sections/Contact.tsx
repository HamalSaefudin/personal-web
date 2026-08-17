"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/SectionEyebrow";

export function Contact() {
  return (
    <section id="contact" className="py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionEyebrow number="06">Contact</SectionEyebrow>

        <div className="space-y-4">
          <motion.p
            className="text-lg leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.06 }}
          >
            Feel free to reach out for collaborations or just to say hello.
          </motion.p>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <p>
              <a href="mailto:hamalsaefudin48@gmail.com" className="font-medium">
                hamalsaefudin48@gmail.com
              </a>
            </p>
            <p>
              <a
                href="https://linkedin.com/in/hamal-saefudin"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium"
              >
                LinkedIn
              </a>
              {" · "}
              <a
                href="https://github.com/HamalSaefudin"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium"
              >
                GitHub
              </a>
            </p>
            <p className="text-sm text-foreground-secondary">
              Jakarta, Indonesia
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
