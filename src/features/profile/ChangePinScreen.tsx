import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { FinanceLayout, PageHeader, PrimaryButton, TextField } from '../../components/finance/primitives';
import { colors, fonts } from '../../theme';

export default function ChangePinScreen() {
  const [done, setDone] = useState(false);
  return <FinanceLayout active="profile">
    <PageHeader title="Change Pin" onBack={() => router.back()} notification />
    <TextField label="Current Pin" placeholder="••••••" secureTextEntry keyboardType="number-pad" />
    <TextField label="New Pin" placeholder="Enter new pin" secureTextEntry keyboardType="number-pad" />
    <TextField label="Confirm Pin" placeholder="Repeat new pin" secureTextEntry keyboardType="number-pad" />
    {done ? <Text style={styles.done}>Your PIN has been changed successfully.</Text> : null}
    <PrimaryButton title="Change Pin" onPress={() => setDone(true)} style={styles.button} />
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  done: { color: '#159F79', fontFamily: fonts.medium, fontSize: 10, textAlign: 'center', marginTop: 8 },
  button: { width: 205, alignSelf: 'center', marginTop: 25, backgroundColor: colors.primary }
});
