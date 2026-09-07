# Buttons

Interactive controls. See [`Button.md`](./Button.md) for the primary CTA component.

## IconButton

Square icon-only control, three variants (`filled`, `outline`, `ghost`) and three
sizes (`sm` 32 / `md` 40 / `lg` 48). `selected` drives a filled-red toggled look —
use for a saved/following state on a heart icon, for example. Requires
`accessibilityLabel` since there's no visible text.

## Chip

Static label tag (competition name over a hero image, category on a news card).
Three tones: `default`, `inverse` (for use on dark/photo backgrounds), `brand`.
Not interactive — see FilterChip for the selectable equivalent.

## FilterChip

Interactive selectable chip for filter bars and sport selectors (Football /
Cricket / Tennis). Selected state fills solid near-black, not brand red — red
stays reserved for primary actions and live states, not persistent selection.

## Toggle

On/off switch. Deliberately a **rectangular sharp-radius track**, not the fully
rounded iOS pill switch — keeps the control consistent with the system's sharp
geometry. `accessibilityRole="switch"`.

## SegmentedControl

Tab-like control with a sliding solid black indicator (e.g. Overview / Stats /
Timeline on a Match page). Equal-width segments computed from container layout.

## Shared behavior

All pressable controls in this folder use [`usePressScale`](../shared/usePressScale.ts)
for a small, fast scale-down on press — the "physical" feedback described in the
system's motion principles. None use opacity-only feedback.

## Tokens used across this folder

`colors.brand.*`, `colors.text.*`, `colors.surface.*`, `colors.border.*`,
`radius.sm`, `borders.thin/medium`, `componentHeights.*`, `spacing.*`,
`fontFamily.semiBold/bold`, `motion.duration/spring`.
