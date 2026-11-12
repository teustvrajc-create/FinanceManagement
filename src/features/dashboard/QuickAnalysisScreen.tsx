import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Icon from '../../components/finance/Icon';
import { FinanceLayout, PageHeader, SectionHeading, TransactionList } from '../../components/finance/primitives';
import { sampleTransactions } from '../transactions/data/transactions';
import { colors, fonts } from '../../theme';

const weeklyBars = [[22, 36], [24, 58], [33, 76], [54, 42]];

export default function QuickAnalysisScreen() {
  return <FinanceLayout active="analysis">
    <PageHeader title="Quickly Analysis" onBack={() => router.back()} notification />
    <View style={styles.summary}>
      <View style={styles.goal}><View style={styles.ring}><Icon name="car" size={33} color={colors.dark} /></View><Text style={styles.goalName}>Savings</Text><Text style={styles.goalLabel}>On Goals</Text></View>
      <View style={styles.divider} />
      <View style={styles.highlights}>
        <View style={styles.highlight}><Icon name="savings" size={32} color={colors.dark} /><View><Text style={styles.label}>Revenue Last Week</Text><Text style={styles.income}>$4,000.00</Text></View></View>
        <View style={styles.highlight}><Icon name="food" size={29} color={colors.dark} /><View><Text style={styles.label}>Food Last Week</Text><Text style={styles.expense}>-$100.00</Text></View></View>
      </View>
    </View>
    <View style={styles.chartCard}>
      <View style={styles.chartTitle}><Text style={styles.chartHeading}>April Expenses</Text><View style={styles.tools}>
        <Pressable accessibilityLabel="Search" onPress={() => router.push('/analysis/search' as never)} style={styles.tool}><Icon name="search" size={16} color={colors.dark} /></Pressable>
        <Pressable accessibilityLabel="Calendar" onPress={() => router.push('/analysis/calendar' as never)} style={styles.tool}><Icon name="calendar" size={16} color={colors.dark} /></Pressable>
      </View></View>
      <View style={styles.chart}>
        {weeklyBars.map((pair, index) => <View key={index} style={styles.week}><View style={styles.bars}><View style={[styles.bar, { height: pair[0] }]} /><View style={[styles.bar, styles.blue, { height: pair[1] }]} /></View><Text style={styles.weekText}>{index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} Week</Text></View>)}
      </View>
    </View>
    <SectionHeading title="Recent activity" action="See all" onPress={() => router.push('/transactions' as never)} />
    <TransactionList items={sampleTransactions.slice(0, 4)} />
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  summary: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, borderRadius: 22, padding: 15, marginBottom: 14 },
  goal: { width: 105, alignItems: 'center' },
  ring: { width: 74, height: 74, borderRadius: 38, borderWidth: 4, borderColor: colors.blue, backgroundColor: '#8AD8C5', alignItems: 'center', justifyContent: 'center' },
  goalName: { color: colors.dark, fontFamily: fonts.medium, fontSize: 10, marginTop: 3 },
  goalLabel: { color: colors.dark, fontFamily: fonts.medium, fontSize: 10 },
  divider: { width: 1, height: 100, backgroundColor: '#E8FFF5', marginHorizontal: 8 },
  highlights: { flex: 1, gap: 17 },
  highlight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  label: { color: colors.dark, fontFamily: fonts.medium, fontSize: 9 },
  income: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 14, marginTop: 3 },
  expense: { color: colors.blue, fontFamily: fonts.semiBold, fontSize: 14, marginTop: 3 },
  chartCard: { backgroundColor: '#DDF8E2', borderRadius: 28, padding: 15, marginBottom: 12 },
  chartTitle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chartHeading: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 12 },
  tools: { flexDirection: 'row', gap: 5 },
  tool: { width: 29, height: 29, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  chart: { height: 150, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', paddingHorizontal: 8, paddingBottom: 17, marginTop: 9, borderBottomWidth: 1, borderColor: '#719085' },
  week: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: '100%' },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 5, height: 120 },
  bar: { width: 6, backgroundColor: colors.primary, borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  blue: { backgroundColor: colors.blue },
  weekText: { position: 'absolute', bottom: -15, color: colors.dark, fontFamily: fonts.medium, fontSize: 8 }
});
