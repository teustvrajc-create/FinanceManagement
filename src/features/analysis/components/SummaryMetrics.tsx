import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fonts } from '../../../theme/fonts';
import { analysisPalette as palette } from '../palette';

function Metric({ label, amount, direction }: { label: string; amount: string; direction: 'income' | 'expense' }) {
  const isIncome = direction === 'income';
  return (
    <View style={styles.item}>
      <View style={[styles.icon, isIncome ? styles.incomeIcon : styles.expenseIcon]}>
        <Text style={[styles.arrow, !isIncome && styles.expenseArrow]}>{isIncome ? '↗' : '↘'}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.amount, !isIncome && styles.expenseAmount]}>{amount}</Text>
    </View>
  );
}

export default function SummaryMetrics() {
  return (
    <View style={styles.row}>
      <Metric direction="income" label="Income" amount="$4,120.00" />
      <Metric direction="expense" label="Expense" amount="$1,187.40" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginTop: 24, marginBottom: 23 },
  item: { flex: 1, alignItems: 'center' },
  icon: { width: 24, height: 24, borderWidth: 1.5, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginBottom: 5 },
  incomeIcon: { borderColor: palette.mint },
  expenseIcon: { borderColor: palette.blue },
  arrow: { fontSize: 19, lineHeight: 21, color: palette.mint, marginTop: -2 },
  expenseArrow: { color: palette.blue },
  label: { color: palette.ink, fontFamily: fonts.medium, fontSize: 13 },
  amount: { color: palette.ink, fontFamily: fonts.bold, fontSize: 18, lineHeight: 24 },
  expenseAmount: { color: palette.blue },
});
