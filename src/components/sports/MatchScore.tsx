import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing, tabularNums, typography } from '../../tokens';

export interface MatchScoreProps {
  homeScore: number | string;
  awayScore: number | string;
  size?: 'md' | 'lg';
  /** Dims the score slightly for a not-yet-started fixture showing a placeholder "–". */
  muted?: boolean;
}

/**
 * The oversized "2 — 1" score treatment used everywhere a result appears.
 * Numbers are the dominant visual element by design — see typography.numerical*.
 */
export function MatchScore({ homeScore, awayScore, size = 'md', muted = false }: MatchScoreProps) {
  const scoreStyle = size === 'lg' ? typography.numericalLarge : typography.numerical;
  const color = muted ? colors.text.muted : colors.text.primary;

  return (
    <View style={styles.row}>
      <Text style={[scoreStyle, tabularNums, { color }]}>{homeScore}</Text>
      <Text style={[styles.separator, { fontSize: scoreStyle.fontSize * 0.55 }]}>—</Text>
      <Text style={[scoreStyle, tabularNums, { color }]}>{awayScore}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  separator: {
    fontFamily: fontFamily.bold,
    color: colors.text.muted,
  },
});
