import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { DeviceStatus } from '../components/DeviceStatus';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

interface HomeScreenProps {
  onScanPress: () => void;
  onSelectMateri: (title: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onScanPress, onSelectMateri }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Greeting */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greetingTag}>SELAMAT DATANG</Text>
          <Text style={styles.userName}>Halo, Budi Utomo 👋</Text>
          <Text style={styles.userClass}>SLB Negeri A Jakarta • Kelas 8</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <MaterialCommunityIcons name="account-circle" size={40} color={Colors.ink900} />
        </TouchableOpacity>
      </View>

      {/* Primary Scan CTA Card */}
      <Card variant="dark" padding={Theme.spacing.xl} style={styles.scanCard}>
        <View style={styles.scanCardTop}>
          <Badge label="REKOMENDASI MANDIRI" variant="tactile" size="sm" />
          <MaterialCommunityIcons name="lightning-bolt" size={24} color={Colors.vanila} />
        </View>
        <Text style={styles.scanCardTitle}>Pindai Materi Baru</Text>
        <Text style={styles.scanCardSub}>
          Arahkan kamera ke buku cetak, LKS, atau lembar soal untuk langsung dibaca di Pad Braille.
        </Text>

        <Button
          label="Buka Kamera Pindai"
          variant="highlight"
          size="comfortable"
          icon="camera"
          fullWidth
          onPress={onScanPress}
          style={{ marginTop: 12 }}
        />
      </Card>

      {/* BLE Device Status */}
      <DeviceStatus deviceName="BRaiLLE Pad Pro 40" batteryLevel={82} isConnected={true} />

      {/* Daily Progress */}
      <Card variant="paper" padding={Theme.spacing.lg}>
        <View style={styles.progressHeader}>
          <Text style={styles.sectionTitle}>TARGET BELAJAR HARI INI</Text>
          <Text style={styles.progressValue}>3 / 5 Materi</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '60%' }]} />
        </View>
        <Text style={styles.progressSub}>2 materi lagi untuk mencapai target harian!</Text>
      </Card>

      {/* Recent Reads */}
      <View style={styles.recentSection}>
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>MATERI TERAKHIR DIBACA</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentList}>
          <Card
            variant="paper"
            padding={Theme.spacing.md}
            onPress={() => onSelectMateri('IPA Bab 4: Fotosintesis')}
          >
            <View style={styles.materiRow}>
              <View style={[styles.materiIcon, { backgroundColor: Colors.vanila }]}>
                <MaterialCommunityIcons name="leaf" size={22} color={Colors.ink900} />
              </View>
              <View style={styles.materiInfo}>
                <Text style={styles.materiTitle}>IPA Bab 4: Fotosintesis</Text>
                <Text style={styles.materiSub}>Dibaca 15 menit lalu • Taktil OK</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.ink500} />
            </View>
          </Card>

          <Card
            variant="paper"
            padding={Theme.spacing.md}
            onPress={() => onSelectMateri('Matematika: Persamaan Aljabar')}
          >
            <View style={styles.materiRow}>
              <View style={[styles.materiIcon, { backgroundColor: Colors.aliceBlue }]}>
                <MaterialCommunityIcons name="calculator" size={22} color={Colors.ink900} />
              </View>
              <View style={styles.materiInfo}>
                <Text style={styles.materiTitle}>Matematika: Persamaan Aljabar</Text>
                <Text style={styles.materiSub}>Kemarin • Ada Jawaban Suara</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.ink500} />
            </View>
          </Card>
        </View>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  greetingTag: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 10,
    color: Colors.ink500,
    letterSpacing: 1,
  },
  userName: {
    fontFamily: 'Urbanist-Bold',
    fontSize: Theme.typography.sizes.h2,
    color: Colors.ink900,
    fontWeight: '800',
  },
  userClass: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 13,
    color: Colors.ink700,
  },
  profileBtn: {
    padding: 4,
  },
  scanCard: {
    gap: 8,
  },
  scanCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scanCardTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: Theme.typography.sizes.h2,
    color: Colors.paper100,
    fontWeight: '800',
  },
  scanCardSub: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 14,
    color: Colors.ink300,
    lineHeight: 20,
  },
  progressHeader: {
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
  progressValue: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 13,
    color: Colors.ink900,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: Colors.paper200,
    borderRadius: Theme.radius.pill,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.vanilaDark,
    borderRadius: Theme.radius.pill,
  },
  progressSub: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 12,
    color: Colors.ink700,
  },
  recentSection: {
    gap: Theme.spacing.sm,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 12,
    color: Colors.ink900,
  },
  recentList: {
    gap: Theme.spacing.sm,
  },
  materiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  materiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  materiInfo: {
    flex: 1,
  },
  materiTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 15,
    color: Colors.ink900,
    fontWeight: '700',
  },
  materiSub: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 12,
    color: Colors.ink500,
  },
});
