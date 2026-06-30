'use client';

import { useState, useCallback } from 'react';
import { Technician, SearchFilters, SearchResults } from '@/lib/types';
import { request } from '@/lib/api';

export function useTechnicianSearch() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [results, setResults] = useState<SearchResults<Technician> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    page: 1,
    limit: 20,
  });

  const search = useCallback(async (searchFilters: SearchFilters = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const mergedFilters = { ...filters, ...searchFilters };
      setFilters(mergedFilters);

      // TODO: Replace with actual GraphQL query
      const SEARCH_TECHNICIANS = `
        query SearchTechnicians($query: String, $limit: Int, $offset: Int) {
          technicians(query: $query, limit: $limit, offset: $offset) {
            items {
              id
              name
              rating
              reviewCount
              yearsExperience
              priceRange { min max }
              services { id name }
            }
            total
            page
            pageSize
            hasMore
          }
        }
      `;

      const data = await request<{ technicians: SearchResults<Technician> }>(
        SEARCH_TECHNICIANS,
        {
          query: mergedFilters.query,
          limit: mergedFilters.limit,
          offset: ((mergedFilters.page || 1) - 1) * (mergedFilters.limit || 20),
        }
      );

      setResults(data.technicians);
      setTechnicians(data.technicians.items);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Search failed';
      setError(message);
      setTechnicians([]);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const nextPage = useCallback(async () => {
    if (!results || !results.hasMore) return;
    await search({ ...filters, page: (filters.page || 1) + 1 });
  }, [results, filters, search]);

  const previousPage = useCallback(async () => {
    if (!results || (filters.page || 1) <= 1) return;
    await search({ ...filters, page: (filters.page || 1) - 1 });
  }, [results, filters, search]);

  const clearFilters = useCallback(async () => {
    const defaultFilters = { page: 1, limit: 20 };
    setFilters(defaultFilters);
    await search(defaultFilters);
  }, [search]);

  return {
    technicians,
    results,
    isLoading,
    error,
    filters,
    search,
    nextPage,
    previousPage,
    clearFilters,
    setFilters,
  };
}
