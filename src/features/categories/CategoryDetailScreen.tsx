import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Icon, { IconName } from '../../components/finance/Icon';
import { FinanceLayout, PageHeader, PrimaryButton, SectionHeading, TransactionList } from '../../components/finance/primitives';
import { categories } from './data/categories';
import { sampleTransactions } from '../transactions/data/transactions';
import { colors, fonts } from '../../theme';

const categoryIcons: Record<string, IconName> = {
  food: 'food', transport: 'car', groceries: 'groceries', rent: 'rent',
  gifts: 'gift', medicine: 'medicine', entertainment: 'entertainment',
};

export default function CategoryDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const key = typeof slug === 'string' ? slug.toLowerCase() : 'food';
  const category = categories.find((item) => item.label.toLowerCase() === key);
  const label = category?.label ?? key.charAt(0).toUpperCase() + key.slice(1);
  const icon = categoryIcons[key] ?? 'more';
  const matching = useMemo(() => sampleTransactions.filter((item) =>
    item.category.toLowerCase() === key || item.title.toLowerCase().includes(key)
  ), [key]);
  return <FinanceLayout active="categories">
    <PageHeader title={label} onBack={() => router.back()} notification />
    <View style={styles.balanceRow}><View><Text style={styles.label}>Total Balance</Text><Text style={styles.balance}>$7,783.00</Text></View><View style={styles.totalExpense}><Text style={styles.label}>Total Expense</Text><Text style={styles.expense}>−{category?.amount ?? '$120.00'}</Text></View></View>
    <View style={styles.categoryCard}><View style={styles.categoryIcon}><Icon name={icon} size={31} color={colors.white} /></View><View style={styles.categoryInfo}><Text style={styles.categoryName}>{label}</Text><Text style={styles.categorySub}>Monthly spending</Text></View><Text style={styles.categoryAmount}>{category?.amount ?? '$120'}</Text></View>
    <View style={styles.progress}><View style={styles.fill} /></View><Text style={styles.progressText}>44% of your monthly limit used</Text>
    <SectionHeading title="This month" action="Calendar" onPress={() => router.push('/analysis/calendar' as never)} />
    <TransactionList items={matching.length ? matching : sampleTransactions.slice(1, 4)} />
    <PrimaryButton title="Add expense" icon="plus" onPress={() => router.push(('/categories/' + key + '/add-expense') as never)} style={styles.add} />
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  balanceRow: { flexDirection: 'row', backgroundColor: colors.primary, borderRadius: 18, padding: 15, marginBottom: 12 },
  label: { color: colors.dark, fontFamily: fonts.medium, fontSize: 9 },
  balance: { color: colors.white, fontFamily: fonts.bold, fontSize: 18, marginTop: 3 },
  totalExpense: { flex: 1, alignItems: 'flex-end', justifyContent: 'center', borderLeftWidth: 1, borderColor: '#70D6B5', marginLeft: 14, paddingLeft: 12 },
  expense: { color: colors.blue, fontFamily: fonts.bold, fontSize: 15, marginTop: 4 },
  categoryCard: { flexDirection: 'row', alignItems: 'center', gap: 11, backgroundColor: '#DFF8E4', borderRadius: 18, padding: 13 },
  categoryIcon: { width: 46, height: 46, borderRadius: 16, backgroundColor: colors.blue, justifyContent: 'center', alignItems: 'center' },
  categoryInfo: { flex: 1 },
  categoryName: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 11 },
  categorySub: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8, marginTop: 4 },
  categoryAmount: { color: colors.blue, fontFamily: fonts.semiBold, fontSize: 10 },
  progress: { height: 11, backgroundColor: colors.white, borderRadius: 8, overflow: 'hidden', marginTop: 13 },
  fill: { width: '44%', height: 11, backgroundColor: colors.primary, borderRadius: 8 },
  progressText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8, marginTop: 6 },
  add: { marginTop: 13 }
});
