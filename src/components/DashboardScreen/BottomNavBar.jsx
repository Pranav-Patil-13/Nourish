import React from 'react';
import './BottomNavBar.css';

export function BottomNavBar({ activeTabId = 'home', onSelectTab, onOpenScanner }) {
  const handleTabClick = (tabId) => {
    if (tabId === 'camera') {
      if (onOpenScanner) {
        onOpenScanner();
      } else if (onSelectTab) {
        onSelectTab('camera');
      }
    } else if (onSelectTab) {
      onSelectTab(tabId);
    }
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      renderIcon: (isActive) => (
        isActive ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.1 2 9.7V20a2 2 0 0 0 2 2h5a1 1 0 0 0 1-1v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5a1 1 0 0 0 1 1h5a2 2 0 0 0 2-2V9.7L12 2.1Z" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H4a1 1 0 0 1-1-1V9.5z" />
          </svg>
        )
      )
    },
    {
      id: 'diary',
      label: 'Planner',
      renderIcon: (isActive) => (
        isActive ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
            <rect x="7" y="11" width="4" height="4" rx="1" />
            <rect x="13" y="11" width="4" height="4" rx="1" />
            <rect x="7" y="16" width="4" height="3" rx="1" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        )
      )
    },
    {
      id: 'camera',
      label: 'Scanner',
      renderIcon: (isActive) => (
        isActive ? (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
            <path d="M20 5h-3.17L15.6 3H8.4L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 14H4V7h3.88l1.2-2h5.84l1.2 2H20v12z" />
          </svg>
        ) : (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        )
      )
    },
    {
      id: 'subscriptions',
      label: 'Subscriptions',
      renderIcon: (isActive) => (
        isActive ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
            <path d="M3 8l3.5 9h11L21 8l-5 4-4-7-4 7-5-4z" />
            <rect x="3" y="19" width="18" height="2.5" rx="1" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8l3.5 9h11L21 8l-5 4-4-7-4 7-5-4z" />
            <path d="M4 21h16" />
          </svg>
        )
      )
    },
    {
      id: 'community',
      label: 'Community',
      renderIcon: (isActive) => (
        isActive ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="7" r="4" />
            <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          </svg>
        )
      )
    }
  ];

  return (
    <nav className="bottom-nav-container" aria-label="Main Navigation">
      <div className="bottom-nav-inner" role="tablist">
        {navItems.map((item) => {
          const isActive = activeTabId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`nav-tab-item ${isActive ? 'active' : ''}`}
              onClick={() => handleTabClick(item.id)}
              aria-label={item.label}
              aria-selected={isActive}
            >
              <div className="nav-tab-icon-wrap">
                {item.renderIcon(isActive)}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavBar;
