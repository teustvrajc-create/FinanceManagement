import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import Icon from './Icon';
import FinanceTabBar from './FinanceTabBar';
import { fonts } from '../../ui';

const palette = {
  mint: '#00C99A',
  ink: '#052F35',
  page: '#F1FFF3',
  card: '#DFF5E2',
  blue: '#087BFF',
  muted: '#7DC1FF',
};

const periods = ['Daily', 'Weekly', 'Monthly', 'Year'] as const;
type Period = (typeof periods)[number];

const chartData: Record<Period, { label: string; income: number; expense: number }[]> = {
  Daily: [
    { label: 'Mon', income: 46, expense: 76 },
    { label: 'Tue', income: 18, expense: 46 },
    { label: 'Wed', income: 76, expense: 23 },
    { label: 'Thu', income: 11, expense: 57 },
    { label: 'Fri', income: 98, expense: 87 },
    { label: 'Sat', income: 34, expense: 18 },
    { label: 'Sun', income: 37, expense: 65 },
  ],
  Weekly: [
    { label: 'W1', income: 55, expense: 72 },
    { label: 'W2', income: 35, expense: 86 },
    { label: 'W3', income: 91, expense: 44 },
    { label: 'W4', income: 68, expense: 58 },
    { label: 'W5', income: 43, expense: 70 },
    { label: 'W6', income: 82, expense: 33 },
    { label: 'W7', income: 61, expense: 52 },
  ],
  Monthly: [
    { label: 'Jan', income: 72, expense: 58 },
    { label: 'Feb', income: 62, expense: 76 },
    { label: 'Mar', income: 88, expense: 54 },
    { label: 'Apr', income: 76, expense: 66 },
    { label: 'May', income: 94, expense: 71 },
    { label: 'Jun', income: 67, expense: 51 },
    { label: 'Jul', income: 82, expense: 60 },
  ],
  Year: [
    { label: 'Jan', income: 44, expense: 39 },
    { label: 'Mar', income: 58, expense: 47 },
    { label: 'May', income: 69, expense: 62 },
    { label: 'Jul', income: 81, expense: 55 },
    { label: 'Sep', income: 75, expense: 68 },
    { label: 'Nov', income: 93, expense: 73 },
    { label: 'Dec', income: 86, expense: 61 },
  ],
};

function TargetCard({ title, progress }: { title: string; progress: number }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  return (
    <View style={styles.targetCard}>
      <View style={styles.progressRing}>
        <Svg width={72} height={72} viewBox="0 0 72 72">
          <Circle cx={36} cy={36} r={radius} fill="none" stroke="#F4FFF5" strokeWidth={3.5} />
          <Circle
            cx={36}
            cy={36}
            r={radius}
            fill="none"
            stroke={palette.blue}
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference * (1 - progress / 100)}
            transform="rotate(-90 36 36)"
          />
        </Svg>
        <Text style={styles.targetProgress}>{progress}%</Text>
      </View>
      <Text style={styles.targetName}>{title}</Text>
    </View>
  );
}

function Chart({ period }: { period: Period }) {
  const values = chartData[period];
  return (
    <View style={styles.chartRow}>
      <View style={styles.axis}>
        {['15k', '10k', '5k', '1k'].map((label) => (
          <Text key={label} style={styles.axisLabel}>{label}</Text>
        ))}
      </View>
      <View style={styles.chartPlot}>
        <View pointerEvents="none" style={styles.gridLines}>
          {[0, 1, 2, 3].map((line) => <View key={line} style={styles.gridLine} />)}
        </View>
        <View style={styles.barGroups}>
          {values.map((item) => (
            <View key={item.label} style={styles.barGroup}>
              <View style={styles.bars}>
                <View style={[styles.bar, styles.incomeBar, { height: `${item.income}%` }]} />
                <View style={[styles.bar, styles.expenseBar, { height: `${item.expense}%` }]} />
              </View>
            </View>
          ))}
        </View>
        <View style={styles.dayLabels}>
          {values.map((item) => <Text key={item.label} numberOfLines={1} style={styles.dayLabel}>{item.label}</Text>)}
        </View>
      </View>
    </View>
  );
}

