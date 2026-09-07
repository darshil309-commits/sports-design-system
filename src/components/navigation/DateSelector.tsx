import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors, fontFamily, radius, spacing } from '../../tokens';

export interface DateSelectorProps {
  dates: Date[];
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/** Horizontal date strip for a fixtures calendar — Today highlighted, tap to jump match day. */
export function DateSelector({ dates, selectedDate, onSelect }: DateSelectorProps) {
  const today = new Date();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content}>
      {dates.map((date) => {
        const selected = isSameDay(date, selectedDate);
        const isToday = isSameDay(date, today);
        return (
          <Pressable
            key={date.toISOString()}
            onPress={() => onSelect(date)}
            style={[styles.chip, selected && styles.chipSelected]}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={date.toDateString()}
          >
            <Text style={[styles.weekday, selected && styles.textSelected]}>
              {isToday ? 'TODAY' : WEEKDAY[date.getDay()]}
            </Text>
            <Text style={[styles.day, selected && styles.textSelected]}>{date.getDate()}</Text>
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
    width: 56,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  chipSelected: {
    backgroundColor: colors.text.primary,
    borderColor: colors.text.primary,
  },
  weekday: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: colors.text.muted,
  },
  day: {
    fontFamily: fontFamily.extraBold,
    fontSize: 18,
    color: colors.text.primary,
  },
  textSelected: {
    color: colors.text.inverse,
  },
});
