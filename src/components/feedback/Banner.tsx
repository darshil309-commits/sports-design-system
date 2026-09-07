import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, radius, spacing } from '../../tokens';
import { Icon } from '../icons';
import { IconButton } from '../buttons/IconButton';

export type BannerTone = 'info' | 'success' | 'warning' | 'error';

export interface BannerProps {
  message: string;
  tone?: BannerTone;
  onDismiss?: () => void;
}

const tonePalette: Record<BannerTone, { background: string; text: string; icon: 'info' | 'success' | 'alert' }> = {
  info: { background: colors.surface.subtle, text: colors.text.primary, icon: 'info' },
  success: { background: colors.status.successMuted, text: colors.status.success, icon: 'success' },
  warning: { background: colors.status.warningMuted, text: colors.status.warning, icon: 'alert' },
  error: { background: colors.status.errorMuted, text: colors.status.error, icon: 'alert' },
};

/** Inline persistent message within a screen (e.g. "Match postponed due to weather"). Not a toast — stays until dismissed or the condition clears. */
export function Banner({ message, tone = 'info', onDismiss }: BannerProps) {
  const palette = tonePalette[tone];
  return (
    <View style={[styles.wrap, { backgroundColor: palette.background }]}>
      <Icon name={palette.icon} size="sm" color={palette.text} />
      <Text style={[styles.message, { color: palette.text }]}>{message}</Text>
      {onDismiss && (
        <IconButton icon="close" size="sm" variant="ghost" onPress={onDismiss} accessibilityLabel="Dismiss" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  message: {
    flex: 1,
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 18,
  },
});
