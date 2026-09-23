import React, { useState } from 'react';
import './AndroidLauncherBtn.css';
import appIconImg from '../../assets/app_icon.png';

export function AndroidLauncherBtn({ isAndroidMode, onToggleAndroidMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCmd = (cmd) => {
    navigator.clipboard?.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Bottom-Left Button */}
      <aside className="android-launcher-root" aria-label="Android App Quick Launcher">
        <button
          className={`android-corner-btn ${isAndroidMode ? 'active-android' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          title="Nourish Android App Details & Launcher"
          aria-label="Toggle Android App Controls"
        >
          <div className="android-btn-icon-wrap">
            <svg
              className="android-svg-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993s-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993s-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1523-.5676.416.416 0 00-.5676.1523l-2.0223 3.503C15.5847 8.406 13.844 8.1187 12 8.1187c-1.844 0-3.5847.2873-5.1366.8312L4.841 5.4469a.4161.4161 0 00-.5676-.1523.4157.4157 0 00-.1523.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
            </svg>
            <span className="android-pulse-dot" />
          </div>
          <div className="android-btn-text-col">
            <span className="android-btn-title">Android App</span>
            <span className="android-btn-badge">{isAndroidMode ? 'Native View' : 'v1.0.0'}</span>
          </div>
        </button>

        {/* Backdrop & Popover Card */}
        {isOpen && (
          <>
            <div className="android-modal-backdrop" onClick={() => setIsOpen(false)} />
            <div className="android-popover-card">
              <header className="android-popover-header">
                <div className="android-popover-app-info">
                  <img src={appIconImg} alt="Nourish Logo" className="android-popover-icon" />
                  <div>
                    <h3 className="android-popover-title">Nourish for Android</h3>
                    <p className="android-popover-sub">Native Package: com.nourish.app</p>
                  </div>
                </div>
                <button
                  className="android-popover-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </header>

              <div className="android-popover-body">
                <div className="android-status-pill-row">
                  <span className="android-status-pill green">
                    <span className="dot" /> Direct Onboarding Ready
                  </span>
                  <span className="android-status-pill cyan">
                    <span className="dot" /> Frame-Free Viewport
                  </span>
                </div>

                <p className="android-popover-desc">
                  Full standalone Android app built with native Capacitor integration. Starts directly from <strong>Onboarding</strong> with edge-to-edge mobile rendering.
                </p>

                {/* Switch Mode Action */}
                <button
                  className={`android-action-btn primary ${isAndroidMode ? 'active-mode' : ''}`}
                  onClick={() => {
                    onToggleAndroidMode(!isAndroidMode);
                    setIsOpen(false);
                  }}
                >
                  <span className="action-btn-icon">⚡</span>
                  <div className="action-btn-text">
                    <strong>{isAndroidMode ? 'Exit Android View (Show Desktop Frame)' : 'Launch Android App View (No Frame)'}</strong>
                    <small>{isAndroidMode ? 'Return to desktop presentation' : 'Direct full-screen Onboarding experience'}</small>
                  </div>
                </button>

                {/* Gradle / APK Command Box */}
                <div className="android-code-box">
                  <div className="android-code-label">Build Android APK:</div>
                  <code>./gradlew assembleDebug</code>
                  <button
                    className="android-copy-btn"
                    onClick={() => handleCopyCmd('cd android && ./gradlew assembleDebug')}
                  >
                    {copied ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
