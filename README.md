# Project Manager UI

A multi-tenant project management web application built with Next.js 16. Users belong to organizations, each organization has one or more workspaces, and each workspace contains projects — with locale-aware (Persian/English), RTL-first UI on top.

## Features

- **Authentication** — sign-in and a multi-step signup wizard.
- **Organizations & Workspaces** — a two-level multi-tenant hierarchy (`organization → workspace`), with an "active entity" resolved from the URL, falling back to the last-used selection saved locally, and kept in sync via automatic URL redirects.
- **Projects** — create, update, delete, and manage projects within a workspace, including project icon upload/removal.
- **User & organization profile management** — edit user info and avatar, edit organization info and logo.
- **Settings modal** — a workspace-scoped modal for account, organization, workspace, and shortcuts settings.
- **Global keyboard shortcuts** — a single source of truth for hotkey bindings across the app (toggle navigation, toggle settings, toggle shortcuts help, etc.).
- **Navigation history** — in-app back navigation across visited routes.
- **Internationalization** — Persian (`fa`, RTL, Jalali calendar, default) and English (`en`, LTR, Gregorian calendar, currently inactive) locales, with locale-prefixed routing (`/[lang]/...`) enforced by a proxy.
- **Theming** — light/dark/system theme support.

## Requirements

- **Node.js** 20 or later (developed/tested with Node 26)
- **npm** 10+ (or an npm-compatible package manager)
- A running instance of the backend API this UI talks to (see [Environments](#environments))

## How to Install and Clone the Project

```bash
# Clone the repository
git clone git@github.com:HRAWEBDEV/project-manager-ui.git
cd project-manager-ui

# Install dependencies
npm install
```

Then set up your environment variables (see [Environments](#environments) below) before running the dev server.

## Environments

Environment variables are loaded from `.env.development` (used by `npm run dev`) and `.env.production` (used by `npm run build` / `npm run start`). Create your own `.env` (or edit the existing per-mode files) with the following variables:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_MODE` | Application mode, either `DEVELOPMENT` or `PRODUCTION`. Controls behaviors such as disabling query retries in development. |
| `NEXT_PUBLIC_API_URI` | Base URL for the versioned backend API (used by the shared Axios instance), e.g. `http://localhost:8080/api/v1`. |
| `NEXT_PUBLIC_SERVER_URI` | Base URL of the API host used to resolve stored image paths (project icons, organization logos, user avatars), e.g. `http://localhost:8080`. |

Example (`.env.development`):

```bash
NEXT_PUBLIC_MODE=DEVELOPMENT
NEXT_PUBLIC_SERVER_URI=http://localhost:8080
NEXT_PUBLIC_API_URI=http://localhost:8080/api/v1
```

## Development

```bash
# Start the dev server (Turbopack, via `next dev`)
npm run dev

# Lint the project (ESLint flat config, core-web-vitals + typescript)
npm run lint

# Build for production
npm run build

# Run the production build
npm run start
```

The dev server starts on `http://localhost:3000` by default. Visiting `/` redirects to the default locale (`/fa`) based on the `userLocale` cookie.

There is no test suite configured in this repo (no Jest/Vitest/Playwright).

### Notes for contributors

- This project runs **Next.js 16**, which introduced breaking changes relative to older Next.js conventions (e.g. `proxy.ts`/`proxy` instead of `middleware.ts`/`middleware`, typed route helpers like `LayoutProps`/`PageProps`). See `AGENTS.md` and `CLAUDE.md` for details before making routing or data-fetching changes.
- To add shadcn/ui components, use the `shadcn` CLI — see `components.json` for aliases and style configuration.
