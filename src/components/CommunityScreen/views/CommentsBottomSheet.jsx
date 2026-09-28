import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  Send,
  X
} from 'lucide-react';
import userAvatarImg from '../../../assets/user_avatar.jpg';
import { useBackHandler } from '../../../context/BackNavigationContext';

const QUICK_EMOJIS = ['😭', '🙌', '🔥', '👏', '😢', '😍', '😮', '😂'];

export function CommentsBottomSheet({
  post,
  onClose,
  onAddComment,
  showToast,
  isDarkTheme = false
}) {
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [expandedReplies, setExpandedReplies] = useState({});
  const [commentLikes, setCommentLikes] = useState({});
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Register native Android back handler to close bottom sheet
  useBackHandler(() => {
    onClose();
    return true;
  }, true, 25);

  // Elevate parent screen z-index over bottom navigation bar while open
  useEffect(() => {
    document.body.classList.add('comments-sheet-active');
    return () => {
      document.body.classList.remove('comments-sheet-active');
    };
  }, []);

  const comments = post?.comments || [];

  const handleToggleCommentLike = (commentId, e) => {
    e?.stopPropagation();
    setCommentLikes((prev) => {
      const current = prev[commentId] || { isLiked: false, count: 0 };
      const newLiked = !current.isLiked;
      return {
        ...prev,
        [commentId]: {
          isLiked: newLiked,
          count: newLiked ? current.count + 1 : Math.max(0, current.count - 1)
        }
      };
    });
  };

  const handleReplyClick = (comment) => {
    setReplyingTo(comment.author);
    setCommentText(`@${comment.author.replace(/\s+/g, '').toLowerCase()} `);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleEmojiClick = (emoji) => {
    setCommentText((prev) => `${prev}${emoji}`);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleExpandReplies = (commentId) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!commentText.trim()) return;

    onAddComment(post.id, commentText.trim());
    setCommentText('');
    setReplyingTo(null);

    // Scroll to top of comments list smoothly
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const placeholderAuthor = replyingTo
    ? replyingTo
    : post?.author?.name || 'author';

  return (
    <div
      className={`comm-comments-backdrop ${isDarkTheme ? 'dark-theme' : ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`comm-comments-sheet ${isDarkTheme ? 'dark-theme' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drag Handle */}
        <div className="comm-comments-handle-bar">
          <div className="comm-comments-handle" />
        </div>

        {/* Header */}
        <div className="comm-comments-header">
          <h3 className="comm-comments-title">Comments</h3>
          <button
            type="button"
            className="comm-comments-close-btn"
            onClick={onClose}
            aria-label="Close comments"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Comments List */}
        <div className="comm-comments-list" ref={listRef}>
          {comments.length === 0 ? (
            <div className="comm-comments-empty">
              <p className="empty-title">No comments yet</p>
              <p className="empty-sub">Start the conversation.</p>
            </div>
          ) : (
            comments.map((c) => {
              const likeState = commentLikes[c.id] || {
                isLiked: c.isLiked || false,
                count: c.likes || 0
              };
              const isRepliesOpen = !!expandedReplies[c.id];

              return (
                <div key={c.id} className="comm-comment-row">
                  {/* Left Avatar */}
                  <img
                    src={c.avatar || userAvatarImg}
                    alt={c.author}
                    className="comm-comment-avatar"
                  />

                  {/* Center Content */}
                  <div className="comm-comment-content">
                    <div className="comm-comment-bubble">
                      <span className="comm-comment-author">{c.author}</span>
                      <span className="comm-comment-time">{c.timeAgo || 'Just now'}</span>
                    </div>

                    <p className="comm-comment-text">{c.text}</p>

                    <div className="comm-comment-meta-actions">
                      <button
                        type="button"
                        className="comm-comment-reply-btn"
                        onClick={() => handleReplyClick(c)}
                      >
                        Reply
                      </button>
                    </div>

                    {/* Expandable Mock Replies */}
                    {c.repliesCount > 0 && (
                      <div className="comm-comment-replies-wrap">
                        <button
                          type="button"
                          className="comm-view-replies-btn"
                          onClick={() => toggleExpandReplies(c.id)}
                        >
                          <span className="comm-replies-line" />
                          <span>
                            {isRepliesOpen
                              ? 'Hide replies'
                              : `View ${c.repliesCount} more ${
                                  c.repliesCount === 1 ? 'reply' : 'replies'
                                }`}
                          </span>
                        </button>

                        {isRepliesOpen && (
                          <div className="comm-nested-replies-list">
                            <div className="comm-nested-reply-item">
                              <img
                                src={post?.author?.avatar || userAvatarImg}
                                alt="Author Reply"
                                className="comm-nested-avatar"
                              />
                              <div className="comm-nested-content">
                                <div className="comm-comment-bubble">
                                  <span className="comm-comment-author">
                                    {post?.author?.name || 'Author'}
                                  </span>
                                  <span className="comm-comment-time">1h ago</span>
                                </div>
                                <p className="comm-comment-text">
                                  Thanks for asking! Yes, a tiny drizzle of raw honey works wonders. 🍯
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Like Button & Counter */}
                  <div className="comm-comment-like-col">
                    <button
                      type="button"
                      className={`comm-comment-heart-btn ${likeState.isLiked ? 'liked' : ''}`}
                      onClick={(e) => handleToggleCommentLike(c.id, e)}
                      aria-label="Like comment"
                    >
                      <Heart
                        size={14}
                        fill={likeState.isLiked ? '#EF4444' : 'none'}
                        color={likeState.isLiked ? '#EF4444' : '#94A3B8'}
                      />
                    </button>
                    {likeState.count > 0 && (
                      <span className="comm-comment-like-count">{likeState.count}</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Emoji Bar */}
        <div className="comm-quick-emoji-bar">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              className="comm-emoji-pill"
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Bottom Input Box */}
        <form className="comm-comment-input-form" onSubmit={handleSubmit}>
          <img
            src={userAvatarImg}
            alt="Current User"
            className="comm-input-user-avatar"
          />

          <div className="comm-input-field-wrap">
            <input
              ref={inputRef}
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={`Add a comment for ${placeholderAuthor}...`}
              className="comm-comment-text-input"
            />

            {commentText.trim() && (
              <button
                type="submit"
                className="comm-comment-send-btn active"
                aria-label="Send comment"
              >
                <Send size={15} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentsBottomSheet;
