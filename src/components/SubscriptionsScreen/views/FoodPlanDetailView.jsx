import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Leaf,
  Store,
  RotateCcw,
  Check,
  Flame,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SAMPLE_MENUS } from '../data/subscriptionsData';

export function FoodPlanDetailView({ plan, onBack, onSubscribe }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [menuWeek, setMenuWeek] = useState('thisWeek');
  const [showSampleMenu, setShowSampleMenu] = useState(true);

  if (!plan) return null;

  const sampleMenuData = SAMPLE_MENUS[plan.id] || SAMPLE_MENUS['salad-plan'];
  const activeDishes = sampleMenuData ? sampleMenuData[menuWeek] || [] : [];

  return (
    <div className="sub-food-detail-view">
      {/* Top Floating Nav Actions */}
      <div className="sub-detail-floating-nav">
        <button
          type="button"
          className="sub-detail-nav-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={18} strokeWidth={2.2} />
        </button>

        <div className="sub-detail-nav-actions">
          <button
            type="button"
            className={`sub-detail-nav-btn ${isFavorite ? 'fav-active' : ''}`}
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label="Favorite"
          >
            <Heart size={18} strokeWidth={2.2} fill={isFavorite ? '#EF4444' : 'none'} color={isFavorite ? '#EF4444' : '#18181B'} />
          </button>
        </div>
      </div>

      <div className="sub-food-detail-scrollable">
        {/* Large Hero Dish Image */}
        <div className="sub-food-hero-img-wrap">
          <img src={plan.image} alt={plan.title} className="sub-food-hero-img" />
          <div className="sub-food-hero-overlay-shadow" />
        </div>

        {/* Content Card Body */}
        <div className="sub-food-detail-body">
          {/* Plan Header Title & Price */}
          <div className="sub-detail-title-price-row">
            <div className="sub-detail-title-col">
              <h1 className="sub-detail-title">{plan.title}</h1>
              <span className="sub-detail-deliveries">{plan.deliveries}</span>
            </div>

            <div className="sub-detail-price-col">
              <span className="sub-detail-price-num">₹{plan.price.toLocaleString()}</span>
              <span className="sub-detail-price-period">/ {plan.period}</span>
            </div>
          </div>

          <p className="sub-detail-description">{plan.description}</p>

          {/* 3 Pill Feature Highlights */}
          <div className="sub-detail-features-grid">
            <div className="sub-feature-card">
              <div className="sub-feature-icon-pill">
                <Leaf size={16} className="feature-icon" />
              </div>
              <span className="sub-feature-label">Fresh Ingredients</span>
            </div>

            <div className="sub-feature-card">
              <div className="sub-feature-icon-pill">
                <Store size={16} className="feature-icon" />
              </div>
              <span className="sub-feature-label">Local Partners</span>
            </div>

            <div className="sub-feature-card">
              <div className="sub-feature-icon-pill">
                <RotateCcw size={16} className="feature-icon" />
              </div>
              <span className="sub-feature-label">Flexible Pause</span>
            </div>
          </div>

          {/* What you'll get section */}
          <section className="sub-detail-section">
            <h2 className="sub-section-heading">What you'll get</h2>
            <ul className="sub-checklist">
              {plan.highlights.map((item, idx) => (
                <li key={idx} className="sub-checklist-item">
                  <div className="sub-check-icon-circle">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span className="sub-check-text">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Sample Menu Section (Screen 04 integrated seamlessly) */}
          <section className="sub-detail-section sample-menu-section">
            <div
              className="sub-section-collapsible-header"
              onClick={() => setShowSampleMenu(!showSampleMenu)}
              role="button"
              tabIndex={0}
            >
              <div className="sample-menu-header-text">
                <h2 className="sub-section-heading">Sample Menu</h2>
                <span className="sample-menu-subtitle">Rotates weekly based on seasonality</span>
              </div>
              <button type="button" className="sub-toggle-btn" aria-label="Toggle sample menu">
                {showSampleMenu ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>

            {showSampleMenu && (
              <div className="sample-menu-content">
                {/* Week Segmented Switcher */}
                <div className="sample-week-switcher" role="tablist">
                  <button
                    type="button"
                    className={`sample-week-pill ${menuWeek === 'thisWeek' ? 'active' : ''}`}
                    onClick={() => setMenuWeek('thisWeek')}
                    role="tab"
                    aria-selected={menuWeek === 'thisWeek'}
                  >
                    This Week
                  </button>
                  <button
                    type="button"
                    className={`sample-week-pill ${menuWeek === 'nextWeek' ? 'active' : ''}`}
                    onClick={() => setMenuWeek('nextWeek')}
                    role="tab"
                    aria-selected={menuWeek === 'nextWeek'}
                  >
                    Next Week
                  </button>
                </div>

                {/* Sample Dishes List */}
                <div className="sample-dishes-list">
                  {activeDishes.map((dish) => (
                    <div key={dish.id} className="sample-dish-row">
                      <div className="sample-dish-thumb-wrap">
                        <img src={dish.image} alt={dish.title} className="sample-dish-thumb" />
                      </div>

                      <div className="sample-dish-info">
                        <h3 className="sample-dish-name">{dish.title}</h3>
                        <p className="sample-dish-desc">{dish.desc}</p>
                        <div className="sample-dish-meta">
                          <span className="sample-dish-cal">
                            <Flame size={12} className="cal-fire-icon" />
                            {dish.calories} kcal
                          </span>
                          <span className="sample-dish-dot">•</span>
                          <span className="sample-dish-protein">{dish.protein}g protein</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="sample-menu-disclaimer">
                  Menus may vary slightly by exact store location and morning harvest availability.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Sticky Bottom Subscribe Action Bar */}
      <footer className="sub-detail-sticky-bar">
        <button
          type="button"
          className="sub-primary-action-btn"
          onClick={() => onSubscribe(plan, 'food')}
        >
          <span>Subscribe Now</span>
        </button>
      </footer>
    </div>
  );
}

export default FoodPlanDetailView;
