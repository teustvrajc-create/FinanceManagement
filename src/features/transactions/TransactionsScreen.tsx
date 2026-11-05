import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import FinanceTabBar from '../../components/finance/FinanceTabBar';
import { fonts } from '../../theme/fonts';
import { transactionViews } from './data/transactions';
import type { TransactionMode, TransactionType } from './types';
import { transactionPalette as palette } from './palette';
import MonthSection from './components/MonthSection';
import TransactionHeader from './components/TransactionHeader';

type Props = { mode: TransactionMode };

export default function TransactionsScreen({ mode }: Props) {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const selectedCategory = typeof category === 'string' ? category.toLowerCase() : '';

  const transactions = useMemo(() => transactionViews[mode].filter((item) => (
    !selectedCategory ||
    item.category.toLowerCase() === selectedCategory ||
    item.title.toLowerCase() === selectedCategory
  )), [mode, selectedCategory]);

  const months = useMemo(
    () => Array.from(new Set(transactions.map((item) => item.month).filter((month): month is string => Boolean(month)))),
    [transactions],
  );

  const changeMode = (nextMode: TransactionType) => {
    if (nextMode === mode) return;
    const path = `/transactions/${nextMode}`;
    const href = selectedCategory ? { pathname: path, params: { category } } : path;
    if (mode === 'all') router.push(href as never);
    else router.replace(href as never);
  };

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/home' as never);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <StatusBar style="light" />
      <TransactionHeader activeMode={mode} onBack={goBack} onSelectMode={changeMode} />
      <View style={styles.panel}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
          {months.length ? months.map((month, index) => (
            <MonthSection
              key={month}
              month={month}
              items={transactions.filter((item) => item.month === month)}
              showCalendar={index === 0}
            />
          )) : (
            <Text style={styles.empty}>No transactions found.</Text>
          )}
        </ScrollView>
        <FinanceTabBar active="transactions" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.mint },
  panel: { flex: 1, minHeight: 0, backgroundColor: palette.background, borderTopLeftRadius: 62, borderTopRightRadius: 62, overflow: 'hidden' },
  listContent: { paddingHorizontal: 36, paddingTop: 25, paddingBottom: 22 },
  empty: { color: '#73908F', fontFamily: fonts.medium, textAlign: 'center', paddingVertical: 48 },
});
