import React, { useState } from 'react';
import {
  ArrowLeft,
  Pause,
  Play,
  RotateCcw,
  X,
  Truck,
  AlertCircle
} from 'lucide-react';
import { INITIAL_ACTIVE_SUBSCRIPTIONS, FOOD_PLANS, TRAINER_PROFILES } from '../data/subscriptionsData';

export function ManageSubscriptionsView({
  onBack,
  onTrackDelivery,
  onSelectFoodPlan,
  onSelectTrainer
}) {
  const [activeTab, setActiveTab] = useState('food'); // 'food' | 'fitness'
  const [subscriptions, setSubscriptions] = useState(INITIAL_ACTIVE_SUBSCRIPTIONS);
  const [managePlan, setManagePlan] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const activeList = subscriptions[activeTab] || [];

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
    setManagePlan(null);
  };

  return (
    <div className="sub-manage-view">
      {/* Header */}
      <header className="sub-manage-header">
        <button
          type="button"
          className="sub-back-circle-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={19} strokeWidth={2.2} />
        </button>

        <h1 className="sub-manage-title">My Subscriptions</h1>
        <div style={{ width: 40 }} />
      </header>

      {/* Segmented Switcher: Food | Fitness */}
      <div className="sub-manage-segmented-row" role="tablist">
        <button
          type="button"
          className={`sub-manage-segment-pill ${activeTab === 'food' ? 'active' : ''}`}
          onClick={() => setActiveTab('food')}
          role="tab"
          aria-selected={activeTab === 'food'}
        >
          Food
        </button>
        <button
          type="button"
          className={`sub-manage-segment-pill ${activeTab === 'fitness' ? 'active' : ''}`}
          onClick={() => setActiveTab('fitness')}
          role="tab"
          aria-selected={activeTab === 'fitness'}
        >
          Fitness
        </button>
      </div>

      <div className="sub-manage-scrollable">
        {/* Active Subscriptions Section */}
        <section className="sub-manage-section">
          <h2 className="manage-section-heading">Active Subscriptions</h2>

          {activeList.length > 0 ? (
            <div className="manage-active-cards-list">
              {activeList.map((item) => (
                <div key={item.id} className="manage-active-card">
                  <div className="active-card-top-row">
                    <div className="active-card-thumb-wrap">
                      <img src={item.image} alt={item.title} className="active-card-thumb" />
                    </div>

                    <div className="active-card-info">
                      <div className="active-card-title-row">
                        <h3 className="active-card-name">{item.title}</h3>
                        <span className={`active-status-badge ${isPaused ? 'paused' : 'active'}`}>
                          {isPaused ? 'Paused' : item.status}
                        </span>
                      </div>

                      <span className="active-card-price">{item.priceFormatted}</span>

                      {item.schedule && (
                        <p className="active-card-schedule">{item.schedule}</p>
                      )}
                      {item.nextDelivery && (
                        <p className="active-card-meta">
                          Next delivery: <strong>{item.nextDelivery}</strong>
                        </p>
                      )}
                      {item.renewalDate && (
                        <p className="active-card-meta">
                          Renewal on: <strong>{item.renewalDate}</strong>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="active-card-bottom-actions">
                    {activeTab === 'food' && (
                      <button
                        type="button"
                        className="track-delivery-btn"
                        onClick={onTrackDelivery}
                      >
                        <Truck size={15} />
                        <span>Track Delivery (12 min)</span>
                      </button>
                    )}

                    <button
                      type="button"
                      className="manage-pill-btn"
                      onClick={() => setManagePlan(item)}
                    >
                      <span>Manage</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="manage-empty-box">
              <p>No active {activeTab} subscriptions.</p>
            </div>
          )}
        </section>

        {/* Available / Recommended Subscriptions */}
        <section className="sub-manage-section">
          <h2 className="manage-section-heading">Available Subscriptions</h2>

          <div className="manage-available-list">
            {activeTab === 'food' ? (
              <div className="manage-avail-row" onClick={() => onSelectFoodPlan(FOOD_PLANS[2])}>
                <div className="avail-thumb-wrap">
                  <img src={FOOD_PLANS[2].image} alt="" className="avail-thumb" />
                </div>
                <div className="avail-info">
                  <h3 className="avail-title">{FOOD_PLANS[2].title}</h3>
                  <span className="avail-price">₹{FOOD_PLANS[2].price.toLocaleString()} / month</span>
                </div>
                <button type="button" className="avail-view-btn">View</button>
              </div>
            ) : (
              <div className="manage-avail-row" onClick={() => onSelectTrainer(TRAINER_PROFILES[0])}>
                <div className="avail-thumb-wrap">
                  <img src={TRAINER_PROFILES[0].image} alt="" className="avail-thumb" />
                </div>
                <div className="avail-info">
                  <h3 className="avail-title">{TRAINER_PROFILES[0].name}</h3>
                  <span className="avail-price">From ₹1,200 / month</span>
                </div>
                <button type="button" className="avail-view-btn">View</button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Quick Manage Action Sheet Modal */}
      {managePlan && (
        <div className="sub-manage-modal-backdrop" onClick={() => setManagePlan(null)}>
          <div className="sub-manage-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="manage-modal-header">
              <h3 className="manage-modal-title">Manage {managePlan.title}</h3>
              <button
                type="button"
                className="manage-modal-close"
                onClick={() => setManagePlan(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="manage-modal-options-list">
              <button
                type="button"
                className="manage-option-item"
                onClick={handleTogglePause}
              >
                <div className="manage-option-icon">
                  {isPaused ? <Play size={18} /> : <Pause size={18} />}
                </div>
                <div className="manage-option-text">
                  <span className="manage-option-label">
                    {isPaused ? 'Resume Subscription' : 'Pause Deliveries (Vacation Mode)'}
                  </span>
                  <span className="manage-option-sub">
                    {isPaused ? 'Restart your regular schedule' : 'Skip deliveries without losing discounts'}
                  </span>
                </div>
              </button>

              <button
                type="button"
                className="manage-option-item"
                onClick={() => {
                  alert('Address change request opened.');
                  setManagePlan(null);
                }}
              >
                <div className="manage-option-icon"><RotateCcw size={18} /></div>
                <div className="manage-option-text">
                  <span className="manage-option-label">Change Delivery Address</span>
                  <span className="manage-option-sub">Update current drop-off location</span>
                </div>
              </button>

              <button
                type="button"
                className="manage-option-item cancel-danger"
                onClick={() => {
                  if (confirm(`Are you sure you want to cancel ${managePlan.title}?`)) {
                    setSubscriptions((prev) => ({
                      ...prev,
                      [activeTab]: prev[activeTab].filter((p) => p.id !== managePlan.id)
                    }));
                    setManagePlan(null);
                  }
                }}
              >
                <div className="manage-option-icon danger-icon"><AlertCircle size={18} /></div>
                <div className="manage-option-text">
                  <span className="manage-option-label danger-text">Cancel Subscription</span>
                  <span className="manage-option-sub">Ends at the end of current cycle</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageSubscriptionsView;
