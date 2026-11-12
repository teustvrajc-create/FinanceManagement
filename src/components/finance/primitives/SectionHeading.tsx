import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

export default function SectionHeading({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action ? <Pressable accessibilityRole="button" onPress={onPress} disabled={!onPress} hitSlop={8}><Text style={styles.action}>{action}</Text></Pressable> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 14 },
  action: { color: colors.dark, fontFamily: fonts.medium, fontSize: 10 },
});
