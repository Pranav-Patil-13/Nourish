import React, { useState, useRef, useMemo, useEffect } from 'react';
import './DateSlider.css';

const ITEM_WIDTH = 36;
const ITEM_GAP = 13;
const ITEM_STRIDE = ITEM_WIDTH + ITEM_GAP; // 49px
const DAYS_LOOKAROUND = 30; // 30 days before and after today (61 total)
const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function DateSlider() {
  const trackRef = useRef(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Generate real calendar dates centered around today
  const daysList = useMemo(() => {
    const list = [];
    const today = new Date();

    for (let i = -DAYS_LOOKAROUND; i <= DAYS_LOOKAROUND; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      list.push({
        index: i + DAYS_LOOKAROUND,
        offset: i,
        day: DAY_LETTERS[d.getDay()],
        date: String(d.getDate()).padStart(2, '0'),
        month: d.toLocaleString('default', { month: 'short' }),
        year: d.getFullYear(),
        isToday: i === 0,
        rawDate: d
      });
    }
    return list;
  }, []);

  // Default to today (index = DAYS_LOOKAROUND)
  const [selectedIndex, setSelectedIndex] = useState(DAYS_LOOKAROUND);

  // Center today's date on initial mount
  useEffect(() => {
    if (trackRef.current) {
      isProgrammaticScrollRef.current = true;
      trackRef.current.scrollLeft = DAYS_LOOKAROUND * ITEM_STRIDE;
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 50);
    }
  }, []);

  // Click on a date: smoothly slide it to the center
  const scrollToDate = (index) => {
    if (!trackRef.current) return;
    isProgrammaticScrollRef.current = true;
    setSelectedIndex(index);

    trackRef.current.scrollTo({
      left: index * ITEM_STRIDE,
      behavior: 'smooth'
    });

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 400);
  };

  // Sync selected index when dragging / scrolling
  const handleScroll = () => {
    if (!trackRef.current || isProgrammaticScrollRef.current) return;
    const { scrollLeft } = trackRef.current;
    const nearestIndex = Math.round(scrollLeft / ITEM_STRIDE);
    const clampedIndex = Math.max(0, Math.min(daysList.length - 1, nearestIndex));

    if (clampedIndex !== selectedIndex) {
      setSelectedIndex(clampedIndex);
    }
  };

  return (
    <div className="date-slider-container">
      {/* Fixed Center Active Selector Capsule */}
      <div className="date-center-capsule" aria-hidden="true" />

      {/* Scrollable Real Calendar Track */}
      <div
        className="date-slider-track"
        ref={trackRef}
        onScroll={handleScroll}
      >
        {daysList.map((item) => {
          const isSelected = item.index === selectedIndex;

          return (
            <button
              key={item.index}
              type="button"
              className={`date-item ${isSelected ? 'date-item-active' : ''}`}
              onClick={() => scrollToDate(item.index)}
              aria-label={`${item.day} ${item.date} ${item.month}`}
            >
              <span className="date-day-label">{item.day}</span>
              <span className="date-number">{item.date}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DateSlider;
