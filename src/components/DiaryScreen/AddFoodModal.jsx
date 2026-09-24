import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Camera,
  Image as ImageIcon,
  Plus,
  ArrowLeft,
  ChevronDown,
  Minus
} from 'lucide-react';
import bowlSaladImg from '../../assets/bowl_salad.png';
import scannerFoodPlateImg from '../../assets/scanner_food_plate.jpg';
import foodSalmonImg from '../../assets/food_salmon.jpg';
import foodSmoothieImg from '../../assets/food_smoothie.jpg';
import './AddFoodModal.css';

// Rich food database with categories, macros, units, and images/emojis
const FOOD_DATABASE = [
  // 1. Oats & Grains Varieties
  {
    id: 'oats-main',
    name: 'Oats',
    shortName: 'Oats',
    shortServing: '1 bowl',
    category: 'Grains',
    filterType: 'All',
    baseCalories: 150,
    baseCarbs: 27,
    baseProtein: 5,
    baseFat: 3,
    servingUnit: 'bowl (40 g)',
    unitWeightGrams: 40,
    availableUnits: ['bowl (40 g)', 'g (grams)', 'cup (80 g)', 'serving'],
    emoji: '🥣',
    image: bowlSaladImg,
    popular: true,
    recent: true,
    hasVariants: true,
    variantQuery: 'oats'
  },
  {
    id: 'oats-rolled',
    name: 'Oats (Rolled)',
    shortName: 'Oats (Rolled)',
    shortServing: '1 bowl (40 g)',
    category: 'Grains',
    filterType: 'All',
    baseCalories: 150,
    baseCarbs: 27,
    baseProtein: 5,
    baseFat: 3,
    servingUnit: '1 bowl (40 g)',
    unitWeightGrams: 40,
    availableUnits: ['1 bowl (40 g)', 'g (grams)', 'cup (80 g)', 'serving'],
    emoji: '🥣',
    image: bowlSaladImg,
    popular: false,
    recent: false
  },
  {
    id: 'oats-quick',
    name: 'Oats (Quick)',
    shortName: 'Oats (Quick)',
    shortServing: '1 bowl (40 g)',
    category: 'Grains',
    filterType: 'All',
    baseCalories: 145,
    baseCarbs: 26,
    baseProtein: 5,
    baseFat: 2.5,
    servingUnit: '1 bowl (40 g)',
    unitWeightGrams: 40,
    availableUnits: ['1 bowl (40 g)', 'g (grams)', 'serving'],
    emoji: '🥣',
    image: bowlSaladImg,
    popular: false,
    recent: false
  },
  {
    id: 'oats-steel-cut',
    name: 'Oats (Steel Cut)',
    shortName: 'Oats (Steel Cut)',
    shortServing: '1 bowl (40 g)',
    category: 'Grains',
    filterType: 'All',
    baseCalories: 160,
    baseCarbs: 28,
    baseProtein: 5.5,
    baseFat: 3,
    servingUnit: '1 bowl (40 g)',
    unitWeightGrams: 40,
    availableUnits: ['1 bowl (40 g)', 'g (grams)', 'cup (80 g)'],
    emoji: '🥣',
    image: bowlSaladImg,
    popular: false,
    recent: false
  },
  {
    id: 'oats-porridge',
    name: 'Oats Porridge (Cooked)',
    shortName: 'Porridge',
    shortServing: '1 bowl',
    category: 'Grains',
    filterType: 'Recipes',
    baseCalories: 120,
    baseCarbs: 22,
    baseProtein: 4,
    baseFat: 2,
    servingUnit: '1 bowl',
    unitWeightGrams: 200,
    availableUnits: ['1 bowl', 'cup', 'serving'],
    emoji: '🍲',
    image: bowlSaladImg,
    popular: false,
    recent: false
  },
  {
    id: 'oats-milk',
    name: 'Oats with Milk',
    shortName: 'Oats & Milk',
    shortServing: '1 bowl',
    category: 'Grains',
    filterType: 'Recipes',
    baseCalories: 200,
    baseCarbs: 32,
    baseProtein: 9,
    baseFat: 4.5,
    servingUnit: '1 bowl',
    unitWeightGrams: 250,
    availableUnits: ['1 bowl', 'cup', 'serving'],
    emoji: '🥣',
    image: bowlSaladImg,
    popular: false,
    recent: false
  },
  {
    id: 'oats-fruits',
    name: 'Oats with Fruits',
    shortName: 'Oats & Fruit',
    shortServing: '1 bowl',
    category: 'Grains',
    filterType: 'Recipes',
    baseCalories: 260,
    baseCarbs: 48,
    baseProtein: 7,
    baseFat: 4,
    servingUnit: '1 bowl',
    unitWeightGrams: 300,
    availableUnits: ['1 bowl', 'serving'],
    emoji: '🫐',
    image: bowlSaladImg,
    popular: false,
    recent: false
  },
  {
    id: 'oats-organic',
    name: 'Oats (Organic)',
    shortName: 'Organic Oats',
    shortServing: '1 bowl (40 g)',
    category: 'Grains',
    filterType: 'Branded',
    baseCalories: 150,
    baseCarbs: 27,
    baseProtein: 5,
    baseFat: 3,
    servingUnit: '1 bowl (40 g)',
    unitWeightGrams: 40,
    availableUnits: ['1 bowl (40 g)', 'g (grams)', 'serving'],
    emoji: '🌾',
    image: bowlSaladImg,
    popular: false,
    recent: false
  },

  // 2. Banana & Fruit Varieties
  {
    id: 'banana-main',
    name: 'Banana',
    shortName: 'Banana',
    shortServing: '1 medium',
    category: 'Fruits',
    filterType: 'All',
    baseCalories: 105,
    baseCarbs: 27,
    baseProtein: 1.3,
    baseFat: 0.3,
    servingUnit: '1 medium',
    unitWeightGrams: 118,
    availableUnits: ['1 medium', '1 small', '1 large', 'g (grams)'],
    emoji: '🍌',
    popular: true,
    recent: true,
    hasVariants: true,
    variantQuery: 'banana'
  },
  {
    id: 'banana-small',
    name: 'Banana (Small)',
    shortName: 'Small Banana',
    shortServing: '1 small (100g)',
    category: 'Fruits',
    filterType: 'All',
    baseCalories: 90,
    baseCarbs: 23,
    baseProtein: 1.1,
    baseFat: 0.3,
    servingUnit: '1 small (100g)',
    unitWeightGrams: 100,
    availableUnits: ['1 small (100g)', 'g (grams)'],
    emoji: '🍌',
    popular: false,
    recent: false
  },
  {
    id: 'banana-large',
    name: 'Banana (Large)',
    shortName: 'Large Banana',
    shortServing: '1 large (136g)',
    category: 'Fruits',
    filterType: 'All',
    baseCalories: 121,
    baseCarbs: 31,
    baseProtein: 1.5,
    baseFat: 0.4,
    servingUnit: '1 large (136g)',
    unitWeightGrams: 136,
    availableUnits: ['1 large (136g)', 'g (grams)'],
    emoji: '🍌',
    popular: false,
    recent: false
  },
  {
    id: 'banana-smoothie',
    name: 'Banana Smoothie',
    shortName: 'Banana Shake',
    shortServing: '1 glass (300ml)',
    category: 'Beverages',
    filterType: 'Recipes',
    baseCalories: 220,
    baseCarbs: 42,
    baseProtein: 8,
    baseFat: 2.5,
    servingUnit: '1 glass (300ml)',
    unitWeightGrams: 300,
    availableUnits: ['1 glass (300ml)', 'cup'],
    emoji: '🥤',
    image: foodSmoothieImg,
    popular: false,
    recent: false
  },
  {
    id: 'apple',
    name: 'Fresh Apple',
    shortName: 'Apple',
    shortServing: '1 medium',
    category: 'Fruits',
    filterType: 'All',
    baseCalories: 95,
    baseCarbs: 25,
    baseProtein: 0.5,
    baseFat: 0.3,
    servingUnit: '1 medium',
    unitWeightGrams: 182,
    availableUnits: ['1 medium', '1 small', '1 large', 'g (grams)'],
    emoji: '🍎',
    popular: false,
    recent: false
  },

  // 3. Egg Varieties
  {
    id: 'egg-main',
    name: 'Egg',
    shortName: 'Egg',
    shortServing: '1 piece',
    category: 'Protein',
    filterType: 'All',
    baseCalories: 78,
    baseCarbs: 0.6,
    baseProtein: 6.3,
    baseFat: 5.3,
    servingUnit: '1 piece',
    unitWeightGrams: 50,
    availableUnits: ['1 piece', '2 pieces', '3 pieces'],
    emoji: '🥚',
    popular: true,
    recent: true,
    hasVariants: true,
    variantQuery: 'egg'
  },
  {
    id: 'boiled-egg',
    name: 'Boiled Egg (Whole)',
    shortName: 'Boiled Egg',
    shortServing: '1 piece (50g)',
    category: 'Protein',
    filterType: 'All',
    baseCalories: 78,
    baseCarbs: 0.6,
    baseProtein: 6.3,
    baseFat: 5.3,
    servingUnit: '1 piece',
    unitWeightGrams: 50,
    availableUnits: ['1 piece', '2 pieces', '3 pieces'],
    emoji: '🥚',
    popular: false,
    recent: false
  },
  {
    id: 'egg-whites',
    name: 'Egg Whites Only',
    shortName: 'Egg Whites',
    shortServing: '1 egg white (33g)',
    category: 'Protein',
    filterType: 'All',
    baseCalories: 17,
    baseCarbs: 0.2,
    baseProtein: 3.6,
    baseFat: 0.1,
    servingUnit: '1 egg white',
    unitWeightGrams: 33,
    availableUnits: ['1 egg white', '2 egg whites', '3 egg whites'],
    emoji: '🍳',
    popular: false,
    recent: false
  },
  {
    id: 'scrambled-eggs',
    name: 'Scrambled Eggs',
    shortName: 'Scrambled',
    shortServing: '2 eggs portion',
    category: 'Protein',
    filterType: 'Recipes',
    baseCalories: 140,
    baseCarbs: 1.5,
    baseProtein: 12,
    baseFat: 9.5,
    servingUnit: '2 eggs portion',
    unitWeightGrams: 100,
    availableUnits: ['2 eggs portion', '1 egg', '3 eggs portion'],
    emoji: '🍳',
    popular: false,
    recent: false
  },
  {
    id: 'egg-omelette',
    name: 'Egg Omelette with Veggies',
    shortName: 'Omelette',
    shortServing: '1 omelette',
    category: 'Protein',
    filterType: 'Recipes',
    baseCalories: 160,
    baseCarbs: 3,
    baseProtein: 13,
    baseFat: 10,
    servingUnit: '1 omelette',
    unitWeightGrams: 120,
    availableUnits: ['1 omelette', 'serving'],
    emoji: '🍳',
    popular: false,
    recent: false
  },

  // 4. Yogurt & Dairy Varieties
  {
    id: 'yogurt-main',
    name: 'Yogurt',
    shortName: 'Yogurt',
    shortServing: '1 cup',
    category: 'Dairy',
    filterType: 'All',
    baseCalories: 100,
    baseCarbs: 6,
    baseProtein: 15,
    baseFat: 0.7,
    servingUnit: '1 cup (170g)',
    unitWeightGrams: 170,
    availableUnits: ['1 cup (170g)', '100 g', 'serving'],
    emoji: '🥛',
    popular: true,
    recent: false,
    hasVariants: true,
    variantQuery: 'yogurt'
  },
  {
    id: 'greek-yogurt-plain',
    name: 'Greek Yogurt (Plain 0%)',
    shortName: 'Greek Yogurt',
    shortServing: '1 cup (170g)',
    category: 'Dairy',
    filterType: 'All',
    baseCalories: 100,
    baseCarbs: 6,
    baseProtein: 15,
    baseFat: 0.7,
    servingUnit: '1 cup (170g)',
    unitWeightGrams: 170,
    availableUnits: ['1 cup (170g)', '100 g', 'serving'],
    emoji: '🥛',
    popular: false,
    recent: false
  },
  {
    id: 'greek-yogurt-honey',
    name: 'Greek Yogurt with Honey',
    shortName: 'Honey Yogurt',
    shortServing: '1 cup (170g)',
    category: 'Dairy',
    filterType: 'Recipes',
    baseCalories: 150,
    baseCarbs: 18,
    baseProtein: 14,
    baseFat: 1.5,
    servingUnit: '1 cup (170g)',
    unitWeightGrams: 170,
    availableUnits: ['1 cup (170g)', '100 g', 'serving'],
    emoji: '🍯',
    popular: false,
    recent: false
  },
  {
    id: 'curd-dahi',
    name: 'Curd / Dahi (Homemade)',
    shortName: 'Dahi / Curd',
    shortServing: '1 bowl (150g)',
    category: 'Dairy',
    filterType: 'All',
    baseCalories: 98,
    baseCarbs: 7,
    baseProtein: 5,
    baseFat: 6,
    servingUnit: '1 bowl (150g)',
    unitWeightGrams: 150,
    availableUnits: ['1 bowl (150g)', '100 g', 'cup'],
    emoji: '🥣',
    popular: false,
    recent: false
  },

  // 5. Chicken & Protein Varieties
  {
    id: 'chicken-main',
    name: 'Chicken',
    shortName: 'Chicken',
    shortServing: '100 g',
    category: 'Protein',
    filterType: 'All',
    baseCalories: 165,
    baseCarbs: 0,
    baseProtein: 31,
    baseFat: 3.6,
    servingUnit: '100 g',
    unitWeightGrams: 100,
    availableUnits: ['100 g', '1 breast (150g)', 'g (grams)'],
    emoji: '🍗',
    image: scannerFoodPlateImg,
    popular: true,
    recent: true,
    hasVariants: true,
    variantQuery: 'chicken'
  },
  {
    id: 'grilled-chicken',
    name: 'Grilled Chicken Breast',
    shortName: 'Grilled Chicken',
    shortServing: '100 g',
    category: 'Protein',
    filterType: 'All',
    baseCalories: 165,
    baseCarbs: 0,
    baseProtein: 31,
    baseFat: 3.6,
    servingUnit: '100 g',
    unitWeightGrams: 100,
    availableUnits: ['100 g', '1 breast (150g)', 'g (grams)'],
    emoji: '🍗',
    image: scannerFoodPlateImg,
    popular: false,
    recent: false
  },
  {
    id: 'boiled-chicken',
    name: 'Boiled Chicken Breast',
    shortName: 'Boiled Chicken',
    shortServing: '100 g',
    category: 'Protein',
    filterType: 'All',
    baseCalories: 150,
    baseCarbs: 0,
    baseProtein: 32,
    baseFat: 2.5,
    servingUnit: '100 g',
    unitWeightGrams: 100,
    availableUnits: ['100 g', 'g (grams)'],
    emoji: '🍗',
    popular: false,
    recent: false
  },
  {
    id: 'chicken-tikka',
    name: 'Chicken Tikka (Tandoori)',
    shortName: 'Chicken Tikka',
    shortServing: '100 g',
    category: 'Protein',
    filterType: 'Recipes',
    baseCalories: 180,
    baseCarbs: 3,
    baseProtein: 28,
    baseFat: 6,
    servingUnit: '100 g',
    unitWeightGrams: 100,
    availableUnits: ['100 g', '1 plate (200g)', 'serving'],
    emoji: '🍗',
    popular: false,
    recent: false
  },

  // 6. Milk & Drink Varieties
  {
    id: 'fresh-milk',
    name: 'Milk (Cow)',
    shortName: 'Milk',
    shortServing: '1 cup (240ml)',
    category: 'Dairy',
    filterType: 'All',
    baseCalories: 103,
    baseCarbs: 12,
    baseProtein: 8,
    baseFat: 2.4,
    servingUnit: '1 cup (240ml)',
    unitWeightGrams: 240,
    availableUnits: ['1 cup (240ml)', '100 ml', '1 glass'],
    emoji: '🥛',
    popular: false,
    recent: true
  },
  {
    id: 'almond-milk',
    name: 'Almond Milk (Unsweetened)',
    shortName: 'Almond Milk',
    shortServing: '1 cup (240ml)',
    category: 'Dairy',
    filterType: 'All',
    baseCalories: 30,
    baseCarbs: 1,
    baseProtein: 1,
    baseFat: 2.5,
    servingUnit: '1 cup (240ml)',
    unitWeightGrams: 240,
    availableUnits: ['1 cup (240ml)', '100 ml', '1 glass'],
    emoji: '🥛',
    popular: false,
    recent: false
  },

  // 7. Staples & Other Foods
  {
    id: 'pan-seared-salmon',
    name: 'Pan-Seared Salmon',
    shortName: 'Salmon',
    shortServing: '1 fillet',
    category: 'Protein',
    filterType: 'All',
    baseCalories: 340,
    baseCarbs: 0,
    baseProtein: 34,
    baseFat: 20,
    servingUnit: '1 fillet (200g)',
    unitWeightGrams: 200,
    availableUnits: ['1 fillet (200g)', '100 g', 'serving'],
    emoji: '🐟',
    image: foodSalmonImg,
    popular: false,
    recent: false
  },
  {
    id: 'chapati',
    name: 'Chapati (Roti)',
    shortName: 'Chapati',
    shortServing: '1 pc',
    category: 'Grains',
    filterType: 'All',
    baseCalories: 70,
    baseCarbs: 14,
    baseProtein: 2.5,
    baseFat: 0.5,
    servingUnit: '1 pc',
    unitWeightGrams: 30,
    availableUnits: ['1 pc', '2 pcs', '3 pcs'],
    emoji: '🫓',
    popular: true,
    recent: true
  },
  {
    id: 'white-rice',
    name: 'Steamed Rice',
    shortName: 'Rice',
    shortServing: '1 bowl',
    category: 'Grains',
    filterType: 'All',
    baseCalories: 200,
    baseCarbs: 45,
    baseProtein: 4,
    baseFat: 0.5,
    servingUnit: '1 bowl (150g)',
    unitWeightGrams: 150,
    availableUnits: ['1 bowl (150g)', '100 g', 'cup'],
    emoji: '🍚',
    popular: true,
    recent: true,
    hasVariants: true,
    variantQuery: 'rice'
  },
  {
    id: 'brown-rice',
    name: 'Brown Rice (Cooked)',
    shortName: 'Brown Rice',
    shortServing: '1 bowl (150g)',
    category: 'Grains',
    filterType: 'All',
    baseCalories: 180,
    baseCarbs: 38,
    baseProtein: 4.5,
    baseFat: 1.5,
    servingUnit: '1 bowl (150g)',
    unitWeightGrams: 150,
    availableUnits: ['1 bowl (150g)', '100 g', 'cup'],
    emoji: '🍚',
    popular: false,
    recent: false
  },
  {
    id: 'roasted-almonds',
    name: 'Roasted Almonds',
    shortName: 'Almonds',
    shortServing: '28 g',
    category: 'Nuts & Seeds',
    filterType: 'All',
    baseCalories: 160,
    baseCarbs: 6,
    baseProtein: 6,
    baseFat: 14,
    servingUnit: 'Handful (28g)',
    unitWeightGrams: 28,
    availableUnits: ['Handful (28g)', '100 g', '10 pcs'],
    emoji: '🥜',
    popular: true,
    recent: false
  },
  {
    id: 'green-salad',
    name: 'Garden Green Salad',
    category: 'Vegetables',
    filterType: 'All',
    baseCalories: 45,
    baseCarbs: 8,
    baseProtein: 2,
    baseFat: 0.5,
    servingUnit: '1 bowl',
    unitWeightGrams: 150,
    availableUnits: ['1 bowl', 'serving'],
    emoji: '🥗',
    popular: false,
    recent: false
  },
  {
    id: 'berry-smoothie',
    name: 'Berry Protein Smoothie',
    category: 'Beverages',
    filterType: 'Recipes',
    baseCalories: 210,
    baseCarbs: 28,
    baseProtein: 20,
    baseFat: 2.5,
    servingUnit: '1 glass (350ml)',
    unitWeightGrams: 350,
    availableUnits: ['1 glass (350ml)', 'cup'],
    emoji: '🥤',
    image: foodSmoothieImg,
    popular: false,
    recent: false
  }
];

