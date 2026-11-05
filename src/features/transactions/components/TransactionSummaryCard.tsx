import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { TransactionType } from '../types';
import { fonts } from '../../../theme/fonts';
import { transactionPalette as palette } from '../palette';
import MetricArrow from './MetricArrow';

type Props = { type: TransactionType; selected: boolean; onPress: () => void };

export default function TransactionSummaryCard({ type, selected, onPress }: Props) {
  const isIncome = type === 'income';
  const label = isIncome ? 'Income' : 'Expense';
  const amount = isIncome ? '$4,120.00' : '$1,187.40';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label} transactions`}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.card, selected && styles.selectedCard]}
    >
      <MetricArrow direction={type} active={selected} />
      <Text style={[styles.label, selected && styles.selectedText]}>{label}</Text>
      <Text style={[styles.amount, isIncome ? styles.income : styles.expense, selected && styles.selectedText]}>{amount}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minHeight: 102, borderRadius: 15, backgroundColor: palette.background, alignItems: 'center', justifyContent: 'center', paddingVertical: 8 },
  selectedCard: { backgroundColor: palette.blue },
  label: { color: palette.ink, fontFamily: fonts.medium, fontSize: 13, lineHeight: 18, marginTop: 1 },
  amount: { fontFamily: fonts.bold, fontSize: 17, lineHeight: 21 },
  income: { color: palette.ink },
  expense: { color: palette.blue },
  selectedText: { color: '#FFFFFF' },
});
