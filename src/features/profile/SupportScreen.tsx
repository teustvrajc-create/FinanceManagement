import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { FinanceLayout, PageHeader, PrimaryButton } from '../../components/finance/primitives';
import Icon from '../../components/finance/Icon';
import { colors, fonts } from '../../theme';

export default function SupportScreen() {
  const [chat, setChat] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  return <FinanceLayout active="profile">
    <PageHeader title={chat ? 'Support Assistant' : 'Online Support'} onBack={() => chat ? setChat(false) : router.back()} notification />
    {!chat ? <>
      <Text style={styles.group}>Active Chats</Text><Pressable onPress={() => setChat(true)} style={styles.chatRow}><View style={styles.icon}><Icon name="search" size={20} color={colors.dark} /></View><View style={styles.chatText}><Text style={styles.title}>Support Assistant</Text><Text style={styles.detail}>Hello! I’m here to assist you</Text></View><Text style={styles.time}>2 Min Ago</Text></Pressable>
      <Text style={styles.group}>Ended Chats</Text>{[['Help Center', 'Your account is ready to use...', 'Feb 08 · 2024'], ['Support Assistant', 'Hello! I’m here to assist you', 'Dec 24 · 2023'], ['Support Assistant', 'Hello! I’m here to assist you', 'Sep 10 · 2023'], ['Help Center', 'Hi, how are you today?', 'June 12 · 2023']].map(([title, detail, time]) => <Pressable key={time} onPress={() => setChat(true)} style={styles.chatRow}><View style={styles.icon}><Icon name="search" size={20} color={colors.dark} /></View><View style={styles.chatText}><Text style={styles.title}>{title}</Text><Text style={styles.detail}>{detail}</Text></View><Text style={styles.time}>{time}</Text></Pressable>)}<PrimaryButton title="Start Another Chat" onPress={() => setChat(true)} style={styles.start} />
    </> : <View style={styles.conversation}>
      <View style={styles.bubble}><Text style={styles.bubbleText}>Hello! I’m here to assist you. What can I help you with today?</Text></View>
      {sent ? <View style={[styles.bubble, styles.userBubble]}><Text style={styles.bubbleText}>{message || 'I need help with my account.'}</Text></View> : null}
      <View style={styles.inputRow}><TextInput value={message} onChangeText={setMessage} placeholder="Type your message..." style={styles.input} /><Pressable onPress={() => setSent(true)} style={styles.send}><Icon name="arrow" size={17} color={colors.dark} /></Pressable></View>
    </View>}
  </FinanceLayout>;
}
const styles = StyleSheet.create({
  group: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 10, marginTop: 10, marginBottom: 8 },
  chatRow: { minHeight: 66, backgroundColor: '#DDF7E2', borderRadius: 15, padding: 9, flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  icon: { width: 39, height: 39, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  chatText: { flex: 1 },
  title: { color: colors.dark, fontFamily: fonts.semiBold, fontSize: 10 },
  detail: { color: colors.text, fontFamily: fonts.medium, fontSize: 8, marginTop: 3 },
  time: { color: colors.muted, backgroundColor: '#F3FFF5', borderRadius: 8, paddingHorizontal: 5, paddingVertical: 4, fontFamily: fonts.medium, fontSize: 7 },
  start: { width: 220, alignSelf: 'center', marginTop: 11 },
  conversation: { flex: 1, minHeight: 360, justifyContent: 'flex-end', paddingBottom: 10 },
  bubble: { maxWidth: '83%', alignSelf: 'flex-start', backgroundColor: '#DDF7E2', padding: 12, borderRadius: 16, marginBottom: 12 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#BCEED5' },
  bubbleText: { color: colors.dark, fontFamily: fonts.medium, fontSize: 10, lineHeight: 15 },
  inputRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  input: { flex: 1, minHeight: 43, backgroundColor: '#DDF7E2', borderRadius: 14, paddingHorizontal: 12, color: colors.dark, fontFamily: fonts.medium, fontSize: 9 },
  send: { width: 40, height: 40, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }
});
