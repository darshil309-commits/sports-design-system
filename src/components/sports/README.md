# Sports

First-class components for representing sport data. These are the building
blocks other categories compose (Cards, patterns) — prefer reusing these over
re-implementing team/score/status rendering inline.

| Component | Purpose |
|---|---|
| `TeamLogo` | Square crest frame, initials fallback |
| `TeamRow` | Crest + name, horizontal, alignable left/right |
| `MatchScore` | Oversized "2 — 1" score treatment |
| `MatchStatus` | Single source of truth for live/HT/FT/upcoming/postponed/cancelled rendering |
| `Scoreboard` | Full match-hero scoreboard module (competition, crests, score, scorers) |
| `PlayerRow` | Lineup/roster row: number, photo, name/position, optional stat |
| `PlayerStat` | Bare number+label pair for stat grids |
| `StatComparisonBar` | "62% POSSESSION 38%" broadcast-style comparison bar |
| `LeagueTable` | Full standings table |
| `Countdown` | Live-updating D:H:M:S countdown to kickoff |
| `MatchEvent` / `MatchTimeline` | Goal/card/sub feed with a center timeline line |
| `CommentaryItem` | Single live-text-commentary row |
| `SportSelector` | Horizontal sport switcher (fixed set) |
| `CompetitionSelector` | Horizontal competition switcher with emblems (user-configurable set) |

## Color rule specific to this folder

`StatComparisonBar` always renders the **home** side in brand red and away in
near-black — red marks "the primary/left side of the comparison," not a
judgment about which team is better. `FormIndicator` (in badges) uses
`colors.form.*`, never brand red, so a loss is never confused with a live
state.

## Tokens used

`colors.brand.*`, `colors.status.*`, `colors.form.*`, `colors.text.*`,
`colors.border.*`, `radius.sm/md`, `spacing.*`, `fontFamily.*`,
`typography.numerical*`, `tabularNums` on every numeric value.
