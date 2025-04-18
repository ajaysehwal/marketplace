import { MapPin, CloudCog, BarChart, Database, FileJson, MessageSquareText, Shield, ShoppingCart, Camera, Globe, CreditCard, Activity } from "lucide-react";

export const featuredApis = [
  {
    id: "1",
    name: "PaymentFlow API",
    description: "Process payments securely with support for multiple payment gateways and currencies",
    category: "Finance",
    provider: {
      name: "PaymentTech Inc.",
      avatar: "https://ui-avatars.com/api/?name=PT&background=6366f1&color=fff",
      verified: true,
    },
    pricing: "freemium" as const,
    users: 12500,
    rating: 4.8,
    updated: "2w ago",
    endpoints: 32,
  },
  {
    id: "2",
    name: "GeoLocation Master",
    description: "High-precision geolocation API with address validation and geocoding features",
    category: "Maps",
    provider: {
      name: "MapSystems",
      avatar: "https://ui-avatars.com/api/?name=MS&background=22c55e&color=fff",
      verified: true,
    },
    pricing: "paid" as const,
    users: 8700,
    rating: 4.6,
    updated: "3d ago",
    endpoints: 18,
  },
  {
    id: "3",
    name: "CloudStore Object API",
    description: "Cloud storage solution with seamless file upload, retrieval and management",
    category: "Storage",
    provider: {
      name: "CloudElite",
      avatar: "https://ui-avatars.com/api/?name=CE&background=3b82f6&color=fff",
      verified: true,
    },
    pricing: "freemium" as const,
    users: 15300,
    rating: 4.9,
    updated: "1w ago",
    endpoints: 24,
  },
  {
    id: "4",
    name: "DataInsight Analytics",
    description: "Advanced analytics API for processing large datasets with ML capabilities",
    category: "Data",
    provider: {
      name: "InsightLabs",
      avatar: "https://ui-avatars.com/api/?name=IL&background=f43f5e&color=fff",
    },
    pricing: "paid" as const,
    users: 6200,
    rating: 4.4,
    updated: "1m ago",
    endpoints: 42,
  },
];

export const trendingApis = [
  {
    id: "5",
    name: "AI Text Analyzer",
    description: "Natural language processing API for sentiment analysis, entity extraction and more",
    category: "AI & ML",
    provider: {
      name: "AIfoundry",
      avatar: "https://ui-avatars.com/api/?name=AI&background=a855f7&color=fff",
      verified: true,
    },
    pricing: "freemium" as const,
    users: 9800,
    rating: 4.7,
    updated: "5d ago",
    endpoints: 15,
  },
  {
    id: "6",
    name: "SecureAuth API",
    description: "Complete authentication solution with OAuth, MFA, and biometric verification",
    category: "Security",
    provider: {
      name: "AuthGuardian",
      avatar: "https://ui-avatars.com/api/?name=AG&background=84cc16&color=fff",
      verified: true,
    },
    pricing: "paid" as const,
    users: 11200,
    rating: 4.9,
    updated: "2d ago",
    endpoints: 27,
  },
  {
    id: "7",
    name: "E-commerce Platform API",
    description: "Complete toolkit for building online stores with inventory, payments, and shipping",
    category: "Retail",
    provider: {
      name: "ShopSphere",
      avatar: "https://ui-avatars.com/api/?name=SS&background=ec4899&color=fff",
    },
    pricing: "freemium" as const,
    users: 7400,
    rating: 4.5,
    updated: "1w ago",
    endpoints: 38,
  },
  {
    id: "8",
    name: "ImageProcessing API",
    description: "Image manipulation, optimization and analysis with AI-powered features",
    category: "Media",
    provider: {
      name: "PixelPerfect",
      avatar: "https://ui-avatars.com/api/?name=PP&background=f97316&color=fff",
      verified: true,
    },
    pricing: "free" as const,
    users: 14100,
    rating: 4.8,
    updated: "3d ago",
    endpoints: 22,
  }
];

