import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { ScreenHeader } from '../components/ScreenHeader';
import { Card } from '../components/Card';
import { DeviceStatus } from '../components/DeviceStatus';
import { Badge } from '../components/Badge';

export const SettingsScreen: React.FC = () => {
  const [autoConnect, setAutoConnect] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [audioPrompt, setAudioPrompt] = useState(true);
  const [grade2Braille, setGrade2Braille] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Pengaturan"
        subtitle="Perangkat, Braille & Aksesibilitas"
        badgeLabel="SISTEM OK"
        badgeVariant="ble"
      />

      {/* BLE Device Status */}
      <DeviceStatus deviceName="BRaiLLE Pad Pro 40" batteryLevel={82} isConnected={true} />

      {/* Device Connection Settings */}
      <Card variant="paper" padding={Theme.spacing.lg} style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>PERANGKAT BLE BRAILLE PAD</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingTextContent}>
            <Text style={styles.settingLabel}>Sambung Otomatis BLE</Text>

            <Text style={styles.settingSub}>Sambungkan ke Pad Braille saat aplikasi dibuka</Text>
          </View>
          <Switch
            value={autoConnect}
            onValueChange={setAutoConnect}
            trackColor={{ false: Colors.paper200, true: Colors.honeydewDark }}
            thumbColor={autoConnect ? Colors.honeydewText : Colors.paper100}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingTextContent}>
            <Text style={styles.settingLabel}>Getaran Haptik Ponsel</Text>
            <Text style={styles.settingSub}>Getar saat tombol taktil ditekan</Text>
          </View>
          <Switch
            value={hapticFeedback}
            onValueChange={setHapticFeedback}
            trackColor={{ false: Colors.paper200, true: Colors.vanilaDark }}
            thumbColor={hapticFeedback ? Colors.vanilaText : Colors.paper100}
          />
        </View>
      </Card>

      {/* Braille System Options */}
      <Card variant="paper" padding={Theme.spacing.lg} style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>SISTEM PENULISAN BRAILLE</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingTextContent}>
            <Text style={styles.settingLabel}>Gunakan Grade-2 Braille (Kontraksi)</Text>
            <Text style={styles.settingSub}>Default: Grade-1 (Karabater per karakter)</Text>
          </View>
          <Switch
            value={grade2Braille}
            onValueChange={setGrade2Braille}
            trackColor={{ false: Colors.paper200, true: Colors.vanilaDark }}
            thumbColor={grade2Braille ? Colors.vanilaText : Colors.paper100}
          />
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.navigationRow}>
          <View style={styles.settingTextContent}>
            <Text style={styles.settingLabel}>Ketinggian Jarum Taktil Pad</Text>
            <Text style={styles.settingSub}>Sedang (0.8mm) • 3 Tingkat Ketinggian</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.ink500} />
        </TouchableOpacity>
      </Card>

      {/* Audio Assistant Options */}
      <Card variant="paper" padding={Theme.spacing.lg} style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>SUARA & PANDUAN AUDIO AI</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingTextContent}>
            <Text style={styles.settingLabel}>Panduan Suara Navigasi</Text>
            <Text style={styles.settingSub}>Ucapkan label tombol secara otomatis</Text>
          </View>
          <Switch
            value={audioPrompt}
            onValueChange={setAudioPrompt}
            trackColor={{ false: Colors.paper200, true: Colors.aliceBlueDark }}
            thumbColor={audioPrompt ? Colors.aliceBlueText : Colors.paper100}
          />
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.navigationRow}>
          <View style={styles.settingTextContent}>
            <Text style={styles.settingLabel}>Pilih Suara Asisten TTS</Text>
            <Text style={styles.settingSub}>Bahasa Indonesia (Wanita - Berbunga)</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.ink500} />
        </TouchableOpacity>
      </Card>

      {/* About App Info */}
      <Card variant="muted" padding={Theme.spacing.lg} style={{ alignItems: 'center', gap: 6 }}>
        <Badge label="SOLVE FOR TOMORROW 2026" variant="tactile" size="sm" />
        <Text style={styles.aboutTitle}>BRaiLLE App v1.0.0 (Expo Go Build)</Text>
        <Text style={styles.aboutSub}>
          Inovasi Aksesibilitas Taktil & Suara AI untuk Tunanetra Indonesia
        </Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paper0,
  },
  content: {
    padding: Theme.spacing.gutter,
    gap: Theme.spacing.lg,
    paddingBottom: 40,
  },
  settingsGroup: {
    gap: 12,
  },
  groupTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 11,
    color: Colors.ink500,
    letterSpacing: 1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  navigationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingTextContent: {
    flex: 1,
  },
  settingLabel: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 15,
    color: Colors.ink900,
    fontWeight: '700',
  },
  settingSub: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 12,
    color: Colors.ink500,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.paper200,
  },
  aboutTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 14,
    color: Colors.ink900,
    marginTop: 4,
  },
  aboutSub: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 12,
    color: Colors.ink500,
    textAlign: 'center',
  },
});
