import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Icon, { IconName } from '../Icon';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  color?: string;
  icon?: IconName;
  style?: ViewStyle;
};

export default function PrimaryButton({
  title,
  onPress,
  backgroundColor = colors.primary,
  color = colors.text,
  icon,
  style,
}: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, { backgroundColor, opacity: pressed ? 0.82 : 1 }, style]}
    >
      {icon ? <Icon name={icon} size={18} color={color} /> : null}
      <Text style={[styles.label, { color }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 48, borderRadius: 28, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, paddingHorizontal: 20 },
  label: { fontFamily: fonts.semiBold, fontSize: 14 },
});
