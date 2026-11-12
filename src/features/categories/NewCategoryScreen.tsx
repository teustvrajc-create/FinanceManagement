import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Icon, { IconName } from '../../components/finance/Icon';
import { FinanceLayout, PageHeader, PrimaryButton, TextField } from '../../components/finance/primitives';
import { colors, fonts } from '../../theme';

const choices: { name: string; icon: IconName }[] = [
  { name: 'Food', icon: 'food' }, { name: 'Travel', icon: 'car' }, { name: 'Health', icon: 'medicine' },
  { name: 'Home', icon: 'rent' }, { name: 'Gift', icon: 'gift' }, { name: 'Other', icon: 'more' },
];
export default function NewCategoryScreen() {
  const [selected, setSelected] = useState('Food');
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);
  return <FinanceLayout active="categories">
    <PageHeader title="New Category" onBack={() => router.back()} notification />
    <View style={styles.form}>
      <TextField label="Name" placeholder="Category name" value={name} onChangeText={setName} />
      <Text style={styles.heading}>Choose an icon</Text>
      <View style={styles.grid}>{choices.map((choice) => <Pressable key={choice.name} onPress={() => setSelected(choice.name)} style={[styles.choice, selected === choice.name && styles.choiceActive]}><Icon name={choice.icon} size={21} color={selected === choice.name ? colors.white : colors.dark} /><Text style={[styles.choiceText, selected === choice.name && styles.choiceTextActive]}>{choice.name}</Text></Pressable>)}</View>
      {saved ? <Text style={styles.saved}>Category saved.</Text> : null}
      <PrimaryButton title="Save" onPress={() => { setSaved(true); setTimeout(() => router.replace('/categories' as never), 600); }} style={styles.button} />
      <Pressable onPress={() => router.back()} style={styles.cancel}><Text style={styles.cancelText}>Cancel</Text></Pressable>
    </View>
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  form: { backgroundColor: '#DFF8E4', padding: 16, borderRadius: 20 },
  heading: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 11, marginVertical: 7 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  choice: { width: '31%', alignItems: 'center', justifyContent: 'center', gap: 5, minHeight: 67, backgroundColor: colors.white, borderRadius: 14 },
  choiceActive: { backgroundColor: colors.primary },
  choiceText: { color: colors.dark, fontFamily: fonts.medium, fontSize: 8 },
  choiceTextActive: { fontFamily: fonts.semiBold },
  button: { marginTop: 15 },
  cancel: { alignItems: 'center', padding: 10 },
  cancelText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9 },
  saved: { color: '#118C70', fontFamily: fonts.medium, textAlign: 'center', fontSize: 9, marginTop: 9 }
});
