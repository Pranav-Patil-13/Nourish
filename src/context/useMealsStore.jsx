import React, { useState, useMemo, useEffect } from 'react';
import { MealsContext } from './MealsContext';

const INITIAL_MEALS = {
  breakfast: [
    {
      id: 'bf-1',
      name: 'Oats',
      serving: '1 bowl',
      quantity: 1,
      unitType: 'servings',
      emoji: '🥣',
      baseCalories: 150,
      baseProtein: 5,
      baseCarbs: 27,
      baseFats: 3,
      calories: 150,
      protein: '5g',
      carbs: '27g',
      fats: '3g',
      time: '8:00 AM'
    },
    {
      id: 'bf-2',
      name: 'Banana',
      serving: '1 medium',
      quantity: 1,
      unitType: 'pieces',
      emoji: '🍌',
      baseCalories: 105,
      baseProtein: 1,
      baseCarbs: 27,
      baseFats: 0,
      calories: 105,
      protein: '1g',
      carbs: '27g',
      fats: '0g',
      time: '8:15 AM'
    }
  ],
  lunch: [
    {
      id: 'lu-1',
      name: 'Rice',
      serving: '1 bowl',
      quantity: 1,
      unitType: 'servings',
      emoji: '🍚',
      baseCalories: 200,
      baseProtein: 4,
      baseCarbs: 45,
      baseFats: 1,
      calories: 200,
      protein: '4g',
      carbs: '45g',
      fats: '1g',
      time: '1:00 PM'
    },
    {
      id: 'lu-2',
      name: 'Grilled Chicken',
      serving: '100 g',
      quantity: 100,
      unitType: 'grams',
      emoji: '🍗',
      baseCalories: 165,
      baseProtein: 31,
      baseCarbs: 0,
      baseFats: 4,
      calories: 165,
      protein: '31g',
      carbs: '0g',
      fats: '4g',
      time: '1:15 PM'
    }
  ],
  dinner: [
    {
      id: 'di-1',
      name: 'Chapati',
      serving: '2 pcs',
      quantity: 2,
      unitType: 'pieces',
      emoji: '🫓',
      baseCalories: 70, // per pc
      baseProtein: 2,
      baseCarbs: 14,
      baseFats: 1,
      calories: 140,
      protein: '4g',
      carbs: '28g',
      fats: '2g',
      time: '8:00 PM'
    },
    {
      id: 'di-2',
      name: 'Pan-Seared Salmon',
      serving: '1 Fillet (200g)',
      quantity: 1,
      unitType: 'servings',
      emoji: '🐟',
      baseCalories: 340,
      baseProtein: 34,
      baseCarbs: 0,
      baseFats: 20,
      calories: 340,
      protein: '34g',
      carbs: '0g',
      fats: '20g',
      time: '8:20 PM'
    }
  ],
  snacks: [
    {
      id: 'sn-1',
      name: 'Greek Yogurt & Berries',
      serving: '1 Cup (170g)',
      quantity: 1,
      unitType: 'servings',
      emoji: '🫐',
      baseCalories: 150,
      baseProtein: 15,
      baseCarbs: 16,
      baseFats: 2,
      calories: 150,
      protein: '15g',
      carbs: '16g',
      fats: '2g',
      time: '4:30 PM'
    },
    {
      id: 'sn-2',
      name: 'Roasted Almonds',
      serving: 'Handful (28g)',
      quantity: 1,
      unitType: 'servings',
      emoji: '🥜',
      baseCalories: 160,
      baseProtein: 6,
      baseCarbs: 6,
      baseFats: 14,
      calories: 160,
      protein: '6g',
      carbs: '6g',
      fats: '14g',
      time: '5:00 PM'
    }
  ]
};

