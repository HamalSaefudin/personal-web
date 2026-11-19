"use client";

import { useState } from "react";

const EMAIL = "hamalsaefudin48@gmail.com";

export function Contact() {
  const [status, setStatus] = useState("");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setStatus("Copied.");
    } catch {
      setStatus("Copy failed. Select the address instead.");
    }
    window.setTimeout(() => setStatus(""), 2500);
  };

  return (
    <footer className="contact" id="contact">
      <div className="wrap">
        <p className="mono">05 / Contact</p>
        <h2>
          Hiring for <em>mobile?</em> Send me a message.
        </h2>
        <a className="mail" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        <div className="copyrow">
          <button className="copy" type="button" onClick={copy}>
            Copy address
          </button>
          <span className="c-status" role="status" aria-live="polite">
            {status}
          </span>
        </div>
        <ul className="c-links">
          <li>
            <a href="https://github.com/hamalsaefudin" rel="noopener" target="_blank">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/hamalsaefudin" rel="noopener" target="_blank">
              LinkedIn
            </a>
          </li>
        </ul>
        <p className="legal">
          <span>© {new Date().getFullYear()} Hamal Saefudin</span>
          <span>Jakarta, Indonesia (GMT+7)</span>
        </p>
      </div>
    </footer>
  );
}
