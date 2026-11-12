import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { FinanceLayout, PageHeader } from '../../components/finance/primitives';
import { colors, fonts } from '../../theme';

const settings = ['General Notification', 'Sound', 'Sound Call', 'Vibrate', 'Transaction Update', 'Expense Reminder', 'Budget Notifications', 'Low Balance Alerts'];
export default function NotificationSettingsScreen() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => Object.fromEntries(settings.map((name) => [name, name !== 'Sound Call'])));
  return <FinanceLayout active="profile">
    <PageHeader title="Notification Settings" onBack={() => router.back()} notification />
    <View style={styles.list}>{settings.map((name) => <View key={name} style={styles.row}><Text style={styles.label}>{name}</Text><Switch value={Boolean(enabled[name])} onValueChange={(value) => setEnabled((current) => ({ ...current, [name]: value }))} trackColor={{ false: '#B7DCC8', true: colors.primary }} thumbColor="#FFFFFF" /></View>)}</View>
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  list: { backgroundColor: colors.white, borderRadius: 19, paddingHorizontal: 14 },
  row: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#E7F1E8' },
  label: { color: colors.dark, fontFamily: fonts.medium, fontSize: 10 }
});
