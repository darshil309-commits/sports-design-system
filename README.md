# Sports Design System

A production-ready React Native + TypeScript design system for a global
sports entertainment app. Sharp, condensed, high-contrast, and editorial —
Nike Run Club is the reference for hierarchy and energy, not for shape
language. Red is a signal (actions, live state, brand moments), never a fill
color. See [`src/documentation/README.md`](src/documentation/README.md) for
the full design philosophy and token architecture.

## Quick start

```bash
npm install
npm run ios      # or npm run android / npm run web
```

The app boots into a small demo (`App.tsx` + `example/`) that assembles the
library into Home, Match Center, News, Standings, Following, and a
component-showcase "More" screen — open it to see everything in context
rather than in isolation.

## Repository structure

```
src/
  tokens/          Design tokens — colors, typography, spacing, radius,
                    shadows, borders, opacity, icon sizes, component heights,
                    motion, breakpoints. Single source of truth; components
                    never hardcode a value tokens already cover.
  fonts.ts          useDesignSystemFonts() — loads Inter Tight, call once at
                    the app root.
  components/
    buttons/        Button, IconButton, Chip, FilterChip, Toggle, SegmentedControl
    badges/         Badge, LiveIndicator, TournamentBadge, FormIndicator
    cards/           Card + 10 specialized cards (see its README)
    sports/          First-class sport primitives (Scoreboard, LeagueTable, ...)
    navigation/      BottomNav, TopNav, Tabs, SearchBar, DateSelector
    inputs/          TextInput, Dropdown, Calendar
    media/           Avatar, GradientImage, VideoHighlightCard
    feedback/        Modal, BottomSheet, Toast, Banner, EmptyState, Skeleton, ProgressBar
    icons/           Semantic Icon registry over lucide-react-native
    shared/          usePressScale — shared press-feedback animation hook
  patterns/
    MatchHeroPattern  The flagship immersive-hero + floating-sheet composition
  documentation/
    README.md         Design philosophy, token architecture, a11y, motion
example/
  screens/            Demo screens composed entirely from src/ (no bespoke UI)
  data/               Mock content for the demo only — never imported by src/
App.tsx               Demo app host: font loading + bottom-nav tab switching
```

Every component file is self-documenting via TSDoc comments on non-obvious
decisions; category-level `README.md` files alongside the code cover the
component API, states, and which tokens are used — see
[`src/components/buttons/README.md`](src/components/buttons/README.md) and
its siblings.

## Design tenets

- **Sharp geometry.** 0–12px radius family. No pill buttons. The only
  deliberate circles are `Avatar` (a face) and the play button in
  `VideoHighlightCard` (a universal convention) — both call this out
  explicitly in their own docs.
- **Minimal shadows.** Flat, 1px-bordered cards by default; elevation is
  reserved for things that must separate from a busy background.
- **One typeface.** Inter Tight everywhere, with an oversized numerical scale
  so scores and stats read as the headline, not metadata.
- **Live is dramatically different from routine.** `LiveMatchCard` and
  `LiveIndicator` exist specifically so a live match doesn't look like every
  other row in a feed.

## Scripts

```bash
npm run ios / android / web    # Expo dev client
npx tsc --noEmit                # Type-check the whole project
```

## License

See [LICENSE](LICENSE).
