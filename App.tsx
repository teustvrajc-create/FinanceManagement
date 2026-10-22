import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import Splash from './src/components/Splash';
import Welcome from './src/components/Welcome';
import { colors } from './src/ui';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [showWelcome, setShowWelcome] = useState(false);

  // заставка 2 секунды, затем приветственный экран
  useEffect(() => {
    if (!fontsLoaded) return;
    const timer = setTimeout(() => setShowWelcome(true), 2000);
    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  // пока грузятся шрифты — зелёный фон, без белой вспышки
  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.primary }} />;
  }

  return showWelcome ? (
    <Welcome
      onLogin={() => console.log('Log In')}
      onSignUp={() => console.log('Sign Up')}
      onForgot={() => console.log('Forgot Password?')}
    />
  ) : (
    <Splash />
  );
}
