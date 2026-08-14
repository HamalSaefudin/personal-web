# Hamal Personal Website

Personal portfolio built with TanStack Start, TanStack Router, React, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run test:run
npm run build
npm run start
```

`npm run start` serves the production build locally with Vite Preview.

## Cloudflare Pages

Connect the repository to Cloudflare Pages with these settings:

```text
Build command: npm run build
Build output directory: dist/client
Node.js version: 20
```

The build uses TanStack Start static prerendering. The generated `dist/client` directory contains the prerendered HTML, bundled assets, icons, sitemap, and robots file that Cloudflare Pages serves.
