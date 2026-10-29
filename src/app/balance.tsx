import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors, fonts } from '../ui';
import {
  BalanceOverview,
  FinanceLayout,
  PageHeader,
  SectionHeading,
  TransactionList,
} from '../components/finance/Primitives';

export default function BalanceScreen() {
  return (
    <FinanceLayout active="home">
      <PageHeader title="Account Balance" onBack={() => router.back()} />
      <BalanceOverview />
      <View style={styles.breakdown}>
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownLabel}>Income</Text>
          <Text style={styles.breakdownAmount}>$4,120.00</Text>
          <Text style={styles.breakdownNote}>This month</Text>
        </View>
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownLabel}>Expense</Text>
          <Text style={[styles.breakdownAmount, { color: '#5B9BE3' }]}>$1,187.40</Text>
          <Text style={styles.breakdownNote}>This month</Text>
        </View>
      </View>
      <View style={styles.dateRow}><Text style={styles.month}>April</Text><Text style={styles.date}>Apr 1 – Apr 30</Text></View>
      <SectionHeading title="Transactions" action="See all" />
      <TransactionList />
    </FinanceLayout>
  );
}

const styles = StyleSheet.create({
  breakdown: { flexDirection: 'row', gap: 11, marginBottom: 19 },
  breakdownCard: { flex: 1, borderRadius: 17, padding: 14, backgroundColor: colors.white, minHeight: 91 },
  breakdownLabel: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9 },
  breakdownAmount: { color: '#159F79', fontFamily: fonts.semiBold, fontSize: 15, marginTop: 7 },
  breakdownNote: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8, marginTop: 3 },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  month: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 13 },
  date: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9 },
});
