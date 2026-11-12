import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { FinanceLayout, PageHeader } from '../../components/finance/primitives';
import ProfileRow from './components/ProfileRow';

export default function SecurityScreen() {
  return <FinanceLayout active="profile">
    <PageHeader title="Security" onBack={() => router.back()} notification />
    <View>
      <ProfileRow title="Change Pin" icon="lock" onPress={() => router.push('/profile/security/change-pin' as never)} />
      <ProfileRow title="Fingerprint" icon="fingerprint" onPress={() => router.push('/profile/security/fingerprint' as never)} />
      <ProfileRow title="Terms And Conditions" icon="check" onPress={() => router.push('/profile/security/terms' as never)} />
    </View>
  </FinanceLayout>;
}
