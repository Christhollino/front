import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface UsePostRequestOptions {
  headers?: Record<string, string>;
}

export const usePostRequest = <T>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<AxiosResponse<T> | null>(null);

  const postRequest = async (
    url: string,
    data: FormData | T,
    options: UsePostRequestOptions = {}
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<T>(url, data, {
        headers: {
          ...options.headers,
          ...(data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}),
        },
      });
      console.log(response)
      setResponse(response);
    } catch (err) {
      setError((err as any).message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, response, postRequest };
};
