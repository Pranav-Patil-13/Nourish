import React, { useState } from 'react';
import {
  ArrowLeft,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  Flame,
  Check,
  Award,
  Share2,
  Copy,
  VolumeX,
  Flag,
  CheckCircle2
} from 'lucide-react';
import userAvatarImg from '../../../assets/user_avatar.jpg';

export function PostDetailView({
  post,
  onBack,
  onSelectAuthor,
  onToggleLike,
  onToggleBookmark,
  onAddComment,
  onOpenActionSheet,
  showToast
}) {
  const [commentInput, setCommentInput] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  if (!post) return null;

  const handleSendComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(post.id, commentInput.trim());
    setCommentInput('');
  };

  const handleOpenOptions = () => {
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
            label: post.isBookmarked ? 'Remove Bookmark' : 'Bookmark Post',
            icon: Bookmark,
            onClick: () => {
              onToggleBookmark();
              showToast && showToast(post.isBookmarked ? 'Removed from saved' : 'Saved to bookmarks!');
            }
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
    <div className="comm-post-detail-view">
      {/* Top Floating Nav */}
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
          onClick={handleOpenOptions}
          aria-label="Options"
        >
          <MoreHorizontal size={18} strokeWidth={2.2} />
        </button>
      </div>

      <div className="comm-post-detail-scrollable">
        {/* Big Hero Image */}
        {post.image && (
          <div className="comm-detail-hero-media-wrap">
            <img src={post.image} alt="Post" className="comm-detail-hero-img" />
            <div className="comm-detail-hero-gradient" />
          </div>
        )}

        {/* Post Content Body */}
        <div className="comm-detail-body">
          {/* Author Bar with Follow button */}
          <div className="comm-detail-author-bar">
            <div
              className="comm-detail-author-left"
              onClick={() => onSelectAuthor(post.author)}
            >
              <div className="detail-author-avatar">
                <img src={post.author.avatar} alt={post.author.name} />
              </div>
              <div className="detail-author-meta">
                <div className="detail-name-row">
                  <h2 className="detail-author-name">{post.author.name}</h2>
                </div>
                <span className="detail-post-time">{post.timeAgo}</span>
              </div>
            </div>

            <button
              type="button"
              className={`comm-follow-btn ${isFollowing ? 'following' : ''}`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? (
                <>
                  <Check size={13} strokeWidth={3} />
                  <span>Following</span>
                </>
              ) : (
                <span>Follow</span>
              )}
            </button>
          </div>

          {/* Caption */}
          <p className="comm-detail-caption">{post.caption}</p>

          {/* Macro Breakdown Tags Grid */}
          {post.macros && (
            <div className="comm-detail-macros-grid">
              <div className="macro-stat-item cal">
                <Flame size={14} className="macro-icon" />
                <span className="macro-val">{post.macros.calories} kcal</span>
              </div>
              <div className="macro-stat-item">
                <span className="macro-label">Protein</span>
                <span className="macro-val">{post.macros.protein}g</span>
              </div>
              <div className="macro-stat-item">
                <span className="macro-label">Fat</span>
                <span className="macro-val">{post.macros.fat}g</span>
              </div>
              <div className="macro-stat-item">
                <span className="macro-label">Carbs</span>
                <span className="macro-val">{post.macros.carbs}g</span>
              </div>
            </div>
          )}

          {/* Action Stats Bar */}
          <div className="comm-detail-actions-row">
            <div className="detail-actions-left">
              <button
                type="button"
                className={`detail-action-pill ${post.isLiked ? 'liked' : ''}`}
                onClick={() => onToggleLike(post.id)}
              >
                <Heart
                  size={18}
                  fill={post.isLiked ? '#EF4444' : 'none'}
                  color={post.isLiked ? '#EF4444' : '#64748B'}
                />
                <span>{post.likesCount}</span>
              </button>

              <button type="button" className="detail-action-pill">
                <MessageCircle size={18} color="#64748B" />
                <span>{post.comments ? post.comments.length : 0}</span>
              </button>
            </div>

            <button
              type="button"
              className={`detail-bookmark-btn ${post.isBookmarked ? 'active' : ''}`}
              onClick={() => onToggleBookmark(post.id)}
            >
              <Bookmark
                size={18}
                fill={post.isBookmarked ? '#0F172A' : 'none'}
                color={post.isBookmarked ? '#0F172A' : '#64748B'}
              />
            </button>
          </div>

          {/* Comments Section */}
          <section className="comm-comments-section">
            <div className="comments-header-row">
              <h3 className="comments-title">
                Comments ({post.comments ? post.comments.length : 0})
              </h3>
              <span className="comments-filter-label">Most relevant</span>
            </div>

            <div className="comments-list">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div key={comment.id} className="comment-thread-item">
                    <div className="comment-avatar">
                      <img src={comment.avatar} alt={comment.author} />
                    </div>

                    <div className="comment-content-block">
                      <div className="comment-bubble">
                        <div className="comment-user-row">
                          <span className="comment-user-name">{comment.author}</span>
                          <span className="comment-time">{comment.timeAgo}</span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                      </div>

                      <div className="comment-meta-actions">
                        <button type="button" className="comment-reply-btn">Reply</button>
                        <button type="button" className="comment-like-btn">
                          <Heart size={12} />
                          <span>{comment.likes}</span>
                        </button>
                      </div>

                      {comment.repliesCount > 0 && (
                        <button type="button" className="view-replies-btn">
                          <span className="replies-line" aria-hidden="true" />
                          <span>View {comment.repliesCount} replies</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-comments-state">
                  <span>No comments yet. Be the first to share your thoughts!</span>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Sticky Bottom Add Comment Input */}
      <footer className="comm-sticky-comment-bar">
        <div className="comment-user-mini-avatar">
          <img src={userAvatarImg} alt="You" />
        </div>

        <form className="comment-input-form" onSubmit={handleSendComment}>
          <input
            type="text"
            className="comment-text-input"
            placeholder="Add a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            type="submit"
            className="comment-send-btn"
            disabled={!commentInput.trim()}
            aria-label="Post comment"
          >
            <Send size={15} />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default PostDetailView;
