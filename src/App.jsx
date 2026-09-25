import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { MealsProvider } from './context/useMealsStore';
import { useMeals } from './context/useMeals';
import { MobileFrame } from './components/MobileFrame/MobileFrame';
import { WelcomeScreen } from './components/WelcomeScreen/WelcomeScreen';
import { MainScreen } from './components/MainScreen/MainScreen';
import { DashboardScreen } from './components/DashboardScreen/DashboardScreen';
import { ScannerScreen } from './components/ScannerScreen/ScannerScreen';
import { ChevronUp } from 'lucide-react';
import { DiaryScreen } from './components/DiaryScreen/DiaryScreen';
import { SubscriptionsScreen } from './components/SubscriptionsScreen/SubscriptionsScreen';
import CommunityScreen from './components/CommunityScreen/CommunityScreen';
import { BottomNavBar } from './components/DashboardScreen/BottomNavBar';
import { AndroidLauncherBtn } from './components/AndroidLauncherBtn/AndroidLauncherBtn';
import { BackNavigationProvider } from './context/BackNavigationContext';
import './App.css';

const SCREEN_OPTIONS = [
  { id: 'welcome', label: '1. Launch Screen', shortLabel: '1. Launch', key: '1' },
  { id: 'intro', label: '2. Onboarding', shortLabel: '2. Onboarding', key: '2' },
  { id: 'dashboard', label: '3. Dashboard', shortLabel: '3. Dashboard', key: '3' },
  { id: 'scanner', label: '4. Food Scanner', shortLabel: '4. Scanner', key: '4' },
  { id: 'diary', label: '5. Planner / Diary', shortLabel: '5. Planner', key: '5' },
  { id: 'subscriptions', label: '6. Subscriptions', shortLabel: '6. Subscriptions', key: '6' },
  { id: 'community', label: '7. Community', shortLabel: '7. Community', key: '7' }
];

