import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing, tabularNums } from '../../tokens';

export interface CountdownProps {
  /** Kickoff/target instant. */
  target: Date;
  size?: 'sm' | 'lg';
  onComplete?: () => void;
}

function timeLeft(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: ms === 0,
  };
}

/** Countdown-to-kickoff, updates every second. Digits are the headline, unit letters stay small and muted. */
export function Countdown({ target, size = 'lg', onComplete }: CountdownProps) {
  const [remaining, setRemaining] = useState(() => timeLeft(target));

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((prev) => {
        const next = timeLeft(target);
        if (next.done && !prev.done) onComplete?.();
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [target, onComplete]);

  const segments = [
    { value: remaining.days, unit: 'D' },
    { value: remaining.hours, unit: 'H' },
    { value: remaining.minutes, unit: 'M' },
    { value: remaining.seconds, unit: 'S' },
  ];

  return (
    <View style={styles.row}>
      {segments.map((segment, index) => (
        <React.Fragment key={segment.unit}>
          <View style={styles.segment}>
            <Text style={[size === 'lg' ? styles.digitLg : styles.digitSm, tabularNums]}>
              {String(segment.value).padStart(2, '0')}
            </Text>
            <Text style={styles.unit}>{segment.unit}</Text>
          </View>
          {index < segments.length - 1 && <Text style={styles.separator}>:</Text>}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  segment: {
    alignItems: 'center',
    gap: 2,
  },
  digitLg: {
    fontFamily: fontFamily.black,
    fontSize: 32,
    color: colors.text.primary,
  },
  digitSm: {
    fontFamily: fontFamily.extraBold,
    fontSize: 18,
    color: colors.text.primary,
  },
  unit: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.6,
    color: colors.text.muted,
  },
  separator: {
    fontFamily: fontFamily.black,
    fontSize: 28,
    color: colors.text.muted,
    marginTop: -2,
  },
});
