import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, radius } from '../../tokens';

export type FormResult = 'W' | 'L' | 'D';

export interface FormIndicatorProps {
  /** Oldest first or most-recent-first — caller controls order; typically last 5 results. */
  results: FormResult[];
}

const colorByResult: Record<FormResult, string> = {
  W: colors.form.win,
  L: colors.form.loss,
  D: colors.form.draw,
};

/** Recent-form row (e.g. W W D L W) shown on team/competition cards. */
export function FormIndicator({ results }: FormIndicatorProps) {
  return (
    <View style={styles.row}>
      {results.map((result, index) => (
        <View
          key={index}
          style={[styles.square, { backgroundColor: colorByResult[result] }]}
          accessibilityLabel={result === 'W' ? 'Win' : result === 'L' ? 'Loss' : 'Draw'}
        >
          <Text style={styles.label}>{result}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  square: {
    width: 18,
    height: 18,
    borderRadius: radius.sm - 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fontFamily.bold,
    fontSize: 9,
    color: colors.text.inverse,
  },
});
