import React, { useState } from 'react';
import {
  ArrowLeft,
  Smartphone,
  Receipt,
  Mail,
  MessageSquare,
  Plane,
  HelpCircle,
  ChevronRight,
  LifeBuoy
} from 'lucide-react';

export function SubscriptionSettingsView({ onBack }) {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [pauseTravel, setPauseTravel] = useState(false);

  return (
    <div className="sub-settings-view">
      {/* Header */}
      <header className="sub-settings-header">
        <button
          type="button"
          className="sub-back-circle-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={19} strokeWidth={2.2} />
        </button>

        <h1 className="sub-settings-title">Subscription Settings</h1>
        <div style={{ width: 40 }} />
      </header>

      <div className="sub-settings-scrollable">
        {/* Group 1: Payment Methods */}
        <section className="sub-settings-group">
          <h2 className="settings-group-title">Payment Methods</h2>

          <div className="settings-items-box">
            <div className="settings-nav-row" onClick={() => alert('UPI AutoPay details')}>
              <div className="settings-icon-wrap">
                <Smartphone size={18} />
              </div>
              <div className="settings-text-col">
                <span className="settings-label-bold">UPI AutoPay</span>
                <span className="settings-sub-text">pranav@upi</span>
              </div>
              <ChevronRight size={18} className="settings-chevron" />
            </div>

            <div className="settings-divider" />

            <div className="settings-nav-row" onClick={() => alert('Viewing billing invoices history')}>
              <div className="settings-icon-wrap">
                <Receipt size={18} />
              </div>
              <div className="settings-text-col">
                <span className="settings-label-bold">Billing History</span>
                <span className="settings-sub-text">View past payment receipts & invoices</span>
              </div>
              <ChevronRight size={18} className="settings-chevron" />
            </div>
          </div>
        </section>

        {/* Group 2: Preferences */}
        <section className="sub-settings-group">
          <h2 className="settings-group-title">Preferences</h2>

          <div className="settings-items-box">
            {/* Email Notifications */}
            <div className="settings-toggle-row">
              <div className="settings-icon-wrap">
                <Mail size={18} />
              </div>
              <div className="settings-text-col">
                <span className="settings-label-bold">Email Notifications</span>
                <span className="settings-sub-text">Weekly menu previews and invoices</span>
              </div>
              <label className="settings-toggle-switch">
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="settings-divider" />

            {/* SMS Notifications */}
            <div className="settings-toggle-row">
              <div className="settings-icon-wrap">
                <MessageSquare size={18} />
              </div>
              <div className="settings-text-col">
                <span className="settings-label-bold">SMS Notifications</span>
                <span className="settings-sub-text">Live delivery dispatch alerts</span>
              </div>
              <label className="settings-toggle-switch">
                <input
                  type="checkbox"
                  checked={smsNotifs}
                  onChange={(e) => setSmsNotifs(e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="settings-divider" />

            {/* Pause on Travel */}
            <div className="settings-toggle-row">
              <div className="settings-icon-wrap">
                <Plane size={18} />
              </div>
              <div className="settings-text-col">
                <span className="settings-label-bold">Pause on Travel</span>
                <span className="settings-sub-text">
                  Automatically pause deliveries or sessions when you're away
                </span>
              </div>
              <label className="settings-toggle-switch">
                <input
                  type="checkbox"
                  checked={pauseTravel}
                  onChange={(e) => setPauseTravel(e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>
        </section>

        {/* Group 3: Need Help? */}
        <section className="sub-settings-group">
          <h2 className="settings-group-title">Need Help?</h2>

          <div className="settings-items-box">
            <div className="settings-nav-row" onClick={() => alert('Support line connected: 1800-NOURISH')}>
              <div className="settings-icon-wrap">
                <LifeBuoy size={18} />
              </div>
              <div className="settings-text-col">
                <span className="settings-label-bold">Contact Support</span>
                <span className="settings-sub-text">24/7 dedicated wellness advisor</span>
              </div>
              <ChevronRight size={18} className="settings-chevron" />
            </div>

            <div className="settings-divider" />

            <div className="settings-nav-row" onClick={() => alert('Opening Frequently Asked Questions')}>
              <div className="settings-icon-wrap">
                <HelpCircle size={18} />
              </div>
              <div className="settings-text-col">
                <span className="settings-label-bold">FAQs</span>
                <span className="settings-sub-text">Learn how pauses and refunds work</span>
              </div>
              <ChevronRight size={18} className="settings-chevron" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SubscriptionSettingsView;
