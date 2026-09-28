import React, { useState, useEffect } from 'react';
import { SubscriptionsMainView } from './views/SubscriptionsMainView';
import { FoodSubscriptionsView } from './views/FoodSubscriptionsView';
import { FoodPlanDetailView } from './views/FoodPlanDetailView';
import { FitnessSubscriptionsView } from './views/FitnessSubscriptionsView';
import { GymListingView } from './views/GymListingView';
import { GymDetailView } from './views/GymDetailView';
import { TrainerProfileView } from './views/TrainerProfileView';
import { BookingCheckoutModal } from './views/BookingCheckoutModal';
import { ManageSubscriptionsView } from './views/ManageSubscriptionsView';
import { DeliveryTrackingView } from './views/DeliveryTrackingView';
import { NotificationsView } from './views/NotificationsView';
import { SubscriptionSettingsView } from './views/SubscriptionSettingsView';
import { useBackHandler } from '../../context/BackNavigationContext';
import { FOOD_PLANS, GYM_LISTINGS, TRAINER_PROFILES } from './data/subscriptionsData';
import './SubscriptionsScreen.css';

export function SubscriptionsScreen({ onSelectTab, onOpenScanner, onToggleFullScreenOverlay }) {
  // Navigation stack view state (Defaulting directly to food-list as primary hub)
  const [currentView, setCurrentView] = useState('food-list'); // 'food-list' | 'food-detail' | 'manage-subs' | 'delivery-tracking' | 'notifications' | 'settings'
  const [selectedFoodPlan, setSelectedFoodPlan] = useState(FOOD_PLANS[0]);
  const [selectedGym, setSelectedGym] = useState(GYM_LISTINGS[0]);
  const [selectedTrainer, setSelectedTrainer] = useState(TRAINER_PROFILES[0]);
  const [checkoutModal, setCheckoutModal] = useState(null); // { item, type: 'food' | 'fitness' }
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Determine if full screen elevation is needed (above the bottom tab bar)
  const isFullScreenView = ['food-detail', 'gym-detail', 'trainer-detail', 'delivery-tracking'].includes(currentView);
  const isScreenElevated = isFullScreenView || Boolean(checkoutModal) || isLocationModalOpen;

  useEffect(() => {
    if (onToggleFullScreenOverlay) {
      onToggleFullScreenOverlay(isScreenElevated);
    }
    return () => {
      if (onToggleFullScreenOverlay) {
        onToggleFullScreenOverlay(false);
      }
    };
  }, [isScreenElevated, onToggleFullScreenOverlay]);

  // Register Native Back Handler for Subscriptions subviews and checkout modal
  useBackHandler(() => {
    if (checkoutModal) {
      setCheckoutModal(null);
      return true;
    }
    if (isLocationModalOpen) {
      setIsLocationModalOpen(false);
      return true;
    }
    if (currentView === 'food-detail') {
      setCurrentView('food-list');
      return true;
    }
    if (currentView === 'gym-detail') {
      setCurrentView('gym-list');
      return true;
    }
    if (currentView !== 'food-list') {
      setCurrentView('food-list');
      return true;
    }
    return false;
  }, true, 10);

  // Navigation handlers
  const handleOpenFoodDetail = (plan) => {
    setSelectedFoodPlan(plan);
    setCurrentView('food-detail');
  };

  const handleOpenGymDetail = (gym) => {
    setSelectedGym(gym);
    setCurrentView('gym-detail');
  };

  const handleOpenTrainerProfile = (trainer) => {
    setSelectedTrainer(trainer);
    setCurrentView('trainer-detail');
  };

  const handleFitnessCategorySelect = (catId) => {
    if (catId === 'personal-trainer') {
      setCurrentView('trainer-detail');
    } else {
      setCurrentView('gym-list');
    }
  };

  const handleStartCheckout = (item, type) => {
    setCheckoutModal({ item, type });
  };

  const handleCheckoutSuccess = (item, type) => {
    setCheckoutModal(null);
    if (type === 'food') {
      setCurrentView('delivery-tracking');
    } else {
      setCurrentView('manage-subs');
    }
  };

  return (
    <div className={`subscriptions-screen ${isScreenElevated ? 'screen-elevated' : ''}`}>
      <div className="sub-screen-content-wrapper">
        {/* VIEW 01: Food Subscriptions (Primary Landings Hub) */}
        {currentView === 'food-list' && (
          <FoodSubscriptionsView
            onSelectPlan={handleOpenFoodDetail}
            isLocationModalOpen={isLocationModalOpen}
            setIsLocationModalOpen={setIsLocationModalOpen}
          />
        )}

        {/* VIEW 02: Food Plan Details & Sample Menu */}
        {currentView === 'food-detail' && (
          <FoodPlanDetailView
            plan={selectedFoodPlan}
            onBack={() => setCurrentView('food-list')}
            onSubscribe={(plan) => handleStartCheckout(plan, 'food')}
          />
        )}

        {/* VIEW 03: Fitness Subscriptions Hub (Hidden from main navigation for now) */}
        {currentView === 'fitness-list' && (
          <FitnessSubscriptionsView
            onBack={() => setCurrentView('food-list')}
            onSelectCategory={handleFitnessCategorySelect}
          />
        )}

        {/* Gym & Studio Directory Listing */}
        {currentView === 'gym-list' && (
          <GymListingView
            onBack={() => setCurrentView('food-list')}
            onSelectGym={handleOpenGymDetail}
          />
        )}

        {/* Gym Detail & Choose a Plan */}
        {currentView === 'gym-detail' && (
          <GymDetailView
            gym={selectedGym}
            onBack={() => setCurrentView('gym-list')}
            onSubscribe={(gymPlan) => handleStartCheckout(gymPlan, 'fitness')}
          />
        )}

        {/* Personal Trainer Profile */}
        {currentView === 'trainer-detail' && (
          <TrainerProfileView
            trainer={selectedTrainer}
            onBack={() => setCurrentView('food-list')}
            onBookTrainer={(trainer) => handleStartCheckout(trainer, 'fitness')}
          />
        )}

        {/* Manage My Subscriptions */}
        {currentView === 'manage-subs' && (
          <ManageSubscriptionsView
            onBack={() => setCurrentView('food-list')}
            onTrackDelivery={() => setCurrentView('delivery-tracking')}
            onSelectFoodPlan={handleOpenFoodDetail}
            onSelectTrainer={handleOpenTrainerProfile}
          />
        )}

        {/* Live Food Delivery Tracking */}
        {currentView === 'delivery-tracking' && (
          <DeliveryTrackingView
            onBack={() => setCurrentView('food-list')}
          />
        )}

        {/* Subscriptions Notifications */}
        {currentView === 'notifications' && (
          <NotificationsView
            onBack={() => setCurrentView('food-list')}
            onSelectNotification={(n) => {
              if (n.type === 'delivery') setCurrentView('delivery-tracking');
              else if (n.type === 'trainer') setCurrentView('trainer-detail');
              else if (n.type === 'gym') setCurrentView('gym-detail');
              else setCurrentView('manage-subs');
            }}
          />
        )}

        {/* Subscription Settings */}
        {currentView === 'settings' && (
          <SubscriptionSettingsView
            onBack={() => setCurrentView('food-list')}
          />
        )}
      </div>

      {/* VIEW 10: Booking / Checkout Sheet Modal */}
      {checkoutModal && (
        <BookingCheckoutModal
          item={checkoutModal.item}
          type={checkoutModal.type}
          onClose={() => setCheckoutModal(null)}
          onConfirmSuccess={handleCheckoutSuccess}
        />
      )}
    </div>
  );
}

export default SubscriptionsScreen;
