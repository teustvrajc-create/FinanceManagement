import { router } from 'expo-router';
import Welcome from '../components/Welcome';

export default function WelcomeScreen() {
  return (
    <Welcome
      onLogin={() => router.push('/login' as never)}
      onSignUp={() => router.push('/onboarding-one' as never)}
      onForgot={() => router.push('/forgot-password' as never)}
    />
  );
}
