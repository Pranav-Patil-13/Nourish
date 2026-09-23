import React, { useState } from 'react';
import appIcon from '../../assets/app_icon.png';
import './WelcomeScreen.css';

export function WelcomeScreen({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleDoubleClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    setTimeout(() => {
      if (onOpen) {
        onOpen();
      }
    }, 650);
  };

  return (
    <div className={`welcome-container ${isOpening ? 'app-opening' : ''}`}>
      {/* Background Expansion Bloom */}
      <div className="opening-backdrop-bloom" />

      <div className="brand-center">
        {/* App Icon (Double Clickable) */}
        <div
          className="logo-emblem"
          onDoubleClick={handleDoubleClick}
          role="button"
          tabIndex={0}
          aria-label="Nourish App Icon"
        >
          <img
            src={appIcon}
            alt="Nourish App Icon"
            className="app-icon-img"
          />
          <div className="icon-ripple" />
        </div>

        {/* App Name */}
        <div className="brand-text-group">
          <h1 className="app-title">Nourish</h1>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
