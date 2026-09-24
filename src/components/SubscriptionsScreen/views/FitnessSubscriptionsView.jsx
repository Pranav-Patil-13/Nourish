import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { FITNESS_CATEGORIES } from '../data/subscriptionsData';

const FITNESS_FILTER_CHIPS = ['All', 'Gyms', 'Personal Training', 'Yoga'];

export function FitnessSubscriptionsView({ onBack, onSelectCategory }) {
  const [selectedChip, setSelectedChip] = useState('All');

  return (
    <div className="sub-fitness-view">
      {/* Top Header */}
      <header className="sub-fitness-header">
        <button
          type="button"
          className="sub-back-circle-btn"
          onClick={onBack}
          aria-label="Back to Subscriptions"
        >
          <ArrowLeft size={19} strokeWidth={2.2} />
        </button>

        <div className="sub-fitness-header-text">
          <h1 className="sub-page-title">Fitness Subscriptions</h1>
          <p className="sub-page-subtitle">Gyms, trainers, classes and more.</p>
        </div>
      </header>

      {/* Filter Chips Horizontal Row */}
      <div className="sub-filter-chips-row" role="tablist">
        {FITNESS_FILTER_CHIPS.map((chip) => {
          const isActive = selectedChip === chip;
          return (
            <button
              key={chip}
              type="button"
              className={`sub-filter-chip ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedChip(chip)}
              role="tab"
              aria-selected={isActive}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* Fitness Service Types List */}
      <div className="sub-fitness-categories-list">
        {FITNESS_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="sub-fitness-cat-card"
            onClick={() => onSelectCategory(cat.id)}
            role="button"
            tabIndex={0}
          >
            <div className="sub-fitness-thumb-wrap">
              <img src={cat.image} alt={cat.title} className="sub-fitness-thumb-img" />
            </div>

            <div className="sub-fitness-info">
              <h2 className="sub-fitness-cat-title">{cat.title}</h2>
              <p className="sub-fitness-cat-sub">{cat.subtitle}</p>
              <span className="sub-fitness-price-tag">{cat.priceText}</span>
            </div>

            <div className="sub-fitness-arrow">
              <ChevronRight size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FitnessSubscriptionsView;
