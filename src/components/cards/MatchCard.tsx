import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing, tabularNums } from '../../tokens';
import { TeamLogo } from '../sports/TeamLogo';
import { MatchState, MatchStatus } from '../sports/MatchStatus';
import { TournamentBadge } from '../badges/TournamentBadge';
import { Card } from './Card';

export interface MatchCardTeam {
  name: string;
  logo?: ImageSourcePropType;
  score?: number;
}

export interface MatchCardProps {
  competition: string;
  state: MatchState;
  /** Minute for live, kickoff time for upcoming (e.g. "19:30"). */
  statusDetail?: string;
  home: MatchCardTeam;
  away: MatchCardTeam;
  onPress?: () => void;
  testID?: string;
}

/**
 * Compact scannable match summary for lists (fixtures, results feeds). For
 * the dramatic full-emphasis live treatment, use LiveMatchCard instead — this
 * component intentionally stays quiet so a feed of many matches doesn't fight
 * for attention against the one that's actually live.
 */
export function MatchCard({ competition, state, statusDetail, home, away, onPress, testID }: MatchCardProps) {
  const showScore = state === 'live' || state === 'ht' || state === 'ft';

  return (
    <Card onPress={onPress} testID={testID} accessibilityLabel={`${home.name} versus ${away.name}, ${competition}`}>
      <View style={styles.header}>
        <TournamentBadge name={competition} size="sm" />
        <MatchStatus state={state} detail={statusDetail} />
      </View>

      <View style={styles.teamRow}>
        <View style={styles.teamIdentity}>
          <TeamLogo teamName={home.name} source={home.logo} size="sm" />
          <Text style={styles.teamName} numberOfLines={1}>
            {home.name}
          </Text>
        </View>
        {showScore && (
          <Text style={[styles.score, tabularNums]}>{home.score ?? 0}</Text>
        )}
      </View>

      <View style={styles.teamRow}>
        <View style={styles.teamIdentity}>
          <TeamLogo teamName={away.name} source={away.logo} size="sm" />
          <Text style={styles.teamName} numberOfLines={1}>
            {away.name}
          </Text>
        </View>
        {showScore && (
          <Text style={[styles.score, tabularNums]}>{away.score ?? 0}</Text>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  teamIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flexShrink: 1,
  },
  teamName: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.text.primary,
    flexShrink: 1,
  },
  score: {
    fontFamily: fontFamily.extraBold,
    fontSize: 18,
    color: colors.text.primary,
  },
});
