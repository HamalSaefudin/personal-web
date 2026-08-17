"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow number="06">Contact</SectionEyebrow>

          <motion.div
            className="rounded-[24px] border border-ink px-6 py-12 sm:px-12"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              aria-hidden="true"
              className="mx-auto grid size-12 place-items-center rounded-xl border border-ink text-lg font-medium"
            >
              H
            </div>
            <h2 className="mt-8 text-4xl font-medium leading-tight tracking-[-0.04em] text-ink sm:text-6xl">
              Let&apos;s make something useful.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-foreground-secondary">
              Feel free to reach out for collaborations or just to say hello.
            </p>

            <Button asChild className="mt-8">
              <a
                href="mailto:hamalsaefudin48@gmail.com"
                aria-label="Email Hamal"
              >
                Email Hamal
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>

            <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
              <a href="https://linkedin.com/in/hamal-saefudin" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/HamalSaefudin" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <span className="text-foreground-secondary">Jakarta, Indonesia</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
