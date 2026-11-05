import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

type TextLinkProps = {
  children: ReactNode;
  onPress: () => void;
  style?: ViewStyle;
};

export default function TextLink({ children, onPress, style }: TextLinkProps) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={style}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({ text: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.dark } });
