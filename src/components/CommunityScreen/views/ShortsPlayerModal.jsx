import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Check,
  Plus
} from 'lucide-react';
import { useBackHandler } from '../../../context/BackNavigationContext';

export function ShortsPlayerModal({
  shorts,
  initialIndex = 0,
  onClose,
  showToast
}) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(false);
  const [pausedSlides, setPausedSlides] = useState({});
  const [localShorts, setLocalShorts] = useState(shorts);
  const [heartBursts, setHeartBursts] = useState({});

  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const videoRefs = useRef([]);
  const lastTapMap = useRef({});

  // Register native hardware/swipe back handler
  useBackHandler(() => {
    onClose();
    return true;
  }, true, 20);

  // Set global body class for dark status bar and bottom nav transitions
  useEffect(() => {
    document.body.classList.add('shorts-view-active');

    let metaTheme = document.querySelector('meta[name="theme-color"]');
    const prevTheme = metaTheme ? metaTheme.getAttribute('content') : '#FFFFFF';
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.head.appendChild(metaTheme);
    }
    metaTheme.setAttribute('content', '#000000');

    return () => {
      document.body.classList.remove('shorts-view-active');
      if (metaTheme) {
        metaTheme.setAttribute('content', prevTheme || '#FFFFFF');
      }
    };
  }, []);

  // Setup Intersection Observer for smooth snap scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scroll to initial index instantly on open
    const targetSlide = slideRefs.current[initialIndex];
    if (targetSlide) {
      targetSlide.scrollIntoView({ behavior: 'instant', block: 'start' });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: [0.5]
      }
    );

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, [initialIndex]);

  // Manage playback of videos based on activeIndex
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeIndex) {
        if (!pausedSlides[idx]) {
          const startPlayback = () => {
            const p = video.play();
            if (p !== undefined) {
              p.catch(() => {});
            }
          };

          if (video.readyState >= 2) {
            startPlayback();
          } else {
            video.addEventListener('canplay', startPlayback, { once: true });
            video.load();
          }
        }
      } else {
        video.pause();
      }
    });
  }, [activeIndex, pausedSlides]);

  // Keyboard Up/Down navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(activeIndex + 1, localShorts.length - 1);
        slideRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = Math.max(activeIndex - 1, 0);
        slideRefs.current[prev]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, localShorts.length]);

  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    setPausedSlides((prev) => {
      const isCurrentlyPaused = !!prev[index];
      if (isCurrentlyPaused) {
        video.play().catch(() => {});
        return { ...prev, [index]: false };
      } else {
        video.pause();
        return { ...prev, [index]: true };
      }
    });
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const handleLike = (index, e) => {
    e?.stopPropagation();
    setLocalShorts((prev) =>
      prev.map((s, idx) => {
        if (idx === index) {
          const isLiked = !s.isLiked;
          return {
            ...s,
            isLiked,
            likesCount: isLiked ? s.likesCount + 1 : s.likesCount - 1
          };
        }
        return s;
      })
    );
  };

  const handleBookmark = (index, e) => {
    e?.stopPropagation();
    setLocalShorts((prev) =>
      prev.map((s, idx) => {
        if (idx === index) {
          const isBookmarked = !s.isBookmarked;
          if (showToast) {
            showToast(isBookmarked ? 'Saved short to bookmarks' : 'Removed from bookmarks');
          }
          return { ...s, isBookmarked };
        }
        return s;
      })
    );
  };

  const handleShare = (e) => {
    e?.stopPropagation();
    if (showToast) {
      showToast('Video link copied to clipboard!');
    }
  };

  const handleToggleFollow = (index, e) => {
    e?.stopPropagation();
    setLocalShorts((prev) =>
      prev.map((s, idx) => {
        if (idx === index) {
          const isFollowing = !s.author.isFollowing;
          if (showToast) {
            showToast(isFollowing ? `Following @${s.author.handle}` : `Unfollowed @${s.author.handle}`);
          }
          return {
            ...s,
            author: { ...s.author, isFollowing }
          };
        }
        return s;
      })
    );
  };

  // Double tap to like with heart burst animation
  const handleVideoAreaClick = (e, index) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    const lastTap = lastTapMap.current[index] || 0;

    if (now - lastTap < DOUBLE_TAP_DELAY) {
      // Double tap detected
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setHeartBursts((prev) => ({
        ...prev,
        [index]: { show: true, x, y }
      }));

      setTimeout(() => {
        setHeartBursts((prev) => ({
          ...prev,
          [index]: { ...prev[index], show: false }
        }));
      }, 850);

      const targetShort = localShorts[index];
      if (targetShort && !targetShort.isLiked) {
        handleLike(index, e);
      }
    } else {
      // Single tap toggle play/pause
      togglePlay(index);
    }
    lastTapMap.current[index] = now;
  };

  return (
    <div className="shorts-player-overlay" role="dialog" aria-modal="true">
      <div className="shorts-player-viewport">
        {/* Sticky Top Bar Controls */}
        <div className="shorts-top-bar">
          <button
            type="button"
            className="shorts-top-btn"
            onClick={onClose}
            aria-label="Close short viewer"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            className="shorts-top-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>

        {/* Vertical Snap-Scroll Container */}
        <div className="shorts-scroll-container" ref={containerRef}>
          {localShorts.map((short, index) => {
            const isPaused = !!pausedSlides[index];
            const heartBurst = heartBursts[index];

            return (
              <div
                key={short.id || index}
                data-index={index}
                ref={(el) => (slideRefs.current[index] = el)}
                className="shorts-slide-item"
              >
                {/* Video Layer */}
                <div
                  className="shorts-video-container"
                  onClick={(e) => handleVideoAreaClick(e, index)}
                >
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={short.videoUrl}
                    playsInline
                    webkit-playsinline="true"
                    loop
                    muted={isMuted}
                    preload="auto"
                    className="shorts-video-element"
                  />

                  {/* Bottom-to-Up Dark Gradient Overlay */}
                  <div className="shorts-bottom-gradient-overlay" />

                  {/* Double Tap Heart Burst Animation */}
                  {heartBurst?.show && (
                    <div
                      className="shorts-heart-burst"
                      style={{ left: `${heartBurst.x}%`, top: `${heartBurst.y}%` }}
                    >
                      <Heart size={80} className="shorts-heart-burst-icon" />
                    </div>
                  )}

                  {/* Play/Pause Indicator on tap */}
                  {isPaused && (
                    <div className="shorts-pause-badge">
                      <Play size={36} fill="#FFFFFF" />
                    </div>
                  )}
                </div>

                {/* Right Floating Actions Sidebar */}
                <div className="shorts-actions-sidebar">
                  {/* Like Button */}
                  <button
                    type="button"
                    className={`shorts-action-btn ${short.isLiked ? 'liked' : ''}`}
                    onClick={(e) => handleLike(index, e)}
                    aria-label="Like short"
                  >
                    <div className="shorts-action-icon-circle">
                      <Heart
                        size={22}
                        className={`shorts-heart-icon ${short.isLiked ? 'active' : ''}`}
                      />
                    </div>
                    <span className="shorts-action-count">{short.likesCount}</span>
                  </button>

                  {/* Comments Button */}
                  <button
                    type="button"
                    className="shorts-action-btn"
                    onClick={() => showToast && showToast(`${short.commentsCount} comments`)}
                    aria-label="View comments"
                  >
                    <div className="shorts-action-icon-circle">
                      <MessageCircle size={22} />
                    </div>
                    <span className="shorts-action-count">{short.commentsCount}</span>
                  </button>

                  {/* Bookmark / Save */}
                  <button
                    type="button"
                    className={`shorts-action-btn ${short.isBookmarked ? 'bookmarked' : ''}`}
                    onClick={(e) => handleBookmark(index, e)}
                    aria-label="Save short"
                  >
                    <div className="shorts-action-icon-circle">
                      <Bookmark size={22} className={short.isBookmarked ? 'active' : ''} />
                    </div>
                  </button>

                  {/* Share */}
                  <button
                    type="button"
                    className="shorts-action-btn"
                    onClick={handleShare}
                    aria-label="Share short"
                  >
                    <div className="shorts-action-icon-circle">
                      <Share2 size={22} />
                    </div>
                  </button>
                </div>

                {/* Bottom Author Info & Title */}
                <div className="shorts-bottom-meta">
                  <div className="shorts-author-info-row">
                    <img
                      src={short.author.avatar}
                      alt={short.author.name}
                      className="shorts-bottom-author-avatar"
                    />
                    <span className="shorts-author-handle">@{short.author.handle}</span>
                    <button
                      type="button"
                      className={`shorts-bottom-follow-btn ${short.author.isFollowing ? 'following' : ''}`}
                      onClick={(e) => handleToggleFollow(index, e)}
                      aria-label={short.author.isFollowing ? 'Unfollow' : 'Follow'}
                    >
                      {short.author.isFollowing ? (
                        <>
                          <Check size={11} strokeWidth={3} />
                          <span>Following</span>
                        </>
                      ) : (
                        <>
                          <Plus size={11} strokeWidth={3} />
                          <span>Follow</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h2 className="shorts-meta-title">{short.title}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
