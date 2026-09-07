import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily } from '../../tokens';

export interface AvatarProps {
  name: string;
  source?: ImageSourcePropType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const boxBySize = { sm: 28, md: 36, lg: 48, xl: 64 } as const;
const fontBySize = { sm: 11, md: 13, lg: 17, xl: 22 } as const;

/**
 * The system's one deliberately circular frame — a person avatar reads
 * unambiguously as a face/profile, unlike a button or card, so circularity
 * here doesn't fight the sharp-geometry rule.
 */
export function Avatar({ name, source, size = 'md' }: AvatarProps) {
  const box = boxBySize[size];
  return (
    <View style={[styles.frame, { width: box, height: box, borderRadius: box / 2 }]}>
      {source ? (
        <Image source={source} style={{ width: box, height: box, borderRadius: box / 2 }} resizeMode="cover" />
      ) : (
        <Text style={[styles.initials, { fontSize: fontBySize[size] }]}>{initials(name)}</Text>
      )}
    </View>
  );
}

function initials(name: string) {
  const words = name.trim().split(/\s+/);
  return words.length === 1 ? words[0].slice(0, 2).toUpperCase() : (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: colors.surface.subtle,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: {
    fontFamily: fontFamily.bold,
    color: colors.text.secondary,
  },
});
