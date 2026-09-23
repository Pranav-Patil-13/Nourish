import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bell, Loader2 } from 'lucide-react';
import userAvatar from '../../assets/user_avatar.jpg';
import { DateSlider } from './DateSlider';
import { MacroCard } from './MacroCard';
import { TodayActivity } from './TodayActivity';
import { BottomNavBar } from './BottomNavBar';
import { NotificationDrawer } from '../NotificationDrawer/NotificationDrawer';
import './DashboardScreen.css';

const PULL_TRIGGER_THRESHOLD = 52;
const MAX_PULL = 72;

export function DashboardScreen({ onOpenScanner }) {
  // 1s (1000ms) initial loading state for dynamic metrics
  const [isLoading, setIsLoading] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Pull down to refresh state
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  const scrollRef = useRef(null);
  const startYRef = useRef(0);
  const currentPullRef = useRef(0);

  const triggerRefresh = useCallback(() => {
    setIsRefreshing(true);
    setIsLoading(true);
    setPullDistance(PULL_TRIGGER_THRESHOLD);

    setTimeout(() => {
      setIsLoading(false);
      setIsRefreshing(false);
      setPullDistance(0);
    }, 1000);
  }, []);

  // Initial 1s load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Pointer / Touch Handlers for Pull-Down-to-Refresh
  const handleTouchStart = (e) => {
    if (isRefreshing) return;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const scrollTop = scrollRef.current ? scrollRef.current.scrollTop : 0;

    if (scrollTop <= 0) {
      startYRef.current = clientY;
      setIsPulling(true);
      currentPullRef.current = 0;
    }
  };

  const handleTouchMove = (e) => {
    if (!isPulling || isRefreshing) return;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const scrollTop = scrollRef.current ? scrollRef.current.scrollTop : 0;

    if (scrollTop <= 0) {
      const diff = clientY - startYRef.current;
      if (diff > 0) {
        // Elastic resistance formula
        const elasticPull = Math.min(MAX_PULL, Math.pow(diff, 0.82));
        currentPullRef.current = elasticPull;
        setPullDistance(elasticPull);
      } else {
        setPullDistance(0);
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isPulling || isRefreshing) return;
    setIsPulling(false);

    if (currentPullRef.current >= PULL_TRIGGER_THRESHOLD) {
      triggerRefresh();
    } else {
      setPullDistance(0);
    }
    currentPullRef.current = 0;
  };

  // Rotation percentage for the pull spinner
  const pullProgress = Math.min(1, pullDistance / PULL_TRIGGER_THRESHOLD);
  const rotationDeg = pullProgress * 360;

  return (
    <div
      className="dashboard-screen"
      onPointerDown={handleTouchStart}
      onPointerMove={handleTouchMove}
      onPointerUp={handleTouchEnd}
      onPointerCancel={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull-Down-to-Refresh Indicator */}
      <div
        className={`pull-refresh-indicator ${isRefreshing ? 'refreshing' : ''}`}
        style={{
          transform: `translate(-50%, ${Math.max(0, pullDistance - 30)}px)`,
          opacity: pullDistance > 8 || isRefreshing ? Math.min(1, pullDistance / 28) : 0,
          transition: isPulling ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease'
        }}
      >
        <div className="pull-refresh-pill">
          <Loader2
            size={18}
            className={`pull-refresh-icon ${isRefreshing ? 'spin-anim' : ''}`}
            style={{ transform: isRefreshing ? undefined : `rotate(${rotationDeg}deg)` }}
          />
        </div>
      </div>

      <div
        className="dashboard-scrollable-content"
        ref={scrollRef}
        style={{
          transform: `translateY(${pullDistance * 0.4}px)`,
          transition: isPulling ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Dashboard Top Header */}
        <header className="dashboard-header">
          <div className="user-profile-group">
            <div className="avatar-wrapper">
              <img
                src={userAvatar}
                alt="Johan Smith"
                className="user-avatar-img"
              />
            </div>
            <div className="user-text-info">
              <span className="user-greeting">Good morning!</span>
              <h2 className="user-fullname">Johan Smith</h2>
            </div>
          </div>

          {/* Notification Bell Button with Badge */}
          <button
            className="notification-btn"
            aria-label="Open notifications"
            onClick={() => setIsNotificationOpen(true)}
          >
            <Bell size={20} className="bell-icon" strokeWidth={1.8} />
            <span className="notification-badge-dot" />
          </button>
        </header>

        {/* Date Slider Row */}
        <DateSlider />

        {/* Unified Macro Card (Calories + 3 Refined Macros) */}
        <MacroCard isLoading={isLoading} />

        {/* Today's Activity Food Log List */}
        <TodayActivity isLoading={isLoading} />
      </div>

      {/* Floating Scooped Bottom Navigation Bar */}
      <BottomNavBar onOpenScanner={onOpenScanner} />

      {/* 65% Slide-Up Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
}

export default DashboardScreen;
