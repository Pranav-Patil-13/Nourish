import bowlSaladImg from '../../../assets/bowl_salad.png';
import foodSalmonImg from '../../../assets/food_salmon.jpg';
import foodSteakImg from '../../../assets/food_steak.jpg';
import foodPancakeImg from '../../../assets/food_pancake.jpg';
import foodSmoothieImg from '../../../assets/food_smoothie.jpg';
import foodNoodlesImg from '../../../assets/food_noodles.jpg';
import plateScanImg from '../../../assets/scanner_food_plate.jpg';

import gymInteriorImg from '../../../assets/gym_ironfit_interior.jpg';
import trainerArjunImg from '../../../assets/trainer_arjun.jpg';
import fitnessHeroImg from '../../../assets/fitness_hero_gym.jpg';
import deliveryRaviImg from '../../../assets/delivery_rider_ravi.jpg';

export const SUBSCRIPTION_HERO_DATA = {
  food: {
    title: 'Healthy Food',
    subtitle: 'Nutritious meals delivered to your door',
    image: bowlSaladImg,
    badge: 'Meals & Salads'
  },
  fitness: {
    title: 'Fitness & Training',
    subtitle: 'Gyms, personal trainers, classes and more.',
    image: fitnessHeroImg,
    badge: 'Gym & Studios'
  }
};

export const TRUST_HIGHLIGHTS = [
  { id: '1', title: 'Trusted partners', desc: 'Handpicked verified vendors' },
  { id: '2', title: 'Verified & quality checked', desc: '100% fresh and certified' },
  { id: '3', title: 'Easy auto-pay', desc: 'Hassle-free UPI & Cards' },
  { id: '4', title: 'Pause or cancel anytime', desc: 'No lock-in or hidden fees' }
];

export const SALADO_CITIES = [
  'Nashik',
  'Pune',
  'Mumbai',
  'Bengaluru',
  'Delhi NCR',
  'Hyderabad'
];

