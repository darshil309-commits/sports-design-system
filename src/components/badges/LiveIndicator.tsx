import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, opacity, spacing } from '../../tokens';

export interface LiveIndicatorProps {
  /** Match minute or clock, e.g. "67'" or "HT". Omit for a bare LIVE tag. */
  detail?: string;
  size?: 'sm' | 'lg';
  /** Set false in contexts with many simultaneous indicators (e.g. a long list) to avoid visual noise. */
  animated?: boolean;
}

/**
 * The system's single LIVE treatment: red dot + red uppercase "LIVE" text,
 * with a slow, subtle opacity pulse on the dot only — never on the text, and
 * never a bouncing/scaling animation. Reuse this everywhere a live state is
 * shown rather than composing ad hoc red dots.
 */
export function LiveIndicator({ detail, size = 'sm', animated = true }: LiveIndicatorProps) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!animated) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: opacity.skeletonPulseMin,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [animated, pulse]);

  const dotSize = size === 'lg' ? 8 : 6;
  const fontSize = size === 'lg' ? 14 : 11;

  return (
    <View style={styles.row}>
      <Animated.View
        style={[
          styles.dot,
          { width: dotSize, height: dotSize, borderRadius: dotSize / 2, opacity: pulse },
        ]}
      />
      <Text style={[styles.label, { fontSize }]}>{detail ? `LIVE ${detail}` : 'LIVE'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  dot: {
    backgroundColor: colors.status.live,
  },
  label: {
    fontFamily: fontFamily.bold,
    color: colors.status.live,
    letterSpacing: 0.6,
  },
});
