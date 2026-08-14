# TanStack Start Migration Design

## Goal

Migrate the personal portfolio from Next.js 16 to TanStack Start while preserving the current UI, accessibility behavior, SEO content, animations, tests, and static hosting model. Deploy the generated site to Cloudflare Pages.

## Chosen Approach

Use TanStack Start with Vite, TanStack Router, and static prerendering. Cloudflare Pages will serve the generated static output. Do not introduce Cloudflare Workers SSR, API routes, or TanStack Query because this portfolio has no server data or dynamic backend requirements.

## Architecture

- Replace Next.js App Router with TanStack Router file-based routes.
- Move the current home page to `src/routes/index.tsx`.
- Move document metadata, global stylesheet loading, skip link, theme bootstrap, and document shell to `src/routes/__root.tsx`.
- Keep existing feature components under `src/components/` with minimal changes.
- Add `src/router.tsx` and use the generated `src/routeTree.gen.ts`.
- Configure Vite with TanStack Start and React plugins.
- Enable static prerendering and link crawling.
- Keep Tailwind CSS v4, Framer Motion, Radix UI, Lucide, and Vitest.

## Migration Details

- Convert Next metadata to TanStack Start route `head` metadata.
- Replace Next-specific `next/font/google` with a compatible CSS/web-font approach, preserving the current typography as closely as possible.
- Replace Next-specific config and scripts with Vite/TanStack Start equivalents.
- Remove `next.config.ts`, `next-env.d.ts`, and Next-only dependencies after the new build passes.
- Preserve static asset paths and confirm all public assets work on Cloudflare Pages.
- Remove GitHub Pages deployment workflow and add Cloudflare Pages deployment configuration/documentation.

## Error Handling

- Preserve the existing application error UI as the root route error boundary where TanStack Router supports it.
- Add a not-found route for unmatched URLs.
- Keep loading behavior only where it is meaningful; the current static page does not need a data-loading layer.

## Verification

- Run lint, component tests, and production build.
- Confirm the generated static output contains the home page and public assets.
- Confirm document title, description, canonical URL, Open Graph metadata, and theme initialization.
- Confirm navigation anchors, mobile sheet menu, dark mode, reduced-motion behavior, and contact links still work.
- Test Cloudflare Pages preview deployment before removing the old deployment workflow.

## Out of Scope

- Redesigning the portfolio.
- Adding TanStack Query, API calls, authentication, or server functions.
- Migrating to Cloudflare Workers SSR.
- Adding new portfolio sections or analytics.
