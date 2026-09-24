import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { FOOD_PLANS } from '../data/subscriptionsData';

const FILTER_CATEGORIES = ['All', 'Salads', 'Meal Plans', 'Protein', 'Vegan'];

export function FoodSubscriptionsView({ onBack, onSelectPlan }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPlans = selectedCategory === 'All'
    ? FOOD_PLANS
    : FOOD_PLANS.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="sub-food-view">
      {/* Top Header */}
      <header className="sub-food-header">
        <button
          type="button"
          className="sub-back-circle-btn"
          onClick={onBack}
          aria-label="Back to Subscriptions"
        >
          <ArrowLeft size={19} strokeWidth={2.2} />
        </button>

        <div className="sub-food-header-text">
          <h1 className="sub-page-title">Food Subscriptions</h1>
          <p className="sub-page-subtitle">Fresh, healthy meals from trusted local partners.</p>
        </div>
      </header>

      {/* Filter Chips Horizontal Row */}
      <div className="sub-filter-chips-row" role="tablist">
        {FILTER_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              className={`sub-filter-chip ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
              role="tab"
              aria-selected={isActive}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Plan Cards List */}
      <div className="sub-food-plans-list">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="sub-food-plan-card"
            onClick={() => onSelectPlan(plan)}
            role="button"
            tabIndex={0}
          >
            {/* Dish Thumbnail */}
            <div className="sub-plan-thumb-wrap">
              <img src={plan.image} alt={plan.title} className="sub-plan-thumb-img" />
            </div>

            {/* Plan Info */}
            <div className="sub-plan-info">
              <div className="sub-plan-header-row">
                <h2 className="sub-plan-title">{plan.title}</h2>
              </div>

              <div className="sub-plan-deliveries-badge">
                <span>{plan.deliveries}</span>
              </div>

              <p className="sub-plan-desc">{plan.description}</p>

              <div className="sub-plan-price-row">
                <span className="sub-plan-price-val">₹{plan.price.toLocaleString()}</span>
                <span className="sub-plan-price-period">/ {plan.period}</span>
              </div>
            </div>

            {/* Right Action Chevron */}
            <div className="sub-plan-right-arrow">
              <ChevronRight size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodSubscriptionsView;
