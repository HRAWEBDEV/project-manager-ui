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

**This is Next.js 16**, which renamed Middleware to Proxy and made other breaking changes vs. older Next.js knowledge — see `AGENTS.md` for the mandate to check `node_modules/next/dist/docs/` before writing routing/data-fetching code. Concretely in this repo: there is a root `proxy.ts` (not `middleware.ts`), exporting a `proxy` function instead of `middleware`.

### Locale-prefixed routing

Every route lives under `app/[lang]/...`. The locale segment is enforced by `proxy.ts`: it redirects any request whose first path segment isn't a valid locale to `/${userLocale}${path}`, where the locale comes from the `userLocale` cookie (`utils/userLocaleManager.ts`) or defaults to `"fa"`. Paths containing a `.` or starting with `/api` or `/static` are ignored by the proxy.

Locale metadata (supported locales, direction, calendar system, date-fns locale) lives in `internalization/app/localization.ts`. Currently only `fa` (Jalali calendar, RTL) is `active`; `en` exists but is marked inactive. `app/[lang]/layout.tsx` reads `lang` from route params, sets `<html lang dir>`, loads per-locale fonts (`IRANSansWebFaNum` for fa, `Roboto` for en) and fetches all dictionaries server-side in parallel.

### Route groups

- `app/[lang]/(auth)/` — sign-in flow (`useAuth.ts` wraps TanStack Query mutations, `authApiActions.ts` calls the API, `authSchemas.ts` builds Zod schemas that take the locale dictionary so validation messages are localized).
- `app/[lang]/(panel)/` — the authenticated app shell (header, sidebar, tabs, settings, profile). Cross-cutting panel state (sidebar, settings, profile) is each implemented as its own `services/<feature>/` folder with a `<feature>Context.ts` + `<feature>Provider.tsx` pair, colocated with that feature's `components/`.

### i18n dictionaries

`internalization/app/dictionaries/<domain>/` (`auth`, `meta`, `share`) each hold `en.json`/`fa.json` plus a `dictionary.ts` that is `"server-only"` and exposes `get<Domain>Dictionary({ locale })`, dynamically importing the right JSON. Dictionaries are fetched once in the root layout and pushed into client components via `ShareDictionaryProvider` (`services/share-dictionary/`) rather than re-fetched per component. When adding user-facing text, add keys to the relevant `en.json`/`fa.json` pair and route them through the existing dictionary getter — don't hardcode strings in components.

### Context/Provider pattern

Global and feature-scoped state (`services/base-config`, `services/react-query`, `services/share-dictionary`, and every `app/[lang]/(panel)/services/*`) follows the same shape: a `xContext.ts` with `createContext<T | null>(null)` and a `useX()` hook that throws `OutOfContext` (`utils/OutOfContext.ts`) if called outside its provider, plus an `XProvider.tsx` client component supplying the value. Follow this pattern for new shared state instead of prop drilling or ad hoc contexts.

`services/base-config/BaseConfigProvider.tsx` owns locale switching (`setLocale` rewrites the URL's locale segment and does a full navigation) and wraps `next-themes`' `ThemeProvider` (see `utils/appModes.ts` for the `light`/`dark`/`system` union).

### Networking

`app/utils/defaultAxios.ts` exports a shared axios instance (`baseURL` = `NEXT_PUBLIC_API_URI`). `app/[lang]/services/axios-interceptors/AxiosBaseConfig.tsx` is a client component (mounted once in the root layout) that registers a request interceptor adding `languageID` and `apptype` headers, kept in sync with the active locale via `useBaseConfig()`. API calls (e.g. `authApiActions.ts`) import the shared `axios` instance rather than creating their own.

### Data fetching / forms

- TanStack Query is the async state layer; `services/react-query/ReactQueryProvider.tsx` creates a server-side client per request and a memoized singleton in the browser (`environmentManager.isServer()` branch), with query devtools enabled always but `retry` disabled in `NEXT_PUBLIC_MODE === DEVELOPMENT`.
- Forms use `react-hook-form` + `@hookform/resolvers/zod`, with Zod schemas built as factory functions that take the locale dictionary (see `authSchemas.ts`) so error messages are localized.
- Toasts use `sonner` (`<Toaster>` mounted in the root layout); errors from mutations are surfaced via `toast.error(...)` in the mutation's `onError`, not thrown/rendered inline.

### Other conventions

- `app/.well-known/[...slug]/route.ts` catches all `/.well-known/*` requests and returns a bare 404, to stop the proxy/framework from applying locale-redirect logic to well-known probes.
- Path alias `@/*` maps to the repo root (`tsconfig.json`).
- Persian is the primary/default locale and default calendar is Jalali (`date-fns-jalali`) — keep RTL and Jalali-date handling in mind when touching date or direction-sensitive UI (see `hooks/useLocaleDateFns.ts`, `utils/getLocaleDateFns.ts`).
