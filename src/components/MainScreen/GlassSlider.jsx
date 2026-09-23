import React, { useState, useRef, useEffect } from 'react';
import { ChevronsRight, Check } from 'lucide-react';
import './GlassSlider.css';

export function GlassSlider({ onComplete }) {
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const trackRef = useRef(null);
  const startXRef = useRef(0);

  const handlePointerDown = (e) => {
    if (isCompleted) return;
    setIsDragging(true);
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging || !trackRef.current || isCompleted) return;

      const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const trackRect = trackRef.current.getBoundingClientRect();
      const knobSize = 52;
      const maxDragDistance = trackRect.width - knobSize - 12;

      const deltaX = currentX - startXRef.current;
      const newProgress = Math.max(0, Math.min(1, deltaX / maxDragDistance));
      setDragProgress(newProgress);

      if (newProgress >= 0.88) {
        setIsCompleted(true);
        setIsDragging(false);
        setDragProgress(1);
        if (onComplete) onComplete();
      }
    };

    const handlePointerUp = () => {
      if (!isDragging || isCompleted) return;
      setIsDragging(false);
      setDragProgress(0);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, isCompleted, onComplete]);

  const maxDistance = trackRef.current
    ? trackRef.current.offsetWidth - 52 - 12
    : 220;

  const currentTranslateX = dragProgress * maxDistance;

  return (
    <div
      ref={trackRef}
      className={`glass-slider-track ${isCompleted ? 'slider-completed' : ''}`}
    >
      {/* Sliding Active Knob */}
      <div
        className={`slider-knob ${isDragging ? 'knob-dragging' : ''} ${isCompleted ? 'knob-completed' : ''}`}
        style={{
          transform: `translateX(${currentTranslateX}px)`,
        }}
        onPointerDown={handlePointerDown}
      >
        {isCompleted ? (
          <Check size={22} className="knob-icon" strokeWidth={2.6} />
        ) : (
          <ChevronsRight size={22} className="knob-icon" strokeWidth={2.4} />
        )}
      </div>

      {/* Center Label (Full 100% opacity when completed) */}
      <span
        className={`slider-label ${isCompleted ? 'label-completed' : ''}`}
        style={{
          opacity: isCompleted ? 1 : Math.max(0, 1 - dragProgress * 2),
        }}
      >
        {isCompleted ? 'Welcome!' : 'Get Started'}
      </span>

      {/* Target Checkmark Badge */}
      <div className={`slider-target ${isCompleted || dragProgress > 0.85 ? 'target-active' : ''}`}>
        <Check size={18} className="target-icon" strokeWidth={2.5} />
      </div>
    </div>
  );
}

export default GlassSlider;
