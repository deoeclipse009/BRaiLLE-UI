import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { ScreenHeader } from '../components/ScreenHeader';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

interface VoiceAnswerScreenProps {
  onBack: () => void;
  onSendToBraillePad: () => void;
}

export const VoiceAnswerScreen: React.FC<VoiceAnswerScreenProps> = ({
  onBack,
  onSendToBraillePad,
}) => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Jawaban Suara AI"
        subtitle="Asisten Pelajaran Tunanetra"
        onBack={onBack}
        badgeLabel="VOICE AI"
        badgeVariant="audio"
      />

      {/* Waveform Visualizer Mockup */}
      <Card variant="aliceBlue" padding={Theme.spacing.lg} style={styles.waveformCard}>
        <View style={styles.waveformTop}>
          <Badge label="MENDENGARKAN AUDIO" variant="audio" size="sm" />
          <MaterialCommunityIcons name="waveform" size={24} color={Colors.aliceBlueText} />
        </View>

        {/* Animated Waveform Bars Simulation */}
        <View style={styles.waveformBars}>
          {[14, 24, 40, 18, 52, 30, 44, 20, 36, 12, 48, 28, 16].map((h, i) => (
            <View
              key={i}
              style={[
                styles.waveBar,
                { height: isRecording ? h * 1.2 : h, opacity: i % 2 === 0 ? 1 : 0.6 },
              ]}
            />
          ))}
        </View>

        <Text style={styles.waveformStatus}>
          {isRecording ? 'Sedang merekam suara Anda...' : 'Suara AI Jelas • Bahasa Indonesia'}
        </Text>
      </Card>

      {/* User's Question Card */}
      <Card variant="paper" padding={Theme.spacing.md}>
        <Text style={styles.sectionTitle}>PERTANYAAN SUARA ANDA</Text>
        <Text style={styles.questionText}>
          "Bisakah jelaskan secara sederhana fungsi klorofil pada daun?"
        </Text>
      </Card>

      {/* AI Explanation Result */}
      <Card variant="paper" padding={Theme.spacing.lg} style={{ gap: 8 }}>
        <View style={styles.aiHeader}>
          <View style={styles.aiBadgeGroup}>
            <MaterialCommunityIcons name="robot" size={18} color={Colors.ink900} />
            <Text style={styles.aiTitle}>PENJELASAN GEMINI AI</Text>
          </View>
          <Badge label="AUDIO + TAKTIL" variant="tactile" size="sm" />
        </View>

        <Text style={styles.aiResponseText}>
          Klorofil adalah zat hijau daun yang bekerja seperti 'panel surya alami'. Klorofil menyerap
          energi dari sinar matahari lalu menggunakannya untuk mengubah air dan karbondioksida
          menjadi makanan bagi tumbuhan.
        </Text>

        <Button
          label="Kirim Penjelasan ke Braille Pad"
          variant="highlight"
          size="md"
          icon="braille"
          fullWidth
          onPress={onSendToBraillePad}
          style={{ marginTop: 8 }}
        />
      </Card>

      {/* Push-to-Talk Recording Section */}
      <View style={styles.recordSection}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPressIn={() => setIsRecording(true)}
          onPressOut={() => setIsRecording(false)}
          style={[styles.recordCircle, isRecording && styles.recordingActive]}
        >
          <MaterialCommunityIcons
            name={isRecording ? 'microphone' : 'microphone-outline'}
            size={40}
            color={isRecording ? Colors.paper100 : Colors.ink900}
          />
        </TouchableOpacity>
        <Text style={styles.recordHint}>
          {isRecording ? 'Lepas untuk Mengirim Pertanyaan' : 'Tahan Tombol Mikrofon untuk Bertanya'}
        </Text>
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
  waveformCard: {
    gap: 16,
    alignItems: 'center',
  },
  waveformTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  waveformBars: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    gap: 6,
  },
  waveBar: {
    width: 6,
    backgroundColor: Colors.ink900,
    borderRadius: 3,
  },
  waveformStatus: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 12,
    color: Colors.aliceBlueText,
  },
  sectionTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 11,
    color: Colors.ink500,
    letterSpacing: 1,
    marginBottom: 4,
  },
  questionText: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 15,
    color: Colors.ink900,
    fontStyle: 'italic',
  },
  aiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiBadgeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aiTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 11,
    color: Colors.ink900,
    letterSpacing: 1,
  },
  aiResponseText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 15,
    color: Colors.ink800,
    lineHeight: 22,
  },
  recordSection: {
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  recordCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.aliceBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.aliceBlueDark,
  },
  recordingActive: {
    backgroundColor: Colors.alert,
    borderColor: Colors.alert,
  },
  recordHint: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 13,
    color: Colors.ink700,
  },
});
