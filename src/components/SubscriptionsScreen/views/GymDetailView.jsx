import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  MapPin,
  Lock,
  Droplets,
  Car,
  Users,
  MessageCircle,
  Check
} from 'lucide-react';

export function GymDetailView({ gym, onBack, onSubscribe }) {
  const [activeTab, setActiveTab] = useState('about'); // 'about' | 'plans' | 'reviews' | 'photos'
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(gym?.plans?.[0]?.id || 'plan-1m');
  const [isPlanSelectionOpen, setIsPlanSelectionOpen] = useState(false);

  if (!gym) return null;

  const currentSelectedPlan = gym.plans.find((p) => p.id === selectedPlanId) || gym.plans[0];

  const handleContinueToCheckout = () => {
    onSubscribe({
      ...gym,
      selectedPlan: currentSelectedPlan,
      price: currentSelectedPlan.price,
      title: `${gym.name} - ${currentSelectedPlan.name}`
    }, 'fitness');
  };

  return (
    <div className="sub-gym-detail-view">
      {/* Top Floating Header */}
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
            className="sub-detail-nav-btn"
            aria-label="Share"
          >
            <Share2 size={18} strokeWidth={2.2} />
          </button>
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

      <div className="sub-gym-detail-scrollable">
        {/* Hero Gym Image */}
        <div className="sub-gym-hero-wrap">
          <img src={gym.image} alt={gym.name} className="sub-gym-hero-img" />
          <div className="sub-gym-hero-gradient" />
        </div>

        <div className="sub-gym-detail-body">
          {/* Title & Metadata */}
          <div className="sub-gym-primary-info">
            <h1 className="sub-gym-detail-title">{gym.name}</h1>

            <div className="sub-gym-rating-dist-row">
              <div className="gym-rating-pill">
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                <span>{gym.rating}</span>
                <span className="gym-rev-text">({gym.reviewsCount} reviews)</span>
              </div>
              <span className="gym-info-dot">•</span>
              <div className="gym-dist-pill">
                <MapPin size={13} />
                <span>{gym.distance}</span>
              </div>
            </div>

            <p className="sub-gym-category-tag">{gym.type}</p>
          </div>

          {/* Tab Navigation: About | Plans | Reviews | Photos */}
          <div className="sub-gym-segmented-tabs" role="tablist">
            {['about', 'plans', 'reviews', 'photos'].map((t) => (
              <button
                key={t}
                type="button"
                className={`sub-gym-tab-btn ${activeTab === t ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(t);
                  if (t === 'plans') setIsPlanSelectionOpen(true);
                }}
                role="tab"
                aria-selected={activeTab === t}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* TAB 1: ABOUT */}
          {activeTab === 'about' && (
            <>
              <div className="sub-gym-about-section">
                <p className="sub-gym-about-desc">{gym.about}</p>
              </div>

              {/* Amenities Grid */}
              <div className="sub-gym-amenities-section">
                <h2 className="sub-amenities-heading">Amenities & Facilities</h2>
                <div className="sub-amenities-grid">
                  <div className="sub-amenity-card">
                    <div className="amenity-icon-pill"><Lock size={18} /></div>
                    <span className="amenity-text">Changing Rooms</span>
                  </div>
                  <div className="sub-amenity-card">
                    <div className="amenity-icon-pill"><Droplets size={18} /></div>
                    <span className="amenity-text">Shower Facilities</span>
                  </div>
                  <div className="sub-amenity-card">
                    <div className="amenity-icon-pill"><Car size={18} /></div>
                    <span className="amenity-text">Parking Available</span>
                  </div>
                  <div className="sub-amenity-card">
                    <div className="amenity-icon-pill"><Users size={18} /></div>
                    <span className="amenity-text">Group Classes</span>
                  </div>
                </div>
              </div>

              {/* Membership Plans Snapshot */}
              <div className="sub-gym-plans-snapshot">
                <div className="snapshot-header-row">
                  <h2 className="sub-amenities-heading">Membership Plans</h2>
                  <button
                    type="button"
                    className="see-all-plans-link"
                    onClick={() => {
                      setActiveTab('plans');
                      setIsPlanSelectionOpen(true);
                    }}
                  >
                    See all
                  </button>
                </div>

                <div
                  className="membership-snapshot-card"
                  onClick={() => {
                    setActiveTab('plans');
                    setIsPlanSelectionOpen(true);
                  }}
                >
                  <div className="snapshot-avatar">
                    <img src={gym.image} alt="" />
                  </div>
                  <div className="snapshot-info">
                    <h3 className="snapshot-name">Monthly Membership</h3>
                    <span className="snapshot-price">₹1,499 / month</span>
                  </div>
                  <button type="button" className="snapshot-choose-btn">Choose</button>
                </div>
              </div>
            </>
          )}

          {/* TAB 2 / SCREEN 08: CHOOSE A PLAN */}
          {(activeTab === 'plans' || isPlanSelectionOpen) && (
            <div className="sub-choose-plan-flow">
              <div className="choose-plan-header">
                <h2 className="choose-plan-title">Choose a Plan</h2>
                <p className="choose-plan-sub">{gym.name}</p>
              </div>

              {/* Plans Radio Selection Grid */}
              <div className="sub-plans-radio-group">
                {gym.plans.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      className={`sub-plan-choice-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedPlanId(plan.id)}
                    >
                      <div className="plan-choice-left">
                        <div className="plan-choice-radio-circle">
                          {isSelected && <div className="plan-choice-radio-dot" />}
                        </div>
                        <div className="plan-choice-text">
                          <div className="plan-choice-name-row">
                            <h3 className="plan-choice-name">{plan.name}</h3>
                            {plan.badge && (
                              <span className="plan-badge-tag">{plan.badge}</span>
                            )}
                          </div>
                          <span className="plan-choice-price-str">{plan.priceDisplay}</span>
                          <span className="plan-choice-calc">({plan.perMonth})</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Includes checklist */}
              <div className="sub-plan-includes-box">
                <h3 className="includes-heading">Includes</h3>
                <ul className="includes-list">
                  {gym.includes.map((inc, i) => (
                    <li key={i} className="includes-item">
                      <Check size={14} className="inc-check-icon" strokeWidth={2.8} />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="sub-reviews-tab">
              <div className="review-stat-summary">
                <div className="big-rating-number">{gym.rating}</div>
                <div className="stars-cluster">
                  <Star size={16} fill="#F59E0B" color="#F59E0B" />
                  <Star size={16} fill="#F59E0B" color="#F59E0B" />
                  <Star size={16} fill="#F59E0B" color="#F59E0B" />
                  <Star size={16} fill="#F59E0B" color="#F59E0B" />
                  <Star size={16} fill="#F59E0B" color="#F59E0B" />
                </div>
                <span className="review-count-label">Based on {gym.reviewsCount} verified members</span>
              </div>
            </div>
          )}

          {/* TAB 4: PHOTOS */}
          {activeTab === 'photos' && (
            <div className="sub-photos-gallery-grid">
              <img src={gym.image} alt="Gym 1" className="gallery-photo" />
              <img src={gym.image} alt="Gym 2" className="gallery-photo" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Footer Bar */}
      <footer className="sub-gym-footer-bar">
        {activeTab === 'plans' || isPlanSelectionOpen ? (
          <button
            type="button"
            className="sub-primary-action-btn"
            onClick={handleContinueToCheckout}
          >
            <span>Continue with {currentSelectedPlan.name} • {currentSelectedPlan.priceDisplay}</span>
          </button>
        ) : (
          <div className="gym-footer-dual-actions">
            <button
              type="button"
              className="gym-message-btn"
              onClick={() => alert(`Chat with ${gym.name} support started.`)}
            >
              <MessageCircle size={17} />
              <span>Message</span>
            </button>
            <button
              type="button"
              className="gym-subscribe-btn"
              onClick={() => {
                setActiveTab('plans');
                setIsPlanSelectionOpen(true);
              }}
            >
              <span>Book / Subscribe</span>
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}

export default GymDetailView;
