import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { transactionPalette as palette } from '../palette';

export default function MetricArrow({ direction, active }: { direction: 'income' | 'expense'; active: boolean }) {
  return (
    <View style={[styles.box, active && styles.activeBox]}>
      <Text style={[styles.arrow, active && styles.activeArrow]}>{direction === 'income' ? '↗' : '↘'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: 25, height: 25, borderWidth: 1.5, borderColor: palette.mint, borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
  activeBox: { borderColor: '#FFFFFF' },
  arrow: { color: palette.mint, fontSize: 20, lineHeight: 23, marginTop: -2 },
  activeArrow: { color: '#FFFFFF' },
});
