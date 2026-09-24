import React from 'react';
import {
  Shield,
  ShieldCheck,
  CreditCard,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import bowlSaladImg from '../../../assets/bowl_salad.png';
import fitnessDumbbellsImg from '../../../assets/fitness_hero_gym.jpg';
import leavesImg from '../../../assets/leaves.png';

export function SubscriptionsMainView({ onNavigate }) {
  return (
    <div className="sub-main-view">
      {/* Decorative Top-Right Leaves Watermark */}
      <div className="sub-header-leaves-wrap" aria-hidden="true">
        <img src={leavesImg} alt="" className="sub-header-leaves-img" />
      </div>

      {/* Top Header */}
      <header className="sub-main-header">
        <div className="sub-header-title-block">
          <h1 className="sub-main-title">Subscriptions</h1>
          <p className="sub-main-subline">Real services. A healthier you.</p>
        </div>
      </header>

      {/* 2 Hero Feature Cards */}
      <div className="sub-hero-cards-stack">
        {/* Card 1: Healthy Food */}
        <div
          className="sub-card-healthy-food"
          onClick={() => onNavigate('food-list')}
          role="button"
          tabIndex={0}
        >
          <div className="sub-card-food-text">
            <h2 className="sub-card-food-title">Healthy Food</h2>
            <p className="sub-card-food-desc">
              Nutritious meals delivered to your door
            </p>
          </div>

          <div className="sub-card-food-img-wrap">
            <img
              src={bowlSaladImg}
              alt="Healthy Food"
              className="sub-card-food-img"
            />
          </div>

          <div className="sub-card-circle-arrow-btn">
            <ArrowRight size={16} strokeWidth={2.6} />
          </div>
        </div>

        {/* Card 2: Fitness & Training */}
        <div
          className="sub-card-fitness-training"
          onClick={() => onNavigate('fitness-list')}
          role="button"
          tabIndex={0}
        >
          <div
            className="sub-card-fitness-bg"
            style={{ backgroundImage: `url(${fitnessDumbbellsImg})` }}
          />
          <div className="sub-card-fitness-overlay" />

          <div className="sub-card-fitness-content">
            <h2 className="sub-card-fitness-title">Fitness & Training</h2>
            <p className="sub-card-fitness-desc">
              Gyms, personal trainers, classes and more.
            </p>
          </div>

          <div className="sub-card-circle-arrow-btn">
            <ArrowRight size={16} strokeWidth={2.6} />
          </div>
        </div>
      </div>

      {/* Trust Highlights Vertical List */}
      <div className="sub-trust-vertical-list">
        <div className="sub-trust-row">
          <Shield size={18} strokeWidth={1.9} className="sub-trust-icon" />
          <span className="sub-trust-text">Trusted partners</span>
        </div>

        <div className="sub-trust-row">
          <ShieldCheck size={18} strokeWidth={1.9} className="sub-trust-icon" />
          <span className="sub-trust-text">Verified & quality checked</span>
        </div>

        <div className="sub-trust-row">
          <CreditCard size={18} strokeWidth={1.9} className="sub-trust-icon" />
          <span className="sub-trust-text">Easy auto-pay</span>
        </div>

        <div className="sub-trust-row">
          <RotateCcw size={18} strokeWidth={1.9} className="sub-trust-icon" />
          <span className="sub-trust-text">Pause or cancel anytime</span>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionsMainView;

