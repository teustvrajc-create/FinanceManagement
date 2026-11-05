import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '../Icon';
import type { Transaction } from '../../../features/transactions/types';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

export default function TransactionRow({ item }: { item: Transaction }) {
  const isIncome = item.type === 'income';
  return (
    <View style={styles.row}>
      <View style={[styles.icon, { backgroundColor: item.color }]}><Icon name={item.icon} size={19} color={colors.white} /></View>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.meta}>
        <Text style={styles.detail}>{item.detail}</Text>
        <Text style={[styles.amount, isIncome && styles.income]}>{item.amount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 7 },
  icon: { width: 37, height: 37, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  title: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 11 },
  date: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8, marginTop: 3 },
  meta: { alignItems: 'flex-end', minWidth: 78 },
  detail: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8 },
  amount: { color: '#3C90E4', fontFamily: fonts.semiBold, fontSize: 10, marginTop: 4 },
  income: { color: '#11A77F' },
});
