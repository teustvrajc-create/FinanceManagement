import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../../../components/finance/Icon';
import { fonts } from '../../../theme/fonts';
import { ChartEntry, Period } from '../types';
import { analysisPalette as palette } from '../palette';

type Props = {
  period: Period;
  data: ChartEntry[];
  onSearch: () => void;
  onCyclePeriod: () => void;
};

export default function IncomeExpenseChart({ period, data, onSearch, onCyclePeriod }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Income &amp; Expenses</Text>
        <View style={styles.actions}>
          <Pressable accessibilityRole="button" accessibilityLabel="Search transactions" onPress={onSearch} style={styles.action}>
            <Icon name="search" size={18} color={palette.ink} />
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Change chart period" onPress={onCyclePeriod} style={styles.action}>
            <Icon name="calendar" size={17} color={palette.ink} />
          </Pressable>
        </View>
      </View>
      <View accessibilityLabel={`${period} income and expenses chart`} style={styles.chartRow}>
        <View style={styles.axis}>
          {['15k', '10k', '5k', '1k'].map((label) => <Text key={label} style={styles.axisLabel}>{label}</Text>)}
        </View>
        <View style={styles.plot}>
          <View pointerEvents="none" style={styles.gridLines}>
            {[0, 1, 2, 3].map((line) => <View key={line} style={styles.gridLine} />)}
          </View>
          <View style={styles.barGroups}>
            {data.map((item) => (
              <View key={item.label} style={styles.barGroup}>
                <View style={styles.bars}>
                  <View style={[styles.bar, styles.incomeBar, { height: `${item.income}%` }]} />
                  <View style={[styles.bar, styles.expenseBar, { height: `${item.expense}%` }]} />
                </View>
              </View>
            ))}
          </View>
          <View style={styles.dayLabels}>
            {data.map((item) => <Text key={item.label} numberOfLines={1} style={styles.dayLabel}>{item.label}</Text>)}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: palette.card, borderRadius: 32, paddingHorizontal: 17, paddingTop: 14, paddingBottom: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { color: palette.ink, fontFamily: fonts.semiBold, fontSize: 14 },
  actions: { flexDirection: 'row', gap: 5 },
  action: { width: 30, height: 30, borderRadius: 15, backgroundColor: palette.mint, alignItems: 'center', justifyContent: 'center' },
  chartRow: { flexDirection: 'row', height: 145, marginTop: 4 },
  axis: { width: 26, height: 114, justifyContent: 'space-between', paddingTop: 2, paddingBottom: 2 },
  axisLabel: { color: palette.muted, fontFamily: fonts.medium, fontSize: 9, lineHeight: 11 },
  plot: { flex: 1, height: 145 },
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
});
