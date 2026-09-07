import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { spacing } from '../../src/tokens';
import { MatchHeroPattern } from '../../src/patterns/MatchHeroPattern';
import { StatComparisonBar } from '../../src/components/sports/StatComparisonBar';
import { MatchTimeline } from '../../src/components/sports/MatchTimeline';
import { PlayerRow } from '../../src/components/sports/PlayerRow';
import { matchEvents, players, scoreboardDetail, stadiumHero } from '../data/mockData';

const TABS = ['Overview', 'Stats', 'Timeline', 'Lineups'];

export function MatchCenterScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <MatchHeroPattern
      heroImage={stadiumHero}
      topNav={{
        onBack,
        actions: [{ icon: 'share', accessibilityLabel: 'Share match', onPress: () => Alert.alert('Share') }],
      }}
      scoreboard={scoreboardDetail}
      tabs={TABS}
      activeTabIndex={activeTab}
      onChangeTab={setActiveTab}
    >
      {activeTab === 0 && (
        <View style={styles.stack}>
          <StatComparisonBar label="Possession" homeValue={62} awayValue={38} homeDisplay="62%" awayDisplay="38%" />
          <StatComparisonBar label="Shots" homeValue={14} awayValue={8} />
          <StatComparisonBar label="On Target" homeValue={5} awayValue={3} />
        </View>
      )}
      {activeTab === 1 && (
        <View style={styles.stack}>
          <StatComparisonBar label="Possession" homeValue={62} awayValue={38} homeDisplay="62%" awayDisplay="38%" />
          <StatComparisonBar label="Shots" homeValue={14} awayValue={8} />
          <StatComparisonBar label="On Target" homeValue={5} awayValue={3} />
          <StatComparisonBar label="Corners" homeValue={7} awayValue={4} />
          <StatComparisonBar label="Fouls" homeValue={9} awayValue={12} />
        </View>
      )}
      {activeTab === 2 && <MatchTimeline events={matchEvents} />}
      {activeTab === 3 && (
        <View style={styles.stack}>
          {players.map((player, index) => (
            <PlayerRow
              key={index}
              name={player.playerName}
              position="Forward"
              shirtNumber={index + 7}
              photo={player.photo}
              stat={{ value: player.stat.value, label: player.stat.label }}
            />
          ))}
        </View>
      )}
    </MatchHeroPattern>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: spacing.md,
  },
});
