import React, { useState } from 'react';
import {
  ArrowLeft,
  Bike,
  CalendarCheck,
  CreditCard,
  MapPin,
  Tag,
  Bell
} from 'lucide-react';
import { NOTIFICATIONS_DATA } from '../data/subscriptionsData';

const NOTIF_TABS = ['All', 'Orders', 'Fitness', 'Offers'];

export function NotificationsView({ onBack, onSelectNotification }) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredNotifs = activeTab === 'All'
    ? NOTIFICATIONS_DATA
    : NOTIFICATIONS_DATA.filter((n) => n.category.toLowerCase() === activeTab.toLowerCase());

  const renderIcon = (type) => {
    switch (type) {
      case 'delivery':
        return <Bike size={18} className="notif-icon delivery" />;
      case 'trainer':
        return <CalendarCheck size={18} className="notif-icon trainer" />;
      case 'billing':
        return <CreditCard size={18} className="notif-icon billing" />;
      case 'gym':
        return <MapPin size={18} className="notif-icon gym" />;
      case 'discount':
        return <Tag size={18} className="notif-icon discount" />;
      default:
        return <Bell size={18} className="notif-icon default" />;
    }
  };

  return (
    <div className="sub-notifications-view">
      {/* Header */}
      <header className="sub-notifs-header">
        <button
          type="button"
          className="sub-back-circle-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={19} strokeWidth={2.2} />
        </button>

        <h1 className="sub-notifs-title">Notifications</h1>
        <div style={{ width: 40 }} />
      </header>

      {/* Tabs Row */}
      <div className="sub-notifs-tabs-row" role="tablist">
        {NOTIF_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`sub-notif-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="sub-notifs-list">
        {filteredNotifs.map((item) => (
          <div
            key={item.id}
            className="sub-notif-card"
            onClick={() => {
              if (onSelectNotification) onSelectNotification(item);
            }}
          >
            <div className="notif-icon-avatar">
              {renderIcon(item.type)}
            </div>

            <div className="notif-content-block">
              <h3 className="notif-title">{item.title}</h3>
              <p className="notif-desc">{item.desc}</p>
              <span className="notif-timestamp">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsView;
