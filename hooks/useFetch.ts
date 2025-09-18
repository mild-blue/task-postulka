import { useEffect, useState } from 'react';

/**
 * Custom reusable hook for fetching data by calling the provided fetchFunction.
 * @param fetchFunction - A function that returns a Promise resolving to the data of type T.
 */
const useFetch = <T>(fetchFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (): Promise<void> => {
    try {
      // reset hooks
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('An unknown error occurred.'),
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
