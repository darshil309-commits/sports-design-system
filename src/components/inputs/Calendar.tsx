import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, radius, spacing } from '../../tokens';
import { IconButton } from '../buttons/IconButton';

export interface CalendarProps {
  /** Any date within the month to display. */
  month: Date;
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
  onChangeMonth: (next: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function buildGrid(month: Date): (Date | null)[] {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const leadingBlanks = firstDay.getDay();

  const cells: (Date | null)[] = Array.from({ length: leadingBlanks }, () => null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, monthIndex, day));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

/** Month-grid date picker — sharp-cornered day cells, no circular selection bubble. */
export function Calendar({ month, selectedDate, onSelectDate, onChangeMonth, minDate, maxDate }: CalendarProps) {
  const today = new Date();
  const cells = buildGrid(month);

  const goToMonth = (delta: number) => onChangeMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1));

  return (
    <View>
      <View style={styles.header}>
        <IconButton icon="chevronLeft" variant="ghost" size="sm" onPress={() => goToMonth(-1)} accessibilityLabel="Previous month" />
        <Text style={styles.monthLabel}>
          {MONTH_LABELS[month.getMonth()]} {month.getFullYear()}
        </Text>
        <IconButton icon="chevronRight" variant="ghost" size="sm" onPress={() => goToMonth(1)} accessibilityLabel="Next month" />
      </View>

      <View style={styles.weekdayRow}>
        {WEEKDAY_LABELS.map((label, index) => (
          <Text key={index} style={styles.weekdayLabel}>
            {label}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((date, index) => {
          if (!date) return <View key={index} style={styles.cell} />;
          const disabled = (minDate && date < minDate) || (maxDate && date > maxDate);
          const selected = selectedDate && isSameDay(date, selectedDate);
          const isToday = isSameDay(date, today);
          return (
            <Pressable
              key={index}
              style={[styles.cell, styles.dayCell, selected && styles.dayCellSelected]}
              disabled={Boolean(disabled)}
              onPress={() => onSelectDate(date)}
              accessibilityRole="button"
              accessibilityState={{ selected: Boolean(selected), disabled: Boolean(disabled) }}
              accessibilityLabel={date.toDateString()}
            >
              <Text
                style={[
                  styles.dayText,
                  disabled && styles.dayTextDisabled,
                  selected && styles.dayTextSelected,
                  isToday && !selected && styles.dayTextToday,
                ]}
              >
                {date.getDate()}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const CELL_SIZE = 40;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  monthLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.text.primary,
  },
  weekdayRow: {
    flexDirection: 'row',
  },
  weekdayLabel: {
    width: CELL_SIZE,
    textAlign: 'center',
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.text.muted,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCell: {
    borderRadius: radius.sm,
  },
  dayCellSelected: {
    backgroundColor: colors.text.primary,
  },
  dayText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.text.primary,
  },
  dayTextDisabled: {
    color: colors.text.disabled,
    opacity: 0.4,
  },
  dayTextSelected: {
    color: colors.text.inverse,
  },
  dayTextToday: {
    color: colors.brand.primary,
  },
});
