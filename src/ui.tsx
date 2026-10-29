import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

/* ---------- Цвета и шрифты FinWise ---------- */

export const colors = {
  primary: '#00D09E',
  dark: '#0E3E3E',
  text: '#052224',
  background: '#F1FFF3',
  soft: '#DFF7E2',
  white: '#FFFFFF',
  muted: '#73908F',
  line: '#DCEFE0',
  blue: '#4B95EC',
  blueSoft: '#EAF4FF',
  orange: '#F4A15D',
  red: '#EB7E77',
};

export const fonts = {
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
};

/* ---------- Логотип: график со стрелкой + надпись ---------- */

type LogoProps = {
  iconColor: string;
  textColor: string;
  size?: number; // ширина иконки
};

export function Logo({ iconColor, textColor, size = 110 }: LogoProps) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {/* три столбика */}
        <Rect x={20} y={68} width={14} height={24} rx={3} stroke={iconColor} strokeWidth={5} />
        <Rect x={43} y={52} width={14} height={40} rx={3} stroke={iconColor} strokeWidth={5} />
        <Rect x={66} y={34} width={14} height={58} rx={3} stroke={iconColor} strokeWidth={5} />
        {/* стрелка роста */}
        <Path
          d="M6 52 L28 32 L42 44 L82 10"
          stroke={iconColor}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M66 10 H82 V26"
          stroke={iconColor}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      <Text style={[styles.logoText, { color: textColor }]}>FinWise</Text>
    </View>
  );
}

/* ---------- Кнопка-«таблетка» ---------- */

type PillButtonProps = {
  title: string;
  onPress: () => void;
  background: string;
};

export function PillButton({ title, onPress, background }: PillButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.pill, { backgroundColor: background }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.pillText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoText: {
    fontFamily: fonts.bold,
    fontSize: 40,
    lineHeight: 48,
    marginTop: -6,
  },
  pill: {
    width: 207,
    height: 45,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.text,
  },
});
