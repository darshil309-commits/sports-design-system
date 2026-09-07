# Badges

## Badge

Generic status label (`neutral` / `success` / `warning` / `error` / `brand` tones).
Use for match status text (HT, FT, POSTPONED, CANCELLED) and non-live statuses.

## LiveIndicator

The system's single LIVE treatment — red dot with a slow, subtle pulse (dot only,
never the text) plus uppercase red "LIVE" label, optionally with a minute/clock
(`detail="67'"`). Always use this component for live state rather than composing
an ad hoc dot elsewhere, so the pulse timing and red stay identical everywhere.
Set `animated={false}` in list contexts with many simultaneous live rows to avoid
overwhelming motion.

## TournamentBadge

Competition identity mark (name + emblem or initials fallback). Sharp-cornered
mark, uppercase competition name.

## FormIndicator

Row of W/L/D squares for recent match form. Colors come from `colors.form.*`
(win/draw/loss) — never brand red for a loss, to keep red meaning "live/action"
unambiguous, not "bad outcome."

## Tokens used

`colors.status.*`, `colors.form.*`, `colors.brand.*`, `colors.surface.*`,
`radius.sm`, `fontFamily.bold/extraBold/semiBold`, `spacing.xxs`.
