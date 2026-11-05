import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenFrame from './ScreenFrame';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

export default function AuthFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <ScreenFrame backgroundColor={colors.primary}>
      <View style={styles.root}>
        <View style={styles.heading}><Text style={styles.title}>{title}</Text></View>
        <View style={styles.panel}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </View>
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  heading: { height: 150, justifyContent: 'center', alignItems: 'center', paddingBottom: 14 },
  title: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 20 },
  panel: { flex: 1, borderTopLeftRadius: 38, borderTopRightRadius: 38, backgroundColor: colors.background, overflow: 'hidden' },
  content: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 36, flexGrow: 1 },
});
