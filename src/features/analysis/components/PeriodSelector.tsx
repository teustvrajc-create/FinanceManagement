import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { fonts } from '../../../theme/fonts';
import { analysisPalette as palette } from '../palette';
import { periods, Period } from '../types';

export default function PeriodSelector({ value, onChange }: { value: Period; onChange: (period: Period) => void }) {
  return (
    <View style={styles.container}>
      {periods.map((period) => {
        const selected = value === period;
        return (
          <Pressable
            key={period}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(period)}
            style={[styles.option, selected && styles.optionSelected]}
          >
            <Text style={[styles.label, selected && styles.labelSelected]}>{period}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 49, padding: 4, borderRadius: 18, backgroundColor: palette.card, flexDirection: 'row', alignItems: 'center', marginBottom: 26 },
  option: { flex: 1, height: 40, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  optionSelected: { backgroundColor: palette.mint },
  label: { color: palette.ink, fontFamily: fonts.medium, fontSize: 12 },
  labelSelected: { fontFamily: fonts.semiBold },
});
