# Navigation

## BottomNav

5-item utility bar (Home / Matches / News / Following / More). Active state is
a color + weight change on the icon and label only — never a floating pill or
background fill, per the system's "avoid oversized navigation elements" rule.

## TopNav

Header bar with optional back button and trailing icon actions. `transparent`
mode removes the background/border and flips text/icons to white for use over
a hero image (see MatchHeroPattern).

## Tabs

Underline-indicator tab row for scrollable category tabs (e.g. News sections).
Use `SegmentedControl` (in buttons) instead for a small fixed set of
equal-weight views like Overview/Stats/Timeline on a Match page — Tabs and
SegmentedControl are deliberately different visual languages so the two
navigation patterns stay distinguishable.

## SearchBar

Search field with a focus ring (brand red border) and a clear button that
only appears once there's text to clear.

## DateSelector

Horizontal date strip for a fixtures calendar. Today is labeled "TODAY"
instead of a weekday abbreviation.

## Tokens used

`colors.text.*`, `colors.brand.primary`, `colors.border.subtle`,
`colors.surface.*`, `componentHeights.bottomNav/topNav/input`, `radius.sm`,
`spacing.*`, `fontFamily.bold/semiBold/medium`.
