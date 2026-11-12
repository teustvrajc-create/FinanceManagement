import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { FinanceLayout, PageHeader, PrimaryButton } from '../../components/finance/primitives';
import { colors, fonts } from '../../theme';
import ProfileRow from './components/ProfileRow';

export default function ProfileScreen() {
  const [confirmLogout, setConfirmLogout] = useState(false);
  return <FinanceLayout active="profile">
    <PageHeader title="Profile" notification />
    <View style={styles.identity}><View style={styles.avatar}><Text style={styles.avatarText}>JS</Text></View><Text style={styles.name}>John Smith</Text><Text style={styles.id}>ID: 25030024</Text></View>
    <View style={styles.menu}>
      <ProfileRow title="Edit Profile" icon="profile" onPress={() => router.push('/profile/edit' as never)} />
      <ProfileRow title="Security" icon="check" tint="#318FE7" onPress={() => router.push('/profile/security' as never)} />
      <ProfileRow title="Setting" icon="categories" tint="#056BFF" onPress={() => router.push('/profile/settings' as never)} />
      <ProfileRow title="Help" icon="search" tint="#64B4EA" onPress={() => router.push('/profile/help' as never)} />
      <ProfileRow title="Logout" icon="back" onPress={() => setConfirmLogout(true)} />
    </View>
    <Modal transparent visible={confirmLogout} animationType="fade" onRequestClose={() => setConfirmLogout(false)}>
      <View style={styles.scrim}><View style={styles.dialog}><Text style={styles.dialogTitle}>End session</Text><Text style={styles.dialogText}>Are you sure you want to log out?</Text><PrimaryButton title="Yes, log out" onPress={() => { setConfirmLogout(false); router.replace('/welcome' as never); }} /><Pressable onPress={() => setConfirmLogout(false)} style={styles.cancel}><Text style={styles.cancelText}>Cancel</Text></Pressable></View></View>
    </Modal>
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  identity: { alignItems: 'center', marginTop: 1, marginBottom: 18 },
  avatar: { width: 92, height: 92, borderRadius: 46, backgroundColor: '#81BDF0', borderWidth: 4, borderColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontFamily: fonts.bold, fontSize: 25 },
  name: { color: colors.dark, fontFamily: fonts.bold, fontSize: 17, marginTop: 8 },
  id: { color: colors.dark, fontFamily: fonts.medium, fontSize: 9, marginTop: 1 },
  menu: { paddingHorizontal: 14, backgroundColor: colors.white, borderRadius: 20 },
  scrim: { flex: 1, backgroundColor: 'rgba(2,28,29,0.42)', justifyContent: 'center', padding: 26 },
  dialog: { backgroundColor: colors.white, borderRadius: 24, padding: 22 },
  dialogTitle: { color: colors.dark, fontFamily: fonts.bold, fontSize: 17, textAlign: 'center' },
  dialogText: { color: colors.text, fontFamily: fonts.medium, fontSize: 11, textAlign: 'center', marginTop: 10, marginBottom: 18 },
  cancel: { alignItems: 'center', padding: 12, marginTop: 2 },
  cancelText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 10 }
});
