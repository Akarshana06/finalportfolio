# Akarshana — The Book

An interactive portfolio concept built with React, Vite, and Three.js.

## Run locally

Requires Node.js 20.19+ (Node 24 is recommended).

```sh
npm install
npm run dev
```

Vite prints a local URL (usually `http://localhost:5173`). Open it in Chrome. Click the 3D book or **Open the Book** to see the portfolio chapters.

## Production build

```sh
npm run build
npm run preview
```

The build output is written to `dist/`.

## Render

`render.yaml` configures a Render Static Site using `npm install && npm run build`, publishing `dist/` with an SPA fallback. Connect the repository in Render to deploy.

## Before launch

The About, project, and résumé content is placeholder material for design review. Replace it with verified personal details before publishing. The sample email links also need to be updated.