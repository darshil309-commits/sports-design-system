import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius } from '../../tokens';

export interface ProgressBarProps {
  /** 0-100 */
  progress: number;
  tone?: 'brand' | 'neutral';
}

export function ProgressBar({ progress, tone = 'brand' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, progress));
  return (
    <View
      style={styles.track}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clamped }}
    >
      <View
        style={[
          styles.fill,
          { width: `${clamped}%`, backgroundColor: tone === 'brand' ? colors.brand.primary : colors.text.primary },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 4,
    borderRadius: radius.sm - 3,
    backgroundColor: colors.surface.subtle,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
