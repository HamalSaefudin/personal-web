import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Reveal } from "@/components/Reveal";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Stack } from "@/components/sections/Stack";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <Header />
      <main id="main-content">
        <Hero />

        <section id="work" aria-labelledby="work-h">
          <div className="wrap sec">
            <Reveal>
              <div className="sec-label">
                <span className="mono">01 / Selected work</span>
                <h2 id="work-h">Apps I&apos;ve shipped</h2>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div>
                <FeaturedProjects />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="experience" aria-labelledby="exp-h">
          <div className="wrap sec">
            <Reveal>
              <div className="sec-label">
                <span className="mono">02 / Experience</span>
                <h2 id="exp-h">Work history</h2>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div>
                <Experience />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="stack" aria-labelledby="stack-h">
          <div className="wrap sec">
            <Reveal>
              <div className="sec-label">
                <span className="mono">03 / Stack</span>
                <h2 id="stack-h">What I work in</h2>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div>
                <Stack />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="education" aria-labelledby="edu-h">
          <div className="wrap sec">
            <Reveal>
              <div className="sec-label">
                <span className="mono">04 / Education</span>
                <h2 id="edu-h">Studies</h2>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div>
                <Education />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Contact />
    </div>
  );
}
