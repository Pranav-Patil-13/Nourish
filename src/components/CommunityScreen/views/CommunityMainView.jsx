import React, { useState, useRef } from 'react';
import {
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  Bell,
  Settings,
  Share2,
  Copy,
  Flag,
  VolumeX,
  CheckCircle2
} from 'lucide-react';
import userAvatarImg from '../../../assets/user_avatar.jpg';
import leavesImg from '../../../assets/leaves.png';
import { CommunityShortsReel } from './CommunityShortsReel';

export function CommunityMainView({
  posts,
  onOpenCreatePost,
  onOpenCreatePoll,
  onOpenComments,
  onSelectAuthor,
  onToggleLike,
  onToggleBookmark,
  onOpenExplore,
  onOpenChallenges,
  onOpenGroups,
  onOpenNotifications,
  onOpenSettings,
  onOpenActionSheet,
  onOpenShortsModal,
  showToast
}) {
  const [heartPops, setHeartPops] = useState({});
  const lastTapRef = useRef({});

  const handleMediaTap = (postId) => {
    const now = Date.now();
    const lastTap = lastTapRef.current[postId] || 0;
    if (now - lastTap < 350) {
      // Double tap detected!
      setHeartPops((prev) => ({ ...prev, [postId]: true }));
      setTimeout(() => {
        setHeartPops((prev) => ({ ...prev, [postId]: false }));
      }, 800);

      const targetPost = posts.find((p) => p.id === postId);
      if (targetPost && !targetPost.isLiked) {
        onToggleLike(postId);
      }
      lastTapRef.current[postId] = 0;
    } else {
      lastTapRef.current[postId] = now;
    }
  };

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
      <div
        className="comm-composer-card"
        onClick={() => onOpenCreatePost('text')}
        role="button"
        tabIndex={0}
      >
        <div className="comm-composer-top-row">
          <div className="comm-composer-avatar">
            <img src={userAvatarImg} alt="You" />
          </div>
          <div className="comm-composer-input-placeholder">
            <span>What's on your mind?</span>
          </div>
        </div>
      </div>

      {/* Community Shorts Horizontal Reel */}
      <CommunityShortsReel onSelectShort={onOpenShortsModal} />

      {/* Feed Posts Stream */}
      <div className="comm-posts-stream">
        {posts.map((post, index) => (
          <React.Fragment key={post.id}>
            <article className="comm-post-card">
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

            {/* Post Media Preview with Double Tap to Like */}
            {post.image && (
              <div
                className="comm-post-media-wrap"
                onClick={() => handleMediaTap(post.id)}
              >
                <img src={post.image} alt="Post media" className="comm-post-img" />
                {heartPops[post.id] && (
                  <div className="comm-media-heart-pop">
                    <Heart size={72} fill="#EF4444" color="#FFFFFF" strokeWidth={1.5} />
                  </div>
                )}
              </div>
            )}

            {/* Post Caption & Content */}
            <div className="comm-post-content">
              <p className="comm-post-caption">{post.caption}</p>
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
                  onClick={() => onOpenComments && onOpenComments(post)}
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

          {/* Inline Feed Break: Shorts Spotlight after 2nd Post */}
          {index === 1 && (
            <CommunityShortsReel
              isInlineBreak={true}
              title="Trending Wellness Shorts"
              onSelectShort={onOpenShortsModal}
            />
          )}
        </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default CommunityMainView;
