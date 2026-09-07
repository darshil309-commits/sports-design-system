import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing } from '../../tokens';
import { TeamLogo } from '../sports/TeamLogo';
import { MatchScore } from '../sports/MatchScore';
import { LiveIndicator } from '../badges/LiveIndicator';
import { TournamentBadge } from '../badges/TournamentBadge';
import { Card } from './Card';

export interface LiveMatchCardProps {
  competition: string;
  minute: string;
  home: { name: string; logo?: ImageSourcePropType; score: number };
  away: { name: string; logo?: ImageSourcePropType; score: number };
  onPress?: () => void;
  testID?: string;
}

/**
 * The system's flagship live-state card: a red accent edge, an animated
 * LiveIndicator, and the oversized MatchScore treatment. Use sparingly — one
 * or two of these at the top of a feed, with ordinary MatchCards below, so
 * "live" still reads as a genuinely different state rather than routine noise.
 */
export function LiveMatchCard({ competition, minute, home, away, onPress, testID }: LiveMatchCardProps) {
  return (
    <Card
      onPress={onPress}
      elevated
      style={styles.accentBorder}
      testID={testID}
      accessibilityLabel={`Live: ${home.name} ${home.score} ${away.name} ${away.score}, minute ${minute}`}
    >
      <View style={styles.header}>
        <TournamentBadge name={competition} size="sm" />
        <LiveIndicator detail={minute} />
      </View>

      <View style={styles.scoreRow}>
        <TeamBlock name={home.name} logo={home.logo} />
        <MatchScore homeScore={home.score} awayScore={away.score} size="lg" />
        <TeamBlock name={away.name} logo={away.logo} />
      </View>
    </Card>
  );
}

function TeamBlock({ name, logo }: { name: string; logo?: ImageSourcePropType }) {
  return (
    <View style={styles.teamBlock}>
      <TeamLogo teamName={name} source={logo} size="lg" />
      <Text style={styles.teamName} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  accentBorder: {
    borderLeftWidth: 3,
    borderLeftColor: colors.status.live,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xxs,
  },
  teamBlock: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xxs,
  },
  teamName: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.text.primary,
    textAlign: 'center',
  },
});
