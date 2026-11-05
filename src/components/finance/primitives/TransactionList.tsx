import React from 'react';
import { View } from 'react-native';
import TransactionRow from './TransactionRow';
import { sampleTransactions } from '../../../features/transactions/data/transactions';
import type { Transaction } from '../../../features/transactions/types';

export default function TransactionList({ items = sampleTransactions }: { items?: Transaction[] }) {
  return (
    <View>
      {items.map((item) => <TransactionRow item={item} key={item.id} />)}
    </View>
  );
}
