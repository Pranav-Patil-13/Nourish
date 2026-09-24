import React, { useState } from 'react';
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
import { BottomNavBar } from '../DashboardScreen/BottomNavBar';
import { useBackHandler } from '../../context/BackNavigationContext';
import { FOOD_PLANS, GYM_LISTINGS, TRAINER_PROFILES } from './data/subscriptionsData';
import './SubscriptionsScreen.css';

export function SubscriptionsScreen({ onSelectTab, onOpenScanner }) {
  // Navigation stack view state
  const [currentView, setCurrentView] = useState('main'); // 'main' | 'food-list' | 'food-detail' | 'fitness-list' | 'gym-list' | 'gym-detail' | 'trainer-detail' | 'manage-subs' | 'delivery-tracking' | 'notifications' | 'settings'
  const [selectedFoodPlan, setSelectedFoodPlan] = useState(FOOD_PLANS[0]);
  const [selectedGym, setSelectedGym] = useState(GYM_LISTINGS[0]);
  const [selectedTrainer, setSelectedTrainer] = useState(TRAINER_PROFILES[0]);
  const [checkoutModal, setCheckoutModal] = useState(null); // { item, type: 'food' | 'fitness' }

  // Register Native Back Handler for Subscriptions subviews and checkout modal
  useBackHandler(() => {
    if (checkoutModal) {
      setCheckoutModal(null);
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
    if (currentView !== 'main') {
      setCurrentView('main');
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

  // Determine if bottom navigation bar should be visible (hidden on deep modal-like views e.g. delivery tracking or plan detail)
  const isFullScreenView = ['food-detail', 'gym-detail', 'trainer-detail', 'delivery-tracking'].includes(currentView);

  return (
    <div className="subscriptions-screen">
      <div className="sub-screen-content-wrapper">
        {/* VIEW 01: Subscriptions Main Hub */}
        {currentView === 'main' && (
          <SubscriptionsMainView
            onNavigate={(view) => setCurrentView(view)}
            activeCount={2}
            onOpenNotifications={() => setCurrentView('notifications')}
            onOpenSettings={() => setCurrentView('settings')}
          />
        )}

        {/* VIEW 02: Food Subscriptions Listing */}
        {currentView === 'food-list' && (
          <FoodSubscriptionsView
            onBack={() => setCurrentView('main')}
            onSelectPlan={handleOpenFoodDetail}
          />
        )}

        {/* VIEW 03 & 04: Food Plan Details & Sample Menu */}
        {currentView === 'food-detail' && (
          <FoodPlanDetailView
            plan={selectedFoodPlan}
            onBack={() => setCurrentView('food-list')}
            onSubscribe={(plan) => handleStartCheckout(plan, 'food')}
          />
        )}

        {/* VIEW 05: Fitness Subscriptions Hub */}
        {currentView === 'fitness-list' && (
          <FitnessSubscriptionsView
            onBack={() => setCurrentView('main')}
            onSelectCategory={handleFitnessCategorySelect}
          />
        )}

        {/* VIEW 06: Gym & Studio Directory Listing */}
        {currentView === 'gym-list' && (
          <GymListingView
            onBack={() => setCurrentView('fitness-list')}
            onSelectGym={handleOpenGymDetail}
          />
        )}

        {/* VIEW 07 & 08: Gym Detail & Choose a Plan */}
        {currentView === 'gym-detail' && (
          <GymDetailView
            gym={selectedGym}
            onBack={() => setCurrentView('gym-list')}
            onSubscribe={(gymPlan) => handleStartCheckout(gymPlan, 'fitness')}
          />
        )}

        {/* VIEW 09: Personal Trainer Profile */}
        {currentView === 'trainer-detail' && (
          <TrainerProfileView
            trainer={selectedTrainer}
            onBack={() => setCurrentView('fitness-list')}
            onBookTrainer={(trainer) => handleStartCheckout(trainer, 'fitness')}
          />
        )}

        {/* VIEW 11: Manage My Subscriptions */}
        {currentView === 'manage-subs' && (
          <ManageSubscriptionsView
            onBack={() => setCurrentView('main')}
            onTrackDelivery={() => setCurrentView('delivery-tracking')}
            onSelectFoodPlan={handleOpenFoodDetail}
            onSelectTrainer={handleOpenTrainerProfile}
          />
        )}

        {/* VIEW 12: Live Food Delivery Tracking */}
        {currentView === 'delivery-tracking' && (
          <DeliveryTrackingView
            onBack={() => setCurrentView('manage-subs')}
          />
        )}

        {/* VIEW 13: Subscriptions Notifications */}
        {currentView === 'notifications' && (
          <NotificationsView
            onBack={() => setCurrentView('main')}
            onSelectNotification={(n) => {
              if (n.type === 'delivery') setCurrentView('delivery-tracking');
              else if (n.type === 'trainer') setCurrentView('trainer-detail');
              else if (n.type === 'gym') setCurrentView('gym-detail');
              else setCurrentView('manage-subs');
            }}
          />
        )}

        {/* VIEW 14: Subscription Settings */}
        {currentView === 'settings' && (
          <SubscriptionSettingsView
            onBack={() => setCurrentView('main')}
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

      {/* Floating Bottom Navigation Bar (Active Tab: Subscriptions) */}
      {!isFullScreenView && (
        <BottomNavBar
          activeTabId="subscriptions"
          onSelectTab={onSelectTab}
          onOpenScanner={onOpenScanner}
        />
      )}
    </div>
  );
}

export default SubscriptionsScreen;
