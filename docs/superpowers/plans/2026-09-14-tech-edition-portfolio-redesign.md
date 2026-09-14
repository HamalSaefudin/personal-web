# Tech Edition Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the editorial light theme with the dark/light "Tech Edition" system from the pencil designs, with a working theme toggle.

**Architecture:** Theme tokens live as CSS variables flipped by a `[data-theme]` attribute set on `<html>` by an inline head script (no flash). A `useTheme` hook drives the header toggle. Sections are rebuilt one at a time against the two pencil layouts, reusing existing data arrays, `ScrollReveal`, `GridBackground`, and shadcn primitives.

**Tech Stack:** React 19, TanStack Start/Router, Tailwind CSS v4 (`@theme inline`), Framer Motion, lucide-react, vitest + testing-library.

## Global Constraints

- Palette dark: canvas `#0A0D12`, primary `#F4F7FB`, secondary `#A6B1C1`, border `#25303D`, panel `#111720`.
- Palette light: canvas `#F8FAFC`, primary `#101828`, secondary `#667085`, border `#D9E0E8`, panel `#FFFFFF`.
- Accent (both): `#55E6A5`; accent foreground `#07130D`.
- Fonts: Geist (all text via `font-sans`), IBM Plex Mono (labels via `font-mono`). No new dependencies.
- Keep existing project/experience data arrays unchanged in content; add only a per-project `swatch` color.
- Sharp geometry: 1px outlines, square corners, hairline borders, uppercase mono labels. No gradients, no box-shadows.
- Page content max-width `958px`, side padding `54px` desktop / fluid mobile. Sections separated by 1px borders.
- `prefers-reduced-motion` respected; exact-property transitions only.
- No embedding of the pencil hero base64 images — use the CSS `GridBackground`.
- Tests: `npm run test:run` must pass; `npm run build` and `npm run lint` must pass at the end.

---

## File Structure

- Modify `src/styles.css` — rewrite theme tokens (dark + light), fonts, base styles, `.bg-grid` grid utility.
- Modify `src/routes/__root.tsx` — font links, theme bootstrap inline script, theme-color meta.
- Create `src/hooks/useTheme.ts` — `useTheme` hook returning `{ theme, toggleTheme }`.
- Modify `src/components/layout/Header.tsx` — brand, nav links, functional theme toggle, mobile sheet. Add `relative z-10`.
- Modify `src/components/sections/Hero.tsx` — pencil hero layout with orbital diagram.
- Modify `src/components/sections/FeaturedProjects.tsx` — "Selected Work" rows; update its test.
- Modify `src/components/sections/Experience.tsx` — "About & Capabilities" two-column layout; add a test.
- Modify `src/components/sections/Contact.tsx` — accent band; update its test.
- Modify `src/components/layout/Footer.tsx` — pencil footer.
- Modify `src/routes/index.tsx` — new section composition, add `GridBackground`.
- Delete `src/components/SectionEyebrow.tsx`, `src/components/sections/Education.tsx`, `src/components/sections/Education.test.tsx`, `src/components/sections/Skills.tsx`.
- Create `src/components/layout/Header.test.tsx`, `src/components/sections/Experience.test.tsx`.

Note: `src/components/sections/About.tsx` is already dead code (not imported by any route) — leave it untouched.

---

### Task 1: Theme foundation (tokens, bootstrap script, `useTheme` hook)

**Files:**
- Modify: `src/styles.css` (full rewrite)
- Modify: `src/routes/__root.tsx` (head function only)
- Create: `src/hooks/useTheme.ts`
- Test: `src/hooks/useTheme.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `useTheme(): { theme: "dark" | "light"; toggleTheme: () => void }` — read by Header (Task 2). Global `[data-theme]` attribute on `<html>` and `localStorage["theme"]`.

- [ ] **Step 1: Write the failing hook test**

Create `src/hooks/useTheme.test.ts`:

```tsx
import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTheme } from "@/hooks/useTheme";

