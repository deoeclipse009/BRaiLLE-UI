import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { Badge } from '../components/Badge';

interface CameraScreenProps {
  onCapture: () => void;
  onCancel: () => void;
}

export const CameraScreen: React.FC<CameraScreenProps> = ({ onCapture, onCancel }) => {
  const [flashOn, setFlashOn] = useState(false);

  return (
    <View style={styles.container}>
      {/* Top Overlay Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconBtn} onPress={onCancel}>
          <MaterialCommunityIcons name="close" size={24} color={Colors.paper100} />
        </TouchableOpacity>

        <Badge label="OCR MODUL AKTIF" variant="tactile" size="sm" />

        <TouchableOpacity
          style={[styles.iconBtn, flashOn && styles.iconBtnActive]}
          onPress={() => setFlashOn(!flashOn)}
        >
          <MaterialCommunityIcons
            name={flashOn ? 'flash' : 'flash-off'}
            size={24}
            color={flashOn ? Colors.ink900 : Colors.paper100}
          />
        </TouchableOpacity>
      </View>

      {/* Main Viewfinder Frame */}
      <View style={styles.viewfinder}>
        {/* Corner Guides */}
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />

        {/* Scan Line Animation Simulation */}
        <View style={styles.scanLine} />

        {/* Detected Text Bounding Box Mockups */}
        <View style={[styles.ocrBox, { top: '25%', left: '10%', width: '80%' }]}>
          <Text style={styles.ocrBoxText}>BAB 4: PROSES FOTOSINTESIS PADA TUMBUHAN</Text>
        </View>

        <View style={[styles.ocrBox, styles.ocrBoxActive, { top: '42%', left: '10%', width: '80%' }]}>
          <Text style={[styles.ocrBoxText, { color: Colors.ink900 }]}>
            Tumbuhan hijau mengubah karbondioksida dan air menjadi glukosa dengan bantuan cahaya.
          </Text>
        </View>

        {/* HUD Overlay */}
        <View style={styles.hudBadge}>
          <Text style={styles.hudText}>GEMINI OCR 2.5 • AUTO-ALIGN 98%</Text>
        </View>
      </View>

      {/* Bottom Control Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.guideText}>Arahkan kamera tegak lurus ke teks cetak</Text>

        <View style={styles.shutterRow}>
          <TouchableOpacity style={styles.secondaryCircleBtn}>
            <MaterialCommunityIcons name="image" size={24} color={Colors.paper100} />
          </TouchableOpacity>

          {/* Main Shutter Button */}
          <TouchableOpacity style={styles.shutterBtn} onPress={onCapture} activeOpacity={0.8}>
            <View style={styles.shutterInner} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryCircleBtn}>
            <MaterialCommunityIcons name="volume-high" size={24} color={Colors.paper100} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBg,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnActive: {
    backgroundColor: Colors.vanila,
  },
  viewfinder: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    position: 'relative',
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: Colors.vanila,
  },
  topLeft: {
    top: 16,
    left: 16,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 16,
    right: 16,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 16,
    left: 16,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 16,
    right: 16,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  scanLine: {
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.vanila,
    shadowColor: Colors.vanila,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
  },
  ocrBox: {
    position: 'absolute',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  ocrBoxActive: {
    backgroundColor: Colors.vanila,
    borderColor: Colors.vanilaDark,
  },
  ocrBoxText: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 12,
    color: Colors.paper100,
  },
  hudBadge: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Theme.radius.pill,
  },
  hudText: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 10,
    color: Colors.vanila,
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
    gap: 16,
  },
  guideText: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 13,
    color: Colors.ink300,
  },
  shutterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  secondaryCircleBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: Colors.vanila,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  shutterInner: {
    width: '100%',
    height: '100%',
    borderRadius: 34,
    backgroundColor: Colors.paper100,
  },
});
