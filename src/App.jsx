import React, { useState, useEffect } from 'react';
import { MobileFrame } from './components/MobileFrame/MobileFrame';
import { WelcomeScreen } from './components/WelcomeScreen/WelcomeScreen';
import { MainScreen } from './components/MainScreen/MainScreen';
import { DashboardScreen } from './components/DashboardScreen/DashboardScreen';
import { ScannerScreen } from './components/ScannerScreen/ScannerScreen';
import './App.css';

export function App() {
  // Persist active screen in localStorage so refresh stays on the current screen (defaults to 'dashboard')
  const [currentScreen, setCurrentScreen] = useState(() => {
    return localStorage.getItem('nourish_active_screen') || 'dashboard';
  });
  const [isPushingDashboard, setIsPushingDashboard] = useState(false);

  const changeScreen = (screen) => {
    setCurrentScreen(screen);
    localStorage.setItem('nourish_active_screen', screen);
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
      // Ignore if typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === '1') changeScreen('welcome');
      if (e.key === '2') changeScreen('intro');
      if (e.key === '3') changeScreen('dashboard');
      if (e.key === '4') changeScreen('scanner');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-container">
      {/* Quick Screen Switcher Toolbar */}
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

      <MobileFrame>
        {currentScreen === 'welcome' && (
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
      </MobileFrame>
    </div>
  );
}

export default App;
