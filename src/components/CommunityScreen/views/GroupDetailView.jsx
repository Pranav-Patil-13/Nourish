import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Users,
  Check,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Copy,
  Flag,
  CheckCircle2
} from 'lucide-react';

export function GroupDetailView({ group, onBack, onOpenActionSheet, showToast }) {
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'about' | 'members'
  const [isJoined, setIsJoined] = useState(group?.isJoined || false);

  if (!group) return null;

  const handleOpenShare = () => {
    if (onOpenActionSheet) {
      onOpenActionSheet({
        title: group.name,
        sub: `${group.membersCount} • ${group.type}`,
        items: [
          {
            label: 'Copy Invite Link',
            icon: Copy,
            onClick: () => showToast && showToast('Invite link copied!')
          },
          {
            label: 'Share via Messages',
            icon: Share2,
            onClick: () => showToast && showToast('Sharing group...')
          },
          {
            label: 'Report Group',
            icon: Flag,
            isDestructive: true,
            onClick: () => showToast && showToast('Group reported for review')
          }
        ]
      });
    }
  };

  return (
    <div className="comm-group-detail-view">
      {/* Floating Top Nav */}
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
          onClick={handleOpenShare}
          aria-label="Share group"
        >
          <Share2 size={18} strokeWidth={2.2} />
        </button>
      </div>

      <div className="comm-group-detail-scrollable">
        {/* Cover Photo */}
        <div className="group-detail-hero-wrap">
          <img src={group.coverImage} alt={group.name} className="group-detail-hero-img" />
          <div className="group-detail-hero-gradient" />
        </div>

        {/* Group Header Info */}
        <div className="group-detail-body">
          <div className="group-detail-header-card">
            <div className="group-detail-primary-row">
              <h1 className="group-detail-title">{group.name}</h1>

              <button
                type="button"
                className={`group-detail-join-cta ${isJoined ? 'joined' : ''}`}
                onClick={() => setIsJoined(!isJoined)}
              >
                {isJoined ? (
                  <>
                    <Check size={14} strokeWidth={3} />
                    <span>Joined</span>
                  </>
                ) : (
                  <span>Join Group</span>
                )}
              </button>
            </div>

            <span className="group-detail-type-sub">
              {group.membersCount} • {group.type}
            </span>

            <p className="group-detail-description">{group.description}</p>
          </div>

          {/* Segmented Tabs: Posts | About | Members */}
          <div className="group-segmented-tabs-row" role="tablist">
            {['posts', 'about', 'members'].map((t) => (
              <button
                key={t}
                type="button"
                className={`group-tab-pill ${activeTab === t ? 'active' : ''}`}
                onClick={() => setActiveTab(t)}
                role="tab"
                aria-selected={activeTab === t}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* TAB 1: POSTS */}
          {activeTab === 'posts' && (
            <div className="group-posts-stream">
              {group.posts && group.posts.length > 0 ? (
                group.posts.map((post) => (
                  <article key={post.id} className="comm-post-card group-post-card">
                    <div className="comm-post-author-row">
                      <div className="author-clickable-group">
                        <div className="author-avatar-wrap">
                          <img src={post.author.avatar} alt={post.author.name} />
                        </div>
                        <div className="author-info-col">
                          <span className="author-name">{post.author.name}</span>
                          <span className="post-timestamp">{post.timeAgo}</span>
                        </div>
                      </div>
                      <MoreHorizontal size={18} className="post-options-icon" />
                    </div>

                    <p className="comm-post-caption">{post.caption}</p>

                    {post.image && (
                      <div className="comm-post-media-wrap">
                        <img src={post.image} alt="Group post" className="comm-post-img" />
                      </div>
                    )}

                    <div className="comm-post-actions-bar">
                      <button type="button" className="comm-action-btn">
                        <Heart size={16} color="#64748B" />
                        <span className="action-count">{post.likesCount}</span>
                      </button>
                      <button type="button" className="comm-action-btn">
                        <MessageCircle size={16} color="#64748B" />
                        <span className="action-count">{post.commentsCount}</span>
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-group-posts">
                  <span>No group posts yet. Share your latest workout!</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ABOUT */}
          {activeTab === 'about' && (
            <div className="group-about-tab-content">
              <h3 className="about-sub-title">Community Guidelines</h3>
              <p className="about-body-text">
                Be kind, supportive, and celebrate each other's progress. No promotional spam.
              </p>
            </div>
          )}

          {/* TAB 3: MEMBERS */}
          {activeTab === 'members' && (
            <div className="group-members-tab-content">
              <span className="members-stat-count">2,410 active members from Nashik</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupDetailView;