export const popularApis = [
  {
    id: "9",
    name: "GlobalTranslate API",
    description: "Translate text between 100+ languages with context awareness and slang detection",
    category: "Language",
    provider: {
      name: "LingvoTech",
      avatar: "https://ui-avatars.com/api/?name=LT&background=06b6d4&color=fff",
      verified: true,
    },
    pricing: "freemium" as const,
    users: 19500,
    rating: 4.9,
    updated: "6d ago",
    endpoints: 12,
  },
  {
    id: "10",
    name: "FinReport Generator",
    description: "Generate detailed financial reports and analytics for businesses of all sizes",
    category: "Finance",
    provider: {
      name: "FinancePro",
      avatar: "https://ui-avatars.com/api/?name=FP&background=8b5cf6&color=fff",
    },
    pricing: "paid" as const,
    users: 5800,
    rating: 4.6,
    updated: "2w ago",
    endpoints: 29,
  }
];

export const allApis = [...featuredApis, ...trendingApis, ...popularApis];

export const categories = [
  {
    id: "finance",
    name: "Finance & Payments",
    iconName: "CreditCard",
    count: 243,
    color: "bg-blue-600",
  },
  {
    id: "ai",
    name: "AI & Machine Learning",
    iconName: "Activity",
    count: 187,
    color: "bg-purple-600",
  },
  {
    id: "maps",
    name: "Maps & Location",
    iconName: "MapPin",
    count: 156,
    color: "bg-green-600",
  },
  {
    id: "cloud",
    name: "Cloud Services",
    iconName: "CloudCog",
    count: 142,
    color: "bg-sky-600",
  },
  {
    id: "analytics",
    name: "Analytics",
    iconName: "BarChart",
    count: 128,
    color: "bg-red-600",
  },
  {
    id: "data",
    name: "Data & Databases",
    iconName: "Database",
    count: 114,
    color: "bg-amber-600",
  },
  {
    id: "dev",
    name: "Developer Tools",
    iconName: "FileJson",
    count: 97,
    color: "bg-indigo-600",
  },
  {
    id: "messaging",
    name: "Messaging",
    iconName: "MessageSquareText",
    count: 85,
    color: "bg-teal-600",
  },
  {
    id: "security",
    name: "Security",
    iconName: "Shield",
    count: 78,
    color: "bg-lime-600",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    iconName: "ShoppingCart",
    count: 72,
    color: "bg-pink-600",
  },
  {
    id: "media",
    name: "Media & Image",
    iconName: "Camera",
    count: 68,
    color: "bg-orange-600",
  },
  {
    id: "web",
    name: "Web Services",
    iconName: "Globe",
    count: 64,
    color: "bg-cyan-600",
  },
];

export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    description: "Essential API access for developers and small projects",
    price: "$0",
    period: "forever",
    features: [
      "100 API calls per day",
      "Access to public APIs",
      "Basic documentation",
      "Community support",
      "Rate limited endpoints"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    id: "pro",
    name: "Pro",
    description: "Professional API access with enhanced capabilities",
    price: "$49",
    period: "per month",
    features: [
      "10,000 API calls per day",
      "Access to premium APIs",
      "Advanced documentation",
      "Email support",
      "Webhook integrations",
      "Analytics dashboard"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    id: "business",
    name: "Business",
    description: "Enterprise-grade API solutions for large scale applications",
    price: "$199",
    period: "per month",
    features: [
      "100,000 API calls per day",
      "Access to all APIs",
      "Custom API endpoints",
      "24/7 priority support",
      "Advanced analytics",
      "SLA guarantees",
      "Custom integration support"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export const stats = [
  { id: 1, label: "APIs Available", value: "1,000+" },
  { id: 2, label: "Developers", value: "50,000+" },
  { id: 3, label: "API Calls Monthly", value: "1B+" },
  { id: 4, label: "Success Rate", value: "99.9%" },
];
