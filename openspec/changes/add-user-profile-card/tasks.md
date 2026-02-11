## 1. Scaffold

- [x] 1.1 Create `src/components/UserProfileCard.tsx` component file (default export reads from `useAuth()`, named export accepts `user` prop).
- [x] 1.2 Add example page `src/app/(examples)/profile-card/page.tsx` that centers the card for QA.

## 2. Implementation

- [x] 2.1 Implement `UserProfileCard` UI: avatar, display name, username, and a sign-out button using `signOut()` from Auth context.
- [x] 2.2 Implement pure `UserProfileCard` variant that accepts a `user` prop for testing.
- [x] 2.3 Add defensive handling for missing fields (placeholder avatar, fallback names).

## 3. Tests

- [x] 3.1 Add `src/components/UserProfileCard.test.tsx` with Vitest + testing-library: render pure variant with mocked user and assert avatar, name, username.
- [x] 3.2 Add test for unauthenticated fallback (renders login trigger).
- [x] 3.3 Add test for missing avatar placeholder.

## 4. Docs & Examples

- [ ] 4.1 Update README / component index with usage example and brief API notes.
- [ ] 4.2 Include reference to `openspec/changes/add-user-profile-card/profile-summary-mockup.html` in docs.

## 5. QA & Merge

- [ ] 5.1 Run unit tests and fix failures.
- [ ] 5.2 Visual QA: confirm centered layout matches mockup in desktop view.
- [ ] 5.3 Create PR, tag reviewer, and merge.
