import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';

export type TabKey = 'home' | 'scan' | 'history' | 'settings';

interface BottomNavProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { key: TabKey; label: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }[] = [
    { key: 'home', label: 'Beranda', icon: 'home-variant' },
    { key: 'scan', label: 'Pindai', icon: 'camera' },
    { key: 'history', label: 'Riwayat', icon: 'history' },
    { key: 'settings', label: 'Pengaturan', icon: 'cog' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabBtn, isActive && styles.activeTabBtn]}
            onPress={() => onSelectTab(tab.key)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={tab.icon}
              size={24}
              color={isActive ? Colors.paper100 : Colors.ink500}
            />
            {isActive && <Text style={styles.label}>{tab.label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.ink900,
    borderRadius: Theme.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Theme.radius.pill,
    gap: 6,
  },
  activeTabBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  label: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 13,
    color: Colors.paper100,
    fontWeight: '700',
  },
});
