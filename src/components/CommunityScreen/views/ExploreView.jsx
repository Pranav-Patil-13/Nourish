import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  TrendingUp,
  Heart,
  MessageCircle,
  Sparkles,
  Flame
} from 'lucide-react';
import foodSalmonImg from '../../../assets/food_salmon.jpg';
import foodSteakImg from '../../../assets/food_steak.jpg';
import bowlSaladImg from '../../../assets/bowl_salad.png';
import fitnessHeroImg from '../../../assets/fitness_hero_gym.jpg';

const EXPLORE_CHIPS = ['All', 'Meals', 'Workouts', 'Transformations'];

const TRENDING_TOPICS = [
  { id: 't1', title: 'High Protein', postsCount: '12.4K posts', image: foodSteakImg },
  { id: 't2', title: 'Weight Loss', postsCount: '18.6K posts', image: bowlSaladImg },
  { id: 't3', title: 'Muscle Gain', postsCount: '9.2K posts', image: fitnessHeroImg }
];

export function ExploreView({ onBack, onSelectPost, posts }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChip, setActiveChip] = useState('All');

  const filteredPosts = posts.filter((p) =>
    p.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="comm-explore-view">
      {/* Header */}
      <header className="comm-explore-header">
        <button
          type="button"
          className="sub-back-circle-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={19} strokeWidth={2.2} />
        </button>

        <div className="explore-header-text">
          <h1 className="comm-page-title">Explore</h1>
        </div>
      </header>

      {/* Search Bar */}
      <div className="comm-search-bar-wrap">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          className="comm-search-input"
          placeholder="Search meals, workouts, topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Chips Scroller */}
      <div className="comm-explore-chips-row" role="tablist">
        {EXPLORE_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            className={`comm-explore-chip ${activeChip === chip ? 'active' : ''}`}
            onClick={() => setActiveChip(chip)}
            role="tab"
            aria-selected={activeChip === chip}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="comm-explore-scrollable">
        {/* Trending Topics Section */}
        <section className="explore-section">
          <div className="explore-section-title-row">
            <h2 className="explore-section-title">Trending Topics</h2>
            <TrendingUp size={15} className="trending-icon" />
          </div>

          <div className="trending-topics-grid">
            {TRENDING_TOPICS.map((topic) => (
              <div key={topic.id} className="trending-topic-card">
                <img src={topic.image} alt={topic.title} className="topic-thumb" />
                <div className="topic-overlay" />
                <div className="topic-info">
                  <span className="topic-name">{topic.title}</span>
                  <span className="topic-count">{topic.postsCount}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Posts Grid */}
        <section className="explore-section">
          <div className="explore-section-title-row">
            <h2 className="explore-section-title">Popular Posts</h2>
            <span className="see-all-link">See all</span>
          </div>

          <div className="popular-posts-2col-grid">
            {filteredPosts.map((p) => (
              <div
                key={p.id}
                className="popular-post-card"
                onClick={() => onSelectPost(p)}
              >
                <div className="popular-post-media-wrap">
                  <img src={p.image} alt="" className="popular-post-img" />
                  <div className="popular-post-gradient" />

                  <div className="popular-post-author-overlay">
                    <img src={p.author.avatar} alt="" className="pop-author-avatar" />
                    <span className="pop-author-name">{p.author.name}</span>
                  </div>
                </div>

                <div className="popular-post-meta-body">
                  <p className="popular-caption">{p.caption}</p>
                  <div className="popular-stats-row">
                    <span className="pop-stat">
                      <Heart size={12} fill="#EF4444" color="#EF4444" />
                      {p.likesCount}
                    </span>
                    <span className="pop-stat">
                      <MessageCircle size={12} />
                      {p.comments ? p.comments.length : 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ExploreView;
