import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../Icon';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

type BalanceOverviewProps = { compact?: boolean; onPress?: () => void };

export default function BalanceOverview({ compact = false, onPress }: BalanceOverviewProps) {
  const content: ReactNode = (
    <>
      <View style={styles.balanceTop}>
        <View>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$7,783.00</Text>
        </View>
        <View style={styles.currencyBadge}><Text style={styles.currencyText}>USD</Text></View>
      </View>
      {!compact ? (
        <>
          <View style={styles.balanceStats}>
            <View style={styles.balanceStat}>
              <View style={styles.statIconIncome}><Icon name="transactions" size={15} color="#159F79" /></View>
              <View><Text style={styles.statLabel}>Total Income</Text><Text style={styles.statValue}>$7,783.00</Text></View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.balanceStat}>
              <View style={styles.statIconExpense}><Icon name="transactions" size={15} color="#6B9DE3" /></View>
              <View><Text style={styles.statLabel}>Total Expenses</Text><Text style={styles.statExpense}>-$1,187.40</Text></View>
            </View>
          </View>
          <View style={styles.budgetProgress}>
            <View style={styles.progressTrack}><View style={styles.progressFill} /></View>
            <Text style={styles.progressText}>30% of your expenses look good.</Text>
          </View>
        </>
      ) : null}
    </>
  );

  return onPress
    ? <Pressable onPress={onPress} style={styles.card}>{content}</Pressable>
    : <View style={styles.card}>{content}</View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.primary, borderRadius: 20, padding: 17, marginBottom: 14 },
  balanceTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  balanceLabel: { fontFamily: fonts.medium, color: '#145247', fontSize: 10 },
  balanceAmount: { fontFamily: fonts.bold, color: colors.dark, fontSize: 23, marginTop: 3 },
  currencyBadge: { borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.48)', paddingHorizontal: 10, paddingVertical: 6 },
  currencyText: { fontFamily: fonts.semiBold, color: colors.dark, fontSize: 9 },
  balanceStats: { flexDirection: 'row', marginTop: 17, alignItems: 'center' },
  balanceStat: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  statIconIncome: { width: 28, height: 28, borderRadius: 9, backgroundColor: '#E5FFF1', alignItems: 'center', justifyContent: 'center' },
  statIconExpense: { width: 28, height: 28, borderRadius: 9, backgroundColor: '#E7F4FF', alignItems: 'center', justifyContent: 'center' },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(5,34,36,0.16)', marginHorizontal: 8 },
  statLabel: { color: '#3B6A5C', fontFamily: fonts.medium, fontSize: 8 },
  statValue: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 11, marginTop: 2 },
  statExpense: { color: '#5992DD', fontFamily: fonts.semiBold, fontSize: 11, marginTop: 2 },
  budgetProgress: { marginTop: 15, gap: 6 },
  progressTrack: { height: 8, borderRadius: 8, backgroundColor: '#F8FFFA', overflow: 'hidden' },
  progressFill: { height: 8, width: '30%', borderRadius: 8, backgroundColor: '#21BA91' },
  progressText: { color: '#23594E', fontFamily: fonts.medium, fontSize: 8 },
});
