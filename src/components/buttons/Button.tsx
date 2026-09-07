import React from 'react';
import {
  ActivityIndicator,
  Animated,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { borders, colors, componentHeights, fontFamily, opacity, radius, spacing } from '../../tokens';
import { Icon, IconName } from '../icons';
import { usePressScale } from '../shared/usePressScale';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /** Rendered uppercase regardless of casing passed in — matches the system's broadcast-graphic button style. */
  label: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  /** Trailing directional arrow — use for actions that move the user forward (VIEW MATCH, EXPLORE). */
  showArrow?: boolean;
  icon?: IconName;
  fullWidth?: boolean;
  testID?: string;
  accessibilityLabel?: string;
}

const heightBySize: Record<ButtonSize, number> = {
  sm: componentHeights.buttonSm,
  md: componentHeights.buttonMd,
  lg: componentHeights.buttonLg,
};

const fontSizeBySize: Record<ButtonSize, number> = { sm: 12, md: 14, lg: 15 };

const variantPalette: Record<
  ButtonVariant,
  { background: string; text: string; border: string; borderWidth: number }
> = {
  primary: {
    background: colors.brand.primary,
    text: colors.brand.onPrimary,
    border: 'transparent',
    borderWidth: 0,
  },
  secondary: {
    background: colors.surface.default,
    text: colors.text.primary,
    border: colors.border.strong,
    borderWidth: borders.medium,
  },
  tertiary: {
    background: 'transparent',
    text: colors.text.primary,
    border: 'transparent',
    borderWidth: 0,
  },
  destructive: {
    background: colors.surface.default,
    text: colors.status.error,
    border: colors.status.error,
    borderWidth: borders.medium,
  },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  showArrow = false,
  icon,
  fullWidth = false,
  testID,
  accessibilityLabel,
}: ButtonProps) {
  const { scale, onPressIn, onPressOut } = usePressScale(0.97);
  const [focused, setFocused] = React.useState(false);
  const isDisabled = disabled || loading;
  const palette = variantPalette[variant];
  const isInline = variant === 'tertiary';

  return (
    <Animated.View style={[fullWidth && styles.fullWidth, { transform: [{ scale }] }]}>
      <Pressable
        onPress={onPress}
        onPressIn={!isDisabled ? onPressIn : undefined}
        onPressOut={!isDisabled ? onPressOut : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={isDisabled}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        hitSlop={isInline ? 8 : undefined}
        style={({ pressed }) => [
          styles.base,
          !isInline && {
            height: heightBySize[size],
            paddingHorizontal: size === 'sm' ? spacing.sm : spacing.md,
          },
          {
            backgroundColor: palette.background,
            borderColor: focused ? colors.brand.primary : palette.border,
            borderWidth: focused && !isInline ? borders.medium : palette.borderWidth,
            borderRadius: isInline ? 0 : radius.sm,
            opacity: isDisabled ? opacity.disabled : pressed ? opacity.pressed : 1,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={palette.text} size="small" />
        ) : (
          <View style={styles.content}>
            {icon && <Icon name={icon} size="md" color={palette.text} />}
            <Text
              style={[
                styles.label,
                { color: palette.text, fontSize: fontSizeBySize[size] },
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>
            {showArrow && <Icon name="arrowRight" size="md" color={palette.text} />}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fullWidth: { width: '100%' },
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  label: {
    fontFamily: fontFamily.bold,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
});
