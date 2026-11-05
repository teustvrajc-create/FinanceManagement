import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

export default function SectionHeading({ title, action }: { title: string; action?: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action ? <Text style={styles.action}>{action}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 14 },
  action: { color: colors.dark, fontFamily: fonts.medium, fontSize: 10 },
});
