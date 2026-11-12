import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Icon, { IconName } from '../Icon';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

export type TabKey = 'home' | 'analysis' | 'transactions' | 'categories' | 'profile';

const tabs: { key: TabKey; label: string; icon: IconName; route: string }[] = [
  { key: 'home', label: 'Home', icon: 'home', route: '/home' },
  { key: 'analysis', label: 'Analysis', icon: 'analysis', route: '/analysis' },
  { key: 'transactions', label: 'Activity', icon: 'transactions', route: '/transactions' },
  { key: 'categories', label: 'Categories', icon: 'categories', route: '/categories' },
  { key: 'profile', label: 'Profile', icon: 'profile', route: '/profile' },
];

export default function BottomNavigation({ active }: { active: TabKey }) {
  return (
    <View style={styles.bar}>
      {tabs.map((tab) => {
        const selected = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected }}
            onPress={() => router.replace(tab.route as never)}
            style={styles.tab}
          >
            <View style={[styles.icon, selected && styles.iconActive]}>
              <Icon name={tab.icon} size={19} color={selected ? colors.dark : '#719085'} />
            </View>
            <Text style={[styles.label, selected && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { minHeight: 64, backgroundColor: '#E4F8E7', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 12, paddingTop: 8, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  tab: { alignItems: 'center', justifyContent: 'center', flex: 1, gap: 2 },
  icon: { width: 36, height: 31, alignItems: 'center', justifyContent: 'center', borderRadius: 16 },
  iconActive: { backgroundColor: colors.primary },
  label: { color: '#81958D', fontFamily: fonts.medium, fontSize: 8 },
  labelActive: { color: colors.dark, fontFamily: fonts.semiBold },
});
