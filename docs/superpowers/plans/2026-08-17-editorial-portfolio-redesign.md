# Editorial Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the existing portfolio into the light editorial paper system from `docs/superpowers/DESIGN.md` while preserving portfolio content, accessibility, navigation, and SSG delivery.

**Architecture:** Keep the current TanStack Start route tree and section component boundaries. Move the visual system into `src/styles.css`, remove light/dark theme state, and reshape only the hero, project, and contact compositions while keeping experience, education, and skills as editorial rows. Reuse the existing Radix sheet, button primitive, Framer Motion, and data arrays.

**Tech Stack:** React 19, TanStack Start, Vite, Tailwind CSS v4, Framer Motion, Radix UI, Lucide, Vitest, Testing Library.

## Global Constraints

- Use light mode only.
- Use `#f8f5ed` as the page canvas, `#000000` for primary ink, and `#707070` for secondary text.
- Use DM Sans for all text, including 64px display headings, 28px section headings, 18px body text, and 14px labels.
- Use `#ffda6e` only for primary CTA and small highlight surfaces.
- Use `#6ece9d` only for status or availability signals.
- Remove gradients, grid/noise backgrounds, blur, and box shadows from the active UI.
- Use 24px radius for cards and buttons, 12px for images and small tiles, 9999px for pills, and 6px for inputs.
- Use a 1200px maximum content width, 64px section rhythm, 32px card padding, and 16px element gaps.
- Preserve skip links, heading order, anchor IDs, keyboard focus, mobile navigation, and external-link security attributes.
- Keep Framer Motion and existing UI primitives; do not add dependencies or change the SSG/Vite/TanStack Start architecture.
- Respect reduced motion and gate hover transforms behind `(hover: hover) and (pointer: fine)`.

## File Map

- Modify `src/styles.css`: light editorial tokens, typography, focus states, motion utilities, and reduced-motion rules.
- Modify `src/routes/__root.tsx`: DM Sans metadata, cream theme-color, and removal of theme bootstrap.
- Modify `src/routes/index.tsx`: remove `ThemeProvider` wrapper.
- Delete `src/components/providers/ThemeProvider.tsx`: no active consumer remains after light-only conversion.
- Modify `src/components/ui/button.tsx`: sunshine and ghost variants, 24px radius, explicit transitions, and no shadows.
- Modify `src/components/ui/sheet.tsx`: flat cream surface and explicit transform/opacity transitions.
- Modify `src/components/SectionEyebrow.tsx`: numbered editorial badge interface.
- Modify `src/components/layout/Header.tsx`: minimal non-sticky navigation without theme control.
- Modify `src/components/layout/Footer.tsx`: 1200px editorial footer layout.
- Modify `src/components/sections/Hero.tsx`: centered display composition and CTA buttons.
- Modify `src/components/sections/Experience.tsx`: numbered editorial rows and restrained motion.
- Modify `src/components/sections/Education.tsx`: numbered editorial row and direct light-mode rendering.
- Modify `src/components/sections/Skills.tsx`: outlined skill pills.
- Modify `src/components/sections/FeaturedProjects.tsx`: responsive feature-card grid.
- Modify `src/components/sections/Contact.tsx`: centered CTA block and email button.
- Modify `src/components/sections/Education.test.tsx`: remove theme wrapper and dark-mode assertions.
- Create `src/components/sections/FeaturedProjects.test.tsx`: verify visible project cards and expansion behavior.
- Create `src/components/sections/Contact.test.tsx`: verify CTA and contact links.

---

### Task 1: Replace the Theme and Global Visual Foundation

**Files:**
- Modify: `src/styles.css`
- Modify: `src/routes/__root.tsx`
- Modify: `src/routes/index.tsx`
- Delete: `src/components/providers/ThemeProvider.tsx`
- Modify: `src/components/sections/Education.test.tsx`

**Interfaces:**
- Produces a light-only document with `bg-background`, `text-foreground`, and the design tokens used by every section.
- Removes the `ThemeProvider` dependency from the route and tests.

- [ ] **Step 1: Update the education test to render without theme state**

Replace the test helper with direct rendering:

```tsx
const renderEducation = () => render(<Education />);
```

Remove the `ThemeProvider` import, `localStorage` setup, the dark-mode test, and calls to `renderWithTheme`. Keep tests for content, heading, navigation id, accessibility, and no-crash behavior.

- [ ] **Step 2: Run the focused test to expose theme assumptions**

Run:

```bash
npm run test:run -- src/components/sections/Education.test.tsx
```

Expected: the updated test passes against the current component, proving the theme wrapper was only test scaffolding.

- [ ] **Step 3: Replace the CSS tokens and base rules**

Replace the existing dark/light variables with the design tokens below:

