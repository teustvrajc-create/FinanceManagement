import React, { useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon, { IconName } from './Icon';
import FinanceTabBar from './FinanceTabBar';
import { fonts } from '../../ui';

type TransactionMode = 'all' | 'income' | 'expense';
type TransactionType = 'income' | 'expense';

type TransactionEntry = {
  month: string;
  title: string;
  date: string;
  detail: string;
  amount: string;
  category: string;
  type: TransactionType;
  icon: IconName;
  iconColor: string;
};

const allTransactions: TransactionEntry[] = [
  { month: 'April', title: 'Salary', date: '18:27 – April 30', detail: 'Monthly', amount: '$4,000.00', category: 'Income', type: 'income', icon: 'wallet', iconColor: '#67B8F5' },
  { month: 'April', title: 'Groceries', date: '17:00 – April 24', detail: 'Pantry', amount: '-$100.00', category: 'Food', type: 'expense', icon: 'groceries', iconColor: '#329AF7' },
  { month: 'April', title: 'Rent', date: '8:30 – April 15', detail: 'Rent', amount: '-$674.40', category: 'Home', type: 'expense', icon: 'rent', iconColor: '#066AFF' },
  { month: 'April', title: 'Transport', date: '7:30 – April 08', detail: 'Fuel', amount: '-$4.13', category: 'Transport', type: 'expense', icon: 'bus', iconColor: '#3896E7' },
  { month: 'March', title: 'Food', date: '19:30 – March 31', detail: 'Dinner', amount: '-$70.40', category: 'Food', type: 'expense', icon: 'food', iconColor: '#67B8F5' },
];

const incomeTransactions: TransactionEntry[] = [
  allTransactions[0],
  { month: 'April', title: 'Others', date: '17:00 – April 24', detail: 'Payments', amount: '$120.00', category: 'Income', type: 'income', icon: 'wallet', iconColor: '#67B8F5' },
  { month: 'March', title: 'Salary', date: '18:39 – March 31', detail: 'Monthly', amount: '$4,000.00', category: 'Income', type: 'income', icon: 'wallet', iconColor: '#67B8F5' },
  { month: 'March', title: 'Others', date: '9:30 – April 12', detail: 'Upwork', amount: '$340.00', category: 'Income', type: 'income', icon: 'wallet', iconColor: '#67B8F5' },
  { month: 'February', title: 'Others', date: '19:30 – March 31', detail: 'Upwork', amount: '$340.00', category: 'Income', type: 'income', icon: 'wallet', iconColor: '#67B8F5' },
];

const expenseTransactions: TransactionEntry[] = [
  allTransactions[1],
  allTransactions[2],
  allTransactions[3],
  allTransactions[4],
  { month: 'March', title: 'Rent', date: '18:39 – March 31', detail: 'Rent', amount: '-$674.40', category: 'Home', type: 'expense', icon: 'rent', iconColor: '#066AFF' },
];

const modeTransactions: Record<TransactionMode, TransactionEntry[]> = {
  all: allTransactions,
  income: incomeTransactions,
  expense: expenseTransactions,
};

function MetricArrow({ direction, active }: { direction: 'income' | 'expense'; active: boolean }) {
  return (
    <View style={[styles.metricArrowBox, active && styles.metricArrowBoxActive]}>
      <Text style={[styles.metricArrow, active && styles.metricArrowActive]}>{direction === 'income' ? '↗' : '↘'}</Text>
    </View>
  );
}

function SummaryCard({
  type,
  selected,
  onPress,
}: {
  type: TransactionType;
  selected: boolean;
  onPress: () => void;
}) {
  const income = type === 'income';
  const label = income ? 'Income' : 'Expense';
  const value = income ? '$4,120.00' : '$1,187.40';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label} transactions`}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.summaryCard, selected && styles.summaryCardSelected]}
    >
      <MetricArrow direction={type} active={selected} />
      <Text style={[styles.summaryLabel, selected && styles.summaryTextSelected]}>{label}</Text>
      <Text style={[
        styles.summaryValue,
        income ? styles.incomeValue : styles.expenseValue,
        selected && styles.summaryTextSelected,
      ]}>{value}</Text>
    </Pressable>
  );
}

function TransactionRow({ item }: { item: TransactionEntry }) {
  const isIncome = item.type === 'income';
  return (
    <View style={styles.transactionRow}>
      <View style={[styles.transactionIcon, { backgroundColor: item.iconColor }]}>
        <Icon name={item.icon} size={25} color="#FFFFFF" />
      </View>
      <View style={styles.transactionInfo}>
        <Text numberOfLines={1} style={styles.transactionTitle}>{item.title}</Text>
        <Text numberOfLines={1} style={styles.transactionDate}>{item.date}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.transactionDetail}>
        <Text numberOfLines={1} style={styles.detailText}>{item.detail}</Text>
      </View>
      <View style={styles.divider} />
      <Text numberOfLines={1} style={[styles.transactionAmount, isIncome && styles.incomeAmount]}>{item.amount}</Text>
    </View>
  );
}

export default function TransactionsDashboard({ mode }: { mode: TransactionMode }) {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const filterCategory = typeof category === 'string' ? category.toLowerCase() : '';
  const entries = useMemo(() => {
    return modeTransactions[mode].filter((item) => (
      !filterCategory ||
      item.category.toLowerCase() === filterCategory ||
      item.title.toLowerCase() === filterCategory
    ));
  }, [filterCategory, mode]);
  const months = useMemo(() => Array.from(new Set(entries.map((item) => item.month))), [entries]);
  const pathForMode = (nextMode: TransactionMode) => nextMode === 'all'
    ? '/transactions'
    : `/transactions/${nextMode}`;

  const selectMode = (nextMode: TransactionType) => {
    if (nextMode === mode) return;
    const href = filterCategory
      ? { pathname: pathForMode(nextMode), params: { category } }
      : pathForMode(nextMode);
    if (mode === 'all') router.push(href as never);
    else router.replace(href as never);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.headerBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.canGoBack() ? router.back() : router.replace('/home' as never)}
            hitSlop={10}
            style={styles.headerAction}
          >
            <Icon name="back" size={24} color="#F4FFF7" />
          </Pressable>
          <Text style={styles.headerTitle}>Transaction</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open profile"
            onPress={() => router.push('/balance' as never)}
            style={[styles.headerAction, styles.notification]}
          >
            <Icon name="bell" size={18} color={palette.ink} />
          </Pressable>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$7,783.00</Text>
        </View>

        <View style={styles.summaryRow}>
          <SummaryCard type="income" selected={mode === 'income'} onPress={() => selectMode('income')} />
          <SummaryCard type="expense" selected={mode === 'expense'} onPress={() => selectMode('expense')} />
        </View>
      </View>

      <View style={styles.panel}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
          {months.length ? months.map((month, index) => (
            <View key={month} style={styles.monthSection}>
              <View style={styles.monthHeader}>
                <Text style={styles.monthTitle}>{month}</Text>
                {index === 0 ? (
                  <View style={styles.calendarButton}>
                    <Icon name="calendar" size={20} color={palette.ink} />
                  </View>
                ) : null}
              </View>
              {entries.filter((item) => item.month === month).map((item, itemIndex) => (
                <TransactionRow key={`${item.month}-${item.title}-${itemIndex}`} item={item} />
              ))}
            </View>
          )) : (
            <Text style={styles.emptyState}>No transactions found.</Text>
          )}
        </ScrollView>
        <FinanceTabBar active="transactions" />
      </View>
    </SafeAreaView>
  );
}

const palette = {
  mint: '#00C99A',
  ink: '#062F35',
  background: '#F1FFF3',
  blue: '#086DFF',
  softBlue: '#67B8F5',
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.mint },
  header: { paddingHorizontal: 36, paddingTop: 7, paddingBottom: 30, backgroundColor: palette.mint },
  headerBar: { height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  headerAction: { width: 36, height: 36, alignItems: 'flex-start', justifyContent: 'center' },
  notification: { alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 16, backgroundColor: '#F1FFF3' },
  headerTitle: { color: palette.ink, fontFamily: fonts.semiBold, fontSize: 18 },
  balanceCard: { height: 74, borderRadius: 14, backgroundColor: palette.background, alignItems: 'center', justifyContent: 'center', marginBottom: 17 },
  balanceLabel: { color: palette.ink, fontFamily: fonts.medium, fontSize: 11 },
  balanceAmount: { color: palette.ink, fontFamily: fonts.bold, fontSize: 23, lineHeight: 29, marginTop: 1 },
  summaryRow: { flexDirection: 'row', gap: 14 },
  summaryCard: { flex: 1, minHeight: 102, borderRadius: 15, backgroundColor: palette.background, alignItems: 'center', justifyContent: 'center', paddingVertical: 8 },
  summaryCardSelected: { backgroundColor: palette.blue },
  metricArrowBox: { width: 25, height: 25, borderWidth: 1.5, borderColor: palette.mint, borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
  metricArrowBoxActive: { borderColor: '#FFFFFF' },
  metricArrow: { color: palette.mint, fontFamily: fonts.semiBold, fontSize: 20, lineHeight: 23, marginTop: -2 },
  metricArrowActive: { color: '#FFFFFF' },
  summaryLabel: { color: palette.ink, fontFamily: fonts.medium, fontSize: 13, lineHeight: 18, marginTop: 1 },
  summaryValue: { fontFamily: fonts.bold, fontSize: 17, lineHeight: 21 },
  incomeValue: { color: palette.ink },
  expenseValue: { color: palette.blue },
  summaryTextSelected: { color: '#FFFFFF' },
  panel: { flex: 1, minHeight: 0, backgroundColor: palette.background, borderTopLeftRadius: 62, borderTopRightRadius: 62, overflow: 'hidden' },
  listContent: { paddingHorizontal: 36, paddingTop: 25, paddingBottom: 22 },
  monthSection: { marginBottom: 10 },
  monthHeader: { minHeight: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  monthTitle: { color: palette.ink, fontFamily: fonts.medium, fontSize: 14, paddingTop: 2 },
  calendarButton: { width: 32, height: 32, borderRadius: 12, backgroundColor: palette.mint, alignItems: 'center', justifyContent: 'center', marginTop: -1 },
  transactionRow: { minHeight: 72, flexDirection: 'row', alignItems: 'center', gap: 8 },
  transactionIcon: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  transactionInfo: { flex: 1, minWidth: 78, justifyContent: 'center' },
  transactionTitle: { color: palette.ink, fontFamily: fonts.medium, fontSize: 14, lineHeight: 19 },
  transactionDate: { color: palette.blue, fontFamily: fonts.medium, fontSize: 9, lineHeight: 14 },
  divider: { width: 1, height: 38, backgroundColor: palette.mint },
  transactionDetail: { width: 72, alignItems: 'center', paddingHorizontal: 3 },
  detailText: { color: palette.ink, fontFamily: fonts.medium, fontSize: 10 },
  transactionAmount: { width: 78, textAlign: 'right', color: palette.blue, fontFamily: fonts.medium, fontSize: 11 },
  incomeAmount: { color: palette.ink },
  emptyState: { color: '#73908F', fontFamily: fonts.medium, textAlign: 'center', paddingVertical: 48 },
});
