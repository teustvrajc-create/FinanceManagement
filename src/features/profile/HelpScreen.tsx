import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { FinanceLayout, PageHeader } from '../../components/finance/primitives';
import { colors, fonts } from '../../theme';

const questions = [
  ['General', 'How to use FinWise?', 'Your dashboard gives you an overview of your balance, activity, and monthly budget.'],
  ['General', 'How much does it cost to use FinWise?', 'This prototype is free to explore.'],
  ['Account', 'How can I reset my password if I forget it?', 'Open the sign-in screen and choose Forgot Password to follow the reset steps.'],
  ['Account', 'Are there privacy or data security measures in place?', 'Use a unique password and protect your PIN. This prototype stores no account data.'],
  ['Account', 'How can I delete my account?', 'Open Settings, select Delete Account, and follow the confirmation steps.'],
  ['Services', 'How do I contact support?', 'Use Contact Us to open a support conversation.'],
  ['Services', 'How do I access my expense history?', 'Open Activity and choose the date or category you want to review.'],
  ['Services', 'Can I use the app offline?', 'Sample screens can be viewed without a connected financial account.'],
];
export default function HelpScreen() {
  const [tab, setTab] = useState<'FAQ' | 'Contact Us'>('FAQ');
  const [filter, setFilter] = useState('General');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const visible = useMemo(() => questions.filter(([group, question]) => (filter === 'All' || group === filter) && (!query || question.toLowerCase().includes(query.toLowerCase()))), [filter, query]);
  return <FinanceLayout active="profile">
    <PageHeader title="Help & FAQs" onBack={() => router.back()} notification />
    <Text style={styles.prompt}>How can we help you?</Text>
    <View style={styles.tabs}>{(['FAQ', 'Contact Us'] as const).map((item) => <Pressable key={item} onPress={() => item === 'Contact Us' ? router.push('/profile/help/support' as never) : setTab(item)} style={[styles.tab, tab === item && styles.tabActive]}><Text style={[styles.tabText, tab === item && styles.tabTextActive]}>{item}</Text></Pressable>)}</View>
    <View style={styles.filters}>{['General', 'Account', 'Services'].map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, filter === item && styles.filterSelected]}><Text style={styles.filterText}>{item}</Text></Pressable>)}</View>
    <TextInput value={query} onChangeText={setQuery} placeholder="Search" placeholderTextColor={colors.muted} style={styles.search} />
    {visible.map(([, question, answer]) => <Pressable key={question} onPress={() => setOpen(open === question ? null : question)} style={styles.question}><View style={styles.questionHead}><Text style={styles.questionText}>{question}</Text><Text style={styles.chevron}>{open === question ? '⌃' : '⌄'}</Text></View>{open === question ? <Text style={styles.answer}>{answer}</Text> : null}</Pressable>)}
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  prompt: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 11, textAlign: 'center', marginBottom: 13 },
  tabs: { flexDirection: 'row', backgroundColor: '#DDF7E2', borderRadius: 15, padding: 4, marginBottom: 8 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 12 },
  tabActive: { backgroundColor: colors.primary },
  tabText: { color: colors.dark, fontFamily: fonts.medium, fontSize: 10 },
  tabTextActive: { fontFamily: fonts.semiBold },
  filters: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#DDF7E2', borderRadius: 12, paddingVertical: 8 },
  filter: { paddingHorizontal: 10, paddingVertical: 3 },
  filterSelected: { backgroundColor: colors.white, borderRadius: 9 },
  filterText: { color: colors.dark, fontFamily: fonts.medium, fontSize: 9 },
  search: { minHeight: 39, borderWidth: 1, borderColor: colors.primary, borderRadius: 11, paddingHorizontal: 12, color: colors.dark, fontFamily: fonts.medium, fontSize: 9, marginTop: 9, marginBottom: 13 },
  question: { paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: '#D9EDE0' },
  questionHead: { flexDirection: 'row', alignItems: 'center' },
  questionText: { flex: 1, color: colors.dark, fontFamily: fonts.medium, fontSize: 10 },
  chevron: { color: colors.dark, fontSize: 18 },
  answer: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, lineHeight: 15, marginTop: 8 }
});
