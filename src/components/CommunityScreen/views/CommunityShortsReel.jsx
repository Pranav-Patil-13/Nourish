import React, { useRef } from 'react';
import { Play, Eye, ChevronRight } from 'lucide-react';
import { COMMUNITY_SHORTS } from '../data/communityShortsData';

function ShortCardItem({ short, index, onSelectShort }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0.5;
    }
  };

  return (
    <div
      className="comm-short-card"
      onClick={() => onSelectShort && onSelectShort(index)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`Play short: ${short.title}`}
    >
      {/* 9:16 Video Thumbnail Displaying 0.5s Content Frame */}
      <div className="comm-short-poster-wrap">
        <video
          ref={videoRef}
          src={`${short.videoUrl}#t=0.5`}
          preload="auto"
          playsInline
          muted
          loop
          className="comm-short-poster-video"
        />
        <div className="comm-short-overlay-gradient" />

        {/* Professional View Count Badge at Top Left */}
        <div className="comm-short-views-pill">
          <Play size={9} fill="#FFFFFF" strokeWidth={0} className="comm-short-views-icon" />
          <span className="comm-short-views-text">{short.viewsCount}</span>
        </div>

        {/* Center Play Button Overlay */}
        <div className="comm-short-play-circle">
          <Play size={16} fill="#FFFFFF" className="comm-short-play-icon" />
        </div>
      </div>

      {/* Bottom Card Content */}
      <div className="comm-short-bottom-content">
        <h3 className="comm-short-card-title">{short.title}</h3>
      </div>
    </div>
  );
}

export function CommunityShortsReel({
  shorts = COMMUNITY_SHORTS,
  title = 'Community Shorts',
  onSelectShort,
  isInlineBreak = false
}) {
  return (
    <section className={`comm-shorts-section ${isInlineBreak ? 'comm-shorts-inline-break' : ''}`}>
      {/* Section Header */}
      <div className="comm-shorts-header-row">
        <h2 className="comm-shorts-title">{title}</h2>

        <button
          type="button"
          className="comm-shorts-see-all-btn"
          onClick={() => onSelectShort && onSelectShort(0)}
          aria-label="View all shorts"
        >
          <span>Watch</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Horizontal Carousel */}
      <div className="comm-shorts-carousel" role="region" aria-label="Community Shorts Carousel">
        {shorts.map((short, index) => (
          <ShortCardItem
            key={short.id}
            short={short}
            index={index}
            onSelectShort={onSelectShort}
          />
        ))}
      </div>
    </section>
  );
}
