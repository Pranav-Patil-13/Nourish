import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  Bookmark,
  ScanBarcode,
  Tag,
  Image as ImageIcon,
  Zap,
  Camera,
  X,
  Plus,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import foodPlateImg from '../../assets/scanner_food_plate.jpg';
import barcodeImg from '../../assets/scanner_barcode_only.jpg';
import foodLabelImg from '../../assets/scanner_food_label.jpg';
import './ScannerScreen.css';

const SCAN_MODES = [
  {
    id: 'food',
    label: 'Scan Food',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3H5a2 2 0 0 0-2 2v2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <path d="M17 21h2a2 2 0 0 0 2-2v-2" />
        <path d="M12 8.5C10 6 7 7.5 7 10.5c0 3 5 5.5 5 5.5s5-2.5 5-5.5c0-3-3-4.5-5-2z" />
      </svg>
    )
  },
  {
    id: 'barcode',
    label: 'Barcode',
    icon: <ScanBarcode size={22} strokeWidth={1.9} />
  },
  {
    id: 'label',
    label: 'Food Label',
    icon: <Tag size={22} strokeWidth={1.9} />
  }
];

const MODE_DATA = {
  food: {
    id: 'food',
    label: 'Scan Food',
    image: foodPlateImg,
    shimmerTitle: 'Analyzing Nutrition...',
    shimmerLabels: ['Protein', 'Carbs', 'Fats'],
    result: {
      badge: 'Food Recognized',
      name: 'Grilled Herb Chicken & Rice',
      calories: 420,
      protein: '38g',
      carbs: '44g',
      fats: '9g',
      serving: '350g Serving',
      tags: ['Fresh Cooked', 'High Protein']
    }
  },
  barcode: {
    id: 'barcode',
    label: 'Barcode',
    image: barcodeImg,
    shimmerTitle: 'Reading Barcode & UPC...',
    shimmerLabels: ['Brand', 'Calories', 'Net Wt'],
    result: {
      badge: 'Barcode #812345678901',
      name: 'Daily Harvest Ancient Granola',
      calories: 220,
      protein: '6g',
      carbs: '32g',
      fats: '8g',
      serving: '1 Pack (340g)',
      tags: ['Organic', 'Ancient Grain']
    }
  },
  label: {
    id: 'label',
    label: 'Food Label',
    image: foodLabelImg,
    shimmerTitle: 'OCR Reading Nutrition Facts...',
    shimmerLabels: ['Serving', 'Calories', 'Macros'],
    result: {
      badge: 'Label OCR Verified',
      name: 'Almond Bliss Unsweetened Milk',
      calories: 45,
      protein: '2g',
      carbs: '2g',
      fats: '3g',
      serving: '1 Cup (240mL)',
      tags: ['Non-GMO', 'Dairy Free']
    }
  }
};

