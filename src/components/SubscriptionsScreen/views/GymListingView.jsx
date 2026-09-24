import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Search,
  Bookmark,
  Star,
  Heart,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { GYM_LISTINGS } from '../data/subscriptionsData';

export function GymListingView({ onBack, onSelectGym }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState({});

  const toggleFav = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredGyms = GYM_LISTINGS.filter((gym) =>
    gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gym.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sub-gym-listing-view">
      {/* Top Location & Search Header */}
      <header className="sub-listing-header">
        <div className="sub-listing-top-row">
          <button
            type="button"
            className="sub-back-circle-btn"
            onClick={onBack}
            aria-label="Back"
          >
            <ArrowLeft size={19} strokeWidth={2.2} />
          </button>

          <div className="sub-location-pill">
            <MapPin size={15} className="location-pin-icon" />
            <span className="location-text">Nashik, Maharashtra</span>
            <ChevronDown size={14} className="location-chevron" />
          </div>

          <button
            type="button"
            className="sub-listing-icon-btn"
            aria-label="Bookmarks"
          >
            <Bookmark size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Search Bar Input */}
        <div className="sub-listing-search-bar">
          <Search size={16} className="search-bar-icon" />
          <input
            type="text"
            className="sub-search-input"
            placeholder="Search gyms, fitness clubs, studios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Dropdowns Row */}
        <div className="sub-filter-dropdowns-row">
          <button type="button" className="sub-dropdown-chip active">
            <span>Distance</span>
            <ChevronDown size={12} />
          </button>
          <button type="button" className="sub-dropdown-chip">
            <span>Rating</span>
            <ChevronDown size={12} />
          </button>
          <button type="button" className="sub-dropdown-chip">
            <span>Price</span>
            <ChevronDown size={12} />
          </button>
          <button type="button" className="sub-dropdown-chip filter-icon-chip">
            <SlidersHorizontal size={13} />
            <span>More</span>
          </button>
        </div>
      </header>

      {/* Gym Listings Stream */}
      <div className="sub-gym-cards-list">
        {filteredGyms.map((gym) => (
          <div
            key={gym.id}
            className="sub-gym-card"
            onClick={() => onSelectGym(gym)}
            role="button"
            tabIndex={0}
          >
            <div className="sub-gym-image-container">
              <img src={gym.image} alt={gym.name} className="sub-gym-cover-img" />

              {gym.isSponsored && (
                <span className="sub-gym-sponsored-badge">Sponsored</span>
              )}

              <button
                type="button"
                className="sub-gym-fav-btn"
                onClick={(e) => toggleFav(e, gym.id)}
                aria-label="Save gym"
              >
                <Heart
                  size={16}
                  strokeWidth={2.2}
                  fill={favorites[gym.id] ? '#EF4444' : 'none'}
                  color={favorites[gym.id] ? '#EF4444' : '#FFFFFF'}
                />
              </button>
            </div>

            <div className="sub-gym-details">
              <div className="sub-gym-title-row">
                <h3 className="sub-gym-name">{gym.name}</h3>
                <div className="sub-gym-rating-badge">
                  <Star size={13} fill="#F59E0B" color="#F59E0B" />
                  <span>{gym.rating}</span>
                  <span className="sub-gym-rev-count">({gym.reviewsCount})</span>
                </div>
              </div>

              <div className="sub-gym-meta-row">
                <span className="sub-gym-distance">{gym.distance}</span>
                <span className="sub-gym-dot">•</span>
                <span className="sub-gym-type">{gym.type}</span>
              </div>

              <div className="sub-gym-price-row">
                <span className="sub-gym-price-bold">{gym.priceFormatted}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GymListingView;
