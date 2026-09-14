# Tech Edition Portfolio Redesign

## Goal

Replace the current editorial light system with a dark/light "Tech Edition" system built from the two pencil.dev designs (dark "Hamal Portfolio · Tech Edition" and light "Hamal Portfolio · Light Edition"). Reuse existing portfolio content, anchor navigation, accessibility behavior, SEO, and static SSG delivery. The theme toggle in the header must be functional and switch between the two designs.

## Chosen Approach

Establish a theme-token system with `[data-theme]` on `<html>` and a small inline bootstrap script in the head to avoid theme flash. Rebuild the header, hero, projects, experience, contact, and footer to match the pencil layouts. Keep the existing data arrays, TanStack Router structure, Framer Motion, and shadcn/ui primitives. Do not embed the pencil hero base64 images — use the existing CSS grid background with theme-aware colors.

## Visual System

- Two modes, same accent. Toggle flips `[data-theme]`; default follows `prefers-color-scheme`, user choice persists in `localStorage`.
- Dark mode: canvas `#0A0D12`, primary `#F4F7FB`, secondary `#A6B1C1`, border `#25303D`, panel `#111720`.
- Light mode: canvas `#F8FAFC`, primary `#101828`, secondary `#667085`, border `#D9E0E8`, panel `#FFFFFF`.
- Accent (both modes): `#55E6A5`; accent foreground `#07130D`. Accent fills the primary CTA and the contact band; accents the rotated brand mark, numbers, orbit core, and toggle icon.
- Fonts: **Geist** for all display/body text, **IBM Plex Mono** for labels, tags, eyebrow, numbers, and footer. Replace the DM Sans font links in the root document.
- Sharp geometry: 1px outlines, square corners (no radius), hairline section borders, uppercase mono labels with letter-spacing.
- Max content width ~958px for the page; 54px side padding on desktop, fluid on mobile.

## Theme Toggle

- Header control shows a moon icon + `DARK` label in dark mode and a sun icon + `LIGHT` label in light mode (lucide `Moon` / `Sun`).
- Inline `<script>` in `__root.tsx` reads `localStorage` (falling back to `prefers-color-scheme`) and sets `document.documentElement.dataset.theme` before first paint.
- Small hook (`useTheme`) reads the current theme and toggles it; updates `localStorage` and the `data-theme` attribute.
- Respect `prefers-reduced-motion`; no transition animation on theme switch.

## Page Structure

### Header
- Non-sticky, 1px bottom border. Brand: rotated square mark + `HAMAL // DEV` mono wordmark. Links `OVERVIEW`, `EXPERIENCE`, `PROJECTS` (mono, secondary color) mapping to `#overview`, `#experience`, `#projects`. Theme toggle on the right. Mobile hamburger uses the existing sheet with accessible labels.

### Hero
- Eyebrow `[ MOBILE APPLICATION DEVELOPER · JAKARTA, INDONESIA ]` (accent, mono).
- Display headline `Hi, I'm Hamal. / I build reliable / mobile products.` (~64px Geist, tight tracking).
- Existing professional summary line (React Native, ReactJS, Flutter, TypeScript).
- `GET IN TOUCH` accent CTA → `mailto:`.
- Right-side orbital diagram: outer border circle, inner accent circle, rotated accent core square, caption `STACK // RN · FLUTTER · TS`.
- Background: existing `GridBackground` grid (theme-aware), replacing the pencil base64 image.

### Selected Work
- Header row: `01 — SELECTED PROJECTS` (accent mono), title `Apps people use.`, index `[ 06 PROJECTS ]`.
- Rows from existing project data (6): number, tag `CATEGORY · YEAR`, title, tech stack, color swatch tile, arrow-up-right link to the external project URL.
- Show first 3; `LOAD 3 MORE PROJECTS` expands to all 6 and toggles label.

### Experience & Education
- Left column: `02 — EXPERIENCE & EDUCATION` (accent mono), heading `Shipping code. / Solving problems.`, copy noting current React Native work and Binus University CS (2020—2024), `VIEW ALL 5 POSITIONS` expander.
- Right column: bordered panel of existing experience rows (5): number, company (mono, primary), role + period (secondary). First 3 shown; expander reveals all 5.

### Contact
- Full-width accent band: `03 — LET'S CONNECT` (accent foreground, mono), heading `Let's make something useful.`, email link `HAMALSAEFUDIN48@GMAIL.COM` with arrow → `mailto:`.

### Footer
- 1px top border. `© 2026 HAMAL SAEFUDIN` and `JAKARTA, INDONESIA · REACT NATIVE` (mono, secondary).

## Motion and Interaction

- Keep `ScrollReveal`/Framer Motion entry reveals (opacity + small translate, <300ms).
- Hover: links fade; project rows and expander buttons get a subtle border/color shift with exact-property transitions.
- Gate hover-only effects behind `(hover: hover) and (pointer: fine)` where applicable.
- Respect `prefers-reduced-motion`.
- Smooth-scroll nav links; preserve anchor IDs.

## Accessibility and Behavior

- Preserve skip link, semantic heading order, keyboard focus styles (theme-aware), anchor IDs, external links with `noopener noreferrer`.
- Toggle is a real `<button>` with `aria-label` describing the action.
- Maintain readable contrast in both modes for primary/secondary/accent text.
- Keep the existing route, metadata, and SSG behavior unchanged.

## Implementation Boundaries

- Rewrite `src/styles.css` theme tokens and fonts; add the theme bootstrap script and `useTheme` hook.
- Rebuild `Header`, `Hero`, `FeaturedProjects`, `Experience`, `Contact`, `Footer`; remove `SectionEyebrow`, `Education`, `Skills`, and unreachable theme code from the page composition.
- Reuse existing data arrays, UI primitives, `ScrollReveal`, and `GridBackground`; add no dependencies.
- Do not redesign deployment, add server data, or create new portfolio content.

## Verification

- `npm run build` (type-check + SSG) passes.
- `npm run lint` passes.
- `npm run test:run` passes; update existing section tests to the new structure.
- Manual: toggle dark/light persists across reload; no theme flash; both modes match the pencil designs; mobile hamburger, expanders, and smooth scroll work.