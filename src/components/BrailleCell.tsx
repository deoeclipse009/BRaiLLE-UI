import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { getBrailleDots } from '../constants/brailleMap';

interface BrailleCellProps {
  char?: string;
  dots?: number[];
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'vanila' | 'dark' | 'paper' | 'active';
  showCharLabel?: boolean;
}

export const BrailleCell: React.FC<BrailleCellProps> = ({
  char,
  dots: propsDots,
  size = 'md',
  variant = 'vanila',
  showCharLabel = true,
}) => {
  const activeDots = propsDots || (char ? getBrailleDots(char) : []);

  // Size dimensions
  const dims = {
    sm: { width: 28, height: 42, dotSize: 6, gapX: 4, gapY: 4, padding: 4 },
    md: { width: 36, height: 56, dotSize: 8, gapX: 6, gapY: 6, padding: 6 },
    lg: { width: 52, height: 78, dotSize: 12, gapX: 8, gapY: 8, padding: 8 },
    xl: { width: 72, height: 104, dotSize: 16, gapX: 12, gapY: 12, padding: 12 },
  }[size];

  // Colors based on variant
  const cellBg = {
    vanila: Colors.vanila,
    dark: Colors.ink800,
    paper: Colors.paper100,
    active: '#F4F5B8',
  }[variant];

  const dotActiveColor = {
    vanila: Colors.ink900,
    dark: Colors.vanila,
    paper: Colors.ink900,
    active: Colors.ink900,
  }[variant];

  const dotInactiveColor = {
    vanila: 'rgba(33, 33, 33, 0.15)',
    dark: 'rgba(239, 240, 163, 0.15)',
    paper: 'rgba(33, 33, 33, 0.12)',
    active: 'rgba(33, 33, 33, 0.2)',
  }[variant];

  // Render 2 columns: left (1,2,3), right (4,5,6)
  const isDotActive = (dotNum: number) => activeDots.includes(dotNum);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.cellBox,
          {
            width: dims.width,
            height: dims.height,
            backgroundColor: cellBg,
            padding: dims.padding,
            borderRadius: size === 'xl' ? 14 : size === 'lg' ? 12 : 8,
          },
        ]}
      >
        {/* Left Column: Dots 1, 2, 3 */}
        <View style={[styles.column, { gap: dims.gapY }]}>
          <View
            style={[
              styles.dot,
              {
                width: dims.dotSize,
                height: dims.dotSize,
                borderRadius: dims.dotSize / 2,
                backgroundColor: isDotActive(1) ? dotActiveColor : dotInactiveColor,
              },
            ]}
          />
          <View
            style={[
              styles.dot,
              {
                width: dims.dotSize,
                height: dims.dotSize,
                borderRadius: dims.dotSize / 2,
                backgroundColor: isDotActive(2) ? dotActiveColor : dotInactiveColor,
              },
            ]}
          />
          <View
            style={[
              styles.dot,
              {
                width: dims.dotSize,
                height: dims.dotSize,
                borderRadius: dims.dotSize / 2,
                backgroundColor: isDotActive(3) ? dotActiveColor : dotInactiveColor,
              },
            ]}
          />
        </View>

        {/* Right Column: Dots 4, 5, 6 */}
        <View style={[styles.column, { gap: dims.gapY }]}>
          <View
            style={[
              styles.dot,
              {
                width: dims.dotSize,
                height: dims.dotSize,
                borderRadius: dims.dotSize / 2,
                backgroundColor: isDotActive(4) ? dotActiveColor : dotInactiveColor,
              },
            ]}
          />
          <View
            style={[
              styles.dot,
              {
                width: dims.dotSize,
                height: dims.dotSize,
                borderRadius: dims.dotSize / 2,
                backgroundColor: isDotActive(5) ? dotActiveColor : dotInactiveColor,
              },
            ]}
          />
          <View
            style={[
              styles.dot,
              {
                width: dims.dotSize,
                height: dims.dotSize,
                borderRadius: dims.dotSize / 2,
                backgroundColor: isDotActive(6) ? dotActiveColor : dotInactiveColor,
              },
            ]}
          />
        </View>
      </View>

      {showCharLabel && char && (
        <Text
          style={[
            styles.label,
            {
              color: variant === 'dark' ? Colors.vanila : Colors.ink900,
              fontSize: size === 'xl' ? 16 : 12,
            },
          ]}
        >
          {char.toUpperCase()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 4,
  },
  cellBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  column: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {},
  label: {
    fontFamily: 'JetBrainsMono-Medium',
    fontWeight: '600',
  },
});
