import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, componentHeights, fontFamily } from '../../tokens';
import { Icon, IconName } from '../icons';

export interface BottomNavItem {
  key: string;
  label: string;
  icon: IconName;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  activeKey: string;
  onSelect: (key: string) => void;
}

/**
 * Minimal utility bar — simple line icons, no floating pill, no oversized
 * touch targets. Active state is a color + weight change only, never a
 * background fill behind the icon.
 */
export function BottomNav({ items, activeKey, onSelect }: BottomNavProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { height: componentHeights.bottomNav + insets.bottom, paddingBottom: insets.bottom }]}>
      {items.map((item) => {
        const active = item.key === activeKey;
        const color = active ? colors.text.primary : colors.text.muted;
        return (
          <Pressable
            key={item.key}
            onPress={() => onSelect(item.key)}
            style={styles.item}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={item.label}
          >
            <Icon name={item.icon} size="md" color={color} strokeWidth={active ? 2.4 : 2} />
            <Text style={[styles.label, { color, fontFamily: active ? fontFamily.bold : fontFamily.medium }]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.background.elevated,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingTop: 8,
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.2,
  },
});
