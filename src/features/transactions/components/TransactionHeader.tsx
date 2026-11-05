import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../../../components/finance/Icon';
import { fonts } from '../../../theme/fonts';
import type { TransactionType } from '../types';
import { transactionPalette as palette } from '../palette';
import TransactionSummaryCard from './TransactionSummaryCard';

type Props = { activeMode: 'all' | TransactionType; onBack: () => void; onSelectMode: (mode: TransactionType) => void };

export default function TransactionHeader({ activeMode, onBack, onSelectMode }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.navRow}>
        <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack} hitSlop={10} style={styles.backButton}>
          <Icon name="back" size={24} color="#F4FFF7" />
        </Pressable>
        <Text style={styles.title}>Transaction</Text>
        <View style={styles.notification}>
          <Icon name="bell" size={18} color={palette.ink} />
        </View>
      </View>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>$7,783.00</Text>
      </View>
      <View style={styles.summaryRow}>
        <TransactionSummaryCard type="income" selected={activeMode === 'income'} onPress={() => onSelectMode('income')} />
        <TransactionSummaryCard type="expense" selected={activeMode === 'expense'} onPress={() => onSelectMode('expense')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 36, paddingTop: 7, paddingBottom: 30, backgroundColor: palette.mint },
  navRow: { height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backButton: { width: 36, height: 36, alignItems: 'flex-start', justifyContent: 'center' },
  title: { color: palette.ink, fontFamily: fonts.semiBold, fontSize: 18 },
  notification: { width: 32, height: 32, borderRadius: 16, backgroundColor: palette.background, alignItems: 'center', justifyContent: 'center' },
  balanceCard: { height: 74, borderRadius: 14, backgroundColor: palette.background, alignItems: 'center', justifyContent: 'center', marginBottom: 17 },
  balanceLabel: { color: palette.ink, fontFamily: fonts.medium, fontSize: 11 },
  balanceAmount: { color: palette.ink, fontFamily: fonts.bold, fontSize: 23, lineHeight: 29, marginTop: 1 },
  summaryRow: { flexDirection: 'row', gap: 14 },
});
