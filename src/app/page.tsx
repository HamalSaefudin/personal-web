import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Contact } from "@/components/sections/Contact";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content">
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
