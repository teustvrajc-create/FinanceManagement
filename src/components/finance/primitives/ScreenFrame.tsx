import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';

type ScreenFrameProps = {
  children: ReactNode;
  backgroundColor?: string;
};

export default function ScreenFrame({ children, backgroundColor = colors.background }: ScreenFrameProps) {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.screen, { backgroundColor }]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1 } });
