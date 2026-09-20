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
- `app/[lang]/(panel)/` — the authenticated app shell, nested `[organization]/[workspace]/...` (see below). Cross-cutting panel state (sidebar, profile, organization, global keyboard shortcuts, navigation history) is each implemented as its own `services/<feature>/` folder colocated with that feature's `components/`, mounted once in `(panel)/layout.tsx`. The settings modal is the one exception — it's workspace-scoped, mounted in `[workspace]/layout.tsx` instead (see below).

### Multi-tenant hierarchy: organization → workspace

Below the locale, panel routes carry two more dynamic segments: `app/[lang]/(panel)/[organization]/[workspace]/...`. Both levels follow the identical **"active entity" provider pattern**, each layered in its own layout:

1. `(panel)/layout.tsx` mounts `ShortcutsProvider` → `HistoryProvider` → `SidebarProvider` → `ProfileProvider` → `OrganizationProvider` (`(panel)/services/organization/`).
2. `(panel)/[organization]/layout.tsx` mounts `WorkspacesProvider` (`[organization]/services/workspaces/`) inside that.

Each provider (`OrganizationProvider.tsx`, `WorkspacesProvider.tsx`):
- Fetches the full list via its feature's `useX` query hook (`useUserOrganizations`, `useWorkspaces`).
- Derives the "active" entity with `useMemo`, checked in priority order: (1) match the `[organization]`/`[workspace]` route param against the fetched list by `slug`; (2) fall back to the slug persisted in `localStorage` by `organizationManager.ts`/`workspaceManager.ts` (`getActiveOrganization`/`getActiveWorkspace`, keys `active-organization-slug`/`active-workspace-slug`) if it still matches an item in the list; (3) otherwise fall back to the first item (or, for workspaces, the first item belonging to the active organization).
- In a `useEffect`, if the URL param doesn't match the resolved active entity, calls `router.replace(...)` to correct the URL — so the URL is always kept in sync with the resolved active entity rather than trusted directly. `WorkspacesProvider`'s `onChangeWorkspace` (exposed through context for other components to switch workspace explicitly) additionally calls `saveActiveWorkspace`/`saveActiveOrganization` to persist both slugs and `useClearQueries()` to drop stale TanStack Query cache from the previous workspace.
- Exposes `{ xQuery, activeX }` (plus `onChangeWorkspace` for workspaces) through a context (`useOrganizationContext`, `useWorkspacesContext`), gating `children` on the query/entity being ready and showing `LinearLoading` (org level) in the meantime.
- Renders a dedicated scoped Axios interceptor component (`OrganzationAxiosInterceptor`, `WorkspaceAxiosInterceptor` — note the existing typos, keep them when extending this code so grep/imports still match) that, in a `useEffect` keyed on the active entity, registers a request interceptor adding an `organization-id`/`workspace-id` header and ejects it on cleanup/change.

Follow this same three-part shape (provider resolves + redirects, context exposes the active entity, a scoped axios interceptor component injects the id header) for any new URL-scoped entity added below `[workspace]`.

### Global shortcuts, settings modal, and navigation history

Three more `services/*` folders round out the panel shell's cross-cutting state, mounted at `(panel)/layout.tsx` alongside the entities above (`ShortcutsProvider` and `HistoryProvider` are the outermost providers, wrapping `SidebarProvider`):

