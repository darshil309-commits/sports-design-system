# Button

Primary interactive control. Sharp corners (`radius.sm` = 4px), uppercase bold
label, physical press-scale feedback — never a soft/pill shape.

## Variants

| Variant | Look | Use for |
|---|---|---|
| `primary` | Solid brand red, white label | The one main CTA per screen: WATCH LIVE, JOIN NOW |
| `secondary` | White fill, strong black border, black label | Equal-weight alternate action: VIEW MATCH |
| `tertiary` | No fill/border, inline text | Low-emphasis action, pair with `showArrow`: SEE ALL → |
| `destructive` | White fill, red border + label | Cancel/remove actions — never solid red (that's reserved for primary CTAs) |

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | Rendered uppercase automatically |
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'destructive'` | `'primary'` | |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Heights from `componentHeights.buttonSm/Md/Lg` |
| `icon` | `IconName` | — | Leading icon |
| `showArrow` | `boolean` | `false` | Trailing arrow — use for forward-moving actions |
| `loading` | `boolean` | `false` | Shows spinner, disables interaction |
| `disabled` | `boolean` | `false` | |
| `fullWidth` | `boolean` | `false` | |

## States

Default, pressed (scale 0.97 + opacity), focused (red focus ring border), disabled
(opacity.disabled), loading (spinner replaces label).

## Tokens used

`colors.brand.*`, `colors.status.error`, `colors.border.strong`, `colors.surface.default`,
`radius.sm`, `borders.medium`, `componentHeights.button*`, `spacing.xxs/sm/md`,
`fontFamily.bold`, `opacity.disabled/pressed`.

## Accessibility

- `accessibilityRole="button"`, `accessibilityState` reflects `disabled`/`busy`.
- Minimum touch target 44pt at `size="md"`/`"lg"`; `size="sm"` (36pt) should only be
  used alongside other `sm` controls in a dense row, not as a lone tap target.
- Do not rely on color alone — `destructive` also carries a border, not just red text.

## Usage

```tsx
<Button label="Watch Live" variant="primary" showArrow onPress={handleWatch} />
<Button label="View Match" variant="secondary" onPress={handleView} />
<Button label="See all" variant="tertiary" showArrow onPress={handleSeeAll} />
<Button label="Remove" variant="destructive" onPress={handleRemove} />
```
