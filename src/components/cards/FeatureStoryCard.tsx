import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing } from '../../tokens';
import { GradientImage } from '../media/GradientImage';
import { Card } from './Card';

export interface FeatureStoryCardProps {
  headline: string;
  category: string;
  timestamp: string;
  image: ImageSourcePropType;
  onPress?: () => void;
}

/**
 * Large editorial feature — full-bleed photography with headline overlaid on
 * a gradient scrim. Text-only, no CTA (see HeroCard for the promo variant
 * with an action button).
 */
export function FeatureStoryCard({ headline, category, timestamp, image, onPress }: FeatureStoryCardProps) {
  return (
    <Card onPress={onPress} padding="none" bordered={false} radius="lg" accessibilityLabel={headline}>
      <GradientImage source={image} aspectRatio={4 / 5}>
        <View style={styles.textBlock}>
          <Text style={styles.category}>{category.toUpperCase()}</Text>
          <Text style={styles.headline} numberOfLines={3}>
            {headline}
          </Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
      </GradientImage>
    </Card>
  );
}

const styles = StyleSheet.create({
  textBlock: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    gap: 4,
  },
  category: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    letterSpacing: 0.8,
    color: colors.text.inverse,
  },
  headline: {
    fontFamily: fontFamily.extraBold,
    fontSize: 22,
    lineHeight: 27,
    color: colors.text.inverse,
  },
  timestamp: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.text.inverseMuted,
    marginTop: 2,
  },
});
