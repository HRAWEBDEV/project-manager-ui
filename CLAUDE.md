# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (Turbopack, via `next dev`)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)

There is no test suite configured in this repo (no Jest/Vitest/Playwright).

To add shadcn components, use the `shadcn` CLI — see `components.json` for aliases (`@/components`, `@/components/ui`, `@/lib`, `@/hooks`) and style config (`base-vega`, neutral base color, CSS variables, Lucide icons).

## Architecture

**This is Next.js 16**, which renamed Middleware to Proxy and made other breaking changes vs. older Next.js knowledge — see `AGENTS.md` for the mandate to check `node_modules/next/dist/docs/` before writing routing/data-fetching code. Concretely in this repo: there is a root `proxy.ts` (not `middleware.ts`), exporting a `proxy` function instead of `middleware`; layouts and pages use the generated typed-route helpers `LayoutProps<"/[lang]/...">` / `PageProps<"/[lang]/...">` instead of hand-written prop types.

### Locale-prefixed routing

Every route lives under `app/[lang]/...`. The locale segment is enforced by `proxy.ts`: it redirects any request whose first path segment isn't a valid locale to `/${userLocale}${path}`, where the locale comes from the `userLocale` cookie (`utils/userLocaleManager.ts`) or defaults to `"fa"`. Paths containing a `.` or starting with `/api` or `/static` are ignored by the proxy.

Locale metadata (supported locales, direction, calendar system, date-fns locale) lives in `internalization/app/localization.ts`. Currently only `fa` (Jalali calendar, RTL) is `active`; `en` exists but is marked inactive. `app/[lang]/layout.tsx` reads `lang` from route params, sets `<html lang dir>`, loads per-locale fonts (`IRANSansWebFaNum` for fa, `Roboto` for en) and fetches all dictionaries server-side in parallel.

### Route groups

- `app/[lang]/(auth)/` — sign-in/signup flow. `hooks/useAuth.ts` wraps TanStack Query mutations, `services/authApiActions.ts` calls the API, `schemas/authSchemas.ts` builds Zod schemas. `sign-in/` and `signup/` each have their own `components/` folder for step/route-specific UI (e.g. `signup/utils/signupSteps.ts` drives a multi-step wizard).
- `app/[lang]/(panel)/` — the authenticated app shell, nested `[organization]/[workspace]/...` (see below). Cross-cutting panel state (sidebar, settings, profile, organization) is each implemented as its own `services/<feature>/` folder colocated with that feature's `components/`, mounted once in `(panel)/layout.tsx`.

### Multi-tenant hierarchy: organization → workspace

Below the locale, panel routes carry two more dynamic segments: `app/[lang]/(panel)/[organization]/[workspace]/...`. Both levels follow the identical **"active entity" provider pattern**, each layered in its own layout:

1. `(panel)/layout.tsx` mounts `SidebarProvider` → `ProfileProvider` → `OrganizationProvider` (`(panel)/services/organization/`).
2. `(panel)/[organization]/layout.tsx` mounts `WorkspacesProvider` (`[organization]/services/workspaces/`) inside that.

Each provider (`OrganizationProvider.tsx`, `WorkspacesProvider.tsx`):
- Fetches the full list via its feature's `useX` query hook (`useUserOrganizations`, `useWorkspaces`).
- Derives the "active" entity with `useMemo`: match the `[organization]`/`[workspace]` route param against the fetched list by `slug`; fall back to the first item (or, for workspaces, the first item belonging to the active organization) if the param is missing or doesn't match.
- In a `useEffect`, if the URL param doesn't match the resolved active entity, calls `router.replace(...)` to correct the URL — so the URL is always kept in sync with the resolved active entity rather than trusted directly.
- Exposes `{ xQuery, activeX }` through a context (`useOrganizationContext`, `useWorkspacesContext`), gating `children` on the query/entity being ready and showing `LinearLoading` (org level) in the meantime.
- Renders a dedicated scoped Axios interceptor component (`OrganzationAxiosInterceptor`, `WorkspaceAxiosInterceptor` — note the existing typos, keep them when extending this code so grep/imports still match) that, in a `useEffect` keyed on the active entity, registers a request interceptor adding an `organization-id`/`workspace-id` header and ejects it on cleanup/change.

