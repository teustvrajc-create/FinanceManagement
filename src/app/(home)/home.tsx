import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Icon from '../../components/finance/Icon';
import {
  BalanceOverview,
  FinanceLayout,
  PrimaryButton,
  SectionHeading,
  TransactionList,
} from '../../components/finance/Primitives';
import { colors, fonts } from '../../ui';

const periods = ['Daily', 'Weekly', 'Monthly'] as const;

export default function HomeScreen() {
  const [period, setPeriod] = useState<(typeof periods)[number]>('Monthly');
  return (
    <FinanceLayout active="home">
      <View style={styles.welcomeRow}>
        <View>
          <Text style={styles.welcomeText}>Hi, Welcome Back</Text>
          <Text style={styles.greeting}>Good morning</Text>
        </View>
        <Pressable accessibilityLabel="Notifications" onPress={() => router.push('/transactions' as never)} style={styles.notification}>
          <Icon name="bell" size={19} color={colors.dark} />
          <View style={styles.dot} />
        </Pressable>
      </View>

      <BalanceOverview onPress={() => router.push('/balance' as never)} />

      <Pressable onPress={() => router.push('/analysis' as never)} style={styles.insightsCard}>
        <View style={styles.insight}>
          <View style={styles.insightIcon}><Icon name="savings" size={20} color="#168E79" /></View>
          <View style={styles.insightText}>
            <Text style={styles.insightLabel}>Savings on Goals</Text>
            <Text style={styles.insightTitle}>Revenue Last Week</Text>
            <Text style={styles.insightAmount}>+$4,000.00</Text>
          </View>
        </View>
        <View style={styles.insightDivider} />
        <View style={styles.insight}>
          <View style={styles.insightIcon}><Icon name="food" size={20} color="#168E79" /></View>
          <View style={styles.insightText}>
            <Text style={styles.insightLabel}>Food Week</Text>
            <Text style={styles.insightTitle}>Food Last Week</Text>
            <Text style={[styles.insightAmount, { color: '#5B9BE3' }]}>-$100.00</Text>
          </View>
        </View>
      </Pressable>

      <View style={styles.periods}>
        {periods.map((item) => {
          const active = period === item;
          return (
            <Pressable onPress={() => setPeriod(item)} key={item} style={[styles.periodButton, active && styles.periodActive]}>
              <Text style={[styles.periodText, active && styles.periodTextActive]}>{item}</Text>
            </Pressable>
          );
        })}
      </View>

      <SectionHeading title="Recent Transactions" action="See all" />
      <TransactionList items={[
        { title: 'Salary', detail: 'Monthly', date: '12:27 · Apr 30', amount: '+$4,000.00', icon: 'wallet', color: '#67B9F4', category: 'Income' },
        { title: 'Groceries', detail: 'Pantry', date: '17:00 · Apr 24', amount: '-$100.00', icon: 'groceries', color: '#59A5EC', category: 'Food' },
        { title: 'Rent', detail: 'Monthly', date: '8:30 · Apr 15', amount: '-$674.40', icon: 'rent', color: '#2E91F4', category: 'Home' },
      ]} />
      <PrimaryButton title="View all transactions" onPress={() => router.push('/transactions' as never)} backgroundColor={colors.soft} style={styles.viewAll} />
    </FinanceLayout>
  );
}

const styles = StyleSheet.create({
  welcomeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 },
  welcomeText: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 14 },
  greeting: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, marginTop: 2 },
  notification: { width: 38, height: 38, borderRadius: 14, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary, position: 'absolute', right: 8, top: 7 },
  insightsCard: { backgroundColor: '#DDF8E2', borderRadius: 20, padding: 13, flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  insight: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  insightIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#F4FFF5', justifyContent: 'center', alignItems: 'center' },
  insightText: { flex: 1 },
  insightLabel: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 8 },
  insightTitle: { color: colors.muted, fontFamily: fonts.medium, fontSize: 7, marginTop: 4 },
  insightAmount: { color: '#138E74', fontFamily: fonts.semiBold, fontSize: 10, marginTop: 3 },
  insightDivider: { width: 1, height: 47, backgroundColor: '#B9DEC1', marginHorizontal: 9 },
  periods: { flexDirection: 'row', borderRadius: 16, backgroundColor: colors.white, padding: 4, marginBottom: 20 },
  periodButton: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 13 },
  periodActive: { backgroundColor: colors.primary },
  periodText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9 },
  periodTextActive: { color: colors.dark, fontFamily: fonts.semiBold },
  viewAll: { marginTop: 11 },
});
