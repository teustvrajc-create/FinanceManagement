import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, Logo } from '../ui';


export default function Splash() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Logo iconColor={colors.dark} textColor={colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
