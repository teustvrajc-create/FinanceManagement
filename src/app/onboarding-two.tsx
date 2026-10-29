import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { colors, fonts } from '../ui';
import OnboardingIllustration from '../components/finance/OnboardingIllustration';
import { ScreenFrame } from '../components/finance/Primitives';

export default function OnboardingTwoScreen() {
  return (
    <ScreenFrame backgroundColor={colors.primary}>
      <View style={styles.root}>
        <Text style={styles.title}>Take Control of</Text>
        <Text style={styles.title}>Your Finances</Text>
        <View style={styles.sheet}>
          <View style={styles.illustration}><OnboardingIllustration step={2} /></View>
          <Text style={styles.copy}>A clearer view of your money</Text>
          <Text style={styles.caption}>Track income, plan ahead, and feel confident about what comes next.</Text>
          <View style={styles.dots}><View style={styles.dot} /><View style={styles.activeDot} /></View>
          <Pressable style={styles.nextButton} onPress={() => router.push('/signup' as never)}>
            <Text style={styles.nextText}>Get Started</Text>
          </Pressable>
          <Link href="/login" style={styles.skip}>I already have an account</Link>
        </View>
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingTop: 40 },
  title: { fontFamily: fonts.semiBold, color: colors.dark, textAlign: 'center', fontSize: 19, lineHeight: 27 },
  sheet: { flex: 1, alignItems: 'center', backgroundColor: colors.background, borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingHorizontal: 28, paddingTop: 24, paddingBottom: 12, marginTop: 26 },
  illustration: { flex: 1, minHeight: 220, justifyContent: 'center', alignItems: 'center' },
  copy: { fontFamily: fonts.semiBold, color: colors.dark, fontSize: 16, textAlign: 'center', marginTop: 8 },
  caption: { fontFamily: fonts.medium, color: colors.muted, fontSize: 11, lineHeight: 17, textAlign: 'center', maxWidth: 270, marginTop: 8 },
  dots: { flexDirection: 'row', gap: 7, marginTop: 18, marginBottom: 18, alignItems: 'center' },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#BFD8C4' },
  nextButton: { minWidth: 207, height: 45, borderRadius: 24, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  nextText: { fontFamily: fonts.semiBold, color: colors.dark, fontSize: 14 },
  skip: { fontFamily: fonts.medium, color: colors.muted, fontSize: 10, marginTop: 13, marginBottom: 8 },
});
