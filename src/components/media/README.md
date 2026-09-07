# Media

## Avatar

The system's one deliberately circular frame. A person's face reads
unambiguously as a profile photo regardless of shape, so circularity here
doesn't contradict the sharp-geometry rule the way a pill button would.

## GradientImage

Shared full-bleed image + bottom scrim gradient. `HeroCard`, `FeatureStoryCard`,
and `MatchHeroPattern` all build on this rather than each hand-rolling a
`LinearGradient` — keep using it for any new "text over photo" module so the
gradient stops stay identical everywhere.

## VideoHighlightCard

Video/highlight thumbnail with a centered circular play button (the other
legitimate circular affordance — it's a universal play-button convention, not
decoration) and a duration badge.

## Tokens used

`colors.surface.subtle`, `colors.text.*`, `colors.overlay.*`, `radius.sm`,
`spacing.*`, `fontFamily.bold`.
