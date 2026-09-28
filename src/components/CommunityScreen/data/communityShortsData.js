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
    tags: ['#GutHealth', '#NutritionTips', '#DigestiveHealth', '#DoctorApproved'],
    comments: [
      {
        id: 'sc1-1',
        author: 'Riya Sharma',
        avatar: riyaAvatarImg,
        timeAgo: '2h ago',
        text: 'Adding fermented foods daily made such a difference to my bloating! 🥗',
        likes: 18,
        isLiked: false,
        repliesCount: 1
      },
      {
        id: 'sc1-2',
        author: 'Arjun Mehta',
        avatar: trainerArjunImg,
        timeAgo: '4h ago',
        text: 'Doctor, what are your thoughts on bone broth for gut lining recovery?',
        likes: 9,
        isLiked: false,
        repliesCount: 0
      },
      {
        id: 'sc1-3',
        author: 'Pooja Hegde',
        avatar: userAvatarImg,
        timeAgo: '1d ago',
        text: 'Saved this! Great actionable advice instead of detox tea fads 🙌',
        likes: 24,
        isLiked: true,
        repliesCount: 0
      }
    ]
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
    tags: ['#ChefSalad', '#HighProtein', '#MealPrep', '#SaladO'],
    comments: [
      {
        id: 'sc2-1',
        author: 'Dr. Sameer Joshi',
        avatar: userAvatarImg,
        timeAgo: '1h ago',
        text: '34g protein in a salad bowl is super impressive! Recipe saved.',
        likes: 12,
        isLiked: false,
        repliesCount: 1
      },
      {
        id: 'sc2-2',
        author: 'Karan Deshmukh',
        avatar: trainerArjunImg,
        timeAgo: '3h ago',
        text: 'What dressing do you recommend to keep calories low?',
        likes: 7,
        isLiked: false,
        repliesCount: 0
      }
    ]
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
    tags: ['#SaladOCafe', '#FreshDaily', '#CleanEating', '#HealthyLifestyle'],
    comments: [
      {
        id: 'sc3-1',
        author: 'Ananya Roy',
        avatar: riyaAvatarImg,
        timeAgo: '30m ago',
        text: 'When are you opening in Pune? We need SaladO here! 🥑💚',
        likes: 45,
        isLiked: true,
        repliesCount: 2
      },
      {
        id: 'sc3-2',
        author: 'Vikram Singh',
        avatar: userAvatarImg,
        timeAgo: '2h ago',
        text: 'The avocado dressing is unmatched 🔥',
        likes: 14,
        isLiked: false,
        repliesCount: 0
      }
    ]
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
    tags: ['#HealthyMeal', '#NutritionGoals', '#SaladO', '#FitLifestyle'],
    comments: [
      {
        id: 'sc4-1',
        author: 'Sneha Kapur',
        avatar: riyaAvatarImg,
        timeAgo: '1h ago',
        text: 'Perfect pre-workout fuel. Kept my energy stable for 3 hours!',
        likes: 19,
        isLiked: true,
        repliesCount: 0
      },
      {
        id: 'sc4-2',
        author: 'Arjun Mehta',
        avatar: trainerArjunImg,
        timeAgo: '5h ago',
        text: 'Good balance of complex carbs and clean fats.',
        likes: 8,
        isLiked: false,
        repliesCount: 0
      }
    ]
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
    tags: ['#DietHacks', '#SmartEating', '#CalorieDeficit', '#FitnessTips'],
    comments: [
      {
        id: 'sc5-1',
        author: 'Riya Sharma',
        avatar: riyaAvatarImg,
        timeAgo: '45m ago',
        text: 'Granola bars were my biggest trap until I checked the sugar content 😅',
        likes: 31,
        isLiked: true,
        repliesCount: 1
      },
      {
        id: 'sc5-2',
        author: 'Dr. Sameer Joshi',
        avatar: userAvatarImg,
        timeAgo: '3h ago',
        text: 'Spot on advice coach. Reading ingredient labels is a superpower.',
        likes: 22,
        isLiked: false,
        repliesCount: 0
      }
    ]
  }
];
