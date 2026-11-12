import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { FinanceLayout, PageHeader, PrimaryButton, TextField } from '../../components/finance/primitives';
import { colors, fonts } from '../../theme';

export default function ProfileEditScreen() {
  const [push, setPush] = useState(true);
  const [dark, setDark] = useState(false);
  const [saved, setSaved] = useState(false);
  return <FinanceLayout active="profile">
    <PageHeader title="Edit My Profile" onBack={() => router.back()} notification />
    <View style={styles.avatar}><Text style={styles.avatarText}>JS</Text></View><Text style={styles.name}>John Smith</Text><Text style={styles.id}>ID: 25030024</Text>
    <Text style={styles.heading}>Account Settings</Text>
    <TextField label="Username" defaultValue="John Smith" />
    <TextField label="Phone" defaultValue="+44 555 5555 55" keyboardType="phone-pad" />
    <TextField label="Email Address" defaultValue="example@example.com" keyboardType="email-address" autoCapitalize="none" />
    <Preference title="Push Notifications" value={push} onChange={setPush} />
    <Preference title="Turn Dark Theme" value={dark} onChange={setDark} />
    {saved ? <Text style={styles.success}>Profile updated.</Text> : null}
    <PrimaryButton title="Update Profile" onPress={() => setSaved(true)} style={styles.button} />
  </FinanceLayout>;
}
function Preference({ title, value, onChange }: { title: string; value: boolean; onChange: (value: boolean) => void }) {
  return <View style={styles.preference}><Text style={styles.preferenceText}>{title}</Text><Switch value={value} onValueChange={onChange} trackColor={{ false: '#B9E8D2', true: colors.primary }} thumbColor="#FFFFFF" /></View>;
}
const styles = StyleSheet.create({
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: '#81BDF0', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: colors.white },
  avatarText: { color: colors.white, fontFamily: fonts.bold, fontSize: 22 },
  name: { color: colors.dark, fontFamily: fonts.bold, fontSize: 15, textAlign: 'center', marginTop: 6 },
  id: { color: colors.dark, fontFamily: fonts.medium, fontSize: 8, textAlign: 'center', marginBottom: 17 },
  heading: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 14, marginBottom: 12 },
  preference: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
  preferenceText: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 10 },
  button: { alignSelf: 'center', width: 190, marginTop: 12 },
  success: { color: '#168E79', fontFamily: fonts.medium, textAlign: 'center', fontSize: 9 }
});
