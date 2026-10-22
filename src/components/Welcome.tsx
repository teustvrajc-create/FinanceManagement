import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, fonts, Logo, PillButton } from '../ui';

type Props = {
  onLogin?: () => void;
  onSignUp?: () => void;
  onForgot?: () => void;
};

/** 1-B · Launch — приветственный экран: Log In / Sign Up / Forgot Password */
export default function Welcome({ onLogin, onSignUp, onForgot }: Props) {
  // плавное появление после заставки
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <StatusBar style="dark" />

      <Logo iconColor={colors.primary} textColor={colors.primary} />

      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Text>

      <PillButton
        title="Log In"
        background={colors.primary}
        onPress={() => onLogin?.()}
      />
      <PillButton
        title="Sign Up"
        background={colors.soft}
        onPress={() => onSignUp?.()}
      />

      <Pressable onPress={() => onForgot?.()} hitSlop={10}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 14,
  },
  description: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 17,
    color: colors.text,
    textAlign: 'center',
    maxWidth: 260,
    marginTop: -4,
    marginBottom: 14,
  },
  forgot: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
  },
});
