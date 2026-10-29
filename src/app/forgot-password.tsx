import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Link, router } from 'expo-router';
import { AuthFrame, PrimaryButton, TextField } from '../components/finance/Primitives';
import { colors, fonts } from '../ui';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  return (
    <AuthFrame title="Forgot Password">
      <Text style={styles.heading}>Reset Password?</Text>
      <Text style={styles.body}>Enter the email address linked to your account. We’ll send you a code to reset your password.</Text>
      <TextField
        label="Email Address"
        placeholder="example@email.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <PrimaryButton title="Next Step" onPress={() => router.push({ pathname: '/security-pin', params: { email: email || 'example@email.com' } } as never)} style={styles.next} />
      <Link href="/signup" style={styles.signUp}>Create a new account</Link>
      <Link href="/login" style={styles.back}>Back to Log In</Link>
    </AuthFrame>
  );
}

const styles = StyleSheet.create({
  heading: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 14 },
  body: { color: colors.muted, fontFamily: fonts.medium, fontSize: 10, lineHeight: 16, marginTop: 7, marginBottom: 24 },
  next: { marginTop: 4 },
  signUp: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 10, textAlign: 'center', marginTop: 38 },
  back: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 10, textAlign: 'center', marginTop: 14 },
});
