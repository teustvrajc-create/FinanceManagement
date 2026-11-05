import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { fonts } from '../../../theme/fonts';
import { analysisPalette as palette } from '../palette';

export default function TargetCard({ title, progress }: { title: string; progress: number }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  return (
    <View style={styles.card}>
      <View style={styles.ring}>
        <Svg width={72} height={72} viewBox="0 0 72 72">
          <Circle cx={36} cy={36} r={radius} fill="none" stroke="#F4FFF5" strokeWidth={3.5} />
          <Circle
            cx={36}
            cy={36}
            r={radius}
            fill="none"
            stroke={palette.blue}
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference * (1 - progress / 100)}
            transform="rotate(-90 36 36)"
          />
        </Svg>
        <Text style={styles.progress}>{progress}%</Text>
      </View>
      <Text style={styles.name}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minHeight: 130, borderRadius: 34, backgroundColor: '#69B3F4', alignItems: 'center', justifyContent: 'center', paddingVertical: 10 },
  ring: { width: 72, height: 72, alignItems: 'center', justifyContent: 'center' },
  progress: { position: 'absolute', color: '#FFFFFF', fontFamily: fonts.semiBold, fontSize: 18 },
  name: { color: '#FFFFFF', fontFamily: fonts.medium, fontSize: 12, marginTop: 3 },
});
