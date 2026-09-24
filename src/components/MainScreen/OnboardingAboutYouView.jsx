import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, User, Minus, Plus } from 'lucide-react';
import { useBackHandler } from '../../context/BackNavigationContext';
import aboutYouBg from '../../assets/about_you_bg.png';
import './OnboardingAboutYouView.css';

export function OnboardingAboutYouView({ onBack, onNext }) {
  const [age, setAge] = useState(22);
  const [height, setHeight] = useState(183);
  const [weight, setWeight] = useState(57);
  const [gender, setGender] = useState('male');

  // Register Native Back Handler to go back to Step 2
  useBackHandler(() => {
    if (onBack) {
      onBack();
      return true;
    }
    return false;
  }, true, 20);

  const handleAdjust = (setter, min, max, delta) => {
    setter((prev) => Math.min(max, Math.max(min, prev + delta)));
  };

  return (
    <div className="onboarding-about-screen">
      {/* Background Image with Organic Lighting */}
      <div className="onboarding-about-bg-wrap" aria-hidden="true">
        <img
          src={aboutYouBg}
          alt=""
          className="onboarding-about-bg-img"
        />
        <div className="onboarding-about-bg-gradient" />
      </div>

      {/* Main Content Scrollable Area */}
      <div className="onboarding-about-content">
        {/* Top Progress Row */}
        <header className="onboarding-top-bar">
          <div className="onboarding-progress-segments" role="progressbar" aria-valuenow={3} aria-valuemin={1} aria-valuemax={7}>
            <div className="progress-segment active" />
            <div className="progress-segment active" />
            <div className="progress-segment" />
            <div className="progress-segment" />
          </div>
          <span className="onboarding-step-counter">03 / 07</span>
        </header>

        {/* Title and Subtitle */}
        <section className="onboarding-header-group">
          <h1 className="onboarding-main-title">
            <span className="title-dark">A little</span>
            <span className="title-light">about you.</span>
          </h1>
          <p className="onboarding-subtitle">
            This helps us personalize your plan<br />
            and calculate your daily targets.
          </p>
        </section>

        {/* Form Card */}
        <div className="about-form-card" role="region" aria-label="Personal Metrics Form">
          {/* 1. Age Row */}
          <div className="about-field-group">
            <label className="about-field-label" htmlFor="input-age">Age</label>
            <div className="about-field-row">
              <div className="about-input-pill">
                <Calendar size={18} className="about-input-icon" />
                <span className="about-input-value">{age}</span>
                <span className="about-input-unit">years</span>
              </div>
              <div className="about-stepper-btns">
                <button
                  type="button"
                  className="stepper-btn minus"
                  onClick={() => handleAdjust(setAge, 10, 100, -1)}
                  aria-label="Decrease age"
                >
                  <Minus size={16} strokeWidth={2.4} />
                </button>
                <button
                  type="button"
                  className="stepper-btn plus"
                  onClick={() => handleAdjust(setAge, 10, 100, 1)}
                  aria-label="Increase age"
                >
                  <Plus size={16} strokeWidth={2.4} />
                </button>
              </div>
            </div>
          </div>

          {/* 2. Height Row */}
          <div className="about-field-group">
            <label className="about-field-label" htmlFor="input-height">Height</label>
            <div className="about-field-row">
              <div className="about-input-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="about-input-icon">
                  <path d="M12 2v20" />
                  <path d="M17 5H7" />
                  <path d="M15 12H9" />
                  <path d="M17 19H7" />
                </svg>
                <span className="about-input-value">{height}</span>
                <span className="about-input-unit">cm</span>
              </div>
              <div className="about-stepper-btns">
                <button
                  type="button"
                  className="stepper-btn minus"
                  onClick={() => handleAdjust(setHeight, 80, 240, -1)}
                  aria-label="Decrease height"
                >
                  <Minus size={16} strokeWidth={2.4} />
                </button>
                <button
                  type="button"
                  className="stepper-btn plus"
                  onClick={() => handleAdjust(setHeight, 80, 240, 1)}
                  aria-label="Increase height"
                >
                  <Plus size={16} strokeWidth={2.4} />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Weight Row */}
          <div className="about-field-group">
            <label className="about-field-label" htmlFor="input-weight">Weight</label>
            <div className="about-field-row">
              <div className="about-input-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="about-input-icon">
                  <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                  <circle cx="12" cy="11" r="3" />
                  <path d="M12 11l1.5-1.5" />
                </svg>
                <span className="about-input-value">{weight}</span>
                <span className="about-input-unit">kg</span>
              </div>
              <div className="about-stepper-btns">
                <button
                  type="button"
                  className="stepper-btn minus"
                  onClick={() => handleAdjust(setWeight, 25, 250, -1)}
                  aria-label="Decrease weight"
                >
                  <Minus size={16} strokeWidth={2.4} />
                </button>
                <button
                  type="button"
                  className="stepper-btn plus"
                  onClick={() => handleAdjust(setWeight, 25, 250, 1)}
                  aria-label="Increase weight"
                >
                  <Plus size={16} strokeWidth={2.4} />
                </button>
              </div>
            </div>
          </div>

          {/* 4. Gender Row */}
          <div className="about-field-group">
            <label className="about-field-label">Gender</label>
            <div className="gender-selector-row" role="radiogroup" aria-label="Gender Selection">
              <button
                type="button"
                className={`gender-option-btn ${gender === 'male' ? 'active' : ''}`}
                onClick={() => setGender('male')}
                role="radio"
                aria-checked={gender === 'male'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="10" cy="14" r="5" />
                  <path d="M19 5l-5.4 5.4" />
                  <path d="M19 5h-5" />
                  <path d="M19 5v5" />
                </svg>
                <span>Male</span>
              </button>

              <button
                type="button"
                className={`gender-option-btn ${gender === 'female' ? 'active' : ''}`}
                onClick={() => setGender('female')}
                role="radio"
                aria-checked={gender === 'female'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="9" r="5" />
                  <path d="M12 14v7" />
                  <path d="M9 18h6" />
                </svg>
                <span>Female</span>
              </button>

              <button
                type="button"
                className={`gender-option-btn ${gender === 'other' ? 'active' : ''}`}
                onClick={() => setGender('other')}
                role="radio"
                aria-checked={gender === 'other'}
              >
                <User size={15} strokeWidth={2.4} />
                <span>Other</span>
              </button>
            </div>
          </div>
        </div>
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

export default OnboardingAboutYouView;
