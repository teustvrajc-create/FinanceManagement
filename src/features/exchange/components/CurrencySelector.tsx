import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../theme';
import { CurrencyCode, supportedCurrencies } from '../types/rates';

const currencyNames: Record<CurrencyCode, string> = {
  KZT: 'Tenge',
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'Pound',
  RUB: 'Ruble',
};

type CurrencySelectorProps = {
  value: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
  label: string;
};

export default function CurrencySelector({ value, onChange, label }: CurrencySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.options}>
        {supportedCurrencies.map((currency) => {
          const selected = currency === value;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected }}
              key={currency}
              onPress={() => onChange(currency)}
              style={[styles.option, selected && styles.optionSelected]}
            >
              <Text style={[styles.code, selected && styles.codeSelected]}>{currency}</Text>
              <Text style={[styles.name, selected && styles.nameSelected]}>{currencyNames[currency]}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  label: { color: colors.muted, fontFamily: fonts.medium, fontSize: 10, marginLeft: 2 },
  options: { gap: 8, paddingRight: 4 },
  option: { minWidth: 68, alignItems: 'center', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 8, backgroundColor: colors.white },
  optionSelected: { backgroundColor: colors.primary },
  code: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 11 },
  codeSelected: { color: colors.dark },
  name: { color: colors.muted, fontFamily: fonts.medium, fontSize: 7, marginTop: 2 },
  nameSelected: { color: colors.dark },
});
