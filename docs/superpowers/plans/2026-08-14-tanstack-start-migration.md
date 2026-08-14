# TanStack Start Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Next.js runtime with TanStack Start, preserve the existing portfolio behavior, and produce a static build deployable to Cloudflare Pages.

**Architecture:** TanStack Start runs through Vite and TanStack Router. The existing page sections remain reusable components; the new root route owns document metadata and the document shell, while the index route composes the current portfolio. Static prerendering generates the Cloudflare Pages artifact without adding server functions.

**Tech Stack:** TanStack Start, TanStack Router, React 19, Vite, TypeScript, Tailwind CSS 4, Framer Motion, Radix UI, Vitest, Cloudflare Pages.

## Global Constraints

- Preserve the current visual design, accessibility behavior, SEO content, animations, tests, and static hosting model.
- Use TanStack Start with Vite, TanStack Router, and static prerendering.
- Do not add TanStack Query, API calls, authentication, server functions, or Cloudflare Workers SSR.
- Keep Tailwind CSS 4, Framer Motion, Radix UI, Lucide, and Vitest.
- Do not redesign the portfolio or add new sections.

## File Map

- Create `vite.config.ts`: TanStack Start, React, path aliases, and static prerender configuration.
- Create `src/router.tsx`: typed router instance using the generated route tree.
- Create `src/routes/__root.tsx`: document shell, global metadata, stylesheet link, theme bootstrap, skip link, outlet, and scripts.
- Create `src/routes/index.tsx`: current home page composition.
- Add a root-route not-found component in `src/routes/__root.tsx` with the existing visual language.
- Move `src/app/globals.css` to `src/styles.css`: global Tailwind theme and styles.
- Move `src/app/error.tsx` behavior into the root route error component or a focused route error component.
- Modify `package.json`: replace Next scripts/dependencies with TanStack Start/Vite scripts/dependencies.
- Modify `tsconfig.json`: retain strict TypeScript and `@/*` aliases without Next compiler plugins.
- Modify `vitest.config.ts`: keep the existing alias and test setup while ensuring Vite resolves the new source layout.
- Modify `eslint.config.mjs`: replace `eslint-config-next` with a framework-neutral ESLint configuration.
- Modify `.gitignore`: replace Next output ignores with TanStack/Vite output ignores.
- Modify `.github/workflows/deploy.yml`: remove the GitHub Pages workflow because deployment moves to Cloudflare Pages.
- Modify `README.md`: document local commands and Cloudflare Pages build settings.
- Delete `next.config.ts`, `next-env.d.ts`, `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/loading.tsx`, and `src/app/error.tsx` after their behavior is moved.
- Generated `src/routeTree.gen.ts`: let TanStack Start create it; never hand-edit it.

---

