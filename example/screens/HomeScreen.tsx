import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing } from '../../src/tokens';
import { TopNav } from '../../src/components/navigation/TopNav';
import { SportSelector } from '../../src/components/sports/SportSelector';
import { HeroCard } from '../../src/components/cards/HeroCard';
import { LiveMatchCard } from '../../src/components/cards/LiveMatchCard';
import { MatchCard } from '../../src/components/cards/MatchCard';
import { FeatureStoryCard } from '../../src/components/cards/FeatureStoryCard';
import { NewsCard } from '../../src/components/cards/NewsCard';
import { PlayerCard } from '../../src/components/cards/PlayerCard';
import {
  featureStory,
  fixtures,
  heroPromo,
  liveMatch,
  newsFeed,
  players,
  sportOptions,
} from '../data/mockData';

export interface HomeScreenProps {
  onOpenLiveMatch: () => void;
}

export function HomeScreen({ onOpenLiveMatch }: HomeScreenProps) {
  const [sport, setSport] = useState('football');

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <TopNav
        title="Home"
        actions={[
          { icon: 'search', accessibilityLabel: 'Search', onPress: () => Alert.alert('Search') },
          { icon: 'bell', accessibilityLabel: 'Notifications', onPress: () => Alert.alert('Notifications') },
        ]}
      />

      <View style={styles.section}>
        <SportSelector sports={sportOptions} selectedId={sport} onSelect={setSport} />
      </View>

      <View style={styles.sectionPadded}>
        <HeroCard
          headline={heroPromo.headline}
          supportingText={heroPromo.supportingText}
          image={heroPromo.image}
          ctaLabel="Watch Live"
          onPressCta={() => Alert.alert('Watch Live')}
        />
      </View>

      <SectionHeader title="Live Now" />
      <View style={styles.sectionPadded}>
        <LiveMatchCard
          competition={liveMatch.competition}
          minute={liveMatch.minute}
          home={liveMatch.home}
          away={liveMatch.away}
          onPress={onOpenLiveMatch}
        />
      </View>

      <SectionHeader title="Fixtures" />
      <View style={[styles.sectionPadded, styles.stack]}>
        {fixtures.map((fixture, index) => (
          <MatchCard
            key={index}
            competition={fixture.competition}
            state={fixture.state}
            statusDetail={fixture.statusDetail}
            home={fixture.home}
            away={fixture.away}
            onPress={() => Alert.alert(`${fixture.home.name} vs ${fixture.away.name}`)}
          />
        ))}
      </View>

      <SectionHeader title="Latest News" />
      <View style={styles.sectionPadded}>
        <FeatureStoryCard {...featureStory} onPress={() => Alert.alert(featureStory.headline)} />
      </View>
      <View style={[styles.sectionPadded, styles.stack]}>
        {newsFeed.map((story, index) => (
          <NewsCard key={index} {...story} onPress={() => Alert.alert(story.headline)} />
        ))}
      </View>

      <SectionHeader title="Player Spotlight" />
      <View style={[styles.sectionPadded, styles.row]}>
        {players.map((player, index) => (
          <View key={index} style={styles.playerCol}>
            <PlayerCard {...player} onPress={() => Alert.alert(player.playerName)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background.base,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  section: {
    marginTop: spacing.md,
  },
  sectionPadded: {
    paddingHorizontal: spacing.md,
  },
  sectionHeader: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fontFamily.extraBold,
    fontSize: 22,
    letterSpacing: -0.3,
    color: colors.text.primary,
  },
  stack: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  playerCol: {
    flex: 1,
  },
});
