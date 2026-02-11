## Why

Users need a clear, consistent UI to see who is currently signed in. The app lacks a dedicated, styled component that surfaces the connected user's GitHub profile data from the existing Supabase auth context. Adding a centered user profile card improves discoverability of the logged-in identity and supports faster debugging and UX continuity when working with GitHub-backed accounts.

## What Changes

- Add a presentational `UserProfileCard` React component (TSX + Tailwind) that reads user info from the existing Auth context and renders avatar, display name, and username.\
- Add a small wrapper view to place the card centered on the page for demo and QA.\
- Add lightweight unit/interaction tests (Vitest) for component rendering using the existing mock Auth context.\
- Update documentation and an example page to show how to include the card.

## Capabilities

### New Capabilities
- `user-profile-card`: A reusable UI component that displays the connected user's avatar, name, username, and a logout/login action hook. Designed for use anywhere the app needs to show the signed-in identity.
- use the mockup in the file `profile-summary-mockup.html` as a reference for implementation

### Modified Capabilities
- (none) — no spec-level requirement changes; this is an additive UI feature.

## Impact

- Files to add: `src/components/UserProfileCard.tsx`, `src/components/UserProfileCard.test.tsx`, and an example page `src/app/(examples)/profile-card/page.tsx` (or similar location).\
- Files to read/use: existing `src/components/Login.tsx` and the Auth context at `src/context/AuthProvider.tsx` for implementation patterns and data shapes.\
- Dependencies: no new runtime dependencies; use existing Tailwind utility classes and testing utilities already in the repo.\
- Systems: purely client-side UI; no backend, API, or database schema changes required.

## Non-goals

- Do not modify authentication flows or provider configuration (no Supabase or GitHub OAuth changes).\
- Do not implement server-side user fetching beyond what the Auth context already provides.\
- Do not internationalize or theme beyond existing Tailwind tokens — keep styling minimal and consistent.

## Acceptance criteria

- `UserProfileCard` renders when supplied with the existing Auth context and shows avatar, name, and username.\
- Example page demonstrates the centered card layout.\
- Tests cover rendering with a mocked authenticated user.