### Task 1: Replace Next Tooling With TanStack Start

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vite.config.ts`
- Modify: `tsconfig.json`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `npm run dev`, `npm run build`, and `npm run start` scripts backed by Vite/TanStack Start.
- Produces: Vite path alias `@` resolving to `src`.

- [ ] **Step 1: Add the TanStack/Vite dependencies and scripts**

Replace the framework-specific dependencies and scripts with the documented Vite setup:

```json
{
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "start": "vite preview",
    "lint": "eslint .",
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

Install `@tanstack/react-router`, `@tanstack/react-start`, `nitro`, and `vite`; keep `@vitejs/plugin-react` in dev dependencies. Remove `next` and `eslint-config-next` only after the replacement ESLint config is ready.

- [ ] **Step 2: Create the Vite configuration**

Create `vite.config.ts` with the TanStack Start plugin before the React plugin, a native `@` alias, and static prerendering:

```ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
      },
    }),
    react(),
  ],
});
```

- [ ] **Step 3: Remove Next compiler settings and update output ignores**

Remove the `next` TypeScript plugin, remove Next-only include entries, keep `strict`, `noEmit`, `moduleResolution: "bundler"`, and the `@/*` alias. Keep `.next/` and `out/` ignored for stale local artifacts, and add `.output/` and `dist/` for TanStack/Vite output. Ignore the generated route tree because TanStack Router marks it as generated.

- [ ] **Step 4: Install and generate the first route tree**

Run:

```bash
npm install
npm run dev
```

Expected: Vite starts and reports the missing route files only if they have not been created yet; after Task 2, `src/routeTree.gen.ts` is generated automatically.

- [ ] **Step 5: Verify dependency and type resolution**

Run:

```bash
npm run lint
npm run test:run
```

Expected: existing component tests still execute; any errors at this checkpoint are limited to the not-yet-migrated route imports and are fixed in Task 2 rather than hidden with compiler relaxations.

---

### Task 2: Move the App Router Into TanStack Routes

**Files:**
- Create: `src/router.tsx`
- Create: `src/routes/__root.tsx`
- Create: `src/routes/index.tsx`
- Move: `src/app/globals.css` to `src/styles.css`
- Delete: `src/app/page.tsx`
- Delete: `src/app/layout.tsx`

**Interfaces:**
- Produces: root route metadata and document shell through `createRootRoute`.
- Produces: `/` route that renders `ThemeProvider`, `Header`, all portfolio sections, and `Footer`.

- [ ] **Step 1: Create the typed router entry point**

Create `src/router.tsx`:

```tsx
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
  });
}
```

- [ ] **Step 2: Create the root route document shell**

Create `src/routes/__root.tsx` with `createRootRoute`, `HeadContent`, `Outlet`, and `Scripts`. Move the current title, description, keywords, author, canonical URL, Open Graph, Twitter, icon, viewport, and theme color values into the route `head` function. Load `../styles.css?url` from the route head.

The rendered document must retain:

```tsx
<html lang="en" suppressHydrationWarning>
  <head><HeadContent /></head>
  <body>
    <a href="#main-content">Skip to main content</a>
    <Outlet />
    <Scripts />
  </body>
</html>
```

Keep the existing theme bootstrap script before the outlet so dark mode is applied before hydration. Preserve the current skip-link classes exactly unless TanStack rendering requires a syntax-only adjustment.

- [ ] **Step 3: Replace `next/font/google` with a document stylesheet link**

Add Google Fonts preconnect and stylesheet link entries to the root route head for Plus Jakarta Sans. Keep the existing `--font-sans` variable and body classes by defining the variable in `src/styles.css` or the head stylesheet link. Do not add a font package or download a second font.

- [ ] **Step 4: Create the index route from the existing page composition**

Create `src/routes/index.tsx` with the current composition, changing only the page export shape:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content" className="relative z-10 pt-12">
          <Hero />
          <Experience />
          <Education />
          <Skills />
          <FeaturedProjects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
```

- [ ] **Step 5: Add the not-found route and move error recovery**

Add a small `NotFound` component in `__root.tsx` using the existing theme classes and configure the root route `notFoundComponent` to render it. Move the current `src/app/error.tsx` UI into the root route `errorComponent`; adapt only the callback signature so the Try Again button calls the TanStack router reset behavior. Preserve the error text, icon, loading state, and visual classes.

- [ ] **Step 6: Move global CSS and remove old route files**

Move `src/app/globals.css` to `src/styles.css`, update the root route import, and delete the old `src/app` route files. Leave `src/app/` absent unless a non-route shared asset is genuinely required.

- [ ] **Step 7: Generate and verify the route tree**

Run:

```bash
npm run dev
```

Expected: `src/routeTree.gen.ts` is generated, `/` renders the portfolio, and no component import points to `src/app`.

---

### Task 3: Make Tooling Framework-Neutral

**Files:**
- Modify: `eslint.config.mjs`
- Modify: `vitest.config.ts`
- Modify: `src/test/setup.ts` only if the migrated root import exposes a setup issue
- Delete: `next.config.ts`
- Delete: `next-env.d.ts`

**Interfaces:**
- Produces: linting without `eslint-config-next`.
- Produces: component tests using the same jsdom setup and `@` alias.

- [ ] **Step 1: Replace the Next ESLint preset**

Use the installed ESLint core configuration and a TypeScript-aware parser/plugin already present in the project, or add the smallest required ESLint packages. Keep `.output`, `dist`, `coverage`, `node_modules`, and generated route files ignored. Do not retain `eslint-config-next` just for one rule.

- [ ] **Step 2: Keep Vitest independent from TanStack runtime bootstrapping**

Retain the existing React plugin, jsdom environment, setup file, globals, and `@` alias. Do not import `src/router.tsx` in component tests; tests should continue to render components directly.

- [ ] **Step 3: Remove obsolete Next files**

Delete `next.config.ts` and `next-env.d.ts` after `npm run build` no longer references them. Confirm no `next/` import remains with:

```bash
rg 'next/|next-env|next.config|eslint-config-next' --glob '!package-lock.json'
```

Expected: no matches.

- [ ] **Step 4: Run the existing test suite**

Run:

```bash
npm run test:run
npm run lint
```

Expected: all existing tests pass and lint reports no Next-specific configuration errors.

---

### Task 4: Configure Cloudflare Pages Delivery

**Files:**
- Modify: `.github/workflows/deploy.yml`
- Modify: `README.md`
- Create: `public/_headers` only if preview verification demonstrates headers are needed

**Interfaces:**
- Produces: Cloudflare Pages settings documented for this repository.
- Produces: no GitHub Pages workflow that uploads the obsolete `out/` directory.

- [ ] **Step 1: Remove the GitHub Pages deployment workflow**

Delete `.github/workflows/deploy.yml`; Cloudflare Pages Git integration will run the build. Do not replace it with a Wrangler Workers workflow because the selected architecture is static Pages output.

- [ ] **Step 2: Document Cloudflare Pages build settings**

Update `README.md` with:

```text
Build command: npm run build
Output directory: dist/client
Node version: 20
```

Document local `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, and `npm run test:run`. The verified static directory is `dist/client`; it contains `index.html` and the copied public assets.

- [ ] **Step 3: Verify static asset paths**

Run:

```bash
npm run build
```

Then inspect `dist/client` for `index.html`, `icon.png`, `robots.txt`, and `sitemap.xml`. Run `npm run start` for a local Vite preview; Cloudflare Pages serves `dist/client` directly.

---

### Task 5: End-to-End Verification and Cleanup

**Files:**
- Modify: any file surfaced by build/test failures only
- Verify: generated static output and the running site

**Interfaces:**
- Produces: a passing migration with no Next runtime or deployment remnants.

- [ ] **Step 1: Run the complete local checks**

Run:

```bash
npm run lint
npm run test:run
npm run build
```

Expected: all commands exit with status 0.

- [ ] **Step 2: Verify generated files and metadata**

Inspect the build output and confirm:

- the root route is prerendered;
- `robots.txt`, `sitemap.xml`, and `icon.png` are copied;
- title is `Hamal`;
- description, canonical URL, Open Graph, and Twitter metadata are present;
- no asset URL contains the deleted `/personal-web` Next base path.

- [ ] **Step 3: Run a browser smoke test**

Open the built site or local dev server and verify:

- desktop and mobile layout render;
- header anchor navigation scrolls to each section;
- mobile sheet opens and closes;
- light/dark theme toggle works and persists after reload;
- reduced-motion mode disables/reduces animations;
- contact links and external project links remain valid;
- keyboard focus reaches the skip link and all interactive controls.

- [ ] **Step 4: Check the final diff for migration residue**

Run:

```bash
rg 'next/|next-env|next.config|eslint-config-next|/personal-web|GitHub Pages|actions/deploy-pages' --glob '!package-lock.json'
```

Expected: no matches in source/config/docs except historical references that are explicitly removed from active instructions.

- [ ] **Step 5: Record the final Cloudflare Pages settings**

Confirm the Cloudflare Pages project uses Node 20, `npm run build`, and the verified static output directory. Record the preview URL and production URL outside the repository; do not add credentials or dashboard secrets to source control.
