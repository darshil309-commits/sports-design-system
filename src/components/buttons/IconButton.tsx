import React from 'react';
import { Animated, GestureResponderEvent, Pressable, StyleSheet } from 'react-native';
import { borders, colors, opacity, radius } from '../../tokens';
import { Icon, IconName } from '../icons';
import { usePressScale } from '../shared/usePressScale';

export type IconButtonVariant = 'filled' | 'outline' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps {
  icon: IconName;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Toggled state — e.g. a saved/following heart icon button. */
  selected?: boolean;
  disabled?: boolean;
  /** Required since the control has no visible label. */
  accessibilityLabel: string;
  testID?: string;
}

const boxBySize: Record<IconButtonSize, number> = { sm: 32, md: 40, lg: 48 };

export function IconButton({
  icon,
  onPress,
  variant = 'ghost',
  size = 'md',
  selected = false,
  disabled = false,
  accessibilityLabel,
  testID,
}: IconButtonProps) {
  const { scale, onPressIn, onPressOut } = usePressScale(0.92);
  const box = boxBySize[size];

  const background = variant === 'filled' ? (selected ? colors.brand.primary : colors.surface.subtle) : 'transparent';
  const borderColor = variant === 'outline' ? colors.border.strong : 'transparent';
  const iconColor =
    variant === 'filled' && selected
      ? colors.brand.onPrimary
      : selected
        ? colors.brand.primary
        : colors.text.primary;

  const [focused, setFocused] = React.useState(false);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={!disabled ? onPressIn : undefined}
        onPressOut={!disabled ? onPressOut : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled, selected }}
        style={({ pressed }) => [
          styles.base,
          {
            width: box,
            height: box,
            backgroundColor: background,
            borderColor: focused ? colors.brand.primary : borderColor,
            borderWidth: variant === 'outline' || focused ? borders.medium : 0,
            borderRadius: radius.sm,
            opacity: disabled ? opacity.disabled : pressed ? opacity.pressed : 1,
          },
        ]}
      >
        <Icon name={icon} size="md" color={iconColor} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