Follow this same three-part shape (provider resolves + redirects, context exposes the active entity, a scoped axios interceptor component injects the id header) for any new URL-scoped entity added below `[workspace]`.

### Feature module structure

Each domain feature (`organizations/`, `users/`, `[organization]/workspaces/`, `(auth)/`) is a folder with the same internal shape — mirror it for new features instead of inventing a new layout:

```
<feature>/
  services/<feature>ApiActions.ts   # axios calls + types, no React
  hooks/use<Feature>.ts             # TanStack Query wrappers around the service
  schemas/<feature>Schemas.ts       # Zod schema factories (see below)
  components/*.tsx                  # feature-specific UI
```

**API action modules** (`*ApiActions.ts`): declare the domain `interface` (e.g. `Organization`, `User`), a `type UpdateX = Pick<X, ...>` for mutation payloads, a `const xBaseApi = "/x"` path string, and one function per endpoint that returns the raw axios promise (callers do `res.data`). GET functions take `{ signal }` to support TanStack Query cancellation. The `xBaseApi` (or a more specific `xInfoApi`/`xOrganizationsApi` constant built from it) doubles as the TanStack Query `queryKey` — import the same constant in both the service and the hook rather than re-typing the key string. Cross-feature types are imported directly from the other feature's service module (e.g. `usersApiActions.ts` imports `Organization` from `organizationsApiActions.ts`).

**Hooks** (`use<Feature>.ts`): one `useQuery`/`useMutation` wrapper per operation (`useUsersInfo`, `useUpdateUser`, ...). Mutations invalidate the *consuming* query's key in `onSuccess` (e.g. `useUpdateOrganization` invalidates `userInfoApi`, not an organization-specific key), matching how `UserInfo`/`Organization` data is actually consumed elsewhere. Side effects that belong to the domain (e.g. `useUsersInfo` calling `useLogout()` when the info query errors) live in the hook, not the component.

**Schemas** (`*Schemas.ts`): factory functions (`create<Thing>Schema()`, optionally taking `{ dic }` for localized messages — see `authSchemas.ts`) returning a `z.object(...)`; the inferred type is exported alongside as `type <Thing>Schema = z.infer<ReturnType<typeof create<Thing>Schema>>`. Never declare a schema as a bare top-level `z.object` export.

### i18n dictionaries

`internalization/app/dictionaries/<domain>/` (`auth`, `meta`, `share`) each hold `en.json`/`fa.json` plus a `dictionary.ts` that is `"server-only"` and exposes `get<Domain>Dictionary({ locale })`, dynamically importing the right JSON. Dictionaries are fetched once in the root layout and pushed into client components via `ShareDictionaryProvider` (`services/share-dictionary/`) rather than re-fetched per component. When adding user-facing text, add keys to the relevant `en.json`/`fa.json` pair and route them through the existing dictionary getter — don't hardcode strings in components.

### Context/Provider pattern

Global and feature-scoped state (`services/base-config`, `services/react-query`, `services/share-dictionary`, and every `app/[lang]/(panel)/services/*` / `app/[lang]/(panel)/[organization]/services/*`) follows the same shape: a `xContext.ts` with `createContext<T | null>(null)` and a `useX()` hook that calls React's `use()` and throws `OutOfContext` (`utils/OutOfContext.ts`, message format `` `use${contextName} must be used within a ${contextName}Provider` ``) if called outside its provider, plus an `XProvider.tsx` client component (`"use client"`) supplying the value. Follow this pattern for new shared state instead of prop drilling or ad hoc contexts.

