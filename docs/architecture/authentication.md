# Authentication

Auth lives in the `app/[lang]/(auth)/` route group and follows the standard [feature module structure](./overview.md#feature-module-structure): `services/authApiActions.ts` (axios calls), `hooks/useAuth.ts` (TanStack Query wrappers), `schemas/authSchemas.ts` (Zod factories), plus route-specific `sign-in/components/` and `signup/components/`.

## Session model

There is no client-held token. `app/utils/defaultAxios.ts` creates the shared axios instance with `withCredentials: true`, so the session is an httpOnly cookie set by the API on sign-in/signup and cleared on logout — the frontend never reads or attaches it manually.

**There is no route guard.** `proxy.ts` only handles locale redirects; it does not check auth state, and there's no client-side "is authenticated" gate on `(panel)` routes. Protection is reactive instead:

- `ProfileProvider` (mounted panel-wide in `(panel)/layout.tsx`) calls `useUsersInfo()` (`(panel)/users/hooks/useUsers.ts`), which fetches `GET /users/info`.
- If that query errors — e.g. a 401 because there's no valid session — `useUsersInfo`'s `useEffect` calls `logout()` from `(panel)/hooks/useLogout.ts`.
- That hook is a thin wrapper around `useLogout` in `(auth)/hooks/useAuth.ts`, which `POST`s `/auth/logout`, then on success `router.push`es to `/${locale}/sign-in` and calls `useClearQueries()` to drop all TanStack Query cache.

So an unauthenticated visit to a panel route isn't blocked up front — it renders until the first protected query fails, then bounces to sign-in. Keep this in mind when adding new panel-level data fetching: a 401 anywhere upstream of `ProfileProvider`'s children will eventually trigger this same redirect, not a dedicated auth error boundary.

## API surface (`authApiActions.ts`)

Base path `/auth`, all via the shared axios instance:

| Function | Endpoint | Used by |
|---|---|---|
| `singIn` | `POST /auth/sign-in` | `useSignIn` |
| `signup` | `POST /auth/sign-up` | `useSignup` |
| `logout` | `POST /auth/logout` | `useLogout` |
| `emailAvailability` | `GET /auth/email-availability` | `useEmailAvailability` |
| `usernameAvailability` | `GET /auth/username-availability` | `useUsernameAvailability` |

The two availability endpoints are cancellable GETs (`{ signal }`) and are the only auth queries — sign-in/signup/logout are mutations, so nothing here is cached beyond the availability checks.

## Sign-in (`(auth)/sign-in/`)

`SignInWrapper` renders `SignInWithPassword` (username/password fields via `Field`/`InputGroup`, react-hook-form + `createSignInWithPasswordSchema` from `authSchemas.ts`), `SignInOptions`, and `SignUpNow`. On submit, `useSignIn({ dic })` posts credentials; a `401` response shows a localized toast (`dic.signIn.withPassword.wrongSignInCredentials`) via the mutation's `onError`, and success does `router.push(`/${locale}`)`.

## Sign-up (`(auth)/signup/`)

A three-step wizard driven by local component state in `SignupWrapper`, not the URL. Steps are declared once in `signup/utils/signupSteps.ts`:

```ts
export const signupSteps = ["userInfo", "organizationInfo", "confirmInfo"] as const;
```

- **`userInfo`** — `SignupUserInfo`, its own `useForm` (`createUserInfoSchema`) provided via `FormProvider`.
- **`organizationInfo`** — `SignupOrganizationInfo`, a separate `useForm` (`createOrganizationInfo`).
- **`confirmInfo`** — `SignupConfirm`, a read-only review of both collected objects (only rendered once both are non-null).

`SignupWrapper` holds the two step payloads in `useState<UserInfoSchema | null>` / `useState<OrganizationInfoSchema | null>`, filling them in as each step's form is submitted and advancing `activeStep`. The final step assembles both into the `SignUpProps` shape expected by `signup()` (`{ user, organization }`) and calls `useSignup`, then `router.replace(`/${locale}`)` on success.

### Real-time duplicate username/email check

While filling in `userInfo`, `SignupWrapper` watches `username`/`email` (`userInfoUseForm.watch(...)`), debounces each with `useDebouncedValue` (`@tanstack/react-pacer`, 500ms), and feeds the debounced values into `useEmailAvailability`/`useUsernameAvailability`. Each query is `enabled` only once the corresponding Zod field schema parses successfully on its own (`userInfoSchema.shape.email.safeParse(dbEmail).success`), so no request fires for an obviously-invalid value. `SignupUserInfo` shows a spinner while fetching and a check icon (`FaCheck`) once a value is confirmed available.

Advancing from `userInfo` to `organizationInfo` is blocked — even if RHF validation otherwise passes — unless both availability queries have resolved successfully as available; if either reports taken, the wizard focuses that field and shows a duplicate-value toast instead of advancing. This means availability is enforced client-side at the step transition, on top of whatever the `POST /auth/sign-up` endpoint itself enforces server-side.

## Schemas (`authSchemas.ts`, `signup/schemas/signupSchemas.ts`)

Both follow the project convention of factory functions taking `{ dic }` for localized messages:

- `createSignInWithPasswordSchema({ dic })` — `username`/`password`, both `min(3)`.
- `createUserInfoSchema({ dic })` — `username`, `firstName`, `lastName`, `email` (`z.email()`), `phoneNumber`, `password`, `confirmPassword`, with a `.refine` cross-check that `confirmPassword === password`.
- `createOrganizationInfo({ dic })` — `name` (`min(3)`), `description`.

## Layout & i18n

`(auth)/layout.tsx` is the shared two-column card shell (form on one side, a placeholder image on the other via `Card`/`CardContent`) wrapping both `sign-in` and `signup` pages, and sets page metadata from the `auth` dictionary. All auth copy comes from `AuthDictionary` (`internalization/app/dictionaries/auth/`), fetched once in the root layout and delivered through `ShareDictionaryProvider` — components take `dic: AuthDictionary` as a prop rather than fetching it themselves.

## Logout entry point

`(panel)/hooks/useLogout.ts` re-exposes `(auth)/hooks/useAuth.ts`'s `useLogout` mutation as `{ logout, isPending }` for panel UI. It's wired into the settings modal's confirm-logout flow (`[workspace]/services/settings/SettingsProvider.tsx`, `showConfirmLogout` state) as well as the reactive redirect in `useUsersInfo` described above — both paths go through the same mutation, so a logout always clears query cache and lands on `/${locale}/sign-in`.
