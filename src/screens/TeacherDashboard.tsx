import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { ScreenHeader } from '../components/ScreenHeader';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

export const TeacherDashboard: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Dashboard Guru"
        subtitle="SLB Negeri A Jakarta • Kelas 8 (12 Siswa)"
        badgeLabel="MODE PENDAMPING"
        badgeVariant="dark"
      />

      {/* Top Stat Tiles */}
      <View style={styles.statsGrid}>
        <Card variant="paper" padding={Theme.spacing.md} style={styles.statTile}>
          <Text style={styles.statNumber}>148</Text>
          <Text style={styles.statLabel}>Materi Dibaca Bulan Ini</Text>
          <Badge label="+18% minggu ini" variant="ok" size="sm" style={{ marginTop: 4 }} />
        </Card>

        <Card variant="paper" padding={Theme.spacing.md} style={styles.statTile}>
          <Text style={styles.statNumber}>24 wpm</Text>
          <Text style={styles.statLabel}>Rata-Rata Kecepatan</Text>
          <Badge label="Grade-1 Braille" variant="tactile" size="sm" style={{ marginTop: 4 }} />
        </Card>
      </View>

      {/* Device Fleet Status */}
      <Card variant="honeydew" padding={Theme.spacing.lg}>
        <View style={styles.fleetHeader}>
          <View style={styles.fleetTitleRow}>
            <MaterialCommunityIcons name="bluetooth-connect" size={20} color={Colors.honeydewText} />
            <Text style={styles.fleetTitle}>ARMADA PERANGKAT BRAILLE PAD</Text>
          </View>
          <Text style={styles.fleetCount}>11 / 12 Terhubung</Text>
        </View>

        <Text style={styles.fleetDesc}>
          11 siswa aktif terhubung ke Pad Braille taktil. 1 perangkat (Pad #04) perlu diisi daya.
        </Text>
      </Card>

      {/* Students Needing Assistance Alert */}
      <Card variant="paper" padding={Theme.spacing.lg} style={{ borderColor: Colors.alert }}>
        <View style={styles.alertHeader}>
          <MaterialCommunityIcons name="alert-circle" size={20} color={Colors.alert} />
          <Text style={styles.alertTitle}>PERHATIAN PENDAMPING</Text>
        </View>

        <View style={styles.studentAlertRow}>
          <View style={styles.studentAvatar}>
            <Text style={styles.avatarInitials}>AR</Text>
          </View>
          <View style={styles.studentAlertInfo}>
            <Text style={styles.studentName}>Ahmad Rizky (Siswa #07)</Text>
            <Text style={styles.studentSub}>
              Kecepatan rabaan melambat pada rumus aljabar. Disarankan bantuan audio AI.
            </Text>
          </View>
          <Button label="Bantu" variant="secondary" size="sm" />
        </View>
      </Card>

      {/* Weekly Reading Activity Bar Chart */}
      <Card variant="paper" padding={Theme.spacing.lg}>
        <Text style={styles.sectionTitle}>AKTIVITAS MEMBACA TAKTIL MINGGU INI</Text>

        <View style={styles.chartContainer}>
          {[
            { day: 'Sen', val: 70 },
            { day: 'Sel', val: 85 },
            { day: 'Rab', val: 95 },
            { day: 'Kam', val: 60 },
            { day: 'Jum', val: 90 },
            { day: 'Sab', val: 40 },
            { day: 'Min', val: 20 },
          ].map((bar, i) => (
            <View key={i} style={styles.chartCol}>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { height: `${bar.val}%` }]} />
              </View>
              <Text style={styles.chartDay}>{bar.day}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Upload Course Material CTA */}
      <Button
        label="Unggah Dokumen Pelajaran (PDF/Word)"
        variant="primary"
        size="comfortable"
        icon="file-upload"
        fullWidth
      />
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
  statsGrid: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  statTile: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 2,
  },
  statNumber: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 26,
    color: Colors.ink900,
    fontWeight: '800',
  },
  statLabel: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 12,
    color: Colors.ink500,
  },
  fleetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  fleetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fleetTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 11,
    color: Colors.honeydewText,
    letterSpacing: 1,
  },
  fleetCount: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 13,
    color: Colors.honeydewText,
  },
  fleetDesc: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 13,
    color: Colors.honeydewText,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  alertTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 11,
    color: Colors.alert,
    letterSpacing: 1,
  },
  studentAlertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  studentAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.paper200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 14,
    color: Colors.ink900,
  },
  studentAlertInfo: {
    flex: 1,
  },
  studentName: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 14,
    color: Colors.ink900,
  },
  studentSub: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 12,
    color: Colors.ink700,
  },
  sectionTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 11,
    color: Colors.ink500,
    letterSpacing: 1,
    marginBottom: 12,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingTop: 10,
  },
  chartCol: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  barTrack: {
    width: 14,
    height: 90,
    backgroundColor: Colors.paper200,
    borderRadius: Theme.radius.pill,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    backgroundColor: Colors.ink900,
    borderRadius: Theme.radius.pill,
  },
  chartDay: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 11,
    color: Colors.ink500,
  },
});
