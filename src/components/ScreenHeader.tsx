import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { Badge } from './Badge';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  badgeLabel?: string;
  badgeVariant?: 'tactile' | 'audio' | 'ble' | 'alert' | 'ok' | 'dark';
  darkTheme?: boolean;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  onBack,
  badgeLabel,
  badgeVariant = 'tactile',
  darkTheme = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftRow}>
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            style={[
              styles.backBtn,
              { backgroundColor: darkTheme ? Colors.ink800 : Colors.paper200 },
            ]}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={20}
              color={darkTheme ? Colors.paper100 : Colors.ink900}
            />
          </TouchableOpacity>
        )}
        <View style={styles.titles}>
          <Text
            style={[
              styles.title,
              { color: darkTheme ? Colors.paper100 : Colors.ink900 },
            ]}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                { color: darkTheme ? Colors.ink300 : Colors.ink500 },
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {badgeLabel && <Badge label={badgeLabel} variant={badgeVariant} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Theme.spacing.md,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
    flex: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titles: {
    flex: 1,
  },
  title: {
    fontFamily: 'Urbanist-Bold',
    fontSize: Theme.typography.sizes.h2,
    fontWeight: '800',
  },
  subtitle: {
    fontFamily: 'Urbanist-Medium',
    fontSize: Theme.typography.sizes.sm,
    marginTop: 2,
  },
});
