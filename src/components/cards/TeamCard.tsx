import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing } from '../../tokens';
import { TeamLogo } from '../sports/TeamLogo';
import { Icon } from '../icons';
import { Card } from './Card';

export interface TeamCardProps {
  teamName: string;
  logo?: ImageSourcePropType;
  /** e.g. "Next: vs Chelsea · Sat 19:30" */
  nextMatchLabel: string;
  onPress?: () => void;
}

export function TeamCard({ teamName, logo, nextMatchLabel, onPress }: TeamCardProps) {
  return (
    <Card onPress={onPress} accessibilityLabel={`${teamName}. ${nextMatchLabel}`}>
      <View style={styles.row}>
        <TeamLogo teamName={teamName} source={logo} size="lg" />
        <View style={styles.textBlock}>
          <Text style={styles.name} numberOfLines={1}>
            {teamName}
          </Text>
          <Text style={styles.next} numberOfLines={1}>
            {nextMatchLabel}
          </Text>
        </View>
        {onPress && <Icon name="chevronRight" size="md" color={colors.text.muted} />}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.text.primary,
  },
  next: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.text.muted,
  },
});
