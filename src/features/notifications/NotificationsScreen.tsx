import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Icon, { IconName } from '../../components/finance/Icon';
import { FinanceLayout, PageHeader } from '../../components/finance/primitives';
import { colors, fonts } from '../../theme';

const groups: { label: string; items: { title: string; detail: string; time: string; icon: IconName; amount?: string }[] }[] = [
  { label: 'Today', items: [
    { title: 'Reminder!', detail: 'Set up automatic savings to meet your goals.', time: '17:00 · April 24', icon: 'bell' },
    { title: 'New update', detail: 'Your monthly spending summary is ready.', time: '12:40 · April 24', icon: 'check' },
  ] },
  { label: 'Yesterday', items: [
    { title: 'Transactions', detail: 'A new transaction has been registered.', time: 'Groceries · Pantry', icon: 'transactions', amount: '-$100.00' },
    { title: 'Reminder!', detail: 'You are close to your weekly food limit.', time: '09:30 · April 23', icon: 'bell' },
  ] },
  { label: 'This weekend', items: [
    { title: 'Expense record', detail: 'Review your spending for the week.', time: 'Saturday · April 20', icon: 'analysis' },
    { title: 'Transactions', detail: 'Your monthly salary arrived.', time: 'Salary · Monthly', icon: 'wallet', amount: '+$4,000.00' },
  ] },
];

export default function NotificationsScreen() {
  return <FinanceLayout active="transactions">
    <PageHeader title="Notification" onBack={() => router.back()} />
    {groups.map((group) => <View key={group.label}>
      <Text style={styles.group}>{group.label}</Text>
      {group.items.map((item, index) => <View key={item.title + index} style={styles.row}>
        <View style={styles.icon}><Icon name={item.icon} size={19} color={colors.dark} /></View>
        <View style={styles.body}><Text style={styles.title}>{item.title}</Text><Text style={styles.detail}>{item.detail}</Text>
          {item.amount ? <Text style={styles.amount}>{item.time}  |  {item.amount}</Text> : <Text style={styles.time}>{item.time}</Text>}
        </View>
      </View>)}
    </View>)}
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  group: { color: colors.dark, fontFamily: fonts.medium, fontSize: 10, marginTop: 12, marginBottom: 3, marginLeft: 6 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#B7E8CD' },
  icon: { width: 38, height: 38, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1 },
  title: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 12 },
  detail: { color: colors.text, fontFamily: fonts.medium, fontSize: 9, lineHeight: 14, marginTop: 2 },
  time: { color: colors.blue, fontFamily: fonts.medium, fontSize: 8, textAlign: 'right', marginTop: 7 },
  amount: { color: colors.blue, fontFamily: fonts.medium, fontSize: 8, textAlign: 'right', marginTop: 5 }
});