```css
:root {
  --background: #f8f5ed;
  --foreground: #000000;
  --foreground-secondary: #707070;
  --border: #000000;
  --primary: #ffda6e;
  --primary-foreground: #000000;
  --card-paper: #f8f5ed;
  --mint-signal: #6ece9d;
  --font-dm-sans: "DM Sans", ui-sans-serif, system-ui, sans-serif;
}
```

Map the Tailwind v4 theme to these variables, set `body` to the cream canvas, remove `.dark`, remove `bg-grid`, remove `bg-noise`, and add visible `:focus-visible` outlines using ink and a 3px offset. Add `font-feature-settings: "ss03", "ss04"` to the body.

- [ ] **Step 4: Remove document-level theme bootstrapping**

In `src/routes/__root.tsx`, delete `themeBootstrap` and the `scripts` head entry. Replace the Google Fonts stylesheet with:

```tsx
{
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap",
}
```

Replace the theme-color entries with `{ name: "theme-color", content: "#f8f5ed" }`, remove `suppressHydrationWarning` from `<html>`, and keep the existing SEO metadata and stylesheet link unchanged.

- [ ] **Step 5: Remove the route theme wrapper and provider**

In `src/routes/index.tsx`, render the page root directly instead of wrapping it in `ThemeProvider`:

```tsx
function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="relative z-10">
        {/* portfolio sections */}
      </main>
      <Footer />
    </div>
  );
}
```

Delete `src/components/providers/ThemeProvider.tsx` after confirming no source import remains.

- [ ] **Step 6: Run the foundation checks**

Run:

```bash
npm run test:run -- src/components/sections/Education.test.tsx
npm run lint
```

Expected: no theme import remains and the existing education behavior still passes.

- [ ] **Step 7: Commit the foundation**

```bash
git add src/styles.css src/routes/__root.tsx src/routes/index.tsx src/components/providers/ThemeProvider.tsx src/components/sections/Education.test.tsx
git commit -m "style: establish editorial light theme"
```

---

### Task 2: Align Shared Primitives and Navigation

**Files:**
- Modify: `src/components/ui/button.tsx`
- Modify: `src/components/ui/sheet.tsx`
- Modify: `src/components/SectionEyebrow.tsx`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`

**Interfaces:**
- `SectionEyebrow` accepts `{ number: string; children: React.ReactNode }`.
- Existing `Button` variants remain available to the root error boundary and new CTA links.
- Header preserves the current anchor labels and mobile sheet behavior without theme state.

- [ ] **Step 1: Add structural assertions for the numbered badge**

Add a small render test to `Education.test.tsx` that renders the updated section and expects the `02` badge text and `Education` level-2 heading:

```tsx
expect(screen.getByText("02")).toBeInTheDocument();
expect(screen.getByRole("heading", { level: 2, name: "Education" })).toBeInTheDocument();
```

Run the focused test and confirm the badge assertion fails before changing `SectionEyebrow`.

- [ ] **Step 2: Replace `SectionEyebrow` with the numbered pill**

Implement the new prop and markup:

```tsx
export function SectionEyebrow({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <motion.h2
      className="mb-8 inline-flex items-center overflow-hidden rounded-full border border-ink text-xs font-medium uppercase tracking-[0.286em]"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      <span className="grid size-6 place-items-center bg-sunshine-highlight tracking-normal">{number}</span>
      <span className="px-3 py-1.5">{children}</span>
    </motion.h2>
  );
}
```

Update all section callers to numbers `02` through `05`; use `01 / OVERVIEW` in the hero.

- [ ] **Step 3: Update the button primitive**

Use `rounded-[24px]`, `transition-[transform,background-color,color,border-color] duration-160 ease-out`, and the existing `active:scale-[0.97]`. Make `default` sunshine-filled, `outline` transparent with an ink border, `ghost` transparent, and remove `shadow-xs` and dark-mode class branches.

- [ ] **Step 4: Flatten and speed up the sheet primitive**

Remove `shadow-lg` and replace the content animation classes with explicit transform and opacity transitions under 300ms. Keep the Radix focus trap, overlay, close button, and side behavior intact. The right-side content must enter with `translateX(100%)` to `translateX(0)` and exit back to `translateX(100%)`.

- [ ] **Step 5: Simplify the header and footer**

Remove `useTheme`, the Sun/Moon icons, and the theme button from `Header`. Keep active-section tracking, wordmark, desktop anchors, and mobile sheet. Change the header from fixed/backdrop styling to a non-sticky minimal bar with a 1200px container. Use the same container and hairline top border for `Footer`.

- [ ] **Step 6: Run primitive and lint checks**

Run:

```bash
npm run test:run -- src/components/sections/Education.test.tsx
npm run lint
```

Expected: the numbered badge assertion passes and no `useTheme` or gradient classes remain in active navigation components.

- [ ] **Step 7: Commit shared UI changes**

```bash
git add src/components/ui/button.tsx src/components/ui/sheet.tsx src/components/SectionEyebrow.tsx src/components/layout/Header.tsx src/components/layout/Footer.tsx src/components/sections/Education.test.tsx
git commit -m "style: align shared UI with editorial system"
```

---

### Task 3: Recompose the Hero and Contact CTA

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/sections/Contact.tsx`
- Create: `src/components/sections/Contact.test.tsx`

