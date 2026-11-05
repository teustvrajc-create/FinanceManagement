import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { fonts } from '../../theme/fonts';

type PillButtonProps = {
  title: string;
  onPress: () => void;
  background: string;
};

export default function PillButton({ title, onPress, background }: PillButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: background }]} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { width: 207, height: 45, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  label: { fontFamily: fonts.semiBold, fontSize: 16, color: '#052224' },
});
