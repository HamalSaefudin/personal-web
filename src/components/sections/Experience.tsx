"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

// Months since 2019-01, out of 96 (2019 – 2026).
const roles = [
  {
    key: "k1",
    label: "Tiga Daya Digital",
    start: 56,
    end: 95,
    period: "Sep 2023 – Present",
    title: "Mobile Application Developer",
    company: "PT. Tiga Daya Digital Indonesia",
    companyNote: "(Triputra Group)",
    what: "Mobile apps for Triputra Group, built with React Native and TypeScript.",
    current: true,
  },
  {
    key: "k2",
    label: "Danamas",
    start: 54,
    end: 57,
    period: "Jul 2023 – Sep 2023",
    title: "Frontend Developer",
    company: "Danamas",
    companyNote: null,
    what: "Short frontend engagement building web interfaces in ReactJS.",
    current: false,
  },
  {
    key: "k3",
    label: "Mandala Multifinance",
    start: 38,
    end: 55,
    period: "Mar 2022 – Jul 2023",
    title: "Mobile Application Developer",
    company: "Mandala Multifinance",
    companyNote: null,
    what: "Developed and maintained features for a multifinance company's mobile app.",
    current: false,
  },
  {
    key: "k4",
    label: "KODEGIRI",
    start: 37,
    end: 46,
    period: "Feb 2022 – Oct 2022",
    title: "Freelance Mobile Application Developer",
    company: "KODEGIRI",
    companyNote: null,
    what: "Client mobile apps in Flutter, delivered alongside a full-time role.",
    current: false,
  },
  {
    key: "k5",
    label: "Quadrant Synergy",
    start: 7,
    end: 39,
    period: "Aug 2019 – Mar 2022",
    title: "Frontend Developer",
    company: "Quadrant Synergy International",
    companyNote: null,
    what: "Nearly three years of frontend work in ReactJS. My start in professional development.",
    current: false,
  },
];

const years = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];

const TIMELINE_LABEL =
  "Timeline of five roles from August 2019 to the present. Quadrant Synergy 2019 to 2022, " +
  "KODEGIRI and Mandala Multifinance overlapping in 2022 and 2023, Danamas mid 2023, " +
  "Tiga Daya Digital from September 2023 onward.";

export function Experience() {
  const chartRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = chartRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      element.classList.add("in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.classList.add("in");
            observer.unobserve(element);
          }
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <figure className="gantt" role="img" aria-label={TIMELINE_LABEL} ref={chartRef}>
        <figcaption>Timeline, 2019 – now</figcaption>
        <div className="g-axis" aria-hidden="true">
          {years.map((year) => (
            <span key={year}>{year}</span>
          ))}
        </div>
        {roles.map((role, index) => (
          <div className={`g-row ${role.key}${role.current ? " now" : ""}`} key={role.key} aria-hidden="true">
            <span className="g-lab">{role.label}</span>
            <div className="g-track">
              <span
                className="g-bar"
                style={
                  { "--s": role.start, "--e": role.end, "--i": index } as CSSProperties
                }
              />
            </div>
          </div>
        ))}
        <ul className="g-legend" aria-hidden="true">
          {roles.map((role) => (
            <li className={`${role.key}${role.current ? " now" : ""}`} key={role.key}>
              <i />
              {role.label} · {role.period}
            </li>
          ))}
        </ul>
      </figure>

      <ol className="ledger">
        {roles.map((role) => (
          <li className={`job${role.current ? " cur" : ""}`} key={role.period}>
            <span className="per">{role.period}</span>
            <h3>{role.title}</h3>
            <p className="co">
              {role.company}
              {role.companyNote ? <small> {role.companyNote}</small> : null}
            </p>
            <p className="what">{role.what}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
