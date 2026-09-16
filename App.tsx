import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  Urbanist_800ExtraBold,
} from '@expo-google-fonts/urbanist';
import { JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono';

import { Colors } from './src/constants/colors';
import { ScreenSwitcher, ScreenId } from './src/components/ScreenSwitcher';
import { BottomNav, TabKey } from './src/components/BottomNav';

import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { CameraScreen } from './src/screens/CameraScreen';
import { ProcessingScreen } from './src/screens/ProcessingScreen';
import { ResultScreen } from './src/screens/ResultScreen';
import { ReadingScreen } from './src/screens/ReadingScreen';
import { VoiceAnswerScreen } from './src/screens/VoiceAnswerScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { TeacherDashboard } from './src/screens/TeacherDashboard';
import { SettingsScreen } from './src/screens/SettingsScreen';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Urbanist-Regular': Urbanist_400Regular,
    'Urbanist-Medium': Urbanist_500Medium,
    'Urbanist-SemiBold': Urbanist_600SemiBold,
    'Urbanist-Bold': Urbanist_700Bold,
    'Urbanist-ExtraBold': Urbanist_800ExtraBold,
    'JetBrainsMono-Medium': JetBrainsMono_500Medium,
  });

  const [isReady, setIsReady] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      setIsReady(true);
    } else {
      // Fallback timeout: force ready after 800ms so app never hangs
      const timer = setTimeout(() => setIsReady(true), 800);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, fontError]);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.vanila} />
        <Text style={styles.loadingText}>Memuat Font & Perangkat BRaiLLE...</Text>
      </View>
    );
  }

  const handleTabSelect = (tab: TabKey) => {
    setActiveTab(tab);
    if (tab === 'home') setCurrentScreen('home');
    else if (tab === 'scan') setCurrentScreen('scan');
    else if (tab === 'history') setCurrentScreen('history');
    else if (tab === 'settings') setCurrentScreen('settings');
  };

  const isDarkScreen = currentScreen === 'scan' || currentScreen === 'processing' || currentScreen === 'reading';

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: isDarkScreen ? Colors.ink900 : Colors.paper0 },
        ]}
      >
        <StatusBar style={isDarkScreen ? 'light' : 'dark'} />

        {/* Quick Demo Switcher Bar (Test all 10 screens directly on Expo Go) */}
        <ScreenSwitcher
          currentScreen={currentScreen}
          onSelectScreen={(screen) => {
            setCurrentScreen(screen);
            if (screen === 'home') setActiveTab('home');
            else if (screen === 'scan') setActiveTab('scan');
            else if (screen === 'history') setActiveTab('history');
            else if (screen === 'settings') setActiveTab('settings');
          }}
        />

        {/* Active Screen View */}
        <View style={styles.screenView}>
          {currentScreen === 'onboard' && (
            <OnboardingScreen onStart={() => setCurrentScreen('home')} />
          )}

          {currentScreen === 'home' && (
            <HomeScreen
              onScanPress={() => setCurrentScreen('scan')}
              onSelectMateri={() => setCurrentScreen('result')}
            />
          )}

          {currentScreen === 'scan' && (
            <CameraScreen
              onCapture={() => setCurrentScreen('processing')}
              onCancel={() => setCurrentScreen('home')}
            />
          )}

          {currentScreen === 'processing' && (
            <ProcessingScreen
              onFinish={() => setCurrentScreen('result')}
              onCancel={() => setCurrentScreen('scan')}
            />
          )}

          {currentScreen === 'result' && (
            <ResultScreen
              onBack={() => setCurrentScreen('home')}
              onOpenFullReading={() => setCurrentScreen('reading')}
              onOpenVoiceAnswer={() => setCurrentScreen('answer')}
            />
          )}

          {currentScreen === 'reading' && (
            <ReadingScreen onClose={() => setCurrentScreen('result')} />
          )}

          {currentScreen === 'answer' && (
            <VoiceAnswerScreen
              onBack={() => setCurrentScreen('result')}
              onSendToBraillePad={() => setCurrentScreen('result')}
            />
          )}

          {currentScreen === 'history' && (
            <HistoryScreen onSelectMateri={() => setCurrentScreen('result')} />
          )}

          {currentScreen === 'teacher' && <TeacherDashboard />}

          {currentScreen === 'settings' && <SettingsScreen />}
        </View>

        {/* Bottom Tab Navigation Bar (Visible on tab-capable screens) */}
        {!isDarkScreen && (
          <BottomNav activeTab={activeTab} onSelectTab={handleTabSelect} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.ink900,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    fontFamily: 'System',
    fontSize: 14,
    color: Colors.vanila,
  },
  screenView: {
    flex: 1,
  },
});
