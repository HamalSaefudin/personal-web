# Editorial Portfolio Redesign

## Goal

Apply the visual rules in `docs/superpowers/DESIGN.md` to the existing personal portfolio while preserving its content, anchor navigation, accessibility behavior, SEO, and static SSG delivery.

## Chosen Approach

Use a hybrid redesign. Establish the new light editorial system globally, redesign the hero, projects, and contact sections to express the new direction, and keep experience, education, and skills as concise editorial rows. Do not add new portfolio data or dependencies.

## Visual System

- Use light mode only. Remove the theme provider, theme bootstrap, theme toggle, and dark color tokens.
- Use `#f8f5ed` as the page canvas, `#000000` for primary ink, and `#707070` for secondary text.
- Use DM Sans for all text, including 64px display headings, 28px section headings, 18px body text, and 14px labels.
- Use `#ffda6e` only for primary CTA and small highlight surfaces.
- Use `#6ece9d` only for status or availability signals.
- Remove gradients, grid/noise backgrounds, blur, and box shadows.
- Define hierarchy through whitespace, 1px borders, type scale, and restrained accents.
- Use 24px radius for cards and buttons, 12px for images and small tiles, 9999px for pills, and 6px for inputs.
- Use a 1200px maximum content width, 64px minimum section rhythm, 32px card padding, and 16px element gaps.

## Page Structure

### Header

Keep the Hamal wordmark and anchor navigation. Make the header minimal and non-sticky, remove the theme control, and preserve the mobile sheet navigation and accessible labels.

### Hero

Create a centered editorial stack with a numbered overview badge, a display headline, the existing professional summary, a sunshine `Get in touch` CTA, ghost links for GitHub and LinkedIn, and the existing experience/project stats.

### Experience

Keep the existing data and expandable behavior. Present positions as editorial rows with a numbered section badge, hairline dividers, aligned dates, and graphite descriptions.

### Education and Skills

Keep the existing education data as a compact editorial row. Present skills as outlined pills or grouped labels instead of an unstyled text list.

### Projects

Keep the existing project data and external links. Replace the list layout with a two-column feature-card grid on desktop and one column on mobile. Cards use cream surfaces, 1px ink borders, 24px radius, no shadows, clear titles, descriptions, technology metadata, and an external-link affordance.

### Contact

Create a centered CTA block with a small bordered `H` tile, a display heading, the existing contact copy, a sunshine email button, and the existing email, LinkedIn, GitHub, and location links.

### Footer

Keep the copyright and technology note in a minimal bordered footer.

## Motion and Interaction

- Keep existing Framer Motion where it reduces implementation risk; do not add another animation dependency.
- Use short reveal transitions based on opacity and `translateY(8px)` with 40-60ms stagger intervals.
- Use a custom ease-out curve for entering UI and keep UI durations below 300ms.
- Add exact-property button transitions with `scale(0.97)` press feedback around 160ms.
- Gate hover-only transforms behind `(hover: hover) and (pointer: fine)`.
- Do not use `transition: all`, `scale(0)` entry states, shadows, or layout animation for simple state changes.
- Respect `prefers-reduced-motion` by removing position movement while retaining useful opacity and color transitions.

## Accessibility and Behavior

- Preserve the skip link, semantic heading order, keyboard focus, anchor IDs, mobile sheet behavior, and external link `noopener noreferrer` attributes.
- Keep touch interactions free from hover-only behavior.
- Maintain readable contrast for ink, graphite, cream, yellow, and mint usage.
- Keep the existing static route and metadata behavior unchanged.

## Implementation Boundaries

- Modify the global stylesheet, root document font metadata, header/footer, and the affected portfolio sections.
- Remove theme-specific code that is no longer reachable after light-only mode is selected.
- Reuse existing UI primitives and Framer Motion; do not add dependencies or speculative abstractions.
- Keep the existing SSG/Vite/TanStack Start configuration unchanged.
- Do not redesign deployment, add server data, add analytics, or create new portfolio content.

## Verification

Run:

```bash
npm run lint
npm run test:run
npm run build
```

Verify that the prerendered root route still builds, the static output remains in `dist/client`, and the browser smoke test covers desktop, mobile navigation, anchor links, keyboard focus, external links, and reduced-motion behavior.

## Acceptance Criteria

- The page is light-only and visually follows the paper, ink, and highlighter system.
- No gradient, grid/noise background, shadow, or dark-mode control remains in the active UI.
- Hero, projects, and contact visibly use the new editorial composition.
- Experience, education, and skills remain complete and usable.
- Mobile layout remains readable and interactive.
- Lint, tests, and SSG build pass without changing the deployment architecture.
