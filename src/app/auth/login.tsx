import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { AuthFrame, PrimaryButton, TextField, TextLink } from '../components/finance/Primitives';
import Icon from '../components/finance/Icon';
import { colors, fonts } from '../ui';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <AuthFrame title="Welcome">
      <TextField label="Username or Email" placeholder="example@email.com" keyboardType="email-address" autoCapitalize="none" />
      <TextField
        label="Password"
        placeholder="Enter your password"
        secureTextEntry={!showPassword}
        right={<Pressable onPress={() => setShowPassword((value) => !value)} hitSlop={8}><Icon name={showPassword ? 'eyeOff' : 'eye'} size={18} color={colors.muted} /></Pressable>}
      />
      <TextLink onPress={() => router.push('/forgot-password' as never)} style={styles.forgot}>Forgot Password?</TextLink>
      <PrimaryButton title="Log In" onPress={() => router.replace('/home' as never)} style={styles.loginButton} />
      <View style={styles.signupRow}><Text style={styles.smallText}>New here? </Text><Link href="/onboarding-one" style={styles.link}>Create an account</Link></View>
      <View style={styles.separator}><View style={styles.line} /><Text style={styles.orText}>or sign in with</Text><View style={styles.line} /></View>
      <View style={styles.socialRow}>
        <Pressable accessibilityLabel="Continue with Google" style={styles.socialButton}><Text style={styles.google}>G</Text></Pressable>
        <Pressable accessibilityLabel="Continue with Apple" style={styles.socialButton}><Text style={styles.apple}>●</Text></Pressable>
      </View>
      <Pressable onPress={() => router.push('/fingerprint' as never)} style={styles.fingerprintRow}>
        <Icon name="fingerprint" size={17} color={colors.dark} />
        <Text style={styles.fingerprintText}>Use fingerprint to access</Text>
      </Pressable>
    </AuthFrame>
  );
}

const styles = StyleSheet.create({
  forgot: { alignSelf: 'center', marginTop: 1, marginBottom: 19 },
  loginButton: { marginTop: 3 },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 15 },
  smallText: { fontFamily: fonts.medium, color: colors.muted, fontSize: 10 },
  link: { fontFamily: fonts.semiBold, color: colors.primary, fontSize: 10 },
  separator: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24, marginBottom: 12 },
  line: { flex: 1, height: 1, backgroundColor: colors.line },
  orText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9 },
  socialRow: { flexDirection: 'row', gap: 11, justifyContent: 'center' },
  socialButton: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  google: { fontFamily: fonts.bold, color: '#4388E8', fontSize: 15 },
  apple: { color: colors.dark, fontSize: 15 },
  fingerprintRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 20 },
  fingerprintText: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 10 },
});
