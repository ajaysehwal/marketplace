
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { categories } from "@/data/mockData";
import { Filter, SlidersHorizontal, Star, Check } from "lucide-react";
import { ApiFilter } from "@/types/api-types";

interface FilterSidebarProps {
  filters: ApiFilter;
  onFilterChange: (filters: ApiFilter) => void;
  onReset: () => void;
}

export const FilterSidebar = ({ filters, onFilterChange, onReset }: FilterSidebarProps) => {
  const handleCategoryChange = (categoryId: string) => {
    const currentCategories = filters.category || [];
    const newCategories = currentCategories.includes(categoryId) 
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    
    onFilterChange({ ...filters, category: newCategories });
  };

  const handlePricingChange = (pricing: 'free' | 'freemium' | 'paid') => {
    const currentPricing = filters.pricing || [];
    const newPricing = currentPricing.includes(pricing) 
      ? currentPricing.filter(p => p !== pricing)
      : [...currentPricing, pricing];
    
    onFilterChange({ ...filters, pricing: newPricing });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, rating });
  };

  const handleUpdatedChange = (period: 'day' | 'week' | 'month' | 'year') => {
    onFilterChange({ ...filters, updatedWithin: period });
  };

  const handleVerifiedChange = () => {
    onFilterChange({ ...filters, verified: !filters.verified });
  };

  const handleEndpointsChange = (value: number[]) => {
    onFilterChange({ 
      ...filters, 
      minEndpoints: value[0], 
      maxEndpoints: value[1] 
    });
  };

  return (
    <div className="w-full md:w-64 lg:w-72 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onReset}
          className="text-xs"
        >
          Reset
        </Button>
      </div>

      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">Categories</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category.id}`}
                checked={(filters.category || []).includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label 
                htmlFor={`category-${category.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {category.name} <span className="text-xs text-muted-foreground">({category.count})</span>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">Pricing</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="pricing-free" 
              checked={(filters.pricing || []).includes('free')}
              onCheckedChange={() => handlePricingChange('free')}
            />
            <Label htmlFor="pricing-free" className="text-sm font-normal cursor-pointer">Free</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="pricing-freemium" 
              checked={(filters.pricing || []).includes('freemium')}
              onCheckedChange={() => handlePricingChange('freemium')}
            />
            <Label htmlFor="pricing-freemium" className="text-sm font-normal cursor-pointer">Freemium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="pricing-paid" 
              checked={(filters.pricing || []).includes('paid')}
              onCheckedChange={() => handlePricingChange('paid')}
            />
            <Label htmlFor="pricing-paid" className="text-sm font-normal cursor-pointer">Paid</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <div 
                key={rating}
                className={`flex items-center cursor-pointer ${(filters.rating || 0) >= rating ? 'text-yellow-500' : 'text-muted-foreground'}`}
                onClick={() => handleRatingChange(rating)}
              >
                <Star 
                  className="h-5 w-5 fill-current" 
                />
              </div>
            ))}
          </div>
          <div className="text-xs text-center text-muted-foreground mt-1">
            {filters.rating ? `${filters.rating}+ stars` : "Any rating"}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">Updated Within</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={filters.updatedWithin || ''}
            onValueChange={(value) => handleUpdatedChange(value as any)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="day" id="r-day" />
              <Label htmlFor="r-day" className="text-sm font-normal cursor-pointer">Last 24 hours</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="week" id="r-week" />
              <Label htmlFor="r-week" className="text-sm font-normal cursor-pointer">Last week</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="month" id="r-month" />
              <Label htmlFor="r-month" className="text-sm font-normal cursor-pointer">Last month</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="year" id="r-year" />
              <Label htmlFor="r-year" className="text-sm font-normal cursor-pointer">Last year</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">Other Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="verified-provider" 
              checked={filters.verified || false}
              onCheckedChange={handleVerifiedChange}
            />
            <Label 
              htmlFor="verified-provider" 
              className="text-sm font-normal flex items-center gap-1 cursor-pointer"
            >
              Verified Providers
              <Check className="h-3 w-3 text-blue-500 opacity-80" />
            </Label>
          </div>
          
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal">Endpoints</Label>
              <span className="text-xs text-muted-foreground">
                {filters.minEndpoints || 0} - {filters.maxEndpoints || 50}+
              </span>
            </div>
            <Slider 
              min={0} 
              max={50} 
              step={1} 
              value={[filters.minEndpoints || 0, filters.maxEndpoints || 50]}
              onValueChange={handleEndpointsChange} 
              className="w-full" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
