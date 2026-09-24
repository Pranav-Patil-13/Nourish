import riyaOatmealImg from '../../../assets/riya_oatmeal_bowl.jpg';
import riyaAvatarImg from '../../../assets/riya_avatar.jpg';
import runningGroupImg from '../../../assets/running_group_nashik.jpg';
import trainerArjunImg from '../../../assets/trainer_arjun.jpg';
import userAvatarImg from '../../../assets/user_avatar.jpg';
import bowlSaladImg from '../../../assets/bowl_salad.png';
import foodSalmonImg from '../../../assets/food_salmon.jpg';
import fitnessHeroImg from '../../../assets/fitness_hero_gym.jpg';
import plateScanImg from '../../../assets/scanner_food_plate.jpg';
import foodSteakImg from '../../../assets/food_steak.jpg';

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    author: {
      name: 'Riya Sharma',
      handle: 'riyasharma',
      avatar: riyaAvatarImg,
      badge: 'Fitness enthusiast'
    },
    timeAgo: '2h ago',
    image: riyaOatmealImg,
    caption: 'Simple breakfast that keeps me full for hours! Rolled oats, banana, blueberries, almonds.',
    macros: {
      calories: 420,
      protein: 16,
      fat: 12,
      carbs: 60
    },
    likesCount: 128,
    isLiked: false,
    isBookmarked: false,
    comments: [
      {
        id: 'c1',
        author: 'Karan Deshmukh',
        avatar: trainerArjunImg,
        timeAgo: '2h ago',
        text: 'Looks amazing! Do you add honey?',
        likes: 4,
        isLiked: false,
        repliesCount: 2
      },
      {
        id: 'c2',
        author: 'Neha Patil',
        avatar: userAvatarImg,
        timeAgo: '1h ago',
        text: 'This is my go-to breakfast too! Super filling.',
        likes: 1,
        isLiked: false,
        repliesCount: 0
      }
    ]
  },
  {
    id: 'post-2',
    author: {
      name: 'Arjun Mehta',
      handle: 'arjun_trainer',
      avatar: trainerArjunImg,
      badge: 'Certified Trainer'
    },
    timeAgo: '4h ago',
    image: fitnessHeroImg,
    caption: 'Leg day done. Consistency > Motivation. Focused on progressive overload today.',
    macros: null,
    likesCount: 96,
    isLiked: false,
    isBookmarked: false,
    comments: []
  },
  {
    id: 'post-3',
    author: {
      name: 'Vikram Rao',
      handle: 'vikram_lift',
      avatar: userAvatarImg,
      badge: 'Powerlifter'
    },
    timeAgo: '5h ago',
    image: foodSteakImg,
    caption: 'Deadlift PR today! 120kg. Small steps, big progress.',
    macros: {
      calories: 550,
      protein: 45,
      fat: 18,
      carbs: 20
    },
    likesCount: 245,
    isLiked: false,
    isBookmarked: false,
    comments: []
  },
  {
    id: 'post-4',
    author: {
      name: 'Priya Nair',
      handle: 'priya_greens',
      avatar: riyaAvatarImg,
      badge: 'Nutritionist'
    },
    timeAgo: '6h ago',
    image: bowlSaladImg,
    caption: 'Meal prep for the week. Keeps me on track and energized every afternoon.',
    macros: {
      calories: 312,
      protein: 24,
      fat: 8,
      carbs: 35
    },
    likesCount: 312,
    isLiked: false,
    isBookmarked: false,
    comments: []
  }
];

export const CHALLENGES_LIST = [
  {
    id: 'ch-1',
    title: '21 Day Healthy Eating Challenge',
    dateRange: '1 Oct - 21 Oct',
    participantsCount: '12.4k joined',
    image: plateScanImg,
    category: 'Nutrition',
    desc: 'Focus on unprocessed whole foods, drinking 2.5L water daily, and mindful eating.',
    isJoined: false
  },
  {
    id: 'ch-2',
    title: '30 Day Workout Consistency',
    dateRange: 'Any workout • 30 days',
    participantsCount: '8.1k joined',
    image: trainerArjunImg,
    category: 'Fitness',
    desc: 'Commit to at least 25 minutes of active movement every single day for 30 days.',
    isJoined: true
  },
  {
    id: 'ch-3',
    title: '10K Steps Daily',
    dateRange: 'Walk 10,000 steps • 21 days',
    participantsCount: '15.3k joined',
    image: runningGroupImg,
    category: 'Cardio',
    desc: 'Hit your 10,000 daily step goal and share your walking routes with the community.',
    isJoined: false
  }
];

