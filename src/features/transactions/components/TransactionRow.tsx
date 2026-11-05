import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '../../../components/finance/Icon';
import { fonts } from '../../../theme/fonts';
import type { Transaction } from '../types';
import { transactionPalette as palette } from '../palette';

export default function TransactionRow({ item }: { item: Transaction }) {
  const isIncome = item.type === 'income';
  const amount = item.amount.startsWith('+') ? item.amount.slice(1) : item.amount;

  return (
    <View style={styles.row}>
      <View style={[styles.icon, { backgroundColor: item.color }]}>
        <Icon name={item.icon} size={25} color="#FFFFFF" />
      </View>
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
        <Text numberOfLines={1} style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.category}>
        <Text numberOfLines={1} style={styles.categoryText}>{item.detail}</Text>
      </View>
      <View style={styles.divider} />
      <Text numberOfLines={1} style={[styles.amount, isIncome && styles.incomeAmount]}>{amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 72, flexDirection: 'row', alignItems: 'center', gap: 8 },
  icon: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1, minWidth: 78, justifyContent: 'center' },
  title: { color: palette.ink, fontFamily: fonts.medium, fontSize: 14, lineHeight: 19 },
  date: { color: palette.blue, fontFamily: fonts.medium, fontSize: 9, lineHeight: 14 },
  divider: { width: 1, height: 38, backgroundColor: palette.mint },
  category: { width: 72, alignItems: 'center', paddingHorizontal: 3 },
  categoryText: { color: palette.ink, fontFamily: fonts.medium, fontSize: 10 },
  amount: { width: 78, textAlign: 'right', color: palette.blue, fontFamily: fonts.medium, fontSize: 11 },
  incomeAmount: { color: palette.ink },
});
