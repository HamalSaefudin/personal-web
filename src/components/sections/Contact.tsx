"use client";

import { ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="bg-accent">
      <div className="mx-auto flex min-h-[258px] max-w-[958px] flex-col justify-center gap-[18px] px-6 py-12 lg:px-[54px]">
        <p className="font-mono text-[11px] tracking-[1px] text-accent-foreground">
          03 — LET&apos;S CONNECT
        </p>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-accent-foreground sm:text-[40px]">
            Let&apos;s make something useful.
          </h2>
          <a
            href="mailto:hamalsaefudin48@gmail.com"
            className="flex items-center gap-[12px] border-b border-accent-foreground pb-[12px] font-mono text-[12px] font-semibold tracking-[0.6px] text-accent-foreground"
          >
            HAMALSAEFUDIN48@GMAIL.COM
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
