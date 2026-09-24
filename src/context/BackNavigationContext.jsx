import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';

const BackNavigationContext = createContext({
  registerHandler: () => () => {},
  triggerBack: () => false,
});

export function BackNavigationProvider({ children, onRootBack }) {
  const handlersRef = useRef([]);

  const registerHandler = useCallback((handlerFn, priority = 0) => {
    const handlerObj = { handlerFn, priority, id: Math.random().toString(36).substring(2, 9) };
    handlersRef.current.push(handlerObj);
    // Sort descending by priority (higher priority runs first)
    handlersRef.current.sort((a, b) => b.priority - a.priority);

    return () => {
      handlersRef.current = handlersRef.current.filter((h) => h.id !== handlerObj.id);
    };
  }, []);

  const triggerBack = useCallback(() => {
    // Clone array to prevent issues during unregistration
    const activeHandlers = [...handlersRef.current];
    for (let i = 0; i < activeHandlers.length; i++) {
      try {
        const handled = activeHandlers[i].handlerFn();
        if (handled) {
          return true;
        }
      } catch (err) {
        console.error('Error executing back handler:', err);
      }
    }

    if (onRootBack) {
      return onRootBack();
    }
    return false;
  }, [onRootBack]);

  // Global listeners for Android hardware back button, browser popstate, and Escape key
  useEffect(() => {
    let backListener = null;

    if (Capacitor.isNativePlatform() || Capacitor.getPlatform() === 'android') {
      CapApp.addListener('backButton', () => {
        triggerBack();
      }).then((handle) => {
        backListener = handle;
      });
    }

    const handlePopState = () => {
      triggerBack();
    };
    window.addEventListener('popstate', handlePopState);

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'Escape') {
        triggerBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (backListener && typeof backListener.remove === 'function') {
        backListener.remove();
      }
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [triggerBack]);

  return (
    <BackNavigationContext.Provider value={{ registerHandler, triggerBack }}>
      {children}
    </BackNavigationContext.Provider>
  );
}

/**
 * Custom hook to register a back button handler for a specific screen, subview, or modal.
 * @param {Function} handlerCallback - Function that returns true if it handled back, false if unhandled.
 * @param {boolean} isActive - Whether this handler is currently active.
 * @param {number} priority - Higher priority runs first (e.g. modals = 20, subviews = 10, screen = 0).
 */
export function useBackHandler(handlerCallback, isActive = true, priority = 0) {
  const { registerHandler } = useContext(BackNavigationContext);
  const handlerRef = useRef(handlerCallback);

  useEffect(() => {
    handlerRef.current = handlerCallback;
  }, [handlerCallback]);

  useEffect(() => {
    if (!isActive) return;
    const unregister = registerHandler(() => {
      if (handlerRef.current) {
        return handlerRef.current();
      }
      return false;
    }, priority);

    return unregister;
  }, [registerHandler, isActive, priority]);
}
