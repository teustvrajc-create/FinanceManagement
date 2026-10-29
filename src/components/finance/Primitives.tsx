import React, { ReactNode } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../../ui';
import Icon, { IconName } from './Icon';

export function ScreenFrame({
  children,
  backgroundColor = colors.background,
}: {
  children: ReactNode;
  backgroundColor?: string;
}) {
  return <SafeAreaView edges={['top', 'bottom']} style={[styles.screen, { backgroundColor }]}>{children}</SafeAreaView>;
}

export function PrimaryButton({
  title,
  onPress,
  backgroundColor = colors.primary,
  color = colors.text,
  icon,
  style,
}: {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  color?: string;
  icon?: IconName;
  style?: object;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.primaryButton, { backgroundColor, opacity: pressed ? 0.82 : 1 }, style]}
    >
      {icon ? <Icon name={icon} size={18} color={color} /> : null}
      <Text style={[styles.primaryButtonText, { color }]}>{title}</Text>
    </Pressable>
  );
}

export function TextField({
  label,
  right,
  containerStyle,
  ...inputProps
}: TextInputProps & {
  label?: string;
  right?: ReactNode;
  containerStyle?: object;
}) {
  return (
    <View style={[styles.fieldWrap, containerStyle]}>
      {label ? <Text style={styles.fieldLabel}>{label}</Text> : null}
      <View style={styles.field}>
        <TextInput
          {...inputProps}
          placeholderTextColor="#91AAA0"
          style={[styles.input, inputProps.style]}
          selectionColor={colors.dark}
        />
        {right}
      </View>
    </View>
  );
}

export function TextLink({
  children,
  onPress,
  style,
}: {
  children: ReactNode;
  onPress: () => void;
  style?: object;
}) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={style}>
      <Text style={styles.textLink}>{children}</Text>
    </Pressable>
  );
}

export function AuthFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <ScreenFrame backgroundColor={colors.primary}>
      <View style={styles.authRoot}>
        <View style={styles.authHeading}>
          <Text style={styles.authTitle}>{title}</Text>
        </View>
        <View style={styles.authPanel}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.authContent}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </ScreenFrame>
  );
}

export function PageHeader({
  title,
  onBack,
  notification = false,
}: {
  title: string;
  onBack?: () => void;
  notification?: boolean;
}) {
  return (
    <View style={styles.pageHeader}>
      {onBack ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack} hitSlop={10} style={styles.headerSide}>
          <Icon name="back" size={22} color={colors.dark} />
        </Pressable>
      ) : <View style={styles.headerSide} />}
      <Text numberOfLines={1} style={styles.pageTitle}>{title}</Text>
      {notification ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Notifications" onPress={() => router.push('/transactions')} style={styles.headerAction}>
          <Icon name="bell" size={20} color={colors.dark} />
          <View style={styles.notificationDot} />
        </Pressable>
      ) : <View style={styles.headerSide} />}
    </View>
  );
}

export type TabKey = 'home' | 'analysis' | 'transactions' | 'categories';

const tabs: { key: TabKey; label: string; icon: IconName; route: string }[] = [
  { key: 'home', label: 'Home', icon: 'home', route: '/home' },
  { key: 'analysis', label: 'Analysis', icon: 'analysis', route: '/analysis' },
  { key: 'transactions', label: 'Activity', icon: 'transactions', route: '/transactions' },
  { key: 'categories', label: 'Categories', icon: 'categories', route: '/categories' },
];