**Interfaces:**
- Hero keeps the existing professional copy, social URLs, and stats while exposing the `overview` anchor.
- Contact keeps the existing email, LinkedIn, GitHub, and location values while adding one primary email CTA.

- [ ] **Step 1: Add failing tests for CTA and contact links**

Create `Contact.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "@/components/sections/Contact";

describe("Contact", () => {
  it("renders the primary email CTA and contact destinations", () => {
    render(<Contact />);

    expect(screen.getByRole("link", { name: /email hamal/i })).toHaveAttribute(
      "href",
      "mailto:hamalsaefudin48@gmail.com",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/hamal-saefudin",
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/HamalSaefudin",
    );
  });
});
```

Run `npm run test:run -- src/components/sections/Contact.test.tsx` and confirm it fails because the CTA is not present.

- [ ] **Step 2: Rebuild the hero as a centered editorial stack**

Use a 1200px container, add the `01` overview badge, render the heading around 64px on desktop and 42px on mobile, keep the existing summary, and use `Button` for the sunshine email CTA plus an outline/ghost link group for GitHub and LinkedIn. Keep stats below a 1px divider. Replace the gradient heading/stat classes with ink and sunshine tokens.

- [ ] **Step 3: Rebuild contact as a centered CTA block**

Add a bordered 48px `H` tile, a display heading, the existing copy, and a `Button asChild` email link with accessible name `Email Hamal`. Keep the existing direct email and social links below the CTA. Use no shadow or decorative gradient.

- [ ] **Step 4: Add responsive and reduced-motion classes**

Use a single-column mobile stack, `sm:flex-row` only where controls remain readable, and rely on the global reduced-motion rule to remove `translateY` while retaining opacity transitions.

- [ ] **Step 5: Run the focused test**

Run:

```bash
npm run test:run -- src/components/sections/Contact.test.tsx
```

Expected: PASS with the email, LinkedIn, and GitHub assertions.

- [ ] **Step 6: Commit hero and CTA changes**

```bash
git add src/components/sections/Hero.tsx src/components/sections/Contact.tsx src/components/sections/Contact.test.tsx
git commit -m "style: recompose portfolio hero and contact CTA"
```

---

### Task 4: Convert Content Sections to Editorial Rows and Feature Cards

**Files:**
- Modify: `src/components/sections/Experience.tsx`
- Modify: `src/components/sections/Education.tsx`
- Modify: `src/components/sections/Skills.tsx`
- Modify: `src/components/sections/FeaturedProjects.tsx`
- Create: `src/components/sections/FeaturedProjects.test.tsx`

**Interfaces:**
- Existing experience/project arrays and expand/collapse state remain unchanged.
- Project links continue opening in a new tab with `noopener noreferrer`.
- All affected sections use the numbered `SectionEyebrow` interface from Task 2.

- [ ] **Step 1: Add project behavior regression tests**

Create `FeaturedProjects.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";

describe("FeaturedProjects", () => {
  it("shows four projects first and expands to all projects", async () => {
    render(<FeaturedProjects />);

    expect(screen.getByText("DDMS Mobile Apps")).toBeInTheDocument();
    expect(screen.getByText("Mantis Go")).toBeInTheDocument();
    expect(screen.queryByText("Miruum")).not.toBeInTheDocument();

    screen.getByRole("button", { name: /view all 6 projects/i }).click();
    expect(screen.getByText("Miruum")).toBeInTheDocument();
    expect(screen.getByText("Mirecruit")).toBeInTheDocument();
  });
});
```

Run `npm run test:run -- src/components/sections/FeaturedProjects.test.tsx` and confirm the current expand/collapse behavior passes before changing the layout.

- [ ] **Step 2: Restyle experience and education rows**

Use section spacing of at least 64px, `border-y` or `divide-y` hairlines, `py-8` row padding, ink headings, and graphite metadata. Keep `AnimatePresence`, `showAll`, date text, section IDs, and `whileInView` behavior. Replace all old `max-w-2xl` wrappers with the shared `max-w-6xl` container.

- [ ] **Step 3: Convert skills into accessible outlined pills**

