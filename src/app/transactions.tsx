import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Icon from '../components/finance/Icon';
import {
  FinanceLayout,
  PageHeader,
  sampleTransactions,
  SectionHeading,
  TransactionList,
} from '../components/finance/Primitives';
import { colors, fonts } from '../ui';

export default function TransactionsScreen() {
  const { category } = useLocalSearchParams<{ category?: string }>();
  const [query, setQuery] = useState('');
  const items = useMemo(() => {
    return sampleTransactions.filter((item) => {
      const matchesCategory = !category || item.category.toLowerCase() === category.toLowerCase() || item.title.toLowerCase() === category.toLowerCase();
      const matchesSearch = !query || item.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  return (
    <FinanceLayout active="transactions">
      <PageHeader title={category ? String(category) : 'Transaction'} onBack={() => router.back()} />
      <View style={styles.balanceCard}>
        <Text style={styles.totalLabel}>Total Balance</Text>
        <Text style={styles.totalAmount}>$7,783.00</Text>
      </View>
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}><Text style={styles.summaryLabel}>Income</Text><Text style={styles.income}>$4,120.00</Text></View>
        <View style={styles.summaryCard}><Text style={styles.summaryLabel}>Expense</Text><Text style={styles.expense}>$1,187.40</Text></View>
      </View>
      <View style={styles.search}>
        <Icon name="search" size={17} color={colors.muted} />
        <TextInput value={query} onChangeText={setQuery} placeholder="Search transaction" placeholderTextColor={colors.muted} style={styles.searchInput} />
      </View>
      <View style={styles.dateRow}><Text style={styles.month}>April</Text><Pressable style={styles.calendar}><Icon name="calendar" size={18} color={colors.dark} /></Pressable></View>
      <SectionHeading title={category ? 'Matching transactions' : 'Recent transactions'} />
      {items.length ? <TransactionList items={items} /> : <Text style={styles.empty}>No transactions found.</Text>}
    </FinanceLayout>
  );
}

const styles = StyleSheet.create({
  balanceCard: { backgroundColor: colors.primary, borderRadius: 17, padding: 15, alignItems: 'center', marginBottom: 11 },
  totalLabel: { color: '#35695A', fontFamily: fonts.medium, fontSize: 9 },
  totalAmount: { color: colors.dark, fontFamily: fonts.bold, fontSize: 17, marginTop: 3 },
  summaryRow: { flexDirection: 'row', gap: 11, marginBottom: 13 },
  summaryCard: { flex: 1, backgroundColor: colors.white, borderRadius: 15, padding: 12 },
  summaryLabel: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8 },
  income: { color: '#179D78', fontFamily: fonts.semiBold, fontSize: 13, marginTop: 5 },
  expense: { color: '#4B95EC', fontFamily: fonts.semiBold, fontSize: 13, marginTop: 5 },
  search: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 42, backgroundColor: colors.white, borderRadius: 13, paddingHorizontal: 13, marginBottom: 14 },
  searchInput: { flex: 1, fontFamily: fonts.medium, fontSize: 10, color: colors.dark },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  month: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 13 },
  calendar: { width: 34, height: 34, borderRadius: 12, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  empty: { color: colors.muted, fontFamily: fonts.medium, fontSize: 11, textAlign: 'center', paddingVertical: 35 },
});
