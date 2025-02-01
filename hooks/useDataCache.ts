import { useState, useEffect, useCallback } from 'react';

interface CacheOptions {
  key: string;
  ttl?: number; // Time to live in milliseconds
}

export function useDataCache<T>(
  fetcher: () => Promise<T>,
  options: CacheOptions
) {
  const { key, ttl = 5 * 60 * 1000 } = options; // Default 5 minutes TTL
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check memory and localStorage cache
  const getCachedData = () => {
    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < ttl) {
          return data;
        }
      }
    } catch (err) {
      console.warn('Error reading from cache:', err);
    }
    return null;
  };

  // Update cache
  const updateCache = (newData: T) => {
    try {
      localStorage.setItem(key, JSON.stringify({
        data: newData,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.warn('Error writing to cache:', err);
    }
  };

  const fetchData = async (force = false) => {
    if (!force) {
      const cached = getCachedData();
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    try {
      const fresh = await fetcher();
      setData(fresh);
      updateCache(fresh);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refresh = useCallback(() => {
    return fetchData(true);
  }, []);

  const softRefresh = useCallback(() => {
    return fetchData(false);
  }, []);

  return {
    data,
    loading,
    error,
    refresh,
    softRefresh,
  };
} 