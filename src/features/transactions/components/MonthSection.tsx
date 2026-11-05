import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '../../../components/finance/Icon';
import { fonts } from '../../../theme/fonts';
import type { Transaction } from '../types';
import { transactionPalette as palette } from '../palette';
import TransactionRow from './TransactionRow';

type Props = { month: string; items: Transaction[]; showCalendar?: boolean };

export default function MonthSection({ month, items, showCalendar = false }: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{month}</Text>
        {showCalendar ? (
          <View style={styles.calendar}>
            <Icon name="calendar" size={20} color={palette.ink} />
          </View>
        ) : null}
      </View>
      {items.map((item) => <TransactionRow key={item.id} item={item} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 10 },
  header: { minHeight: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  title: { color: palette.ink, fontFamily: fonts.medium, fontSize: 14, paddingTop: 2 },
  calendar: { width: 32, height: 32, borderRadius: 12, backgroundColor: palette.mint, alignItems: 'center', justifyContent: 'center', marginTop: -1 },
});
