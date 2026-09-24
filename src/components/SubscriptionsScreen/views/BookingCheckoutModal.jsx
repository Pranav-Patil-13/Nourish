import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  CreditCard,
  Building,
  Smartphone,
  ShieldCheck,
  Check
} from 'lucide-react';

export function BookingCheckoutModal({ item, type, onClose, onConfirmSuccess }) {
  const [startDate] = useState('24 Sep 2026');
  const [billingCycle] = useState('Monthly (Auto-renew)');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!item) return null;

  const totalAmount = item.price || 1200;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onConfirmSuccess(item, type);
      }, 1200);
    }, 1400);
  };

  return (
    <div className="sub-checkout-backdrop" onClick={onClose}>
      <div className="sub-checkout-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="checkout-header">
          <button
            type="button"
            className="checkout-back-btn"
            onClick={onClose}
            aria-label="Close checkout"
          >
            <ArrowLeft size={18} strokeWidth={2.2} />
          </button>
          <h2 className="checkout-title">
            {type === 'food' ? 'Subscribe to Food Plan' : 'Confirm & Subscribe'}
          </h2>
          <div style={{ width: 36 }} />
        </header>

        {isSuccess ? (
          <div className="checkout-success-view">
            <div className="checkout-success-icon-wrap">
              <Check size={36} strokeWidth={3} className="success-check-icon" />
            </div>
            <h3 className="checkout-success-title">Subscription Activated!</h3>
            <p className="checkout-success-sub">
              Your {item.title || item.name} plan is now active.
            </p>
          </div>
        ) : (
          <div className="checkout-content-scrollable">
            {/* Selected Plan Summary Card */}
            <div className="checkout-plan-summary-card">
              <div className="summary-thumb-wrap">
                <img src={item.image} alt="" className="summary-thumb-img" />
              </div>
              <div className="summary-info-col">
                <h3 className="summary-plan-name">{item.title || item.name}</h3>
                <span className="summary-plan-price">₹{totalAmount.toLocaleString()} / month</span>
                <span className="summary-plan-sub">
                  {item.deliveries || item.sessionsInfo || 'Unlimited access'}
                </span>
              </div>
            </div>

            {/* Schedule & Billing Configuration */}
            <div className="checkout-settings-group">
              {/* Start Date */}
              <div className="checkout-field-row">
                <span className="checkout-field-label">Start Date</span>
                <div className="checkout-field-val-pill">
                  <span>{startDate}</span>
                  <Calendar size={15} className="field-icon" />
                </div>
              </div>

              {/* Billing Cycle */}
              <div className="checkout-field-row">
                <span className="checkout-field-label">Billing Cycle</span>
                <div className="checkout-field-val-pill">
                  <span>{billingCycle}</span>
                  <ChevronDown size={15} className="field-icon" />
                </div>
              </div>
            </div>

            {/* Payment Methods Section */}
            <div className="checkout-payment-section">
              <h3 className="payment-heading">Payment Method</h3>

              <div className="payment-options-list">
                {/* 1. UPI */}
                <div
                  className={`payment-option-card ${paymentMethod === 'upi' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className="payment-radio-circle">
                    {paymentMethod === 'upi' && <div className="payment-radio-dot" />}
                  </div>
                  <div className="payment-method-text">
                    <span className="payment-method-name">UPI</span>
                    <span className="payment-method-detail">pranav@upi (Google Pay / PhonePe)</span>
                  </div>
                  <Smartphone size={18} className="payment-type-icon" />
                </div>

                {/* 2. Credit/Debit Card */}
                <div
                  className={`payment-option-card ${paymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="payment-radio-circle">
                    {paymentMethod === 'card' && <div className="payment-radio-dot" />}
                  </div>
                  <div className="payment-method-text">
                    <span className="payment-method-name">Credit / Debit Card</span>
                    <span className="payment-method-detail">Visa, Mastercard, RuPay</span>
                  </div>
                  <CreditCard size={18} className="payment-type-icon" />
                </div>

                {/* 3. Net Banking */}
                <div
                  className={`payment-option-card ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <div className="payment-radio-circle">
                    {paymentMethod === 'netbanking' && <div className="payment-radio-dot" />}
                  </div>
                  <div className="payment-method-text">
                    <span className="payment-method-name">Net Banking</span>
                    <span className="payment-method-detail">All major Indian banks</span>
                  </div>
                  <Building size={18} className="payment-type-icon" />
                </div>
              </div>
            </div>

            {/* Security Guarantee badge */}
            <div className="checkout-guarantee-row">
              <ShieldCheck size={16} className="guarantee-icon" />
              <span>256-bit encrypted secure checkout. Cancel anytime.</span>
            </div>

            {/* CTA Subscribe & Pay Button */}
            <div className="checkout-cta-block">
              <button
                type="button"
                className="checkout-pay-btn"
                onClick={handlePay}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <span>Subscribe & Pay ₹{totalAmount.toLocaleString()}</span>
                )}
              </button>
              <span className="checkout-cancel-note">You can pause or cancel anytime without fees.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingCheckoutModal;
