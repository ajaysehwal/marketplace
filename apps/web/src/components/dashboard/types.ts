// API Data Interface
export interface ApiData {
  id: string;
  name: string;
  description: string;
  version: string;
  status: "draft" | "published" | "deprecated";
  category: string;
  endpoints: number;
  requests: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

// Usage Data Interface
export interface UsageData {
  id: string;
  apiId: string;
  apiName: string;
  consumer: {
    id: string;
    name: string;
    email: string;
  };
  status: "active" | "inactive" | "suspended";
  quota: number | { used: number; total: number };
  requests: number;
  date: string;
}

// Dashboard Stats Interface
export interface DashboardStats {
  totalApis: number;
  publishedApis: number;
  totalRequests: number;
  activeConsumers: number;
  averageRating: number;
}

// Component Props Interfaces
export interface ApiCardProps {
  api: ApiData;
  onPublish: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface UsageCardProps {
  usage: UsageData;
  onUpdateStatus: (id: string, status: UsageData["status"]) => void;
}

export interface OverviewTabProps {
  stats: DashboardStats;
}

export interface ApisTabProps {
  apis: ApiData[];
  onPublish?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export interface UsageTabProps {
  usages: UsageData[];
  onUpdateStatus?: (id: string, status: UsageData["status"]) => void;
}

export interface ConsumersTabProps {
  usages: UsageData[];
  onUpdateStatus: (usageId: string, newStatus: "active" | "inactive" | "suspended") => void;
} 