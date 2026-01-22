"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Mail, MapPin, Linkedin, Github, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    window.open(`mailto:hamalsaefudin48@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-background -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-foreground-secondary text-center max-w-2xl mx-auto mb-12">
            Feel free to reach out for collaborations or just to say hello
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground mb-6">Contact Information</h3>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <a
                    href="mailto:hamalsaefudin48@gmail.com"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground-muted">Email</p>
                      <p className="font-medium text-foreground">hamalsaefudin48@gmail.com</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-3 rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground-muted">Location</p>
                      <p className="font-medium text-foreground">Jakarta, Indonesia</p>
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
                  <Button className="w-full bg-[#0077B5] hover:bg-[#006097] text-white cursor-pointer">
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
                  <Button variant="outline" className="w-full border-foreground text-foreground hover:bg-foreground hover:text-background cursor-pointer">
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
                <CardTitle className="text-foreground">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Name <span className="text-primary" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="w-full px-3 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email <span className="text-primary" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="w-full px-3 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                      Subject <span className="text-primary" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full px-3 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message <span className="text-primary" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full px-3 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-primary-foreground cursor-pointer">
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