export const SALADO_OUTLETS = [
  {
    id: 'salado-nsk-1',
    name: 'SaladO Kitchen, College Road',
    city: 'Nashik',
    pincode: '422005',
    area: 'College Road',
    distance: '1.2 km',
    deliveryTime: '20-35 mins',
    status: 'Open - Fresh Dispatch',
    rating: 4.9,
    reviewsCount: 340,
    hygieneScore: '99% Certified',
    address: 'Shop 4, Anand Arcade, Near Big Bazaar, College Rd, Nashik',
    isPrimary: true
  },
  {
    id: 'salado-nsk-2',
    name: 'SaladO Studio, Gangapur Road',
    city: 'Nashik',
    pincode: '422013',
    area: 'Gangapur Road',
    distance: '2.8 km',
    deliveryTime: '30-45 mins',
    status: 'Open - Fresh Dispatch',
    rating: 4.8,
    reviewsCount: 215,
    hygieneScore: '98% Certified',
    address: 'Plot 12, Serene Heights, Opp Pramod Mahajan Garden, Gangapur Rd, Nashik',
    isPrimary: false
  },
  {
    id: 'salado-pun-1',
    name: 'SaladO Kitchen, Koregaon Park',
    city: 'Pune',
    pincode: '411001',
    area: 'Koregaon Park',
    distance: '1.5 km',
    deliveryTime: '25-40 mins',
    status: 'Open - Fresh Dispatch',
    rating: 4.9,
    reviewsCount: 520,
    hygieneScore: '99% Certified',
    address: 'Lane 7, Next to Saffron Court, Koregaon Park, Pune',
    isPrimary: true
  },
  {
    id: 'salado-pun-2',
    name: 'SaladO Hub, Baner High Street',
    city: 'Pune',
    pincode: '411045',
    area: 'Baner',
    distance: '2.4 km',
    deliveryTime: '30-45 mins',
    status: 'Open - Fresh Dispatch',
    rating: 4.8,
    reviewsCount: 410,
    hygieneScore: '98% Certified',
    address: 'Baner High Street, Commercial Hub 2, Baner, Pune',
    isPrimary: false
  },
  {
    id: 'salado-mum-1',
    name: 'SaladO Kitchen, Bandra West',
    city: 'Mumbai',
    pincode: '400050',
    area: 'Bandra West',
    distance: '1.1 km',
    deliveryTime: '25-35 mins',
    status: 'Open - Fresh Dispatch',
    rating: 4.9,
    reviewsCount: 890,
    hygieneScore: '99% Certified',
    address: 'Hill Road, Near Mehboob Studio, Bandra West, Mumbai',
    isPrimary: true
  },
  {
    id: 'salado-mum-2',
    name: 'SaladO Express, Powai Hiranandani',
    city: 'Mumbai',
    pincode: '400076',
    area: 'Powai',
    distance: '2.3 km',
    deliveryTime: '30-45 mins',
    status: 'Open - Fresh Dispatch',
    rating: 4.9,
    reviewsCount: 670,
    hygieneScore: '99% Certified',
    address: 'Galleria Mall Level 1, Hiranandani Gardens, Powai, Mumbai',
    isPrimary: false
  },
  {
    id: 'salado-blr-1',
    name: 'SaladO Kitchen, Indiranagar 100ft',
    city: 'Bengaluru',
    pincode: '560038',
    area: 'Indiranagar',
    distance: '1.6 km',
    deliveryTime: '25-40 mins',
    status: 'Open - Fresh Dispatch',
    rating: 4.9,
    reviewsCount: 1250,
    hygieneScore: '99% Certified',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru',
    isPrimary: true
  },
  {
    id: 'salado-blr-2',
    name: 'SaladO Hub, HSR Layout Sector 4',
    city: 'Bengaluru',
    pincode: '560102',
    area: 'HSR Layout',
    distance: '2.1 km',
    deliveryTime: '30-45 mins',
    status: 'Open - Fresh Dispatch',
    rating: 4.8,
    reviewsCount: 840,
    hygieneScore: '98% Certified',
    address: '27th Main Rd, Sector 4, HSR Layout, Bengaluru',
    isPrimary: false
  },
  {
    id: 'salado-del-1',
    name: 'SaladO Kitchen, DLF Cyber City',
    city: 'Delhi NCR',
    pincode: '122002',
    area: 'Cyber City',
    distance: '1.8 km',
    deliveryTime: '25-40 mins',
    status: 'Open - Fresh Dispatch',
    rating: 4.9,
    reviewsCount: 940,
    hygieneScore: '99% Certified',
    address: 'Building 10 Tower B, DLF CyberHub, Gurugram, Delhi NCR',
    isPrimary: true
  },
  {
    id: 'salado-hyd-1',
    name: 'SaladO Kitchen, Jubilee Hills Rd 36',
    city: 'Hyderabad',
    pincode: '500033',
    area: 'Jubilee Hills',
    distance: '1.7 km',
    deliveryTime: '25-40 mins',
    status: 'Open - Fresh Dispatch',
    rating: 4.9,
    reviewsCount: 780,
    hygieneScore: '99% Certified',
    address: 'Road No. 36, Near Peddamma Temple, Jubilee Hills, Hyderabad',
    isPrimary: true
  }
];

