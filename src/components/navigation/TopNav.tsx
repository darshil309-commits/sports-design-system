import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, componentHeights, fontFamily, spacing } from '../../tokens';
import { IconButton } from '../buttons/IconButton';
import { IconName } from '../icons';

export interface TopNavAction {
  icon: IconName;
  accessibilityLabel: string;
  onPress: () => void;
}

export interface TopNavProps {
  title?: string;
  onBack?: () => void;
  actions?: TopNavAction[];
  /** Transparent bar over a hero image — title/icons render white, no background/border. */
  transparent?: boolean;
}

export function TopNav({ title, onBack, actions = [], transparent = false }: TopNavProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        { height: componentHeights.topNav + insets.top, paddingTop: insets.top },
        !transparent && styles.solid,
      ]}
    >
      <View style={styles.side}>
        {onBack && (
          <IconButton
            icon="arrowLeft"
            variant="ghost"
            onPress={onBack}
            accessibilityLabel="Go back"
          />
        )}
      </View>
      {title && (
        <Text
          style={[styles.title, { color: transparent ? colors.text.inverse : colors.text.primary }]}
          numberOfLines={1}
        >
          {title}
        </Text>
      )}
      <View style={[styles.side, styles.sideEnd]}>
        {actions.map((action) => (
          <IconButton
            key={action.accessibilityLabel}
            icon={action.icon}
            variant="ghost"
            onPress={action.onPress}
            accessibilityLabel={action.accessibilityLabel}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  solid: {
    backgroundColor: colors.background.elevated,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  side: {
    flexDirection: 'row',
    minWidth: 40,
  },
  sideEnd: {
    justifyContent: 'flex-end',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
});
