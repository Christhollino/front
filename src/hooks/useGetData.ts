import { useState, useEffect, useMemo } from 'react';
import axios, { AxiosResponse } from 'axios';

interface UseGetRequestOptions {
  headers?: Record<string, string>;
}

export const useGetRequest = <T>(url: string, options: UseGetRequestOptions = {}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const memoizedOptions = useMemo(() => options, [options]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response: AxiosResponse<T> = await axios.get<T>(url, {
          headers: memoizedOptions.headers,
        });
        setData(response.data);
      } catch (err) {
        setError((err as any).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, memoizedOptions]);

  return { loading, error, data };
};