export const FOOD_PLANS = [
  {
    id: 'salad-plan',
    title: 'SaladO Essential',
    brand: 'SaladO',
    deliveries: '2 deliveries/week',
    description: 'Crisp & seasonal gourmet salads harvested fresh daily from SaladO cloud kitchens.',
    price: 800,
    period: 'month',
    category: 'Salads',
    image: bowlSaladImg,
    rating: 4.9,
    reviewsCount: 182,
    badge: 'SaladO Special',
    highlights: [
      '2 fresh salads delivered every week',
      'Harvested & prepped daily at SaladO kitchens',
      'Rotating seasonal menu crafted by SaladO chefs',
      'Auto-pay, zero hassle',
      'Track deliveries live inside the app'
    ],
    features: [
      { label: 'SaladO Kitchen Fresh', icon: 'Leaf' },
      { label: 'Verified Outlet', icon: 'Store' },
      { label: 'Flexible Pause Anytime', icon: 'RotateCcw' }
    ]
  },
  {
    id: 'healthy-meal-plan',
    title: 'Healthy Meal Plan',
    brand: 'SaladO',
    deliveries: '3 deliveries/week',
    description: 'Chef-prepared, macro-balanced nutritious lunches & dinners powered by SaladO.',
    price: 1500,
    period: 'month',
    category: 'Meals',
    image: plateScanImg,
    rating: 4.8,
    reviewsCount: 240,
    badge: 'SaladO Chef Choice',
    highlights: [
      '3 gourmet balanced meals per week',
      'Calorie-counted and macro-tracked automatically',
      'Clean chef-prepared balanced ingredients by SaladO',
      'Change delivery timings & addresses easily'
    ],
    features: [
      { label: 'Macro Balanced', icon: 'PieChart' },
      { label: 'SaladO Chef Crafted', icon: 'Utensils' },
      { label: 'Zero Preservatives', icon: 'ShieldCheck' }
    ]
  }
];

export const SAMPLE_MENUS = {
  'salad-plan': {
    thisWeek: [
      {
        id: 'm1',
        title: 'Mediterranean Salad',
        desc: 'Quinoa, feta, olives, greens, cucumber, lemon oregano vinaigrette',
        calories: 320,
        protein: 12,
        image: bowlSaladImg
      },
      {
        id: 'm2',
        title: 'Asian Sesame Salad',
        desc: 'Cabbage, carrot, tofu, crispy edamame, sesame ginger dressing',
        calories: 280,
        protein: 15,
        image: foodNoodlesImg
      },
      {
        id: 'm3',
        title: 'Classic Caesar',
        desc: 'Romaine, grilled chicken, parmesan crisps, light caesar dressing',
        calories: 350,
        protein: 26,
        image: foodSteakImg
      },
      {
        id: 'm4',
        title: 'Protein Harvest Bowl',
        desc: 'Grilled chicken, avocado, boiled farm egg, baby spinach',
        calories: 420,
        protein: 34,
        image: foodSalmonImg
      }
    ],
    nextWeek: [
      {
        id: 'm5',
        title: 'Avocado Greek Salad',
        desc: 'Ripe avocado, kalamata olives, heirloom cherry tomatoes, basil',
        calories: 310,
        protein: 10,
        image: bowlSaladImg
      },
      {
        id: 'm6',
        title: 'Smoked Salmon Crunch',
        desc: 'Wild smoked salmon, baby kale, capers, dill lemon dressing',
        calories: 380,
        protein: 28,
        image: foodSalmonImg
      },
      {
        id: 'm7',
        title: 'Thai Peanut Noodle Crunch',
        desc: 'Zucchini ribbons, roasted peanuts, crunchy peppers, cilantro',
        calories: 340,
        protein: 14,
        image: foodNoodlesImg
      }
    ]
  }
};

export const FITNESS_CATEGORIES = [
  {
    id: 'gyms',
    title: 'Gym Membership',
    subtitle: 'Unlimited access',
    priceText: 'From ₹999 / month',
    image: gymInteriorImg,
    categoryKey: 'gyms'
  },
  {
    id: 'personal-trainer',
    title: 'Personal Trainer',
    subtitle: '1:1 or small group',
    priceText: 'From ₹1,200 / month',
    image: trainerArjunImg,
    categoryKey: 'trainers'
  },
  {
    id: 'group-classes',
    title: 'Group Classes',
    subtitle: 'Yoga, HIIT, Strength & more',
    priceText: 'From ₹799 / month',
    image: foodPancakeImg, // yoga/group context
    categoryKey: 'classes'
  },
  {
    id: 'home-trainer',
    title: 'Home Trainer',
    subtitle: 'Certified trainers at your home',
    priceText: 'From ₹1,499 / month',
    image: fitnessHeroImg,
    categoryKey: 'home'
  }
];

