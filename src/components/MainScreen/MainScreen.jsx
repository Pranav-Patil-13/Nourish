import React, { useState, useRef, useEffect } from 'react';
import bowlSalad from '../../assets/bowl_salad.png';
import { GlassSlider } from './GlassSlider';
import { OnboardingGoalView } from './OnboardingGoalView';
import { OnboardingAboutYouView } from './OnboardingAboutYouView';
import { OnboardingPlanView } from './OnboardingPlanView';
import './MainScreen.css';

export function MainScreen({ onScreenDismiss, isPushedLeft }) {
  const containerRef = useRef(null);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [stepDirection, setStepDirection] = useState('forward');
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Explicit stages: 0 = active, 1 = slider collapses, 2 = salad bowl slides down, 3 = text lines slide down
  const [exitStage, setExitStage] = useState(0);

  const lines = [
    { text: 'Eating', isLarge: true },
    { text: 'is easy.', isLarge: false },
    { text: 'Tracking', isLarge: true },
    { text: 'should be too.', isLarge: false },
  ];

  const goToStep = (step) => {
    setStepDirection(step > onboardingStep ? 'forward' : 'backward');
    setOnboardingStep(step);
  };

  const handleSliderComplete = () => {
    // 1. Initial pause for "Welcome!" text
    setTimeout(() => {
      setExitStage(1); // Stage 1: Slider collapses

      // 2. After slider is gone, slide bowl down
      setTimeout(() => {
        setExitStage(2); // Stage 2: Salad bowl slides down

        // 3. After bowl is moving down, reverse animate text
        setTimeout(() => {
          setExitStage(3); // Stage 3: Text lines slide down
          
          // Switch to Onboarding Step 2: Goal Selection
          setTimeout(() => {
            goToStep(2);
            setExitStage(0);
          }, 380);
        }, 420);
      }, 480);
    }, 900);
  };

  // Subtle 3D tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current || exitStage > 0 || isPushedLeft) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    const maxTilt = 4.5;
    const maxShift = 4;

    setTilt({
      rotateX: -normY * maxTilt,
      rotateY: normX * maxTilt,
      translateX: normX * maxShift,
      translateY: normY * (maxShift * 0.6),
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 });
  };

  useEffect(() => {
    const handleDeviceOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null && exitStage === 0 && !isPushedLeft) {
        const tiltX = Math.min(5, Math.max(-5, (e.beta - 45) * 0.15));
        const tiltY = Math.min(5, Math.max(-5, e.gamma * 0.15));
        setTilt({
          rotateX: -tiltX,
          rotateY: tiltY,
          translateX: tiltY * 0.4,
          translateY: tiltX * 0.3,
        });
        setIsHovered(true);
      }
    };

    window.addEventListener('deviceorientation', handleDeviceOrientation);
    return () => window.removeEventListener('deviceorientation', handleDeviceOrientation);
  }, [exitStage, isPushedLeft]);

  return (
    <div className="onboarding-root-container">
      {onboardingStep === 1 && (
        <div
          key="step-1"
          className={`onboarding-step-wrapper step-anim-${stepDirection}`}
        >
          <div
            ref={containerRef}
            className={`main-gradient-screen exit-stage-${exitStage} ${isPushedLeft ? 'main-screen-pushed-left' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <header className="hero-text-container">
              <h1 className="cinematic-headline">
                {lines.map((item, index) => {
                  const exitDelay = (lines.length - 1 - index) * 0.08;
                  const enterDelay = 0.15 + index * 0.14;

                  return (
                    <span
                      key={index}
                      className={`line-mask ${item.isLarge ? 'line-large' : 'line-sub'}`}
                    >
                      <span
                        className="line-inner"
                        style={{
                          animationDelay: exitStage >= 3 ? `${exitDelay}s` : `${enterDelay}s`,
                        }}
                      >
                        {item.text}
                      </span>
                    </span>
                  );
                })}
              </h1>
            </header>

            {/* Salad Bowl Perspective Container */}
            <div className="salad-bowl-perspective-container">
              <div className={`salad-bowl-wrapper ${exitStage >= 2 ? 'salad-bowl-exiting' : ''}`}>
                <div
                  className={`salad-bowl-tilter ${isHovered && exitStage === 0 ? 'tilt-active' : 'tilt-resting'}`}
                  style={{
                    transform: exitStage === 0
                      ? `perspective(1200px) translate3d(${tilt.translateX}px, ${tilt.translateY}px, 0px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
                      : 'none',
                  }}
                >
                  <img
                    src={bowlSalad}
                    alt="Fresh Salad Bowl"
                    className="salad-bowl-img"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Center Glassy Get Started Slider */}
            <div className={`bottom-slider-container ${exitStage >= 1 ? 'slider-exiting' : ''}`}>
              <GlassSlider onComplete={handleSliderComplete} />
            </div>
          </div>
        </div>
      )}

      {onboardingStep === 2 && (
        <div
          key="step-2"
          className={`onboarding-step-wrapper step-anim-${stepDirection}`}
        >
          <OnboardingGoalView
            onBack={() => goToStep(1)}
            onNext={() => goToStep(3)}
          />
        </div>
      )}

      {onboardingStep === 3 && (
        <div
          key="step-3"
          className={`onboarding-step-wrapper step-anim-${stepDirection}`}
        >
          <OnboardingAboutYouView
            onBack={() => goToStep(2)}
            onNext={() => goToStep(4)}
          />
        </div>
      )}

      {onboardingStep === 4 && (
        <div
          key="step-4"
          className={`onboarding-step-wrapper step-anim-${stepDirection}`}
        >
          <OnboardingPlanView
            onBack={() => goToStep(3)}
            onNext={onScreenDismiss}
          />
        </div>
      )}
    </div>
  );
}

export default MainScreen;
