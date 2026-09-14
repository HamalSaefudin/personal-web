import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GridBackground } from "@/components/GridBackground";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <GridBackground />
      <Header />
      <main id="main-content" className="relative z-10">
        <Hero />
        <FeaturedProjects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