export const GYM_LISTINGS = [
  {
    id: 'ironfit-studio',
    name: 'IronFit Studio',
    distance: '1.2 km',
    type: 'Gym • Fitness • Personal Training',
    rating: 4.8,
    reviewsCount: 326,
    basePrice: 1499,
    priceFormatted: '₹1,499 / month',
    isSponsored: true,
    image: gymInteriorImg,
    location: 'College Road, Nashik',
    about: 'Modern fitness facility with certified expert trainers, Olympic grade barbell platforms, flexible membership plans, and a highly supportive community atmosphere.',
    amenities: [
      { label: 'Changing Rooms', icon: 'Lock' },
      { label: 'Shower Facilities', icon: 'Droplets' },
      { label: 'Parking Available', icon: 'Car' },
      { label: 'Group Classes', icon: 'Users' }
    ],
    plans: [
      {
        id: 'plan-1m',
        name: 'Monthly Membership',
        duration: '1 Month',
        price: 1499,
        priceDisplay: '₹1,499',
        perMonth: '₹1,499 / month',
        badge: null,
        selectedDefault: true
      },
      {
        id: 'plan-3m',
        name: '3 Months Plan',
        duration: '3 Months',
        price: 3999,
        priceDisplay: '₹3,999',
        perMonth: '₹1,333 / month',
        badge: 'Save 11%'
      },
      {
        id: 'plan-6m',
        name: '6 Months Plan',
        duration: '6 Months',
        price: 6999,
        priceDisplay: '₹6,999',
        perMonth: '₹1,166 / month',
        badge: 'Save 22%'
      },
      {
        id: 'plan-12m',
        name: '12 Months Plan',
        duration: '12 Months',
        price: 11999,
        priceDisplay: '₹11,999',
        perMonth: '₹999 / month',
        badge: 'Best Value'
      }
    ],
    includes: [
      'Full gym access during all open hours',
      'Standard locker & shower amenities',
      'Access to weekly group functional classes',
      'Free initial body composition scan & diet consultation'
    ]
  },
  {
    id: 'core-fitness',
    name: 'Core Fitness',
    distance: '1.5 km',
    type: 'Gym • Strength',
    rating: 4.7,
    reviewsCount: 210,
    basePrice: 1299,
    priceFormatted: '₹1,299 / month',
    isSponsored: false,
    image: fitnessHeroImg,
    location: 'Gangapur Road, Nashik',
    about: 'High-intensity functional training club with cardio cinema, dedicated powerlifting zones, and recovery steam rooms.',
    amenities: [
      { label: 'Sauna & Steam', icon: 'CloudRain' },
      { label: 'Free Parking', icon: 'Car' },
      { label: 'Lockers', icon: 'Lock' }
    ],
    plans: [
      {
        id: 'cf-1m',
        name: 'Monthly Membership',
        duration: '1 Month',
        price: 1299,
        priceDisplay: '₹1,299',
        perMonth: '₹1,299 / month'
      }
    ]
  },
  {
    id: 'the-training-room',
    name: 'The Training Room',
    distance: '2.1 km',
    type: 'Personal Training • Crossfit',
    rating: 4.6,
    reviewsCount: 198,
    basePrice: 1199,
    priceFormatted: '₹1,199 / month',
    isSponsored: false,
    image: gymInteriorImg,
    location: 'Mahatma Nagar, Nashik',
    about: 'Specialized functional strength conditioning and athletic rehabilitation center.',
    amenities: [
      { label: 'Crossfit Rig', icon: 'Dumbbell' },
      { label: 'Physio on-site', icon: 'Activity' }
    ]
  },
  {
    id: 'fitzone',
    name: 'FitZone',
    distance: '2.4 km',
    type: 'Gym • Cardio',
    rating: 4.5,
    reviewsCount: 421,
    basePrice: 999,
    priceFormatted: '₹999 / month',
    isSponsored: false,
    image: fitnessHeroImg,
    location: 'Indira Nagar, Nashik',
    about: 'Spacious 24/7 fitness arena packed with modern machines, free weights, and spinning studios.',
    amenities: [
      { label: '24/7 Access', icon: 'Clock' },
      { label: 'Air Conditioned', icon: 'Wind' }
    ]
  }
];

