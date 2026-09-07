import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../src/tokens';
import { TopNav } from '../../src/components/navigation/TopNav';
import { Tabs } from '../../src/components/navigation/Tabs';
import { ArticleCard } from '../../src/components/cards/ArticleCard';
import { VideoHighlightCard } from '../../src/components/media/VideoHighlightCard';
import { newsFeed, featureStory } from '../data/mockData';

const CATEGORIES = ['All', 'Premier League', 'Transfers', 'Features'];

export function NewsScreen() {
  const [tab, setTab] = useState(0);

  const articles = [
    { headline: featureStory.headline, category: featureStory.category, timestamp: featureStory.timestamp, image: featureStory.image },
    ...newsFeed.map((n) => ({ headline: n.headline, category: n.category, timestamp: n.timestamp, image: n.thumbnail })),
  ];

  return (
    <View style={styles.root}>
      <TopNav title="News" />
      <Tabs tabs={CATEGORIES} selectedIndex={tab} onChange={setTab} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          {articles.map((article, index) => (
            <View key={index} style={styles.gridItem}>
              <ArticleCard {...article} onPress={() => Alert.alert(article.headline)} />
            </View>
          ))}
        </View>

        <View style={styles.videoWrap}>
          <VideoHighlightCard
            title="Highlights: Arsenal 2-1 Chelsea — every goal"
            thumbnail={featureStory.image}
            duration="4:12"
            onPress={() => Alert.alert('Play highlights')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background.base,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  gridItem: {
    width: '47%',
  },
  videoWrap: {
    marginTop: spacing.md,
  },
});