export function BottomNavigation({ active }: { active: TabKey }) {
  return (
    <View style={styles.bottomNavigation}>
      {tabs.map((tab) => {
        const selected = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            onPress={() => router.replace(tab.route as never)}
            style={styles.tab}
          >
            <View style={[styles.tabIcon, selected && styles.tabIconActive]}>
              <Icon name={tab.icon} size={19} color={selected ? colors.dark : '#719085'} />
            </View>
            <Text style={[styles.tabLabel, selected && styles.tabLabelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function FinanceLayout({
  active,
  children,
}: {
  active: TabKey;
  children: ReactNode;
}) {
  return (
    <ScreenFrame>
      <View style={styles.financeRoot}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.financeContent}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
        <BottomNavigation active={active} />
      </View>
    </ScreenFrame>
  );
}

export function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Text style={styles.sectionAction}>{action}</Text> : null}
    </View>
  );
}

export function BalanceOverview({
  compact = false,
  onPress,
}: {
  compact?: boolean;
  onPress?: () => void;
}) {
  const content = (
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
              <View><Text style={styles.statLabel}>Total Expenses</Text><Text style={[styles.statValue, { color: '#5992DD' }]}>-$1,187.40</Text></View>
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

  if (onPress) {
    return <Pressable onPress={onPress} style={styles.balanceCard}>{content}</Pressable>;
  }
  return <View style={styles.balanceCard}>{content}</View>;
}

export type Transaction = {
  title: string;
  detail: string;
  date: string;
  amount: string;
  icon: IconName;
  color: string;
  category: string;
};

export const sampleTransactions: Transaction[] = [
  { title: 'Salary', detail: 'Monthly income', date: '12:27 · Apr 30', amount: '+$4,000.00', icon: 'wallet', color: '#67B9F4', category: 'Income' },
  { title: 'Groceries', detail: 'Pantry', date: '17:00 · Apr 24', amount: '-$100.00', icon: 'groceries', color: '#59A5EC', category: 'Food' },
  { title: 'Rent', detail: 'Apartment', date: '8:30 · Apr 15', amount: '-$674.40', icon: 'rent', color: '#2E91F4', category: 'Home' },
  { title: 'Transport', detail: 'Fuel', date: '9:30 · Apr 15', amount: '-$4.13', icon: 'car', color: '#218CF0', category: 'Transport' },
  { title: 'Food', detail: 'Dinner', date: '19:30 · March 30', amount: '-$70.40', icon: 'food', color: '#3C9CF4', category: 'Food' },
  { title: 'Medicine', detail: 'Pharmacy', date: '11:15 · March 27', amount: '-$25.90', icon: 'medicine', color: '#4F98E4', category: 'Health' },
];

export function TransactionRow({ item }: { item: Transaction }) {
  const isIncome = item.amount.startsWith('+');
  return (
    <View style={styles.transactionRow}>
      <View style={[styles.transactionIcon, { backgroundColor: item.color }]}>
        <Icon name={item.icon} size={19} color={colors.white} />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <View style={styles.transactionMeta}>
        <Text style={styles.transactionCategory}>{item.detail}</Text>
        <Text style={[styles.transactionAmount, isIncome && styles.incomeAmount]}>{item.amount}</Text>
      </View>
    </View>
  );
}

export function TransactionList({ items = sampleTransactions }: { items?: Transaction[] }) {
  return <View>{items.map((item, index) => <TransactionRow item={item} key={item.title + index} />)}</View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  primaryButton: {
    minHeight: 48,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
  },
  primaryButtonText: { fontFamily: fonts.semiBold, fontSize: 14 },
  fieldWrap: { gap: 7, marginBottom: 15 },
  fieldLabel: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 12, marginLeft: 4 },
  field: {
    minHeight: 46,
    borderRadius: 13,
    paddingHorizontal: 14,
    backgroundColor: '#DFF5E2',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minHeight: 46,
    color: colors.text,
    fontFamily: fonts.medium,
    fontSize: 12,
    paddingVertical: 0,
  },
  textLink: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.dark },
  authRoot: { flex: 1 },
  authHeading: { height: 150, justifyContent: 'center', alignItems: 'center', paddingBottom: 14 },
  authTitle: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 20 },
  authPanel: { flex: 1, borderTopLeftRadius: 38, borderTopRightRadius: 38, backgroundColor: colors.background, overflow: 'hidden' },
  authContent: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 36, flexGrow: 1 },
  pageHeader: { minHeight: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 },
  pageTitle: { flex: 1, textAlign: 'center', color: colors.dark, fontFamily: fonts.semiBold, fontSize: 15 },
  headerSide: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerAction: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  notificationDot: { position: 'absolute', right: 7, top: 6, width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary },
  financeRoot: { flex: 1 },
  financeContent: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 22 },
  bottomNavigation: {
    minHeight: 64,
    backgroundColor: '#E4F8E7',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 12,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: { alignItems: 'center', justifyContent: 'center', flex: 1, gap: 2 },
  tabIcon: { width: 36, height: 31, alignItems: 'center', justifyContent: 'center', borderRadius: 16 },
  tabIconActive: { backgroundColor: colors.primary },
  tabLabel: { color: '#81958D', fontFamily: fonts.medium, fontSize: 8 },
  tabLabelActive: { color: colors.dark, fontFamily: fonts.semiBold },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 14 },
  sectionAction: { color: colors.dark, fontFamily: fonts.medium, fontSize: 10 },
  balanceCard: { backgroundColor: colors.primary, borderRadius: 20, padding: 17, marginBottom: 14 },
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
  budgetProgress: { marginTop: 15, gap: 6 },
  progressTrack: { height: 8, borderRadius: 8, backgroundColor: '#F8FFFA', overflow: 'hidden' },
  progressFill: { height: 8, width: '30%', borderRadius: 8, backgroundColor: '#21BA91' },
  progressText: { color: '#23594E', fontFamily: fonts.medium, fontSize: 8 },
  transactionRow: { minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 7 },
  transactionIcon: { width: 37, height: 37, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  transactionInfo: { flex: 1 },
  transactionTitle: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 11 },
  transactionDate: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8, marginTop: 3 },
  transactionMeta: { alignItems: 'flex-end', minWidth: 78 },
  transactionCategory: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8 },
  transactionAmount: { color: '#3C90E4', fontFamily: fonts.semiBold, fontSize: 10, marginTop: 4 },
  incomeAmount: { color: '#11A77F' },
});
