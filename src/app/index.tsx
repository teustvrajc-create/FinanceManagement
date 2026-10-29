import { useEffect } from 'react';
import { router } from 'expo-router';
import Splash from '../components/Splash';

export default function LaunchScreen() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace('/welcome' as never), 1800);
    return () => clearTimeout(timer);
  }, []);

  return <Splash />;
}
