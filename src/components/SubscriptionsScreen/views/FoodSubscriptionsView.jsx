import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Shield,
  ShieldCheck,
  CreditCard,
  RotateCcw,
  MapPin,
  Loader2,
  Check
} from 'lucide-react';
import { FOOD_PLANS, SALADO_OUTLETS } from '../data/subscriptionsData';
import { SaladOLocationModal } from './SaladOLocationModal';
import leavesImg from '../../../assets/leaves.png';

const LOADING_STEPS = [
  'Detecting location...',
  'Finding nearest kitchen...'
];

export function FoodSubscriptionsView({
  onSelectPlan,
  isLocationModalOpen: isLocationModalOpenProp,
  setIsLocationModalOpen: setIsLocationModalOpenProp
}) {
  const [selectedOutlet, setSelectedOutlet] = useState(SALADO_OUTLETS[0]);
  const [isLocating, setIsLocating] = useState(true);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [internalLocationModalOpen, setInternalLocationModalOpen] = useState(false);

  const isLocationModalOpen = isLocationModalOpenProp !== undefined ? isLocationModalOpenProp : internalLocationModalOpen;
  const setIsLocationModalOpen = setIsLocationModalOpenProp || setInternalLocationModalOpen;

  useEffect(() => {
    const stepTimer = setTimeout(() => {
      setLoadingStepIndex(1);
    }, 700);

    const doneTimer = setTimeout(() => {
      setIsLocating(false);
    }, 1400);

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div className="sub-food-view">
      {/* Decorative Top-Right Leaves Watermark */}
      <div className="sub-header-leaves-wrap" aria-hidden="true">
        <img src={leavesImg} alt="" className="sub-header-leaves-img" />
      </div>

      {/* Sleek Top Delivery Location Selector Bar */}
      <div className="sub-location-header-row">
        <button
          type="button"
          className={`sub-location-pill ${isLocating ? 'sub-location-pill-loading' : ''}`}
          onClick={() => !isLocating && setIsLocationModalOpen(true)}
          disabled={isLocating}
          aria-label={isLocating ? 'Detecting location' : 'Change delivery location'}
        >
          <div className="sub-loc-pill-left">
            {isLocating ? (
              <>
                <Loader2 size={15} className="sub-loc-spinner" />
                <span key={loadingStepIndex} className="sub-loc-text sub-loc-detecting sub-loc-detecting-anim">
                  {LOADING_STEPS[loadingStepIndex]}
                </span>
              </>
            ) : (
              <>
                <MapPin size={15} className="sub-loc-pin-icon" />
                <span className="sub-loc-text sub-loc-revealed-anim">
                  {selectedOutlet.area}, {selectedOutlet.city}
                </span>
              </>
            )}
          </div>

          <div className="sub-loc-pill-right">
            {!isLocating && <ChevronDown size={15} className="sub-loc-chevron" />}
          </div>
        </button>
      </div>

      {/* Main Header */}
      <header className="sub-food-header">
        <div className="sub-food-header-text">
          <h1 className="sub-main-title">SaladO Subscriptions</h1>
          <p className="sub-main-subline">
            Fresh chef-prepared salads & macro-balanced meals delivered to your door.
          </p>
        </div>
      </header>

      {/* 2 Curated Plan Cards */}
      <div className="sub-food-plans-list">
        {FOOD_PLANS.map((plan) => (
          <div
            key={plan.id}
            className="sub-food-plan-card"
            onClick={() => onSelectPlan({ ...plan, outlet: selectedOutlet })}
            role="button"
            tabIndex={0}
          >
            {/* Dish Thumbnail */}
            <div className="sub-plan-thumb-wrap">
              <img src={plan.image} alt={plan.title} className="sub-plan-thumb-img" />
            </div>

            {/* Plan Info */}
            <div className="sub-plan-info">
              <h2 className="sub-plan-title">{plan.title}</h2>

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

      {/* Trust Highlights Section */}
      <div className="sub-trust-vertical-list" style={{ marginTop: '16px' }}>
        <div className="sub-trust-row">
          <Shield size={18} strokeWidth={1.9} className="sub-trust-icon" />
          <span className="sub-trust-text">100% Farm-fresh organic greens harvested daily</span>
        </div>

        <div className="sub-trust-row">
          <ShieldCheck size={18} strokeWidth={1.9} className="sub-trust-icon" />
          <span className="sub-trust-text">Hygiene checked & certified by SaladO</span>
        </div>

        <div className="sub-trust-row">
          <CreditCard size={18} strokeWidth={1.9} className="sub-trust-icon" />
          <span className="sub-trust-text">Easy auto-pay via UPI & cards</span>
        </div>

        <div className="sub-trust-row">
          <RotateCcw size={18} strokeWidth={1.9} className="sub-trust-icon" />
          <span className="sub-trust-text">Pause, resume, or skip deliveries anytime</span>
        </div>
      </div>

      {/* SaladO Location & Outlet Switcher Modal */}
      {isLocationModalOpen && (
        <SaladOLocationModal
          currentOutlet={selectedOutlet}
          onSelectOutlet={(outlet) => {
            setSelectedOutlet(outlet);
          }}
          onClose={() => setIsLocationModalOpen(false)}
        />
      )}
    </div>
  );
}

export default FoodSubscriptionsView;
