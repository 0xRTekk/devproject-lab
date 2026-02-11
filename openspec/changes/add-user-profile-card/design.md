## Context

The app uses TypeScript + Next.js (App router), Supabase for auth, and Tailwind CSS for styling. The Auth context at `src/context/AuthProvider.tsx` exposes the signed-in user's profile (avatar, name, username) and sign-out helper; `src/components/Login.tsx` contains example usage patterns. This change is a small, client-side UI feature intended for display and debugging, not for altering auth behavior.

## Goals / Non-Goals

**Goals:**
- Provide a reusable `UserProfileCard` component that reads from the existing Auth context and shows avatar, display name, and username.\
- Supply an example page that centers the card for QA and visual review.\
- Add Vitest unit tests that render the component with a mocked Auth context.

**Non-Goals:**
- No changes to authentication flows, provider setup, or server-side APIs.\
- No global theme or i18n changes.

## Decisions

- Component location: `src/components/UserProfileCard.tsx` — keeps components colocated with the existing `Login.tsx`.\
- Props vs context: Consume data from the Auth context directly (no new prop plumbing) to keep usage simple; also export a `UserProfileCard` variant that accepts explicit `user` props to aid testing and reuse.\
- Styling: Use Tailwind utility classes for layout (rounded avatar, name, username, subtle card shadow). Keep the component layout responsive and compact.
- Styling: Use the mockup file `profile-summary-mockup.html` available in the `add-user-profile-card` change directory to implement the UI

### Component API (proposal)
- `UserProfileCard` — default export; reads user from `useAuth()` hook. Renders: avatar image (next/image optional), display name (or fallback to name from provider), username (e.g., GitHub handle), and a small sign-out button that calls `signOut()` from context.\
- `UserProfileCard({ user })` — named export for a pure, testable component variant.

## Risks / Trade-offs

- Risk: Auth context shape may vary between environments (mock vs prod). → Mitigation: Add defensive checks and default placeholders; write tests for the mock shape used in `tests/supabaseClient.test.ts`.
- Trade-off: Reading context directly makes the component slightly more coupled to the app, but simplifies consumption in pages.

## Migration Plan

1. Add `src/components/UserProfileCard.tsx` and `src/components/UserProfileCard.test.tsx`.\
2. Add example page `src/app/(examples)/profile-card/page.tsx` that imports the component and demonstrates centered layout.\
3. Run tests and visual QA.\
4. Merge and optionally add a short note to README or components index.

## Open Questions

- Should the card include an email or profile link? (Prefer minimal surface for now.)
- Use `next/image` for avatar optimization or plain `img` for simplicity? (Recommend `img` unless performance needs arise.)
