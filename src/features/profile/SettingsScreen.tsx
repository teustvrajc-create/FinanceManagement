import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { FinanceLayout, PageHeader } from '../../components/finance/primitives';
import ProfileRow from './components/ProfileRow';

export default function SettingsScreen() {
  return <FinanceLayout active="profile">
    <PageHeader title="Settings" onBack={() => router.back()} notification />
    <View>
      <ProfileRow title="Notification Settings" icon="bell" tint="#00C99A" onPress={() => router.push('/profile/settings/notifications' as never)} />
      <ProfileRow title="Password Settings" icon="lock" tint="#00C99A" onPress={() => router.push('/profile/settings/password' as never)} />
      <ProfileRow title="Delete Account" icon="profile" tint="#00C99A" onPress={() => router.push('/profile/delete-account' as never)} />
    </View>
  </FinanceLayout>;
}
