import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { colors } from '../../src/tokens';
import { TopNav } from '../../src/components/navigation/TopNav';
import { EmptyState } from '../../src/components/feedback/EmptyState';

export function FollowingScreen() {
  return (
    <View style={styles.root}>
      <TopNav title="Following" />
      <EmptyState
        icon="following"
        title="No teams followed yet"
        description="Follow teams and competitions to see their fixtures, results, and news here."
        ctaLabel="Explore Teams"
        onPressCta={() => Alert.alert('Explore teams')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background.base,
  },
});
