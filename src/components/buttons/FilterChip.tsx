import React from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { borders, colors, componentHeights, fontFamily, radius, spacing } from '../../tokens';
import { usePressScale } from '../shared/usePressScale';

export interface FilterChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  testID?: string;
}

/**
 * Interactive selectable chip for filter/sport-selector bars (Football,
 * Cricket, Tennis). Deliberately sharp-cornered — not the rounded "pill
 * filter" pattern common in fintech/social apps.
 */
export function FilterChip({ label, selected = false, onPress, testID }: FilterChipProps) {
  const { scale, onPressIn, onPressOut } = usePressScale(0.96);
  const [focused, setFocused] = React.useState(false);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        testID={testID}
        accessibilityRole="button"
        accessibilityState={{ selected }}
        accessibilityLabel={label}
        style={() => [
          styles.base,
          {
            backgroundColor: selected ? colors.text.primary : colors.surface.default,
            borderColor: focused ? colors.brand.primary : selected ? colors.text.primary : colors.border.subtle,
            borderWidth: borders.thin,
          },
        ]}
      >
        <Text
          style={[styles.label, { color: selected ? colors.text.inverse : colors.text.secondary }]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    height: componentHeights.chip,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
  },
});
