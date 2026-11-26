import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { colors, fonts } from '../../../theme';
import { getPairRate } from '../api/rates';
import { useRates } from '../hooks/useRates';
import { CurrencyCode, supportedCurrencies } from '../types/rates';

const totalExpensesUsd = 1187.4;

function formatMoney(amount: number, currency: CurrencyCode) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'KZT' ? 0 : 2,
  }).format(amount);
}

export default function CurrencySummaryCard() {
  const [currency, setCurrency] = useState<CurrencyCode>('KZT');
  const { snapshot, status, error, refresh } = useRates();

  const converted = useMemo(() => {
    if (!snapshot) return null;
    return totalExpensesUsd * getPairRate(snapshot.rates, 'USD', currency);
  }, [currency, snapshot]);

  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <View style={styles.headingCopy}>
          <Text style={styles.label}>Total expenses · USD</Text>
          <Text style={styles.subLabel}>Reference conversion</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Refresh currency rates"
          disabled={status === 'loading' || status === 'refreshing'}
          onPress={() => void refresh()}
          style={styles.refresh}
        >
          {status === 'loading' || status === 'refreshing'
            ? <ActivityIndicator size="small" color={colors.dark} />
            : <Text style={styles.refreshText}>↻</Text>}
        </Pressable>
      </View>

      <Text style={styles.sourceAmount}>{formatMoney(totalExpensesUsd, 'USD')}</Text>
      <Text style={styles.value}>
        {converted === null ? status === 'error' ? '—' : 'Loading…' : formatMoney(converted, currency)}
      </Text>

      <View style={styles.chips}>
        {supportedCurrencies.map((item) => {
          const active = item === currency;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              key={item}
              onPress={() => setCurrency(item)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          );
        })}
      </View>

      {status === 'error' ? (
        <View style={styles.errorRow}>
          <Text style={styles.errorText}>{error ?? 'Rates are unavailable.'}</Text>
          <Pressable accessibilityRole="button" onPress={() => void refresh()}>
            <Text style={styles.retry}>Retry</Text>
          </Pressable>
        </View>
      ) : null}

      {snapshot ? (
        <Text style={styles.updated}>Updated {new Date(snapshot.updatedAtUtc).toLocaleString()}</Text>
      ) : null}
      <View style={styles.footer}>
        <Link href="https://www.exchangerate-api.com" target="_blank" style={styles.attribution}>
          Rates by ExchangeRate-API
        </Link>
        <Pressable accessibilityRole="button" onPress={() => router.push('/currency-exchange' as never)}>
          <Text style={styles.openLink}>Open converter ›</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: 18, padding: 14, marginBottom: 13 },
  heading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headingCopy: { flex: 1 },
  label: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 10 },
  subLabel: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8, marginTop: 2 },
  refresh: { width: 30, height: 30, borderRadius: 10, backgroundColor: '#F1FFF3', alignItems: 'center', justifyContent: 'center' },
  refreshText: { color: colors.dark, fontSize: 21, lineHeight: 24 },
  sourceAmount: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, marginTop: 8 },
  value: { color: colors.dark, fontFamily: fonts.bold, fontSize: 23, marginTop: 1 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 10 },
  chip: { backgroundColor: '#F1FFF3', borderRadius: 15, paddingHorizontal: 11, paddingVertical: 6, minWidth: 48, alignItems: 'center' },
  chipActive: { backgroundColor: colors.primary },
  chipText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9 },
  chipTextActive: { color: colors.dark, fontFamily: fonts.semiBold },
  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  errorText: { color: colors.red, fontFamily: fonts.medium, fontSize: 8, flex: 1 },
  retry: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 9 },
  updated: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8, marginTop: 9 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 7 },
  attribution: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8, textDecorationLine: 'underline' },
  openLink: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 8 },
});
