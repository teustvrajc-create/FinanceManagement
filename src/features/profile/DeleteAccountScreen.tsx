import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { FinanceLayout, PageHeader, PrimaryButton, TextField } from '../../components/finance/primitives';
import { colors, fonts } from '../../theme';

export default function DeleteAccountScreen() {
  const [confirm, setConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);
  return <FinanceLayout active="profile">
    <PageHeader title="Delete Account" onBack={() => router.back()} notification />
    <View style={styles.card}><Text style={styles.title}>Are you sure you want to delete your account?</Text><Text style={styles.body}>Deleting your account removes your profile and preferences. This action cannot be undone in this demo.</Text><TextField label="Enter your password to confirm" placeholder="Password" secureTextEntry />{deleted ? <Text style={styles.success}>Account deletion confirmed.</Text> : null}<PrimaryButton title="Delete Account" onPress={() => setConfirm(true)} style={styles.delete} /><Pressable onPress={() => router.back()} style={styles.cancel}><Text style={styles.cancelText}>Cancel</Text></Pressable></View>
    <Modal transparent visible={confirm} animationType="fade" onRequestClose={() => setConfirm(false)}><View style={styles.scrim}><View style={styles.dialog}><Text style={styles.title}>Delete Account</Text><Text style={styles.body}>Do you want to delete your account?</Text><PrimaryButton title="Yes, Delete Account" onPress={() => { setConfirm(false); setDeleted(true); }} /><Pressable onPress={() => setConfirm(false)} style={styles.cancel}><Text style={styles.cancelText}>Cancel</Text></Pressable></View></View></Modal>
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: 22, padding: 17 },
  title: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 14, textAlign: 'center' },
  body: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, lineHeight: 15, textAlign: 'center', marginTop: 9, marginBottom: 14 },
  delete: { backgroundColor: '#F4DEDB' },
  cancel: { alignItems: 'center', padding: 11 },
  cancelText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 10 },
  success: { color: '#148A70', fontFamily: fonts.medium, fontSize: 9, textAlign: 'center', marginBottom: 8 },
  scrim: { flex: 1, backgroundColor: 'rgba(2,28,29,0.42)', justifyContent: 'center', padding: 25 },
  dialog: { backgroundColor: colors.white, padding: 21, borderRadius: 23 }
});
