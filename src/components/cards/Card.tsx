import React from 'react';
import { Animated, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { borders, colors, radius as radiusToken, shadows, spacing } from '../../tokens';
import { usePressScale } from '../shared/usePressScale';

export type CardRadius = 'md' | 'lg';
export type CardPadding = keyof typeof spacing | 'none';

export interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  padding?: CardPadding;
  radius?: CardRadius;
  /** Subtle 1px border. Turn off only when the card already has strong internal contrast (e.g. full-bleed image cards). */
  bordered?: boolean;
  /** Adds shadows.subtle — reserve for cards that must separate from a busy/photo background, not the default. */
  elevated?: boolean;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

/**
 * Base structural card. Flat by default — most cards in this system need only
 * a 1px subtle border, not a shadow. Every card variant below (MatchCard,
 * NewsCard, etc.) is built on top of this rather than duplicating the
 * container styling.
 */
export function Card({
  children,
  onPress,
  padding = 'md',
  radius = 'md',
  bordered = true,
  elevated = false,
  backgroundColor = colors.surface.default,
  style,
  testID,
  accessibilityLabel,
}: CardProps) {
  const paddingValue = padding === 'none' ? 0 : spacing[padding];
  const containerStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor,
      borderRadius: radiusToken[radius],
      padding: paddingValue,
      borderWidth: bordered ? borders.thin : 0,
      borderColor: colors.border.subtle,
      overflow: 'hidden' as const,
    },
    elevated && shadows.subtle,
    style,
  ];

  if (!onPress) {
    return (
      <View style={containerStyle} testID={testID} accessibilityLabel={accessibilityLabel}>
        {children}
      </View>
    );
  }

  return <PressableCard onPress={onPress} containerStyle={containerStyle} testID={testID} accessibilityLabel={accessibilityLabel}>{children}</PressableCard>;
}

function PressableCard({
  onPress,
  containerStyle,
  children,
  testID,
  accessibilityLabel,
}: {
  onPress: () => void;
  containerStyle: StyleProp<ViewStyle>;
  children: React.ReactNode;
  testID?: string;
  accessibilityLabel?: string;
}) {
  const { scale, onPressIn, onPressOut } = usePressScale(0.985);
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [containerStyle, pressed && { backgroundColor: colors.surface.pressed }]}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
