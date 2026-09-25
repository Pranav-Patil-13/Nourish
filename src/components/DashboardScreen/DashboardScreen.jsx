import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bell, Loader2, TrendingUp } from 'lucide-react';
import userAvatar from '../../assets/user_avatar.jpg';
import { DateSlider } from './DateSlider';
import { MacroCard } from './MacroCard';
import { TodayActivity } from './TodayActivity';
import { NotificationDrawer } from '../NotificationDrawer/NotificationDrawer';
import { useBackHandler } from '../../context/BackNavigationContext';
import './DashboardScreen.css';

const PULL_TRIGGER_THRESHOLD = 52;
const MAX_PULL = 72;

export function DashboardScreen({ onOpenScanner, onSelectTab, animatePushIn = false }) {
  // 1s (1000ms) initial loading state for dynamic metrics
  const [isLoading, setIsLoading] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Register Native Back Handler for Notification Drawer
  useBackHandler(() => {
    if (isNotificationOpen) {
      setIsNotificationOpen(false);
      return true;
    }
    return false;
  }, true, 10);

  // Pull down to refresh state
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  const scrollRef = useRef(null);
  const isRefreshingRef = useRef(isRefreshing);
  const currentPullRef = useRef(0);

  useEffect(() => {
    isRefreshingRef.current = isRefreshing;
  }, [isRefreshing]);

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

  // Native non-passive touch listeners for mobile pull-to-refresh
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let startY = 0;
    let isTracking = false;

    const onTouchStart = (e) => {
      if (isRefreshingRef.current) return;
      if (el.scrollTop <= 0 && e.touches && e.touches.length === 1) {
        startY = e.touches[0].clientY;
        isTracking = true;
      }
    };

    const onTouchMove = (e) => {
      if (!isTracking || isRefreshingRef.current) return;
      if (el.scrollTop <= 0 && e.touches && e.touches.length === 1) {
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        if (diff > 0) {
          if (e.cancelable) e.preventDefault();
          const elasticPull = Math.min(MAX_PULL, Math.pow(diff, 0.82));
          currentPullRef.current = elasticPull;
          setIsPulling(true);
          setPullDistance(elasticPull);
        } else {
          setIsPulling(false);
          setPullDistance(0);
        }
      }
    };

    const onTouchEnd = () => {
      if (!isTracking || isRefreshingRef.current) return;
      isTracking = false;
      setIsPulling(false);

      if (currentPullRef.current >= PULL_TRIGGER_THRESHOLD) {
        triggerRefresh();
      } else {
        setPullDistance(0);
      }
      currentPullRef.current = 0;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [triggerRefresh]);

  // Desktop Pointer Handlers for testing
  const handlePointerDown = (e) => {
    if (isRefreshing || e.pointerType === 'touch') return;
    const clientY = e.clientY;
    const scrollTop = scrollRef.current ? scrollRef.current.scrollTop : 0;

    if (scrollTop <= 0) {
      currentPullRef.current = 0;
      const onPointerMove = (moveEvt) => {
        const diff = moveEvt.clientY - clientY;
        if (diff > 0) {
          const elasticPull = Math.min(MAX_PULL, Math.pow(diff, 0.82));
          currentPullRef.current = elasticPull;
          setIsPulling(true);
          setPullDistance(elasticPull);
        }
      };

      const onPointerUp = () => {
        setIsPulling(false);
        if (currentPullRef.current >= PULL_TRIGGER_THRESHOLD) {
          triggerRefresh();
        } else {
          setPullDistance(0);
        }
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    }
  };

  // Rotation percentage for the pull spinner
  const pullProgress = Math.min(1, pullDistance / PULL_TRIGGER_THRESHOLD);
  const rotationDeg = pullProgress * 360;

  return (
    <div
      className={`dashboard-screen ${animatePushIn ? 'slide-in-push' : ''}`}
      onPointerDown={handlePointerDown}
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

          <div className="dashboard-header-actions">
            {/* Notification Bell Button with Badge */}
            <button
              className="notification-btn"
              aria-label="Open notifications"
              onClick={() => setIsNotificationOpen(true)}
            >
              <Bell size={20} className="bell-icon" strokeWidth={1.8} />
              <span className="notification-badge-dot" />
            </button>

            {/* Analytics Header Button */}
            <button
              className="analytics-header-btn"
              aria-label="Analytics & Trends"
              onClick={() => {
                if (onSelectTab) onSelectTab('analytics');
              }}
              title="Analytics & Trends"
            >
              <TrendingUp size={19} className="analytics-header-icon" strokeWidth={1.8} />
            </button>
          </div>
        </header>

        {/* Date Slider Row */}
        <DateSlider />

        {/* Unified Macro Card (Calories + 3 Refined Macros) */}
        <MacroCard isLoading={isLoading} />

        {/* Today's Activity Food Log List */}
        <TodayActivity isLoading={isLoading} />
      </div>

      {/* 65% Slide-Up Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
}

export default DashboardScreen;
