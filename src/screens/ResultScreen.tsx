import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { ScreenHeader } from '../components/ScreenHeader';
import { BrailleCell } from '../components/BrailleCell';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { PadNavigator } from '../components/PadNavigator';

interface ResultScreenProps {
  onBack: () => void;
  onOpenFullReading: () => void;
  onOpenVoiceAnswer: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  onBack,
  onOpenFullReading,
  onOpenVoiceAnswer,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speed, setSpeed] = useState<'1.0x' | '1.25x' | '1.5x'>('1.0x');

  const currentWord = 'HITU'; // H - I - T - U

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Hasil Konversi"
        subtitle="Materi IPA Bab 4 • Teks Taktil Siap"
        onBack={onBack}
        badgeLabel="GRADE-1 BRAILLE"
        badgeVariant="tactile"
      />

      {/* Main Recognized Text Card */}
      <Card variant="paper" padding={Theme.spacing.lg}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>TEKS HASIL OCR GEMINI</Text>
          <Badge label="AKURASI 99%" variant="ok" size="sm" />
        </View>
        <Text style={styles.ocrResultText}>
          <Text style={styles.highlightText}>Fotosintesis</Text> adalah proses pembuatan makanan
          oleh tumbuhan hijau dengan menggunakan cahaya matahari, air, dan karbon dioksida.
        </Text>
      </Card>

      {/* Active Word Braille Display Box */}
      <Card variant="vanila" padding={Theme.spacing.lg} style={styles.brailleOutputCard}>
        <View style={styles.brailleOutputHeader}>
          <View style={styles.brailleOutputTitleGroup}>
            <MaterialCommunityIcons name="braille" size={20} color={Colors.vanilaText} />
            <Text style={styles.brailleOutputTitle}>OUTPUT MATRIKS TAKTIL (4 CELL)</Text>
          </View>
          <TouchableOpacity onPress={onOpenFullReading}>
            <Text style={styles.fullScreenLink}>Layar Penuh ↗</Text>
          </TouchableOpacity>
        </View>

        {/* 4 Braille Cells Row */}
        <View style={styles.brailleRow}>
          {currentWord.split('').map((char, index) => (
            <BrailleCell
              key={index}
              char={char}
              size="lg"
              variant="paper"
              showCharLabel={true}
            />
          ))}
        </View>

        <Text style={styles.padSyncStatus}>✓ Terhubung ke BLE Pad: Sel 1-4 Aktif</Text>
      </Card>

      {/* Audio TTS Row */}
      <Card variant="aliceBlue" padding={Theme.spacing.md}>
        <View style={styles.audioRow}>
          <TouchableOpacity
            style={styles.playAudioBtn}
            onPress={() => setIsPlayingAudio(!isPlayingAudio)}
          >
            <MaterialCommunityIcons
              name={isPlayingAudio ? 'pause' : 'play'}
              size={24}
              color={Colors.paper100}
            />
          </TouchableOpacity>

          <View style={styles.audioInfo}>
            <Text style={styles.audioTitle}>Audio TTS Bahasa Indonesia</Text>
            <Text style={styles.audioSub}>Suara Alami • Durasi 0:42</Text>
          </View>

          {/* Speed Selector */}
          <TouchableOpacity
            style={styles.speedChip}
            onPress={() => {
              if (speed === '1.0x') setSpeed('1.25x');
              else if (speed === '1.25x') setSpeed('1.5x');
              else setSpeed('1.0x');
            }}
          >
            <Text style={styles.speedText}>{speed}</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Tactile Pad Navigator */}
      <PadNavigator
        isPlaying={isPlayingAudio}
        onPlayPause={() => setIsPlayingAudio(!isPlayingAudio)}
      />

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <Button
          label="Layar Penuh Braille"
          variant="highlight"
          size="comfortable"
          icon="fullscreen"
          fullWidth
          onPress={onOpenFullReading}
        />
        <Button
          label="Tanyakan Asisten Suara AI"
          variant="audio"
          size="comfortable"
          icon="microphone"
          fullWidth
          onPress={onOpenVoiceAnswer}
        />
      </View>
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 11,
    color: Colors.ink500,
    letterSpacing: 1,
  },
  ocrResultText: {
    fontFamily: 'Urbanist-Medium',
    fontSize: Theme.typography.sizes.lg,
    color: Colors.ink900,
    lineHeight: 26,
  },
  highlightText: {
    backgroundColor: Colors.vanila,
    fontFamily: 'Urbanist-Bold',
    paddingHorizontal: 4,
  },
  brailleOutputCard: {
    gap: 12,
  },
  brailleOutputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brailleOutputTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brailleOutputTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 11,
    color: Colors.vanilaText,
    letterSpacing: 1,
  },
  fullScreenLink: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 12,
    color: Colors.ink900,
    textDecorationLine: 'underline',
  },
  brailleRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
  },
  padSyncStatus: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 12,
    color: Colors.vanilaText,
    textAlign: 'center',
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  playAudioBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.ink900,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioInfo: {
    flex: 1,
  },
  audioTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 14,
    color: Colors.aliceBlueText,
    fontWeight: '700',
  },
  audioSub: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 12,
    color: Colors.ink700,
  },
  speedChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Theme.radius.pill,
    backgroundColor: Colors.paper100,
  },
  speedText: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 12,
    color: Colors.ink900,
  },
  actionsRow: {
    gap: Theme.spacing.md,
  },
});
