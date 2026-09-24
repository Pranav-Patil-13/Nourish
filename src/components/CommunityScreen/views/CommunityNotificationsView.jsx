import React, { useState } from 'react';
import { ArrowLeft, CheckCheck, Heart, MessageSquare, UserPlus, Users, Trophy, AtSign } from 'lucide-react';
import { NOTIFICATIONS_COMMUNITY } from '../data/communityData';

export default function CommunityNotificationsView({ onBack, onOpenPost, onOpenProfile }) {
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState(NOTIFICATIONS_COMMUNITY);

  const tabs = ['All', 'Likes', 'Comments', 'Mentions'];

  const filteredNotifs = activeTab === 'All'
    ? notifications
    : notifications.filter((n) => n.category.toLowerCase() === activeTab.toLowerCase());

  const handleMarkAllRead = () => {
    // visual feedback
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'like':
        return <Heart size={12} className="comm-notif-badge-icon like" />;
      case 'comment':
        return <MessageSquare size={12} className="comm-notif-badge-icon comment" />;
      case 'follow':
        return <UserPlus size={12} className="comm-notif-badge-icon follow" />;
      case 'group':
        return <Users size={12} className="comm-notif-badge-icon group" />;
      case 'challenge':
        return <Trophy size={12} className="comm-notif-badge-icon challenge" />;
      default:
        return <AtSign size={12} className="comm-notif-badge-icon mention" />;
    }
  };

  return (
    <div className="community-subview comm-notifs-view">
      {/* Header */}
      <div className="community-subview-header">
        <button
          type="button"
          className="comm-icon-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="comm-subview-title">Notifications</h2>
        <button
          type="button"
          className="comm-icon-btn"
          onClick={handleMarkAllRead}
          title="Mark all as read"
          aria-label="Mark all as read"
        >
          <CheckCheck size={20} />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="comm-tab-pill-bar">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`comm-tab-pill ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="comm-notifs-list">
        {filteredNotifs.length === 0 ? (
          <div className="comm-empty-state">
            <p>No notifications in this tab yet.</p>
          </div>
        ) : (
          filteredNotifs.map((item) => (
            <div
              key={item.id}
              className="comm-notif-item"
              onClick={() => {
                if (item.type === 'follow' && onOpenProfile) {
                  onOpenProfile('riyasharma');
                } else if (onOpenPost) {
                  onOpenPost('post-1');
                }
              }}
            >
              <div className="comm-notif-avatar-wrap">
                <img
                  src={item.avatar}
                  alt={item.actor}
                  className="comm-notif-avatar"
                />
                <div className="comm-notif-badge">{getIconForType(item.type)}</div>
              </div>

              <div className="comm-notif-content">
                <p className="comm-notif-text">
                  <span className="comm-notif-actor">{item.actor}</span> {item.text}
                </p>
                <span className="comm-notif-time">{item.timeAgo}</span>
              </div>

              {item.thumb && (
                <div className="comm-notif-thumb-wrap">
                  <img
                    src={item.thumb}
                    alt="Post thumbnail"
                    className="comm-notif-thumb"
                  />
                </div>
              )}

              {item.type === 'follow' && (
                <button
                  type="button"
                  className="comm-follow-btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
