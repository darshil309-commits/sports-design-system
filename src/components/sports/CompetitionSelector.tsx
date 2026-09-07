import React from 'react';
import { ImageSourcePropType, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { borders, colors, componentHeights, fontFamily, radius, spacing } from '../../tokens';
import { TeamLogo } from './TeamLogo';

export interface CompetitionOption {
  id: string;
  label: string;
  emblem?: ImageSourcePropType;
}

export interface CompetitionSelectorProps {
  competitions: CompetitionOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

/**
 * Horizontal competition switcher (Premier League / La Liga / Champions
 * League / ...) with emblems — the identity signal competitions carry that a
 * generic sport tab doesn't need, which is why this isn't just SportSelector
 * reused with different data.
 */
export function CompetitionSelector({ competitions, selectedId, onSelect }: CompetitionSelectorProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content}>
      {competitions.map((competition) => {
        const selected = competition.id === selectedId;
        return (
          <Pressable
            key={competition.id}
            onPress={() => onSelect(competition.id)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={competition.label}
            style={[
              styles.chip,
              {
                backgroundColor: selected ? colors.text.primary : colors.surface.default,
                borderColor: selected ? colors.text.primary : colors.border.subtle,
              },
            ]}
          >
            <TeamLogo teamName={competition.label} source={competition.emblem} size="sm" />
            <Text style={[styles.label, { color: selected ? colors.text.inverse : colors.text.secondary }]} numberOfLines={1}>
              {competition.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    height: componentHeights.chip,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: borders.thin,
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
  },
});
