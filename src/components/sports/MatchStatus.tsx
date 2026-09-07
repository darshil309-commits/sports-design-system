import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, fontFamily } from '../../tokens';
import { Badge } from '../badges/Badge';
import { LiveIndicator } from '../badges/LiveIndicator';

export type MatchState = 'upcoming' | 'live' | 'ht' | 'ft' | 'postponed' | 'cancelled';

export interface MatchStatusProps {
  state: MatchState;
  /** Minute for `live` (e.g. "67'"), kickoff time for `upcoming` (e.g. "19:30"). */
  detail?: string;
  animated?: boolean;
}

/**
 * Single source of truth for how each match state renders, so a MatchCard and
 * a MatchHeroPattern never disagree on what "FT" or "LIVE" looks like.
 */
export function MatchStatus({ state, detail, animated = true }: MatchStatusProps) {
  switch (state) {
    case 'live':
      return <LiveIndicator detail={detail} animated={animated} />;
    case 'ht':
      return <Badge label="HT" tone="warning" />;
    case 'ft':
      return <Badge label="FT" tone="neutral" />;
    case 'postponed':
      return <Badge label="Postponed" tone="warning" />;
    case 'cancelled':
      return <Badge label="Cancelled" tone="error" />;
    case 'upcoming':
    default:
      return <Text style={styles.kickoff}>{detail ?? 'Upcoming'}</Text>;
  }
}

const styles = StyleSheet.create({
  kickoff: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.text.secondary,
  },
});
