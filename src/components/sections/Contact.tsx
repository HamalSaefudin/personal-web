"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Mail, Phone, MapPin, Linkedin, Github, Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-[#F3F4F6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1F2937] mb-4">
            Get In <span className="text-[#22C55E]">Touch</span>
          </h2>
          <p className="text-[#6B7280] text-center max-w-2xl mx-auto mb-12">
            Feel free to reach out for collaborations or just to say hello
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#1F2937] mb-6">Contact Information</h3>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <a
                    href="mailto:hamalsaefudin48@gmail.com"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#E5E7EB] transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-[#E5E7EB] rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-[#0D9488]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280]">Email</p>
                      <p className="font-medium text-[#1F2937]">hamalsaefudin48@gmail.com</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-3 rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#E5E7EB] rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-[#0D9488]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280]">Location</p>
                      <p className="font-medium text-[#1F2937]">Jakarta, Indonesia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <a
                  href="https://linkedin.com/in/hamal-saefudin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full bg-[#0077B5] hover:bg-[#006097] text-white">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </a>
                <a
                  href="https://github.com/HamalSaefudin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full border-[#1F2937] text-[#1F2937] hover:bg-[#1F2937] hover:text-white">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F2937]">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-[#1F2937]">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] text-[#1F2937]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-[#1F2937]">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] text-[#1F2937]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-[#1F2937]">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="What's this about?"
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] text-[#1F2937]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-[#1F2937]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Your message..."
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] text-[#1F2937] resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-[#1F2937]">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