describe("useTheme", () => {
  it("starts dark and toggles to light, updating document and localStorage", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("dark");

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/hooks/useTheme.test.ts`
Expected: FAIL — module `@/hooks/useTheme` not found.

- [ ] **Step 3: Create the hook**

Create `src/hooks/useTheme.ts`:

```ts
"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === "light" || current === "dark") {
      setTheme(current);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        // storage unavailable; theme still applies for this session
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/hooks/useTheme.test.ts`
Expected: PASS (both assertions).

- [ ] **Step 5: Rewrite the theme stylesheet**

Replace the full contents of `src/styles.css`:

```css
@import "tailwindcss/index.css";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-foreground-secondary: var(--foreground-secondary);
  --color-foreground-muted: var(--foreground-secondary);
  --color-border: var(--border);
  --color-ink: var(--foreground);
  --color-panel: var(--panel);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-primary: var(--accent);
  --color-primary-foreground: var(--accent-foreground);
  --color-cream-paper: var(--panel);
  --color-sunshine-highlight: var(--accent);
  --color-mint-signal: var(--accent);
  --font-sans: var(--font-geist);
  --font-mono: var(--font-plex-mono);
}

:root,
[data-theme="dark"] {
  --background: #0a0d12;
  --foreground: #f4f7fb;
  --foreground-secondary: #a6b1c1;
  --border: #25303d;
  --panel: #111720;
  --accent: #55e6a5;
  --accent-foreground: #07130d;
  --font-geist: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-plex-mono: "IBM Plex Mono", ui-monospace, "SFMono-Regular", monospace;
}

[data-theme="light"] {
  --background: #f8fafc;
  --foreground: #101828;
  --foreground-secondary: #667085;
  --border: #d9e0e8;
  --panel: #ffffff;
  --accent: #55e6a5;
  --accent-foreground: #07130d;
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground font-sans;
    font-feature-settings: "ss03", "ss04";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    transition: color 200ms ease-out, opacity 200ms ease-out;
    text-underline-offset: 3px;
  }

  a:hover {
    opacity: 0.72;
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
}

.bg-grid {
  background-image:
    linear-gradient(to right, var(--border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--border) 1px, transparent 1px);
  background-size: 56px 56px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 6: Add fonts, bootstrap script, and theme-color to the root document**

In `src/routes/__root.tsx`, inside the `head: () => ({ ... })` object:

1. Replace the DM Sans font link with Geist + IBM Plex Mono:

```ts
{
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=IBM+Plex+Mono:wght@400;600&display=swap",
},
```

2. Add a `scripts` array to the `head()` return (TanStack Router renders these inside `<head>` before body paint):

```ts
scripts: [
  {
    children: `(function(){try{var t=localStorage.getItem("theme");if(!t){t=(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches)?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})();`,
  },
],
```

3. Change the `theme-color` meta value from `#f8f5ed` to `#0a0d12`.

The final `head` function should return: the existing meta list (with the updated theme-color), the existing links list (with the Geist/Plex-Mono stylesheet replacing DM Sans), and the `scripts` array above.

- [ ] **Step 7: Verify build still type-checks**

Run: `npm run build`
Expected: builds successfully (the `useTheme` hook is compiled; token aliases keep `button.tsx`, `ScrollReveal`, etc. compiling).

- [ ] **Step 8: Commit**

```bash
git add src/styles.css src/routes/__root.tsx src/hooks/useTheme.ts src/hooks/useTheme.test.ts
git commit -m "feat: add dark/light tech theme tokens and useTheme hook"
```

---

### Task 2: Header rebuild with working theme toggle

**Files:**
- Modify: `src/components/layout/Header.tsx` (full rewrite)
- Test: create `src/components/layout/Header.test.tsx`

**Interfaces:**
- Consumes: `useTheme` from `@/hooks/useTheme` (Task 1).
- Produces: `<Header />` with `id="overview"` brand anchor, nav links `#overview` / `#experience` / `#projects`, theme toggle `<button>`, mobile sheet.

- [ ] **Step 1: Write the failing header test**

Create `src/components/layout/Header.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout/Header";

describe("Header", () => {
  it("renders the brand, nav links, and toggles the theme", async () => {
    render(<Header />);
    const user = userEvent.setup();

    expect(screen.getByText("HAMAL // DEV")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "PROJECTS" })).toHaveAttribute("href", "#projects");

    expect(screen.getByRole("button", { name: /switch to light mode/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /switch to light mode/i }));
    expect(screen.getByRole("button", { name: /switch to dark mode/i })).toBeInTheDocument();
  });
});
```

Note: the visible nav link text is uppercase via CSS; the `name` matcher is case-insensitive so `"PROJECTS"` matches.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/layout/Header.test.tsx`
Expected: FAIL — "HAMAL // DEV" not found.

- [ ] **Step 3: Rewrite the header**

Replace the full contents of `src/components/layout/Header.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useTheme } from "@/hooks/useTheme";

const navItems = [
  { name: "Overview", href: "#overview" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = theme === "dark";

  return (
    <header className="relative z-10 border-b border-border">
      <div className="mx-auto flex min-h-[81px] max-w-[958px] items-center justify-between px-6 lg:px-[54px]">
        <a href="#overview" className="flex items-center gap-[10px]">
          <span aria-hidden="true" className="block h-[14px] w-[14px] -rotate-45 bg-accent" />
          <span className="font-mono text-[15px] font-semibold tracking-[1px] text-foreground">
            HAMAL // DEV
          </span>
        </a>

        <nav className="hidden items-center gap-[26px] sm:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[1px] text-foreground-secondary transition-colors hover:text-foreground"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center gap-2 border border-border px-[9px] py-[7px] text-foreground transition-colors hover:border-foreground-secondary"
          >
            {isDark ? (
              <Moon className="size-[13px] text-accent" aria-hidden="true" />
            ) : (
              <Sun className="size-[13px] text-accent" aria-hidden="true" />
            )}
            <span className="font-mono text-[10px] font-semibold tracking-[1px]">
              {isDark ? "DARK" : "LIGHT"}
            </span>
          </button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="p-1.5 text-foreground-secondary transition-colors hover:text-foreground sm:hidden"
                aria-label="Toggle menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M2 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-3/4 sm:max-w-sm">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate to sections of the portfolio.
              </SheetDescription>
              <div className="flex flex-col gap-4 p-6 pt-14">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="py-2 font-mono text-[11px] uppercase tracking-[1px] text-foreground-secondary transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/layout/Header.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/Header.test.tsx
git commit -m "feat: rebuild header with tech branding and theme toggle"
```

---

### Task 3: Hero rebuild

**Files:**
- Modify: `src/components/sections/Hero.tsx` (full rewrite)

**Interfaces:**
- Consumes: `GridBackground` is composed once at the route level (Task 7); Hero itself only renders the content column + orbital diagram.
- Produces: `<Hero />` — `<section id="overview">` with eyebrow, headline, summary, `GET IN TOUCH` mailto CTA, orbital diagram (hidden below `lg`).

No state logic → no unit test; verified by build and manual check.

- [ ] **Step 1: Rewrite the hero**

Replace the full contents of `src/components/sections/Hero.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.3, ease: [0.23, 1, 0.32, 1] as const },
    }),
  };

  return (
    <section id="overview" className="relative border-b border-border">
      <div className="relative z-10 mx-auto max-w-[958px] px-6 lg:px-[54px]">
        <div className="flex min-h-[640px] flex-col justify-center py-20 lg:min-h-[740px]">
          <motion.p
            className="font-mono text-[11px] tracking-[1px] text-accent"
            initial="hidden"
            animate="visible"
            variants={reveal}
            custom={0}
          >
            [ MOBILE APPLICATION DEVELOPER · JAKARTA, INDONESIA ]
          </motion.p>

          <motion.h1
            className="mt-8 max-w-[720px] text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[52px] lg:text-[64px] lg:leading-[63px]"
            initial="hidden"
            animate="visible"
            variants={reveal}
            custom={0.06}
          >
            Hi, I&apos;m Hamal.
            <br />
            I build reliable
            <br />
            mobile products.
          </motion.h1>

          <motion.p
            className="mt-10 max-w-[425px] text-[15px] leading-6 text-foreground-secondary sm:text-[17px] sm:leading-[26px]"
            initial="hidden"
            animate="visible"
            variants={reveal}
            custom={0.12}
          >
            Mobile Application Developer with 6+ years of experience in React Native, ReactJS,
            Flutter and TypeScript.
          </motion.p>

          <motion.div
            className="mt-12"
            initial="hidden"
            animate="visible"
            variants={reveal}
            custom={0.18}
          >
            <a
              href="mailto:hamalsaefudin48@gmail.com"
              className="inline-flex items-center gap-[14px] bg-accent px-[18px] py-[14px] font-mono text-[11px] font-semibold tracking-[0.7px] text-accent-foreground transition-opacity hover:opacity-90"
            >
              GET IN TOUCH
              <ArrowUpRight aria-hidden="true" className="size-[15px]" />
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute right-[54px] top-[255px] hidden lg:block" aria-hidden="true">
        <div className="relative h-[260px] w-[220px]">
          <div className="absolute left-[10px] top-[10px] size-[200px] rounded-full border border-border" />
          <div className="absolute left-[57px] top-[57px] size-[106px] rounded-full border border-accent" />
          <div className="absolute left-[96px] top-[96px] size-[30px] -rotate-45 bg-accent" />
          <p className="absolute left-0 top-[232px] font-mono text-[10px] tracking-[1px] text-foreground-secondary">
            STACK // RN · FLUTTER · TS
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: rebuild hero as tech edition layout"
```

---

### Task 4: Selected Work (projects) rebuild

**Files:**
- Modify: `src/components/sections/FeaturedProjects.tsx` (full rewrite)
- Modify: `src/components/sections/FeaturedProjects.test.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `<FeaturedProjects />` — `<section id="projects">`, 6 rows from the existing `projects` array plus a `swatch` hex per project, first 3 shown, `LOAD 3 MORE PROJECTS` / `SHOW LESS` button toggling `showAll`.

- [ ] **Step 1: Update the failing test**

Replace the full contents of `src/components/sections/FeaturedProjects.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";

describe("FeaturedProjects", () => {
  it("shows three projects first and expands to all six", async () => {
    render(<FeaturedProjects />);
    const user = userEvent.setup();

    expect(screen.getByText("DDMS Mobile Apps")).toBeInTheDocument();
    expect(screen.queryByText("Miruum")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /load 3 more projects/i }));
    expect(screen.getByText("Miruum")).toBeInTheDocument();
    expect(screen.getByText("Mirecruit")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/sections/FeaturedProjects.test.tsx`
Expected: FAIL — `Miruum` visible / button name mismatch.

- [ ] **Step 3: Rewrite the projects section**

Replace the full contents of `src/components/sections/FeaturedProjects.tsx`:

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

const projects = [
  {
    title: "DDMS Mobile Apps",
    category: "Mobile App",
    year: "2023",
    tech: "React Native · Expo SDK · Redux",
    swatch: "#233b46",
    link: "https://play.google.com/store/apps/details?id=id.co.dayagroup.ddms",
  },
  {
    title: "Prohace",
    category: "HR Tech",
    year: "2023",
    tech: "React Native · Flutter · Redux Saga",
    swatch: "#332e59",
    link: "https://play.google.com/store/apps/details?id=com.eksad.cx.prohace",
  },
  {
    title: "Danamas App",
    category: "Fintech",
    year: "2023",
    tech: "React Native · TypeScript · Jest",
    swatch: "#23443c",
    link: "https://play.google.com/store/apps/details?id=com.danamas.mergingapp",
  },
  {
    title: "Mantis Go",
    category: "Mobile App",
    year: "2022",
    tech: "React Native · SQLite · Redux Toolkit",
    swatch: "#24324a",
    link: "https://play.google.com/store/apps/details?id=com.mantisgo",
  },
  {
    title: "Miruum",
    category: "Hotel Booking",
    year: "2022",
    tech: "React Native · TypeScript · Redux Toolkit Query",
    swatch: "#4a3b23",
    link: "https://www.instagram.com/miruum.id/",
  },
  {
    title: "Mirecruit",
    category: "HR Tech",
    year: "2021",
    tech: "React Native · JWT · CodePush",
    swatch: "#3b2352",
    link: "https://play.google.com/store/apps/details?id=com.manulife",
  },
];

export function FeaturedProjects() {
  const [showAll, setShowAll] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="border-b border-border">
      <div className="mx-auto max-w-[958px] px-6 py-16 lg:px-[54px] lg:py-[72px]">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-[10px]">
            <p className="font-mono text-[11px] tracking-[1px] text-accent">
              01 — SELECTED PROJECTS
            </p>
            <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-foreground sm:text-[38px]">
              Apps people use.
            </h2>
          </div>
          <p className="font-mono text-[11px] tracking-[1px] text-foreground-secondary">
            [ 06 PROJECTS ]
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {visibleProjects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 border border-border bg-panel px-5 py-5 transition-colors hover:border-foreground-secondary sm:px-6"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                transition={{ duration: 0.2, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="flex items-center gap-[22px]">
                  <span className="font-mono text-[12px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-[7px]">
                    <p className="font-mono text-[11px] tracking-[0.8px] text-foreground-secondary">
                      {project.category.toUpperCase()} · {project.year}
                    </p>
                    <h3 className="text-[20px] font-medium tracking-[-0.02em] text-foreground sm:text-[25px]">
                      {project.title}
                    </h3>
                    <p className="text-[13px] text-foreground-secondary">{project.tech}</p>
                  </div>
                </div>
                <div className="flex items-center gap-[17px]">
                  <span
                    aria-hidden="true"
                    className="hidden h-[48px] w-[64px] border border-border sm:block"
                    style={{ backgroundColor: project.swatch }}
                  />
                  <ArrowUpRight aria-hidden="true" className="size-[21px] text-foreground" />
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mt-6 flex items-center gap-[10px] border border-border px-4 py-3 font-mono text-[11px] font-semibold tracking-[0.6px] text-foreground transition-colors hover:border-foreground-secondary"
        >
          {showAll ? "SHOW LESS" : "LOAD 3 MORE PROJECTS"}
          <Plus aria-hidden="true" className="size-[15px] text-accent" />
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/sections/FeaturedProjects.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/FeaturedProjects.tsx src/components/sections/FeaturedProjects.test.tsx
git commit -m "feat: rebuild selected work rows in tech edition style"
```

---

### Task 5: About & Capabilities (experience) rebuild; remove dead sections

**Files:**
- Modify: `src/components/sections/Experience.tsx` (full rewrite)
- Create: `src/components/sections/Experience.test.tsx`
- Delete: `src/components/SectionEyebrow.tsx`, `src/components/sections/Education.tsx`, `src/components/sections/Education.test.tsx`, `src/components/sections/Skills.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `<Experience />` — `<section id="experience">` with two columns: about statement + expander, and a bordered panel listing all 5 existing experiences (first 3 shown).

- [ ] **Step 1: Write the failing experience test**

Create `src/components/sections/Experience.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Experience } from "@/components/sections/Experience";

describe("Experience", () => {
  it("shows three positions first and expands to all five", async () => {
    render(<Experience />);
    const user = userEvent.setup();

    expect(screen.getByText(/tiga daya digital/i)).toBeInTheDocument();
    expect(screen.queryByText(/quadrant synergy/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /view all 5 positions/i }));
    expect(screen.getByText(/quadrant synergy/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/sections/Experience.test.tsx`
Expected: FAIL — "tiga daya digital" not found.

- [ ] **Step 3: Rewrite the experience section**

Replace the full contents of `src/components/sections/Experience.tsx`:

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

const experiences = [
  {
    role: "Mobile Application Developer",
    company: "PT. Tiga Daya Digital Indonesia (Triputra Group)",
    period: "Sep 2023 - Present",
  },
  {
    role: "Frontend Developer",
    company: "Danamas",
    period: "Jul 2023 - Sep 2023",
  },
  {
    role: "Mobile Application Developer",
    company: "Mandala Multifinance",
    period: "Mar 2022 - Jul 2023",
  },
  {
    role: "Freelance Mobile Application Developer",
    company: "KODEGIRI",
    period: "Feb 2022 - Okt 2022",
  },
  {
    role: "Frontend Developer",
    company: "Quadrant Synergy International",
    period: "Aug 2019 - Mar 2022",
  },
];

export function Experience() {
  const [showAll, setShowAll] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const visible = showAll ? experiences : experiences.slice(0, 3);

  return (
    <section id="experience" className="border-b border-border">
      <div className="mx-auto max-w-[958px] px-6 py-16 lg:px-[54px] lg:py-[76px]">
        <div className="flex flex-col gap-[54px] lg:flex-row">
          <div className="flex-1">
            <p className="font-mono text-[11px] tracking-[1px] text-accent">
              02 — EXPERIENCE &amp; EDUCATION
            </p>
            <h2 className="mt-[22px] text-[32px] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground sm:text-[43px] sm:leading-[43px]">
              Shipping code.
              <br />
              Solving problems.
            </h2>
            <p className="mt-[22px] max-w-[420px] text-[16px] leading-6 text-foreground-secondary">
              Currently building and maintaining mobile experiences with React Native. Computer
              Science graduate from Binus University (2020—2024).
            </p>
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="mt-8 flex items-center gap-[10px] border border-border px-4 py-3 font-mono text-[11px] font-semibold tracking-[0.6px] text-foreground transition-colors hover:border-foreground-secondary"
            >
              {showAll ? "SHOW LESS" : "VIEW ALL 5 POSITIONS"}
              <Plus aria-hidden="true" className="size-[15px] text-accent" />
            </button>
          </div>

          <div className="flex-1 border border-border">
            <AnimatePresence initial={false}>
              {visible.map((exp, i) => (
                <motion.div
                  key={`${exp.role}-${exp.company}`}
                  className="flex items-center gap-[16px] border-b border-border px-[18px] py-[22px] last:border-b-0"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                  transition={{ duration: 0.2, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                >
                  <span className="font-mono text-[11px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-[5px]">
                    <p className="font-mono text-[11px] tracking-[0.8px] text-foreground">
                      {exp.company.toUpperCase()}
                    </p>
                    <p className="text-[13px] text-foreground-secondary">
                      {exp.role} · {exp.period}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/sections/Experience.test.tsx`
Expected: PASS.

- [ ] **Step 5: Delete the superseded files**

```bash
git rm src/components/SectionEyebrow.tsx \
  src/components/sections/Education.tsx \
  src/components/sections/Education.test.tsx \
  src/components/sections/Skills.tsx
```

- [ ] **Step 6: Confirm the full suite still passes (Education tests removed)**

Run: `npx vitest run`
Expected: PASS (no tests reference the deleted files).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: rebuild about & capabilities section, drop editorial-only sections"
```

---

### Task 6: Contact and Footer rebuild

**Files:**
- Modify: `src/components/sections/Contact.tsx` (full rewrite)
- Modify: `src/components/layout/Footer.tsx` (full rewrite)
- Modify: `src/components/sections/Contact.test.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `<Contact />` — `<section id="contact">` accent band with email mailto link; `<Footer />` — two mono lines.

- [ ] **Step 1: Update the failing contact test**

Replace the full contents of `src/components/sections/Contact.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "@/components/sections/Contact";

describe("Contact", () => {
  it("renders the heading and the email CTA", () => {
    render(<Contact />);

    expect(
      screen.getByRole("heading", { name: /let's make something useful/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /hamalsaefudin48@gmail.com/i }),
    ).toHaveAttribute("href", "mailto:hamalsaefudin48@gmail.com");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/sections/Contact.test.tsx`
Expected: FAIL — heading/link not found.

- [ ] **Step 3: Rewrite the contact section**

Replace the full contents of `src/components/sections/Contact.tsx`:

```tsx
"use client";

import { ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="bg-accent">
      <div className="mx-auto flex min-h-[258px] max-w-[958px] flex-col justify-center gap-[18px] px-6 py-12 lg:px-[54px]">
        <p className="font-mono text-[11px] tracking-[1px] text-accent-foreground">
          03 — LET&apos;S CONNECT
        </p>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-accent-foreground sm:text-[40px]">
            Let&apos;s make something useful.
          </h2>
          <a
            href="mailto:hamalsaefudin48@gmail.com"
            className="flex items-center gap-[12px] border-b border-accent-foreground pb-[12px] font-mono text-[12px] font-semibold tracking-[0.6px] text-accent-foreground"
          >
            HAMALSAEFUDIN48@GMAIL.COM
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Rewrite the footer**

Replace the full contents of `src/components/layout/Footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex min-h-[80px] max-w-[958px] items-center justify-between gap-4 px-6 lg:px-[54px]">
        <p className="font-mono text-[10px] tracking-[1px] text-foreground-secondary">
          © {new Date().getFullYear()} HAMAL SAEFUDIN
        </p>
        <p className="font-mono text-[10px] tracking-[1px] text-foreground-secondary">
          JAKARTA, INDONESIA · REACT NATIVE
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Run the contact test to verify it passes**

Run: `npx vitest run src/components/sections/Contact.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/Contact.tsx src/components/sections/Contact.test.tsx src/components/layout/Footer.tsx
git commit -m "feat: rebuild contact band and footer in tech edition style"
```

---

### Task 7: Compose the new page structure

**Files:**
- Modify: `src/routes/index.tsx`

**Interfaces:**
- Consumes: `GridBackground`, all rebuilt sections.
- Produces: `<Home />` composing `GridBackground` + `Header` + `main` (Hero, FeaturedProjects, Experience, Contact) + `Footer`.

- [ ] **Step 1: Rewrite the home route**

Replace the full contents of `src/routes/index.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify the build compiles (removed imports resolve)**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: compose tech edition page sections"
```

---

### Task 8: Full verification

**Files:** none.

- [ ] **Step 1: Run the full test suite**

Run: `npm run test:run`
Expected: all tests pass (hook, header, projects, experience, contact).

- [ ] **Step 2: Run the linter**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: succeeds with no type errors.

- [ ] **Step 4: Manual smoke test**

Run: `npm run dev` and verify:
1. Default theme follows OS preference; toggle switches dark/light; choice persists across reload (no flash).
2. Both modes match the two pencil designs (colors, typography, layout).
3. Mobile (<768px): hamburger opens sheet; hero, project rows, about columns, and contact band stack; orbital diagram hidden.
4. "LOAD 3 MORE PROJECTS" and "VIEW ALL 5 POSITIONS" expand; smooth scroll from nav links works.

- [ ] **Step 5: Final commit if any fixes were made**

```bash
git add -A
git commit -m "chore: finalize tech edition redesign"
```