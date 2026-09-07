import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, radius } from '../../tokens';

export interface TeamLogoProps {
  teamName: string;
  source?: ImageSourcePropType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const boxBySize = { sm: 24, md: 32, lg: 48, xl: 72 } as const;
const fontBySize = { sm: 10, md: 12, lg: 16, xl: 22 } as const;

/**
 * Team badge frame — square with a small sharp radius (not circular), so it
 * reads as a shield/emblem rather than an avatar. Falls back to a two-letter
 * monogram on a flat grey field until real crest artwork is wired up.
 */
export function TeamLogo({ teamName, source, size = 'md' }: TeamLogoProps) {
  const box = boxBySize[size];
  return (
    <View
      style={[
        styles.frame,
        { width: box, height: box, borderRadius: box >= 48 ? radius.md : radius.sm },
      ]}
      accessibilityLabel={`${teamName} crest`}
    >
      {source ? (
        <Image source={source} style={{ width: box - 6, height: box - 6 }} resizeMode="contain" />
      ) : (
        <Text style={[styles.monogram, { fontSize: fontBySize[size] }]}>
          {initialsFor(teamName)}
        </Text>
      )}
    </View>
  );
}

function initialsFor(name: string) {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: colors.surface.subtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  monogram: {
    fontFamily: fontFamily.extraBold,
    color: colors.text.secondary,
  },
});
