import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Icon from '../components/finance/Icon';
import { FinanceLayout, PageHeader, SectionHeading, TransactionList } from '../components/finance/Primitives';
import { colors, fonts } from '../ui';

const bars = [32, 52, 38, 78, 55, 95, 69, 84];
const weeks = ['1st', '2nd', '3rd', '4th'];

export default function AnalysisScreen() {
  return (
    <FinanceLayout active="analysis">
      <PageHeader title="Quickly Analysis" onBack={() => router.back()} />
      <View style={styles.periodRow}>
        <View><Text style={styles.dateLabel}>Your spending</Text><Text style={styles.dateValue}>April 2026</Text></View>
        <Pressable style={styles.calendar}><Icon name="calendar" size={18} color={colors.dark} /></Pressable>
      </View>
      <View style={styles.insightCard}>
        <View style={styles.insightTop}>
          <View style={styles.savingsIcon}><Icon name="savings" size={20} color="#148E78" /></View>
          <View><Text style={styles.savingsLabel}>Savings on Goals</Text><Text style={styles.savingsAmount}>$4,000.00</Text></View>
        </View>
        <View style={styles.insightBottom}>
          <View><Text style={styles.insightLabel}>Income</Text><Text style={styles.income}>+$4,120.00</Text></View>
          <View style={styles.divider} />
          <View><Text style={styles.insightLabel}>Expenses</Text><Text style={styles.expense}>-$1,187.40</Text></View>
          <View style={styles.divider} />
          <View><Text style={styles.insightLabel}>Saved</Text><Text style={styles.saved}>$2,932.60</Text></View>
        </View>
      </View>
      <View style={styles.chartCard}>
        <SectionHeading title="April Expenses" action="This month⌄" />
        <View style={styles.chartBody}>
          <View style={styles.yAxis}><Text>$400</Text><Text>$300</Text><Text>$200</Text><Text>$100</Text><Text>$0</Text></View>
          <View style={styles.chart}>
            {[0, 1, 2, 3].map((weekIndex) => (
              <View key={weekIndex} style={styles.barGroup}>
                <View style={[styles.bar, { height: bars[weekIndex * 2] }]} />
                <View style={[styles.bar, styles.barAlt, { height: bars[weekIndex * 2 + 1] }]} />
                <Text style={styles.weekLabel}>{weeks[weekIndex]} Week</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.legend}><View style={styles.legendItem}><View style={styles.legendBlue} /><Text style={styles.legendText}>Income</Text></View><View style={styles.legendItem}><View style={styles.legendGreen} /><Text style={styles.legendText}>Expense</Text></View></View>
      </View>
      <SectionHeading title="Recent Activity" action="See all" />
      <TransactionList items={[
        { title: 'Salary', detail: 'Monthly', date: '12:27 · Apr 30', amount: '+$4,000.00', icon: 'wallet', color: '#67B9F4', category: 'Income' },
        { title: 'Groceries', detail: 'Pantry', date: '17:00 · Apr 24', amount: '-$100.00', icon: 'groceries', color: '#59A5EC', category: 'Food' },
        { title: 'Rent', detail: 'Monthly', date: '8:30 · Apr 15', amount: '-$674.40', icon: 'rent', color: '#2E91F4', category: 'Home' },
      ]} />
    </FinanceLayout>
  );
}

const styles = StyleSheet.create({
  periodRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 },
  dateLabel: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9 },
  dateValue: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 13, marginTop: 3 },
  calendar: { width: 38, height: 38, borderRadius: 13, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  insightCard: { backgroundColor: colors.primary, borderRadius: 19, padding: 15, marginBottom: 14 },
  insightTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  savingsIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  savingsLabel: { color: '#3A6A5C', fontFamily: fonts.medium, fontSize: 9 },
  savingsAmount: { color: colors.dark, fontFamily: fonts.bold, fontSize: 16, marginTop: 2 },
  insightBottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 17, alignItems: 'center' },
  insightLabel: { color: '#3E705F', fontFamily: fonts.medium, fontSize: 8 },
  income: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 10, marginTop: 4 },
  expense: { color: '#3D85D2', fontFamily: fonts.semiBold, fontSize: 10, marginTop: 4 },
  saved: { color: '#126F60', fontFamily: fonts.semiBold, fontSize: 10, marginTop: 4 },
  divider: { width: 1, height: 30, backgroundColor: 'rgba(5,34,36,0.17)' },
  chartCard: { backgroundColor: colors.white, borderRadius: 20, padding: 15, marginBottom: 18 },
  chartBody: { flexDirection: 'row', height: 145, marginTop: 3 },
  yAxis: { width: 35, justifyContent: 'space-between', paddingBottom: 20 },
  chart: { flex: 1, borderBottomWidth: 1, borderBottomColor: colors.line, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: 20, borderLeftWidth: 1, borderLeftColor: colors.line },
  barGroup: { flex: 1, height: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 3, position: 'relative' },
  bar: { width: 8, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: '#4B95EC' },
  barAlt: { backgroundColor: colors.primary },
  weekLabel: { position: 'absolute', bottom: -17, color: colors.muted, fontFamily: fonts.medium, fontSize: 7 },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 18, marginTop: 10 },
  legendItem: { flexDirection: 'row', gap: 5, alignItems: 'center' },
  legendBlue: { width: 7, height: 7, borderRadius: 3, backgroundColor: '#4B95EC' },
  legendGreen: { width: 7, height: 7, borderRadius: 3, backgroundColor: colors.primary },
  legendText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8 },
});
