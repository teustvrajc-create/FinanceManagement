import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { AuthFrame, PrimaryButton, TextField } from '../components/finance/Primitives';
import Icon from '../components/finance/Icon';
import { colors, fonts } from '../ui';

export default function SignUpScreen() {
  const [visible, setVisible] = useState(false);
  return (
    <AuthFrame title="Create Account">
      <TextField label="Full Name" placeholder="Your name" autoCapitalize="words" />
      <TextField label="Email" placeholder="example@email.com" keyboardType="email-address" autoCapitalize="none" />
      <TextField label="Mobile Number" placeholder="+1 234 567 89" keyboardType="phone-pad" />
      <TextField label="Date Of Birth" placeholder="DD / MM / YYYY" />
      <TextField
        label="Password"
        placeholder="Create a password"
        secureTextEntry={!visible}
        right={<Pressable onPress={() => setVisible((value) => !value)} hitSlop={8}><Icon name={visible ? 'eyeOff' : 'eye'} size={18} color={colors.muted} /></Pressable>}
      />
      <TextField label="Confirm Password" placeholder="Repeat your password" secureTextEntry={!visible} />
      <Text style={styles.terms}>By continuing, you agree to our Terms of Use and Privacy Policy.</Text>
      <PrimaryButton title="Sign Up" onPress={() => router.replace('/home' as never)} style={styles.button} />
      <View style={styles.footer}><Text style={styles.footerText}>Already have an account? </Text><Link href="/login" style={styles.link}>Log In</Link></View>
    </AuthFrame>
  );
}

const styles = StyleSheet.create({
  terms: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, lineHeight: 15, textAlign: 'center', marginTop: 2, marginBottom: 13 },
  button: { marginTop: 1 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  footerText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 10 },
  link: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 10 },
});
