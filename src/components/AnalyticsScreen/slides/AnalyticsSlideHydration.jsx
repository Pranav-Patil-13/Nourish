import React, { useState } from 'react';
import { Droplet, Flame, Footprints, Sparkles, Zap, ChevronRight, Check } from 'lucide-react';
import './AnalyticsSlideHydration.css';

export function AnalyticsSlideHydration({ onNavigateSlide }) {
  const [chartView, setChartView] = useState('phases'); // 'phases' | 'hourly'
  const [activeHourlyIndex, setActiveHourlyIndex] = useState(3); // 3:00 PM by default

  // 3-Time Phase Water Breakdown
  const hydrationPhases = [
    { phase: 'Morning', time: '8am - 12pm', intake: '0.8 L', heightPercent: 80, isMet: true },
    { phase: 'Afternoon', time: '12pm - 5pm', intake: '1.1 L', heightPercent: 92, isMet: true },
    { phase: 'Evening', time: '5pm - 10pm', intake: '0.5 L', heightPercent: 50, isMet: false }
  ];

  // Hourly Detailed Data (6AM - 12AM) calibrated to 0-750ml scale
  const hourlyData = [
    { hour: '6', period: 'AM', time: '6AM', value: 120, label: '120ml', xPct: 7.14, barHeight: 16.0 },
    { hour: '9', period: 'AM', time: '9AM', value: 180, label: '180ml', xPct: 21.43, barHeight: 24.0 },
    { hour: '12', period: 'PM', time: '12PM', value: 340, label: '340ml', xPct: 35.71, barHeight: 45.3 },
    { hour: '3', period: 'PM', time: '3PM', value: 520, label: '520ml', xPct: 50.0, barHeight: 69.3 },
    { hour: '6', period: 'PM', time: '6PM', value: 360, label: '360ml', xPct: 64.29, barHeight: 48.0 },
    { hour: '9', period: 'PM', time: '9PM', value: 280, label: '280ml', xPct: 78.57, barHeight: 37.3 },
    { hour: '12', period: 'AM', time: '12AM', value: 120, label: '120ml', xPct: 92.86, barHeight: 16.0 }
  ];

  // 7-Day Streak Days
  const streakDays = [
    { day: 'M', completed: true },
    { day: 'T', completed: true },
    { day: 'W', completed: true },
    { day: 'T', completed: true },
    { day: 'F', completed: true },
    { day: 'S', completed: true },
    { day: 'S', completed: false }
  ];

  const activeHourly = hourlyData[activeHourlyIndex] || hourlyData[3];

  return (
    <div className="analytics-slide-hydration">
      {/* 1. Main Hero Card: Daily Hydration */}
      <section className="hydration-hero-card" aria-label="Daily Hydration Overview">
        {/* Top Header Row with Title on Left, Metric & Toggle on Right */}
        <div className="hero-top-row">
          <div className="hero-icon-label-group">
            <div className="hero-droplet-icon-wrap">
              <Droplet size={18} className="hero-droplet-icon" />
            </div>
            <span className="hero-section-label">Daily Hydration</span>
          </div>

          <div className="hero-header-right-side">
            <div className="hero-big-metric">
              <span className="hero-big-number">2.4</span>
              <span className="hero-unit-label">/ 3.0 L</span>
            </div>
          </div>
        </div>

        {/* View Switcher Toggle (Phases vs Hourly) */}
        <div className="hydration-view-toggle-bar">
          <div className="toggle-pill-track" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={chartView === 'phases'}
              className={`toggle-tab-btn ${chartView === 'phases' ? 'active' : ''}`}
              onClick={() => setChartView('phases')}
            >
              Time Blocks
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={chartView === 'hourly'}
              className={`toggle-tab-btn ${chartView === 'hourly' ? 'active' : ''}`}
              onClick={() => setChartView('hourly')}
            >
              Hourly Activity
            </button>
          </div>
        </div>

        {/* Dynamic Chart Container */}
        {chartView === 'hourly' ? (
          /* DETAILED HOURLY SPLINE & BAR GRAPH */
          <div className="hero-hourly-graph-wrap">
            {/* Y-Axis Numerical Labels Column (Fixed 34px width) */}
            <div className="hourly-yaxis-col">
              <span className="yaxis-val" style={{ bottom: '100%' }}>750ml</span>
              <span className="yaxis-val" style={{ bottom: '66.67%' }}>500ml</span>
              <span className="yaxis-val" style={{ bottom: '33.33%' }}>250ml</span>
            </div>

            {/* Unified Main Plot Box (Zero Offset for Bars, Nodes, Curve & Grid) */}
            <div className="hourly-plot-area">
              {/* Horizontal Grid Guidelines */}
              <div className="hourly-grid-lines">
                <div className="grid-dashed-line" style={{ bottom: '100%' }} />
                <div className="grid-dashed-line" style={{ bottom: '66.67%' }} />
                <div className="grid-dashed-line" style={{ bottom: '33.33%' }} />
              </div>

              {/* Background Hourly Gradient Bars */}
              <div className="hourly-bars-row">
                {hourlyData.map((item, idx) => {
                  const isSelected = activeHourlyIndex === idx;
                  return (
                    <div
                      key={item.time}
                      className={`hourly-bar-col ${isSelected ? 'selected' : ''}`}
                      onClick={() => setActiveHourlyIndex(idx)}
                    >
                      <div className="hourly-bar-track">
                        <div
                          className={`hourly-bar-fill ${isSelected ? 'is-active-bar' : ''}`}
                          style={{ height: `${item.barHeight}%` }}
                        />
                      </div>
                      <div className="hourly-time-label">
                        <span className="hourly-time-num">{item.hour}</span>
                        <span className="hourly-time-period">{item.period}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Calibrated Smooth Spline Curve Overlay */}
              <svg
                viewBox="0 0 100 100"
                className="hourly-spline-svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0,89 C 3,87 5,84 7.14,84 C 12,84 16,76 21.43,76 C 27,76 31,54.7 35.71,54.7 C 41,54.7 45,30.7 50,30.7 C 55,30.7 59,52 64.29,52 C 69,52 73,62.7 78.57,62.7 C 84,62.7 88,84 92.86,84 C 95,84 97,87 100,89"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>

              {/* CSS Circular Nodes Layer (All Uniform) */}
              <div className="hourly-nodes-layer">
                {hourlyData.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="hourly-node-pin"
                    style={{
                      left: `${item.xPct}%`,
                      bottom: `${item.barHeight}%`
                    }}
                    onClick={() => setActiveHourlyIndex(idx)}
                    aria-label={`Water intake at ${item.time}: ${item.label}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* 3-PHASE TIME BLOCKS VIEW */
          <div className="hero-hydration-chart-container">
            {/* 3 Time Block Bars */}
            <div className="hydration-bars-row">
              {hydrationPhases.map((item) => (
                <div key={item.phase} className="hydration-bar-column">
                  <div className="hydration-bar-track">
                    <div
                      className={`hydration-bar-fill ${item.isMet ? 'fill-ocean' : 'fill-sky'}`}
                      style={{ height: `${item.heightPercent}%` }}
                    >
                      <span className="hydration-bar-inner-value">{item.intake}</span>
                    </div>
                  </div>
                  <span className="hydration-bar-phase">{item.phase}</span>
                  <span className="hydration-bar-time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 2. Full-Width Metric Cards Stack */}
      <section className="overview-metric-stack" aria-label="Daily Habits & Activity">
        {/* Card A: Active Calorie Burn */}
        <div className="metric-row-card" role="button" tabIndex={0}>
          {/* Row 1: Header + Value */}
          <div className="card-top-row">
            <div className="card-header-left">
              <div className="metric-icon-badge burn-badge">
                <Flame size={16} />
              </div>
              <span className="card-title">Active Burn</span>
            </div>

            <div className="card-header-right">
              <div className="card-val-group">
                <span className="card-val-num">520</span>
                <span className="card-val-unit">kcal</span>
              </div>
              <ChevronRight size={17} className="card-chevron-icon" />
            </div>
          </div>

          {/* Row 2: Full-width Progress Bar + Subtext */}
          <div className="card-bottom-row">
            <div className="metric-progress-track">
              <div className="metric-progress-fill burn-fill" style={{ width: '87%' }} />
            </div>
            <div className="card-subtext-row">
              <span className="card-subtext">
                <strong className="card-subtext-highlight">87% of 600 kcal</strong> target
              </span>
              <span className="card-subtext-right">
                <strong>80 kcal</strong> left
              </span>
            </div>
          </div>
        </div>

        {/* Card B: Steps Tracker */}
        <div className="metric-row-card" role="button" tabIndex={0}>
          {/* Row 1: Header + Value */}
          <div className="card-top-row">
            <div className="card-header-left">
              <div className="metric-icon-badge steps-badge">
                <Footprints size={16} />
              </div>
              <span className="card-title">Daily Steps</span>
            </div>

            <div className="card-header-right">
              <div className="card-val-group">
                <span className="card-val-num">8,420</span>
                <span className="card-val-unit">steps</span>
              </div>
              <ChevronRight size={17} className="card-chevron-icon" />
            </div>
          </div>

          {/* Row 2: Full-width Progress Bar + Subtext */}
          <div className="card-bottom-row">
            <div className="metric-progress-track">
              <div className="metric-progress-fill steps-fill" style={{ width: '84%' }} />
            </div>
            <div className="card-subtext-row">
              <span className="card-subtext steps-accent">
                <strong className="card-subtext-highlight">84% of 10k</strong> goal
              </span>
              <span className="card-subtext-right">
                <strong>1,580</strong> remaining
              </span>
            </div>
          </div>
        </div>

        {/* Card C: 7-Day Habit Streak Matrix */}
        <div className="metric-row-card" role="button" tabIndex={0}>
          {/* Row 1: Header + Value */}
          <div className="card-top-row">
            <div className="card-header-left">
              <div className="metric-icon-badge streak-badge">
                <Zap size={16} />
              </div>
              <span className="card-title">Habit Consistency</span>
            </div>

            <div className="card-header-right">
              <span className="streak-overview-tag">
                <strong>6 / 7</strong> days met
              </span>
              <ChevronRight size={17} className="card-chevron-icon" />
            </div>
          </div>

          {/* Row 2: 7-Day Circular Status Grid */}
          <div className="card-bottom-row">
            <div className="streak-days-row">
              {streakDays.map((item, idx) => (
                <div
                  key={idx}
                  className={`streak-day-pill ${item.completed ? 'completed' : 'pending'}`}
                >
                  <span className="streak-day-label">{item.day}</span>
                  <div className="streak-day-dot">
                    {item.completed ? <Check size={10} strokeWidth={3} /> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnalyticsSlideHydration;
