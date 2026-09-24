import React from 'react';
import planBg from '../../assets/plan_bg.png';
import { useBackHandler } from '../../context/BackNavigationContext';
import { Flame, BicepsFlexed, Wheat, Droplet, ChevronRight, ArrowRight } from 'lucide-react';
import './OnboardingPlanView.css';

// Custom Avocado SVG for Fat target
const AvocadoIcon = ({ size = 20, color = '#5C8C1E' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2C8.5 2 6 6 6 12a6 6 0 0 0 12 0c0-6-2.5-10-6-10z" />
    <circle cx="12" cy="13" r="3" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
  </svg>
);

export function OnboardingPlanView({ onBack, onNext }) {
  // Register Native Back Handler to go back to Step 3
  useBackHandler(() => {
    if (onBack) {
      onBack();
      return true;
    }
    return false;
  }, true, 20);

  const planMetrics = [
    {
      id: 'calories',
      label: 'Calories',
      value: '2,200 kcal',
      badgeBg: '#FEE8D8',
      iconColor: '#E26829',
      icon: <Flame size={22} color="#E26829" fill="#E26829" fillOpacity="0.15" strokeWidth={2.2} />,
    },
    {
      id: 'protein',
      label: 'Protein',
      value: '120g',
      badgeBg: '#FCE0DF',
      iconColor: '#D9534F',
      icon: <BicepsFlexed size={22} color="#D9534F" strokeWidth={2.2} />,
    },
    {
      id: 'carbs',
      label: 'Carbs',
      value: '250g',
      badgeBg: '#FEF3D6',
      iconColor: '#C9971D',
      icon: <Wheat size={22} color="#C9971D" strokeWidth={2.2} />,
    },
    {
      id: 'fat',
      label: 'Fat',
      value: '70g',
      badgeBg: '#E2F3CE',
      iconColor: '#5C8C1E',
      icon: <AvocadoIcon size={22} color="#5C8C1E" />,
    },
    {
      id: 'water',
      label: 'Water',
      value: '3.0L',
      badgeBg: '#D8F0FE',
      iconColor: '#2B96D6',
      icon: <Droplet size={22} color="#2B96D6" fill="#2B96D6" fillOpacity="0.18" strokeWidth={2.2} />,
    },
  ];

  return (
    <div className="onboarding-plan-screen">
      {/* Background Graphic with Vignette */}
      <div className="onboarding-plan-bg-wrap">
        <img
          src={planBg}
          alt="Plan Background"
          className="onboarding-plan-bg-img"
        />
        <div className="onboarding-plan-bg-gradient" />
      </div>

      {/* Main Content Area */}
      <div className="onboarding-plan-content">
        {/* Top Progress Row: 4 segments with 04 / 07 */}
        <div className="onboarding-top-bar">
          <div className="onboarding-progress-segments">
            <div className="progress-seg active" />
            <div className="progress-seg active" />
            <div className="progress-seg active" />
            <div className="progress-seg active current-seg" />
          </div>
          <span className="onboarding-step-counter">04 / 07</span>
        </div>

        {/* Headline & Subtitle */}
        <header className="onboarding-plan-header">
          <h1 className="onboarding-plan-title">
            <span className="title-dark">Your</span>
            <span className="title-light">daily plan.</span>
          </h1>
          <p className="onboarding-plan-subtitle">
            Based on your details, here are<br />
            your recommended daily targets.
          </p>
          <p className="onboarding-plan-note">
            You can change these anytime.
          </p>
        </header>

        {/* 5 Daily Target Metric Cards */}
        <div className="plan-metrics-list">
          {planMetrics.map((item, index) => (
            <div
              key={item.id}
              className="plan-metric-card"
              style={{ animationDelay: `${0.14 + index * 0.06}s` }}
            >
              <div
                className="metric-icon-badge"
                style={{ backgroundColor: item.badgeBg }}
              >
                {item.icon}
              </div>
              <div className="metric-info">
                <span className="metric-label">{item.label}</span>
                <span className="metric-value">{item.value}</span>
              </div>
              <ChevronRight size={20} className="metric-chevron" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Floating Action Bar with Green Gradient Continue Button */}
      <div className="onboarding-plan-bottom-bar-wrap">
        <div className="onboarding-plan-bottom-bar">
          <button
            type="button"
            className="onboarding-continue-btn"
            onClick={onNext}
            aria-label="Continue"
          >
            <span>Continue</span>
            <ArrowRight size={20} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPlanView;
