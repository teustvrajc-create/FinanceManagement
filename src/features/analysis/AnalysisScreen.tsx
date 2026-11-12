import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import FinanceTabBar from '../../components/finance/FinanceTabBar';
import { fonts } from '../../theme/fonts';
import AnalysisHeader from './components/AnalysisHeader';
import IncomeExpenseChart from './components/IncomeExpenseChart';
import PeriodSelector from './components/PeriodSelector';
import SummaryMetrics from './components/SummaryMetrics';
import TargetCard from './components/TargetCard';
import { chartData } from './data/chartData';
import { analysisPalette as palette } from './palette';
import { Period } from './types';

export default function AnalysisScreen() {
  const router = useRouter();
  const [period, setPeriod] = useState<Period>('Daily');

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/home' as never);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <StatusBar style="light" />
      <AnalysisHeader onBack={goBack} onNotifications={() => router.push('/notifications' as never)} />
      <View style={styles.panel}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <PeriodSelector value={period} onChange={setPeriod} />
          <IncomeExpenseChart
            period={period}
            data={chartData[period]}
            onSearch={() => router.push('/analysis/search' as never)}
            onCyclePeriod={() => router.push('/analysis/calendar' as never)}
          />
          <SummaryMetrics />
          <Text style={styles.targetsHeading}>My Targets</Text>
          <View style={styles.targetsRow}>
            <TargetCard title="Travel" progress={30} />
            <TargetCard title="Car" progress={50} />
          </View>
        </ScrollView>
        <FinanceTabBar active="analysis" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.mint },
  panel: { flex: 1, minHeight: 0, backgroundColor: palette.page, borderTopLeftRadius: 58, borderTopRightRadius: 58, overflow: 'hidden' },
  content: { paddingHorizontal: 24, paddingTop: 25, paddingBottom: 18 },
  targetsHeading: { color: palette.ink, fontFamily: fonts.medium, fontSize: 14, marginBottom: 14 },
  targetsRow: { flexDirection: 'row', gap: 12 },
});
