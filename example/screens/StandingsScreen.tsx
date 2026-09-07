import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../src/tokens';
import { TopNav } from '../../src/components/navigation/TopNav';
import { CompetitionSelector } from '../../src/components/sports/CompetitionSelector';
import { LeagueTable } from '../../src/components/sports/LeagueTable';
import { fullStandings } from '../data/mockData';

const COMPETITIONS = [
  { id: 'epl', label: 'Premier League' },
  { id: 'laliga', label: 'La Liga' },
  { id: 'seriea', label: 'Serie A' },
  { id: 'bundesliga', label: 'Bundesliga' },
];

export function StandingsScreen() {
  const [competition, setCompetition] = useState('epl');

  return (
    <View style={styles.root}>
      <TopNav title="Standings" />
      <View style={styles.selectorWrap}>
        <CompetitionSelector competitions={COMPETITIONS} selectedId={competition} onSelect={setCompetition} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <LeagueTable rows={fullStandings.map((r) => ({ ...r, highlighted: r.teamName === 'Arsenal' }))} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background.base,
  },
  selectorWrap: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
});
