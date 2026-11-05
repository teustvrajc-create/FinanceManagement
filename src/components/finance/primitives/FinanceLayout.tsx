import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ScreenFrame from './ScreenFrame';
import BottomNavigation, { TabKey } from './BottomNavigation';

export default function FinanceLayout({ active, children }: { active: TabKey; children: ReactNode }) {
  return (
    <ScreenFrame>
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
        <BottomNavigation active={active} />
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 22 },
});
