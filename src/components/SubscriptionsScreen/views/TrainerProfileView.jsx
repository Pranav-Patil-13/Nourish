import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Star,
  MapPin,
  MessageCircle,
  Award,
  ChevronRight
} from 'lucide-react';

export function TrainerProfileView({ trainer, onBack, onBookTrainer }) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!trainer) return null;

  return (
    <div className="sub-trainer-profile-view">
      {/* Floating Back & Favorite Nav */}
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

      <div className="sub-trainer-scrollable">
        {/* Large Trainer Avatar Photo */}
        <div className="trainer-hero-img-wrap">
          <img src={trainer.image} alt={trainer.name} className="trainer-hero-img" />
          <div className="trainer-hero-gradient" />
        </div>

        <div className="trainer-body-content">
          {/* Trainer Name & Verification */}
          <div className="trainer-header-info">
            <div className="trainer-name-row">
              <h1 className="trainer-name-text">{trainer.name}</h1>
              <div className="trainer-certified-badge">
                <Award size={13} />
                <span>{trainer.title}</span>
              </div>
            </div>

            <div className="trainer-meta-row">
              <div className="trainer-rating-pill">
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                <span>{trainer.rating}</span>
                <span className="trainer-rev-count">({trainer.reviewsCount} reviews)</span>
              </div>
              <span className="trainer-dot">•</span>
              <div className="trainer-dist-pill">
                <MapPin size={13} />
                <span>{trainer.distance}</span>
              </div>
            </div>
          </div>

          {/* Specialty Tags */}
          <div className="trainer-specialties-row">
            {trainer.tags.map((tag) => (
              <span key={tag} className="trainer-tag-chip">{tag}</span>
            ))}
          </div>

          {/* About Bio */}
          <section className="trainer-section">
            <h2 className="trainer-section-title">About</h2>
            <p className="trainer-bio-text">{trainer.about}</p>
          </section>

          {/* Training Plans List */}
          <section className="trainer-section">
            <div className="trainer-plans-header">
              <h2 className="trainer-section-title">Training Plans</h2>
              <span className="trainer-see-all">See all</span>
            </div>

            <div
              className="trainer-plan-card"
              onClick={() => onBookTrainer(trainer)}
              role="button"
              tabIndex={0}
            >
              <div className="trainer-plan-avatar">
                <img src={trainer.image} alt="" />
              </div>
              <div className="trainer-plan-info">
                <h3 className="trainer-plan-title">1:1 Personal Training</h3>
                <span className="trainer-plan-price">₹{trainer.price.toLocaleString()} / month</span>
                <span className="trainer-plan-sessions">{trainer.sessionsInfo}</span>
              </div>
              <ChevronRight size={18} className="trainer-plan-chevron" />
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Sticky CTA Footer */}
      <footer className="sub-trainer-footer">
        <button
          type="button"
          className="trainer-message-btn"
          onClick={() => alert(`Direct chat with coach ${trainer.name} initiated.`)}
        >
          <MessageCircle size={18} />
          <span>Message</span>
        </button>

        <button
          type="button"
          className="trainer-book-btn"
          onClick={() => onBookTrainer(trainer)}
        >
          <span>Book Plan</span>
        </button>
      </footer>
    </div>
  );
}

export default TrainerProfileView;
