import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  Image,
  Utensils,
  Dumbbell,
  BarChart2,
  Bell,
  Settings,
  Compass,
  Users2,
  Flame,
  Award,
  Share2,
  Copy,
  Flag,
  VolumeX,
  CheckCircle2
} from 'lucide-react';
import userAvatarImg from '../../../assets/user_avatar.jpg';
import leavesImg from '../../../assets/leaves.png';

export function CommunityMainView({
  posts,
  onOpenCreatePost,
  onOpenCreatePoll,
  onSelectPost,
  onSelectAuthor,
  onToggleLike,
  onToggleBookmark,
  onOpenExplore,
  onOpenChallenges,
  onOpenGroups,
  onOpenNotifications,
  onOpenSettings,
  onOpenActionSheet,
  showToast
}) {
  const handleOpenPostOptions = (post) => {
    if (onOpenActionSheet) {
      onOpenActionSheet({
        title: `Post by ${post.author.name}`,
        sub: `@${post.author.handle}`,
        items: [
          {
            label: 'Share Post',
            icon: Share2,
            onClick: () => showToast && showToast('Post shared!')
          },
          {
            label: 'Copy Post Link',
            icon: Copy,
            onClick: () => showToast && showToast('Post link copied!')
          },
          {
            label: post.isBookmarked ? 'Remove Bookmark' : 'Save to Bookmarks',
            icon: Bookmark,
            onClick: () => {
              onToggleBookmark(post.id);
              showToast && showToast(post.isBookmarked ? 'Removed from saved' : 'Saved to bookmarks!');
            }
          },
          {
            label: `Mute @${post.author.handle}`,
            icon: VolumeX,
            onClick: () => showToast && showToast(`Muted posts from @${post.author.handle}`)
          },
          {
            label: 'Report Post',
            icon: Flag,
            isDestructive: true,
            onClick: () => showToast && showToast('Post reported for review')
          }
        ]
      });
    }
  };
  return (
    <div className="community-main-view">
      {/* Decorative Top-Right Leaves Watermark */}
      <div className="sub-header-leaves-wrap" aria-hidden="true">
        <img src={leavesImg} alt="" className="sub-header-leaves-img" />
      </div>

      {/* Top Header */}
      <header className="comm-main-header">
        <div className="comm-header-title-col">
          <h1 className="comm-main-title">Community</h1>
        </div>

        <div className="comm-header-actions">
          <button
            type="button"
            className="comm-circle-action-btn"
            onClick={onOpenNotifications}
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell size={17} strokeWidth={2.2} />
            <span className="comm-badge-dot" />
          </button>

          <button
            type="button"
            className="comm-circle-action-btn"
            onClick={onOpenSettings}
            aria-label="Community settings"
            title="Settings"
          >
            <Settings size={17} strokeWidth={2.2} />
          </button>
        </div>
      </header>

      {/* 3 Separate Navigation Action Pills: Explore | Challenges | Groups */}
      <div className="comm-feed-tabs-row" role="navigation">
        <button
          type="button"
          className="comm-feed-nav-pill"
          onClick={onOpenExplore}
        >
          Explore
        </button>

        <button
          type="button"
          className="comm-feed-nav-pill"
          onClick={onOpenChallenges}
        >
          Challenges
        </button>

        <button
          type="button"
          className="comm-feed-nav-pill"
          onClick={onOpenGroups}
        >
          Groups
        </button>
      </div>

      {/* Quick Composer Card */}
      <div className="comm-composer-card">
        <div className="comm-composer-top-row" onClick={() => onOpenCreatePost('photo')}>
          <div className="comm-composer-avatar">
            <img src={userAvatarImg} alt="You" />
          </div>
          <div className="comm-composer-input-placeholder">
            <span>What's on your mind?</span>
          </div>
        </div>

        <div className="comm-composer-chips-row">
          <button
            type="button"
            className="composer-chip-btn"
            onClick={() => onOpenCreatePost('photo')}
            aria-label="Add Photo"
            title="Add Photo"
          >
            <Image size={18} className="chip-icon photo" />
          </button>

          <button
            type="button"
            className="composer-chip-btn"
            onClick={() => onOpenCreatePost('meal')}
            aria-label="Log Meal"
            title="Log Meal"
          >
            <Utensils size={18} className="chip-icon meal" />
          </button>

          <button
            type="button"
            className="composer-chip-btn"
            onClick={() => onOpenCreatePost('workout')}
            aria-label="Log Workout"
            title="Log Workout"
          >
            <Dumbbell size={18} className="chip-icon workout" />
          </button>

          <button
            type="button"
            className="composer-chip-btn"
            onClick={onOpenCreatePoll}
            aria-label="Create Poll"
            title="Create Poll"
          >
            <BarChart2 size={18} className="chip-icon poll" />
          </button>
        </div>
      </div>

      {/* Feed Posts Stream */}
      <div className="comm-posts-stream">
        {posts.map((post) => (
          <article key={post.id} className="comm-post-card">
            {/* Post Author Row */}
            <div className="comm-post-author-row">
              <div
                className="author-clickable-group"
                onClick={() => onSelectAuthor(post.author)}
              >
                <div className="author-avatar-wrap">
                  <img src={post.author.avatar} alt={post.author.name} />
                </div>
                <div className="author-info-col">
                  <div className="author-name-row">
                    <span className="author-name">{post.author.name}</span>
                  </div>
                  <span className="post-timestamp">{post.timeAgo}</span>
                </div>
              </div>

              <button
                type="button"
                className="post-options-btn"
                aria-label="Post options"
                onClick={() => handleOpenPostOptions(post)}
              >
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Post Media Preview */}
            {post.image && (
              <div
                className="comm-post-media-wrap"
                onClick={() => onSelectPost(post)}
              >
                <img src={post.image} alt="Post media" className="comm-post-img" />
              </div>
            )}

            {/* Post Caption & Content */}
            <div className="comm-post-content" onClick={() => onSelectPost(post)}>
              <p className="comm-post-caption">{post.caption}</p>

              {post.macros && (
                <div className="comm-post-macros-pill">
                  <Flame size={13} className="macro-fire-icon" />
                  <span>
                    <strong>{post.macros.calories} kcal</strong> • {post.macros.protein}g protein
                  </span>
                </div>
              )}
            </div>

            {/* Post Actions Bar (Likes, Comments, Bookmark) */}
            <div className="comm-post-actions-bar">
              <div className="actions-left-group">
                <button
                  type="button"
                  className={`comm-action-btn ${post.isLiked ? 'liked' : ''}`}
                  onClick={() => onToggleLike(post.id)}
                  aria-label="Like post"
                >
                  <Heart
                    size={18}
                    fill={post.isLiked ? '#EF4444' : 'none'}
                    color={post.isLiked ? '#EF4444' : '#64748B'}
                  />
                  <span className="action-count">{post.likesCount}</span>
                </button>

                <button
                  type="button"
                  className="comm-action-btn"
                  onClick={() => onSelectPost(post)}
                  aria-label="Comments"
                >
                  <MessageCircle size={18} color="#64748B" />
                  <span className="action-count">{post.comments ? post.comments.length : 0}</span>
                </button>
              </div>

              <button
                type="button"
                className={`comm-action-btn ${post.isBookmarked ? 'bookmarked' : ''}`}
                onClick={() => onToggleBookmark(post.id)}
                aria-label="Bookmark post"
              >
                <Bookmark
                  size={18}
                  fill={post.isBookmarked ? '#0F172A' : 'none'}
                  color={post.isBookmarked ? '#0F172A' : '#64748B'}
                />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default CommunityMainView;
