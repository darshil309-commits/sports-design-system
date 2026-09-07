import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing } from '../../tokens';
import { Card } from './Card';

export interface ArticleCardProps {
  headline: string;
  category: string;
  timestamp: string;
  image?: ImageSourcePropType;
  onPress?: () => void;
}

/** Grid-friendly editorial card — image on top, text below. Pairs well two-up. */
export function ArticleCard({ headline, category, timestamp, image, onPress }: ArticleCardProps) {
  return (
    <Card onPress={onPress} padding="none" accessibilityLabel={headline}>
      <View style={styles.imageWrap}>
        {image ? (
          <Image source={image} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.imageFallback]} />
        )}
      </View>
      <View style={styles.body}>
        <Text style={styles.category}>{category.toUpperCase()}</Text>
        <Text style={styles.headline} numberOfLines={3}>
          {headline}
        </Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  imageWrap: {
    width: '100%',
    aspectRatio: 16 / 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageFallback: {
    backgroundColor: colors.surface.subtle,
  },
  body: {
    padding: spacing.md,
    gap: 4,
  },
  category: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    letterSpacing: 0.8,
    color: colors.brand.primary,
  },
  headline: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.text.primary,
  },
  timestamp: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 2,
  },
});
