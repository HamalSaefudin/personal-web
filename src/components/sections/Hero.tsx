import { ArrowRight } from "lucide-react";
import { PhoneCard } from "@/components/PhoneCard";

export function Hero() {
  return (
    <div className="hero" id="top">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <p className="role mono">Mobile Application Developer</p>
            <h1>
              Hamal
              <i>
                Saefudin<span className="dot">.</span>
              </i>
            </h1>
            <p className="pitch">
              I build React Native and Flutter apps for finance and enterprise teams in Indonesia. I
              started in web frontend, so I&apos;m just as comfortable in a ReactJS codebase as in a
              native build pipeline.
            </p>
            <p className="pitch">
              Six years of shipping, five roles since 2019 — Triputra Group, Mandala Multifinance,
              Danamas, KODEGIRI and Quadrant Synergy International.
            </p>
            <div className="cta">
              <a className="btn" href="mailto:hamalsaefudin48@gmail.com?subject=Hello%20Hamal">
                Email me
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.6} />
              </a>
              <a
                className="link"
                href="https://github.com/hamalsaefudin"
                rel="noopener"
                target="_blank"
              >
                Code on GitHub
              </a>
            </div>
          </div>

          <div className="phone-wrap">
            <PhoneCard />
          </div>
        </div>

        <dl className="facts">
          <div>
            <dt>Role</dt>
            <dd>Mobile Application Developer</dd>
          </div>
          <div>
            <dt>Experience</dt>
            <dd>6+ years</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>Jakarta, Indonesia</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <span className="ok" aria-hidden="true" />
              Open to new roles, remote-friendly
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
