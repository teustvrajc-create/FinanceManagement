import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { AuthFrame, PrimaryButton, TextField } from '../components/finance/Primitives';
import Icon from '../components/finance/Icon';
import { colors, fonts } from '../ui';

export default function NewPasswordScreen() {
  const [visible, setVisible] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <AuthFrame title="New Password">
      <TextField
        label="New Password"
        placeholder="Enter new password"
        secureTextEntry={!visible}
        right={<Pressable onPress={() => setVisible((value) => !value)} hitSlop={8}><Icon name={visible ? 'eyeOff' : 'eye'} size={18} color={colors.muted} /></Pressable>}
      />
      <TextField label="Confirm New Password" placeholder="Repeat new password" secureTextEntry={!visible} />
      {saved ? <Text style={styles.confirmation}>Password updated. You can log in now.</Text> : null}
      <PrimaryButton
        title="Change Password"
        onPress={() => {
          setSaved(true);
          setTimeout(() => router.replace('/login' as never), 900);
        }}
        style={styles.button}
      />
    </AuthFrame>
  );
}

const styles = StyleSheet.create({
  button: { marginTop: 33 },
  confirmation: { color: '#159F79', fontFamily: fonts.medium, fontSize: 10, textAlign: 'center', marginTop: 4 },
});
