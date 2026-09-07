import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, radius, spacing, tabularNums } from '../../tokens';

export interface StatComparisonBarProps {
  label: string;
  /** 0-100. Home + away should sum to 100 for a percentage stat (e.g. possession); for count stats (shots, corners) pass the share each side represents. */
  homeValue: number;
  awayValue: number;
  /** Raw values to display as text — defaults to homeValue/awayValue if omitted (percentage stats). */
  homeDisplay?: string | number;
  awayDisplay?: string | number;
}

/**
 * Broadcast-graphic style stat comparison — "62% POSSESSION 38%" with a
 * proportional bar beneath. Home team's share always renders in brand red,
 * away team in near-black, so the red half of the bar is legible as "the team
 * you're following," not a permanent home/away rule.
 */
export function StatComparisonBar({ label, homeValue, awayValue, homeDisplay, awayDisplay }: StatComparisonBarProps) {
  const total = homeValue + awayValue || 1;
  const homeShare = homeValue / total;

  return (
    <View style={styles.wrap}>
      <View style={styles.valuesRow}>
        <Text style={[styles.value, tabularNums, styles.homeValue]}>{homeDisplay ?? homeValue}</Text>
        <Text style={styles.label}>{label.toUpperCase()}</Text>
        <Text style={[styles.value, tabularNums, styles.awayValue]}>{awayDisplay ?? awayValue}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.segment, { flex: homeShare, backgroundColor: colors.brand.primary }]} />
        <View style={[styles.segment, { flex: 1 - homeShare, backgroundColor: colors.text.primary }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.xxs,
  },
  valuesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontFamily: fontFamily.extraBold,
    fontSize: 16,
    minWidth: 36,
  },
  homeValue: {
    color: colors.brand.primary,
    textAlign: 'left',
  },
  awayValue: {
    color: colors.text.primary,
    textAlign: 'right',
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.6,
    color: colors.text.muted,
  },
  track: {
    flexDirection: 'row',
    height: 4,
    borderRadius: radius.sm - 3,
    overflow: 'hidden',
    backgroundColor: colors.surface.subtle,
  },
  segment: {
    height: '100%',
  },
});
