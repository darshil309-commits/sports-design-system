import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../tokens';
import { MatchEvent, MatchEventData } from './MatchEvent';

export interface MatchTimelineProps {
  events: MatchEventData[];
}

/** Vertical match-events feed with a continuous center line — home events left, away events right. */
export function MatchTimeline({ events }: MatchTimelineProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.centerLine} />
      {events.map((event) => (
        <MatchEvent key={event.id} {...event} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  centerLine: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: colors.border.subtle,
  },
});
