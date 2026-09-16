import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { BrailleCell } from '../components/BrailleCell';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

interface ProcessingScreenProps {
  onFinish: () => void;
  onCancel: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onFinish, onCancel }) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 1500);
    const timer2 = setTimeout(() => setStep(3), 3000);
    const timer3 = setTimeout(() => onFinish(), 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBadge}>
        <Badge label="PROSESING AI AKTIF" variant="tactile" size="sm" />
      </View>

      {/* Animated Braille Cycling Header */}
      <View style={styles.brailleCenter}>
        <View style={styles.cellsRow}>
          <BrailleCell char="o" size="xl" variant="dark" />
          <BrailleCell char="c" size="xl" variant="dark" />
          <BrailleCell char="r" size="xl" variant="dark" />
        </View>
        <Text style={styles.title}>Memproses Teks Cetak...</Text>
        <Text style={styles.subtitle}>Gemini 2.5 Vision OCR Engine</Text>
      </View>

      {/* Step Progress Checklist */}
      <View style={styles.stepList}>
        <View style={styles.stepItem}>
          <View style={[styles.stepIcon, step >= 1 ? styles.stepSuccess : styles.stepPending]}>
            <MaterialCommunityIcons
              name={step >= 1 ? 'check' : 'clock-outline'}
              size={18}
              color={step >= 1 ? Colors.ink900 : Colors.ink500}
            />
          </View>
          <View style={styles.stepTextContent}>
            <Text style={styles.stepTitle}>Pembersihan & Kontras Gambar</Text>
            <Text style={styles.stepSub}>
              {step >= 1 ? 'Selesai (100% Kontras Tinggi)' : 'Menunggu...'}
            </Text>
          </View>
        </View>

        <View style={styles.stepItem}>
          <View style={[styles.stepIcon, step >= 2 ? styles.stepSuccess : styles.stepPending]}>
            <MaterialCommunityIcons
              name={step >= 2 ? 'check' : step === 1 ? 'loading' : 'clock-outline'}
              size={18}
              color={step >= 2 ? Colors.ink900 : Colors.ink500}
            />
          </View>
          <View style={styles.stepTextContent}>
            <Text style={styles.stepTitle}>Pengenalan Karakter (OCR)</Text>
            <Text style={styles.stepSub}>
              {step >= 2 ? 'Deteksi 142 kata berhasil' : 'Sedang memproses...'}
            </Text>
          </View>
        </View>

        <View style={styles.stepItem}>
          <View style={[styles.stepIcon, step >= 3 ? styles.stepSuccess : styles.stepPending]}>
            <MaterialCommunityIcons
              name={step >= 3 ? 'check' : 'clock-outline'}
              size={18}
              color={step >= 3 ? Colors.ink900 : Colors.ink500}
            />
          </View>
          <View style={styles.stepTextContent}>
            <Text style={styles.stepTitle}>Konversi Matriks Braille Grade-1</Text>
            <Text style={styles.stepSub}>
              {step >= 3 ? 'Siap dikirim ke Braille Pad' : 'Menunggu...'}
            </Text>
          </View>
        </View>
      </View>

      {/* Cancel Button */}
      <Button
        label="Batalkan Proses"
        variant="ghost"
        size="md"
        onPress={onCancel}
        style={{ alignSelf: 'center', marginBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ink900,
    padding: Theme.spacing.gutter,
    justifyContent: 'space-between',
  },
  topBadge: {
    alignItems: 'center',
    marginTop: 12,
  },
  brailleCenter: {
    alignItems: 'center',
    gap: 16,
  },
  cellsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  title: {
    fontFamily: 'Urbanist-Bold',
    fontSize: Theme.typography.sizes.h2,
    color: Colors.paper100,
    fontWeight: '800',
  },
  subtitle: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 14,
    color: Colors.vanila,
  },
  stepList: {
    backgroundColor: Colors.ink800,
    borderRadius: Theme.radius.card,
    padding: Theme.spacing.lg,
    gap: Theme.spacing.lg,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  stepIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepSuccess: {
    backgroundColor: Colors.vanila,
  },
  stepPending: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  stepTextContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 14,
    color: Colors.paper100,
    fontWeight: '700',
  },
  stepSub: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 12,
    color: Colors.ink300,
  },
});