`services/base-config/BaseConfigProvider.tsx` owns locale switching (`setLocale` rewrites the URL's locale segment and does a full navigation) and wraps `next-themes`' `ThemeProvider` (see `utils/appModes.ts` for the `light`/`dark`/`system` union).

Provider nesting is explicit in each layout rather than collected in one root provider tree — check the closest ancestor `layout.tsx` to see what context is guaranteed to be available at a given route depth (root → base-config/share-dictionary/react-query → panel → sidebar/profile/organization → per-organization → workspaces → per-workspace).

### Networking

`app/utils/defaultAxios.ts` exports a shared axios instance (`baseURL` = `NEXT_PUBLIC_API_URI`). `app/[lang]/services/axios-interceptors/AxiosBaseConfig.tsx` is a client component (mounted once in the root layout) that registers a request interceptor adding `languageID` and `apptype` headers, kept in sync with the active locale via `useBaseConfig()`. Deeper layers layer their own scoped interceptors on the *same* shared instance (see `OrganzationAxiosInterceptor`/`WorkspaceAxiosInterceptor` above) rather than creating a new axios instance per feature — all API calls (e.g. `authApiActions.ts`, `*ApiActions.ts`) import the one shared `axios` instance from `app/utils/defaultAxios.ts`.

### Data fetching / forms

- TanStack Query is the async state layer; `services/react-query/ReactQueryProvider.tsx` creates a server-side client per request and a memoized singleton in the browser (`environmentManager.isServer()` branch), with query devtools enabled always but `retry` disabled in `NEXT_PUBLIC_MODE === DEVELOPMENT`.
- Forms use `react-hook-form` + `@hookform/resolvers/zod`, with Zod schemas built as factory functions that take the locale dictionary (see `authSchemas.ts`) so error messages are localized. Field markup follows the shadcn `Field`/`FieldLabel`/`FieldContent`/`FieldError` composition from `components/ui/field.tsx`, with `data-invalid={!!formState.errors.x}` set on both `Field` and its input wrapper; submit buttons stay `type="submit"` but call `e.preventDefault()` then `handleSubmit(...)()` manually rather than relying on native form submission, and show a `Spinner` while `mutation.isPending`.
- Toasts use `sonner` (`<Toaster>` mounted in the root layout); errors from mutations are surfaced via `toast.error(...)` in the mutation's `onError`, not thrown/rendered inline.

### Naming & export conventions

- Files: components are `PascalCase.tsx`; hooks are `useThing.ts`; everything else (contexts, api actions, schemas, utils) is `camelCase.ts`, typically prefixed/suffixed with its feature name (`organizationContext.ts`, `organizationsApiActions.ts`, `organizatinosSchemas.ts`) — check the existing filename in a feature folder before assuming the "correct" spelling, this codebase has a few established typos (`Organzation`, `Worksapce`, `organizatinos`, `SingUpNow`) that are the actual identifiers in use.
- Modules declare functions/consts individually (`function useX() {}`, `const xBaseApi = ...`) and export them together at the bottom via a single `export { ... }` (and `export type { ... }` for types) rather than inlining `export` on each declaration. The exception is anything Next.js requires as a default export — `page.tsx`, `layout.tsx`, `route.ts`, and Provider/standalone components (`export default function XProvider(...)`).
- `interface` for object shapes that model API/domain entities, `type` for unions, `Pick`-derived payload shapes, and inferred Zod types.

### Other conventions

- `app/.well-known/[...slug]/route.ts` catches all `/.well-known/*` requests and returns a bare 404, to stop the proxy/framework from applying locale-redirect logic to well-known probes.
- Path alias `@/*` maps to the repo root (`tsconfig.json`); prefer it over deep relative imports (`../../../..`) when reaching across feature folders, but same-feature imports (e.g. a hook importing its own feature's service) use relative paths — follow whichever an existing file in that folder already does.
- Persian is the primary/default locale and default calendar is Jalali (`date-fns-jalali`) — keep RTL and Jalali-date handling in mind when touching date or direction-sensitive UI (see `hooks/useLocaleDateFns.ts`, `utils/getLocaleDateFns.ts`).
- `components/ui/` is shadcn-generated (style `base-vega`) — don't hand-edit these beyond what the `shadcn` CLI produces; put app-specific composites in `components/` (top-level, cross-feature, e.g. `LinearLoading.tsx`) or in the owning feature's `components/` folder (feature-specific).
