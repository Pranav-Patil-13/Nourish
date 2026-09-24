import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useBackHandler } from '../../context/BackNavigationContext';
import onboardingBg from '../../assets/onboarding_bg.png';
import looseWeightImg from '../../assets/loose_weight.png';
import buildMuscleImg from '../../assets/build_muscle.png';
import eatHealthyImg from '../../assets/eat_healthy.png';
import stayActiveImg from '../../assets/stay_active.png';
import maintainHealthImg from '../../assets/maintain_health.png';
import './OnboardingGoalView.css';

const GOAL_OPTIONS = [
  {
    id: 'lose_weight',
    titleLine1: 'Lose',
    titleLine2: 'weight',
    desc: 'Be in a healthier and fitter body.',
    image: looseWeightImg,
    isFullWidth: false
  },
  {
    id: 'build_muscle',
    titleLine1: 'Build',
    titleLine2: 'muscle',
    desc: 'Get stronger and build lean muscle.',
    image: buildMuscleImg,
    isFullWidth: false
  },
  {
    id: 'eat_healthier',
    titleLine1: 'Eat',
    titleLine2: 'healthier',
    desc: 'Make better food choices every day.',
    image: eatHealthyImg,
    isFullWidth: false
  },
  {
    id: 'stay_active',
    titleLine1: 'Stay',
    titleLine2: 'active',
    desc: 'Be more active and energetic daily.',
    image: stayActiveImg,
    isFullWidth: false
  },
  {
    id: 'maintain_health',
    titleLine1: 'Maintain',
    titleLine2: 'my health',
    desc: 'Keep a balanced and healthy lifestyle.',
    image: maintainHealthImg,
    isFullWidth: true
  }
];

export function OnboardingGoalView({ onBack, onNext }) {
  // Multi-select state: default to 'lose_weight' and 'eat_healthier' as shown in the UI reference
  const [selectedGoals, setSelectedGoals] = useState(['lose_weight', 'eat_healthier']);

  // Handle hardware / popstate back button to return to Step 1
  useBackHandler(() => {
    if (onBack) {
      onBack();
      return true;
    }
    return false;
  }, true, 20);

  const toggleGoal = (id) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <div className="onboarding-goal-screen">
      {/* Background Graphic */}
      <div className="onboarding-goal-bg-wrap" aria-hidden="true">
        <img
          src={onboardingBg}
          alt=""
          className="onboarding-goal-bg-img"
        />
        <div className="onboarding-goal-bg-gradient" />
      </div>

      {/* Main Content Scrollable Area */}
      <div className="onboarding-goal-content">
        {/* Top Progress Row */}
        <header className="onboarding-top-bar">
          <div className="onboarding-progress-segments" role="progressbar" aria-valuenow={2} aria-valuemin={1} aria-valuemax={7}>
            <div className="progress-segment active" />
            <div className="progress-segment" />
            <div className="progress-segment" />
            <div className="progress-segment" />
          </div>
          <span className="onboarding-step-counter">02 / 07</span>
        </header>

        {/* Title and Subtitle */}
        <section className="onboarding-header-group">
          <h1 className="onboarding-main-title">
            <span className="title-dark">What are you</span>
            <span className="title-light">working toward?</span>
          </h1>
          <p className="onboarding-subtitle">
            Choose one or more goals.<br />
            You can always change this later.
          </p>
        </section>

        {/* Goal Cards 2x2 Grid + 1 Full Width */}
        <section className="goal-cards-container" aria-label="Health Goals Selection">
          {GOAL_OPTIONS.map((goal) => {
            const isSelected = selectedGoals.includes(goal.id);
            return (
              <button
                key={goal.id}
                type="button"
                className={`goal-card ${goal.isFullWidth ? 'goal-card-full' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleGoal(goal.id)}
                aria-pressed={isSelected}
              >
                {/* Circular Checkbox Pill */}
                <div className={`goal-checkbox ${isSelected ? 'checked' : ''}`}>
                  {isSelected && <Check size={13} strokeWidth={3.2} />}
                </div>

                {/* Text Content */}
                <div className="goal-card-text">
                  <h3 className="goal-card-title">
                    <span>{goal.titleLine1}</span>
                    <span>{goal.titleLine2}</span>
                  </h3>
                  <p className="goal-card-desc">{goal.desc}</p>
                </div>

                {/* 3D Illustration Asset on Bottom-Right */}
                <div className="goal-card-asset-slot" aria-hidden="true">
                  <img
                    src={goal.image}
                    alt={goal.title}
                    className="goal-card-img"
                  />
                </div>
              </button>
            );
          })}
        </section>
      </div>

      {/* Bottom Floating Action Bar */}
      <footer className="onboarding-bottom-bar">
        {/* Back Circular Button */}
        <button
          type="button"
          className="onboarding-back-btn"
          onClick={onBack}
          aria-label="Previous step"
        >
          <ArrowLeft size={18} strokeWidth={2.4} />
        </button>

        {/* Next Pill Button */}
        <button
          type="button"
          className="onboarding-next-btn"
          onClick={onNext}
          aria-label="Next step"
        >
          <span>Next</span>
          <ArrowRight size={18} strokeWidth={2.4} />
        </button>
      </footer>
    </div>
  );
}

export default OnboardingGoalView;
