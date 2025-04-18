import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { SearchParams } from "@/types/api-types";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface SearchControlsProps {
  params: SearchParams;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  onSortChange: (sortBy: "popularity" | "rating" | "newest" | "oldest") => void;
  onToggleFilters: () => void;
}

export const SearchControls = ({
  params,
  onQueryChange,
  onSearch,
  onSortChange,
  onToggleFilters,
}: SearchControlsProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  // Count active filters
  const countActiveFilters = () => {
    let count = 0;

    if (params.category && params.category.length > 0) count++;
    if (params.pricing && params.pricing.length > 0) count++;
    if (params.rating && params.rating > 0) count++;
    if (params.updatedWithin) count++;
    if (params.verified) count++;
    if (params.minEndpoints || params.maxEndpoints) count++;

    return count;
  };

  const filterCount = countActiveFilters();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 w-full"
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Search APIs..."
            value={params.query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button onClick={onSearch} className="gap-2">
          <Search size={16} />
          Search
        </Button>
        <Button
          variant="outline"
          className="md:hidden gap-2"
          onClick={onToggleFilters}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {filterCount > 0 && (
            <Badge
              variant="secondary"
              className="ml-1 h-5 w-5 p-0 flex items-center justify-center"
            >
              {filterCount}
            </Badge>
          )}
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:inline-block">
            <span className="font-medium">Sort by:</span>
          </span>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <ArrowUpDown className="h-3.5 w-3.5" />
                {params.sortBy === "popularity" && "Popularity"}
                {params.sortBy === "rating" && "Highest Rating"}
                {params.sortBy === "newest" && "Newest"}
                {params.sortBy === "oldest" && "Oldest"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0" align="start">
              <div className="flex flex-col">
                <Button
                  variant="ghost"
                  className="justify-start rounded-none"
                  onClick={() => {
                    onSortChange("popularity");
                    setPopoverOpen(false);
                  }}
                >
                  Popularity
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start rounded-none"
                  onClick={() => {
                    onSortChange("rating");
                    setPopoverOpen(false);
                  }}
                >
                  Highest Rating
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start rounded-none"
                  onClick={() => {
                    onSortChange("newest");
                    setPopoverOpen(false);
                  }}
                >
                  Newest
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start rounded-none"
                  onClick={() => {
                    onSortChange("oldest");
                    setPopoverOpen(false);
                  }}
                >
                  Oldest
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={onToggleFilters}
          >
            <Filter className="h-3.5 w-3.5" />
            Filters
            {filterCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 h-5 w-5 p-0 flex items-center justify-center"
              >
                {filterCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {filterCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-wrap gap-2 text-xs"
        >
          {filterCount > 0 && (
            <div className="text-xs text-muted-foreground flex items-center">
              <span>Active filters:</span>
            </div>
          )}
          {params.category && params.category.length > 0 && (
            <Badge variant="outline" className="px-2 py-1 text-xs">
              {params.category.length} Categories
            </Badge>
          )}
          {params.pricing && params.pricing.length > 0 && (
            <Badge variant="outline" className="px-2 py-1 text-xs">
              {params.pricing.join(", ")}
            </Badge>
          )}
          {params.rating && params.rating > 0 && (
            <Badge variant="outline" className="px-2 py-1 text-xs">
              {params.rating}+ Stars
            </Badge>
          )}
          {params.updatedWithin && (
            <Badge variant="outline" className="px-2 py-1 text-xs">
              Updated:{" "}
              {params.updatedWithin === "day"
                ? "Last 24h"
                : params.updatedWithin === "week"
                ? "Last week"
                : params.updatedWithin === "month"
                ? "Last month"
                : "Last year"}
            </Badge>
          )}
          {params.verified && (
            <Badge variant="outline" className="px-2 py-1 text-xs">
              Verified Providers
            </Badge>
          )}
          {(params.minEndpoints || params.maxEndpoints) && (
            <Badge variant="outline" className="px-2 py-1 text-xs">
              Endpoints: {params.minEndpoints || 0} -{" "}
              {params.maxEndpoints || "50+"}
            </Badge>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
