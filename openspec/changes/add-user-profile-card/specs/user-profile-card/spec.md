## ADDED Requirements

### Requirement: Render connected user info
The system SHALL display the connected user's avatar, display name, and username in the `UserProfileCard` component when a user is authenticated via the existing Auth context.

#### Scenario: Authenticated user view
- **WHEN** the `UserProfileCard` is rendered and `useAuth()` provides a valid user object with `avatar_url`, `name`, and `username` fields
- **THEN** the component SHALL show the avatar image, the display name (or provider name fallback), and the username (handle)

### Requirement: Unauthenticated fallback
The system SHALL display a placeholder state when no authenticated user is present.

#### Scenario: Unauthenticated
- **WHEN** the `UserProfileCard` is rendered and `useAuth()` reports no user
- **THEN** the component SHALL render a concise call-to-action (e.g., "Not signed in") and a link or button to trigger the existing login flow (using the same handler used by `Login.tsx`)

### Requirement: Resilient missing fields
The component SHALL handle missing or partial profile data gracefully by showing placeholders.

#### Scenario: Missing avatar
- **WHEN** the user object lacks `avatar_url`
- **THEN** the component SHALL render a default avatar placeholder icon and still show available text fields

## Non-functional Requirements

### Requirement: Styling
The component SHALL use Tailwind CSS utility classes and match the mockup `mockup/profile-summary-mockup.html` in visual hierarchy (avatar left/center, name prominent, username muted).

#### Scenario: Visual parity
- **WHEN** the example page is viewed in a desktop browser
- **THEN** the card SHALL appear centered with spacing, rounded avatar, and readable typography consistent with the site styles

### Requirement: Testability
The component SHALL expose a pure variant that accepts a `user` prop for unit testing (no context required).

#### Scenario: Unit render
- **WHEN** tests render the pure variant with a mocked `user` object
- **THEN** assertions can verify that avatar `alt` text, name, and username appear in the DOM

## Acceptance Criteria (mapped to tests)
- Rendering with a mocked authenticated user shows avatar, name, and username.\
- Rendering with no user shows the unauthenticated fallback and a login trigger.\
- Missing avatar displays a placeholder.\
- Example page centers the card and matches visual expectations in the mockup.
