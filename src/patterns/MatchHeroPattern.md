# MatchHeroPattern

The system's flagship composed pattern. Structure straight from the spec:

```
IMMERSIVE HERO (full-bleed stadium photo + gradient + Scoreboard)
        ↓
FLOATING CONTENT SHEET (overlaps the hero, rounded top corners, shadows.elevated)
        ↓
TABS (SegmentedControl: Overview / Stats / Timeline / ...)
        ↓
MATCH INFORMATION (whatever the active tab renders — passed as children)
```

## Why the sheet overlaps instead of sitting flush below the hero

A flush edge between a dark photo hero and a white content area reads as two
separate screens stacked together. Giving the sheet a negative top margin and
rounded top corners (plus a lifted shadow) makes it read as one continuous
layered composition — a physical sheet of paper laid over the photo — which
is the effect the spec calls out explicitly ("do NOT create a hard split
between dark hero and white content").

## Props

| Prop | Type | Notes |
|---|---|---|
| `heroImage` | `ImageSourcePropType` | Stadium/atmosphere photography |
| `scoreboard` | `ScoreboardProps` | Rendered with `onDark` forced true |
| `topNav` | `Omit<TopNavProps, 'transparent'>` | Optional — back button + share/favorite icons over the hero |
| `tabs` / `activeTabIndex` / `onChangeTab` | — | Drives the SegmentedControl |
| `children` | `ReactNode` | Content for the currently active tab — the consuming screen decides what that is (StatComparisonBar rows for Overview, LeagueTable for Standings, MatchTimeline for Timeline, PlayerRow list for Lineups) |
| `heroHeight` | `number` | Default 380 |

## Usage

```tsx
<MatchHeroPattern
  heroImage={require('../assets/stadium.jpg')}
  topNav={{ onBack: goBack, actions: [{ icon: 'share', accessibilityLabel: 'Share', onPress: share }] }}
  scoreboard={{
    competition: 'Premier League',
    state: 'live',
    statusDetail: "67'",
    home: { name: 'Arsenal', score: 2, scorers: ["Saka 23'"] },
    away: { name: 'Chelsea', score: 1, scorers: ["Ødegaard 54'"] },
  }}
  tabs={['Overview', 'Stats', 'Timeline']}
  activeTabIndex={activeTab}
  onChangeTab={setActiveTab}
>
  {activeTab === 1 && (
    <>
      <StatComparisonBar label="Possession" homeValue={62} awayValue={38} homeDisplay="62%" awayDisplay="38%" />
      <StatComparisonBar label="Shots" homeValue={14} awayValue={8} />
    </>
  )}
</MatchHeroPattern>
```
