"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "hamalsaefudin48@gmail.com";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const errorTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      clearTimeout(copiedTimer.current);
      clearTimeout(errorTimer.current);
    },
    [],
  );

  const copy = async () => {
    clearTimeout(errorTimer.current);
    try {
      await navigator.clipboard.writeText(EMAIL);
      setError("");
      setCopied(true);
      clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setError("Copy failed. Select the address instead.");
      errorTimer.current = setTimeout(() => setError(""), 3000);
    }
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
          <button className="copy" type="button" onClick={copy} aria-label="Copy email address">
            <span className="copy-swap" data-copied={copied ? "true" : "false"} aria-hidden="true">
              <span className="copy-idle">Copy address</span>
              <span className="copy-done">Copied</span>
            </span>
          </button>
          <span className={error ? "c-status c-status-error" : "c-status"} role="status" aria-live="polite">
            {error || (copied ? "Copied." : "")}
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
