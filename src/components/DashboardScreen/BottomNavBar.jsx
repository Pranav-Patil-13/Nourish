import React, { useState, useRef, useEffect } from 'react';
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
  const activeTab = Math.max(0, NAV_ITEMS.findIndex(item => item.id === activeTabId));
  const containerRef = useRef(null);
  const tabButtonRefs = useRef([]);
  const [indicatorOffset, setIndicatorOffset] = useState(48);
  const [navWidth, setNavWidth] = useState(365);

  const handleTabClick = (index, item) => {
    if (item.id === 'camera' && onOpenScanner) {
      onOpenScanner();
    } else if (onSelectTab) {
      onSelectTab(item.id);
    }
  };

  useEffect(() => {
    const updatePosition = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      setNavWidth(containerRect.width);

      const activeBtn = tabButtonRefs.current[activeTab];
      if (activeBtn) {
        const btnRect = activeBtn.getBoundingClientRect();
        const center = btnRect.left - containerRect.left + btnRect.width / 2;
        setIndicatorOffset(center);
      } else {
        const tabWidth = containerRect.width / NAV_ITEMS.length;
        setIndicatorOffset(tabWidth * activeTab + tabWidth / 2);
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [activeTab]);

  // Geometry dimensions - reduced scoop height / depth
  const W = navWidth || 365;
  const H = 68;
  const R = 14; // Subtle corner radius <= 14px
  const dipHalfWidth = 32; // 56px wide scoop
  const dipDepth = 18; // Reduced scoop height (shallower, sleek curve)

  // Directly track the exact icon center
  const cx = indicatorOffset || W / 10;
  const x0 = Math.max(R, cx - dipHalfWidth);
  const x1 = Math.min(W - R, cx + dipHalfWidth);

  const c1x = cx - dipHalfWidth * 0.52;
  const c2x = cx - dipHalfWidth * 0.48;
  const c3x = cx + dipHalfWidth * 0.48;
  const c4x = cx + dipHalfWidth * 0.52;

  // Mathematically tangent-continuous path perfectly centered on active tab
  const svgPath = `
    M 0,${R}
    A ${R},${R} 0 0,1 ${R},0
    L ${x0},0
    C ${c1x},0 ${c2x},${dipDepth} ${cx},${dipDepth}
    C ${c3x},${dipDepth} ${c4x},0 ${x1},0
    L ${W - R},0
    A ${R},${R} 0 0,1 ${W},${R}
    L ${W},${H - R}
    A ${R},${R} 0 0,1 ${W - R},${H}
    L ${R},${H}
    A ${R},${R} 0 0,1 0,${H - R}
    Z
  `.replace(/\s+/g, ' ').trim();

  return (
    <nav className="bottom-nav-container" ref={containerRef} aria-label="Bottom Navigation">
      {/* Dynamic SVG scooped background layer */}
      <svg
        className="bottom-nav-bg-svg"
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height={H}
        preserveAspectRatio="none"
      >
        <path
          d={svgPath}
          fill="#FFFFFF"
          className="bottom-nav-path"
        />
      </svg>

      {/* Floating Active Indicator Dot */}
      <div
        className="nav-active-dot"
        style={{ left: `${cx}px` }}
        aria-hidden="true"
      />

      {/* 5 Tab Navigation Items */}
      <div className="bottom-nav-items">
        {NAV_ITEMS.map((item, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={item.id}
              ref={el => (tabButtonRefs.current[index] = el)}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleTabClick(index, item)}
              aria-label={item.label}
              aria-selected={isActive}
            >
              <div className="nav-icon-container">
                {item.icon}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavBar;
