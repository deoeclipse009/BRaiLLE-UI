import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const Theme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    gutter: 20,
  },
  radius: {
    sm: 8,
    md: 12,
    card: 16,
    sheet: 24,
    pill: 999,
  },
  typography: {
    fontFamily: {
      bold: 'Urbanist-Bold',
      semiBold: 'Urbanist-SemiBold',
      medium: 'Urbanist-Medium',
      regular: 'Urbanist-Regular',
      mono: 'JetBrainsMono-Medium',
    },
    sizes: {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 18,
      xl: 22,
      h2: 26,
      h1: 32,
      hero: 40,
    },
  },
  shadows: StyleSheet.create({
    sm: {
      shadowColor: '#212121',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },
    md: {
      shadowColor: '#212121',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
    },
    lg: {
      shadowColor: '#212121',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 8,
    },
  }),
};
