# Feedback

## Modal vs BottomSheet

`Modal` is a centered dialog for confirmations/short forms. `BottomSheet` is
anchored to the bottom for option lists, filters, and share actions. Pick
based on content shape, not habit — don't default to BottomSheet for
everything.

## Toast

Controlled by the parent via `visible` — this component only owns the
enter/exit animation. Position it absolutely (usually near the top or bottom
of a screen) and drive `visible` from a `setTimeout` in the screen or a small
hook. Deliberately no built-in imperative "toast manager" — build one on top
if a screen genuinely needs stacked/queued toasts.

## Banner

Inline, persistent (not auto-dismissing like Toast) — for a condition that
stays true until it changes (e.g. "Match postponed due to weather").

## EmptyState

Icon mark (not an illustration) + title + optional description + optional
secondary-variant CTA.

## Skeleton

Single placeholder block with a slow opacity pulse (matches LiveIndicator's
pulse timing so the two calm/pulsing rhythms in the system feel related).
Compose several to sketch a card's real layout rather than one big rectangle.

## ProgressBar

Thin (4px) determinate bar. `tone="brand"` for the default red fill,
`tone="neutral"` when red would be confusing next to a nearby live indicator.

## Tokens used

`colors.surface.*`, `colors.status.*`, `colors.overlay.scrim`,
`colors.border.default`, `radius.sm/lg`, `spacing.*`, `fontFamily.*`,
`motion.duration.standard`, `opacity.skeletonPulse*`.
