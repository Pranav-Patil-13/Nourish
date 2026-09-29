import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import analyticsBg from '../../assets/analytics_bg.png';
import { useBackHandler } from '../../context/BackNavigationContext';
import { AnalyticsSlideOverview } from './slides/AnalyticsSlideOverview';
import { AnalyticsSlideHydration } from './slides/AnalyticsSlideHydration';
import { AnalyticsSlideWeight } from './slides/AnalyticsSlideWeight';
import './AnalyticsScreen.css';

const TIME_OPTIONS = [
  { id: '7D', label: '7 Days', shortLabel: '7D' },
  { id: '30D', label: '30 Days', shortLabel: '30D' },
  { id: '90D', label: '90 Days', shortLabel: '90D' },
  { id: '1Y', label: '1 Year', shortLabel: '1Y' }
];

const TOTAL_SLIDES = 3;

export function AnalyticsScreen({ onBack }) {
  const [timeRange, setTimeRange] = useState('7D');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Support device back button:
  // 1. Close dropdown if open
  // 2. Step back to previous slide if slide > 0
  // 3. Exit back to Dashboard if on first slide
  useBackHandler(() => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
      return true;
    }
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      return true;
    }
    if (onBack) {
      onBack();
      return true;
    }
    return false;
  }, true, 10);

  const currentOption = TIME_OPTIONS.find((opt) => opt.id === timeRange) || TIME_OPTIONS[0];

  const handleLeftNav = () => {
    if (currentSlide === 0) {
      if (onBack) onBack();
    } else {
      setCurrentSlide((prev) => Math.max(0, prev - 1));
    }
  };

  const handleRightNav = () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  return (
    <div className="analytics-screen-container">
      {/* Full-Bleed Background Image */}
      <img
        src={analyticsBg}
        alt="Analytics Background"
        className="analytics-full-bg-img"
      />

      {/* Analytics Custom Header */}
      <header className="analytics-top-header">
        <div className="analytics-header-titles">
          <span className="analytics-category-tag">ANALYTICS</span>
          <h1 className="analytics-main-title">Your Progress</h1>
        </div>

        {/* Compact Dropdown Time Range Selector */}
        <div className="analytics-dropdown-container" ref={dropdownRef}>
          <button
            type="button"
            className={`analytics-dropdown-trigger ${isDropdownOpen ? 'active' : ''}`}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
            aria-label={`Time range: ${currentOption.label}`}
          >
            <span className="analytics-dropdown-current-label">{currentOption.shortLabel}</span>
            <ChevronDown
              size={14}
              className={`analytics-dropdown-chevron ${isDropdownOpen ? 'open' : ''}`}
            />
          </button>

          {/* Floating Glassmorphic Dropdown Menu */}
          {isDropdownOpen && (
            <div className="analytics-dropdown-menu" role="listbox">
              {TIME_OPTIONS.map((opt) => {
                const isSelected = timeRange === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`analytics-dropdown-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      setTimeRange(opt.id);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <span className="analytics-dropdown-item-label">{opt.label}</span>
                    {isSelected && (
                      <Check size={14} className="analytics-dropdown-check-icon" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area (Carousel Slides Viewport) */}
      <main className="analytics-carousel-viewport">
        {currentSlide === 0 && (
          <AnalyticsSlideOverview onNavigateSlide={(slideIndex) => setCurrentSlide(slideIndex)} />
        )}
        {currentSlide === 1 && (
          <AnalyticsSlideHydration onNavigateSlide={(slideIndex) => setCurrentSlide(slideIndex)} />
        )}
        {currentSlide === 2 && (
          <AnalyticsSlideWeight onNavigateSlide={(slideIndex) => setCurrentSlide(slideIndex)} />
        )}
      </main>

      {/* Carousel Navigation Footer */}
      <footer className="analytics-carousel-footer">
        {/* Left Action Button: Exit (Slide 0) or Back (Slide 1+) */}
        <button
          type="button"
          className="analytics-nav-pill-btn analytics-nav-left-btn"
          onClick={handleLeftNav}
          aria-label={currentSlide === 0 ? 'Exit Analytics' : 'Previous slide'}
        >
          <ArrowLeft size={16} className="analytics-nav-icon" />
          <span className="analytics-nav-btn-text">
            {currentSlide === 0 ? 'Exit' : 'Back'}
          </span>
        </button>

        {/* Center Pagination Dots */}
        <div
          className="analytics-pagination-dots"
          role="tablist"
          aria-label="Carousel pagination"
        >
          {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => {
            const isActive = currentSlide === idx;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Slide ${idx + 1} of ${TOTAL_SLIDES}`}
                className={`analytics-page-dot ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              />
            );
          })}
        </div>

        {/* Right Action Button: Next */}
        <button
          type="button"
          className={`analytics-nav-pill-btn analytics-nav-right-btn ${
            currentSlide === TOTAL_SLIDES - 1 ? 'disabled-end' : ''
          }`}
          onClick={handleRightNav}
          disabled={currentSlide === TOTAL_SLIDES - 1}
          aria-label="Next slide"
        >
          <span className="analytics-nav-btn-text">Next</span>
          <ArrowRight size={16} className="analytics-nav-icon" />
        </button>
      </footer>
    </div>
  );
}

export default AnalyticsScreen;
