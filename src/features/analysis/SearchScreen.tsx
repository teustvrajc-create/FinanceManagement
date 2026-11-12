import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { PageHeader, FinanceLayout, PrimaryButton, TransactionList } from '../../components/finance/primitives';
import { sampleTransactions } from '../transactions/data/transactions';
import type { TransactionType } from '../transactions/types';
import { colors, fonts } from '../../theme';

const categories = ['All', 'Food', 'Home', 'Transport', 'Health', 'Income'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [flow, setFlow] = useState<TransactionType>('expense');
  const [searched, setSearched] = useState(false);
  const results = useMemo(() => sampleTransactions.filter((item) => {
    const matchesText = !query || [item.title, item.detail, item.category].some((value) => value.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = category === 'All' || item.category.toLowerCase() === category.toLowerCase();
    return item.type === flow && matchesText && matchesCategory;
  }), [category, flow, query]);
  return <FinanceLayout active="analysis">
    <PageHeader title="Search" onBack={() => router.back()} notification />
    <View style={styles.panel}>
      <Text style={styles.label}>Search</Text>
      <TextInput value={query} onChangeText={setQuery} placeholder="Search transactions..." placeholderTextColor={colors.muted} style={styles.input} />
      <Text style={styles.label}>Categories</Text>
      <View style={styles.chips}>{categories.map((item) => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipActive]}><Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text></Pressable>)}</View>
      <Pressable onPress={() => router.push('/analysis/calendar' as never)} style={styles.date}><Text style={styles.dateLabel}>Date</Text><Text style={styles.dateValue}>30 / April / 2023     ▣</Text></Pressable>
      <Text style={styles.label}>Report</Text>
      <View style={styles.flowRow}>{(['income', 'expense'] as const).map((item) => <Pressable key={item} onPress={() => setFlow(item)} style={styles.flowOption}><View style={[styles.radio, item === flow && styles.radioSelected]} /> <Text style={styles.flowText}>{item === 'income' ? 'Income' : 'Expense'}</Text></Pressable>)}</View>
      <PrimaryButton title="Search" onPress={() => setSearched(true)} style={styles.searchButton} />
    </View>
    {searched ? <><Text style={styles.resultTitle}>{results.length ? 'Results' : 'No matches found'}</Text><TransactionList items={results} /></> : <Text style={styles.hint}>Choose a category, date, or keyword to find an entry.</Text>}
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  panel: { backgroundColor: '#DFF7E4', borderRadius: 22, padding: 16 },
  label: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 10, marginBottom: 7, marginTop: 7 },
  input: { minHeight: 43, borderRadius: 12, borderWidth: 1, borderColor: colors.primary, backgroundColor: '#F4FFF5', paddingHorizontal: 12, color: colors.dark, fontFamily: fonts.medium, fontSize: 10, marginBottom: 9 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { paddingHorizontal: 9, paddingVertical: 7, backgroundColor: '#F4FFF5', borderRadius: 12 },
  chipActive: { backgroundColor: colors.primary },
  chipText: { color: colors.dark, fontFamily: fonts.medium, fontSize: 8 },
  chipTextActive: { fontFamily: fonts.semiBold },
  date: { minHeight: 42, paddingHorizontal: 12, borderRadius: 12, backgroundColor: '#F4FFF5', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dateLabel: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9 },
  dateValue: { color: colors.dark, fontFamily: fonts.medium, fontSize: 9 },
  flowRow: { flexDirection: 'row', gap: 20, paddingVertical: 4 },
  flowOption: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  radio: { width: 14, height: 14, borderRadius: 7, borderWidth: 1, borderColor: colors.primary },
  radioSelected: { borderWidth: 4 },
  flowText: { color: colors.dark, fontFamily: fonts.medium, fontSize: 9, textTransform: 'capitalize' },
  searchButton: { marginTop: 13 },
  resultTitle: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 13, marginTop: 18, marginBottom: 6 },
  hint: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, textAlign: 'center', marginTop: 22 }
});
