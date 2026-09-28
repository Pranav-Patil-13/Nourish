import gutHealthVideo from '../../../assets/videos/gut_health_doctor_tips.mp4';
import chefSaladVideo from '../../../assets/videos/classic_chef_salad.mp4';
import saladoCafeVideo from '../../../assets/videos/salado_cafe_calling.mp4';
import saladoLifestyleVideo from '../../../assets/videos/salado_lifestyle_meal.mp4';
import smartChoicesVideo from '../../../assets/videos/smart_choices_health_tips.mp4';

import riyaAvatarImg from '../../../assets/riya_avatar.jpg';
import trainerArjunImg from '../../../assets/trainer_arjun.jpg';
import userAvatarImg from '../../../assets/user_avatar.jpg';
import bowlSaladImg from '../../../assets/bowl_salad.png';

export const COMMUNITY_SHORTS = [
  {
    id: 'short-1',
    title: '3 Gut Health Tips That Beat Any Detox Drink',
    description: 'Scientifically proven habits for gut microbiome health, optimal digestion, and sustained daily energy. 🩺🌿',
    videoUrl: gutHealthVideo,
    viewsCount: '48.2K',
    likesCount: 3842,
    commentsCount: 142,
    sharesCount: 618,
    isLiked: false,
    isBookmarked: false,
    author: {
      name: 'Dr. Sameer Joshi',
      handle: 'dr_sameer',
      avatar: userAvatarImg,
      badge: 'GUT HEALTH EXPERT',
      isFollowing: true
    },
    tags: ['#GutHealth', '#NutritionTips', '#DigestiveHealth', '#DoctorApproved']
  },
  {
    id: 'short-2',
    title: 'Classic Chef Salad Bowl Recipe & Assembly',
    description: 'Crisp garden greens, hard-boiled eggs, smoked turkey & creamy herb dressing. 34g protein! 🥗✨',
    videoUrl: chefSaladVideo,
    viewsCount: '32.6K',
    likesCount: 2450,
    commentsCount: 98,
    sharesCount: 412,
    isLiked: true,
    isBookmarked: false,
    author: {
      name: 'Riya Sharma',
      handle: 'riyasharma',
      avatar: riyaAvatarImg,
      badge: 'PRO CHEF',
      isFollowing: false
    },
    tags: ['#ChefSalad', '#HighProtein', '#MealPrep', '#SaladO']
  },
  {
    id: 'short-3',
    title: 'SaladO Cafe Calling! Fresh Daily Bowls',
    description: 'Behind the scenes at SaladO Cafe crafting farm-fresh customizable wellness bowls. 🥑🥒',
    videoUrl: saladoCafeVideo,
    viewsCount: '64.1K',
    likesCount: 5290,
    commentsCount: 210,
    sharesCount: 940,
    isLiked: false,
    isBookmarked: true,
    author: {
      name: 'SaladO Cafe',
      handle: 'salado_cafe',
      avatar: bowlSaladImg,
      badge: 'OFFICIAL KITCHEN',
      isFollowing: true
    },
    tags: ['#SaladOCafe', '#FreshDaily', '#CleanEating', '#HealthyLifestyle']
  },
  {
    id: 'short-4',
    title: 'SaladO: The Perfect Meal for Any Lifestyle!',
    description: 'Balanced macronutrients tailored for busy professionals, fitness enthusiasts, and students. ⚡💪',
    videoUrl: saladoLifestyleVideo,
    viewsCount: '27.4K',
    likesCount: 1980,
    commentsCount: 76,
    sharesCount: 330,
    isLiked: false,
    isBookmarked: false,
    author: {
      name: 'SaladO Official',
      handle: 'salado_official',
      avatar: bowlSaladImg,
      badge: 'BRAND',
      isFollowing: false
    },
    tags: ['#HealthyMeal', '#NutritionGoals', '#SaladO', '#FitLifestyle']
  },
  {
    id: 'short-5',
    title: 'Choosing "Healthy" vs Smart Nutritional Choices',
    description: 'Avoid common hidden calorie traps in commercial health foods and make smarter everyday swaps. ⚠️🥑',
    videoUrl: smartChoicesVideo,
    viewsCount: '53.8K',
    likesCount: 4120,
    commentsCount: 184,
    sharesCount: 795,
    isLiked: true,
    isBookmarked: true,
    author: {
      name: 'Coach Arjun',
      handle: 'coach_arjun',
      avatar: trainerArjunImg,
      badge: 'NUTRITION COACH',
      isFollowing: true
    },
    tags: ['#DietHacks', '#SmartEating', '#CalorieDeficit', '#FitnessTips']
  }
];
