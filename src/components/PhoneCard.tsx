"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";

const SCREENS = ["Profile", "Selected work", "Contact"] as const;

const apps = [
  {
    name: "DDMS Mobile Apps",
    year: "2023",
    href: "https://play.google.com/store/apps/details?id=id.co.dayagroup.ddms",
  },
  {
    name: "Prohace",
    year: "2023",
    href: "https://play.google.com/store/apps/details?id=com.eksad.cx.prohace",
  },
  {
    name: "Danamas App",
    year: "2023",
    href: "https://play.google.com/store/apps/details?id=com.danamas.mergingapp",
  },
];

const EMAIL = "hamalsaefudin48@gmail.com";

function useJakartaClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Jakarta",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date()),
        );
      } catch {
        setTime(null);
      }
    };

    tick();
    const id = window.setInterval(tick, 20000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

const CLICK_TOLERANCE = 6;
const FLICK_VELOCITY = 0.25; // px/ms

export function PhoneCard() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const clock = useJakartaClock();

  const drag = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScroll: 0,
    prevX: 0,
    prevT: 0,
    lastX: 0,
    lastT: 0,
    moved: false,
  });

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.min(SCREENS.length - 1, Math.max(0, index));
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: clamped * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const next = Math.round(track.scrollLeft / track.clientWidth);
        setActive(Math.min(SCREENS.length - 1, Math.max(0, next)));
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollLeft = active * track.clientWidth;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    // Touch and trackpads already scroll natively, with momentum. Only mice need this.
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const track = event.currentTarget;
    track.setPointerCapture(event.pointerId);
    const now = performance.now();
    drag.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      prevX: event.clientX,
      prevT: now,
      lastX: event.clientX,
      lastT: now,
      moved: false,
    };
    setDragging(true);
  };

  const finishDrag = useCallback(
    (track: HTMLDivElement, pointerId: number) => {
      const state = drag.current;
      if (!state.active || state.pointerId !== pointerId) return;

      state.active = false;
      setDragging(false);
      if (track.hasPointerCapture(pointerId)) track.releasePointerCapture(pointerId);

      // If no click follows this drag (pointer released outside the device), drop the flag
      // so the next real click is not swallowed.
      if (state.moved) {
        window.setTimeout(() => {
          drag.current.moved = false;
        }, 250);
      }

      const width = track.clientWidth;
      // Only a fresh sample counts as a flick; stale samples after a missed pointerup must not
      // throw the track a screen further.
      const fresh = state.lastT - state.prevT > 0 && performance.now() - state.lastT <= 120;
      const velocity = fresh ? (state.lastX - state.prevX) / (state.lastT - state.prevT) : 0;
      const startIndex = Math.round(state.startScroll / width);

      // A flick moves exactly one screen from where the drag began; otherwise snap to the
      // nearest screen, so a long drag and a flick never add up to two screens.
      const index =
        Math.abs(velocity) > FLICK_VELOCITY
          ? startIndex + (velocity < 0 ? 1 : -1)
          : Math.round(track.scrollLeft / width);
      goTo(index);
    },
    [goTo],
  );

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state.active || event.pointerId !== state.pointerId) return;

    // The browser never sends pointerup when the button is released outside the window;
    // the first move back inside carries buttons === 0, which means the drag is over.
    if (event.buttons === 0) {
      finishDrag(event.currentTarget, event.pointerId);
      return;
    }

    const track = event.currentTarget;
    const now = performance.now();
    state.prevX = state.lastX;
    state.prevT = state.lastT;
    state.lastX = event.clientX;
    state.lastT = now;
    if (Math.abs(event.clientX - state.startX) > CLICK_TOLERANCE) state.moved = true;
    track.scrollLeft = state.startScroll - (event.clientX - state.startX);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    finishDrag(event.currentTarget, event.pointerId);
  };

  const onLostCapture = (event: ReactPointerEvent<HTMLDivElement>) => {
    finishDrag(event.currentTarget, event.pointerId);
  };

  useEffect(() => {
    if (!dragging) return;
    const track = trackRef.current;
    if (!track) return;

    const end = () => finishDrag(track, drag.current.pointerId);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    window.addEventListener("blur", end);
    return () => {
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      window.removeEventListener("blur", end);
    };
  }, [dragging, finishDrag]);

  const suppressClickAfterDrag = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!drag.current.moved) return;
    drag.current.moved = false;
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="phone" role="group" aria-label="Phone preview: profile, selected work and contact">
      <div className="screen">
        <div
          className={`screens${dragging ? " dragging" : ""}`}
          ref={trackRef}
          tabIndex={0}
          role="group"
          aria-label="Phone screens, swipe or use arrow keys"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={onLostCapture}
          onClickCapture={suppressClickAfterDrag}
          onDragStart={(event) => event.preventDefault()}
        >
          <section className="panel" aria-label="Profile">
            <div className="s-head mono">
              <b>{clock ?? "--:--"}</b>
              <span>Jakarta</span>
            </div>
            <p className="s-now">Currently</p>
            <h2>Mobile Application Developer</h2>
            <p className="s-co">
              PT. Tiga Daya Digital Indonesia
              <br />
              Triputra Group
            </p>
            <ul className="s-rows">
              <li>
                <span>Since</span>
                <span>Sep 2023</span>
              </li>
              <li>
                <span>Stack</span>
                <span>RN / TS</span>
              </li>
              <li>
                <span>Targets</span>
                <span>Android, iOS</span>
              </li>
            </ul>
          </section>

          <section className="panel" aria-label="Selected work">
            <div className="s-head mono">
              <b>Selected work</b>
              <span>03</span>
            </div>
            <ul className="s-apps">
              {apps.map((app) => (
                <li key={app.name}>
                  <a href={app.href} rel="noopener" target="_blank" draggable={false}>
                    <span>{app.name}</span>
                    <span>{app.year}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="s-foot mono">Tap a row to open Play Store</p>
          </section>

          <section className="panel" aria-label="Contact">
            <div className="s-head mono">
              <b>Contact</b>
              <span>GMT+7</span>
            </div>
            <h2>Say hello</h2>
            <a className="s-mail" href={`mailto:${EMAIL}`} draggable={false}>
              {EMAIL}
            </a>
            <ul className="s-rows">
              <li>
                <span>GitHub</span>
                <a href="https://github.com/hamalsaefudin" rel="noopener" target="_blank" draggable={false}>
                  hamalsaefudin
                </a>
              </li>
              <li>
                <span>LinkedIn</span>
                <a href="https://www.linkedin.com/in/hamalsaefudin" rel="noopener" target="_blank" draggable={false}>
                  in/hamalsaefudin
                </a>
              </li>
              <li>
                <span>Based in</span>
                <span>Jakarta</span>
              </li>
            </ul>
          </section>
        </div>

        <div className="s-dots">
          {SCREENS.map((label, index) => (
            <button
              className="s-dot"
              type="button"
              key={label}
              aria-label={`Show screen ${index + 1}: ${label}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
