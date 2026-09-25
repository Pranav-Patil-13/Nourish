import React from 'react';
import './BottomNavBar.css';

const PRIMARY_NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10.5L12 3.5L20 10.5V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10.5Z" />
        <line x1="9.5" y1="16" x2="14.5" y2="16" strokeWidth="2.2" />
      </svg>
    )
  },
  {
    id: 'diary',
    label: 'Planner',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4.5" y="2.5" width="15" height="19" rx="5" />
        <line x1="8.5" y1="8" x2="15.5" y2="8" strokeWidth="2" />
        <line x1="8.5" y1="12" x2="15.5" y2="12" strokeWidth="2" />
        <line x1="8.5" y1="16" x2="12.5" y2="16" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8l3.5 9h11L21 8l-5 4-4-7-4 7-5-4z" />
        <path d="M4 21h16" />
      </svg>
    )
  },
  {
    id: 'community',
    label: 'Community',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="9" r="3.2" />
        <path d="M7 19C7 16.2 9.2 14.5 12 14.5C14.8 14.5 17 16.2 17 19" />
        <path d="M3.5 10C3.5 10 2.5 11.5 2.5 13.5C2.5 15.5 3.5 17 3.5 17" />
        <path d="M20.5 10C20.5 10 21.5 11.5 21.5 13.5C21.5 15.5 20.5 17 20.5 17" />
      </svg>
    )
  }
];

export function BottomNavBar({ activeTabId = 'home', onSelectTab, onOpenScanner }) {
  const handlePrimaryTabClick = (tabId) => {
    if (onSelectTab) {
      onSelectTab(tabId);
    }
  };

  const handleCameraClick = () => {
    if (onOpenScanner) {
      onOpenScanner();
    } else if (onSelectTab) {
      onSelectTab('camera');
    }
  };

  return (
    <nav className="bottom-nav-container" aria-label="Main Navigation">
      <div className="bottom-nav-inner">
        {/* Left Distinct Card: 4 Navigation Tabs */}
        <div className="nav-group-primary" role="tablist">
          {PRIMARY_NAV_ITEMS.map((item) => {
            const isActive = activeTabId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                className={`nav-tab-item ${isActive ? 'active' : ''}`}
                onClick={() => handlePrimaryTabClick(item.id)}
                aria-label={item.label}
                aria-selected={isActive}
              >
                <div className="nav-tab-icon-wrap">
                  {item.icon}
                </div>
                {isActive && <div className="nav-active-dot" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        {/* Right Distinct Action Block: Camera Scanner */}
        <div className="nav-group-action">
          <button
            type="button"
            className={`nav-camera-btn ${activeTabId === 'camera' ? 'active' : ''}`}
            onClick={handleCameraClick}
            aria-label="Scan Food / Barcode"
            title="Scan Food"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4H9.5L7.5 7H4C2.89543 7 2 7.89543 2 9V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V9C22 7.89543 21.1046 7 20 7H16.5L14.5 4Z" />
              <circle cx="12" cy="13.5" r="3.2" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default BottomNavBar;
