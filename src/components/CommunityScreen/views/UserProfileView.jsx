import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  MapPin,
  Flame,
  Grid,
  Heart,
  MoreHorizontal,
  Share2,
  Copy,
  VolumeX,
  ShieldAlert,
  Flag
} from 'lucide-react';
import { USER_PROFILES } from '../data/communityData';

export function UserProfileView({
  userHandle = 'riyasharma',
  onBack,
  onOpenMyPosts,
  onOpenActionSheet,
  showToast
}) {
  const [profile, setProfile] = useState(USER_PROFILES[userHandle] || USER_PROFILES.riyasharma);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'meals' | 'workouts'
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing || false);

  const handleOpenMenu = () => {
    if (onOpenActionSheet) {
      onOpenActionSheet({
        title: profile.name,
        sub: `@${profile.handle}`,
        items: [
          {
            label: 'Share Profile',
            icon: Share2,
            onClick: () => showToast && showToast('Sharing profile...')
          },
          {
            label: 'Copy Profile Link',
            icon: Copy,
            onClick: () => showToast && showToast('Profile link copied!')
          },
          {
            label: `Mute @${profile.handle}`,
            icon: VolumeX,
            onClick: () => showToast && showToast(`Muted @${profile.handle}`)
          },
          {
            label: 'Report Account',
            icon: Flag,
            isDestructive: true,
            onClick: () => showToast && showToast('Report submitted for review')
          }
        ]
      });
    }
  };

  return (
    <div className="comm-user-profile-view">
      {/* Floating Top Header */}
      <div className="comm-detail-floating-nav">
        <button
          type="button"
          className="comm-detail-nav-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={18} strokeWidth={2.2} />
        </button>

        <button
          type="button"
          className="comm-detail-nav-btn"
          onClick={handleOpenMenu}
          aria-label="Options"
        >
          <MoreHorizontal size={18} strokeWidth={2.2} />
        </button>
      </div>

      <div className="comm-profile-scrollable">
        {/* Cover Banner */}
        <div className="comm-profile-cover-wrap">
          <img src={profile.cover} alt="Cover" className="comm-profile-cover-img" />
          <div className="comm-profile-cover-gradient" />
        </div>

        {/* Profile Card Body */}
        <div className="comm-profile-body">
          {/* Avatar & Follow Action Row */}
          <div className="comm-profile-avatar-row">
            <div className="comm-profile-avatar-wrap">
              <img src={profile.avatar} alt={profile.name} className="comm-profile-avatar-img" />
            </div>

            <button
              type="button"
              className={`comm-profile-follow-cta ${isFollowing ? 'following' : ''}`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? (
                <>
                  <Check size={14} strokeWidth={3} />
                  <span>Following</span>
                </>
              ) : (
                <span>Follow</span>
              )}
            </button>
          </div>

          {/* User Name & Handle */}
          <div className="comm-profile-identity">
            <h1 className="comm-profile-name">{profile.name}</h1>
            <span className="comm-profile-handle">@{profile.handle}</span>
          </div>

          {/* Stats Bar (Posts | Followers | Following) */}
          <div className="comm-profile-stats-bar">
            <div className="stat-col" onClick={onOpenMyPosts} role="button" tabIndex={0}>
              <span className="stat-number">{profile.postsCount}</span>
              <span className="stat-title">Posts</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-col">
              <span className="stat-number">{profile.followersCount}</span>
              <span className="stat-title">Followers</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-col">
              <span className="stat-number">{profile.followingCount}</span>
              <span className="stat-title">Following</span>
            </div>
          </div>

          {/* Bio Text */}
          <p className="comm-profile-bio">{profile.bio}</p>

          {/* Tab Navigation: Posts | Meals | Workouts */}
          <div className="comm-profile-tabs-row" role="tablist">
            {['posts', 'meals', 'workouts'].map((t) => (
              <button
                key={t}
                type="button"
                className={`comm-profile-tab ${activeTab === t ? 'active' : ''}`}
                onClick={() => setActiveTab(t)}
                role="tab"
                aria-selected={activeTab === t}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* 3-Column Posts Media Grid */}
          <div className="comm-profile-media-grid">
            {profile.posts.map((p) => (
              <div
                key={p.id}
                className="comm-profile-grid-item"
                onClick={onOpenMyPosts}
              >
                <img src={p.image} alt="" className="grid-thumb" />
                <div className="grid-thumb-overlay">
                  <span className="grid-cal-badge">{p.calories}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileView;