export default function AnalysisDashboard() {
  const router = useRouter();
  const [period, setPeriod] = useState<Period>('Daily');

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.headerBar}>
          <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} hitSlop={10} style={styles.headerButton}>
            <Icon name="back" size={25} color="#F4FFF7" />
          </Pressable>
          <Text style={styles.title}>Analysis</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Notifications" onPress={() => router.push('/transactions' as never)} style={styles.notificationButton}>
            <Icon name="bell" size={19} color={palette.ink} />
          </Pressable>
        </View>

        <View style={styles.balanceStats}>
          <View style={styles.balanceMetric}>
            <View style={styles.metricLabelRow}>
              <Text style={styles.metricArrow}>↗</Text>
              <Text style={styles.metricLabel}>Total Balance</Text>
            </View>
            <Text style={styles.balanceAmount}>$7,783.00</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.balanceMetric}>
            <View style={styles.metricLabelRow}>
              <Text style={styles.metricArrow}>↘</Text>
              <Text style={styles.metricLabel}>Total Expense</Text>
            </View>
            <Text style={styles.expenseAmount}>-$1,187.40</Text>
          </View>
        </View>

        <View style={styles.budgetTrack}>
          <View style={styles.budgetFill}><Text style={styles.budgetPercent}>30%</Text></View>
          <Text style={styles.budgetLimit}>$20,000.00</Text>
        </View>
        <View style={styles.budgetNote}>
          <View style={styles.checkBox}><Text style={styles.checkMark}>✓</Text></View>
          <Text style={styles.budgetNoteText}>30% Of Your Expenses, Looks Good.</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.periodTabs}>
            {periods.map((item) => {
              const selected = period === item;
              return (
                <Pressable
                  key={item}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => setPeriod(item)}
                  style={[styles.periodTab, selected && styles.periodTabActive]}
                >
                  <Text style={[styles.periodText, selected && styles.periodTextActive]}>{item}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartCardHeader}>
              <Text style={styles.chartTitle}>Income &amp; Expenses</Text>
              <View style={styles.chartActions}>
                <Pressable accessibilityRole="button" accessibilityLabel="Search transactions" onPress={() => router.push('/transactions' as never)} style={styles.chartAction}>
                  <Icon name="search" size={18} color={palette.ink} />
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Change chart period"
                  onPress={() => setPeriod((value) => periods[(periods.indexOf(value) + 1) % periods.length])}
                  style={styles.chartAction}
                >
                  <Icon name="calendar" size={17} color={palette.ink} />
                </Pressable>
              </View>
            </View>
            <Chart period={period} />
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryIcon, styles.summaryIconIncome]}><Text style={styles.summaryArrow}>↗</Text></View>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={styles.summaryIncome}>$4,120.00</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryIcon, styles.summaryIconExpense]}><Text style={[styles.summaryArrow, styles.summaryArrowExpense]}>↘</Text></View>
              <Text style={styles.summaryLabel}>Expense</Text>
              <Text style={styles.summaryExpense}>$1,187.40</Text>
            </View>
          </View>

          <Text style={styles.targetsHeading}>My Targets</Text>
          <View style={styles.targetsRow}>
            <TargetCard title="Travel" progress={30} />
            <TargetCard title="Car" progress={50} />
          </View>
        </ScrollView>

        <FinanceTabBar active="analysis" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.mint },
  header: { backgroundColor: palette.mint, paddingHorizontal: 25, paddingTop: 4, paddingBottom: 36 },
  headerBar: { height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerButton: { width: 40, height: 40, alignItems: 'flex-start', justifyContent: 'center' },
  title: { color: palette.ink, fontFamily: fonts.semiBold, fontSize: 18 },
  notificationButton: { width: 34, height: 34, borderRadius: 18, backgroundColor: '#E7FFF2', alignItems: 'center', justifyContent: 'center' },
  balanceStats: { flexDirection: 'row', alignItems: 'center', marginTop: 24 },
  balanceMetric: { flex: 1, paddingLeft: 13 },
  metricLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metricArrow: { color: palette.ink, fontSize: 12, borderWidth: 1, borderColor: palette.ink, borderRadius: 3, width: 12, height: 12, textAlign: 'center', lineHeight: 11 },
  metricLabel: { color: '#073B3B', fontFamily: fonts.medium, fontSize: 11 },
  balanceAmount: { color: '#FFFFFF', fontFamily: fonts.bold, fontSize: 23, lineHeight: 30, marginTop: 2 },
  expenseAmount: { color: palette.blue, fontFamily: fonts.bold, fontSize: 23, lineHeight: 30, marginTop: 2 },
  statsDivider: { width: 1, height: 42, backgroundColor: 'rgba(4,58,53,0.28)', marginHorizontal: 6 },
  budgetTrack: { height: 24, borderRadius: 15, backgroundColor: '#F3FFF5', marginHorizontal: 8, marginTop: 12, justifyContent: 'center' },
  budgetFill: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%', minWidth: 56, borderRadius: 15, backgroundColor: '#042F35', alignItems: 'center', justifyContent: 'center' },
  budgetPercent: { color: '#F6FFF8', fontFamily: fonts.medium, fontSize: 10 },
  budgetLimit: { position: 'absolute', right: 11, color: palette.ink, fontFamily: fonts.semiBold, fontSize: 11 },
  budgetNote: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 10, marginLeft: 14 },
  checkBox: { width: 13, height: 13, borderRadius: 2, borderWidth: 1, borderColor: palette.ink, alignItems: 'center', justifyContent: 'center' },
  checkMark: { color: palette.ink, fontSize: 9, lineHeight: 11 },
  budgetNoteText: { color: palette.ink, fontFamily: fonts.medium, fontSize: 12 },
  panel: { flex: 1, minHeight: 0, backgroundColor: palette.page, borderTopLeftRadius: 58, borderTopRightRadius: 58, overflow: 'hidden' },
  content: { paddingHorizontal: 24, paddingTop: 25, paddingBottom: 18 },
  periodTabs: { height: 49, padding: 4, borderRadius: 18, backgroundColor: palette.card, flexDirection: 'row', alignItems: 'center', marginBottom: 26 },
  periodTab: { flex: 1, height: 40, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  periodTabActive: { backgroundColor: palette.mint },
  periodText: { color: palette.ink, fontFamily: fonts.medium, fontSize: 12 },
  periodTextActive: { fontFamily: fonts.semiBold },
  chartCard: { backgroundColor: palette.card, borderRadius: 32, paddingHorizontal: 17, paddingTop: 14, paddingBottom: 16 },
  chartCardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chartTitle: { color: palette.ink, fontFamily: fonts.semiBold, fontSize: 14 },
  chartActions: { flexDirection: 'row', gap: 5 },
  chartAction: { width: 30, height: 30, borderRadius: 15, backgroundColor: palette.mint, alignItems: 'center', justifyContent: 'center' },
  chartRow: { flexDirection: 'row', height: 145, marginTop: 4 },
  axis: { width: 26, height: 114, justifyContent: 'space-between', paddingTop: 2, paddingBottom: 2 },
  axisLabel: { color: palette.muted, fontFamily: fonts.medium, fontSize: 9, lineHeight: 11 },
  chartPlot: { flex: 1, height: 145 },
  gridLines: { position: 'absolute', top: 0, left: 0, right: 0, height: 114, justifyContent: 'space-between' },
  gridLine: { borderTopWidth: 1, borderStyle: 'dotted', borderColor: '#8FCBFF', width: '100%' },
  barGroups: { height: 114, flexDirection: 'row', alignItems: 'stretch' },
  barGroup: { flex: 1, alignItems: 'center' },
  bars: { height: '100%', flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  bar: { width: 5, borderTopLeftRadius: 4, borderTopRightRadius: 4, maxHeight: '90%' },
  incomeBar: { backgroundColor: palette.mint },
  expenseBar: { backgroundColor: palette.blue },
  dayLabels: { height: 20, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', borderTopWidth: 1, borderColor: '#6B918A' },
  dayLabel: { flex: 1, textAlign: 'center', color: palette.ink, fontFamily: fonts.medium, fontSize: 9 },
  summaryRow: { flexDirection: 'row', marginTop: 24, marginBottom: 23 },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryIcon: { width: 24, height: 24, borderWidth: 1.5, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginBottom: 5 },
  summaryIconIncome: { borderColor: palette.mint },
  summaryIconExpense: { borderColor: palette.blue },
  summaryArrow: { fontSize: 19, lineHeight: 21, color: palette.mint, marginTop: -2 },
  summaryArrowExpense: { color: palette.blue },
  summaryLabel: { color: palette.ink, fontFamily: fonts.medium, fontSize: 13 },
  summaryIncome: { color: palette.ink, fontFamily: fonts.bold, fontSize: 18, lineHeight: 24 },
  summaryExpense: { color: palette.blue, fontFamily: fonts.bold, fontSize: 18, lineHeight: 24 },
  targetsHeading: { color: palette.ink, fontFamily: fonts.medium, fontSize: 14, marginBottom: 14 },
  targetsRow: { flexDirection: 'row', gap: 12 },
  targetCard: { flex: 1, minHeight: 130, borderRadius: 34, backgroundColor: '#69B3F4', alignItems: 'center', justifyContent: 'center', paddingVertical: 10 },
  progressRing: { width: 72, height: 72, alignItems: 'center', justifyContent: 'center' },
  targetProgress: { position: 'absolute', color: '#FFFFFF', fontFamily: fonts.semiBold, fontSize: 18 },
  targetName: { color: '#FFFFFF', fontFamily: fonts.medium, fontSize: 12, marginTop: 3 },
});
