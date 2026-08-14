import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content" className="relative z-10 pt-12">
          <Hero />
          <Experience />
          <Education />
          <Skills />
          <FeaturedProjects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
