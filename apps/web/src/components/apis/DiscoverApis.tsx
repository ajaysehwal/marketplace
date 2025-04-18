import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRightIcon, Star, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

// Enhanced API data with more entries and better organization
const popularApis = [
  {
    id: '1',
    name: 'Weather Data API',
    description:
      'Real-time global weather data and forecasts with over 20 atmospheric parameters',
    category: 'Weather',
    users: 15423,
    rating: 4.8,
    pricing: 'Free Tier',
    features: ['Hourly Forecasts', 'Historical Data', 'Extreme Weather Alerts'],
  },
  {
    id: '2',
    name: 'Payment Gateway API',
    description:
      'Secure payment processing for e-commerce with support for 50+ payment methods',
    category: 'Finance',
    users: 8976,
    rating: 4.6,
    pricing: 'Paid',
    features: ['Low Transaction Fees', 'Fraud Prevention', '24/7 Support'],
  },
  {
    id: '3',
    name: 'Image Recognition API',
    description:
      'AI-powered image analysis and object detection with 98% accuracy',
    category: 'AI',
    users: 6532,
    rating: 4.5,
    pricing: 'Free Tier',
    features: ['Face Detection', 'Object Recognition', 'Content Moderation'],
  },
  {
    id: '4',
    name: 'Geolocation API',
    description:
      'Precise location services with reverse geocoding and address validation',
    category: 'Mapping',
    users: 12075,
    rating: 4.7,
    pricing: 'Freemium',
    features: ['IP Geolocation', 'Address Validation', 'Distance Calculation'],
  },
  {
    id: '5',
    name: 'Text Translation API',
    description:
      'Neural machine translation supporting 100+ languages with dialect detection',
    category: 'Language',
    users: 9853,
    rating: 4.4,
    pricing: 'Usage-based',
    features: ['100+ Languages', 'Custom Terminology', 'Batch Processing'],
  },
  {
    id: '6',
    name: 'E-commerce Product API',
    description:
      'Access to millions of product data with real-time inventory and pricing',
    category: 'Commerce',
    users: 7421,
    rating: 4.3,
    pricing: 'Paid',
    features: ['Product Search', 'Price Comparison', 'Inventory Tracking'],
  },
];

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

export const DiscoverApis: React.FC = () => {
  return (
    <section className="from-background to-background/80 bg-gradient-to-b py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Discover Popular APIs</h2>
            <p className="text-muted-foreground">
              Explore the most used APIs powering modern applications
            </p>
          </div>
          <Button className="mt-4 md:mt-0" variant="default">
            Browse All APIs <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popularApis.map((api, index) => (
            <motion.div
              key={api.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-primary/10 border-border/50 flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-semibold">
                      {api.name}
                    </CardTitle>
                    <Badge
                      variant={api.category === 'AI' ? 'default' : 'outline'}
                      className="font-medium"
                    >
                      {api.category}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {api.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {api.features.map((feature, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-muted-foreground" />
                      <span className="font-medium">
                        {formatNumber(api.users)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star
                        size={16}
                        className="fill-amber-500 text-amber-500"
                      />
                      <span className="font-medium">{api.rating}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-2">
                  <div className="flex w-full items-center justify-between">
                    <Badge
                      variant={
                        api.pricing === 'Free Tier'
                          ? 'outline'
                          : api.pricing === 'Freemium'
                            ? 'secondary'
                            : 'default'
                      }
                    >
                      {api.pricing}
                    </Badge>
                    <Button variant="ghost" size="sm" className="gap-1">
                      View Details <Zap size={14} />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
