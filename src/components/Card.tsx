import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'paper' | 'muted' | 'dark' | 'vanila' | 'honeydew' | 'aliceBlue' | 'outline';
  padding?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'paper',
  padding = Theme.spacing.lg,
  onPress,
  style,
}) => {
  let bg = Colors.paper100;
  let border = Colors.paper200;

  if (variant === 'muted') {
    bg = Colors.paper0;
    border = 'transparent';
  } else if (variant === 'dark') {
    bg = Colors.ink800;
    border = 'rgba(255,255,255,0.08)';
  } else if (variant === 'vanila') {
    bg = Colors.vanila;
    border = 'rgba(0,0,0,0.04)';
  } else if (variant === 'honeydew') {
    bg = Colors.honeydew;
    border = 'rgba(0,0,0,0.04)';
  } else if (variant === 'aliceBlue') {
    bg = Colors.aliceBlue;
    border = 'rgba(0,0,0,0.04)';
  } else if (variant === 'outline') {
    bg = 'transparent';
    border = Colors.paper200;
  }

  const ContainerComponent = onPress ? TouchableOpacity : View;

  return (
    <ContainerComponent
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: bg,
          borderColor: border,
          padding,
        },
        variant === 'paper' ? Theme.shadows.sm : null,
        style,
      ]}
    >
      {children}
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: Theme.radius.card,
    borderWidth: 1,
  },
});
