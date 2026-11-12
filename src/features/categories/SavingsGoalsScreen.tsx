import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Icon from '../../components/finance/Icon';
import { FinanceLayout, PageHeader, PrimaryButton } from '../../components/finance/primitives';
import { colors, fonts } from '../../theme';

const goals = [
  { key: 'travel', name: 'Travel', amount: '$1,962.93', saved: '$653.31', progress: '33%', icon: 'bus' as const },
  { key: 'new-house', name: 'New House', amount: '$569,200', saved: '$625.48', progress: '11%', icon: 'rent' as const },
  { key: 'car', name: 'Car', amount: '$14,390', saved: '$595.26', progress: '50%', icon: 'car' as const },
  { key: 'wedding', name: 'Wedding', amount: '$34,700', saved: '$296.25', progress: '30%', icon: 'gift' as const },
];
export default function SavingsGoalsScreen() {
  return <FinanceLayout active="categories">
    <PageHeader title="Savings" onBack={() => router.back()} notification />
    <Text style={styles.balanceLabel}>Total balance</Text><Text style={styles.balance}>$7,783.00</Text>
    <View style={styles.goalGrid}>{goals.map((goal) => <Pressable key={goal.key} onPress={() => router.push(('/saving-goals/' + goal.key) as never)} style={styles.goal}>
      <View style={styles.progress}><Text style={styles.progressText}>{goal.progress}</Text></View><View style={styles.icon}><Icon name={goal.icon} color={colors.white} size={21} /></View>
      <Text style={styles.goalName}>{goal.name}</Text><Text style={styles.goalAmount}>{goal.amount}</Text><Text style={styles.goalSaved}>{goal.saved} saved</Text>
    </Pressable>)}</View>
    <PrimaryButton title="Add more" icon="plus" onPress={() => router.push('/categories/new' as never)} style={styles.add} />
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  balanceLabel: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, textAlign: 'center', marginTop: 5 },
  balance: { color: colors.dark, fontFamily: fonts.bold, fontSize: 22, textAlign: 'center', marginBottom: 15 },
  goalGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  goal: { width: '48%', minHeight: 158, backgroundColor: '#DFF8E4', borderRadius: 20, alignItems: 'center', padding: 12 },
  progress: { width: 43, height: 43, borderRadius: 22, borderWidth: 4, borderColor: colors.blue, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
  progressText: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 8 },
  icon: { width: 38, height: 38, borderRadius: 13, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center', marginTop: 5 },
  goalName: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 10, marginTop: 5 },
  goalAmount: { color: colors.dark, fontFamily: fonts.medium, fontSize: 9, marginTop: 2 },
  goalSaved: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8, marginTop: 2 },
  add: { marginTop: 14 }
});
