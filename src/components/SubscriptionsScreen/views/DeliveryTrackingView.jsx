import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  Bike
} from 'lucide-react';
import { LIVE_DELIVERY_DATA } from '../data/subscriptionsData';

export function DeliveryTrackingView({ onBack }) {
  const [currentStep, setCurrentStep] = useState(1); // 0: Prepared, 1: Out for delivery, 2: Arriving soon, 3: Delivered

  return (
    <div className="sub-delivery-tracking-view">
      {/* Top Floating Back Bar */}
      <div className="sub-delivery-top-bar">
        <button
          type="button"
          className="sub-back-circle-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={19} strokeWidth={2.2} />
        </button>
        <span className="sub-tracking-header-title">Live Delivery Tracking</span>
        <div style={{ width: 40 }} />
      </div>

      {/* Interactive Map Visual Area */}
      <div className="delivery-map-container">
        {/* Vector Stylized Map Canvas */}
        <div className="vector-map-bg">
          {/* Map Grid Roads */}
          <div className="road-grid-horizontal line-1" />
          <div className="road-grid-horizontal line-2" />
          <div className="road-grid-vertical line-3" />
          <div className="road-grid-vertical line-4" />

          {/* Animated Route Path */}
          <svg className="route-svg-path" viewBox="0 0 300 240" fill="none">
            <path
              d="M 60 190 L 150 190 L 150 70 L 230 70"
              stroke="#10B981"
              strokeWidth="4"
              strokeDasharray="6 6"
              className="route-dash-anim"
            />
          </svg>

          {/* Destination Pin */}
          <div className="map-destination-pin" style={{ left: '224px', top: '50px' }}>
            <div className="dest-pulse-ring" />
            <div className="dest-pin-circle">
              <MapPin size={16} fill="#10B981" color="#FFFFFF" />
            </div>
          </div>

          {/* Moving Delivery Driver Marker */}
          <div className="map-rider-marker" style={{ left: '136px', top: '120px' }}>
            <div className="rider-bubble-eta">
              <span>Arriving in {LIVE_DELIVERY_DATA.arrivingMin} min</span>
            </div>
            <div className="rider-icon-box">
              <Bike size={18} color="#FFFFFF" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet Card with Live Timeline & Driver */}
      <div className="delivery-details-sheet">
        {/* Status Headline */}
        <div className="delivery-headline-block">
          <div className="delivery-salad-badge">🥗 Healthy Food Delivery</div>
          <h1 className="delivery-headline-text">{LIVE_DELIVERY_DATA.statusHeadline}</h1>
          <div className="delivery-window-row">
            <Clock size={14} className="clock-icon" />
            <span className="delivery-window-text">
              Expected delivery: <strong>{LIVE_DELIVERY_DATA.expectedWindow}</strong>
            </span>
          </div>
        </div>

        {/* 4-Stage Stepper Progress Tracker */}
        <div className="delivery-stepper-tracker">
          <div className="stepper-progress-bar">
            <div
              className="stepper-progress-fill"
              style={{ width: `${(currentStep / (LIVE_DELIVERY_DATA.stages.length - 1)) * 100}%` }}
            />
          </div>

          <div className="stepper-nodes-row">
            {LIVE_DELIVERY_DATA.stages.map((stage, idx) => {
              const isCompleted = idx <= currentStep;
              const isCurrent = idx === currentStep;

              return (
                <div
                  key={stage}
                  className={`stepper-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                  onClick={() => setCurrentStep(idx)}
                  title="Click to simulate stage"
                >
                  <div className="node-circle">
                    {isCompleted ? <div className="node-inner-dot" /> : null}
                  </div>
                  <span className="node-label">{stage}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Driver Profile Card */}
        <div className="delivery-driver-card">
          <div className="driver-avatar-wrap">
            <img
              src={LIVE_DELIVERY_DATA.driver.avatar}
              alt={LIVE_DELIVERY_DATA.driver.name}
              className="driver-avatar-img"
            />
          </div>

          <div className="driver-info-col">
            <h3 className="driver-name">{LIVE_DELIVERY_DATA.driver.name}</h3>
            <span className="driver-vehicle-sub">{LIVE_DELIVERY_DATA.driver.vehicle}</span>
          </div>

          <div className="driver-actions-row">
            <button
              type="button"
              className="driver-phone-btn"
              onClick={() => alert(`Calling driver ${LIVE_DELIVERY_DATA.driver.name} at ${LIVE_DELIVERY_DATA.driver.phone}`)}
              aria-label="Call driver"
              title="Call driver"
            >
              <Phone size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryTrackingView;
