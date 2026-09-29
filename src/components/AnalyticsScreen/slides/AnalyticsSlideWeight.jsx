import React, { useState } from 'react';
import { Scale, TrendingDown, Activity, Dumbbell, Target, ChevronRight, Sparkles } from 'lucide-react';
import './AnalyticsSlideWeight.css';

export function AnalyticsSlideWeight({ onNavigateSlide }) {
  const [chartView, setChartView] = useState('weekly'); // 'weekly' | 'monthly'
  const [activeWeightIndex, setActiveWeightIndex] = useState(4); // latest weigh-in

  // Weekly Weigh-in Data (Past 5 weeks)
  const weeklyData = [
    { label: 'W1', fullDate: 'Sep 1', weight: 69.8, xPct: 10, yPct: 80 },
    { label: 'W2', fullDate: 'Sep 8', weight: 69.3, xPct: 30, yPct: 68 },
    { label: 'W3', fullDate: 'Sep 15', weight: 69.0, xPct: 50, yPct: 60 },
    { label: 'W4', fullDate: 'Sep 22', weight: 68.6, xPct: 70, yPct: 48 },
    { label: 'W5', fullDate: 'Today', weight: 68.4, xPct: 90, yPct: 42 }
  ];

  // Monthly Weigh-in Data (Past 4 months)
  const monthlyData = [
    { label: 'Jun', fullDate: 'June', weight: 72.0, xPct: 12.5, yPct: 95 },
    { label: 'Jul', fullDate: 'July', weight: 70.8, xPct: 37.5, yPct: 75 },
    { label: 'Aug', fullDate: 'August', weight: 69.6, xPct: 62.5, yPct: 55 },
    { label: 'Sep', fullDate: 'September', weight: 68.4, xPct: 87.5, yPct: 35 }
  ];

  const currentDataset = chartView === 'weekly' ? weeklyData : monthlyData;
  const activeEntry = currentDataset[activeWeightIndex] || currentDataset[currentDataset.length - 1];

  return (
    <div className="analytics-slide-weight">
      {/* 1. Main Hero Card: Weight Trajectory */}
      <section className="weight-hero-card" aria-label="Weight Progress Overview">
        {/* Top Header Row */}
        <div className="hero-top-row">
          <div className="hero-icon-label-group">
            <div className="hero-scale-icon-wrap">
              <Scale size={18} className="hero-scale-icon" />
            </div>
            <span className="hero-section-label">Weight Progress</span>
          </div>

          <div className="hero-header-right-side">
            <div className="hero-big-metric">
              <span className="hero-big-number">68.4</span>
              <span className="hero-unit-label">/ 65.0 kg</span>
            </div>
          </div>
        </div>

        {/* View Switcher Toggle (Weekly vs Monthly) */}
        <div className="weight-view-toggle-bar">
          <div className="toggle-pill-track" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={chartView === 'weekly'}
              className={`toggle-tab-btn ${chartView === 'weekly' ? 'active' : ''}`}
              onClick={() => {
                setChartView('weekly');
                setActiveWeightIndex(4);
              }}
            >
              Weekly
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={chartView === 'monthly'}
              className={`toggle-tab-btn ${chartView === 'monthly' ? 'active' : ''}`}
              onClick={() => {
                setChartView('monthly');
                setActiveWeightIndex(3);
              }}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Weight Trajectory Graph */}
        <div className="hero-weight-graph-wrap">
          {/* Y-Axis Numerical Scale */}
          <div className="weight-yaxis-col">
            <span className="yaxis-val" style={{ bottom: '85%' }}>72kg</span>
            <span className="yaxis-val" style={{ bottom: '55%' }}>69kg</span>
            <span className="yaxis-val" style={{ bottom: '25%' }}>66kg</span>
          </div>

          {/* Unified Plot Area */}
          <div className="weight-plot-area">
            {/* Horizontal Grid Guidelines */}
            <div className="weight-grid-lines">
              <div className="grid-dashed-line" style={{ bottom: '85%' }} />
              <div className="grid-dashed-line" style={{ bottom: '55%' }} />
              <div className="grid-dashed-line" style={{ bottom: '25%' }} />
            </div>

            {/* Target Goal Dashed Line */}
            <div className="weight-target-line-indicator" style={{ bottom: '15%' }}>
              <span className="target-pill-tag">Goal: 65.0 kg</span>
            </div>

            {/* Smooth Spline SVG Curve */}
            <svg
              viewBox="0 0 100 100"
              className="weight-spline-svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="weightLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="weightAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(99, 102, 241, 0.18)" />
                  <stop offset="100%" stopColor="rgba(99, 102, 241, 0.0)" />
                </linearGradient>
              </defs>
              {chartView === 'weekly' ? (
                <>
                  <path
                    d="M 10,20 C 20,26 25,32 30,32 C 40,32 45,40 50,40 C 60,40 65,52 70,52 C 80,52 85,58 90,58 L 90,100 L 10,100 Z"
                    fill="url(#weightAreaGrad)"
                  />
                  <path
                    d="M 10,20 C 20,26 25,32 30,32 C 40,32 45,40 50,40 C 60,40 65,52 70,52 C 80,52 85,58 90,58"
                    fill="none"
                    stroke="url(#weightLineGrad)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  <path
                    d="M 12.5,5 C 25,15 30,25 37.5,25 C 50,25 55,45 62.5,45 C 75,45 80,65 87.5,65 L 87.5,100 L 12.5,100 Z"
                    fill="url(#weightAreaGrad)"
                  />
                  <path
                    d="M 12.5,5 C 25,15 30,25 37.5,25 C 50,25 55,45 62.5,45 C 75,45 80,65 87.5,65"
                    fill="none"
                    stroke="url(#weightLineGrad)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>

            {/* Circular Nodes Layer */}
            <div className="weight-nodes-layer">
              {currentDataset.map((item, idx) => (
                <button
                  key={item.label}
                  type="button"
                  className="weight-node-pin"
                  style={{
                    left: `${item.xPct}%`,
                    bottom: `${100 - (chartView === 'weekly' ? [20, 32, 40, 52, 58][idx] : [5, 25, 45, 65][idx])}%`
                  }}
                  onClick={() => setActiveWeightIndex(idx)}
                  aria-label={`Weigh-in on ${item.fullDate}: ${item.weight} kg`}
                />
              ))}
            </div>

            {/* X-Axis Time Labels */}
            <div className="weight-x-labels-row">
              {currentDataset.map((item, idx) => (
                <div
                  key={item.label}
                  className="weight-x-label-item"
                  style={{ left: `${item.xPct}%` }}
                >
                  <span className="weight-x-text">{item.label}</span>
                  <span className="weight-val-subtext">{item.weight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Full-Width Body Composition Metric Cards Stack */}
      <section className="overview-metric-stack" aria-label="Body Composition Metrics">
        {/* Card 1: Body Fat % */}
        <div className="metric-row-card" role="button" tabIndex={0}>
          <div className="card-top-row">
            <div className="card-header-left">
              <div className="metric-icon-badge fat-badge">
                <Activity size={16} />
              </div>
              <span className="card-title">Body Fat</span>
            </div>

            <div className="card-header-right">
              <div className="card-val-group">
                <span className="card-val-num">18.2</span>
                <span className="card-val-unit">%</span>
              </div>
              <ChevronRight size={17} className="card-chevron-icon" />
            </div>
          </div>

          <div className="card-bottom-row">
            <div className="metric-progress-track">
              <div className="metric-progress-fill fill-fat" style={{ width: '64%' }} />
            </div>
            <div className="card-subtext-row">
              <span className="card-subtext">
                <strong className="card-subtext-highlight">-0.6%</strong> this month · Ideal range: <strong className="card-subtext-highlight">15–18%</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Skeletal Muscle Mass */}
        <div className="metric-row-card" role="button" tabIndex={0}>
          <div className="card-top-row">
            <div className="card-header-left">
              <div className="metric-icon-badge muscle-badge">
                <Dumbbell size={16} />
              </div>
              <span className="card-title">Muscle Mass</span>
            </div>

            <div className="card-header-right">
              <div className="card-val-group">
                <span className="card-val-num">34.8</span>
                <span className="card-val-unit">kg</span>
              </div>
              <ChevronRight size={17} className="card-chevron-icon" />
            </div>
          </div>

          <div className="card-bottom-row">
            <div className="metric-progress-track">
              <div className="metric-progress-fill fill-muscle" style={{ width: '78%' }} />
            </div>
            <div className="card-subtext-row">
              <span className="card-subtext">
                <strong className="card-subtext-highlight">+0.4 kg</strong> lean mass · <strong className="card-subtext-highlight">50.8%</strong> of total body
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Body Mass Index (BMI) with Segmented Visual Meter */}
        <div className="metric-row-card" role="button" tabIndex={0}>
          <div className="card-top-row">
            <div className="card-header-left">
              <div className="metric-icon-badge bmi-badge">
                <TrendingDown size={16} />
              </div>
              <span className="card-title">BMI</span>
            </div>

            <div className="card-header-right">
              <div className="card-val-group">
                <span className="card-val-num">22.4</span>
                <span className="card-val-unit">kg/m²</span>
              </div>
              <ChevronRight size={17} className="card-chevron-icon" />
            </div>
          </div>

          <div className="card-bottom-row">
            {/* Visual 3-Segment BMI Gauge */}
            <div className="bmi-segmented-bar">
              <div className="bmi-segment segment-under" title="Underweight (<18.5)">
                <span className="bmi-seg-label">&lt;18.5</span>
              </div>
              <div className="bmi-segment segment-normal active" title="Normal (18.5-24.9)">
                <span className="bmi-seg-label">18.5 - 24.9 Normal</span>
                <div className="bmi-marker-pin" style={{ left: '60%' }} />
              </div>
              <div className="bmi-segment segment-over" title="Overweight (25+)">
                <span className="bmi-seg-label">25+</span>
              </div>
            </div>
            <div className="card-subtext-row">
              <span className="card-subtext">
                <strong className="card-subtext-highlight">Normal & Healthy</strong> · Safe optimal standard
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Target Projection */}
        <div className="metric-row-card" role="button" tabIndex={0}>
          <div className="card-top-row">
            <div className="card-header-left">
              <div className="metric-icon-badge target-badge">
                <Target size={16} />
              </div>
              <span className="card-title">Goal Projection</span>
            </div>

            <div className="card-header-right">
              <div className="card-val-group">
                <span className="card-val-num">Nov 15</span>
                <span className="card-val-unit">est.</span>
              </div>
              <ChevronRight size={17} className="card-chevron-icon" />
            </div>
          </div>

          <div className="card-bottom-row">
            <div className="metric-progress-track">
              <div className="metric-progress-fill fill-target" style={{ width: '84%' }} />
            </div>
            <div className="card-subtext-row">
              <span className="card-subtext">
                <strong className="card-subtext-highlight">3.4 kg</strong> remaining · <strong className="card-subtext-highlight">0.5 kg/wk</strong> pace
              </span>
              <span className="card-subtext-right">
                <strong>84%</strong> on track
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default AnalyticsSlideWeight;
