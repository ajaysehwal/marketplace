"use client";
import { useState, useEffect } from "react";
import { SearchControls } from "@/components/search/SearchControls";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SearchResults } from "@/components/search/SearchResults";
import { ApiFilter, SearchParams } from "@/types/api-types";
import { getFilteredApis } from "@/lib/api-search";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Loader2, Database, Filter } from "lucide-react";
import { toast } from "sonner";

const BrowseApis = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    page: 1,
    perPage: 9,
    sortBy: "popularity",
  });
  const [searchResults, setSearchResults] = useState<{
    results: any[];
    pagination: {
      total: number;
      page: number;
      perPage: number;
      totalPages: number;
    };
  }>({
    results: [],
    pagination: { total: 0, page: 1, perPage: 9, totalPages: 0 },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const initialParams: SearchParams = {
      query: queryParams.get("query") || "",
      page: parseInt(queryParams.get("page") || "1"),
      perPage: parseInt(queryParams.get("perPage") || "9"),
      sortBy:
        (queryParams.get("sort") as SearchParams["sortBy"]) || "popularity",
    };

    setSearchParams(initialParams);
    setLoading(true);

    const fetchData = async () => {
      try {
        const results = await getFilteredApis(initialParams);
        setSearchResults(results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching APIs:", error);
        setLoading(false);
        toast.error("Failed to fetch APIs. Please try again.");
      }
    };

    fetchData();
  }, [location.search, toast]);

  const handleQueryChange = (query: string) => {
    setSearchParams((prev) => ({ ...prev, query }));
  };

  const handleSearch = () => {
    const params = { ...searchParams, page: 1 };
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (params.query) queryParams.set("query", params.query);
    if (params.sortBy && params.sortBy !== "popularity")
      queryParams.set("sort", params.sortBy);

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );

    const fetchData = async () => {
      try {
        const results = await getFilteredApis(params);
        setSearchResults(results);
        setSearchParams(params);
        setLoading(false);
        toast.success(`Found ${results.pagination.total} APIs`);
      } catch (error) {
        console.error("Error fetching APIs:", error);
        setLoading(false);
        toast.error("Failed to fetch APIs. Please try again.");
      }
    };

    fetchData();
  };

  const handleFilterChange = (filters: ApiFilter) => {
    setSearchParams((prev) => ({ ...prev, ...filters, page: 1 }));
    setLoading(true);

    const fetchData = async () => {
      try {
        const results = await getFilteredApis({
          ...searchParams,
          ...filters,
          page: 1,
        });
        setSearchResults(results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching APIs:", error);
        setLoading(false);
        toast.error("Failed to fetch APIs. Please try again.");
      }
    };

    fetchData();
  };

  const handleSortChange = (
    sortBy: "popularity" | "rating" | "newest" | "oldest"
  ) => {
    const params = { ...searchParams, sortBy };
    setSearchParams(params);
    setLoading(true);

    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("sort", sortBy);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );

    const fetchData = async () => {
      try {
        const results = await getFilteredApis(params);
        setSearchResults(results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching APIs:", error);
        setLoading(false);
        toast.error("Failed to fetch APIs. Please try again.");
      }
    };

    fetchData();
  };

  const handlePageChange = (page: number) => {
    const params = { ...searchParams, page };
    setSearchParams(params);
    setLoading(true);

    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", page.toString());
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );

    const fetchData = async () => {
      try {
        const results = await getFilteredApis(params);
        setSearchResults(results);
        setLoading(false);

        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error fetching APIs:", error);
        setLoading(false);
        toast.error("Failed to fetch APIs. Please try again.");
      }
    };

    fetchData();
  };

  const handleResetFilters = () => {
    const params: SearchParams = {
      query: searchParams.query,
      page: 1,
      perPage: searchParams.perPage,
      sortBy: searchParams.sortBy,
    };
    setSearchParams(params);
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (params.query) queryParams.set("query", params.query);
    if (params.sortBy && params.sortBy !== "popularity")
      queryParams.set("sort", params.sortBy);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );

    const fetchData = async () => {
      try {
        const results = await getFilteredApis(params);
        setSearchResults(results);
        setLoading(false);

        toast.success("Filters reset");
      } catch (error) {
        console.error("Error fetching APIs:", error);
        setLoading(false);
        toast.error("Failed to fetch APIs. Please try again.");
      }
    };

    fetchData();
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const closeFilters = () => {
    setShowFilters(false);
  };

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Discover APIs</h1>
        <p className="text-muted-foreground">
          Search our marketplace for the perfect APIs for your next project
        </p>
      </motion.div>

      <div className="mb-8">
        <SearchControls
          params={searchParams}
          onQueryChange={handleQueryChange}
          onSearch={handleSearch}
          onSortChange={handleSortChange}
          onToggleFilters={toggleFilters}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative">
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
            >
              <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs p-4 bg-background shadow-lg border-r border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <h2 className="text-lg font-medium">Filters</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeFilters}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <FilterSidebar
                  filters={searchParams}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden lg:block w-72 shrink-0">
          <FilterSidebar
            filters={searchParams}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        <div className="flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin">
                <Loader2 className="h-10 w-10 text-primary" />
              </div>
              <p className="mt-4 text-muted-foreground">Loading results...</p>
            </div>
          ) : searchResults.results.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <Database className="h-16 w-16 text-muted-foreground opacity-30" />
              <h3 className="mt-4 text-xl font-medium">No APIs found</h3>
              <p className="mt-1 text-muted-foreground">
                Try adjusting your search or filters to find what you&apos;re
                looking for
              </p>
              {searchParams.query ||
              Object.keys(searchParams).some(
                (key) => !["query", "page", "perPage", "sortBy"].includes(key)
              ) ? (
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={handleResetFilters}
                >
                  Reset all filters
                </Button>
              ) : null}
            </motion.div>
          ) : (
            <SearchResults
              results={searchResults.results}
              pagination={searchResults.pagination}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseApis;
