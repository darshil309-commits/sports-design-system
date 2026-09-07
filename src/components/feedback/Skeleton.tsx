import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';
import { colors, opacity, radius, RadiusKey } from '../../tokens';

export interface SkeletonProps {
  width: number | `${number}%`;
  height: number;
  radius?: RadiusKey;
  style?: StyleProp<ViewStyle>;
}

/** Loading placeholder block with a slow opacity pulse — pair several to sketch a card's layout while content loads. */
export function Skeleton({ width, height, radius: radiusKey = 'sm', style }: SkeletonProps) {
  const pulse = useRef(new Animated.Value(opacity.skeletonPulseMax)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: opacity.skeletonPulseMin,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: opacity.skeletonPulseMax,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: radius[radiusKey],
          backgroundColor: colors.surface.subtle,
          opacity: pulse,
        },
        style,
      ]}
    />
  );
}
