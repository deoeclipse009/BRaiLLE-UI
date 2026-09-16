import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'highlight' | 'device' | 'audio' | 'secondary' | 'ghost' | 'inverse' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'comfortable'; // comfortable is 64px tall for accessibility
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  style,
}) => {
  // Height & Padding based on size
  const height = {
    sm: 38,
    md: 48,
    lg: 54,
    comfortable: 64,
  }[size];

  const fontSize = {
    sm: Theme.typography.sizes.sm,
    md: Theme.typography.sizes.md,
    lg: Theme.typography.sizes.lg,
    comfortable: Theme.typography.sizes.xl,
  }[size];

  // Colors based on variant
  let bg = Colors.ink900;
  let text = Colors.paper100;
  let border = 'transparent';

  if (variant === 'highlight') {
    bg = Colors.vanila;
    text = Colors.vanilaText;
  } else if (variant === 'device') {
    bg = Colors.honeydew;
    text = Colors.honeydewText;
  } else if (variant === 'audio') {
    bg = Colors.aliceBlue;
    text = Colors.aliceBlueText;
  } else if (variant === 'secondary') {
    bg = Colors.paper200;
    text = Colors.ink900;
  } else if (variant === 'ghost') {
    bg = 'transparent';
    text = Colors.ink900;
  } else if (variant === 'inverse') {
    bg = Colors.paper100;
    text = Colors.ink900;
  } else if (variant === 'danger') {
    bg = Colors.alertBg;
    text = Colors.alert;
    border = Colors.alert;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        {
          height,
          backgroundColor: disabled ? Colors.paper200 : bg,
          borderColor: border,
          borderWidth: border !== 'transparent' ? 1 : 0,
          borderRadius: Theme.radius.pill,
          paddingHorizontal: size === 'comfortable' ? 24 : 16,
          alignSelf: fullWidth ? 'stretch' : 'auto',
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {icon && iconPosition === 'left' && (
        <MaterialCommunityIcons
          name={icon}
          size={fontSize + 4}
          color={disabled ? Colors.ink500 : text}
          style={{ marginRight: 8 }}
        />
      )}
      <Text
        style={[
          styles.text,
          {
            fontSize,
            color: disabled ? Colors.ink500 : text,
          },
        ]}
      >
        {label}
      </Text>
      {icon && iconPosition === 'right' && (
        <MaterialCommunityIcons
          name={icon}
          size={fontSize + 4}
          color={disabled ? Colors.ink500 : text}
          style={{ marginLeft: 8 }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Urbanist-Bold',
    fontWeight: '700',
    textAlign: 'center',
  },
});
