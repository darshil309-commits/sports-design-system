import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, radius, spacing, tabularNums } from '../../tokens';

export interface PlayerRowProps {
  name: string;
  shirtNumber?: number;
  position?: string;
  photo?: ImageSourcePropType;
  /** e.g. { value: 7.4, label: 'Rating' } — shown right-aligned. */
  stat?: { value: string | number; label?: string };
  onPress?: () => void;
}

/** Lineup/roster list row — shirt number, small photo, name/position, optional trailing stat. */
export function PlayerRow({ name, shirtNumber, position, photo, stat, onPress }: PlayerRowProps) {
  const content = (
    <>
      {shirtNumber != null && <Text style={[styles.number, tabularNums]}>{shirtNumber}</Text>}
      <View style={styles.photoWrap}>
        {photo ? (
          <Image source={photo} style={styles.photo} resizeMode="cover" />
        ) : (
          <View style={[styles.photo, styles.photoFallback]} />
        )}
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        {position && <Text style={styles.position}>{position}</Text>}
      </View>
      {stat && (
        <View style={styles.statBlock}>
          <Text style={[styles.statValue, tabularNums]}>{stat.value}</Text>
          {stat.label && <Text style={styles.statLabel}>{stat.label}</Text>}
        </View>
      )}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        style={styles.row}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${name}${position ? `, ${position}` : ''}`}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View style={styles.row} accessibilityLabel={`${name}${position ? `, ${position}` : ''}`}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  number: {
    width: 20,
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.text.muted,
    textAlign: 'center',
  },
  photoWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoFallback: {
    backgroundColor: colors.surface.subtle,
  },
  textBlock: {
    flex: 1,
    gap: 1,
  },
  name: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.text.primary,
  },
  position: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.text.muted,
  },
  statBlock: {
    alignItems: 'flex-end',
  },
  statValue: {
    fontFamily: fontFamily.extraBold,
    fontSize: 15,
    color: colors.text.primary,
  },
  statLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
});
