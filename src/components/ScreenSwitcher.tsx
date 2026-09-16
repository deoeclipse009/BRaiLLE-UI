import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';

export type ScreenId =
  | 'onboard'
  | 'home'
  | 'scan'
  | 'processing'
  | 'result'
  | 'reading'
  | 'answer'
  | 'history'
  | 'teacher'
  | 'settings';

interface ScreenSwitcherProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
}

const SCREENS: { id: ScreenId; label: string; tag: string }[] = [
  { id: 'onboard', label: '1. Onboarding', tag: 'Awal' },
  { id: 'home', label: '2. Beranda', tag: 'Home' },
  { id: 'scan', label: '3. Pindai OCR', tag: 'Kamera' },
  { id: 'processing', label: '4. Proses OCR', tag: 'Loading' },
  { id: 'result', label: '5. Hasil Konversi', tag: 'Braille+Audio' },
  { id: 'reading', label: '6. Aliran Braille', tag: 'Full Stream' },
  { id: 'answer', label: '7. Jawaban Suara', tag: 'Mic Record' },
  { id: 'history', label: '8. Riwayat', tag: 'Arsip' },
  { id: 'teacher', label: '9. Dashboard Guru', tag: 'Guru' },
  { id: 'settings', label: '10. Pengaturan', tag: 'Setting' },
];

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onSelectScreen,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>PILIH LAYAR DEMO (10 LAYAR):</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {SCREENS.map((s) => {
          const isActive = currentScreen === s.id;
          return (
            <TouchableOpacity
              key={s.id}
              style={[
                styles.chip,
                isActive ? styles.chipActive : styles.chipInactive,
              ]}
              onPress={() => onSelectScreen(s.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.chipText,
                  isActive ? styles.chipTextActive : styles.chipTextInactive,
                ]}
              >
                {s.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ink900,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 10,
    color: Colors.vanila,
    letterSpacing: 1,
    marginBottom: 6,
    marginLeft: 4,
  },
  scrollContent: {
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Theme.radius.pill,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: Colors.vanila,
    borderColor: Colors.vanila,
  },
  chipInactive: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.15)',
  },
  chipText: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 12,
  },
  chipTextActive: {
    color: Colors.ink900,
  },
  chipTextInactive: {
    color: Colors.paper100,
  },
});
