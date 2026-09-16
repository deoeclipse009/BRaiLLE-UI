import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { BrailleCell } from '../components/BrailleCell';
import { Badge } from '../components/Badge';

interface ReadingScreenProps {
  onClose: () => void;
}

export const ReadingScreen: React.FC<ReadingScreenProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);

  const words = ['FOTO', 'SINTESIS', 'ADALAH', 'PROSES', 'PEMBUATAN'];
  const currentWord = words[wordIndex] || 'FOTO';

  const handleNext = () => setWordIndex((prev) => (prev + 1) % words.length);
  const handlePrev = () => setWordIndex((prev) => (prev - 1 + words.length) % words.length);

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <MaterialCommunityIcons name="close" size={24} color={Colors.paper100} />
        </TouchableOpacity>

        <Badge label="STREAM TAKTIL XL" variant="tactile" size="sm" />

        <TouchableOpacity style={styles.closeBtn}>
          <MaterialCommunityIcons name="bookmark-outline" size={24} color={Colors.paper100} />
        </TouchableOpacity>
      </View>

      {/* Reading Progress Indicator */}
      <View style={styles.progressBox}>
        <Text style={styles.progressText}>
          Kata {wordIndex + 1} dari {words.length} • Halaman 1 dari 3
        </Text>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${((wordIndex + 1) / words.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Main XL Braille Output Display */}
      <View style={styles.xlDisplayBox}>
        <View style={styles.cellsGrid}>
          {currentWord.split('').map((char, index) => (
            <BrailleCell
              key={index}
              char={char}
              size="xl"
              variant="dark"
              showCharLabel={true}
            />
          ))}
        </View>

        {/* Current Word Highlight Box */}
        <View style={styles.activeWordBadge}>
          <Text style={styles.activeWordText}>{currentWord}</Text>
        </View>
      </View>

      {/* Stream Control Panel */}
      <View style={styles.controlPanel}>
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.stepControlBtn} onPress={handlePrev}>
            <MaterialCommunityIcons name="chevron-left" size={36} color={Colors.paper100} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainPlayBtn}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <MaterialCommunityIcons
              name={isPlaying ? 'pause' : 'play'}
              size={36}
              color={Colors.ink900}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.stepControlBtn} onPress={handleNext}>
            <MaterialCommunityIcons name="chevron-right" size={36} color={Colors.paper100} />
          </TouchableOpacity>
        </View>

        <View style={styles.speedRow}>
          <Text style={styles.speedLabel}>Kecepatan Aliran Pad: Normal (1.5 dtk/kata)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ink900,
    justifyContent: 'space-between',
    padding: Theme.spacing.gutter,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.ink800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBox: {
    alignItems: 'center',
    gap: 8,
  },
  progressText: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 12,
    color: Colors.vanila,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    backgroundColor: Colors.ink800,
    borderRadius: Theme.radius.pill,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.vanila,
  },
  xlDisplayBox: {
    alignItems: 'center',
    gap: 24,
  },
  cellsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  activeWordBadge: {
    backgroundColor: Colors.vanila,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: Theme.radius.pill,
  },
  activeWordText: {
    fontFamily: 'Urbanist-Bold',
    fontSize: Theme.typography.sizes.h2,
    color: Colors.ink900,
    fontWeight: '800',
    letterSpacing: 2,
  },
  controlPanel: {
    gap: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  stepControlBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.ink800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainPlayBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.vanila,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedRow: {
    alignItems: 'center',
  },
  speedLabel: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 12,
    color: Colors.ink300,
  },
});
