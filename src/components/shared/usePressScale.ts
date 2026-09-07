import { useRef } from 'react';
import { Animated } from 'react-native';
import { motion } from '../../tokens';

/**
 * Shared "physical" press feedback: a quick, small scale-down on press-in and
 * a spring back on release. Used by every pressable primitive (Button,
 * IconButton, Chip, Card) so the whole system feels consistently athletic
 * rather than relying on opacity fades alone.
 */
export function usePressScale(activeScale = 0.96) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.timing(scale, {
      toValue: activeScale,
      duration: motion.duration.fast,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      ...motion.spring.snappy,
      useNativeDriver: true,
    }).start();
  };

  return { scale, onPressIn, onPressOut };
}
