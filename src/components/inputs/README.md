# Inputs

## TextInput

Labeled field (`label` renders uppercase, small, muted). States: default
(grey border), focused (2px red border), error (2px red border + red helper
text replacing the normal helper), disabled (dimmed).

## Dropdown

Pressable field that opens a bottom-anchored option list in a `Modal`. Kept
intentionally simple (no search/multi-select) — build a richer picker on top
of this one if a screen needs it rather than growing this component's API
indefinitely.

## Calendar

Month-grid date picker. Selected day is a **sharp-cornered** filled square,
not a circular bubble — consistent with the system's shape language. Today
(when not selected) is marked by red text only.

## Tokens used

`colors.text.*`, `colors.brand.primary`, `colors.status.error`,
`colors.border.default`, `colors.surface.default`, `colors.overlay.scrim`,
`componentHeights.input`, `radius.sm/lg`, `spacing.*`, `fontFamily.*`.
