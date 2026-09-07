import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing } from '../../tokens';
import { Button } from '../buttons/Button';
import { Icon, IconName } from '../icons';

export interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: string;
  ctaLabel?: string;
  onPressCta?: () => void;
}

/** Centered placeholder for empty lists/search results/errors. Minimal — an icon mark, not an illustration. */
export function EmptyState({ icon = 'info', title, description, ctaLabel, onPressCta }: EmptyStateProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconMark}>
        <Icon name={icon} size="xl" color={colors.text.muted} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {ctaLabel && onPressCta && (
        <View style={styles.ctaWrap}>
          <Button label={ctaLabel} variant="secondary" onPress={onPressCta} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  iconMark: {
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 17,
    color: colors.text.primary,
    textAlign: 'center',
  },
  description: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.text.muted,
    textAlign: 'center',
    marginTop: spacing.xxs,
  },
  ctaWrap: {
    marginTop: spacing.lg,
  },
});
