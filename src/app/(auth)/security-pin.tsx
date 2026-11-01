import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { AuthFrame, PrimaryButton, TextLink } from '../../components/finance/Primitives';
import { colors, fonts } from '../../ui';

export default function SecurityPinScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [resent, setResent] = useState(false);
  return (
    <AuthFrame title="Security Pin">
      <Text style={styles.label}>Enter Security Pin</Text>
      <Text style={styles.help}>We sent a 6-digit code to {email || 'your email address'}.</Text>
      <View style={styles.pinRow}>
        {'273916'.split('').map((digit, index) => (
          <View key={index} style={styles.pinCell}><Text style={styles.pinDigit}>{digit}</Text></View>
        ))}
      </View>
      <PrimaryButton title="Accept" onPress={() => router.push('/new-password' as never)} style={styles.accept} />
      <View style={styles.resendRow}><Text style={styles.smallText}>Didn’t receive a code? </Text><TextLink onPress={() => setResent(true)}>Send again</TextLink></View>
      {resent ? <Text style={styles.resent}>A new code has been sent.</Text> : null}
      <Link href="/forgot-password" style={styles.changeEmail}>Change email address</Link>
    </AuthFrame>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 13, textAlign: 'center' },
  help: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, textAlign: 'center', marginTop: 8, marginHorizontal: 6 },
  pinRow: { flexDirection: 'row', justifyContent: 'center', gap: 7, marginTop: 34, marginBottom: 29 },
  pinCell: { width: 33, height: 36, borderRadius: 18, borderWidth: 1, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
  pinDigit: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 13 },
  accept: { maxWidth: 207, width: '100%', alignSelf: 'center' },
  resendRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 23 },
  smallText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9 },
  resent: { color: '#159F79', fontFamily: fonts.medium, fontSize: 9, textAlign: 'center', marginTop: 8 },
  changeEmail: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 10, textAlign: 'center', marginTop: 26 },
});
