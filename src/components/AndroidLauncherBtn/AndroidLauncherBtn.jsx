import React, { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import './AndroidLauncherBtn.css';

export function AndroidLauncherBtn({ isAndroidMode, onToggleAndroidMode }) {
  const [isOpen, setIsOpen] = useState(false);

  // If running inside native Android app, hide download button entirely
  if (Capacitor.isNativePlatform() || Capacitor.getPlatform() === 'android') {
    return null;
  }

  const handleDownloadApk = () => {
    const link = document.createElement('a');
    link.href = '/downloads/Nourish-v1.0.1.apk';
    link.download = 'Nourish-v1.0.1.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  return (
    <aside className="android-launcher-root" aria-label="Android App Quick Launcher">
      {/* Simple Corner Button with Version */}
      <button
        className={`android-corner-btn ${isAndroidMode ? 'active-android' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Download App Controls"
      >
        <span className="android-btn-label">Download App</span>
        <span className="android-btn-ver">v1.0.1</span>
      </button>

      {/* Very Simple Popover: Only Two Buttons (App View, Download App) */}
      {isOpen && (
        <>
          <div className="android-modal-backdrop" onClick={() => setIsOpen(false)} />
          <div className="android-simple-menu">
            <button
              className={`android-simple-btn ${isAndroidMode ? 'active' : ''}`}
              onClick={() => {
                onToggleAndroidMode(!isAndroidMode);
                setIsOpen(false);
              }}
            >
              App View
            </button>
            <button
              className="android-simple-btn download"
              onClick={handleDownloadApk}
            >
              Download App
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

export default AndroidLauncherBtn;