export function ScannerScreen({ onBack, onLogMeal }) {
  const [activeMode, setActiveMode] = useState('food');
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const scanTimerRef = useRef(null);

  const currentModeInfo = MODE_DATA[activeMode] || MODE_DATA.food;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    };
  }, []);

  const handleStartScan = () => {
    if (isScanning) return;
    
    setScanResult(null);
    setIsResultModalOpen(false);
    setIsScanning(true);

    // 3.5s scan duration
    scanTimerRef.current = setTimeout(() => {
      setIsScanning(false);
      setScanResult(currentModeInfo.result);
      setIsResultModalOpen(true);
    }, 3500);
  };

  const handleCancelScan = () => {
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    setIsScanning(false);
  };

  const handleResetScan = () => {
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    setScanResult(null);
    setIsResultModalOpen(false);
    setIsScanning(false);
  };

  const handleModeChange = (modeId) => {
    if (isScanning) return;
    setScanResult(null);
    setIsResultModalOpen(false);
    setActiveMode(modeId);
  };

  const handleConfirmLog = () => {
    if (onLogMeal && scanResult) {
      onLogMeal(scanResult);
    }
    setScanResult(null);
    setIsResultModalOpen(false);
    if (onBack) onBack();
  };

  return (
    <div className="scanner-screen">
      {/* 1. Top Header */}
      <header className="scanner-header">
        <button
          type="button"
          className="scanner-header-btn"
          onClick={onBack}
          aria-label="Back to dashboard"
        >
          <ChevronLeft size={22} strokeWidth={2} />
        </button>

        <h1 className="scanner-header-title">Scanner</h1>

        <button
          type="button"
          className={`scanner-header-btn ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={() => setIsBookmarked(!isBookmarked)}
          aria-label="Save scan"
        >
          <Bookmark size={20} strokeWidth={1.9} fill={isBookmarked ? '#18181B' : 'none'} />
        </button>
      </header>

      {/* 2. Main Scanner Viewfinder Area */}
      <div className="scanner-viewfinder-container">
        <div className={`scanner-viewfinder-frame mode-${activeMode}`}>
          {/* 4 Green Corner Brackets */}
          <div className="viewfinder-corner corner-top-left" />
          <div className="viewfinder-corner corner-top-right" />
          <div className="viewfinder-corner corner-bottom-left" />
          <div className="viewfinder-corner corner-bottom-right" />

          {/* Dynamic Target Media */}
          <div className="scanner-target-media">
            <img
              key={currentModeInfo.id}
              src={currentModeInfo.image}
              alt={currentModeInfo.label}
              className={`scanner-food-img img-${activeMode}`}
            />

            {/* Animated Laser Scan Line (hidden once scanning is done and result is shown) */}
            {!scanResult && (
              <div className={`scanner-laser-line ${isScanning ? 'is-scanning' : ''}`} />
            )}
          </div>
        </div>
      </div>

      {/* 3. Scan Modes OR Macro Shimmer/Resolved Preview Card */}
      {isScanning ? (
        <div className="scanner-macro-preview-card">
          <div className="macro-preview-header">
            <span className="macro-preview-pulse-dot" />
            <span className="macro-preview-title">{currentModeInfo.shimmerTitle}</span>
          </div>
          <div className="macro-preview-grid">
            {currentModeInfo.shimmerLabels.map((lbl, idx) => (
              <div key={idx} className="macro-preview-col">
                <span className="macro-preview-label">{lbl}</span>
                <div className="macro-preview-shimmer-bar skeleton-shimmer skeleton-shimmer-light" />
              </div>
            ))}
          </div>
        </div>
      ) : scanResult ? (
        <div className="scanner-macro-preview-card resolved">
          <div className="macro-preview-header">
            <div className="macro-preview-title-group">
              <span className="macro-preview-pulse-dot resolved-dot" />
              <span className="macro-preview-title">{scanResult.name}</span>
            </div>
            <button
              type="button"
              className="macro-preview-details-btn"
              onClick={() => setIsResultModalOpen(true)}
              aria-label="View full scan details"
            >
              <span>Full Info</span>
              <ChevronRight size={13} strokeWidth={2.2} />
            </button>
          </div>
          <div className="macro-preview-grid">
            <div className="macro-preview-col resolved-col">
              <span className="macro-preview-label">Protein</span>
              <span className="macro-preview-resolved-val">{scanResult.protein}</span>
            </div>
            <div className="macro-preview-col resolved-col">
              <span className="macro-preview-label">Carbs</span>
              <span className="macro-preview-resolved-val">{scanResult.carbs}</span>
            </div>
            <div className="macro-preview-col resolved-col">
              <span className="macro-preview-label">Fats</span>
              <span className="macro-preview-resolved-val">{scanResult.fats}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="scanner-modes-row">
          {SCAN_MODES.map((mode) => {
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                className={`scanner-mode-card ${isActive ? 'active' : ''}`}
                onClick={() => handleModeChange(mode.id)}
              >
                <div className="scanner-mode-icon-wrap">
                  {mode.icon}
                </div>
                <span className="scanner-mode-label">{mode.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 4. Bottom Camera Controls Row */}
      <div className="scanner-bottom-controls">
        {/* Gallery Button */}
        <button
          type="button"
          className="scanner-side-btn"
          title="Upload from gallery"
          aria-label="Gallery upload"
          disabled={isScanning}
        >
          <ImageIcon size={22} strokeWidth={1.9} />
        </button>

        {/* Center Shutter / Cancel Button */}
        <div className="scanner-shutter-ring">
          {isScanning ? (
            <button
              type="button"
              className="scanner-cancel-btn"
              onClick={handleCancelScan}
              aria-label="Cancel scan"
              title="Cancel scanning"
            >
              <X size={24} strokeWidth={2.4} color="#FFFFFF" />
            </button>
          ) : (
            <button
              type="button"
              className="scanner-shutter-btn"
              onClick={handleStartScan}
              aria-label="Capture and scan food"
              title={scanResult ? "Scan new food" : "Capture food"}
            >
              <Camera size={26} strokeWidth={2} color="#FFFFFF" />
            </button>
          )}
        </div>

        {/* Torch / Flashlight Toggle Button */}
        <button
          type="button"
          className={`scanner-side-btn ${isTorchOn ? 'torch-active' : ''}`}
          onClick={() => setIsTorchOn(!isTorchOn)}
          title="Toggle flashlight"
          aria-label="Toggle flashlight"
        >
          <Zap size={22} strokeWidth={1.9} fill={isTorchOn ? '#EAB308' : 'none'} color={isTorchOn ? '#CA8A04' : 'currentColor'} />
        </button>
      </div>

      {/* 5. Scan Result Recognition Modal */}
      {scanResult && isResultModalOpen && (
        <div 
          className="scan-result-modal-backdrop"
          onClick={() => setIsResultModalOpen(false)}
        >
          <div 
            className="scan-result-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="scan-result-header">
              <span className="scan-result-badge">
                <CheckCircle2 size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} />
                {scanResult.badge}
              </span>
              
              <div className="scan-result-title-row">
                <div className="scan-result-meta">
                  <h3 className="scan-result-name">{scanResult.name}</h3>
                  <div className="scan-result-subtext-row">
                    {scanResult.serving && (
                      <span className="scan-subtext-serving">{scanResult.serving}</span>
                    )}
                    {scanResult.tags && scanResult.tags.map((t, idx) => (
                      <span key={idx} className="scan-subtext-tag">{t}</span>
                    ))}
                  </div>
                </div>
                
                <div className="scan-result-cal-box">
                  <span className="scan-cal-val">+{scanResult.calories}</span>
                  <span className="scan-cal-unit">kcal</span>
                </div>
              </div>
            </div>

            <div className="scan-result-macros">
              <div className="result-macro-pill">
                <span className="macro-tag">Proteins</span>
                <span className="macro-val">{scanResult.protein}</span>
              </div>
              <div className="result-macro-pill">
                <span className="macro-tag">Carbs</span>
                <span className="macro-val">{scanResult.carbs}</span>
              </div>
              <div className="result-macro-pill">
                <span className="macro-tag">Fats</span>
                <span className="macro-val">{scanResult.fats}</span>
              </div>
            </div>

            <div className="scan-result-btn-row">
              <button
                type="button"
                className="scan-result-cancel"
                onClick={handleResetScan}
              >
                Scan Again
              </button>
              <button
                type="button"
                className="scan-result-confirm"
                onClick={handleConfirmLog}
              >
                <Plus size={16} strokeWidth={2.5} />
                <span>Log to Activity</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScannerScreen;
