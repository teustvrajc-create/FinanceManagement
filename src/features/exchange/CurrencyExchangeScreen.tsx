import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import Icon from '../../components/finance/Icon';
import { FinanceLayout, PageHeader, TextField } from '../../components/finance/primitives';
import { colors, fonts } from '../../theme';
import CurrencySelector from './components/CurrencySelector';
import { useRates } from './hooks/useRates';
import { getPairRate } from './api/rates';
import { CurrencyCode } from './types/rates';

function formatMoney(amount: number, currency: CurrencyCode) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'KZT' || currency === 'RUB' ? 0 : 2,
  }).format(amount);
}

function parseAmount(value: string) {
  const normalized = value.trim().replace(',', '.');
  if (!normalized) return null;
  const amount = Number(normalized);
  return Number.isFinite(amount) && amount >= 0 ? amount : null;
}

export default function CurrencyExchangeScreen() {
  const [amount, setAmount] = useState('1000');
  const [from, setFrom] = useState<CurrencyCode>('KZT');
  const [to, setTo] = useState<CurrencyCode>('USD');
  const { snapshot, status, error, refresh } = useRates();

  const currentRate = snapshot ? getPairRate(snapshot.rates, from, to) : null;

  const converted = useMemo(() => {
    const parsedAmount = parseAmount(amount);
    if (parsedAmount === null || currentRate === null) return null;
    const result = parsedAmount * currentRate;
    return Number.isFinite(result) ? result : null;
  }, [amount, currentRate]);

  return (
    <FinanceLayout active="home">
      <PageHeader title="Currency Exchange" onBack={() => router.back()} notification />

      <View style={styles.intro}>
        <View style={styles.introIcon}><Icon name="transactions" size={22} color={colors.dark} /></View>
        <View style={styles.introCopy}>
          <Text style={styles.introTitle}>Exchange calculator</Text>
          <Text style={styles.introSubtitle}>Compare reference currency rates</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Refresh currency rates"
          disabled={status === 'loading' || status === 'refreshing'}
          onPress={() => void refresh()}
          style={styles.refreshButton}
        >
          {status === 'loading' || status === 'refreshing'
            ? <ActivityIndicator size="small" color={colors.dark} />
            : <Text style={styles.refreshText}>↻</Text>}
        </Pressable>
      </View>

      <View style={styles.converterCard}>
        <Text style={styles.cardEyebrow}>YOU SEND</Text>
        <TextField
          accessibilityLabel="Amount to convert"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          right={<Text style={styles.amountCode}>{from}</Text>}
          containerStyle={styles.amountField}
        />
        <CurrencySelector label="From" value={from} onChange={setFrom} />

        <View style={styles.swapRow}>
          <View style={styles.swapLine} />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Swap currencies"
            onPress={() => {
              setFrom(to);
              setTo(from);
            }}
            style={styles.swapButton}
          >
            <Icon name="transactions" size={20} color={colors.dark} />
          </Pressable>
          <View style={styles.swapLine} />
        </View>

        <Text style={styles.cardEyebrow}>YOU RECEIVE</Text>
        <View style={styles.resultBox}>
          <Text style={styles.resultAmount}>
            {converted === null ? '—' : formatMoney(converted, to)}
          </Text>
          <Text style={styles.resultCode}>{to}</Text>
        </View>
        <CurrencySelector label="To" value={to} onChange={setTo} />
      </View>

      <View style={styles.rateCard}>
        <View style={styles.rateHeading}>
          <Text style={styles.rateTitle}>Reference rate</Text>
          {snapshot ? <Text style={styles.rateDate}>Updated (UTC)</Text> : null}
        </View>
        <Text style={styles.rateValue}>
          {currentRate === null
            ? status === 'loading' || status === 'refreshing' ? 'Loading latest rate…' : 'Rate unavailable'
            : from === to ? `1 ${from} = 1 ${to}` : `1 ${from} ≈ ${formatMoney(currentRate, to)}`}
        </Text>
        {snapshot ? <Text style={styles.updatedAt}>{snapshot.updatedAtUtc}</Text> : null}
        {snapshot ? <Text style={styles.nextUpdate}>Next scheduled update: {snapshot.nextUpdateAtUtc}</Text> : null}
        {status === 'error' ? (
          <View style={styles.errorRow}>
            <Text style={styles.errorText}>{error ?? 'Could not load currency rates.'}</Text>
            <Pressable accessibilityRole="button" onPress={() => void refresh()}>
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <View style={styles.notice}>
        <Icon name="bell" size={16} color={colors.muted} />
        <View style={styles.noticeCopy}>
          <Text style={styles.noticeText}>
            Indicative rates update daily. This calculator does not make trades or money transfers.
          </Text>
          <Link href="https://www.exchangerate-api.com" target="_blank" style={styles.attribution}>
            Rates by ExchangeRate-API
          </Link>
        </View>
      </View>
    </FinanceLayout>
  );
}

const styles = StyleSheet.create({
  intro: { flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 16 },
  introIcon: { width: 44, height: 44, borderRadius: 15, backgroundColor: '#DDF8E2', alignItems: 'center', justifyContent: 'center' },
  introCopy: { flex: 1 },
  introTitle: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 13 },
  introSubtitle: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, marginTop: 2 },
  refreshButton: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  refreshText: { color: colors.dark, fontSize: 24, lineHeight: 28 },
  converterCard: { backgroundColor: colors.white, borderRadius: 22, padding: 16, gap: 11 },
  cardEyebrow: { color: colors.muted, fontFamily: fonts.semiBold, fontSize: 9, letterSpacing: 0.5 },
  amountField: { marginBottom: 0 },
  amountCode: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 12 },
  swapRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 2 },
  swapLine: { flex: 1, height: 1, backgroundColor: colors.line },
  swapButton: { width: 38, height: 38, borderRadius: 14, backgroundColor: '#DDF8E2', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '90deg' }] },
  resultBox: { minHeight: 48, borderRadius: 13, backgroundColor: '#DFF5E2', paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  resultAmount: { color: colors.dark, fontFamily: fonts.bold, fontSize: 17, flex: 1 },
  resultCode: { color: colors.muted, fontFamily: fonts.semiBold, fontSize: 11 },
  rateCard: { marginTop: 14, borderRadius: 18, padding: 15, backgroundColor: '#DDF8E2' },
  rateHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rateTitle: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 11 },
  rateDate: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9 },
  rateValue: { color: colors.dark, fontFamily: fonts.bold, fontSize: 16, marginTop: 9 },
  updatedAt: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, marginTop: 5 },
  nextUpdate: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8, marginTop: 3 },
  errorRow: { marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 8 },
  errorText: { color: colors.red, fontFamily: fonts.medium, fontSize: 9, flex: 1 },
  retryText: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 10, padding: 4 },
  notice: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginTop: 13, paddingHorizontal: 4 },
  noticeCopy: { flex: 1 },
  noticeText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, lineHeight: 15 },
  attribution: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 9, marginTop: 5, textDecorationLine: 'underline' },
});
