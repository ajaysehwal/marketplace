import { ApiData, UsageData } from '../types';

export const mockApis: ApiData[] = [
  {
    id: "1",
    name: "Payment Gateway API",
    description: "Secure payment processing and transaction management",
    version: "1.0.0",
    status: "published",
    category: "Finance",
    endpoints: 12,
    requests: 15000,
    rating: 4.5,
    createdAt: "2024-01-15",
    updatedAt: "2024-03-20"
  },
  {
    id: "2",
    name: "Authentication API",
    description: "User authentication and authorization services",
    version: "2.1.0",
    status: "published",
    category: "Security",
    endpoints: 8,
    requests: 25000,
    rating: 4.8,
    createdAt: "2024-02-01",
    updatedAt: "2024-03-18"
  },
  {
    id: "3",
    name: "Analytics API",
    description: "Data analytics and reporting services",
    version: "1.2.0",
    status: "draft",
    category: "Analytics",
    endpoints: 15,
    requests: 5000,
    rating: 4.2,
    createdAt: "2024-03-01",
    updatedAt: "2024-03-15"
  }
];

export const mockUsages: UsageData[] = [
  {
    id: "1",
    apiId: "1",
    apiName: "Payment Gateway API",
    consumer: {
      id: "101",
      name: "E-commerce Platform",
      email: "tech@ecommerce.com"
    },
    status: "active",
    quota: { used: 12000, total: 20000 },
    requests: 12000,
    date: "2024-03-20"
  },
  {
    id: "2",
    apiId: "2",
    apiName: "Authentication API",
    consumer: {
      id: "102",
      name: "Social Media App",
      email: "dev@social.com"
    },
    status: "active",
    quota: { used: 18000, total: 25000 },
    requests: 18000,
    date: "2024-03-20"
  },
  {
    id: "3",
    apiId: "1",
    apiName: "Payment Gateway API",
    consumer: {
      id: "103",
      name: "Food Delivery Service",
      email: "api@fooddelivery.com"
    },
    status: "suspended",
    quota: 10000,
    requests: 8000,
    date: "2024-03-19"
  }
]; 