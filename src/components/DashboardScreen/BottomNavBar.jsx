import React from 'react';
import './BottomNavBar.css';

const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10.5L12 3.5L20 10.5V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10.5Z" />
        <line x1="9.5" y1="16" x2="14.5" y2="16" strokeWidth="2.2" />
      </svg>
    )
  },
  {
    id: 'diary',
    label: 'Planner',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4.5" y="2.5" width="15" height="19" rx="6" />
        <line x1="8.5" y1="8" x2="15.5" y2="8" strokeWidth="2.2" />
        <line x1="8.5" y1="12" x2="15.5" y2="12" strokeWidth="2.2" />
        <line x1="8.5" y1="16" x2="12.5" y2="16" strokeWidth="2.2" />
      </svg>
    )
  },
  {
    id: 'camera',
    label: 'Camera',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 4H9.5L7.5 7H4C2.89543 7 2 7.89543 2 9V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V9C22 7.89543 21.1046 7 20 7H16.5L14.5 4Z" />
        <circle cx="12" cy="13.5" r="3.2" />
      </svg>
    )
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8l3.5 9h11L21 8l-5 4-4-7-4 7-5-4z" />
        <path d="M4 21h16" />
      </svg>
    )
  },
  {
    id: 'community',
    label: 'Community',
    icon: (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="9" r="3.2" />
        <path d="M7 19C7 16.2 9.2 14.5 12 14.5C14.8 14.5 17 16.2 17 19" />
        <path d="M3.5 10C3.5 10 2.5 11.5 2.5 13.5C2.5 15.5 3.5 17 3.5 17" />
        <path d="M20.5 10C20.5 10 21.5 11.5 21.5 13.5C21.5 15.5 20.5 17 20.5 17" />
      </svg>
    )
  }
];

export function BottomNavBar({ activeTabId = 'home', onSelectTab, onOpenScanner }) {
  const handleTabClick = (item) => {
    if (item.id === 'camera' && onOpenScanner) {
      onOpenScanner();
    } else if (onSelectTab) {
      onSelectTab(item.id);
    }
  };

  // Organic Peanut / Scooped-Waist Pod SVG Path
  // 108px wide x 54px high with concave top & bottom waist
  const peanutPodSvgPath = `
    M 27,0
    C 38,0  43,5.5  54,5.5
    C 65,5.5  70,0  81,0
    A 27,27 0 0 1 81,54
    C 70,54  65,48.5  54,48.5
    C 43,48.5  38,54  27,54
    A 27,27 0 0 1 27,0
    Z
  `.replace(/\s+/g, ' ').trim();

  return (
    <nav className="bottom-nav-container" aria-label="Bottom Navigation">
      {/* Left Scooped Peanut Pod: Home & Planner */}
      <div className="bottom-nav-pod left-pod">
        {/* SVG Peanut Background Shape */}
        <svg className="pod-bg-svg" viewBox="0 0 108 54" preserveAspectRatio="none" aria-hidden="true">
          <path d={peanutPodSvgPath} fill="#FFFFFF" />
        </svg>

        <div className="pod-buttons-row">
          <button
            type="button"
            className={`pod-tab-btn ${activeTabId === 'home' ? 'active' : ''}`}
            onClick={() => handleTabClick(NAV_ITEMS[0])}
            aria-label={NAV_ITEMS[0].label}
            aria-selected={activeTabId === 'home'}
          >
            <div className="pod-icon-wrap">
              {NAV_ITEMS[0].icon}
            </div>
          </button>

          <button
            type="button"
            className={`pod-tab-btn ${activeTabId === 'diary' ? 'active' : ''}`}
            onClick={() => handleTabClick(NAV_ITEMS[1])}
            aria-label={NAV_ITEMS[1].label}
            aria-selected={activeTabId === 'diary'}
          >
            <div className="pod-icon-wrap">
              {NAV_ITEMS[1].icon}
            </div>
          </button>
        </div>
      </div>

      {/* Center Black Action Button: Food Scanner */}
      <button
        type="button"
        className={`center-scan-btn ${activeTabId === 'camera' ? 'active' : ''}`}
        onClick={() => handleTabClick(NAV_ITEMS[2])}
        aria-label={NAV_ITEMS[2].label}
        aria-selected={activeTabId === 'camera'}
      >
        <div className="center-scan-icon-wrap">
          {NAV_ITEMS[2].icon}
        </div>
      </button>

      {/* Right Scooped Peanut Pod: Subscriptions & Community */}
      <div className="bottom-nav-pod right-pod">
        {/* SVG Peanut Background Shape */}
        <svg className="pod-bg-svg" viewBox="0 0 108 54" preserveAspectRatio="none" aria-hidden="true">
          <path d={peanutPodSvgPath} fill="#FFFFFF" />
        </svg>

        <div className="pod-buttons-row">
          <button
            type="button"
            className={`pod-tab-btn ${activeTabId === 'subscriptions' ? 'active' : ''}`}
            onClick={() => handleTabClick(NAV_ITEMS[3])}
            aria-label={NAV_ITEMS[3].label}
            aria-selected={activeTabId === 'subscriptions'}
          >
            <div className="pod-icon-wrap">
              {NAV_ITEMS[3].icon}
            </div>
          </button>

          <button
            type="button"
            className={`pod-tab-btn ${activeTabId === 'community' ? 'active' : ''}`}
            onClick={() => handleTabClick(NAV_ITEMS[4])}
            aria-label={NAV_ITEMS[4].label}
            aria-selected={activeTabId === 'community'}
          >
            <div className="pod-icon-wrap">
              {NAV_ITEMS[4].icon}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default BottomNavBar;
