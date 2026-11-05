import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { fonts } from '../../theme/fonts';

type LogoProps = {
  iconColor: string;
  textColor: string;
  size?: number;
};

export default function Logo({ iconColor, textColor, size = 110 }: LogoProps) {
  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <Rect x={20} y={68} width={14} height={24} rx={3} stroke={iconColor} strokeWidth={5} />
        <Rect x={43} y={52} width={14} height={40} rx={3} stroke={iconColor} strokeWidth={5} />
        <Rect x={66} y={34} width={14} height={58} rx={3} stroke={iconColor} strokeWidth={5} />
        <Path d="M6 52 28 32l14 12L82 10" stroke={iconColor} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M66 10h16v16" stroke={iconColor} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
      <Text style={[styles.wordmark, { color: textColor }]}>FinWise</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  wordmark: { fontFamily: fonts.bold, fontSize: 40, lineHeight: 48, marginTop: -6 },
});
