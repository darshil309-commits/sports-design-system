import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, radius, spacing } from '../../tokens';
import { Card } from './Card';

export interface NewsCardProps {
  headline: string;
  category: string;
  timestamp: string;
  thumbnail?: ImageSourcePropType;
  onPress?: () => void;
}

/** Compact list row for news feeds — thumbnail left, text right. */
export function NewsCard({ headline, category, timestamp, thumbnail, onPress }: NewsCardProps) {
  return (
    <Card onPress={onPress} accessibilityLabel={headline}>
      <View style={styles.row}>
        <View style={styles.thumbWrap}>
          {thumbnail ? (
            <Image source={thumbnail} style={styles.thumb} resizeMode="cover" />
          ) : (
            <View style={[styles.thumb, styles.thumbFallback]} />
          )}
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.category}>{category.toUpperCase()}</Text>
          <Text style={styles.headline} numberOfLines={2}>
            {headline}
          </Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  thumbWrap: {
    width: 84,
    height: 84,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  thumbFallback: {
    backgroundColor: colors.surface.subtle,
  },
  textBlock: {
    flex: 1,
    justifyContent: 'center',
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
    fontSize: 15,
    lineHeight: 20,
    color: colors.text.primary,
  },
  timestamp: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.text.muted,
  },
});
