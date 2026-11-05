import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

type TextFieldProps = TextInputProps & {
  label?: string;
  right?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function TextField({ label, right, containerStyle, ...inputProps }: TextFieldProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.field}>
        <TextInput
          {...inputProps}
          placeholderTextColor="#91AAA0"
          style={[styles.input, inputProps.style]}
          selectionColor={colors.dark}
        />
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 7, marginBottom: 15 },
  label: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 12, marginLeft: 4 },
  field: { minHeight: 46, borderRadius: 13, paddingHorizontal: 14, backgroundColor: '#DFF5E2', flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, minHeight: 46, color: colors.text, fontFamily: fonts.medium, fontSize: 12, paddingVertical: 0 },
});
