import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';

interface BadgeProps {
  label: string;
  variant?: 'tactile' | 'audio' | 'ble' | 'alert' | 'ok' | 'dark' | 'muted';
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'tactile',
  icon,
  size = 'md',
  style,
}) => {
  let bg = Colors.vanila;
  let text = Colors.vanilaText;

  if (variant === 'audio') {
    bg = Colors.aliceBlue;
    text = Colors.aliceBlueText;
  } else if (variant === 'ble') {
    bg = Colors.honeydew;
    text = Colors.honeydewText;
  } else if (variant === 'alert') {
    bg = Colors.alertBg;
    text = Colors.alert;
  } else if (variant === 'ok') {
    bg = Colors.successBg;
    text = Colors.success;
  } else if (variant === 'dark') {
    bg = Colors.ink900;
    text = Colors.paper100;
  } else if (variant === 'muted') {
    bg = Colors.paper200;
    text = Colors.ink700;
  }

  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bg,
          paddingHorizontal: isSm ? 8 : 10,
          paddingVertical: isSm ? 2 : 4,
          borderRadius: Theme.radius.pill,
        },
        style,
      ]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={isSm ? 12 : 14}
          color={text}
          style={{ marginRight: 4 }}
        />
      )}
      <Text
        style={[
          styles.text,
          {
            color: text,
            fontSize: isSm ? 10 : 12,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: 'Urbanist-Bold',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
