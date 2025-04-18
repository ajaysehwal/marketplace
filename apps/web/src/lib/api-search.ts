import { SearchParams } from "@/types/api-types";
import { allApis } from "@/data/mockData";
import { createClient } from "@/supabase/client";
// Function to fetch APIs from Supabase
export async function getFilteredApisFromDB(params: SearchParams) {
  const supabase = createClient();
  let query = supabase.from("apis").select("*");

  // Apply search query filter
  if (params.query) {
    query = query.or(
      `name.ilike.%${params.query}%,description.ilike.%${params.query}%`
    );
  }

  // Apply category filter
  if (params.category && params.category.length > 0) {
    query = query.in("category", params.category);
  }

  // Apply rating filter
  if (params.rating) {
    // Note: implement rating filter when you add ratings to your database
  }

  // Apply verification filter
  if (params.verified !== undefined) {
    // Note: implement verified filter when you add verification to your database
  }

  // Apply sorting
  if (params.sortBy) {
    switch (params.sortBy) {
      case "newest":
        query = query.order("created_at", { ascending: false });
        break;
      case "oldest":
        query = query.order("created_at", { ascending: true });
        break;
      default:
        query = query.order("created_at", { ascending: false });
        break;
    }
  }

  // Calculate pagination
  const from = (params.page - 1) * params.perPage;
  const to = from + params.perPage - 1;

  // Apply pagination
  query = query.range(from, to);

  // Execute the query
  const { data: results, error, count } = await query;

  if (error) {
    console.error("Error fetching APIs:", error);
    return {
      results: [],
      pagination: {
        total: 0,
        page: params.page,
        perPage: params.perPage,
        totalPages: 0,
      },
    };
  }

  // Calculate total pages
  const totalPages = count ? Math.ceil(count / params.perPage) : 0;

  return {
    results: results || [],
    pagination: {
      total: count || 0,
      page: params.page,
      perPage: params.perPage,
      totalPages,
    },
  };
}

// Keep the old function for fallback until the database integration is fully tested
export async function getFilteredApis(params: SearchParams) {
  try {
    // First try to fetch from the database
    return await getFilteredApisFromDB(params);
  } catch (error) {
    console.error(
      "Error fetching from database, falling back to mock data:",
      error
    );

    // Fallback to mock data
    let filteredApis = [...allApis];

    // Filter by search query
    if (params.query) {
      const query = params.query.toLowerCase();
      filteredApis = filteredApis.filter(
        (api) =>
          api.name.toLowerCase().includes(query) ||
          api.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (params.category && params.category.length > 0) {
      filteredApis = filteredApis.filter((api) =>
        params.category?.includes(api.category)
      );
    }

    // Filter by pricing
    if (params.pricing && params.pricing.length > 0) {
      filteredApis = filteredApis.filter((api) =>
        params.pricing?.includes(api.pricing)
      );
    }

    // Filter by minimum rating
    if (params.rating) {
      filteredApis = filteredApis.filter((api) => api.rating >= params.rating);
    }

    // Filter by verification status
    if (params.verified !== undefined) {
      filteredApis = filteredApis.filter((api) => {
        if (api.provider && "verified" in api.provider) {
          return api.provider.verified === params.verified;
        }
        return false;
      });
    }

    // Sort results
    if (params.sortBy) {
      switch (params.sortBy) {
        case "popularity":
          filteredApis.sort((a, b) => b.users - a.users);
          break;
        case "rating":
          filteredApis.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          filteredApis.sort(
            (a, b) =>
              new Date(b.updated).getTime() - new Date(a.updated).getTime()
          );
          break;
        case "oldest":
          filteredApis.sort(
            (a, b) =>
              new Date(a.updated).getTime() - new Date(b.updated).getTime()
          );
          break;
      }
    }

    // Calculate pagination
    const totalResults = filteredApis.length;
    const totalPages = Math.ceil(totalResults / params.perPage);
    const startIdx = (params.page - 1) * params.perPage;
    const endIdx = startIdx + params.perPage;

    const paginatedApis = filteredApis.slice(startIdx, endIdx);

    return {
      results: paginatedApis,
      pagination: {
        total: totalResults,
        page: params.page,
        perPage: params.perPage,
        totalPages: totalPages,
      },
    };
  }
}
