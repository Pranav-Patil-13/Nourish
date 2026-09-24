import React, { useState, useMemo } from 'react';
import { X, Check, Trash2, Sliders, Scale, Layers } from 'lucide-react';
import './PortionModal.css';

const MULTIPLIER_PRESETS = [
  { label: '0.5x (Half)', value: 0.5 },
  { label: '1.0x (Regular)', value: 1.0 },
  { label: '1.5x', value: 1.5 },
  { label: '2.0x (Double)', value: 2.0 }
];

function PortionModalDialog({
  meal,
  category,
  onClose,
  onUpdatePortion,
  onDeleteMeal
}) {
  // Determine initial mode
  const initialMode = meal.unitType === 'pieces' ? 'pieces' : meal.unitType === 'grams' ? 'grams' : 'multiplier';
  const [activeUnitMode, setActiveUnitMode] = useState(initialMode);

  // Initial values
  const [multiplier, setMultiplier] = useState(1.0);
  const [pieces, setPieces] = useState(meal.unitType === 'pieces' && meal.quantity ? meal.quantity : 1);
  const [grams, setGrams] = useState(meal.unitType === 'grams' && meal.quantity ? meal.quantity : 200);

  // Base values per 1 piece / per 100g / per 1 serving
  const baseCal = meal.baseCalories || meal.calories || 200;
  const baseP = typeof meal.baseProtein === 'number' ? meal.baseProtein : (parseInt(meal.protein, 10) || 10);
  const baseC = typeof meal.baseCarbs === 'number' ? meal.baseCarbs : (parseInt(meal.carbs, 10) || 15);
  const baseF = typeof meal.baseFats === 'number' ? meal.baseFats : (parseInt(meal.fats, 10) || 5);

  // Computed Live Metrics
  const calculatedMacros = useMemo(() => {
    let cal = baseCal;
    let p = baseP;
    let c = baseC;
    let f = baseF;
    let servingLabel = '';

    if (activeUnitMode === 'multiplier') {
      cal = Math.round(baseCal * multiplier);
      p = Math.round(baseP * multiplier);
      c = Math.round(baseC * multiplier);
      f = Math.round(baseF * multiplier);
      servingLabel = multiplier === 1.0 ? (meal.serving || '1 Serving') : `${multiplier}x Serving`;
    } else if (activeUnitMode === 'pieces') {
      const singlePieceCal = meal.unitType === 'pieces' ? baseCal : Math.round(baseCal / Math.max(1, meal.quantity || 1));
      const singleP = meal.unitType === 'pieces' ? baseP : Math.round(baseP / Math.max(1, meal.quantity || 1));
      const singleC = meal.unitType === 'pieces' ? baseC : Math.round(baseC / Math.max(1, meal.quantity || 1));
      const singleF = meal.unitType === 'pieces' ? baseF : Math.round(baseF / Math.max(1, meal.quantity || 1));

      cal = Math.round(singlePieceCal * pieces);
      p = Math.round(singleP * pieces);
      c = Math.round(singleC * pieces);
      f = Math.round(singleF * pieces);
      servingLabel = `${pieces} ${pieces === 1 ? 'Piece' : 'Pieces'}`;
    } else if (activeUnitMode === 'grams') {
      // Grams based (base is per 100g or total)
      const perGramCal = baseCal / 100;
      const perGramP = baseP / 100;
      const perGramC = baseC / 100;
      const perGramF = baseF / 100;

      cal = Math.round(perGramCal * grams);
      p = Math.round(perGramP * grams);
      c = Math.round(perGramC * grams);
      f = Math.round(perGramF * grams);
      servingLabel = `${grams}g Portion`;
    }

    return {
      calories: Math.max(0, cal),
      protein: `${Math.max(0, p)}g`,
      carbs: `${Math.max(0, c)}g`,
      fats: `${Math.max(0, f)}g`,
      serving: servingLabel
    };
  }, [activeUnitMode, multiplier, pieces, grams, baseCal, baseP, baseC, baseF, meal]);

  const handleSave = () => {
    let finalQty = 1;
    if (activeUnitMode === 'pieces') finalQty = pieces;
    else if (activeUnitMode === 'grams') finalQty = grams;
    else finalQty = multiplier;

    onUpdatePortion(category, meal.id, {
      calories: calculatedMacros.calories,
      protein: calculatedMacros.protein,
      carbs: calculatedMacros.carbs,
      fats: calculatedMacros.fats,
      serving: calculatedMacros.serving,
      quantity: finalQty,
      unitType: activeUnitMode === 'pieces' ? 'pieces' : activeUnitMode === 'grams' ? 'grams' : 'servings'
    });

    onClose();
  };

  const handleDelete = () => {
    onDeleteMeal(category, meal.id);
    onClose();
  };

  return (
    <>
      <div className="portion-modal-backdrop" onClick={onClose} />
      <div className="portion-modal" role="dialog" aria-modal="true">
        {/* Header */}
        <div className="portion-modal-header">
          <div>
            <span className="portion-category-tag">{category.toUpperCase()}</span>
            <h3 className="portion-food-name">{meal.name}</h3>
          </div>
          <button
            type="button"
            className="portion-close-btn"
            onClick={onClose}
            aria-label="Close portion editor"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Live Macro Summary Hero Card */}
        <div className="portion-macro-hero">
          <div className="portion-cal-display">
            <span className="portion-cal-number">{calculatedMacros.calories}</span>
            <span className="portion-cal-unit">kcal</span>
          </div>
          <span className="portion-serving-pill">{calculatedMacros.serving}</span>

          <div className="portion-macro-pills-row">
            <div className="portion-macro-pill p-pill">
              <span className="macro-title">Protein</span>
              <span className="macro-val">{calculatedMacros.protein}</span>
            </div>
            <div className="portion-macro-pill c-pill">
              <span className="macro-title">Carbs</span>
              <span className="macro-val">{calculatedMacros.carbs}</span>
            </div>
            <div className="portion-macro-pill f-pill">
              <span className="macro-title">Fats</span>
              <span className="macro-val">{calculatedMacros.fats}</span>
            </div>
          </div>
        </div>

        {/* Unit Mode Selector Tabs */}
        <div className="portion-mode-tabs" role="tablist">
          <button
            type="button"
            className={`portion-mode-tab ${activeUnitMode === 'multiplier' ? 'active' : ''}`}
            onClick={() => setActiveUnitMode('multiplier')}
          >
            <Sliders size={14} />
            <span>Serving (x)</span>
          </button>
          <button
            type="button"
            className={`portion-mode-tab ${activeUnitMode === 'pieces' ? 'active' : ''}`}
            onClick={() => setActiveUnitMode('pieces')}
          >
            <Layers size={14} />
            <span>Pieces (pcs)</span>
          </button>
          <button
            type="button"
            className={`portion-mode-tab ${activeUnitMode === 'grams' ? 'active' : ''}`}
            onClick={() => setActiveUnitMode('grams')}
          >
            <Scale size={14} />
            <span>Weight (g)</span>
          </button>
        </div>

        {/* Mode 1: Multiplier Mode */}
        {activeUnitMode === 'multiplier' && (
          <div className="portion-controls-section">
            <div className="portion-presets-grid">
              {MULTIPLIER_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`portion-preset-pill ${multiplier === p.value ? 'active' : ''}`}
                  onClick={() => setMultiplier(p.value)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="portion-stepper-row">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => setMultiplier((m) => Math.max(0.25, parseFloat((m - 0.25).toFixed(2))))}
                aria-label="Decrease portion"
              >
                -
              </button>
              <div className="stepper-value-box">
                <span className="stepper-number">{multiplier.toFixed(2)}x</span>
                <span className="stepper-subtext">Multiplier</span>
              </div>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => setMultiplier((m) => Math.min(5.0, parseFloat((m + 0.25).toFixed(2))))}
                aria-label="Increase portion"
              >
                +
              </button>
            </div>

            <input
              type="range"
              min="0.25"
              max="4.0"
              step="0.05"
              value={multiplier}
              onChange={(e) => setMultiplier(parseFloat(e.target.value))}
              className="portion-range-slider"
            />
          </div>
        )}

        {/* Mode 2: Pieces / Units Mode */}
        {activeUnitMode === 'pieces' && (
          <div className="portion-controls-section">
            <div className="portion-stepper-row">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => setPieces((p) => Math.max(1, p - 1))}
                aria-label="Decrease piece"
              >
                -
              </button>
              <div className="stepper-value-box">
                <span className="stepper-number">{pieces}</span>
                <span className="stepper-subtext">Pieces / Units</span>
              </div>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => setPieces((p) => Math.min(30, p + 1))}
                aria-label="Increase piece"
              >
                +
              </button>
            </div>

            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={pieces}
              onChange={(e) => setPieces(parseInt(e.target.value, 10))}
              className="portion-range-slider"
            />
          </div>
        )}

        {/* Mode 3: Weight (Grams) Mode */}
        {activeUnitMode === 'grams' && (
          <div className="portion-controls-section">
            <div className="portion-stepper-row">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => setGrams((g) => Math.max(25, g - 25))}
                aria-label="Decrease 25g"
              >
                -25g
              </button>
              <div className="stepper-value-box">
                <span className="stepper-number">{grams}g</span>
                <span className="stepper-subtext">Exact Weight</span>
              </div>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => setGrams((g) => Math.min(1200, g + 25))}
                aria-label="Increase 25g"
              >
                +25g
              </button>
            </div>

            <input
              type="range"
              min="25"
              max="800"
              step="25"
              value={grams}
              onChange={(e) => setGrams(parseInt(e.target.value, 10))}
              className="portion-range-slider"
            />
          </div>
        )}

        {/* Bottom Actions */}
        <div className="portion-action-row">
          <button
            type="button"
            className="portion-delete-btn"
            onClick={handleDelete}
          >
            <Trash2 size={16} />
            <span>Remove</span>
          </button>
          <button
            type="button"
            className="portion-save-btn"
            onClick={handleSave}
          >
            <Check size={18} strokeWidth={2.4} />
            <span>Update Meal</span>
          </button>
        </div>
      </div>
    </>
  );
}

export function PortionModal({
  isOpen,
  meal,
  category,
  onClose,
  onUpdatePortion,
  onDeleteMeal
}) {
  if (!isOpen || !meal) return null;

  return (
    <PortionModalDialog
      meal={meal}
      category={category}
      onClose={onClose}
      onUpdatePortion={onUpdatePortion}
      onDeleteMeal={onDeleteMeal}
    />
  );
}

export default PortionModal;
