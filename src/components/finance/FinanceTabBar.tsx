import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon, { IconName } from './Icon';

export type FinanceTab = 'home' | 'analysis' | 'transactions' | 'categories' | 'profile';

const tabs: { key: FinanceTab; label: string; icon: IconName; route: string }[] = [
  { key: 'home', label: 'Home', icon: 'home', route: '/home' },
  { key: 'analysis', label: 'Analysis', icon: 'analysis', route: '/analysis' },
  { key: 'transactions', label: 'Transactions', icon: 'transactions', route: '/transactions' },
  { key: 'categories', label: 'Categories', icon: 'layers', route: '/categories' },
  { key: 'profile', label: 'Profile', icon: 'profile', route: '/balance' },
];

export default function FinanceTabBar({ active }: { active: FinanceTab }) {
  const router = useRouter();

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
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
              style={styles.item}
            >
              <View style={[styles.icon, selected && styles.selectedIcon]}>
                <Icon name={tab.icon} size={24} color="#092F35" />
              </View>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#DFF5E2' },
  bar: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 17,
    paddingTop: 5,
    backgroundColor: '#DFF5E2',
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  icon: { width: 46, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 20 },
  selectedIcon: { backgroundColor: '#00C99A' },
});
