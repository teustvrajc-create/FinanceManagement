import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { FinanceLayout, PageHeader, PrimaryButton } from '../../components/finance/primitives';
import { colors, fonts } from '../../theme';

const paragraphs = [
  'FinWise provides tools that help you understand and manage your personal finances. The information shown in this prototype is illustrative and is not financial advice.',
  'You are responsible for keeping your sign-in details private and for reviewing the accuracy of any information you enter. Do not share your security PIN with another person.',
  'Your account information should only be used to provide the services you request. You may manage notification and security preferences from Settings.',
  'You can stop using the application at any time. Account and transaction deletion requests should be reviewed before confirmation.',
];
export default function TermsScreen() {
  const [accepted, setAccepted] = useState(false);
  return <FinanceLayout active="profile">
    <PageHeader title="Terms And Conditions" onBack={() => router.back()} notification />
    <Text style={styles.title}>FinWise Account Terms</Text>
    {paragraphs.map((text, index) => <View key={text} style={styles.paragraph}><Text style={styles.number}>{index + 1}.</Text><Text style={styles.text}>{text}</Text></View>)}
    <Pressable onPress={() => setAccepted((value) => !value)} style={styles.acceptRow}><View style={[styles.checkbox, accepted && styles.checked]}>{accepted ? <Text style={styles.check}>✓</Text> : null}</View><Text style={styles.acceptText}>I accept the terms and conditions</Text></Pressable>
    <PrimaryButton title="Accept" onPress={() => router.back()} style={styles.button} />
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  title: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 14, marginBottom: 13 },
  paragraph: { flexDirection: 'row', gap: 7, marginBottom: 12 },
  number: { color: colors.dark, fontFamily: fonts.medium, fontSize: 9 },
  text: { flex: 1, color: colors.text, fontFamily: fonts.medium, fontSize: 9, lineHeight: 16 },
  acceptRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 5, marginBottom: 13 },
  checkbox: { width: 17, height: 17, borderWidth: 1, borderColor: colors.primary, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  checked: { backgroundColor: colors.primary },
  check: { color: colors.dark, fontSize: 11 },
  acceptText: { color: colors.dark, fontFamily: fonts.medium, fontSize: 9 },
  button: { width: 185, alignSelf: 'center' }
});
