import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing, tabularNums } from '../../tokens';

export type MatchEventType = 'goal' | 'yellowCard' | 'redCard' | 'substitution' | 'var';

export interface MatchEventData {
  id: string;
  minute: string;
  type: MatchEventType;
  description: string;
  side: 'home' | 'away';
}

const markerColor: Record<MatchEventType, string> = {
  goal: colors.brand.primary,
  yellowCard: colors.status.warning,
  redCard: colors.status.error,
  substitution: colors.status.success,
  var: colors.text.muted,
};

const eventLabel: Record<MatchEventType, string> = {
  goal: 'GOAL',
  yellowCard: 'YELLOW CARD',
  redCard: 'RED CARD',
  substitution: 'SUB',
  var: 'VAR',
};

/** Single row within MatchTimeline — home events align left of the center line, away events align right. */
export function MatchEvent({ minute, type, description, side }: MatchEventData) {
  const content = (
    <View style={[styles.content, side === 'home' ? styles.contentEnd : styles.contentStart]}>
      <Text style={[styles.eventLabel, { color: markerColor[type] }]}>{eventLabel[type]}</Text>
      <Text style={[styles.description, side === 'home' ? styles.textRight : styles.textLeft]} numberOfLines={2}>
        {description}
      </Text>
    </View>
  );

  return (
    <View style={styles.row}>
      <View style={styles.side}>{side === 'home' && content}</View>
      <View style={styles.gutter}>
        <View style={[styles.dot, { backgroundColor: markerColor[type] }]} />
        <Text style={[styles.minute, tabularNums]}>{minute}</Text>
      </View>
      <View style={styles.side}>{side === 'away' && content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  side: {
    flex: 1,
  },
  gutter: {
    width: 56,
    alignItems: 'center',
    gap: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  minute: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.text.muted,
  },
  content: {
    gap: 1,
  },
  contentEnd: {
    alignItems: 'flex-end',
    paddingRight: spacing.sm,
  },
  contentStart: {
    alignItems: 'flex-start',
    paddingLeft: spacing.sm,
  },
  eventLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    letterSpacing: 0.6,
  },
  description: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.text.primary,
  },
  textRight: { textAlign: 'right' },
  textLeft: { textAlign: 'left' },
});
