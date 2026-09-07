import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, componentHeights, fontFamily, opacity, radius, spacing } from '../../tokens';

export interface TextInputProps extends Pick<RNTextInputProps, 'value' | 'onChangeText' | 'placeholder' | 'secureTextEntry' | 'keyboardType' | 'autoCapitalize' | 'onBlur' | 'onFocus'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
}

/** Labeled text field. Sharp `radius.sm` border, red focus ring, red error state with helper text. */
export function TextInput({
  label,
  helperText,
  errorText,
  disabled = false,
  value,
  onChangeText,
  onFocus,
  onBlur,
  ...inputProps
}: TextInputProps) {
  const [focused, setFocused] = useState(false);
  const hasError = Boolean(errorText);

  const borderColor = hasError ? colors.status.error : focused ? colors.brand.primary : colors.border.default;

  return (
    <View style={{ opacity: disabled ? opacity.disabled : 1 }}>
      {label && <Text style={styles.label}>{label.toUpperCase()}</Text>}
      <RNTextInput
        {...inputProps}
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
        placeholderTextColor={colors.text.muted}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={[styles.input, { borderColor, borderWidth: focused || hasError ? 2 : 1 }]}
      />
      {(errorText || helperText) && (
        <Text style={[styles.helper, hasError && styles.helperError]}>{errorText ?? helperText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.6,
    color: colors.text.muted,
    marginBottom: spacing.xxs,
  },
  input: {
    height: componentHeights.input,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.text.primary,
    backgroundColor: colors.surface.default,
  },
  helper: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.text.muted,
    marginTop: spacing.xxs,
  },
  helperError: {
    color: colors.status.error,
  },
});