export function MealsProvider({ children }) {
  const [meals, setMeals] = useState(() => {
    try {
      const saved = localStorage.getItem('nourish_meals_data');
      return saved ? JSON.parse(saved) : INITIAL_MEALS;
    } catch {
      return INITIAL_MEALS;
    }
  });

  const [waterIntake, setWaterIntake] = useState(() => {
    try {
      const saved = localStorage.getItem('nourish_water_intake');
      return saved ? parseInt(saved, 10) : 1750;
    } catch {
      return 1750;
    }
  });

  const waterGoal = 2500;
  const calorieGoal = 2400;

  useEffect(() => {
    localStorage.setItem('nourish_meals_data', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('nourish_water_intake', String(waterIntake));
  }, [waterIntake]);

  const addMeal = (category, mealData) => {
    const p = parseInt(mealData.protein, 10) || 10;
    const c = parseInt(mealData.carbs, 10) || 15;
    const f = parseInt(mealData.fats, 10) || 5;
    const cal = Number(mealData.calories) || 200;

    const newMeal = {
      id: `meal-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quantity: mealData.quantity || 1,
      unitType: mealData.unitType || 'servings',
      baseCalories: cal,
      baseProtein: p,
      baseCarbs: c,
      baseFats: f,
      ...mealData
    };

    setMeals((prev) => ({
      ...prev,
      [category]: [newMeal, ...(prev[category] || [])]
    }));
  };

  const updateMealPortion = (category, mealId, updatedData) => {
    setMeals((prev) => ({
      ...prev,
      [category]: (prev[category] || []).map((item) => {
        if (item.id === mealId) {
          return { ...item, ...updatedData };
        }
        return item;
      })
    }));
  };

  const deleteMeal = (category, mealId) => {
    setMeals((prev) => ({
      ...prev,
      [category]: (prev[category] || []).filter((m) => m.id !== mealId)
    }));
  };

  const addWater = (amount) => {
    setWaterIntake((prev) => Math.max(0, Math.min(5000, prev + amount)));
  };

  const logFromScanner = (scanResult) => {
    if (!scanResult) return;
    const p = parseInt(scanResult.protein, 10) || 20;
    const c = parseInt(scanResult.carbs, 10) || 30;
    const f = parseInt(scanResult.fats, 10) || 10;
    const cal = typeof scanResult.calories === 'number' ? scanResult.calories : 350;
    const multiplier = scanResult.multiplier || 1.0;

    const finalCal = Math.round(cal * multiplier);
    const finalP = Math.round(p * multiplier);
    const finalC = Math.round(c * multiplier);
    const finalF = Math.round(f * multiplier);

    const mealItem = {
      name: scanResult.name || 'Scanned Food',
      serving: multiplier === 1.0 ? (scanResult.serving || '1 Serving') : `${multiplier}x (${scanResult.serving || 'Serving'})`,
      quantity: multiplier,
      unitType: 'servings',
      baseCalories: cal,
      baseProtein: p,
      baseCarbs: c,
      baseFats: f,
      calories: finalCal,
      protein: `${finalP}g`,
      carbs: `${finalC}g`,
      fats: `${finalF}g`
    };

    const hour = new Date().getHours();
    let defaultCat = 'lunch';
    if (hour < 11) defaultCat = 'breakfast';
    else if (hour < 16) defaultCat = 'lunch';
    else if (hour < 21) defaultCat = 'dinner';
    else defaultCat = 'snacks';

    addMeal(defaultCat, mealItem);
  };

  const totals = useMemo(() => {
    let cal = 0;
    let proteinGrams = 0;
    let carbsGrams = 0;
    let fatsGrams = 0;

    Object.values(meals).forEach((list) => {
      list.forEach((item) => {
        cal += Number(item.calories) || 0;
        proteinGrams += parseInt(item.protein, 10) || 0;
        carbsGrams += parseInt(item.carbs, 10) || 0;
        fatsGrams += parseInt(item.fats, 10) || 0;
      });
    });

    return {
      calories: cal,
      caloriesRemaining: Math.max(0, calorieGoal - cal),
      protein: proteinGrams,
      carbs: carbsGrams,
      fats: fatsGrams,
      calorieGoal,
      waterIntake,
      waterGoal
    };
  }, [meals, calorieGoal, waterIntake, waterGoal]);

  const value = {
    meals,
    addMeal,
    updateMealPortion,
    deleteMeal,
    waterIntake,
    waterGoal,
    addWater,
    logFromScanner,
    totals
  };

  return <MealsContext.Provider value={value}>{children}</MealsContext.Provider>;
}
