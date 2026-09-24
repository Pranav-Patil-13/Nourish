import React, { useState } from 'react';
import {
  Plus,
  X,
  Check,
  CalendarCheck,
  Minus,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { useMeals } from '../../context/useMeals';
import { useBackHandler } from '../../context/BackNavigationContext';
import { BottomNavBar } from '../DashboardScreen/BottomNavBar';
import { PortionModal } from './PortionModal';
import { AddFoodModal } from './AddFoodModal';
import leavesImg from '../../assets/leaves.png';
import breakfastImg from '../../assets/bowl_salad.png';
import lunchImg from '../../assets/scanner_food_plate.jpg';
import dinnerImg from '../../assets/food_steak.jpg';
import snacksImg from '../../assets/food_smoothie.jpg';
import './DiaryScreen.css';


const MEAL_CATEGORIES = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    time: '8:00 AM',
    image: breakfastImg
  },
  {
    id: 'lunch',
    title: 'Lunch',
    time: '1:00 PM',
    image: lunchImg
  },
  {
    id: 'dinner',
    title: 'Dinner',
    time: '8:00 PM',
    image: dinnerImg
  },
  {
    id: 'snacks',
    title: 'Snacks',
    time: '4:30 PM',
    image: snacksImg
  }
];

export function DiaryScreen({ _onBack, onOpenScanner, onSelectTab }) {
  const {
    meals,
    addMeal,
    updateMealPortion,
    deleteMeal,
    waterIntake,
    waterGoal,
    addWater
  } = useMeals();

  // Timeframe Tab State ('day' | 'week' | 'month')
  const [timeframe, setTimeframe] = useState('day');

  // Portion Modal State
  const [portionMeal, setPortionMeal] = useState(null);
  const [portionCategory, setPortionCategory] = useState(null);

  // Custom Water Modal State
  const [isCustomWaterOpen, setIsCustomWaterOpen] = useState(false);
  const [customWaterAmount, setCustomWaterAmount] = useState(250);

  // Add Food Modal State
  const [modalCategory, setModalCategory] = useState(null);

  const openPortionModal = (category, item) => {
    setPortionCategory(category);
    setPortionMeal(item);
  };

  const closePortionModal = () => {
    setPortionMeal(null);
    setPortionCategory(null);
  };

  const openAddModal = (categoryId) => {
    setModalCategory(categoryId);
  };

  const closeAddModal = () => {
    setModalCategory(null);
  };

  // Register Native Back Handler for Diary modals (portion, custom water, add food)
  useBackHandler(() => {
    if (portionMeal) {
      closePortionModal();
      return true;
    }
    if (isCustomWaterOpen) {
      setIsCustomWaterOpen(false);
      return true;
    }
    if (modalCategory) {
      closeAddModal();
      return true;
    }
    return false;
  }, true, 10);

  const waterPercent = Math.min(100, Math.round((waterIntake / waterGoal) * 100));

  return (
    <div className="diary-screen">
      {/* 1. Planner Header */}
      <header className="planner-header-container">
        {/* Frosted Leaf Background Layer */}
        <div className="planner-header-leaf-wrap" aria-hidden="true">
          <img src={leavesImg} className="planner-header-leaf-img" alt="" />
          <div className="planner-header-leaf-frost" />
        </div>

        {/* Title Row */}
        <div className="planner-title-row">
          <h1 className="planner-title-text">Planner</h1>

          <button
            type="button"
            className="planner-calendar-btn"
            aria-label="Calendar view"
            title="Select date"
          >
            <CalendarCheck size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Segmented Timeframe Switcher (Day | Week | Month) */}
        <div className="planner-segmented-switcher" role="tablist">
          <button
            type="button"
            className={`planner-segment-pill ${timeframe === 'day' ? 'active' : ''}`}
            onClick={() => setTimeframe('day')}
            role="tab"
            aria-selected={timeframe === 'day'}
          >
            Day
          </button>
          <span className="planner-segment-divider" aria-hidden="true" />
          <button
            type="button"
            className={`planner-segment-pill ${timeframe === 'week' ? 'active' : ''}`}
            onClick={() => setTimeframe('week')}
            role="tab"
            aria-selected={timeframe === 'week'}
          >
            Week
          </button>
          <span className="planner-segment-divider" aria-hidden="true" />
          <button
            type="button"
            className={`planner-segment-pill ${timeframe === 'month' ? 'active' : ''}`}
            onClick={() => setTimeframe('month')}
            role="tab"
            aria-selected={timeframe === 'month'}
          >
            Month
          </button>
        </div>
      </header>

      {/* 2. Scrollable Body Content */}
      <div className="diary-scrollable-content">
        {/* Interactive Water Tracker Card (Redesigned) */}
        <section className="diary-water-card">
          {/* Header Row: Droplet + Title + Stat + Quick '+' */}
          <div className="water-card-top-row">
            <div className="water-header-left">
              <div className="water-droplet-avatar">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0091FF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <div className="water-title-meta">
                <h2 className="water-card-title">Water</h2>
                <div className="water-stat-display">
                  <span className="water-stat-curr">{(waterIntake / 1000).toFixed(1)}</span>
                  <span className="water-stat-divider">/</span>
                  <span className="water-stat-goal">{(waterGoal / 1000).toFixed(0)} L</span>
                </div>
              </div>
            </div>

            <div className="water-header-right">
              <button
                type="button"
                className="water-settings-btn"
                onClick={() => setIsCustomWaterOpen(true)}
                aria-label="Water settings"
                title="Water Settings & Custom Log"
              >
                <Settings size={18} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Liquid Progress Bar */}
          <div className="water-progress-track">
            <div
              className="water-progress-fill"
              style={{ width: `${waterPercent}%` }}
            />
          </div>

          {/* Subtext info row under progress bar */}
          <div className="water-progress-labels">
            <span className="water-label-complete">{waterPercent}% complete</span>
            <span className="water-label-remaining">
              {Math.max(0, (waterGoal - waterIntake) / 1000).toFixed(1)} L left
            </span>
          </div>

          {/* Minimal Plus & Minus Action Buttons */}
          <div className="water-presets-grid">
            <button
              type="button"
              className="water-preset-btn minimal-minus"
              onClick={() => addWater(-500)}
              title="Subtract 0.5L"
            >
              <Minus size={15} strokeWidth={2.4} />
              <span>0.5 L</span>
            </button>

            <button
              type="button"
              className="water-preset-btn minimal-plus"
              onClick={() => addWater(500)}
              title="Add 0.5L"
            >
              <Plus size={15} strokeWidth={2.4} />
              <span>0.5 L</span>
            </button>

            <button
              type="button"
              className="water-preset-btn minimal-plus"
              onClick={() => addWater(1000)}
              title="Add 1L"
            >
              <Plus size={15} strokeWidth={2.4} />
              <span>1 L</span>
            </button>
          </div>
        </section>

        {/* Custom Water Dialog Sheet */}
        {isCustomWaterOpen && (
          <div
            className="water-custom-modal-backdrop"
            onClick={() => setIsCustomWaterOpen(false)}
          >
            <div
              className="water-custom-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="water-custom-header">
                <h3 className="water-custom-title">Log Water</h3>
                <button
                  type="button"
                  className="water-custom-close-btn"
                  onClick={() => setIsCustomWaterOpen(false)}
                  aria-label="Close dialog"
                >
                  <X size={18} strokeWidth={2} />
                </button>
              </div>

              <div className="water-custom-stepper-row">
                <button
                  type="button"
                  className="water-stepper-btn"
                  onClick={() => setCustomWaterAmount((prev) => Math.max(50, prev - 50))}
                >
                  <Minus size={18} strokeWidth={2.4} />
                </button>
                <div className="water-stepper-val-box">
                  <span className="water-stepper-num">{customWaterAmount}</span>
                  <span className="water-stepper-unit">mL ({((customWaterAmount / 1000)).toFixed(2)} L)</span>
                </div>
                <button
                  type="button"
                  className="water-stepper-btn"
                  onClick={() => setCustomWaterAmount((prev) => Math.min(2000, prev + 50))}
                >
                  <Plus size={18} strokeWidth={2.4} />
                </button>
              </div>

              <div className="water-quick-chips-row">
                {[150, 250, 350, 500, 750, 1000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`water-quick-chip ${customWaterAmount === amt ? 'active' : ''}`}
                    onClick={() => setCustomWaterAmount(amt)}
                  >
                    +{amt} mL
                  </button>
                ))}
              </div>

              <div className="water-custom-actions">
                <button
                  type="button"
                  className="water-custom-undo-btn"
                  onClick={() => {
                    addWater(-customWaterAmount);
                    setIsCustomWaterOpen(false);
                  }}
                >
                  Undo {customWaterAmount} mL
                </button>
                <button
                  type="button"
                  className="water-custom-confirm-btn"
                  onClick={() => {
                    addWater(customWaterAmount);
                    setIsCustomWaterOpen(false);
                  }}
                >
                  <Check size={18} strokeWidth={2.4} />
                  <span>Add Water</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. 4 Meal Categories */}
        <div className="diary-meals-list">
          {MEAL_CATEGORIES.map((cat) => {
            const items = meals[cat.id] || [];

            return (
              <section key={cat.id} className="diary-meal-card">
                {/* Meal Card Top Row: Dish Image + Title & Time + More Options */}
                <div className="meal-card-top-row">
                  <div className="meal-dish-preview-wrap">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="meal-cover-img"
                    />
                  </div>

                  <div className="meal-title-block">
                    <h2 className="meal-card-title">{cat.title}</h2>
                    <span className="meal-card-time">{cat.time}</span>
                  </div>

                  <button
                    type="button"
                    className="meal-more-options-btn"
                    aria-label={`Options for ${cat.title}`}
                    onClick={() => openAddModal(cat.id)}
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                {/* Food Items List */}
                {items.length > 0 ? (
                  <div className="meal-items-list">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="meal-food-row"
                        onClick={() => openPortionModal(cat.id, item)}
                        role="button"
                        tabIndex={0}
                        title="Click to adjust portion size"
                      >
                        <div className="meal-food-avatar">
                          <span>{item.emoji || '🥗'}</span>
                        </div>

                        <div className="meal-food-details">
                          <h3 className="meal-food-name">{item.name}</h3>
                          <div className="meal-food-subline">
                            <span className="meal-food-serving">{item.serving || '1 serving'}</span>
                            <span className="meal-food-dot">•</span>
                            <span className="meal-food-cal-text">{item.calories} kcal</span>
                          </div>
                        </div>

                        <div className="meal-food-right">
                          <button
                            type="button"
                            className="meal-food-remove-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMeal(cat.id, item.id);
                            }}
                            aria-label={`Remove ${item.name}`}
                          >
                            <X size={14} strokeWidth={2.2} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="meal-empty-state">
                    <span>No meals logged yet</span>
                  </div>
                )}

                {/* Bottom "+ Add food" Capsule */}
                <button
                  type="button"
                  className="meal-add-food-capsule"
                  onClick={() => openAddModal(cat.id)}
                >
                  <div className="meal-add-capsule-plus">
                    <Plus size={14} strokeWidth={2.4} />
                  </div>
                  <span>Add food</span>
                </button>
              </section>
            );
          })}
        </div>
      </div>

      {/* 4. Complete 3-Screen Add Food Modal Flow */}
      {modalCategory && (
        <AddFoodModal
          category={modalCategory}
          categoryTitle={MEAL_CATEGORIES.find((c) => c.id === modalCategory)?.title || 'Meal'}
          onClose={closeAddModal}
          onAddFood={(catId, foodItem) => {
            addMeal(catId, foodItem);
          }}
          onOpenScanner={(catId) => {
            closeAddModal();
            if (onOpenScanner) onOpenScanner(catId);
          }}
        />
      )}

      {/* 5. Smart Portion & Unit Adjuster Modal */}
      <PortionModal
        isOpen={Boolean(portionMeal)}
        meal={portionMeal}
        category={portionCategory}
        onClose={closePortionModal}
        onUpdatePortion={updateMealPortion}
        onDeleteMeal={deleteMeal}
      />

      {/* 6. Scooped Bottom Navigation Bar */}
      <BottomNavBar
        activeTabId="diary"
        onSelectTab={onSelectTab}
        onOpenScanner={onOpenScanner}
      />
    </div>
  );
}

export default DiaryScreen;
