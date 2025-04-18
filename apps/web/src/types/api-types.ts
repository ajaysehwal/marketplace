
export interface ApiFilter {
    category?: string[];
    pricing?: ('free' | 'freemium' | 'paid')[];
    rating?: number;
    verified?: boolean;
    updatedWithin?: 'day' | 'week' | 'month' | 'year';
    minEndpoints?: number;
    maxEndpoints?: number;
    sortBy?: 'popularity' | 'rating' | 'newest' | 'oldest';
  }
  
  export interface SearchParams extends ApiFilter {
    query: string;
    page: number;
    perPage: number;
  }
  