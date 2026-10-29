import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

export default function OnboardingIllustration({ step }: { step: 1 | 2 }) {
  return (
    <View style={{ width: 250, height: 235, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={235} height={220} viewBox="0 0 235 220" fill="none" style={{ position: 'absolute' }}>
        <Circle cx="117" cy="110" r="96" fill="#E1F6E5" />
        {step === 1 ? (
          <>
            <Ellipse cx="112" cy="82" rx="27" ry="10" fill="#FFD86E" />
            <Path d="M85 82v9c0 6 12 10 27 10s27-4 27-10v-9" fill="#F5BD47" />
            <Ellipse cx="112" cy="82" rx="27" ry="10" fill="#FFE58A" stroke="#E9B637" strokeWidth="2" />
            <Ellipse cx="147" cy="107" rx="24" ry="9" fill="#FFD86E" />
            <Path d="M123 107v8c0 5 11 9 24 9s24-4 24-9v-8" fill="#F5BD47" />
            <Ellipse cx="147" cy="107" rx="24" ry="9" fill="#FFE58A" stroke="#E9B637" strokeWidth="2" />
            <Ellipse cx="95" cy="118" rx="22" ry="8" fill="#FFD86E" />
            <Path d="M73 118v8c0 5 10 8 22 8s22-3 22-8v-8" fill="#F5BD47" />
            <Ellipse cx="95" cy="118" rx="22" ry="8" fill="#FFE58A" stroke="#E9B637" strokeWidth="2" />
            <Path d="M49 157c17-21 31-29 48-27 10 1 17 8 28 8 12 0 18-8 30-8 11 0 19 5 28 12l19 15c6 5 4 14-4 16l-45 10c-15 4-28 2-42-3l-45-13c-9-3-12-5-17-10Z" fill="#F2B69A" stroke="#D99679" strokeWidth="2" />
            <Path d="M56 158c23 0 34 10 54 14 12 3 22 3 34 0l37-9" stroke="#C47D66" strokeWidth="2" strokeLinecap="round" />
            <Circle cx="169" cy="58" r="6" fill="#00D09E" />
            <Circle cx="65" cy="77" r="4" fill="#69BEF2" />
          </>
        ) : (
          <>
            <Rect x="86" y="47" width="66" height="122" rx="12" fill="#70B6F4" />
            <Rect x="92" y="56" width="54" height="98" rx="6" fill="#FFFFFF" />
            <Rect x="102" y="73" width="34" height="9" rx="4.5" fill="#DFF5E2" />
            <Rect x="102" y="90" width="24" height="7" rx="3.5" fill="#B9E7CA" />
            <Rect x="102" y="105" width="34" height="26" rx="6" fill="#E8F5FF" />
            <Path d="M43 155c15-22 27-34 39-33 10 1 15 10 23 14l16 8c7 4 5 13-3 14l-25 2c-7 1-12-1-18-3l-24 10c-6 2-11-6-8-12Z" fill="#F2B69A" stroke="#D99679" strokeWidth="2" />
            <Path d="M193 154c-12-16-23-25-33-24-8 1-14 7-21 11l-14 8c-6 3-4 11 3 12l24 1c6 0 11-2 16-4l20 9c6 2 10-7 5-13Z" fill="#F2B69A" stroke="#D99679" strokeWidth="2" />
            <Circle cx="119" cy="145" r="3" fill="#00D09E" />
            <Circle cx="66" cy="66" r="5" fill="#FFD86E" />
            <Circle cx="174" cy="83" r="5" fill="#00D09E" />
          </>
        )}
      </Svg>
    </View>
  );
}