function AppContent() {
  const { logFromScanner } = useMeals();

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
  const [transitionDirection, setTransitionDirection] = useState('fade');
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const switcherRef = useRef(null);

  const SCREEN_ORDER = {
    welcome: 0,
    intro: 1,
    dashboard: 2,
    diary: 3,
    scanner: 4,
    subscriptions: 5,
    community: 6
  };

  const changeScreen = (nextScreen) => {
    if (nextScreen === currentScreen) return;

    if (nextScreen === 'scanner') {
      setTransitionDirection('sheet-up');
    } else if (currentScreen === 'scanner') {
      setTransitionDirection('sheet-down');
    } else {
      const prevOrder = SCREEN_ORDER[currentScreen] ?? 2;
      const nextOrder = SCREEN_ORDER[nextScreen] ?? 2;
      setTransitionDirection(nextOrder > prevOrder ? 'slide-left' : 'slide-right');
    }

    setCurrentScreen(nextScreen);
    localStorage.setItem('nourish_active_screen', nextScreen);
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

  // Root back handler when no nested component handles back
  const handleRootBack = useCallback(() => {
    if (
      currentScreen === 'scanner' ||
      currentScreen === 'diary' ||
      currentScreen === 'subscriptions' ||
      currentScreen === 'community'
    ) {
      changeScreen('dashboard');
      return true;
    }
    if (currentScreen === 'dashboard') {
      if (!isAndroidMode) {
        changeScreen('intro');
      } else {
        CapApp.exitApp();
      }
      return true;
    }
    if (currentScreen === 'intro') {
      if (!isAndroidMode) {
        changeScreen('welcome');
      } else {
        CapApp.exitApp();
      }
      return true;
    }
    if (currentScreen === 'welcome') {
      CapApp.exitApp();
      return true;
    }
    return false;
  }, [currentScreen, isAndroidMode]);

  // Click outside to close screen switcher dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target)) {
        setIsSwitcherOpen(false);
      }
    };
    if (isSwitcherOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isSwitcherOpen]);

  // Keyboard shortcuts (1: Welcome, 2: Onboarding, 3: Dashboard, 4: Scanner, 5: Diary, 6: Subscriptions, 7: Community)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === '1') changeScreen('welcome');
      if (e.key === '2') changeScreen('intro');
      if (e.key === '3') changeScreen('dashboard');
      if (e.key === '4') changeScreen('scanner');
      if (e.key === '5') changeScreen('diary');
      if (e.key === '6') changeScreen('subscriptions');
      if (e.key === '7') changeScreen('community');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Bottom Navigation Tab Switching
  const handleSelectTab = (tabId) => {
    if (tabId === 'home') {
      changeScreen('dashboard');
    } else if (tabId === 'diary') {
      changeScreen('diary');
    } else if (tabId === 'camera') {
      changeScreen('scanner');
    } else if (tabId === 'subscriptions') {
      changeScreen('subscriptions');
    } else if (tabId === 'community') {
      changeScreen('community');
    }
  };

  const currentOption = SCREEN_OPTIONS.find((opt) => opt.id === currentScreen) || SCREEN_OPTIONS[2];

  // Screen content elements
  const renderScreenContent = () => (
    <div
      key={currentScreen}
      className={`app-screen-view screen-anim-${transitionDirection}`}
    >
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
          animatePushIn={isPushingDashboard}
          onSelectTab={handleSelectTab}
          onOpenScanner={() => changeScreen('scanner')}
        />
      )}

      {currentScreen === 'scanner' && (
        <ScannerScreen
          onBack={() => changeScreen('dashboard')}
          onLogMeal={logFromScanner}
        />
      )}

      {currentScreen === 'diary' && (
        <DiaryScreen
          onBack={() => changeScreen('dashboard')}
          onOpenScanner={() => changeScreen('scanner')}
          onSelectTab={handleSelectTab}
        />
      )}

      {currentScreen === 'subscriptions' && (
        <SubscriptionsScreen
          onSelectTab={handleSelectTab}
          onOpenScanner={() => changeScreen('scanner')}
        />
      )}

      {currentScreen === 'community' && (
        <CommunityScreen
          onNavigateTab={handleSelectTab}
        />
      )}
    </div>
  );

  return (
    <BackNavigationProvider onRootBack={handleRootBack}>
      <div className={`app-container ${isAndroidMode ? 'android-mode-active' : ''}`}>
        {/* Compact Dropdown Screen Switcher (Desktop only) */}
        {!isAndroidMode && (
          <div className="screen-switcher-dropdown-container" ref={switcherRef}>
            {/* Dropdown Menu Popup (Opens Upwards) */}
            {isSwitcherOpen && (
              <div className="switcher-dropdown-menu" role="listbox" aria-label="Available screens">
                <div className="switcher-menu-header">Jump to Screen</div>
                {SCREEN_OPTIONS.map((opt) => {
                  const isSelected = currentScreen === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`switcher-menu-item ${isSelected ? 'active' : ''}`}
                      onClick={() => {
                        changeScreen(opt.id);
                        setIsSwitcherOpen(false);
                      }}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span className="switcher-item-label">{opt.label}</span>
                      <kbd className="switcher-key-hint">{opt.key}</kbd>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Trigger Button */}
            <button
              type="button"
              className={`switcher-dropdown-trigger ${isSwitcherOpen ? 'expanded' : ''}`}
              onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
              aria-haspopup="listbox"
              aria-expanded={isSwitcherOpen}
              title="Click to switch screens or use keys 1-6"
            >
              <span className="switcher-trigger-pill-badge">View</span>
              <span className="switcher-current-label">{currentOption.shortLabel}</span>
              <ChevronUp
                size={15}
                className={`switcher-chevron-icon ${isSwitcherOpen ? 'open' : ''}`}
              />
            </button>
          </div>
        )}

        {/* Floating Bottom-Left Android App Button (Web/Desktop only) */}
        {!isCapacitorAndroid && (
          <AndroidLauncherBtn
            isAndroidMode={isAndroidMode}
            onToggleAndroidMode={toggleAndroidMode}
          />
        )}

        {/* When in Android mode: Render directly with NO mobile frame and NO launch stage */}
        {(() => {
          const isTabScreen = ['dashboard', 'diary', 'subscriptions', 'community'].includes(currentScreen);
          const tabIdMap = {
            dashboard: 'home',
            diary: 'diary',
            subscriptions: 'subscriptions',
            community: 'community'
          };
          const currentTabId = tabIdMap[currentScreen] || 'home';

          const persistentNavBar = isTabScreen ? (
            <BottomNavBar
              activeTabId={currentTabId}
              onSelectTab={handleSelectTab}
              onOpenScanner={() => changeScreen('scanner')}
            />
          ) : null;

          return isAndroidMode ? (
            <main className="android-native-viewport">
              {renderScreenContent()}
              {persistentNavBar}
            </main>
          ) : (
            /* Desktop Mode: Render with realistic MobileFrame */
            <MobileFrame>
              {renderScreenContent()}
              {persistentNavBar}
            </MobileFrame>
          );
        })()}
      </div>
    </BackNavigationProvider>
  );
}

export function App() {
  return (
    <MealsProvider>
      <AppContent />
    </MealsProvider>
  );
}

export default App;

