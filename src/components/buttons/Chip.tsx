import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, radius, spacing } from '../../tokens';

export type ChipTone = 'default' | 'inverse' | 'brand';

export interface ChipProps {
  label: string;
  tone?: ChipTone;
}

const tonePalette: Record<ChipTone, { background: string; text: string; border: string }> = {
  default: { background: colors.surface.subtle, text: colors.text.secondary, border: colors.border.subtle },
  inverse: { background: 'rgba(255,255,255,0.16)', text: colors.text.inverse, border: colors.border.onDark },
  brand: { background: colors.brand.primaryMuted, text: colors.brand.primary, border: 'transparent' },
};

/**
 * Static label tag — competition name over a hero image, category on a news
 * card, a metadata pill. Not interactive; see FilterChip for the selectable
 * variant used in filter bars.
 */
export function Chip({ label, tone = 'default' }: ChipProps) {
  const palette = tonePalette[tone];
  return (
    <View
      style={[
        styles.base,
        { backgroundColor: palette.background, borderColor: palette.border },
      ]}
    >
      <Text style={[styles.label, { color: palette.text }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
