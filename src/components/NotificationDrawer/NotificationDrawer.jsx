import React, { useState } from 'react';
import {
  Droplets,
  Flame,
  Award,
  Sparkles,
  Clock,
  BellOff
} from 'lucide-react';
import './NotificationDrawer.css';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    icon: Droplets,
    iconColor: '#0284C7',
    iconBg: '#F0F9FF',
    title: 'Hydration Target',
    message: "700ml remaining to hit your 2.5L goal",
    time: '15m ago',
    unread: true
  },
  {
    id: 'notif-2',
    icon: Flame,
    iconColor: '#16A34A',
    iconBg: '#F0FDF4',
    title: 'Dinner Logged',
    message: 'Noodles (+45 kcal) added to daily diary',
    time: '1h ago',
    unread: true
  },
  {
    id: 'notif-3',
    icon: Award,
    iconColor: '#D97706',
    iconBg: '#FFFBEB',
    title: '7-Day Streak Unlocked',
    message: 'Consistent meal tracking 7 days in a row',
    time: '3h ago',
    unread: true
  },
  {
    id: 'notif-4',
    icon: Sparkles,
    iconColor: '#7C3AED',
    iconBg: '#FAF5FF',
    title: 'Protein Target on Track',
    message: 'Daily protein reached 85% of target',
    time: '6h ago',
    unread: false
  },
  {
    id: 'notif-5',
    icon: Clock,
    iconColor: '#64748B',
    iconBg: '#F8FAFC',
    title: 'Daily Summary Ready',
    message: 'Your Wednesday nutrition report is ready',
    time: 'Yesterday',
    unread: false
  }
];

export function NotificationDrawer({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  return (
    <div className="notif-drawer-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="notif-drawer-container" onClick={(e) => e.stopPropagation()}>
        {/* Top Minimal Drag Pill */}
        <div className="notif-drawer-handle-bar" onClick={onClose}>
          <div className="notif-drawer-handle-pill" />
        </div>

        {/* Clean Header */}
        <header className="notif-drawer-header">
          <div className="notif-title-row">
            <h2 className="notif-drawer-title">Notifications</h2>
            {unreadCount > 0 && (
              <span className="notif-count-pill">{unreadCount}</span>
            )}
          </div>

          <div className="notif-header-right">
            {unreadCount > 0 && (
              <button
                type="button"
                className="notif-header-link"
                onClick={handleMarkAllRead}
              >
                Mark all read
              </button>
            )}
          </div>
        </header>

        {/* Minimalist Notifications List */}
        <div className="notif-drawer-list">
          {notifications.length === 0 ? (
            <div className="notif-empty-state">
              <div className="notif-empty-icon-wrap">
                <BellOff size={24} strokeWidth={1.75} />
              </div>
              <p className="notif-empty-title">All caught up</p>
              <p className="notif-empty-desc">No new notifications right now</p>
            </div>
          ) : (
            <>
              <div className="notif-items-wrapper">
                {notifications.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <article
                      key={item.id}
                      className={`notif-item ${item.unread ? 'unread' : 'read'}`}
                      onClick={() => handleToggleRead(item.id)}
                    >
                      {/* Left Clean Icon */}
                      <div
                        className="notif-item-icon"
                        style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                      >
                        <IconComp size={15} strokeWidth={2} />
                      </div>

                      {/* Middle Details */}
                      <div className="notif-item-body">
                        <div className="notif-item-top">
                          <h4 className="notif-item-title">{item.title}</h4>
                          <span className="notif-item-time">{item.time}</span>
                        </div>
                        <p className="notif-item-desc">{item.message}</p>
                      </div>

                      {/* Right Subtle Unread Dot */}
                      {item.unread && <span className="notif-item-unread-dot" />}
                    </article>
                  );
                })}
              </div>

              <div className="notif-footer-actions">
                <button
                  type="button"
                  className="notif-clear-btn"
                  onClick={handleClearAll}
                >
                  Clear all
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationDrawer;
