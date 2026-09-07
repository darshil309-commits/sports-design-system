import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing, tabularNums, typography } from '../../tokens';
import { Icon } from '../icons';
import { Card } from './Card';

export interface StatCardTrend {
  direction: 'up' | 'down' | 'neutral';
  label: string;
}

export interface StatCardProps {
  value: string | number;
  label: string;
  trend?: StatCardTrend;
  size?: 'md' | 'lg';
}

const trendColor: Record<StatCardTrend['direction'], string> = {
  up: colors.status.success,
  down: colors.status.error,
  neutral: colors.text.muted,
};
const trendIcon = { up: 'trendUp', down: 'trendDown', neutral: 'neutral' } as const;

/** Oversized-number stat module — the number is the headline, not the label. */
export function StatCard({ value, label, trend, size = 'md' }: StatCardProps) {
  const valueStyle = size === 'lg' ? typography.numericalLarge : typography.numerical;
  return (
    <Card padding="md">
      <Text style={[valueStyle, tabularNums, styles.value]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {trend && (
        <View style={styles.trendRow}>
          <Icon name={trendIcon[trend.direction]} size="sm" color={trendColor[trend.direction]} />
          <Text style={[styles.trendLabel, { color: trendColor[trend.direction] }]}>{trend.label}</Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  value: {
    color: colors.text.primary,
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.text.muted,
    marginTop: spacing.xxs,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.xs,
  },
  trendLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
  },
});
