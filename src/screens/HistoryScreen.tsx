import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { ScreenHeader } from '../components/ScreenHeader';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

interface HistoryScreenProps {
  onSelectMateri: (title: string) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ onSelectMateri }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filters = ['Semua', 'IPA', 'Matematika', 'Bahasa', 'Soal Ujian'];

  const historyItems = [
    {
      id: '1',
      title: 'IPA Bab 4: Fotosintesis',
      date: 'Hari ini • 14:20',
      words: 142,
      category: 'IPA',
      hasAudio: true,
      hasBraille: true,
    },
    {
      id: '2',
      title: 'Matematika: Persamaan Aljabar',
      date: 'Kemarin • 09:15',
      words: 86,
      category: 'Matematika',
      hasAudio: true,
      hasBraille: true,
    },
    {
      id: '3',
      title: 'Bahasa Indonesia: Teks Laporan Hasil Observasi',
      date: '14 Sep 2026',
      words: 320,
      category: 'Bahasa',
      hasAudio: false,
      hasBraille: true,
    },
    {
      id: '4',
      title: 'Soal UTS IPA Semester 1',
      date: '12 Sep 2026',
      words: 210,
      category: 'Soal Ujian',
      hasAudio: true,
      hasBraille: true,
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Riwayat Materi"
        subtitle="Arsip Pindaian Taktil & Audio"
        badgeLabel="4 MATERI DIBACA"
        badgeVariant="dark"
      />

      {/* Search Input Bar */}
      <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" size={22} color={Colors.ink500} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari materi atau topik pelajaran..."
          placeholderTextColor={Colors.ink500}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialCommunityIcons name="close-circle" size={18} color={Colors.ink500} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Chips Scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
        {filters.map((f) => {
          const isActive = activeFilter === f;
          return (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* History Items List */}
      <View style={styles.historyList}>
        {historyItems.map((item) => (
          <Card
            key={item.id}
            variant="paper"
            padding={Theme.spacing.lg}
            onPress={() => onSelectMateri(item.title)}
            style={styles.itemCard}
          >
            <View style={styles.itemTop}>
              <Badge label={item.category} variant="muted" size="sm" />
              <TouchableOpacity>
                <MaterialCommunityIcons name="star-outline" size={20} color={Colors.ink500} />
              </TouchableOpacity>
            </View>

            <Text style={styles.itemTitle}>{item.title}</Text>

            <View style={styles.itemBottom}>
              <Text style={styles.itemDate}>
                {item.date} • {item.words} kata
              </Text>
              <View style={styles.badgesRow}>
                {item.hasBraille && <Badge label="TAKTIL" variant="tactile" size="sm" />}
                {item.hasAudio && <Badge label="AUDIO" variant="audio" size="sm" />}
              </View>
            </View>
          </Card>
        ))}
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.paper100,
    borderRadius: Theme.radius.pill,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.paper200,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Urbanist-Medium',
    fontSize: 14,
    color: Colors.ink900,
  },
  filtersScroll: {
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Theme.radius.pill,
    backgroundColor: Colors.paper100,
    borderWidth: 1,
    borderColor: Colors.paper200,
  },
  filterChipActive: {
    backgroundColor: Colors.ink900,
    borderColor: Colors.ink900,
  },
  filterText: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 13,
    color: Colors.ink700,
  },
  filterTextActive: {
    color: Colors.paper100,
  },
  historyList: {
    gap: Theme.spacing.md,
  },
  itemCard: {
    gap: 8,
  },
  itemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 16,
    color: Colors.ink900,
    fontWeight: '700',
  },
  itemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  itemDate: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 12,
    color: Colors.ink500,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 6,
  },
});
