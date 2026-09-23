import React, { useState, useRef, useEffect, useCallback } from 'react';
import calorieCardImg from '../../assets/calorie_card.png';
import hydrationCardImg from '../../assets/hydration_card.png';
import burnCardImg from '../../assets/burn_card.png';
import './MacroCard.css';

export function MacroCard({ isLoading = false }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  const isResettingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const heroCards = [
    {
      id: 'calories',
      themeClass: 'hero-theme-calories',
      label: 'Today Calories',
      consumed: '1,840',
      target: '/ 2,200 kcal',
      badgeVal: '360',
      badgeUnit: 'kcal left',
      imgSrc: calorieCardImg,
      imgAlt: 'Calories Visual'
    },
    {
      id: 'water',
      themeClass: 'hero-theme-water',
      label: 'Today Water',
      consumed: '1.8',
      target: '/ 2.5 L',
      badgeVal: '700',
      badgeUnit: 'ml left',
      imgSrc: hydrationCardImg,
      imgAlt: 'Hydration Visual'
    },
    {
      id: 'burn',
      themeClass: 'hero-theme-burn',
      label: 'Today Burn',
      consumed: '540',
      target: '/ 650 kcal',
      badgeVal: '8,420',
      badgeUnit: 'steps',
      imgSrc: burnCardImg,
      imgAlt: 'Burn Visual'
    }
  ];

  // 5 slides for infinite seamless loop: [Clone 2, Real 0, Real 1, Real 2, Clone 0]
  const slides = [
    { ...heroCards[2], slideKey: 'clone-burn-start', isClone: true, realIndex: 2 },
    { ...heroCards[0], slideKey: 'real-calories', isClone: false, realIndex: 0 },
    { ...heroCards[1], slideKey: 'real-water', isClone: false, realIndex: 1 },
    { ...heroCards[2], slideKey: 'real-burn', isClone: false, realIndex: 2 },
    { ...heroCards[0], slideKey: 'clone-calories-end', isClone: true, realIndex: 0 }
  ];

  const macros = [
    { id: 'carbs', name: 'Carbs left', remaining: '55g' },
    { id: 'protein', name: 'Protein left', remaining: '22g' },
    { id: 'fats', name: 'Fats left', remaining: '23g' },
  ];

  const [isPaused, setIsPaused] = useState(false);
  const CARD_GAP = 12;
  const currentSlideRef = useRef(1);

  // Initial mount: position at Real 0 (index 1)
  useEffect(() => {
    if (sliderRef.current) {
      const width = sliderRef.current.offsetWidth;
      sliderRef.current.scrollLeft = (width + CARD_GAP) * 1;
      currentSlideRef.current = 1;
    }
  }, []);

  // Auto-sliding Timer: 3.5s per card (allows full ~3s reading time + smooth transition)
  useEffect(() => {
    if (isPaused) return;

    const autoSlideTimer = setInterval(() => {
      if (!sliderRef.current || isResettingRef.current) return;
      const offsetWidth = sliderRef.current.offsetWidth;
      if (!offsetWidth) return;
      const stride = offsetWidth + CARD_GAP;

      const nextSlide = currentSlideRef.current + 1;
      currentSlideRef.current = nextSlide;

      sliderRef.current.scrollTo({
        left: nextSlide * stride,
        behavior: 'smooth'
      });
    }, 3500);

    return () => clearInterval(autoSlideTimer);
  }, [isPaused]);

  const handleInfiniteReset = useCallback(() => {
    if (!sliderRef.current || isResettingRef.current) return;
    const { scrollLeft, offsetWidth } = sliderRef.current;
    if (!offsetWidth) return;
    const stride = offsetWidth + CARD_GAP;

    const currentIndex = Math.round(scrollLeft / stride);

    // If at end clone (index 4 -> Clone of Calories), snap silently to real index 1
    if (currentIndex === 4) {
      isResettingRef.current = true;
      sliderRef.current.style.scrollBehavior = 'auto';
      sliderRef.current.scrollLeft = stride * 1;
      currentSlideRef.current = 1;
      sliderRef.current.style.scrollBehavior = '';
      isResettingRef.current = false;
      setActiveSlide(0);
    }
    // If at start clone (index 0 -> Clone of Burn), snap silently to real index 3
    else if (currentIndex === 0) {
      isResettingRef.current = true;
      sliderRef.current.style.scrollBehavior = 'auto';
      sliderRef.current.scrollLeft = stride * 3;
      currentSlideRef.current = 3;
      sliderRef.current.style.scrollBehavior = '';
      isResettingRef.current = false;
      setActiveSlide(2);
    } else {
      currentSlideRef.current = currentIndex;
    }
  }, []);

  const handleScroll = () => {
    if (!sliderRef.current || isResettingRef.current) return;
    const { scrollLeft, offsetWidth } = sliderRef.current;
    if (!offsetWidth) return;
    const stride = offsetWidth + CARD_GAP;

    const currentIndex = Math.round(scrollLeft / stride);
    const normalizedSlide = ((currentIndex - 1 + 3) % 3);
    setActiveSlide(normalizedSlide);

    // Wait until smooth animation has completely settled (450ms) before resetting
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      handleInfiniteReset();
    }, 450);
  };

  const scrollToSlide = (realIdx) => {
    if (!sliderRef.current) return;
    const offsetWidth = sliderRef.current.offsetWidth;
    const stride = offsetWidth + CARD_GAP;
    const targetIndex = realIdx + 1; // map 0,1,2 -> 1,2,3
    currentSlideRef.current = targetIndex;
    sliderRef.current.scrollTo({
      left: targetIndex * stride,
      behavior: 'smooth'
    });
    setActiveSlide(realIdx);
  };

  return (
    <div className="nutrition-section">
      {/* 1. Infinite Swipeable Hero Slider (Calories <-> Water <-> Burn) with 2s Auto-Slide */}
      <div
        className="hero-slider-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          className="hero-slider-track"
          ref={sliderRef}
          onScroll={handleScroll}
        >
          {slides.map((card) => (
            <div
              key={card.slideKey}
              className={`calorie-hero-card ${card.themeClass}`}
            >
              {/* Left Side: Stat Group */}
              <div className="calorie-hero-stat-group">
                <span className="calorie-hero-label">{card.label}</span>
                <div className="calorie-hero-numbers">
                  {isLoading ? (
                    <span className="skeleton-shimmer skeleton-shimmer-dark skeleton-hero-consumed" />
                  ) : (
                    <span className="calorie-hero-consumed">{card.consumed}</span>
                  )}
                  <span className="calorie-hero-target">{card.target}</span>
                </div>
                <div className="calorie-hero-badge">
                  {isLoading ? (
                    <span className="skeleton-shimmer skeleton-shimmer-dark skeleton-hero-badge" />
                  ) : (
                    <span className="calorie-hero-remaining">{card.badgeVal}</span>
                  )}
                  <span className="calorie-hero-remaining-unit">{card.badgeUnit}</span>
                </div>
              </div>

              {/* Right Side: Image Slot */}
              <div className="calorie-card-img-wrapper">
                {card.imgSrc ? (
                  <img
                    src={card.imgSrc}
                    alt={card.imgAlt}
                    className={`calorie-card-img card-img-${card.id}`}
                  />
                ) : (
                  <div className="card-img-placeholder" aria-hidden="true" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Subtle 3-Dot Pagination Indicator */}
        <div className="hero-slider-dots" aria-label="Slider navigation">
          {heroCards.map((_, idx) => (
            <button
              key={idx}
              className={`hero-slider-dot ${activeSlide === idx ? 'active' : ''}`}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. 3 Separate Macro Cards in a Grid */}
      <div className="macros-grid-row">
        {macros.map((macro) => (
          <div key={macro.id} className="macro-card-tile">
            {isLoading ? (
              <span className="skeleton-shimmer skeleton-shimmer-light skeleton-macro-val" />
            ) : (
              <span className="macro-tile-val">{macro.remaining}</span>
            )}
            <span className="macro-tile-label">{macro.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MacroCard;
