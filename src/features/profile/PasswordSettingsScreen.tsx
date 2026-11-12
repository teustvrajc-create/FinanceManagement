import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { FinanceLayout, PageHeader, PrimaryButton, TextField } from '../../components/finance/primitives';
import { colors, fonts } from '../../theme';

export default function PasswordSettingsScreen() {
  const [changed, setChanged] = useState(false);
  return <FinanceLayout active="profile">
    <PageHeader title="Password Settings" onBack={() => router.back()} notification />
    <TextField label="Current Password" placeholder="Enter current password" secureTextEntry />
    <TextField label="New Password" placeholder="Enter a new password" secureTextEntry />
    <TextField label="Confirm New Password" placeholder="Confirm new password" secureTextEntry />
    {changed ? <Text style={styles.success}>Password changed successfully.</Text> : null}
    <PrimaryButton title="Change Password" onPress={() => setChanged(true)} style={styles.button} />
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  success: { color: '#148A70', fontFamily: fonts.medium, fontSize: 9, textAlign: 'center', marginTop: 8 },
  button: { width: 220, alignSelf: 'center', marginTop: 22, backgroundColor: colors.primary }
});
