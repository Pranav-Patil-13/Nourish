import React, { useState } from 'react';
import { LayoutList, LayoutGrid } from 'lucide-react';
import foodNoodles from '../../assets/food_noodles.jpg';
import foodBurger from '../../assets/food_burger.jpg';
import foodSalmon from '../../assets/food_salmon.jpg';
import foodSmoothie from '../../assets/food_smoothie.jpg';
import foodPancake from '../../assets/food_pancake.jpg';
import foodSteak from '../../assets/food_steak.jpg';
import './TodayActivity.css';

const ACTIVITY_MEALS = [
  {
    id: 'meal-1',
    name: 'Noodles',
    time: '11:32 pm',
    calories: '+ 45 Calories',
    image: foodNoodles,
    macros: [
      { id: 'protein', label: 'Proteins', value: '152g' },
      { id: 'carbs', label: 'Carbs', value: '125g' },
      { id: 'fats', label: 'Fats', value: '125g' }
    ]
  },
  {
    id: 'meal-2',
    name: 'Cheese Burger',
    time: '10:16 am',
    calories: '+ 68 Calories',
    image: foodBurger,
    macros: [
      { id: 'protein', label: 'Proteins', value: '82g' },
      { id: 'carbs', label: 'Carbs', value: '216g' },
      { id: 'fats', label: 'Fats', value: '28g' }
    ]
  },
  {
    id: 'meal-3',
    name: 'Grilled Salmon',
    time: '07:45 pm',
    calories: '+ 52 Calories',
    image: foodSalmon,
    macros: [
      { id: 'protein', label: 'Proteins', value: '148g' },
      { id: 'carbs', label: 'Carbs', value: '38g' },
      { id: 'fats', label: 'Fats', value: '42g' }
    ]
  },
  {
    id: 'meal-4',
    name: 'Acai Smoothie',
    time: '04:20 pm',
    calories: '+ 30 Calories',
    image: foodSmoothie,
    macros: [
      { id: 'protein', label: 'Proteins', value: '45g' },
      { id: 'carbs', label: 'Carbs', value: '88g' },
      { id: 'fats', label: 'Fats', value: '12g' }
    ]
  },
  {
    id: 'meal-5',
    name: 'Protein Pancake',
    time: '08:30 am',
    calories: '+ 62 Calories',
    image: foodPancake,
    macros: [
      { id: 'protein', label: 'Proteins', value: '95g' },
      { id: 'carbs', label: 'Carbs', value: '140g' },
      { id: 'fats', label: 'Fats', value: '18g' }
    ]
  },
  {
    id: 'meal-6',
    name: 'Tenderloin Steak',
    time: '01:15 pm',
    calories: '+ 74 Calories',
    image: foodSteak,
    macros: [
      { id: 'protein', label: 'Proteins', value: '165g' },
      { id: 'carbs', label: 'Carbs', value: '22g' },
      { id: 'fats', label: 'Fats', value: '48g' }
    ]
  }
];

export function TodayActivity({ isLoading = false }) {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'

  return (
    <section className="today-activity-section" aria-label="Today's Activity">
      {/* Section Header with View Toggle */}
      <div className="activity-section-header">
        <h3 className="activity-section-title">Today's Activity</h3>

        <div className="activity-view-toggle" role="group" aria-label="View Mode">
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <LayoutList size={16} strokeWidth={2} />
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view (2 cards)"
          >
            <LayoutGrid size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Activity Cards List / 2-Column Grid */}
      <div className={`activity-cards-list view-${viewMode}`}>
        {ACTIVITY_MEALS.map((meal) => (
          <article key={meal.id} className={`activity-meal-card view-${viewMode}`}>
            {/* Food Thumbnail */}
            <div className={`activity-meal-thumb-wrapper view-${viewMode}`}>
              <img
                src={meal.image}
                alt={meal.name}
                className="activity-meal-thumb-img"
                loading="lazy"
              />
            </div>

            {/* Meal Details */}
            <div className={`activity-meal-details view-${viewMode}`}>
              {/* Top Row: Title + Timestamp */}
              <div className="activity-meal-top-row">
                <h4 className="activity-meal-name">{meal.name}</h4>
                <span className="activity-meal-time">{meal.time}</span>
              </div>

              {/* Middle Row: Calories Readout */}
              <div className="activity-meal-calories">
                {isLoading ? (
                  <span className="skeleton-shimmer skeleton-shimmer-light skeleton-activity-cal" />
                ) : (
                  meal.calories
                )}
              </div>

              {/* Bottom Row: 2-Line Macro Stats (Name on top, Number below) */}
              <div className={`activity-macro-cols view-${viewMode}`}>
                {meal.macros.map((macro) => (
                  <div key={macro.id} className="activity-macro-stat">
                    <span className="macro-stat-label">{macro.label}</span>
                    {isLoading ? (
                      <span className="skeleton-shimmer skeleton-shimmer-light skeleton-activity-macro" />
                    ) : (
                      <span className="macro-stat-value">{macro.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Section Footer: See All button moved to end of section */}
      <div className="activity-footer">
        <button className="activity-see-all-btn" type="button">
          See All
        </button>
      </div>
    </section>
  );
}

export default TodayActivity;
