import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Icon from '../../components/finance/Icon';
import { FinanceLayout, PageHeader, PrimaryButton } from '../../components/finance/primitives';
import { colors, fonts } from '../../theme';
import { categories } from '../../features/categories/data/categories';

export default function CategoriesScreen() {
  return (
    <FinanceLayout active="categories">
      <PageHeader title="Categories" onBack={() => router.back()} />
      <View style={styles.monthRow}><Text style={styles.month}>Monthly budget</Text><Text style={styles.spent}>$1,187.40 spent</Text></View>
      <View style={styles.budgetTrack}><View style={styles.budgetFill} /></View>
      <View style={styles.budgetCaption}><Text style={styles.budgetCaptionText}>30% used</Text><Text style={styles.budgetCaptionText}>$2,812.60 left</Text></View>
      <View style={styles.grid}>
        {categories.map((item, index) => (
          <Pressable
            accessibilityRole="button"
            key={item.label}
            onPress={() => {
              if (item.label === 'Savings') router.push('/saving-goals' as never);
              else if (item.label === 'More') router.push('/categories/new' as never);
              else router.push(('/categories/' + item.label.toLowerCase()) as never);
            }}
            style={styles.category}
          >
            <View style={[styles.categoryIcon, index === 8 && styles.addIcon]}>
              <Icon name={item.icon} size={24} color={colors.white} />
            </View>
            <Text style={styles.categoryName}>{item.label}</Text>
            {item.amount ? <Text style={styles.categoryAmount}>{item.amount}</Text> : <Text style={styles.categoryAmount}>Add</Text>}
          </Pressable>
        ))}
      </View>
      <PrimaryButton title="Add expense" icon="plus" onPress={() => router.push('/categories/food/add-expense' as never)} style={styles.addExpense} />
    </FinanceLayout>
  );
}

const styles = StyleSheet.create({
  monthRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  month: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 13 },
  spent: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9 },
  budgetTrack: { height: 10, borderRadius: 10, backgroundColor: colors.white, overflow: 'hidden' },
  budgetFill: { width: '30%', height: 10, borderRadius: 10, backgroundColor: colors.primary },
  budgetCaption: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 7, marginBottom: 20 },
  budgetCaptionText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  category: { width: '31%', alignItems: 'center', marginBottom: 17, backgroundColor: colors.white, borderRadius: 17, paddingVertical: 12 },
  categoryIcon: { width: 52, height: 52, borderRadius: 16, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  addIcon: { backgroundColor: colors.primary },
  categoryName: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 9 },
  categoryAmount: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8, marginTop: 3 },
  addExpense: { marginTop: 3, marginBottom: 10 },
});
