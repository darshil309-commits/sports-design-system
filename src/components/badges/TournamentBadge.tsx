import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, radius, spacing } from '../../tokens';

export interface TournamentBadgeProps {
  name: string;
  /** Competition initials shown when no `emblem` image is supplied, e.g. "PL". */
  initials?: string;
  emblem?: ImageSourcePropType;
  size?: 'sm' | 'md';
}

const boxBySize = { sm: 20, md: 28 } as const;

/**
 * Competition identity mark — "PREMIER LEAGUE" above a match hero, a
 * standings table header. Pass `emblem` once real competition artwork
 * exists; falls back to a sharp-cornered initials mark.
 */
export function TournamentBadge({ name, initials, emblem, size = 'sm' }: TournamentBadgeProps) {
  const box = boxBySize[size];
  return (
    <View style={styles.row}>
      {emblem ? (
        <Image source={emblem} style={{ width: box, height: box, borderRadius: radius.sm }} resizeMode="contain" />
      ) : (
        <View style={[styles.mark, { width: box, height: box }]}>
          <Text style={styles.markText}>{(initials ?? name.slice(0, 2)).toUpperCase()}</Text>
        </View>
      )}
      <Text style={styles.name} numberOfLines={1}>
        {name.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  mark: {
    backgroundColor: colors.surface.inverse,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markText: {
    fontFamily: fontFamily.extraBold,
    fontSize: 10,
    color: colors.text.inverse,
  },
  name: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    letterSpacing: 0.6,
    color: colors.text.secondary,
  },
});
