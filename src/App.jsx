import React, { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { MobileFrame } from './components/MobileFrame/MobileFrame';
import { WelcomeScreen } from './components/WelcomeScreen/WelcomeScreen';
import { MainScreen } from './components/MainScreen/MainScreen';
import { DashboardScreen } from './components/DashboardScreen/DashboardScreen';
import { ScannerScreen } from './components/ScannerScreen/ScannerScreen';
import { AndroidLauncherBtn } from './components/AndroidLauncherBtn/AndroidLauncherBtn';
import './App.css';

export function App() {
  // Check if running on native Android, or explicit ?platform=android param
  const isCapacitorAndroid = Capacitor.getPlatform() === 'android' || Capacitor.isNativePlatform();
  const urlParams = new URLSearchParams(window.location.search);
  const isUrlAndroid = urlParams.get('platform') === 'android';

  const [isAndroidMode, setIsAndroidMode] = useState(() => {
    if (isCapacitorAndroid || isUrlAndroid) return true;
    return localStorage.getItem('nourish_android_mode') === 'true';
  });

  // If in Android mode, the app directly opens from Onboarding ('intro'), skipping the launch stage ('welcome')
  const [currentScreen, setCurrentScreen] = useState(() => {
    const saved = localStorage.getItem('nourish_active_screen');
    if (isCapacitorAndroid || isUrlAndroid || localStorage.getItem('nourish_android_mode') === 'true') {
      return saved === 'welcome' || !saved ? 'intro' : saved;
    }
    return saved || 'dashboard';
  });

  const [isPushingDashboard, setIsPushingDashboard] = useState(false);

  const changeScreen = (screen) => {
    setCurrentScreen(screen);
    localStorage.setItem('nourish_active_screen', screen);
  };

  const toggleAndroidMode = (enabled) => {
    setIsAndroidMode(enabled);
    localStorage.setItem('nourish_android_mode', enabled ? 'true' : 'false');
    if (enabled && currentScreen === 'welcome') {
      // In Android mode, immediately switch to onboarding
      changeScreen('intro');
    }
  };

  const handleStartPush = () => {
    setIsPushingDashboard(true);
    setTimeout(() => {
      changeScreen('dashboard');
      setIsPushingDashboard(false);
    }, 650);
  };

  // Keyboard shortcuts (1: Welcome, 2: Onboarding, 3: Dashboard, 4: Scanner)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === '1') changeScreen('welcome');
      if (e.key === '2') changeScreen('intro');
      if (e.key === '3') changeScreen('dashboard');
      if (e.key === '4') changeScreen('scanner');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Screen content elements
  const renderScreenContent = () => (
    <>
      {currentScreen === 'welcome' && !isAndroidMode && (
        <WelcomeScreen onOpen={() => changeScreen('intro')} />
      )}

      {(currentScreen === 'intro' || isPushingDashboard) && (
        <MainScreen
          isPushedLeft={isPushingDashboard}
          onScreenDismiss={handleStartPush}
        />
      )}

      {(currentScreen === 'dashboard' || isPushingDashboard) && (
        <DashboardScreen
          key="dashboard-view"
          onOpenScanner={() => changeScreen('scanner')}
        />
      )}

      {currentScreen === 'scanner' && (
        <ScannerScreen
          onBack={() => changeScreen('dashboard')}
        />
      )}
    </>
  );

  return (
    <div className={`app-container ${isAndroidMode ? 'android-mode-active' : ''}`}>
      {/* Quick Screen Switcher Toolbar (Desktop only) */}
      {!isAndroidMode && (
        <nav className="screen-switcher-bar" aria-label="Screen switcher">
          <button
            className={`switcher-pill ${currentScreen === 'welcome' ? 'active' : ''}`}
            onClick={() => changeScreen('welcome')}
            title="Press '1' to jump to Launch Screen"
          >
            1. Launch
          </button>
          <button
            className={`switcher-pill ${currentScreen === 'intro' ? 'active' : ''}`}
            onClick={() => changeScreen('intro')}
            title="Press '2' to jump to Onboarding"
          >
            2. Onboarding
          </button>
          <button
            className={`switcher-pill ${currentScreen === 'dashboard' ? 'active' : ''}`}
            onClick={() => changeScreen('dashboard')}
            title="Press '3' to jump to Dashboard"
          >
            3. Dashboard
          </button>
          <button
            className={`switcher-pill ${currentScreen === 'scanner' ? 'active' : ''}`}
            onClick={() => changeScreen('scanner')}
            title="Press '4' to jump to Food Scanner"
          >
            4. Scanner
          </button>
        </nav>
      )}

      {/* Floating Bottom-Left Android App Button (Web/Desktop only) */}
      {!isCapacitorAndroid && (
        <AndroidLauncherBtn
          isAndroidMode={isAndroidMode}
          onToggleAndroidMode={toggleAndroidMode}
        />
      )}

      {/* When in Android mode: Render directly with NO mobile frame and NO launch stage */}
      {isAndroidMode ? (
        <main className="android-native-viewport">
          <div className="android-viewport-inner">
            {renderScreenContent()}
          </div>
          {/* Dedicated white space for the phone's native navigation bar */}
          <div className="android-safe-area-bottom" />
        </main>
      ) : (
        /* Desktop Mode: Render with realistic MobileFrame */
        <MobileFrame>
          {renderScreenContent()}
        </MobileFrame>
      )}
    </div>
  );
}

export default App;