Render each skill as a `span` with `rounded-full border border-ink px-3 py-1.5 text-sm`, retain the skill names and levels in accessible text, and use a flex-wrap layout with 8px row/column gaps. Do not use progress bars or colored proficiency indicators.

- [ ] **Step 4: Convert projects into responsive feature cards**

Use a `grid gap-6 md:grid-cols-2`. Each project is an `article` with `rounded-[24px] border border-ink bg-cream-paper p-8`, a title link with an `ArrowUpRight` icon, year/category metadata, description, and technology line. Keep the first four visible and the current expand/collapse button below the grid. Do not add shadows, invented image assets, or new project content.

- [ ] **Step 5: Keep hover and press feedback device-safe**

Only add card/title hover transforms inside `@media (hover: hover) and (pointer: fine)`. Use `transition-[transform,border-color,background-color] duration-200 ease-out` and the shared button `active:scale-[0.97]`. Leave the cards flat at rest.

- [ ] **Step 6: Run focused and full component checks**

Run:

```bash
npm run test:run -- src/components/sections/Education.test.tsx src/components/sections/FeaturedProjects.test.tsx
npm run lint
```

Expected: all content, expand/collapse, anchor, and accessibility assertions pass.

- [ ] **Step 7: Commit content section changes**

```bash
git add src/components/sections/Experience.tsx src/components/sections/Education.tsx src/components/sections/Skills.tsx src/components/sections/FeaturedProjects.tsx src/components/sections/FeaturedProjects.test.tsx
git commit -m "style: convert portfolio sections to editorial layouts"
```

---

### Task 5: Finish Motion, Accessibility, and Route Integration

**Files:**
- Modify: `src/styles.css`
- Modify: `src/routes/index.tsx`
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/sections/Experience.tsx`
- Modify: `src/components/sections/Education.tsx`
- Modify: `src/components/sections/Skills.tsx`
- Modify: `src/components/sections/FeaturedProjects.tsx`
- Modify: `src/components/sections/Contact.tsx`

**Interfaces:**
- The home route renders all sections in the same order and still prerenders at `/`.
- All visual motion follows the shared CSS and reduced-motion rules.

- [ ] **Step 1: Search for prohibited active patterns**

Run:

```bash
rg "bg-gradient|shadow-|transition-all|scale\(0\)|whileHover|ThemeProvider|useTheme|dark:" src
```

Review every match. Remove matches from active components; leave unrelated legacy files untouched only when they are not imported by the home route.

- [ ] **Step 2: Add global reduced-motion behavior**

Add this rule to `src/styles.css`:

```css
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

Ensure Framer Motion transforms are disabled or reduced for section reveals by using the existing `useReducedMotion` API where a component still owns a `y` or `x` animation.

- [ ] **Step 3: Verify heading and anchor structure**

Confirm the route contains one `h1`, one numbered `h2` per section, stable IDs `overview`, `experience`, `education`, `skills`, `projects`, and `contact`, and a working `#main-content` skip target. Add `aria-label` text to icon-only buttons where needed.

- [ ] **Step 4: Run all automated checks**

Run:

```bash
npm run lint
npm run test:run
npm run build
```

Expected: all commands exit with status 0, prerender logs show `/`, and `dist/client/index.html` exists.

- [ ] **Step 5: Commit integration cleanup**

```bash
git add src/styles.css src/routes/index.tsx src/components/sections src/components/layout src/components/ui
git commit -m "fix: finish editorial motion and accessibility details"
```

---

### Task 6: Browser Smoke Test and Final Review

**Files:**
- Verify: `dist/client/index.html`
- Verify: generated assets under `dist/client/assets/`

**Interfaces:**
- Produces a deployable static build with the unchanged Cloudflare Pages output directory `dist/client`.

- [ ] **Step 1: Start the production preview**

Run:

```bash
npm run start
```

Open the preview URL and check the generated document title, font loading, cream canvas, and static assets.

- [ ] **Step 2: Check desktop behavior**

Verify the 1200px composition, centered hero, numbered badges, two-column project cards, CTA button press state, anchor navigation, external project links, and footer.

- [ ] **Step 3: Check mobile behavior**

Use a narrow viewport and verify the one-column layout, readable 64px heading reduction, mobile sheet open/close behavior, no horizontal overflow, and touch-safe hover behavior.

- [ ] **Step 4: Check keyboard and reduced motion**

Tab through the skip link, navigation, CTA links, project links, mobile menu, and expansion buttons. Enable reduced motion and confirm reveal movement disappears without hiding content.

- [ ] **Step 5: Inspect the final diff**

Run:

```bash
git status --short
rg "next/|next-env|eslint-config-next" --glob '!package-lock.json'
```

Expected: no migration residue, no unintentional changes to `docs/superpowers/DESIGN.md`, and only intended editorial redesign files are changed.
