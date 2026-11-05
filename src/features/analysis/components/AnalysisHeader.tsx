import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../../../components/finance/Icon';
import { fonts } from '../../../theme/fonts';
import { analysisPalette as palette } from '../palette';

type Props = { onBack: () => void; onNotifications: () => void };

export default function AnalysisHeader({ onBack, onNotifications }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.headerBar}>
        <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack} hitSlop={10} style={styles.backButton}>
          <Icon name="back" size={25} color="#F4FFF7" />
        </Pressable>
        <Text style={styles.title}>Analysis</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Notifications" onPress={onNotifications} style={styles.notificationButton}>
          <Icon name="bell" size={19} color={palette.ink} />
        </Pressable>
      </View>

      <View style={styles.balanceStats}>
        <View style={styles.metric}>
          <View style={styles.metricLabelRow}>
            <Text style={styles.metricArrow}>↗</Text>
            <Text style={styles.metricLabel}>Total Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>$7,783.00</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.metric}>
          <View style={styles.metricLabelRow}>
            <Text style={styles.metricArrow}>↘</Text>
            <Text style={styles.metricLabel}>Total Expense</Text>
          </View>
          <Text style={styles.expenseAmount}>-$1,187.40</Text>
        </View>
      </View>

      <View style={styles.budgetTrack}>
        <View style={styles.budgetFill}><Text style={styles.budgetPercent}>30%</Text></View>
        <Text style={styles.budgetLimit}>$20,000.00</Text>
      </View>
      <View style={styles.budgetNote}>
        <View style={styles.checkBox}><Text style={styles.checkMark}>✓</Text></View>
        <Text style={styles.budgetNoteText}>30% Of Your Expenses, Looks Good.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: palette.mint, paddingHorizontal: 25, paddingTop: 4, paddingBottom: 36 },
  headerBar: { height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { width: 40, height: 40, alignItems: 'flex-start', justifyContent: 'center' },
  title: { color: palette.ink, fontFamily: fonts.semiBold, fontSize: 18 },
  notificationButton: { width: 34, height: 34, borderRadius: 18, backgroundColor: '#E7FFF2', alignItems: 'center', justifyContent: 'center' },
  balanceStats: { flexDirection: 'row', alignItems: 'center', marginTop: 24 },
  metric: { flex: 1, paddingLeft: 13 },
  metricLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metricArrow: { color: palette.ink, fontSize: 12, borderWidth: 1, borderColor: palette.ink, borderRadius: 3, width: 12, height: 12, textAlign: 'center', lineHeight: 11 },
  metricLabel: { color: '#073B3B', fontFamily: fonts.medium, fontSize: 11 },
  balanceAmount: { color: '#FFFFFF', fontFamily: fonts.bold, fontSize: 23, lineHeight: 30, marginTop: 2 },
  expenseAmount: { color: palette.blue, fontFamily: fonts.bold, fontSize: 23, lineHeight: 30, marginTop: 2 },
  divider: { width: 1, height: 42, backgroundColor: 'rgba(4,58,53,0.28)', marginHorizontal: 6 },
  budgetTrack: { height: 24, borderRadius: 15, backgroundColor: '#F3FFF5', marginHorizontal: 8, marginTop: 12, justifyContent: 'center' },
  budgetFill: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%', minWidth: 56, borderRadius: 15, backgroundColor: '#042F35', alignItems: 'center', justifyContent: 'center' },
  budgetPercent: { color: '#F6FFF8', fontFamily: fonts.medium, fontSize: 10 },
  budgetLimit: { position: 'absolute', right: 11, color: palette.ink, fontFamily: fonts.semiBold, fontSize: 11 },
  budgetNote: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 10, marginLeft: 14 },
  checkBox: { width: 13, height: 13, borderRadius: 2, borderWidth: 1, borderColor: palette.ink, alignItems: 'center', justifyContent: 'center' },
  checkMark: { color: palette.ink, fontSize: 9, lineHeight: 11 },
  budgetNoteText: { color: palette.ink, fontFamily: fonts.medium, fontSize: 12 },
});
