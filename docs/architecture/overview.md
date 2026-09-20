# Architecture Overview

This is a Next.js 16 app (App Router) for a multi-tenant project management UI. Next.js 16 renamed Middleware to Proxy and changed other APIs — see `AGENTS.md` and `node_modules/next/dist/docs/` before writing routing/data-fetching code; don't rely on older Next.js knowledge.

## Stack

- **Next.js 16.3.4** (Turbopack dev server), **React 19.2**, **TypeScript**
- **TanStack Query v5** for server state, **react-hook-form + Zod** for forms
- **axios** for HTTP, **Tailwind v4** + **shadcn** (`components/ui/`, style `base-vega`) for UI
- **date-fns** / **date-fns-jalali** for dates (Jalali is the default calendar)
- **sonner** for toasts, **next-themes** for light/dark/system mode
- No test suite is configured (no Jest/Vitest/Playwright)

## Routing shape

Every route lives under `app/[lang]/...`. `proxy.ts` (not `middleware.ts` — see the Next.js 16 rename) redirects any request whose first path segment isn't a valid locale to `/${userLocale}${path}`, where the locale comes from the `userLocale` cookie (`utils/userLocaleManager.ts`) or defaults to `"fa"`. Paths containing a `.` or starting with `/api`/`/static` are ignored (`app/.well-known/[...slug]/route.ts` also short-circuits well-known probes so the proxy doesn't try to locale-redirect them).

Below the locale segment, authenticated routes carry two more dynamic segments for multi-tenancy:

```
app/[lang]/
  (auth)/                          sign-in, signup — unauthenticated flow
  (panel)/                         authenticated app shell
    [organization]/
      [workspace]/
        projects/                  workspace-scoped feature
        ...
      workspaces/                  organization-scoped feature (list/manage workspaces)
    organizations/                 panel-level feature (list/manage organizations)
    users/                         panel-level feature
```

Layouts/pages use the generated typed-route helpers (`LayoutProps<"/[lang]/...">`, `PageProps<"/[lang]/...">`) instead of hand-written prop types.

## Provider layering

Providers are mounted explicitly per layout (not collected into one root tree), so the closest ancestor `layout.tsx` tells you what context is guaranteed at a given route depth:

1. **Root layout** (`app/[lang]/layout.tsx`) — sets `<html lang dir>` from the locale, loads per-locale fonts, fetches `auth`/`share`/`meta` dictionaries server-side and passes them into `ShareDictionaryProvider`, then wraps everything in `BaseConfigProvider` (locale + theme) and `QueryClientProvider` (TanStack Query). Also mounts `Toaster`, `AxiosBaseConfig`, `AxiosLoggerInterceptor`.
2. **Panel layout** (`(panel)/layout.tsx`) — `ShortcutsProvider` → `HistoryProvider` → `SidebarProvider` → `ProfileProvider` → `OrganizationProvider`.
3. **Organization layout** (`(panel)/[organization]/layout.tsx`) — mounts `WorkspacesProvider` inside the above.
4. **Workspace layout** (`(panel)/[organization]/[workspace]/layout.tsx`) — mounts `SettingsProvider` (the settings modal) and renders the shared shell chrome: `AppSidebar`, `Header`, `MainWrapper`, `TabsNav`, `SettingsModal`.

`OrganizationProvider` and `WorkspacesProvider` both follow the same **"active entity" pattern**:

- Fetch the full list via the feature's query hook (`useUserOrganizations`, `useWorkspaces`).
- Resolve the "active" entity in priority order: (1) match the route param (`[organization]`/`[workspace]`) by slug, (2) fall back to the slug persisted in `localStorage` (`organizationManager.ts`/`workspaceManager.ts`), (3) fall back to the first item in the list.
- In a `useEffect`, `router.replace(...)` if the URL doesn't match the resolved entity — the URL is kept in sync with resolved state rather than trusted directly.
- Expose `{ xQuery, activeX }` (plus `onChangeWorkspace`, which also persists slugs and clears stale query cache) through context, gating `children` on readiness with `LinearLoading`.
- Render a scoped axios interceptor component (`OrganizationAxiosInterceptor`, `WorkspaceAxiosInterceptor`) that adds an `organization-id`/`workspace-id` header for the lifetime of the active entity.

