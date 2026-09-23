import React, { useState, useEffect } from 'react';
import { Wifi } from 'lucide-react';
import './MobileFrame.css';

export function MobileFrame({ children }) {
  const [timeStr, setTimeStr] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      // Format 12-hour or 24-hour cleanly without AM/PM
      if (hours > 12) hours -= 12;
      if (hours === 0) hours = 12;
      setTimeStr(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="phone-wrapper">
      <div className="phone-border">
        {/* Dynamic Island / Top Notch */}
        <div className="phone-notch" />

        {/* Top Status Bar */}
        <div className="phone-status-bar">
          <div className="status-time">{timeStr}</div>

          <div className="status-icons">
            {/* Cellular Signal Bars */}
            <div className="status-cellular" aria-label="Cellular Signal">
              <span className="cell-bar bar-1" />
              <span className="cell-bar bar-2" />
              <span className="cell-bar bar-3" />
              <span className="cell-bar bar-4" />
            </div>

            {/* Wi-Fi Icon */}
            <Wifi size={14} strokeWidth={2.5} className="status-wifi" />

            {/* Battery Icon */}
            <div className="status-battery" aria-label="Battery 100%">
              <div className="battery-body">
                <div className="battery-level" />
              </div>
              <div className="battery-cap" />
            </div>
          </div>
        </div>
        
        {/* Main Phone Screen */}
        <div className="phone-screen">
          {children}
        </div>

        {/* Bottom Home Indicator */}
        <div className="phone-home-indicator" />
      </div>
    </div>
  );
}

export default MobileFrame;
