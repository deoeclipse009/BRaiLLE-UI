import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';

interface PadNavigatorProps {
  onPrev?: () => void;
  onNext?: () => void;
  onPlayPause?: () => void;
  onRefresh?: () => void;
  isPlaying?: boolean;
}

export const PadNavigator: React.FC<PadNavigatorProps> = ({
  onPrev,
  onNext,
  onPlayPause,
  onRefresh,
  isPlaying = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>KONTROL PAD TAKTIL</Text>
      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.btn} onPress={onPrev} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-left" size={28} color={Colors.ink900} />
          <Text style={styles.btnText}>SEBELUMNYA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.centerBtn]}
          onPress={onPlayPause}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name={isPlaying ? 'pause' : 'play'}
            size={28}
            color={Colors.vanilaText}
          />
          <Text style={[styles.btnText, { color: Colors.vanilaText }]}>
            {isPlaying ? 'JEDA' : 'PUTAR'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={onNext} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-right" size={28} color={Colors.ink900} />
          <Text style={styles.btnText}>SELANJUTNYA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.paper200,
    borderRadius: Theme.radius.card,
    padding: Theme.spacing.md,
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  label: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 11,
    color: Colors.ink500,
    letterSpacing: 1,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: Theme.spacing.sm,
  },
  btn: {
    flex: 1,
    height: 52,
    backgroundColor: Colors.paper100,
    borderRadius: Theme.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  centerBtn: {
    backgroundColor: Colors.vanila,
  },
  btnText: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 11,
    color: Colors.ink900,
    fontWeight: '700',
  },
});