New URL-scoped entities below `[workspace]` should follow this same three-part shape.

## Feature module structure

Each domain feature (`organizations/`, `users/`, `[organization]/workspaces/`, `[workspace]/projects/`, `(auth)/`) has the same internal shape:

```
<feature>/
  services/<feature>ApiActions.ts   axios calls + types, no React
  hooks/use<Feature>.ts             TanStack Query wrappers
  schemas/<feature>Schemas.ts       Zod schema factories
  components/*.tsx                  feature-specific UI
```

- **API actions**: domain `interface`, `Pick`-derived `UpdateX`/`CreateX` payload types, an `xBaseApi` path constant (also reused as the TanStack Query key), one function per endpoint returning the raw axios promise. GET functions accept `{ signal }` for query cancellation.
- **Hooks**: one `useQuery`/`useMutation` per operation; mutations invalidate the query key that actually *consumes* the data (not always their own feature's key). Domain side effects (e.g. logging out on a failed info fetch) live here, not in components.
- **Schemas**: factory functions (optionally taking `{ dic }` for localized messages), never a bare top-level `z.object` export.

A feature whose sibling client components need to share one query result (seen in `projects/`) adds a second `services/control/` subfolder with its own context + provider, mounted directly in that feature's `page.tsx` rather than a shared layout.

## Cross-cutting panel services

- **`(panel)/services/shortcuts/`** — single `defaultShortcuts` source of truth; components bind hotkeys via `useShortcutsContext()` + `@tanstack/react-hotkeys`.
- **`[workspace]/services/settings/`** — the settings modal (workspace-scoped, so it's mounted at the workspace layout, not the panel layout); tab list and icon map live in `utils/`, content is delegated to each domain's existing component.
- **`[workspace]/services/history/`** — tracks navigation via `usePathname()`; mounted at the panel layout via a relative import despite living under `[workspace]/`, so it's available panel-wide.

## Networking

A single shared axios instance (`app/utils/defaultAxios.ts`, `baseURL = NEXT_PUBLIC_API_URI`) is used everywhere. `AxiosBaseConfig` (root layout) adds `languageID`/`apptype` headers. Deeper layers (`OrganizationAxiosInterceptor`, `WorkspaceAxiosInterceptor`) register/eject additional request interceptors on the *same* instance rather than creating new ones.

Stored images (`Project.icon`, `Organization.logo`, `User.avatar`) are relative paths served directly from the API host — rendered as `` `${NEXT_PUBLIC_SERVER_URI}${path}` ``, a separate env var from `NEXT_PUBLIC_API_URI`. Upload/delete use dedicated POST/DELETE sub-paths (e.g. `${projectsBaseApi}/${id}/icon`), not PATCH.

## i18n

`internalization/app/localization.ts` defines supported locales; only `fa` (Jalali, RTL) is currently `active`, `en` exists but is inactive. Global dictionaries (`auth`, `meta`, `share`) are fetched once in the root layout and pushed via `ShareDictionaryProvider`. Panel features with page-specific copy nest under `internalization/app/dictionaries/panel/<feature>/` and pass a `dic` prop down explicitly from their `page.tsx` instead of going through the global provider.

## Conventions worth knowing

- Files: components `PascalCase.tsx`, hooks `useThing.ts`, everything else `camelCase.ts`.
- Named exports declared individually, grouped into one `export { ... }` at the bottom — except Next.js-required default exports (`page.tsx`, `layout.tsx`, `route.ts`, Providers).
- `@/*` path alias maps to the repo root; use it across feature folders, relative imports within the same feature.
- `components/ui/` is shadcn-generated — don't hand-edit; app composites go in `components/` or the owning feature's `components/`.

See `CLAUDE.md` for the full, more detailed version of these conventions (image upload pattern, form/toast conventions, icon set usage, etc.).
