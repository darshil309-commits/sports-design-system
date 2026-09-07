import React from 'react';
import { ImageSourcePropType, ScrollView, StyleSheet, View } from 'react-native';
import { colors, radius, shadows, spacing } from '../tokens';
import { GradientImage } from '../components/media/GradientImage';
import { Scoreboard, ScoreboardProps } from '../components/sports/Scoreboard';
import { SegmentedControl } from '../components/buttons/SegmentedControl';
import { TopNav, TopNavProps } from '../components/navigation/TopNav';

export interface MatchHeroPatternProps {
  heroImage: ImageSourcePropType;
  scoreboard: ScoreboardProps;
  topNav?: Omit<TopNavProps, 'transparent'>;
  tabs: string[];
  activeTabIndex: number;
  onChangeTab: (index: number) => void;
  children: React.ReactNode;
  heroHeight?: number;
}

/**
 * The flagship Match page structure: immersive full-bleed hero (stadium
 * photo + gradient + Scoreboard) with a floating white sheet overlapping its
 * bottom edge — no hard dark/white split. The sheet carries the section
 * tabs and whatever content the active tab renders (Overview stats,
 * lineups, MatchTimeline, etc. — passed as `children`, decided by the
 * consuming screen since content differs per tab).
 */
export function MatchHeroPattern({
  heroImage,
  scoreboard,
  topNav,
  tabs,
  activeTabIndex,
  onChangeTab,
  children,
  heroHeight = 380,
}: MatchHeroPatternProps) {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content} bounces={false}>
      <GradientImage source={heroImage} style={{ height: heroHeight }} startAt={0.2}>
        {topNav && (
          <View style={styles.topNavWrap}>
            <TopNav {...topNav} transparent />
          </View>
        )}
        <View style={styles.scoreboardWrap}>
          <Scoreboard {...scoreboard} onDark />
        </View>
      </GradientImage>

      <View style={styles.sheet}>
        <View style={styles.tabsWrap}>
          <SegmentedControl segments={tabs} selectedIndex={activeTabIndex} onChange={onChangeTab} />
        </View>
        <View style={styles.body}>{children}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.background.base,
  },
  content: {
    flexGrow: 1,
  },
  topNavWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  scoreboardWrap: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    // Must clear the sheet's overlap (marginTop below) with room to spare —
    // the scorers row can grow to two lines and its bottom edge must never
    // sit under the floating sheet.
    bottom: spacing.huge,
  },
  sheet: {
    marginTop: -spacing.xxl,
    backgroundColor: colors.background.elevated,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingTop: spacing.md,
    minHeight: 480,
    ...shadows.elevated,
  },
  tabsWrap: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  body: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
});
