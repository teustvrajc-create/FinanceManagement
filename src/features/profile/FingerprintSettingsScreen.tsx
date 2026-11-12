import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Icon from '../../components/finance/Icon';
import { FinanceLayout, PageHeader, PrimaryButton } from '../../components/finance/primitives';
import { colors, fonts } from '../../theme';

export default function FingerprintSettingsScreen() {
  const [enabled, setEnabled] = useState(true);
  const [notice, setNotice] = useState('');
  return <FinanceLayout active="profile">
    <PageHeader title="Fingerprint" onBack={() => router.back()} notification />
    <View style={styles.card}>
      <View style={styles.fingerprint}><Icon name="fingerprint" size={50} color={colors.white} /></View>
      <Text style={styles.heading}>{enabled ? 'Fingerprint is enabled' : 'Use Fingerprint To Access'}</Text>
      <Text style={styles.caption}>Sign in securely and get to your finances faster.</Text>
      {enabled ? <Pressable onPress={() => { setEnabled(false); setNotice('Fingerprint has been removed.'); }} style={styles.saved}><Icon name="fingerprint" size={20} color={colors.dark} /><Text style={styles.savedText}>John Fingerprint</Text><Icon name="chevron" size={17} color={colors.dark} /></Pressable> : null}
      {notice ? <Text style={styles.notice}>{notice}</Text> : null}
      <PrimaryButton title={enabled ? 'Delete' : 'Add a Fingerprint'} onPress={() => { setEnabled((value) => !value); setNotice(enabled ? 'Fingerprint has been removed.' : 'Fingerprint added successfully.'); }} style={styles.button} />
    </View>
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  card: { alignItems: 'center', padding: 20, backgroundColor: '#DFF8E4', borderRadius: 22 },
  fingerprint: { width: 104, height: 104, borderRadius: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, marginVertical: 12 },
  heading: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 13, textAlign: 'center' },
  caption: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, lineHeight: 15, textAlign: 'center', marginTop: 7 },
  saved: { width: '100%', flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: colors.white, borderRadius: 14, padding: 12, marginTop: 18 },
  savedText: { flex: 1, color: colors.dark, fontFamily: fonts.medium, fontSize: 10 },
  notice: { color: '#159F79', fontFamily: fonts.medium, fontSize: 9, textAlign: 'center', marginTop: 12 },
  button: { width: '90%', marginTop: 20 }
});
