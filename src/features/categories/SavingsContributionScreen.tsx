import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { FinanceLayout, PageHeader, PrimaryButton, TextField } from '../../components/finance/primitives';
import { fonts } from '../../theme';

export default function SavingsContributionScreen() {
  const { goal } = useLocalSearchParams<{ goal?: string }>();
  const [amount, setAmount] = useState('');
  const [saved, setSaved] = useState(false);
  const name = typeof goal === 'string' ? goal.replace('-', ' ') : 'travel';
  return <FinanceLayout active="categories">
    <PageHeader title="Add Savings" onBack={() => router.back()} notification />
    <View style={styles.form}>
      <TextField label="Date" defaultValue="April 30, 2024" />
      <TextField label="Category" defaultValue={name.charAt(0).toUpperCase() + name.slice(1)} />
      <TextField label="Amount" placeholder="$0.00" value={amount} onChangeText={setAmount} keyboardType="decimal-pad" />
      <TextField label="Expense title" placeholder="Monthly contribution" defaultValue="Monthly deposit" />
      <TextField label="Add a message" placeholder="Optional note" multiline />
      {saved ? <Text style={styles.success}>Savings contribution recorded.</Text> : null}
      <PrimaryButton title="Save" onPress={() => { setSaved(true); setTimeout(() => router.replace(('/saving-goals/' + goal) as never), 650); }} />
    </View>
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  form: { padding: 16, backgroundColor: '#DFF8E4', borderRadius: 20 },
  success: { color: '#148A70', fontFamily: fonts.medium, fontSize: 9, textAlign: 'center', marginBottom: 8 }
});
