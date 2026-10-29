import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { colors, fonts } from '../ui';
import OnboardingIllustration from '../components/finance/OnboardingIllustration';
import { ScreenFrame } from '../components/finance/Primitives';

export default function OnboardingOneScreen() {
  return (
    <ScreenFrame backgroundColor={colors.primary}>
      <View style={styles.root}>
        <Text style={styles.eyebrow}>Welcome To</Text>
        <Text style={styles.title}>Expense Manager</Text>
        <View style={styles.sheet}>
          <View style={styles.illustration}><OnboardingIllustration step={1} /></View>
          <Text style={styles.copy}>Make every dollar work for you</Text>
          <Text style={styles.caption}>Keep your spending clear and build a budget that feels right.</Text>
          <View style={styles.dots}><View style={styles.activeDot} /><View style={styles.dot} /></View>
          <Pressable style={styles.nextButton} onPress={() => router.push('/onboarding-two' as never)}>
            <Text style={styles.nextText}>Next</Text>
          </Pressable>
          <Link href="/login" style={styles.skip}>Skip for now</Link>
        </View>
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingTop: 40 },
  eyebrow: { fontFamily: fonts.medium, color: colors.dark, textAlign: 'center', fontSize: 18, marginTop: 22 },
  title: { fontFamily: fonts.semiBold, color: colors.dark, textAlign: 'center', fontSize: 20, marginTop: 3, marginBottom: 28 },
  sheet: { flex: 1, alignItems: 'center', backgroundColor: colors.background, borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingHorizontal: 28, paddingTop: 24, paddingBottom: 12 },
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
