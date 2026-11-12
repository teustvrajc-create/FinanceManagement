import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon, { IconName } from '../../../components/finance/Icon';
import { colors, fonts } from '../../../theme';

type Props = { title: string; icon: IconName; detail?: string; onPress: () => void; tint?: string };
export default function ProfileRow({ title, icon, detail, onPress, tint = colors.blue }: Props) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={styles.row}>
    <View style={[styles.icon, { backgroundColor: tint }]}><Icon name={icon} size={19} color={colors.white} /></View>
    <View style={styles.labels}><Text style={styles.title}>{title}</Text>{detail ? <Text style={styles.detail}>{detail}</Text> : null}</View>
    <Icon name="chevron" size={17} color={colors.dark} />
  </Pressable>;
}
const styles = StyleSheet.create({
  row: { minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: 11, paddingVertical: 6 },
  icon: { width: 39, height: 39, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  labels: { flex: 1 },
  title: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 11 },
  detail: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8, marginTop: 3 }
});
