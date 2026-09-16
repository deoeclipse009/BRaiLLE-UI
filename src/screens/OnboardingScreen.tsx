import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { BrailleCell } from '../components/BrailleCell';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

interface OnboardingScreenProps {
  onStart: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onStart }) => {
  const [selectedRole, setSelectedRole] = useState<'siswa' | 'guru'>('siswa');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Badge */}
      <View style={styles.topBadgeRow}>
        <Badge label="SAMSUNG SOLVE FOR TOMORROW 2026" variant="tactile" size="sm" />
      </View>

      {/* Hero Braille Cells */}
      <View style={styles.heroBrailleBox}>
        <Text style={styles.heroLabel}>AKSESIBILITAS TAKTIL MANDIRI</Text>
        <View style={styles.brailleCellsRow}>
          <BrailleCell char="b" size="lg" variant="vanila" />
          <BrailleCell char="r" size="lg" variant="vanila" />
          <BrailleCell char="a" size="lg" variant="vanila" />
          <BrailleCell char="i" size="lg" variant="vanila" />
          <BrailleCell char="l" size="lg" variant="vanila" />
        </View>
      </View>

      {/* Title & Description */}
      <View style={styles.textGroup}>
        <Text style={styles.title}>Baca Teks Cetak Secara Mandiri</Text>
        <Text style={styles.description}>
          Platform AI taktil untuk siswa tunanetra Indonesia. Ubah materi pelajaran & soal ujian
          menjadi teks Braille dan audio interaktif dalam hitungan detik.
        </Text>
      </View>

      {/* Role Selection */}
      <View style={styles.roleBox}>
        <Text style={styles.roleBoxTitle}>PILIH PERAN PENGGUNA:</Text>
        <View style={styles.roleBtnsRow}>
          <Button
            label="Siswa Tunanetra"
            variant={selectedRole === 'siswa' ? 'highlight' : 'secondary'}
            size="sm"
            icon="circle-slice-8"
            onPress={() => setSelectedRole('siswa')}
          />
          <Button
            label="Guru Pendamping"
            variant={selectedRole === 'guru' ? 'highlight' : 'secondary'}
            size="sm"
            icon="human-male-board"
            onPress={() => setSelectedRole('guru')}
          />
        </View>
      </View>

      {/* Feature Highlights */}
      <View style={styles.featuresList}>
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <MaterialCommunityIcons name="camera" size={20} color={Colors.ink900} />
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Pindai Teks Cepat</Text>
            <Text style={styles.featureSub}>Deteksi otomatis tulisan tangan & cetak</Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: Colors.vanila }]}>
            <MaterialCommunityIcons name="braille" size={20} color={Colors.ink900} />
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Output Pad Taktil BLE</Text>
            <Text style={styles.featureSub}>Kirim langsung ke perangkat Braille Pad</Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: Colors.aliceBlue }]}>
            <MaterialCommunityIcons name="waveform" size={20} color={Colors.ink900} />
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Asisten Suara AI Bahasa Indonesia</Text>
            <Text style={styles.featureSub}>Penjelasan soal matematika & IPA</Text>
          </View>
        </View>
      </View>

      {/* CTA Button */}
      <View style={styles.bottomArea}>
        <Button
          label="Mulai Pakai Sekarang"
          variant="highlight"
          size="comfortable"
          icon="arrow-right"
          iconPosition="right"
          fullWidth
          onPress={onStart}
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
    gap: Theme.spacing.xl,
    paddingBottom: 40,
  },
  topBadgeRow: {
    alignItems: 'center',
    marginTop: 8,
  },
  heroBrailleBox: {
    backgroundColor: Colors.ink900,
    borderRadius: Theme.radius.card,
    padding: Theme.spacing.xl,
    alignItems: 'center',
    gap: 12,
  },
  heroLabel: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 10,
    color: Colors.vanila,
    letterSpacing: 1.5,
  },
  brailleCellsRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  textGroup: {
    gap: 8,
  },
  title: {
    fontFamily: 'Urbanist-Bold',
    fontSize: Theme.typography.sizes.h1,
    color: Colors.ink900,
    fontWeight: '800',
    lineHeight: 38,
  },
  description: {
    fontFamily: 'Urbanist-Regular',
    fontSize: Theme.typography.sizes.md,
    color: Colors.ink700,
    lineHeight: 22,
  },
  roleBox: {
    backgroundColor: Colors.paper100,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.card,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.paper200,
  },
  roleBoxTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 11,
    color: Colors.ink500,
    letterSpacing: 1,
  },
  roleBtnsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  featuresList: {
    gap: Theme.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
    backgroundColor: Colors.paper100,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.card,
    borderWidth: 1,
    borderColor: Colors.paper200,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.paper200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 15,
    color: Colors.ink900,
    fontWeight: '700',
  },
  featureSub: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 12,
    color: Colors.ink500,
  },
  bottomArea: {
    marginTop: 8,
  },
});
