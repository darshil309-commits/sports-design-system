import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing } from '../../tokens';
import { TeamLogo } from './TeamLogo';
import { MatchScore } from './MatchScore';
import { MatchState, MatchStatus } from './MatchStatus';
import { TournamentBadge } from '../badges/TournamentBadge';

export interface ScoreboardTeam {
  name: string;
  logo?: ImageSourcePropType;
  score?: number;
  /** e.g. ["Saka 23'", "Ødegaard 54'"] */
  scorers?: string[];
}

export interface ScoreboardProps {
  competition: string;
  state: MatchState;
  statusDetail?: string;
  home: ScoreboardTeam;
  away: ScoreboardTeam;
  /** True when placed over a photo hero — flips text to white. Defaults to true, this component's primary use case. */
  onDark?: boolean;
}

/**
 * The full scoreboard module for a match hero: competition + status, two
 * crests, the oversized score, and goal-scorer lines. This is what sits over
 * the stadium photography in MatchHeroPattern — see that component for the
 * surrounding gradient/floating-sheet structure.
 */
export function Scoreboard({ competition, state, statusDetail, home, away, onDark = true }: ScoreboardProps) {
  const showScore = state === 'live' || state === 'ht' || state === 'ft';
  const textColor = onDark ? colors.text.inverse : colors.text.primary;
  const mutedColor = onDark ? colors.text.inverseMuted : colors.text.muted;

  return (
    <View>
      <View style={styles.header}>
        <TournamentBadge name={competition} size="sm" />
        <MatchStatus state={state} detail={statusDetail} />
      </View>

      <View style={styles.body}>
        <TeamBlock team={home} textColor={textColor} />
        {showScore ? (
          <MatchScore homeScore={home.score ?? 0} awayScore={away.score ?? 0} size="lg" />
        ) : (
          <Text style={[styles.vs, { color: mutedColor }]}>VS</Text>
        )}
        <TeamBlock team={away} textColor={textColor} />
      </View>

      {(home.scorers?.length || away.scorers?.length) && (
        <View style={styles.scorersRow}>
          <View style={styles.scorersColumn}>
            {home.scorers?.map((s, i) => (
              <Text key={i} style={[styles.scorerLine, { color: mutedColor }]} numberOfLines={1}>
                {s}
              </Text>
            ))}
          </View>
          <View style={[styles.scorersColumn, styles.scorersColumnRight]}>
            {away.scorers?.map((s, i) => (
              <Text key={i} style={[styles.scorerLine, { color: mutedColor }]} numberOfLines={1}>
                {s}
              </Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

function TeamBlock({ team, textColor }: { team: ScoreboardTeam; textColor: string }) {
  return (
    <View style={styles.teamBlock}>
      <TeamLogo teamName={team.name} source={team.logo} size="lg" />
      <Text style={[styles.teamName, { color: textColor }]} numberOfLines={1}>
        {team.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamBlock: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xxs,
  },
  teamName: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    textAlign: 'center',
  },
  vs: {
    fontFamily: fontFamily.extraBold,
    fontSize: 20,
    marginHorizontal: spacing.md,
  },
  scorersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  scorersColumn: {
    flex: 1,
    gap: 2,
  },
  scorersColumnRight: {
    alignItems: 'flex-end',
  },
  scorerLine: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
  },
});
