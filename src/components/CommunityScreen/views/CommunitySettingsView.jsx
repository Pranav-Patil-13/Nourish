import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function CommunitySettingsView({ onBack }) {
  const [settings, setSettings] = useState({
    privateProfile: false,
    showMacros: true,
    showWorkouts: true,
    commentsPermission: 'Everyone',
    tagsPermission: 'Followers',
    directMessages: true,
    notifLikes: true,
    notifComments: true,
    notifFollowers: true,
    notifGroups: false
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="community-subview comm-settings-view">
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
        <h2 className="comm-subview-title">Community Settings</h2>
        <div style={{ width: 36 }} />
      </div>

      <div className="comm-settings-content">
        {/* Privacy Section */}
        <div className="comm-settings-section">
          <h3 className="comm-settings-section-title">Privacy & Visibility</h3>
          <div className="comm-settings-card">
            <div className="comm-settings-row">
              <div className="comm-settings-info">
                <div className="comm-setting-name">Private Profile</div>
              </div>
              <button
                type="button"
                className={`comm-toggle-switch ${settings.privateProfile ? 'active' : ''}`}
                onClick={() => toggleSetting('privateProfile')}
                aria-label="Toggle private profile"
              >
                <span className="comm-toggle-slider" />
              </button>
            </div>

            <div className="comm-settings-row">
              <div className="comm-settings-info">
                <div className="comm-setting-name">Show Calories & Macros</div>
              </div>
              <button
                type="button"
                className={`comm-toggle-switch ${settings.showMacros ? 'active' : ''}`}
                onClick={() => toggleSetting('showMacros')}
                aria-label="Toggle show macros"
              >
                <span className="comm-toggle-slider" />
              </button>
            </div>

            <div className="comm-settings-row">
              <div className="comm-settings-info">
                <div className="comm-setting-name">Show Workouts on Profile</div>
              </div>
              <button
                type="button"
                className={`comm-toggle-switch ${settings.showWorkouts ? 'active' : ''}`}
                onClick={() => toggleSetting('showWorkouts')}
                aria-label="Toggle show workouts"
              >
                <span className="comm-toggle-slider" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactions Section */}
        <div className="comm-settings-section">
          <h3 className="comm-settings-section-title">Interactions</h3>
          <div className="comm-settings-card">
            <div className="comm-settings-row">
              <div className="comm-settings-info">
                <div className="comm-setting-name">Who can comment</div>
              </div>
              <select
                className="comm-poll-select"
                value={settings.commentsPermission}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, commentsPermission: e.target.value }))
                }
              >
                <option value="Everyone">Everyone</option>
                <option value="Followers">Followers only</option>
                <option value="Off">No one</option>
              </select>
            </div>

            <div className="comm-settings-row">
              <div className="comm-settings-info">
                <div className="comm-setting-name">Who can mention you</div>
              </div>
              <select
                className="comm-poll-select"
                value={settings.tagsPermission}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, tagsPermission: e.target.value }))
                }
              >
                <option value="Everyone">Everyone</option>
                <option value="Followers">Followers only</option>
                <option value="Off">No one</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="comm-settings-section">
          <h3 className="comm-settings-section-title">Push Notifications</h3>
          <div className="comm-settings-card">
            <div className="comm-settings-row">
              <div className="comm-settings-info">
                <div className="comm-setting-name">Likes & Reactions</div>
              </div>
              <button
                type="button"
                className={`comm-toggle-switch ${settings.notifLikes ? 'active' : ''}`}
                onClick={() => toggleSetting('notifLikes')}
                aria-label="Toggle notif likes"
              >
                <span className="comm-toggle-slider" />
              </button>
            </div>

            <div className="comm-settings-row">
              <div className="comm-settings-info">
                <div className="comm-setting-name">Comments & Replies</div>
              </div>
              <button
                type="button"
                className={`comm-toggle-switch ${settings.notifComments ? 'active' : ''}`}
                onClick={() => toggleSetting('notifComments')}
                aria-label="Toggle notif comments"
              >
                <span className="comm-toggle-slider" />
              </button>
            </div>

            <div className="comm-settings-row">
              <div className="comm-settings-info">
                <div className="comm-setting-name">New Followers</div>
              </div>
              <button
                type="button"
                className={`comm-toggle-switch ${settings.notifFollowers ? 'active' : ''}`}
                onClick={() => toggleSetting('notifFollowers')}
                aria-label="Toggle notif followers"
              >
                <span className="comm-toggle-slider" />
              </button>
            </div>
          </div>
        </div>

        {/* Safety */}
        <div className="comm-settings-section">
          <h3 className="comm-settings-section-title">Safety & Blocking</h3>
          <div className="comm-settings-card">
            <button type="button" className="comm-settings-nav-btn">
              <div className="comm-settings-info">
                <div className="comm-setting-name">Blocked Accounts</div>
              </div>
              <ChevronRight size={18} className="comm-chevron" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