export const TRAINER_PROFILES = [
  {
    id: 'arjun-mehta',
    name: 'Arjun Mehta',
    title: 'Certified Trainer',
    rating: 4.8,
    reviewsCount: 124,
    distance: '1.3 km',
    price: 1200,
    priceFormatted: '₹1,200 / month',
    sessionsInfo: '2 sessions per week',
    image: trainerArjunImg,
    tags: ['Strength', 'Weight Loss', 'Muscle Gain', 'Functional'],
    about: 'Helping people build a stronger and healthier version of themselves through personalized training, evidence-based biomechanics, and sustainable nutrition habits.',
    plans: [
      {
        id: 'arjun-1to1',
        title: '1:1 Personal Training',
        price: 1200,
        priceFormatted: '₹1,200 / month',
        sessions: '2 sessions per week',
        image: trainerArjunImg
      }
    ]
  }
];

export const INITIAL_ACTIVE_SUBSCRIPTIONS = {
  food: [
    {
      id: 'sub-food-1',
      title: 'SaladO Essential',
      price: 800,
      priceFormatted: '₹800 / month',
      schedule: '2 deliveries/week',
      nextDelivery: 'Thu, 25 Sep',
      status: 'Active',
      image: bowlSaladImg,
      deliveryStatus: 'Out for delivery',
      arrivingInMin: 12
    }
  ],
  fitness: [
    {
      id: 'sub-fit-1',
      title: 'IronFit Studio',
      planName: 'Gym Membership',
      price: 1499,
      priceFormatted: '₹1,499 / month',
      renewalDate: '24 Oct 2026',
      status: 'Active',
      image: gymInteriorImg
    }
  ]
};

export const NOTIFICATIONS_DATA = [
  {
    id: 'n1',
    category: 'Orders',
    type: 'delivery',
    title: 'Your salad is on the way!',
    desc: 'Arriving in 12 minutes.',
    time: '10 min ago',
    icon: 'Bike'
  },
  {
    id: 'n2',
    category: 'Fitness',
    type: 'trainer',
    title: 'Trainer session confirmed',
    desc: 'Your session with Arjun is booked for 24 Sep, 6:00 PM.',
    time: '2 hours ago',
    icon: 'CalendarCheck'
  },
  {
    id: 'n3',
    category: 'Orders',
    type: 'billing',
    title: 'Subscription renewed',
    desc: 'Your SaladO Essential subscription has been renewed for ₹800.',
    time: '1 day ago',
    icon: 'CreditCard'
  },
  {
    id: 'n4',
    category: 'Fitness',
    type: 'gym',
    title: 'New gym near you',
    desc: 'Core Fitness just opened 1.5 km away in Gangapur Road.',
    time: '2 days ago',
    icon: 'MapPin'
  },
  {
    id: 'n5',
    category: 'Offers',
    type: 'discount',
    title: 'Special offer',
    desc: 'Get 20% off on personal training this month.',
    time: '3 days ago',
    icon: 'Tag'
  }
];

export const LIVE_DELIVERY_DATA = {
  id: 'del-1092',
  orderName: 'SaladO Essential Delivery',
  expectedWindow: 'Today, 12:30 PM - 1:00 PM',
  statusHeadline: 'Your salad is on the way!',
  arrivingMin: 12,
  currentStageIndex: 1, // 0: Prepared, 1: Out for delivery, 2: Arriving soon, 3: Delivered
  stages: ['Prepared', 'Out for delivery', 'Arriving soon', 'Delivered'],
  driver: {
    name: 'Ravi',
    vehicle: 'On an EV bike',
    avatar: deliveryRaviImg,
    phone: '+91 98234 56789'
  },
  destination: 'Pranav Patil, College Road, Nashik'
};