- **`(panel)/services/shortcuts/`** — `shortcutsManager.ts` declares a single `defaultShortcuts` object (categories like `general` → items like `toggleNavigation`/`toggleSettings`/`toggleShortcuts`, each a `RegisterableHotkey` string from `@tanstack/react-hotkeys`); `ShortcutsProvider` holds it in state and exposes `onGetShortcutKeys(category, item)` through context. Any component that needs to bind a hotkey imports `useShortcutsContext()` and passes the returned keys into `@tanstack/react-hotkeys`'s `useHotkey(...)`, rather than hardcoding key combos — that's what makes `shortcutsManager.ts` the single source of truth for rebinding later.
- **`[workspace]/services/settings/`** — the settings modal, mounted in `[workspace]/layout.tsx` (not `(panel)/layout.tsx`, since it renders workspace-scoped tabs like the active workspace's edit form). `SettingsProvider` owns `{ open, activeTab, showConfirmLogout }` and registers the `toggleSettings`/`toggleShortcuts` hotkeys itself (via `useShortcutsContext()`) to open the modal on a given tab. `utils/settingItems.ts` is the ordered tab list (`SettingTab` union) and `utils/getSettingsIcon.tsx` maps each tab key to an icon; `components/SettingsModal.tsx` renders the tab list from `settingItems` and switches on `activeTab` to delegate content to each domain's *existing* component (`UserWrapper`, `OrganizationWrapper`, `EditWorkspace`, `WorkspacesWrapper`, `ShortcutsWrapper`) rather than duplicating that UI — add a settings tab by adding a `settingItems` entry, an icon case, and a `renderSettingContent` case pointing at the feature's own component.
- **`[workspace]/services/history/`** — `HistoryProvider` tracks a `redirectCount` (bumped on every `usePathname()` change) exposed via `useHistoryContext()`; `components/HistoryControllers.tsx` is the back-navigation button that reads it. Despite living under `[workspace]/`, it's mounted at `(panel)/layout.tsx` via a relative import, so it's available panel-wide, not just within a workspace.

### Feature module structure

Each domain feature (`organizations/`, `users/`, `[organization]/workspaces/`, `[workspace]/projects/`, `(auth)/`) is a folder with the same internal shape — mirror it for new features instead of inventing a new layout:

```
<feature>/
  services/<feature>ApiActions.ts   # axios calls + types, no React
  hooks/use<Feature>.ts             # TanStack Query wrappers around the service
  schemas/<feature>Schemas.ts       # Zod schema factories (see below)
  components/*.tsx                  # feature-specific UI
```

**API action modules** (`*ApiActions.ts`): declare the domain `interface` (e.g. `Organization`, `User`, `Project`), a `type UpdateX = Pick<X, ...>` (and, for create flows, a `type CreateX = Pick<X, ...>`) for mutation payloads, a `const xBaseApi = "/x"` path string, and one function per endpoint that returns the raw axios promise (callers do `res.data`). GET functions take `{ signal }` to support TanStack Query cancellation. The `xBaseApi` (or a more specific `xInfoApi`/`xOrganizationsApi` constant built from it) doubles as the TanStack Query `queryKey` — import the same constant in both the service and the hook rather than re-typing the key string. Cross-feature types are imported directly from the other feature's service module (e.g. `usersApiActions.ts` imports `Organization` from `organizationsApiActions.ts`).

**Hooks** (`use<Feature>.ts`): one `useQuery`/`useMutation` wrapper per operation (`useUsersInfo`, `useUpdateUser`, `useProjects`, `useCreateProject`, `useUpdateProject`, `useDeleteProject`, ...). Every mutation invalidates a query key in `onSuccess` via `queryClient.invalidateQueries({ queryKey: [xBaseApi] })` — prefer this over manually refetching — and invalidates the *consuming* query's key, not necessarily its own feature's (e.g. `useUpdateOrganization` invalidates `userInfoApi`, matching how `UserInfo`/`Organization` data is actually consumed elsewhere; a feature's own mutations, like the project ones, just invalidate their own `xBaseApi` list key when nothing else consumes that data). Side effects that belong to the domain (e.g. `useUsersInfo` calling `useLogout()` when the info query errors) live in the hook, not the component.

**Schemas** (`*Schemas.ts`): factory functions (`create<Thing>Schema()`/`<thing>Schema()`, optionally taking `{ dic }` for localized messages — see `authSchemas.ts`) returning a `z.object(...)`; the inferred type is exported alongside as `type <Thing>Schema = z.infer<ReturnType<typeof create<Thing>Schema>>`. Never declare a schema as a bare top-level `z.object` export.

**Page-scoped context** (seen in `[workspace]/projects/`): a feature whose sibling client components (filters, list, item) need to share one fetched query result puts a *second* subfolder, `services/control/`, next to the plain `services/<feature>ApiActions.ts` — `services/control/<feature>Context.ts` (the `createContext`/`useXContext`/`OutOfContext` shape from the Context/Provider pattern below) and `services/control/<Feature>Provider.tsx` (calls the feature's `use<Feature>` query hook once and exposes it through the context). Unlike the organization/workspace "active entity" providers, this provider is mounted directly in the feature's own `page.tsx` (wrapping just that page's tree), not in a shared layout, since the state is only needed within that one page.

### Entity image upload/delete pattern

Entities with an image field (`Project.icon`, `Organization.logo`, `User.avatar`) follow the same upload/delete shape, added to the feature's *existing* `*ApiActions.ts`/`use<Feature>.ts` files rather than a new module:

- **Service**: a dedicated sub-path off the entity's base API (`${projectsBaseApi}/${id}/icon`, `${organizationsBaseApi}/logo`, `${userBaseApi}/avatar`) with `axios.post(path, data: FormData)` to upload and `axios.delete(path)` to remove — no PATCH/body-based update for the image itself.
- **Hooks**: `useUpload<Thing>Icon`/`useUpdate<Thing>Logo`/`useUpdate<Thing>Avatar` (mutation takes the `FormData`, plus an `id` for non-scoped entities like projects) and `useDelete<Thing>Icon`/`Logo`/`Avatar` (no args for singleton-per-user/org entities), each invalidating the same query key the entity's other mutations invalidate.
- **UI**: the image renders via shadcn `Avatar`/`AvatarImage`/`AvatarFallback`, `src` built as `` `${process.env.NEXT_PUBLIC_SERVER_URI}${entity.icon}` `` (a *different* env var from the axios `baseURL`, since images are served from the API host directly rather than through the versioned API path — see Networking below). A hidden `<input type="file" accept="image/*" />` is clicked via a `ref` from a visible "change image" `Button`, appends the picked file to a `FormData` under the key `"image"`, and calls the upload mutation directly `onChange` (no local preview/crop step). Deletion is gated behind a shadcn `AlertDialog` (destructive variant, `IoIosWarning` icon in `AlertDialogMedia`) confirming before calling the delete mutation — mirror `EditProject.tsx`, `UserAvatar.tsx`, or `OrganizationWrapper.tsx` for a new instance of this pattern rather than writing it from scratch.

### i18n dictionaries

`internalization/app/dictionaries/<domain>/` (`auth`, `meta`, `share`) each hold `en.json`/`fa.json` plus a `dictionary.ts` that is `"server-only"` and exposes `get<Domain>Dictionary({ locale })`, dynamically importing the right JSON. Dictionaries are fetched once in the root layout and pushed into client components via `ShareDictionaryProvider` (`services/share-dictionary/`) rather than re-fetched per component. When adding user-facing text, add keys to the relevant `en.json`/`fa.json` pair and route them through the existing dictionary getter — don't hardcode strings in components.

Panel features that own their own page-specific copy (rather than sharing the global `share` dictionary) instead nest under `internalization/app/dictionaries/panel/<feature>/` (e.g. `panel/projects/`), same `en.json`/`fa.json` + `dictionary.ts` shape. These are fetched in the feature's `page.tsx` server component (via `generateMetadata` and the page body) and passed down explicitly as a `dic` prop through the feature's own component tree, instead of going through `ShareDictionaryProvider` — reserve that provider for dictionaries needed outside a single feature's page.

### Context/Provider pattern

Global and feature-scoped state (`services/base-config`, `services/react-query`, `services/share-dictionary`, and every `app/[lang]/(panel)/services/*` / `app/[lang]/(panel)/[organization]/services/*`) follows the same shape: a `xContext.ts` with `createContext<T | null>(null)` and a `useX()` hook that calls React's `use()` and throws `OutOfContext` (`utils/OutOfContext.ts`, message format `` `use${contextName} must be used within a ${contextName}Provider` ``) if called outside its provider, plus an `XProvider.tsx` client component (`"use client"`) supplying the value. Follow this pattern for new shared state instead of prop drilling or ad hoc contexts.

`services/base-config/BaseConfigProvider.tsx` owns locale switching (`setLocale` rewrites the URL's locale segment and does a full navigation) and wraps `next-themes`' `ThemeProvider` (see `utils/appModes.ts` for the `light`/`dark`/`system` union).

Provider nesting is explicit in each layout rather than collected in one root provider tree — check the closest ancestor `layout.tsx` to see what context is guaranteed to be available at a given route depth (root → base-config/share-dictionary/react-query → panel (shortcuts → history → sidebar → profile → organization) → per-organization (workspaces) → per-workspace (settings)).

### Networking

`app/utils/defaultAxios.ts` exports a shared axios instance (`baseURL` = `NEXT_PUBLIC_API_URI`). `app/[lang]/services/axios-interceptors/AxiosBaseConfig.tsx` is a client component (mounted once in the root layout) that registers a request interceptor adding `languageID` and `apptype` headers, kept in sync with the active locale via `useBaseConfig()`. Deeper layers layer their own scoped interceptors on the *same* shared instance (see `OrganzationAxiosInterceptor`/`WorkspaceAxiosInterceptor` above) rather than creating a new axios instance per feature — all API calls (e.g. `authApiActions.ts`, `*ApiActions.ts`) import the one shared `axios` instance from `app/utils/defaultAxios.ts`.

Stored images (`Project.icon`, `Organization.logo`, `User.avatar`) are relative paths served from the API host directly, not through axios — rendered as `` `${process.env.NEXT_PUBLIC_SERVER_URI}${path}` ``, a separate env var from `NEXT_PUBLIC_API_URI`. See the entity image upload/delete pattern above.

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
- Two icon sets are in play: `lucide-react` (the shadcn/`components.json` default) and `react-icons` (e.g. `react-icons/fa`'s `FaSearch`/`FaPlus`, used in `projects/components/ProjectsFilters.tsx`) — check what an existing feature already imports before picking one for new UI.
- `(panel)/components/NoItemFound.tsx` is the shared empty-state for search/filter UIs (icon + localized message, optionally echoing the searched text) — used across unrelated features (`ShortcutsWrapper`, `WorkspacesWrapper`, `ProjectsList`); reuse it for a new searchable list instead of writing a bespoke empty state.
