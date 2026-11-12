import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Icon from '../../components/finance/Icon';
import { FinanceLayout, PageHeader, PrimaryButton, SectionHeading } from '../../components/finance/primitives';
import { colors, fonts } from '../../theme';

const goalData: Record<string, { title: string; total: string; saved: string; icon: 'bus' | 'rent' | 'car' | 'gift'; entries: string[] }> = {
  travel: { title: 'Travel', total: '$1,962.93', saved: '$653.31', icon: 'bus', entries: ['Travel Deposit|Apr 30|$217.77', 'Travel Deposit|Apr 12|$217.77', 'Travel Deposit|Apr 01|$217.77'] },
  'new-house': { title: 'New House', total: '$569,200', saved: '$625.48', icon: 'rent', entries: ['House Deposit|Apr 15|$217.77', 'House Deposit|Feb 12|$102.87', 'House Deposit|Jan 04|$145.64'] },
  car: { title: 'Car', total: '$14,390', saved: '$595.26', icon: 'car', entries: ['Car Deposit|Apr 30|$337.32', 'Car Deposit|Apr 12|$155.94', 'House Deposit|Mar 04|$101.99'] },
  wedding: { title: 'Wedding', total: '$34,700', saved: '$296.25', icon: 'gift', entries: ['Wedding Deposit|Apr 30|$57.32', 'Wedding Deposit|Apr 12|$32.99', 'Wedding Deposit|Apr 01|$155.94'] },
};
export default function SavingsGoalScreen() {
  const { goal } = useLocalSearchParams<{ goal?: string }>();
  const data = goalData[typeof goal === 'string' ? goal : 'travel'] ?? goalData.travel;
  return <FinanceLayout active="categories">
    <PageHeader title={data.title} onBack={() => router.back()} notification />
    <View style={styles.top}><View><Text style={styles.label}>Total balance</Text><Text style={styles.balance}>$7,783.00</Text><Text style={styles.label}>Amount saved</Text><Text style={styles.saved}>{data.saved}</Text></View><View style={styles.goalIcon}><Icon name={data.icon} size={35} color={colors.white} /><Text style={styles.goalName}>{data.title}</Text></View></View>
    <View style={styles.progress}><View style={styles.fill} /><Text style={styles.progressValue}>33%</Text><Text style={styles.goalTotal}>{data.total}</Text></View>
    <Text style={styles.note}>30% of your expenses looks good.</Text>
    <SectionHeading title="April" action="Calendar" />
    {data.entries.map((entry) => { const [title, date, amount] = entry.split('|'); return <View key={entry} style={styles.entry}><View style={styles.entryIcon}><Icon name={data.icon} size={18} color={colors.white} /></View><View style={styles.entryText}><Text style={styles.entryTitle}>{title}</Text><Text style={styles.entryDate}>{date}</Text></View><Text style={styles.entryAmount}>{amount}</Text></View>; })}
    <PrimaryButton title="Add savings" onPress={() => router.push(('/saving-goals/' + goal + '/add') as never)} style={styles.add} />
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.primary, borderRadius: 20, padding: 16 },
  label: { color: colors.dark, fontFamily: fonts.medium, fontSize: 8 },
  balance: { color: colors.white, fontFamily: fonts.bold, fontSize: 18, marginVertical: 3 },
  saved: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 14, marginTop: 3 },
  goalIcon: { width: 86, minHeight: 86, borderRadius: 18, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center' },
  goalName: { color: colors.white, fontFamily: fonts.medium, fontSize: 8, marginTop: 4 },
  progress: { height: 25, borderRadius: 14, backgroundColor: '#E8FFF1', marginTop: 13, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, overflow: 'hidden' },
  fill: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '33%', backgroundColor: colors.primary },
  progressValue: { color: colors.dark, fontFamily: fonts.medium, fontSize: 8 },
  goalTotal: { marginLeft: 'auto', color: colors.dark, fontFamily: fonts.medium, fontSize: 8 },
  note: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8, marginTop: 8 },
  entry: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 10, borderBottomWidth: 1, borderColor: '#D7EDDD' },
  entryIcon: { width: 37, height: 37, borderRadius: 12, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center' },
  entryText: { flex: 1 },
  entryTitle: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 9 },
  entryDate: { color: colors.blue, fontFamily: fonts.medium, fontSize: 8, marginTop: 3 },
  entryAmount: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 9 },
  add: { marginTop: 13 }
});
