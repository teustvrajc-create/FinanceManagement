import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Icon from '../Icon';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

type PageHeaderProps = { title: string; onBack?: () => void; notification?: boolean };

export default function PageHeader({ title, onBack, notification = false }: PageHeaderProps) {
  return (
    <View style={styles.container}>
      {onBack ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack} hitSlop={10} style={styles.side}>
          <Icon name="back" size={22} color={colors.dark} />
        </Pressable>
      ) : <View style={styles.side} />}
      <Text numberOfLines={1} style={styles.title}>{title}</Text>
      {notification ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Notifications" onPress={() => router.push('/transactions')} style={styles.action}>
          <Icon name="bell" size={20} color={colors.dark} />
          <View style={styles.dot} />
        </Pressable>
      ) : <View style={styles.side} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { minHeight: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 },
  title: { flex: 1, textAlign: 'center', color: colors.dark, fontFamily: fonts.semiBold, fontSize: 15 },
  side: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  action: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  dot: { position: 'absolute', right: 7, top: 6, width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary },
});