const CATEGORIES_LIST = [
  { id: 'Fruits', name: 'Fruits', emoji: '🍏' },
  { id: 'Vegetables', name: 'Vegetables', emoji: '🥦' },
  { id: 'Grains', name: 'Grains', emoji: '🌾' },
  { id: 'Protein', name: 'Protein', emoji: '🍗' },
  { id: 'Dairy', name: 'Dairy', emoji: '🥛' },
  { id: 'Nuts & Seeds', name: 'Nuts & Seeds', emoji: '🥜' },
  { id: 'Snacks', name: 'Snacks', emoji: '🍪' },
  { id: 'Beverages', name: 'Beverages', emoji: '☕' }
];

const FILTER_TABS = ['All', 'My Foods', 'Branded', 'Recipes'];

export function AddFoodModal({
  category, // 'breakfast' | 'lunch' | 'dinner' | 'snacks'
  categoryTitle = 'Breakfast',
  onClose,
  onAddFood,
  onOpenScanner
}) {
  // Navigation view: 'main' | 'variety' | 'search' | 'detail' | 'custom'
  const [view, setView] = useState('main');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(null);

  // Selected parent item when picking variants (e.g. Oats, Egg, Milk, etc.)
  const [selectedVarietyParent, setSelectedVarietyParent] = useState(null);

  // Selected food item for Detail/Portion Screen
  const [selectedFood, setSelectedFood] = useState(null);
  const [portionMultiplier, setPortionMultiplier] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState('');

  // Custom food manual logger state
  const [customName, setCustomName] = useState('');
  const [customCalories, setCustomCalories] = useState('');
  const [customCarbs, setCustomCarbs] = useState('');
  const [customProtein, setCustomProtein] = useState('');
  const [customFat, setCustomFat] = useState('');
  const [customServing, setCustomServing] = useState('1 serving');

  // Handle opening food detail sheet (or navigating to dedicated variety picker if item has multiple types)
  const handleSelectFood = (food, fromSearch = false) => {
    if (food.hasVariants && !fromSearch) {
      setSelectedVarietyParent(food);
      setView('variety');
      return;
    }

    setSelectedFood(food);
    setPortionMultiplier(1);
    setSelectedUnit(food.servingUnit || '1 serving');
    setView('detail');
  };

  // Handle clicking category tile
  const handleCategoryClick = (catId) => {
    setSelectedCategoryFilter(catId);
    setView('search');
  };

  // Stepper handlers
  const handleDecrementPortion = () => {
    setPortionMultiplier((prev) => (prev > 0.5 ? Math.round((prev - 0.5) * 10) / 10 : 0.5));
  };

  const handleIncrementPortion = () => {
    setPortionMultiplier((prev) => Math.round((prev + 0.5) * 10) / 10);
  };

  // Compute scaled macros
  const calculatedMacros = useMemo(() => {
    if (!selectedFood) return { calories: 0, carbs: 0, protein: 0, fat: 0 };
    return {
      calories: Math.round(selectedFood.baseCalories * portionMultiplier),
      carbs: Math.round(selectedFood.baseCarbs * portionMultiplier * 10) / 10,
      protein: Math.round(selectedFood.baseProtein * portionMultiplier * 10) / 10,
      fat: Math.round(selectedFood.baseFat * portionMultiplier * 10) / 10
    };
  }, [selectedFood, portionMultiplier]);

  // Handle final food add
  const handleConfirmAdd = () => {
    if (!selectedFood) return;
    const finalItem = {
      id: `${selectedFood.id}-${Date.now()}`,
      name: selectedFood.name,
      calories: calculatedMacros.calories,
      carbs: `${calculatedMacros.carbs}g`,
      protein: `${calculatedMacros.protein}g`,
      fats: `${calculatedMacros.fat}g`,
      serving: portionMultiplier === 1 ? selectedUnit : `${portionMultiplier} × ${selectedUnit}`,
      emoji: selectedFood.emoji || '🥗'
    };
    onAddFood(category, finalItem);
    onClose();
  };

  // Handle custom manual food add
  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customName.trim() || !customCalories) return;
    const finalItem = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      calories: Number(customCalories) || 0,
      carbs: customCarbs ? `${customCarbs}g` : '0g',
      protein: customProtein ? `${customProtein}g` : '0g',
      fats: customFat ? `${customFat}g` : '0g',
      serving: customServing.trim() || '1 serving',
      emoji: '🥗'
    };
    onAddFood(category, finalItem);
    onClose();
  };

  // Filtered search list
  const searchResults = useMemo(() => {
    return FOOD_DATABASE.filter((item) => {
      const matchesQuery = searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategoryFilter || item.category === selectedCategoryFilter;

      const matchesTab = activeFilterTab === 'All' ||
        (activeFilterTab === 'My Foods' && item.recent) ||
        item.filterType === activeFilterTab;

      return matchesQuery && matchesCategory && matchesTab;
    });
  }, [searchQuery, selectedCategoryFilter, activeFilterTab]);

  // Varieties list for the selected multi-type parent food (e.g. Oats, Egg, Milk, etc.)
  const varietyItems = useMemo(() => {
    if (!selectedVarietyParent) return [];
    const q = (selectedVarietyParent.variantQuery || selectedVarietyParent.shortName || selectedVarietyParent.name).toLowerCase();
    const filtered = FOOD_DATABASE.filter((item) => {
      if (item.id === selectedVarietyParent.id) return false;
      return (
        item.name.toLowerCase().includes(q) ||
        (item.shortName && item.shortName.toLowerCase().includes(q)) ||
        (item.variantQuery && item.variantQuery.toLowerCase() === q)
      );
    });
    return filtered.length > 0 ? filtered : [selectedVarietyParent];
  }, [selectedVarietyParent]);

  const popularPicks = useMemo(() => FOOD_DATABASE.filter((item) => item.popular), []);
  const recentFoods = useMemo(() => FOOD_DATABASE.filter((item) => item.recent), []);

  return (
    <div className="add-food-backdrop" onClick={onClose}>
      <div
        className={`add-food-sheet ${view === 'detail' ? 'sheet-detail-mode' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Top Drag Handle */}
        <div className="add-food-drag-handle" />

        {/* =========================================================================
            VIEW 1: MAIN ADD FOOD HUB
            ========================================================================= */}
        {view === 'main' && (
          <div className="add-food-main-content">
            {/* Header: Search Bar with Scan Icon and Close */}
            <div className="add-food-header-row">
              <div
                className="add-food-search-capsule"
                onClick={() => setView('search')}
              >
                <Search size={15} className="search-icon-left" />
                <input
                  type="text"
                  placeholder="e.g. banana, oats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setView('search')}
                  className="add-food-search-input"
                />
              </div>

              <button
                type="button"
                className="add-food-close-circle"
                onClick={onClose}
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>

            {/* Quick Action Tiles (Scan Food | Photo | Custom) */}
            <div className="add-food-actions-grid">
              <button
                type="button"
                className="action-tile"
                onClick={() => {
                  if (onOpenScanner) onOpenScanner(category);
                }}
              >
                <div className="action-tile-icon-wrap">
                  <Camera size={15} />
                </div>
                <div className="action-tile-title">Scan Food</div>
              </button>

              <button
                type="button"
                className="action-tile"
                onClick={() => {
                  if (onOpenScanner) onOpenScanner(category);
                }}
              >
                <div className="action-tile-icon-wrap">
                  <ImageIcon size={15} />
                </div>
                <div className="action-tile-title">Photo</div>
              </button>

              <button
                type="button"
                className="action-tile"
                onClick={() => setView('custom')}
              >
                <div className="action-tile-icon-wrap">
                  <Plus size={15} />
                </div>
                <div className="action-tile-title">Custom</div>
              </button>
            </div>

            {/* Scrollable Body Container */}
            <div className="add-food-scroll-body">
              {/* 1. Popular Picks Carousel */}
              <section className="add-food-section">
                <div className="section-title-row">
                  <h3 className="section-heading">Popular Picks</h3>
                  <button
                    type="button"
                    className="section-link-btn"
                    onClick={() => {
                      setSelectedCategoryFilter(null);
                      setView('search');
                    }}
                  >
                    See all
                  </button>
                </div>

                <div className="popular-picks-carousel">
                  {popularPicks.map((food) => (
                    <div
                      key={food.id}
                      className="popular-food-card"
                      onClick={() => handleSelectFood(food)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="popular-food-avatar">
                        <span>{food.emoji}</span>
                      </div>
                      <span className="popular-food-name">{food.shortName || food.name}</span>
                      <span className="popular-food-kcal">{food.baseCalories} kcal</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 2. Categories Grid */}
              <section className="add-food-section">
                <h3 className="section-heading">Categories</h3>
                <div className="categories-grid">
                  {CATEGORIES_LIST.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className="category-tile"
                      onClick={() => handleCategoryClick(cat.id)}
                    >
                      <div className="category-tile-emoji">{cat.emoji}</div>
                      <span className="category-tile-label">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* 3. Recent Items List */}
              <section className="add-food-section">
                <div className="section-title-row">
                  <h3 className="section-heading">Recent</h3>
                  <button
                    type="button"
                    className="section-link-btn"
                    onClick={() => {
                      setActiveFilterTab('My Foods');
                      setView('search');
                    }}
                  >
                    See all
                  </button>
                </div>

                <div className="recent-foods-list">
                  {recentFoods.map((food) => (
                    <div
                      key={food.id}
                      className="recent-food-item"
                      onClick={() => handleSelectFood(food)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="recent-food-avatar">
                        <span>{food.emoji}</span>
                      </div>
                      <div className="recent-food-info">
                        <h4 className="recent-food-name">{food.name}</h4>
                        <div className="recent-food-subline">
                          <span className="recent-food-serving">{food.shortServing || food.servingUnit}</span>
                          <span className="recent-food-dot">•</span>
                          <span className="recent-food-cal-text">{food.baseCalories} kcal</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="recent-food-add-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectFood(food);
                        }}
                        aria-label={`Add ${food.name}`}
                      >
                        <Plus size={16} strokeWidth={2.4} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: DEDICATED VARIETY SELECTION VIEW (Without search bar & filter chips)
            ========================================================================= */}
        {view === 'variety' && selectedVarietyParent && (
          <div className="add-food-variety-view">
            {/* Clean Header: Back arrow < | Title | Close ✕ */}
            <div className="variety-view-header">
              <button
                type="button"
                className="search-back-btn"
                onClick={() => {
                  setSelectedVarietyParent(null);
                  setView('main');
                }}
                aria-label="Back"
              >
                <ArrowLeft size={16} />
              </button>

              <h3 className="variety-header-title">
                Select {selectedVarietyParent.shortName || selectedVarietyParent.name} Type
              </h3>

              <button
                type="button"
                className="add-food-close-circle"
                onClick={onClose}
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>

            {/* Direct List of Food Varieties */}
            <div className="variety-results-list">
              {varietyItems.map((food) => (
                <div
                  key={food.id}
                  className="search-result-row"
                  onClick={() => handleSelectFood(food, true)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="search-result-avatar">
                    {food.image ? (
                      <img src={food.image} alt={food.name} className="search-avatar-img" />
                    ) : (
                      <span>{food.emoji}</span>
                    )}
                  </div>

                  <div className="search-result-info">
                    <h4 className="search-result-name">{food.name}</h4>
                    <div className="search-result-subline">
                      <span className="search-result-serving">{food.shortServing || food.servingUnit}</span>
                      <span className="search-result-dot">•</span>
                      <span className="search-result-cal-text">{food.baseCalories} kcal</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="search-result-add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectFood(food, true);
                    }}
                    aria-label={`Select ${food.name}`}
                  >
                    <Plus size={16} strokeWidth={2.4} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: SEARCH & FILTERED LIST VIEW
            ========================================================================= */}
        {view === 'search' && (
          <div className="add-food-search-view">
            {/* Search Header with Back Navigation */}
            <div className="search-view-header">
              <button
                type="button"
                className="search-back-btn"
                onClick={() => {
                  setSelectedCategoryFilter(null);
                  setView('main');
                }}
                aria-label="Back"
              >
                <ArrowLeft size={16} />
              </button>

              <div className="search-view-input-capsule">
                <Search size={15} className="search-icon-left" />
                <input
                  type="text"
                  placeholder="Search foods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="search-view-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Tabs Chips (All | My Foods | Branded | Recipes) */}
            <div className="filter-chips-row">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`filter-chip ${activeFilterTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveFilterTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {selectedCategoryFilter && (
              <div className="active-category-pill-row">
                <span className="active-category-pill">
                  Category: {selectedCategoryFilter}
                  <X
                    size={14}
                    className="pill-remove-icon"
                    onClick={() => setSelectedCategoryFilter(null)}
                  />
                </span>
              </div>
            )}

            {/* Filtered Food Items List */}
            <div className="search-results-list">
              {searchResults.length > 0 ? (
                searchResults.map((food) => (
                  <div
                    key={food.id}
                    className="search-result-row"
                    onClick={() => handleSelectFood(food, true)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="search-result-avatar">
                      {food.image ? (
                        <img src={food.image} alt={food.name} className="search-avatar-img" />
                      ) : (
                        <span>{food.emoji}</span>
                      )}
                    </div>

                    <div className="search-result-info">
                      <h4 className="search-result-name">{food.name}</h4>
                      <div className="search-result-subline">
                        <span className="search-result-serving">{food.shortServing || food.servingUnit}</span>
                        <span className="search-result-dot">•</span>
                        <span className="search-result-cal-text">{food.baseCalories} kcal</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="search-result-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectFood(food, true);
                      }}
                      aria-label={`Select ${food.name}`}
                    >
                      <Plus size={16} strokeWidth={2.4} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="search-no-results">
                  <p>No foods found matching "{searchQuery}"</p>
                  <button
                    type="button"
                    className="add-as-custom-btn"
                    onClick={() => {
                      setCustomName(searchQuery);
                      setView('custom');
                    }}
                  >
                    + Add as Custom Food
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: FOOD DETAIL & PORTION SHEET ("Add to [Meal]")
            ========================================================================= */}
        {view === 'detail' && selectedFood && (
          <div className="add-food-detail-view">
            {/* Detail Header */}
            <div className="detail-view-header">
              <button
                type="button"
                className="detail-close-btn"
                onClick={() => {
                  if (selectedVarietyParent) {
                    setView('variety');
                  } else if (searchQuery || selectedCategoryFilter) {
                    setView('search');
                  } else {
                    setView('main');
                  }
                }}
                aria-label="Back"
              >
                {(selectedVarietyParent || searchQuery || selectedCategoryFilter) ? <ArrowLeft size={16} /> : <X size={16} />}
              </button>
              <h3 className="detail-header-title">Add to {categoryTitle}</h3>
              <div style={{ width: 32 }} />
            </div>

            {/* Food Preview Card */}
            <div className="detail-food-preview-card">
              <div className="detail-food-image-box">
                {selectedFood.image ? (
                  <img
                    src={selectedFood.image}
                    alt={selectedFood.name}
                    className="detail-preview-img"
                  />
                ) : (
                  <span className="detail-preview-emoji">{selectedFood.emoji}</span>
                )}
              </div>
              <div className="detail-food-title-box">
                <h2 className="detail-food-title">{selectedFood.name}</h2>
                <span className="detail-food-density-text">
                  {selectedFood.baseCalories} kcal per {selectedFood.servingUnit}
                </span>
              </div>
            </div>

            {/* Serving Size Adjuster */}
            <div className="detail-section-block">
              <label className="detail-section-label">Serving Size</label>
              <div className="serving-adjuster-row">
                <div className="serving-stepper-box">
                  <button
                    type="button"
                    className="serving-step-btn"
                    onClick={handleDecrementPortion}
                    aria-label="Decrease serving"
                  >
                    <Minus size={14} strokeWidth={2.4} />
                  </button>
                  <span className="serving-step-val">{portionMultiplier}</span>
                  <button
                    type="button"
                    className="serving-step-btn"
                    onClick={handleIncrementPortion}
                    aria-label="Increase serving"
                  >
                    <Plus size={14} strokeWidth={2.4} />
                  </button>
                </div>

                <div className="serving-unit-select-wrap">
                  <select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                    className="serving-unit-select"
                  >
                    {(selectedFood.availableUnits || [selectedFood.servingUnit]).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="select-chevron-icon" />
                </div>
              </div>
            </div>

            {/* Nutrition (approx.) Table */}
            <div className="detail-section-block">
              <label className="detail-section-label">Nutrition (approx.)</label>
              <div className="detail-nutrition-table">
                <div className="nutrition-table-row">
                  <span className="nutrition-key">Calories</span>
                  <span className="nutrition-val nutrition-cal-highlight">
                    {calculatedMacros.calories} kcal
                  </span>
                </div>
                <div className="nutrition-table-row">
                  <span className="nutrition-key">Carbs</span>
                  <span className="nutrition-val">{calculatedMacros.carbs} g</span>
                </div>
                <div className="nutrition-table-row">
                  <span className="nutrition-key">Protein</span>
                  <span className="nutrition-val">{calculatedMacros.protein} g</span>
                </div>
                <div className="nutrition-table-row">
                  <span className="nutrition-key">Fat</span>
                  <span className="nutrition-val">{calculatedMacros.fat} g</span>
                </div>
              </div>
            </div>

            {/* Bottom Dark Confirm Button */}
            <button
              type="button"
              className="detail-confirm-btn"
              onClick={handleConfirmAdd}
            >
              Add to {categoryTitle}
            </button>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: CUSTOM MANUAL FOOD ENTRY
            ========================================================================= */}
        {view === 'custom' && (
          <div className="add-food-custom-view">
            <div className="detail-view-header">
              <button
                type="button"
                className="detail-close-btn"
                onClick={() => setView('main')}
                aria-label="Back"
              >
                <ArrowLeft size={20} />
              </button>
              <h3 className="detail-header-title">Create Custom Food</h3>
              <div style={{ width: 36 }} />
            </div>

            <form onSubmit={handleAddCustom} className="custom-food-form">
              <div className="form-group">
                <label className="form-label">Food Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Protein Shake"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Calories (kcal) *</label>
                  <input
                    type="number"
                    placeholder="250"
                    value={customCalories}
                    onChange={(e) => setCustomCalories(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Serving Size</label>
                  <input
                    type="text"
                    placeholder="1 scoop (30g)"
                    value={customServing}
                    onChange={(e) => setCustomServing(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label className="form-label">Protein (g)</label>
                  <input
                    type="number"
                    placeholder="25"
                    value={customProtein}
                    onChange={(e) => setCustomProtein(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Carbs (g)</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={customCarbs}
                    onChange={(e) => setCustomCarbs(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Fat (g)</label>
                  <input
                    type="number"
                    placeholder="2"
                    value={customFat}
                    onChange={(e) => setCustomFat(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="detail-confirm-btn"
                style={{ marginTop: 12 }}
              >
                Log to {categoryTitle}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
