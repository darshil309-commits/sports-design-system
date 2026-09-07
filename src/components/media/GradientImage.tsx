import React from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../tokens';

export interface GradientImageProps {
  source: ImageSourcePropType;
  /** Fraction of the image height where the gradient begins (0-1). Lower = more scrim coverage. */
  startAt?: number;
  aspectRatio?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Full-bleed image with a bottom scrim gradient for text-over-photo legibility
 * — the single implementation shared by HeroCard, FeatureStoryCard, and
 * MatchHeroPattern so the gradient stop values never drift apart.
 */
export function GradientImage({ source, startAt = 0.35, aspectRatio, style, children }: GradientImageProps) {
  return (
    <View style={[aspectRatio ? { aspectRatio } : styles.fill, style]}>
      <Image source={source} style={StyleSheet.absoluteFill} resizeMode="cover" />
      <LinearGradient
        colors={[colors.overlay.heroGradientStart, colors.overlay.heroGradientEnd]}
        locations={[startAt, 1]}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    width: '100%',
    height: '100%',
  },
});
