import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Icon from '../components/finance/Icon';
import { AuthFrame, PrimaryButton } from '../components/finance/Primitives';
import { colors, fonts } from '../ui';

export default function FingerprintScreen() {
  return (
    <AuthFrame title="Security Fingerprint">
      <View style={styles.fingerprint}><Icon name="fingerprint" size={66} color={colors.white} /></View>
      <Text style={styles.heading}>Use Fingerprint To Access</Text>
      <Text style={styles.caption}>Sign in securely and get to your finances faster.</Text>
      <PrimaryButton title="Use Touch ID" onPress={() => router.replace('/home' as never)} style={styles.button} />
      <Text style={styles.alternative}>Or use your PIN instead</Text>
    </AuthFrame>
  );
}

const styles = StyleSheet.create({
  fingerprint: { width: 118, height: 118, borderRadius: 59, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 5, marginBottom: 22 },
  heading: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 13, textAlign: 'center' },
  caption: { color: colors.muted, fontFamily: fonts.medium, fontSize: 10, lineHeight: 16, textAlign: 'center', marginTop: 8, marginHorizontal: 14 },
  button: { marginTop: 34 },
  alternative: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, textAlign: 'center', marginTop: 20 },
});
