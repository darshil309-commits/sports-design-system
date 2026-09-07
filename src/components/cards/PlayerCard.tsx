import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing, tabularNums, typography } from '../../tokens';
import { Card } from './Card';

export interface PlayerCardProps {
  playerName: string;
  teamName: string;
  photo?: ImageSourcePropType;
  /** e.g. { value: 14, label: 'Goals' } */
  stat: { value: string | number; label: string };
  onPress?: () => void;
}

/** Portrait player photo (4:5, not circular) with identity and one headline stat. */
export function PlayerCard({ playerName, teamName, photo, stat, onPress }: PlayerCardProps) {
  return (
    <Card
      onPress={onPress}
      padding="none"
      accessibilityLabel={`${playerName}, ${teamName}, ${stat.label} ${stat.value}`}
    >
      <View style={styles.photoWrap}>
        {photo ? (
          <Image source={photo} style={styles.photo} resizeMode="cover" />
        ) : (
          <View style={[styles.photo, styles.photoFallback]}>
            <Text style={styles.monogram}>{initials(playerName)}</Text>
          </View>
        )}
      </View>
      <View style={styles.body}>
        <View style={styles.identity}>
          <Text style={styles.name} numberOfLines={1}>
            {playerName}
          </Text>
          <Text style={styles.team} numberOfLines={1}>
            {teamName}
          </Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={[typography.numerical, tabularNums, styles.statValue]}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      </View>
    </Card>
  );
}

function initials(name: string) {
  const words = name.trim().split(/\s+/);
  return words.length === 1 ? words[0].slice(0, 2).toUpperCase() : (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

const styles = StyleSheet.create({
  photoWrap: {
    width: '100%',
    aspectRatio: 4 / 5,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoFallback: {
    backgroundColor: colors.surface.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monogram: {
    fontFamily: fontFamily.extraBold,
    fontSize: 40,
    color: colors.text.muted,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: spacing.md,
    gap: spacing.xs,
  },
  identity: {
    flexShrink: 1,
    gap: 2,
  },
  name: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.text.primary,
  },
  team: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.text.muted,
  },
  statBlock: {
    alignItems: 'flex-end',
  },
  statValue: {
    color: colors.brand.primary,
  },
  statLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.text.muted,
  },
});
