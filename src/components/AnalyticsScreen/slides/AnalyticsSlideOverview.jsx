import React from 'react';
import { Flame, Dumbbell, Droplet, Scale, PieChart, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import './AnalyticsSlideOverview.css';

export function AnalyticsSlideOverview({ onNavigateSlide }) {
  // 7-Day Bar Chart Data
  const dailyCalories = [
    { day: 'Mon', value: 1850, isTargetMet: false, heightPercent: 58 },
    { day: 'Tue', value: 2120, isTargetMet: false, heightPercent: 72 },
    { day: 'Wed', value: 2310, isTargetMet: true, heightPercent: 86 },
    { day: 'Thu', value: 1980, isTargetMet: false, heightPercent: 64 },
    { day: 'Fri', value: 2260, isTargetMet: true, heightPercent: 83 },
    { day: 'Sat', value: 2410, isTargetMet: true, heightPercent: 93 },
    { day: 'Sun', value: 1890, isTargetMet: false, heightPercent: 60 }
  ];

  return (
    <div className="analytics-slide-overview">
      {/* 1. Main Hero Card: Average Calories */}
      <section className="overview-hero-card" aria-label="Average Calories Summary">
        {/* Top Header Row with Title on Left, Metric on Right */}
        <div className="hero-top-row">
          <div className="hero-icon-label-group">
            <div className="hero-flame-icon-wrap">
              <Flame size={18} className="hero-flame-icon" />
            </div>
            <span className="hero-section-label">Average Calories</span>
          </div>

          {/* Right Metric */}
          <div className="hero-big-metric">
            <span className="hero-big-number">2,143</span>
            <span className="hero-unit-label">kcal</span>
          </div>
        </div>

        {/* 7-Day Interactive Gradient Bar Chart */}
        <div className="hero-bar-chart-container">
          {/* Dashed Target Line Above Chart */}
          <div className="chart-target-line-wrap">
            <div className="target-line-tag">
              <span className="target-tag-val">2,200</span>
              <span className="target-tag-sub">target</span>
            </div>
            <div className="target-dashed-line" />
          </div>

          {/* 7 Daily Bars */}
          <div className="chart-bars-row">
            {dailyCalories.map((item) => (
              <div key={item.day} className="chart-bar-column">
                <div className="chart-bar-track">
                  <div
                    className={`chart-bar-fill ${item.isTargetMet ? 'fill-sage' : 'fill-peach'}`}
                    style={{ height: `${item.heightPercent}%` }}
                  >
                    <span className="chart-bar-inner-value">{item.value.toLocaleString()}</span>
                  </div>
                </div>
                <span className="chart-bar-day">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Growth Badge Row */}
        <div className="hero-card-bottom-row">
          <div className="hero-growth-badge">
            <ArrowUp size={12} className="hero-growth-arrow" />
            <span className="hero-growth-text">12% from last week</span>
          </div>
        </div>
      </section>

      {/* 2. Full-Width Metric Cards Stack (Clean 2-Row Layout) */}
      <section className="overview-metric-stack" aria-label="Detailed Health Metrics">
        {/* Card A: Protein */}
        <div
          className="metric-row-card"
          onClick={() => onNavigateSlide && onNavigateSlide(1)}
          role="button"
          tabIndex={0}
        >
          {/* Row 1: Header + Value */}
          <div className="card-top-row">
            <div className="card-header-left">
              <div className="metric-icon-badge protein-badge">
                <Dumbbell size={16} />
              </div>
              <span className="card-title">Protein</span>
            </div>

            <div className="card-header-right">
              <div className="card-val-group">
                <span className="card-val-num">118</span>
                <span className="card-val-unit">g</span>
              </div>
              <ChevronRight size={17} className="card-chevron-icon" />
            </div>
          </div>

          {/* Row 2: Full-width Progress Bar + Subtext */}
          <div className="card-bottom-row">
            <div className="metric-progress-track">
              <div className="metric-progress-fill protein-fill" style={{ width: '78%' }} />
            </div>
            <div className="card-subtext-row">
              <span className="card-subtext">
                <strong className="card-subtext-highlight">78% of 150g</strong> target
              </span>
              <span className="card-subtext-right">
                <strong>32g</strong> left
              </span>
            </div>
          </div>
        </div>

        {/* Card B: Water */}
        <div
          className="metric-row-card"
          onClick={() => onNavigateSlide && onNavigateSlide(3)}
          role="button"
          tabIndex={0}
        >
          {/* Row 1: Header + Value */}
          <div className="card-top-row">
            <div className="card-header-left">
              <div className="metric-icon-badge water-badge">
                <Droplet size={16} />
              </div>
              <span className="card-title">Water</span>
            </div>

            <div className="card-header-right">
              <div className="card-val-group">
                <span className="card-val-num">2.1</span>
                <span className="card-val-unit">L</span>
              </div>
              <ChevronRight size={17} className="card-chevron-icon" />
            </div>
          </div>

          {/* Row 2: Full-width Progress Bar + Subtext */}
          <div className="card-bottom-row">
            <div className="metric-progress-track">
              <div className="metric-progress-fill water-fill" style={{ width: '70%' }} />
            </div>
            <div className="card-subtext-row">
              <span className="card-subtext water-accent">
                <strong className="card-subtext-highlight">70% of 3L</strong> goal
              </span>
              <span className="card-subtext-right">
                <strong>0.9L</strong> remaining
              </span>
            </div>
          </div>
        </div>

        {/* Card C: Weight */}
        <div
          className="metric-row-card"
          onClick={() => onNavigateSlide && onNavigateSlide(2)}
          role="button"
          tabIndex={0}
        >
          {/* Row 1: Header + Value */}
          <div className="card-top-row">
            <div className="card-header-left">
              <div className="metric-icon-badge weight-badge">
                <Scale size={16} />
              </div>
              <span className="card-title">Weight</span>
            </div>

            <div className="card-header-right">
              <div className="card-val-group">
                <span className="card-val-num">57.4</span>
                <span className="card-val-unit">kg</span>
              </div>
              <ChevronRight size={17} className="card-chevron-icon" />
            </div>
          </div>

          {/* Row 2: Wide Smooth Sparkline + Subtext */}
          <div className="card-bottom-row">
            <div className="weight-sparkline-container">
              <svg viewBox="0 0 280 32" className="weight-sparkline-svg" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="weightGradWide" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#739072" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#739072" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,24 Q50,26 90,18 T180,19 T240,12 L275,6 L275,32 L0,32 Z"
                  fill="url(#weightGradWide)"
                />
                <path
                  d="M0,24 Q50,26 90,18 T180,19 T240,12 L275,6"
                  fill="none"
                  stroke="#739072"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <circle cx="275" cy="6" r="3.5" fill="#739072" />
              </svg>
            </div>
            <div className="card-subtext-row">
              <div className="weight-change-badge">
                <ArrowDown size={12} className="weight-down-arrow" />
                <span>
                  <strong>0.6 kg</strong> this week
                </span>
              </div>
              <span className="card-subtext-right">
                Goal: <strong>55.0 kg</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Card D: Macros */}
        <div
          className="metric-row-card"
          onClick={() => onNavigateSlide && onNavigateSlide(1)}
          role="button"
          tabIndex={0}
        >
          {/* Row 1: Header + Value */}
          <div className="card-top-row">
            <div className="card-header-left">
              <div className="metric-icon-badge macros-badge">
                <PieChart size={16} />
              </div>
              <span className="card-title">Macros</span>
            </div>

            <div className="card-header-right">
              <span className="macros-overview-tag">Daily balance</span>
              <ChevronRight size={17} className="card-chevron-icon" />
            </div>
          </div>

          {/* Row 2: Multi-Segmented Progress Bar + Legend */}
          <div className="card-bottom-row">
            <div className="multi-macro-track">
              <div className="macro-seg seg-carbs" style={{ width: '52%' }} title="Carbs 52%" />
              <div className="macro-seg seg-protein" style={{ width: '22%' }} title="Protein 22%" />
              <div className="macro-seg seg-fats" style={{ width: '26%' }} title="Fats 26%" />
            </div>

            <div className="macro-legend-flex-row">
              <div className="macro-legend-item">
                <span className="legend-dot dot-carbs" />
                <span className="legend-name">Carbs</span>
                <span className="legend-pct">52%</span>
              </div>
              <div className="macro-legend-item">
                <span className="legend-dot dot-protein" />
                <span className="legend-name">Protein</span>
                <span className="legend-pct">22%</span>
              </div>
              <div className="macro-legend-item">
                <span className="legend-dot dot-fats" />
                <span className="legend-name">Fats</span>
                <span className="legend-pct">26%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnalyticsSlideOverview;
