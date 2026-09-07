import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, tabularNums, typography } from '../../tokens';

export interface PlayerStatProps {
  value: string | number;
  label: string;
  size?: 'sm' | 'md';
}

/**
 * Bare (no card container) number+label pair for stat grids on a player
 * profile screen — e.g. a 3-up row of Goals / Assists / Rating. For a
 * standalone card module use StatCard instead.
 */
export function PlayerStat({ value, label, size = 'md' }: PlayerStatProps) {
  const valueStyle = size === 'md' ? typography.numerical : typography.h3;
  return (
    <View style={styles.wrap}>
      <Text style={[valueStyle, tabularNums, styles.value]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: 2,
  },
  value: {
    color: colors.text.primary,
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.text.muted,
  },
});
