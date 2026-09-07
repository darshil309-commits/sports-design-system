import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { spacing } from '../../tokens';
import { FilterChip } from '../buttons/FilterChip';

export interface SportOption {
  id: string;
  label: string;
}

export interface SportSelectorProps {
  sports: SportOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

/** Horizontal sport switcher (Football / Cricket / Tennis / ...) at the top of a Matches/Home screen. */
export function SportSelector({ sports, selectedId, onSelect }: SportSelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {sports.map((sport) => (
        <FilterChip
          key={sport.id}
          label={sport.label}
          selected={sport.id === selectedId}
          onPress={() => onSelect(sport.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
  },
});
