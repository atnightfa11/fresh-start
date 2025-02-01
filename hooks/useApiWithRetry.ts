import { useState, useCallback } from 'react';

interface UseApiWithRetryOptions {
  maxRetries?: number;
  retryDelay?: number;
}

export function useApiWithRetry<T>(
  apiCall: () => Promise<T>,
  options: UseApiWithRetryOptions = {}
) {
  const { maxRetries = 3, retryDelay = 1000 } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      const result = await apiCall();
      setError(null);
      setRetryCount(0);
      return result;
    } catch (err) {
      console.error('API Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);

      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return execute(); // Retry the request
      }
      
      throw new Error(`Failed after ${maxRetries} retries: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [apiCall, maxRetries, retryDelay, retryCount]);

  const reset = useCallback(() => {
    setError(null);
    setRetryCount(0);
    setLoading(false);
  }, []);

  return {
    execute,
    loading,
    error,
    retryCount,
    reset,
  };
} 