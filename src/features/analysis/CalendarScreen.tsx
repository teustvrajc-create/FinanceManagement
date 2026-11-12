import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { PageHeader, FinanceLayout } from '../../components/finance/primitives';
import Icon from '../../components/finance/Icon';
import { colors, fonts } from '../../theme';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function CalendarScreen() {
  const [month, setMonth] = useState(new Date(2023, 3, 1));
  const [selectedDay, setSelectedDay] = useState(24);
  const [mode, setMode] = useState<'Spends' | 'Categories'>('Spends');
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const label = month.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const days = useMemo(() => {
    const first = new Date(year, monthIndex, 1).getDay();
    const total = new Date(year, monthIndex + 1, 0).getDate();
    return [...Array(first).fill(0), ...Array.from({ length: total }, (_, index) => index + 1)];
  }, [monthIndex, year]);
  const changeMonth = (offset: number) => setMonth(new Date(year, monthIndex + offset, 1));
  return <FinanceLayout active="analysis">
    <PageHeader title="Calendar" onBack={() => router.back()} notification />
    <View style={styles.calendarCard}>
      <View style={styles.monthRow}><Pressable onPress={() => changeMonth(-1)}><Icon name="back" size={19} color={colors.dark} /></Pressable><Text style={styles.month}>{label}</Text><Pressable onPress={() => changeMonth(1)}><Text style={styles.next}>›</Text></Pressable></View>
      <View style={styles.grid}>{weekDays.map((day, i) => <Text key={day + i} style={styles.weekday}>{day}</Text>)}
        {days.map((day, index) => <Pressable key={String(index)} disabled={!day} onPress={() => setSelectedDay(day)} style={[styles.dayCell, day === selectedDay && styles.selectedDay]}><Text style={[styles.dayText, day === selectedDay && styles.selectedDayText]}>{day || ''}</Text>{day === 24 ? <View style={styles.dot} /> : null}</Pressable>)}
      </View>
    </View>
    <View style={styles.switcher}>{(['Spends', 'Categories'] as const).map((item) => <Pressable key={item} onPress={() => setMode(item)} style={[styles.switch, item === mode && styles.switchActive]}><Text style={[styles.switchText, item === mode && styles.switchActiveText]}>{item}</Text></Pressable>)}</View>
    {mode === 'Categories' ? <View style={styles.breakdown}>
      <View style={styles.pie}><Text style={styles.pieValue}>$1,187</Text><Text style={styles.pieLabel}>Spent</Text></View>
      <View style={styles.legend}>{[['Groceries', '79%', '#1677F2'], ['Others', '21%', '#00D09E']].map(([name, amount, color]) => <View key={name} style={styles.legendRow}><View style={[styles.legendDot, { backgroundColor: color }]} /><Text style={styles.legendName}>{name}</Text><Text style={styles.legendAmount}>{amount}</Text></View>)}</View>
    </View> : <View style={styles.dailyCard}><Text style={styles.selectedLabel}>Transactions on {label.split(' ')[0]} {selectedDay}</Text><Text style={styles.total}>−$100.00</Text><Pressable onPress={() => router.push('/transactions/expense' as never)} style={styles.transaction}><View style={styles.foodIcon}><Icon name="groceries" size={19} color={colors.white} /></View><View style={styles.transactionText}><Text style={styles.transactionTitle}>Groceries</Text><Text style={styles.transactionSub}>17:00 · Pantry</Text></View><Text style={styles.amount}>−$100.00</Text></Pressable></View>}
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  calendarCard: { backgroundColor: colors.white, borderRadius: 22, padding: 15 },
  monthRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 13 },
  month: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 12 },
  next: { color: colors.dark, fontSize: 26, lineHeight: 28, paddingHorizontal: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  weekday: { width: '14.285%', textAlign: 'center', color: colors.muted, fontFamily: fonts.medium, fontSize: 9, paddingBottom: 8 },
  dayCell: { width: '14.285%', height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 18 },
  selectedDay: { backgroundColor: colors.primary },
  dayText: { color: colors.dark, fontFamily: fonts.medium, fontSize: 9 },
  selectedDayText: { fontFamily: fonts.semiBold },
  dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: colors.blue, position: 'absolute', bottom: 4 },
  switcher: { flexDirection: 'row', marginTop: 12, padding: 4, backgroundColor: '#DFF7E4', borderRadius: 14 },
  switch: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 11 },
  switchActive: { backgroundColor: colors.primary },
  switchText: { color: colors.dark, fontFamily: fonts.medium, fontSize: 9 },
  switchActiveText: { fontFamily: fonts.semiBold },
  breakdown: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 21, padding: 20, marginTop: 13, gap: 18 },
  pie: { width: 115, height: 115, borderRadius: 58, backgroundColor: '#EAF4FF', borderWidth: 14, borderColor: colors.blue, alignItems: 'center', justifyContent: 'center' },
  pieValue: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 11 },
  pieLabel: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8 },
  legend: { flex: 1, gap: 12 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendName: { flex: 1, color: colors.dark, fontFamily: fonts.medium, fontSize: 9 },
  legendAmount: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 9 },
  dailyCard: { backgroundColor: '#DDF8E2', borderRadius: 20, padding: 15, marginTop: 13 },
  selectedLabel: { color: colors.dark, fontFamily: fonts.medium, fontSize: 10 },
  total: { color: colors.blue, fontFamily: fonts.bold, fontSize: 20, marginVertical: 8 },
  transaction: { flexDirection: 'row', alignItems: 'center', gap: 9, padding: 9, borderRadius: 14, backgroundColor: colors.white },
  foodIcon: { width: 37, height: 37, borderRadius: 13, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center' },
  transactionText: { flex: 1 },
  transactionTitle: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 10 },
  transactionSub: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8, marginTop: 3 },
  amount: { color: colors.blue, fontFamily: fonts.semiBold, fontSize: 9 }
});
