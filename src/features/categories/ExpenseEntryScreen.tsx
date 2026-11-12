import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { FinanceLayout, PageHeader, PrimaryButton, TextField } from '../../components/finance/primitives';
import { categories } from './data/categories';
import { colors, fonts } from '../../theme';

export default function ExpenseEntryScreen() {
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const initial = typeof slug === 'string' ? slug : 'food';
  const [category, setCategory] = useState(initial);
  const [amount, setAmount] = useState('');
  const [expenseType, setExpenseType] = useState('Groceries');
  const [saved, setSaved] = useState(false);
  const title = category.charAt(0).toUpperCase() + category.slice(1);
  return <FinanceLayout active="categories">
    <PageHeader title="Add Expenses" onBack={() => router.back()} notification />
    <View style={styles.form}>
      <TextField label="Date" defaultValue="April 30, 2024" placeholder="Select a date" />
      <Text style={styles.label}>Category</Text>
      <View style={styles.options}>{categories.filter((item) => item.label !== 'More' && item.label !== 'Savings').map((item) =>
        <Pressable key={item.label} onPress={() => setCategory(item.label.toLowerCase())} style={[styles.option, category === item.label.toLowerCase() && styles.selected]}><Text style={[styles.optionText, category === item.label.toLowerCase() && styles.selectedText]}>{item.label}</Text></Pressable>
      )}</View>
      <TextField label="Amount" placeholder="$0.00" value={amount} onChangeText={setAmount} keyboardType="decimal-pad" />
      <TextField label="Expense title" placeholder="What was this for?" value={expenseType} onChangeText={setExpenseType} />
      <TextField label="Add a message" placeholder="Optional note" multiline />
      {saved ? <Text style={styles.success}>Expense added to {title}.</Text> : null}
      <PrimaryButton title="Save" onPress={() => { setSaved(true); setTimeout(() => router.replace(('/categories/' + category) as never), 650); }} />
    </View>
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  form: { backgroundColor: '#DFF8E4', padding: 15, borderRadius: 20 },
  label: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 11, marginBottom: 7 },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 13 },
  option: { borderRadius: 12, paddingHorizontal: 9, paddingVertical: 7, backgroundColor: colors.white },
  selected: { backgroundColor: colors.primary },
  optionText: { color: colors.dark, fontFamily: fonts.medium, fontSize: 8 },
  selectedText: { fontFamily: fonts.semiBold },
  success: { color: '#118C70', fontFamily: fonts.medium, fontSize: 9, textAlign: 'center', marginBottom: 8 }
});
