import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, radius, spacing } from '../../tokens';
import { Icon } from '../icons';
import { Card } from '../cards/Card';

export interface VideoHighlightCardProps {
  title: string;
  thumbnail: ImageSourcePropType;
  /** e.g. "2:14" */
  duration: string;
  onPress?: () => void;
}

/** Video/highlight thumbnail — centered play affordance (the one other legitimate circular element) and a duration badge. */
export function VideoHighlightCard({ title, thumbnail, duration, onPress }: VideoHighlightCardProps) {
  return (
    <Card onPress={onPress} padding="none" accessibilityLabel={`Play video: ${title}, duration ${duration}`}>
      <View style={styles.mediaWrap}>
        <View style={[StyleSheet.absoluteFill, styles.thumbBg]} />
        <Icon name="video" size="lg" color={colors.text.muted} />
        <View style={styles.playButton}>
          <Icon name="play" size="md" color={colors.text.inverse} />
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{duration}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  mediaWrap: {
    width: '100%',
    aspectRatio: 16 / 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbBg: {
    backgroundColor: colors.surface.subtle,
  },
  playButton: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(11,11,13,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationBadge: {
    position: 'absolute',
    right: spacing.xs,
    bottom: spacing.xs,
    backgroundColor: 'rgba(11,11,13,0.75)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  durationText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.text.inverse,
  },
  body: {
    padding: spacing.md,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.text.primary,
  },
});
