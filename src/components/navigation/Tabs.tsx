import React, { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, motion, spacing } from '../../tokens';

export interface TabsProps {
  tabs: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

interface Layout {
  x: number;
  width: number;
}

/**
 * Underline-indicator tab row — the editorial counterpart to SegmentedControl's
 * filled pill. Use for scrollable/many-option category tabs (news sections);
 * use SegmentedControl for a small fixed set of equal-weight views.
 */
export function Tabs({ tabs, selectedIndex, onChange }: TabsProps) {
  const [layouts, setLayouts] = useState<Record<number, Layout>>({});
  const translate = useRef(new Animated.Value(0)).current;
  const width = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const layout = layouts[selectedIndex];
    if (!layout) return;
    Animated.parallel([
      Animated.spring(translate, { toValue: layout.x, ...motion.spring.standard, useNativeDriver: false }),
      Animated.spring(width, { toValue: layout.width, ...motion.spring.standard, useNativeDriver: false }),
    ]).start();
  }, [selectedIndex, layouts, translate, width]);

  return (
    <View style={styles.wrap}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {tabs.map((tab, index) => {
          const selected = index === selectedIndex;
          return (
            <Pressable
              key={tab}
              onPress={() => onChange(index)}
              onLayout={(e: LayoutChangeEvent) =>
                setLayouts((prev) => ({ ...prev, [index]: { x: e.nativeEvent.layout.x, width: e.nativeEvent.layout.width } }))
              }
              style={styles.tab}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              accessibilityLabel={tab}
            >
              <Text style={[styles.label, { color: selected ? colors.text.primary : colors.text.muted }]}>
                {tab}
              </Text>
            </Pressable>
          );
        })}
        {layouts[selectedIndex] && (
          <Animated.View style={[styles.indicator, { transform: [{ translateX: translate }], width }]} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
  },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  label: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: colors.brand.primary,
  },
});
