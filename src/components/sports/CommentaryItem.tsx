import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing, tabularNums } from '../../tokens';

export interface CommentaryItemProps {
  minute: string;
  text: string;
  /** Highlights key moments (goals, cards) with a red minute badge instead of neutral. */
  emphasized?: boolean;
}

/** Single row of a live text-commentary feed. */
export function CommentaryItem({ minute, text, emphasized = false }: CommentaryItemProps) {
  return (
    <View style={styles.row}>
      <View style={[styles.minuteBadge, emphasized && styles.minuteBadgeEmphasized]}>
        <Text style={[styles.minuteText, tabularNums, emphasized && styles.minuteTextEmphasized]}>{minute}</Text>
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  minuteBadge: {
    width: 40,
    height: 22,
    borderRadius: 4,
    backgroundColor: colors.surface.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minuteBadgeEmphasized: {
    backgroundColor: colors.brand.primary,
  },
  minuteText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.text.secondary,
  },
  minuteTextEmphasized: {
    color: colors.brand.onPrimary,
  },
  text: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.text.primary,
  },
});
