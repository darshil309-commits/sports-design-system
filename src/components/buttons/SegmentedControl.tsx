import React, { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, motion, radius } from '../../tokens';

export interface SegmentedControlProps {
  segments: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  testID?: string;
}

/**
 * Tab-like control with a sliding solid indicator (Overview / Stats / Timeline
 * on a Match page). Equal-width segments — pass short, comparable labels.
 */
export function SegmentedControl({ segments, selectedIndex, onChange, testID }: SegmentedControlProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const translate = useRef(new Animated.Value(0)).current;
  const segmentWidth = containerWidth / Math.max(segments.length, 1);

  useEffect(() => {
    Animated.spring(translate, {
      toValue: selectedIndex * segmentWidth,
      ...motion.spring.standard,
      useNativeDriver: true,
    }).start();
  }, [selectedIndex, segmentWidth, translate]);

  const onLayout = (e: LayoutChangeEvent) => setContainerWidth(e.nativeEvent.layout.width);

  return (
    <View style={styles.container} onLayout={onLayout} testID={testID}>
      {containerWidth > 0 && (
        <Animated.View
          style={[
            styles.indicator,
            { width: segmentWidth, transform: [{ translateX: translate }] },
          ]}
        />
      )}
      {segments.map((segment, index) => {
        const selected = index === selectedIndex;
        return (
          <Pressable
            key={segment}
            onPress={() => onChange(index)}
            style={styles.segment}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={segment}
          >
            <Text style={[styles.label, { color: selected ? colors.text.inverse : colors.text.secondary }]}>
              {segment}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface.subtle,
    borderRadius: radius.sm,
    padding: 3,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: 3,
    bottom: 3,
    left: 0,
    backgroundColor: colors.text.primary,
    borderRadius: radius.sm - 2,
  },
  segment: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    letterSpacing: 0.2,
  },
});
