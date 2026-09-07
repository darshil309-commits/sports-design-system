import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDesignSystemFonts } from './src/fonts';
import { colors } from './src/tokens';
import { BottomNav, BottomNavItem } from './src/components/navigation/BottomNav';
import { HomeScreen } from './example/screens/HomeScreen';
import { MatchCenterScreen } from './example/screens/MatchCenterScreen';
import { NewsScreen } from './example/screens/NewsScreen';
import { StandingsScreen } from './example/screens/StandingsScreen';
import { FollowingScreen } from './example/screens/FollowingScreen';
import { MoreScreen } from './example/screens/MoreScreen';

const NAV_ITEMS: BottomNavItem[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'matches', label: 'Matches', icon: 'matches' },
  { key: 'news', label: 'News', icon: 'news' },
  { key: 'following', label: 'Following', icon: 'following' },
  { key: 'more', label: 'More', icon: 'more' },
];

/**
 * Demo host for the design system — plain state-based tab switching (no
 * navigation library) since the point of this app is visually proving out
 * the component library, not exercising a routing solution.
 */
export default function App() {
  const { fontsLoaded } = useDesignSystemFonts();
  const [activeTab, setActiveTab] = useState('home');
  const [matchCenterOpen, setMatchCenterOpen] = useState(false);

  if (!fontsLoaded) {
    return <View style={styles.loading} />;
  }

  if (matchCenterOpen) {
    return (
      <SafeAreaProvider>
        <View style={styles.root}>
          <MatchCenterScreen onBack={() => setMatchCenterOpen(false)} />
          <StatusBar style="light" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <View style={styles.screen}>
          {activeTab === 'home' && <HomeScreen onOpenLiveMatch={() => setMatchCenterOpen(true)} />}
          {activeTab === 'matches' && <StandingsScreen />}
          {activeTab === 'news' && <NewsScreen />}
          {activeTab === 'following' && <FollowingScreen />}
          {activeTab === 'more' && <MoreScreen />}
        </View>
        <BottomNav items={NAV_ITEMS} activeKey={activeTab} onSelect={setActiveTab} />
        <StatusBar style="dark" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background.base,
  },
  screen: {
    flex: 1,
  },
  loading: {
    flex: 1,
    backgroundColor: colors.background.base,
  },
});
