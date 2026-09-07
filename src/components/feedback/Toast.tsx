import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { colors, fontFamily, motion, radius, spacing } from '../../tokens';
import { Icon } from '../icons';

export type ToastTone = 'default' | 'success' | 'error';

export interface ToastProps {
  visible: boolean;
  message: string;
  tone?: ToastTone;
}

const toneIcon = { default: 'info', success: 'success', error: 'alert' } as const;
const toneColor = {
  default: colors.text.inverse,
  success: colors.status.success,
  error: colors.status.error,
};

/**
 * Transient message, controlled by the parent via `visible` (this component
 * only handles the enter/exit animation — position it absolutely near the
 * top or bottom of a screen and drive `visible` from a timeout in the
 * consuming screen/hook).
 */
export function Toast({ visible, message, tone = 'default' }: ToastProps) {
  const translateY = useRef(new Animated.Value(24)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: visible ? 0 : 24,
        duration: motion.duration.standard,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: motion.duration.standard,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, translateY, opacity]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.wrap, { transform: [{ translateY }], opacity }]}
    >
      <Icon name={toneIcon[tone]} size="sm" color={toneColor[tone]} />
      <Text style={styles.message} numberOfLines={2}>
        {message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface.inverse,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  message: {
    flex: 1,
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.text.inverse,
  },
});