export const GROUPS_LIST = [
  {
    id: 'grp-nashik',
    name: 'Nashik Fitness Community',
    membersCount: '2.4k members',
    type: 'Public group',
    category: 'Nearby',
    coverImage: runningGroupImg,
    description: 'A community for fitness enthusiasts in Nashik. Share your workouts, find gym buddies, discuss nutrition and stay motivated together.',
    isJoined: true,
    posts: [
      {
        id: 'gp-1',
        author: {
          name: 'Sameer Pawar',
          avatar: userAvatarImg,
          handle: 'sameer_runs'
        },
        timeAgo: '3h ago',
        caption: 'Morning run at Pandav Leni. 5.2 km - felt great!',
        image: runningGroupImg,
        likesCount: 88,
        commentsCount: 14
      }
    ]
  },
  {
    id: 'grp-veg',
    name: 'Veg Meal Ideas',
    membersCount: '5.1k members',
    type: 'Public group',
    category: 'Interests',
    coverImage: bowlSaladImg,
    description: 'Delicious high-protein plant-based vegetarian and vegan recipes with macros.',
    isJoined: false
  },
  {
    id: 'grp-weightloss',
    name: 'Weight Loss Journey',
    membersCount: '8.7k members',
    type: 'Public group',
    category: 'Interests',
    coverImage: foodSalmonImg,
    description: 'Share progress, healthy substitutions, and keep each other accountable.',
    isJoined: false
  },
  {
    id: 'grp-homeworkouts',
    name: 'Home Workouts',
    membersCount: '4.3k members',
    type: 'Public group',
    category: 'Interests',
    coverImage: fitnessHeroImg,
    description: 'Calisthenics, resistance band routines, and dumbbell workouts with no gym required.',
    isJoined: false
  },
  {
    id: 'grp-protein',
    name: 'High Protein Recipes',
    membersCount: '6.2k members',
    type: 'Public group',
    category: 'Interests',
    coverImage: foodSteakImg,
    description: 'Meal ideas packing 30g+ protein per serving.',
    isJoined: false
  },
  {
    id: 'grp-runners',
    name: 'Runners Club',
    membersCount: '3.9k members',
    type: 'Public group',
    category: 'Nearby',
    coverImage: runningGroupImg,
    description: 'Group running sessions, marathon prep, and trail running routes.',
    isJoined: false
  }
];

export const USER_PROFILES = {
  riyasharma: {
    name: 'Riya Sharma',
    handle: 'riyasharma',
    avatar: riyaAvatarImg,
    cover: runningGroupImg,
    postsCount: 124,
    followersCount: '12.4K',
    followingCount: 320,
    bio: 'Fitness enthusiast | Healthy food | Consistency • Nashik, India',
    isFollowing: false,
    posts: [
      { id: 'rp-1', image: riyaOatmealImg, calories: '420 kcal', likes: 128 },
      { id: 'rp-2', image: fitnessHeroImg, calories: 'Leg day', likes: 96 },
      { id: 'rp-3', image: bowlSaladImg, calories: 'Meal prep', likes: 312 },
      { id: 'rp-4', image: runningGroupImg, calories: '5 km run', likes: 88 }
    ]
  }
};

export const NOTIFICATIONS_COMMUNITY = [
  {
    id: 'cn-1',
    type: 'like',
    category: 'Likes',
    actor: 'Riya Sharma',
    avatar: riyaAvatarImg,
    text: 'liked your post',
    timeAgo: '2 min ago',
    thumb: riyaOatmealImg
  },
  {
    id: 'cn-2',
    type: 'comment',
    category: 'Comments',
    actor: 'Karan Deshmukh',
    avatar: trainerArjunImg,
    text: 'commented: Looks amazing! Do you add honey?',
    timeAgo: '5 min ago',
    thumb: riyaOatmealImg
  },
  {
    id: 'cn-3',
    type: 'follow',
    category: 'Mentions',
    actor: 'Neha Patil',
    avatar: userAvatarImg,
    text: 'started following you',
    timeAgo: '20 min ago'
  },
  {
    id: 'cn-4',
    type: 'group',
    category: 'Mentions',
    actor: 'Nashik Fitness Community',
    avatar: runningGroupImg,
    text: 'You were invited to join Nashik Fitness Community',
    timeAgo: '1 hour ago'
  },
  {
    id: 'cn-5',
    type: 'challenge',
    category: 'Mentions',
    actor: 'Community Bot',
    avatar: plateScanImg,
    text: 'Somebody completed 21 Day Healthy Eating Challenge',
    timeAgo: '2 hours ago'
  },
  {
    id: 'cn-6',
    type: 'mention',
    category: 'Mentions',
    actor: 'Arjun Mehta',
    avatar: trainerArjunImg,
    text: 'mentioned you in a comment',
    timeAgo: '3 hours ago'
  }
];
