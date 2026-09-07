# Design System Documentation

This is the reference index for the component library in `src/`. Each
component category also has its own `README.md` colocated with the code
(`src/components/<category>/README.md`) — this file covers the philosophy and
token architecture that ties them together; go to the category docs for
component-level API details.

## Design philosophy: sports energy + editorial clarity

This system is not Nike Run Club's rounded, colorful sport-app look. It is
**sharp, condensed, high-contrast, and editorial** — Nike Run Club is the
reference only for hierarchy, restraint, and energy, not for shape language.
Concretely, that means:

1. **Information first.** The most important number or state on a screen
   (a score, a LIVE tag, a headline) should be unmissable within a second.
2. **Sharp geometry.** Buttons and cards stay within a 0–12px radius family
   (`radius.none/sm/md/lg`). There is no pill-button token, and the two
   deliberate exceptions to "no circles" — `Avatar` and the play button in
   `VideoHighlightCard` — are documented as exceptions in their own READMEs,
   not treated as a loophole for the rest of the system.
3. **Red is a signal, not a decoration.** `colors.brand.primary` appears on
   primary CTAs, live state, and brand moments — never as a background fill
   for large surfaces. If you're reaching for brand red on something that
   isn't an action, a live indicator, or a highlight, use a neutral token
   instead.
4. **Minimal shadows.** Most cards use a 1px `colors.border.subtle` border and
   `shadows.none`. `shadows.elevated`/`overlay` are reserved for things that
   must visually separate from a busy background — the live-match card, the
   floating sheet in `MatchHeroPattern`, modals/sheets.
5. **One typeface, used as a design element.** Inter Tight across the whole
   system, with an oversized `numerical`/`numericalLarge` scale specifically
   for scores and stats — see `src/tokens/typography.ts`.

## Token architecture

All tokens live in `src/tokens/` and are re-exported from a single `tokens`
object (`src/tokens/index.ts`) as well as individually (`colors`, `spacing`,
etc.) — components import the individual named exports they need.

| File | Contents |
|---|---|
| `colors.ts` | Raw `palette` + semantic `colors` (brand/background/surface/text/border/status/form/overlay) |
| `typography.ts` | `fontFamily` (Inter Tight weights), `typography` scale, `tabularNums` helper |
| `spacing.ts` | 8pt-family scale, `xxs`(4) through `massive`(64) |
| `radius.ts` | `none/sm/md/lg/circle` — see the sharp-geometry rule above |
| `shadows.ts` | `none/subtle/elevated/overlay` |
| `borders.ts` | `thin/medium/strong` widths |
| `opacity.ts` | `disabled/pressed/overlayScrim/skeletonPulse*` |
| `iconSizes.ts` | `sm/md/lg/xl` icon sizes |
| `componentHeights.ts` | Fixed heights for buttons, inputs, nav bars, chips |
| `motion.ts` | `duration`, `easing` (bezier control points), `spring` configs |
| `breakpoints.ts` | `mobile/tablet/desktop` — for a future responsive pass; the system ships mobile-first |

**Never hardcode a color, spacing value, or radius inside a component.** If a
value you need doesn't exist yet in `src/tokens/`, add it there first.

## Component categories

| Category | Path | Covers |
|---|---|---|
| Buttons | `components/buttons/` | Button, IconButton, Chip, FilterChip, Toggle, SegmentedControl |
| Badges | `components/badges/` | Badge, LiveIndicator, TournamentBadge, FormIndicator |
| Cards | `components/cards/` | Card + 10 specialized cards (Match, LiveMatch, Stat, Team, Player, Competition, News, Article, FeatureStory, Hero) |
| Sports | `components/sports/` | TeamLogo, TeamRow, MatchScore, MatchStatus, Scoreboard, PlayerRow, PlayerStat, StatComparisonBar, LeagueTable, Countdown, MatchEvent/Timeline, CommentaryItem, Sport/CompetitionSelector |
| Navigation | `components/navigation/` | BottomNav, TopNav, Tabs, SearchBar, DateSelector |
| Inputs | `components/inputs/` | TextInput, Dropdown, Calendar |
| Media | `components/media/` | Avatar, GradientImage, VideoHighlightCard |
| Feedback | `components/feedback/` | Modal, BottomSheet, Toast, Banner, EmptyState, Skeleton, ProgressBar |
| Icons | `components/icons/` | Semantic `Icon` registry over `lucide-react-native` |
| Patterns | `src/patterns/` | `MatchHeroPattern` — the flagship immersive-hero + floating-sheet composition |

## Accessibility

- Every pressable exposes `accessibilityRole` and, where there's no visible
  label (icon-only buttons), a required `accessibilityLabel` prop.
- Interactive components expose `accessibilityState` for `disabled`,
  `selected`, `checked`, and `busy` as applicable.
- Minimum touch target is 44pt at default sizes (`Button` `md`/`lg`,
  `IconButton` `md`/`lg`) — the 32/36pt small sizes are for dense rows
  alongside other small controls, not lone tap targets.
- Status is never color-only: `LiveIndicator` pairs red with the text "LIVE",
  `Badge`/`FormIndicator` pair color with a label/letter, `MatchStatus` always
  renders text.
- Typography uses relative platform text sizing via React Native's default
  `Text` scaling — avoid wrapping `fontSize` tokens in a fixed-pixel override
  that would defeat Dynamic Type.

## Motion

Durations (`motion.duration.fast/standard/slow`) and a shared `usePressScale`
hook (`components/shared/usePressScale.ts`) keep interaction feedback
consistent: every pressable primitive scales down 3–8% on press rather than
just fading opacity. Live indicators and skeletons share the same pulse
timing (700ms in/out) so the system's two "breathing" motions feel related
rather than arbitrary.

## Consuming the library

```tsx
import { Button, MatchCard, LiveIndicator } from './src/components';
import { MatchHeroPattern } from './src/patterns';
import { tokens } from './src/tokens';
import { useDesignSystemFonts } from './src/fonts';
```

Call `useDesignSystemFonts()` once at the app root and gate rendering on
`fontsLoaded` before mounting anything that uses the token typography styles
(see `App.tsx` in this repo for the reference implementation).
