# Cards

All cards are built on [`Card`](./Card.tsx) — a flat, 1px-bordered container
with `radius.md` (8px) by default. Shadows (`elevated`) are the exception, not
the rule: reserve them for cards that must separate from a busy/photo
background (LiveMatchCard) or float over another surface, never as a default
"card" look.

| Component | Shape | Use for |
|---|---|---|
| `MatchCard` | Compact list row | Fixtures/results feed — quiet by design |
| `LiveMatchCard` | Elevated, red accent edge, big score | The 1–2 genuinely live matches at the top of a feed |
| `StatCard` | Oversized number + label | Any standalone statistic module |
| `TeamCard` | Logo + name + next match | Followed-teams list |
| `PlayerCard` | 4:5 portrait photo + name/team + one stat | Player grids/profiles |
| `CompetitionCard` | Emblem + standings preview | Competition hub, "your leagues" |
| `NewsCard` | Thumbnail-left row | News/article list feeds |
| `ArticleCard` | Image-top grid tile | Two-up article grids |
| `FeatureStoryCard` | Full-bleed image, gradient text overlay, no CTA | One large editorial story |
| `HeroCard` | Full-bleed image, gradient overlay, headline + CTA | Campaign/promo modules (JOIN NOW, WATCH LIVE) |

## Why MatchCard and LiveMatchCard are separate components

The spec calls for live matches to feel dramatically different from routine
metadata. Baking a `variant="live"` into one MatchCard risked either watering
down the live treatment to fit the compact list row, or bloating every list
row toward the live layout. Two components keeps each one honest: MatchCard
stays quiet and scannable; LiveMatchCard is allowed to be loud.

## Composition

Cards reuse the [sports](../sports) primitives (`TeamLogo`, `TeamRow`,
`MatchScore`, `MatchStatus`) and [badges](../badges) (`TournamentBadge`,
`LiveIndicator`, `Badge`) rather than reimplementing team/score/status
rendering per card — keep that pattern when adding new card types.

## Tokens used

`colors.surface.*`, `colors.border.subtle`, `colors.overlay.heroGradient*`,
`radius.md/lg`, `borders.thin`, `shadows.subtle`, `spacing.*`,
`fontFamily.*`, `typography.numerical*`.
