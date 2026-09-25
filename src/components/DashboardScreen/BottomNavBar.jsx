import React, { useState, useRef, useEffect } from 'react';
import './BottomNavBar.css';

const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3L21 10.5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V10.5Z" />
        <line x1="9" y1="16" x2="15" y2="16" strokeWidth="2.2" />
      </svg>
    )
  },
  {
    id: 'diary',
    label: 'Planner',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4.5" y="2.5" width="15" height="19" rx="5" />
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
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 4H9.5L7.5 7H4C2.89543 7 2 7.89543 2 9V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V9C22 7.89543 21.1046 7 20 7H16.5L14.5 4Z" />
        <circle cx="12" cy="13.5" r="3.2" />
      </svg>
    )
  },
  {
    id: 'subscriptions',
    label: 'Plans',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8l3.5 9h11L21 8l-5 4-4-7-4 7-5-4z" />
        <path d="M4 21h16" />
      </svg>
    )
  },
  {
    id: 'community',
    label: 'Friends',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8.5" r="3.5" />
        <path d="M6 19C6 15.8 8.7 13.8 12 13.8C15.3 13.8 18 15.8 18 19" />
      </svg>
    )
  }
];

export function BottomNavBar({ activeTabId = 'home', onSelectTab, onOpenScanner }) {
  const activeIndex = Math.max(0, NAV_ITEMS.findIndex(item => item.id === activeTabId));
  const containerRef = useRef(null);
  const tabButtonRefs = useRef([]);
  const [indicatorOffset, setIndicatorOffset] = useState(62);
  const [navWidth, setNavWidth] = useState(380);
  const [navHeight, setNavHeight] = useState(68);

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
      if (containerRect.width > 0) {
        setNavWidth(containerRect.width);
        setNavHeight(containerRect.height || 68);
      }

      const activeBtn = tabButtonRefs.current[activeIndex];
      if (activeBtn) {
        const btnRect = activeBtn.getBoundingClientRect();
        const center = btnRect.left - containerRect.left + btnRect.width / 2;
        setIndicatorOffset(center);
      } else {
        const tabWidth = (containerRect.width || 380) / NAV_ITEMS.length;
        setIndicatorOffset(tabWidth * activeIndex + tabWidth / 2);
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [activeIndex]);

  // Geometry dimensions for native geometric semicircle scoop
  const W = navWidth || 380;
  const H = navHeight || 68;
  const R = 14;

  const cx = indicatorOffset || 62;
  const r = 24;  // True semicircle radius (concentric to 40px blob with 6px gap)
  const rs = 10; // Shoulder fillet width
  const w = r + rs; // 36px

  const x0 = Math.max(R, cx - w);
  const x1 = Math.min(W - R, cx + w);

  // SVG path with native circular arc (A r,r 0 0,0) guaranteeing a true geometric semicircle
  const svgPath = `
    M 0,${R}
    A ${R},${R} 0 0,1 ${R},0
    L ${x0},0
    C ${cx - w + 5},0 ${cx - r},1 ${cx - r},5
    A ${r},${r} 0 0,0 ${cx + r},5
    C ${cx + r},1 ${cx + w - 5},0 ${x1},0
    L ${W - R},0
    A ${R},${R} 0 0,1 ${W},${R}
    L ${W},${H}
    L 0,${H}
    Z
  `.replace(/\s+/g, ' ').trim();

  const activeItem = NAV_ITEMS[activeIndex] || NAV_ITEMS[0];

  return (
    <nav className="magic-nav-container" ref={containerRef} aria-label="Bottom Navigation">
      {/* SVG Scooped Dock Background Layer */}
      <svg
        className="magic-nav-bg-svg"
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height={H}
        preserveAspectRatio="none"
      >
        <path
          d={svgPath}
          fill="#FFFFFF"
          className="magic-nav-path"
        />
      </svg>

      {/* Floating Elevated Green Circle Active Button */}
      <div
        className="magic-nav-floating-bubble"
        style={{ left: `${cx}px` }}
        onClick={() => handleTabClick(activeIndex, activeItem)}
        aria-hidden="true"
      >
        <div className="magic-floating-icon">
          {activeItem.icon}
        </div>
      </div>

      {/* Dynamic Active Text Label displayed underneath the scoop */}
      <div
        className="magic-nav-active-label"
        style={{ left: `${cx}px` }}
        aria-hidden="true"
      >
        {activeItem.label}
      </div>

      {/* Centered Tab Navigation Items Row with Inset Side Padding */}
      <div className="magic-nav-items">
        {NAV_ITEMS.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={item.id}
              ref={el => (tabButtonRefs.current[index] = el)}
              type="button"
              className={`magic-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleTabClick(index, item)}
              aria-label={item.label}
              aria-selected={isActive}
            >
              <div className="magic-icon-wrap">
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
