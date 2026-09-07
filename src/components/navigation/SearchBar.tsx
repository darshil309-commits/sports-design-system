import React, { useState } from 'react';
import { StyleSheet, TextInput as RNTextInput, View } from 'react-native';
import { colors, componentHeights, fontFamily, radius, spacing } from '../../tokens';
import { Icon } from '../icons';
import { IconButton } from '../buttons/IconButton';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  autoFocus?: boolean;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search', onSubmit, autoFocus }: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.wrap, focused && styles.wrapFocused]}>
      <Icon name="search" size="md" color={colors.text.muted} />
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.muted}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        autoFocus={autoFocus}
        style={styles.input}
      />
      {value.length > 0 && (
        <IconButton
          icon="close"
          size="sm"
          variant="ghost"
          onPress={() => onChangeText('')}
          accessibilityLabel="Clear search"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    height: componentHeights.input,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface.subtle,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  wrapFocused: {
    borderColor: colors.brand.primary,
    backgroundColor: colors.surface.default,
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.text.primary,
  },
});
