import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { Badge } from './Badge';

interface DeviceStatusProps {
  deviceName?: string;
  batteryLevel?: number;
  isConnected?: boolean;
}

export const DeviceStatus: React.FC<DeviceStatusProps> = ({
  deviceName = 'BRaiLLE Pad Pro 40',
  batteryLevel = 82,
  isConnected = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="braille" size={18} color={Colors.honeydewText} />
        </View>
        <View>
          <Text style={styles.title}>{deviceName}</Text>
          <Text style={styles.subtitle}>
            {isConnected ? `BLE Terhubung • Baterai ${batteryLevel}%` : 'Mencari Perangkat BLE...'}
          </Text>
        </View>
      </View>
      <Badge
        label={isConnected ? 'AKTIF' : 'TERPUTUS'}
        variant={isConnected ? 'ble' : 'alert'}
        icon={isConnected ? 'bluetooth-connect' : 'bluetooth-off'}
        size="sm"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.honeydew,
    borderRadius: Theme.radius.card,
    padding: Theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 14,
    color: Colors.honeydewText,
    fontWeight: '700',
  },
  subtitle: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 12,
    color: 'rgba(17, 41, 14, 0.75)',
  },
});
