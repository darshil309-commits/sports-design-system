import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing } from '../../tokens';
import { TeamLogo } from './TeamLogo';

export interface TeamRowProps {
  teamName: string;
  logo?: ImageSourcePropType;
  align?: 'left' | 'right';
  /** Bolds the name — use for the winning side once a result is final. */
  emphasized?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/** Team identity row (crest + name) shared by MatchCard, standings, and lineups. */
export function TeamRow({ teamName, logo, align = 'left', emphasized = false, size = 'md' }: TeamRowProps) {
  const reversed = align === 'right';
  return (
    <View style={[styles.row, reversed && styles.rowReversed]}>
      <TeamLogo teamName={teamName} source={logo} size={size} />
      <Text
        style={[
          styles.name,
          { fontFamily: emphasized ? fontFamily.bold : fontFamily.semiBold },
          reversed && styles.textRight,
        ]}
        numberOfLines={1}
      >
        {teamName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flexShrink: 1,
  },
  rowReversed: {
    flexDirection: 'row-reverse',
  },
  name: {
    fontSize: 14,
    color: colors.text.primary,
    flexShrink: 1,
  },
  textRight: {
    textAlign: 'right',
  },
});
