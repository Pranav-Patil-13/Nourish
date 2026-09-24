import React, { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, MoreVertical, Plus } from 'lucide-react';
import riyaOatmealImg from '../../../assets/riya_oatmeal_bowl.jpg';
import bowlSaladImg from '../../../assets/bowl_salad.png';
import foodSalmonImg from '../../../assets/food_salmon.jpg';
import foodSteakImg from '../../../assets/food_steak.jpg';
import fitnessHeroImg from '../../../assets/fitness_hero_gym.jpg';
import plateScanImg from '../../../assets/scanner_food_plate.jpg';

const MY_POSTS_DATA = [
  {
    id: 'my-1',
    category: 'Food',
    image: riyaOatmealImg,
    badge: '420 kcal',
    likes: 128,
    comments: 24,
    caption: 'Rolled oats breakfast bowl'
  },
  {
    id: 'my-2',
    category: 'Food',
    image: bowlSaladImg,
    badge: '312 kcal',
    likes: 96,
    comments: 12,
    caption: 'Fresh Mediterranean salad'
  },
  {
    id: 'my-3',
    category: 'Workouts',
    image: fitnessHeroImg,
    badge: 'Leg Day',
    likes: 145,
    comments: 18,
    caption: 'Heavy squats progression'
  },
  {
    id: 'my-4',
    category: 'Food',
    image: foodSalmonImg,
    badge: '480 kcal',
    likes: 210,
    comments: 31,
    caption: 'Grilled salmon & asparagus'
  },
  {
    id: 'my-5',
    category: 'Food',
    image: foodSteakImg,
    badge: '550 kcal',
    likes: 184,
    comments: 22,
    caption: 'High protein dinner'
  },
  {
    id: 'my-6',
    category: 'Workouts',
    image: plateScanImg,
    badge: 'Prep Meal',
    likes: 76,
    comments: 8,
    caption: 'Sunday prep batch'
  }
];

export default function MyPostsView({ onBack, onOpenCreate, onSelectPost }) {
  const [activeTab, setActiveTab] = useState('All');

  const filterTabs = [
    { label: 'All', count: 24 },
    { label: 'Food', count: 16 },
    { label: 'Workouts', count: 6 },
    { label: 'Polls', count: 2 }
  ];

  const filteredPosts = activeTab === 'All'
    ? MY_POSTS_DATA
    : MY_POSTS_DATA.filter((p) => p.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="community-subview my-posts-view">
      {/* Top Bar */}
      <div className="community-subview-header">
        <button
          type="button"
          className="comm-icon-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="comm-subview-title">My Posts</h2>
        <button
          type="button"
          className="comm-icon-btn"
          onClick={onOpenCreate}
          aria-label="Create Post"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="comm-tab-pill-bar">
        {filterTabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            className={`comm-tab-pill ${activeTab === tab.label ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* 2-Column Grid */}
      <div className="my-posts-grid">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="my-post-card"
            onClick={() => onSelectPost && onSelectPost(post)}
          >
            <div className="my-post-img-wrap">
              <img src={post.image} alt={post.caption} className="my-post-img" />
              <span className="my-post-cal-badge">{post.badge}</span>
              <div className="my-post-stats-overlay">
                <span className="my-post-stat">
                  <Heart size={13} /> {post.likes}
                </span>
                <span className="my-post-stat">
                  <MessageCircle size={13} /> {post.comments}
                </span>
              </div>
            </div>
            <div className="my-post-info">
              <span className="my-post-caption">{post.caption}</span>
              <button
                type="button"
                className="my-post-more-btn"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                aria-label="Post options"
              >
                <MoreVertical size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
