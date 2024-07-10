// DataFetcher.js
import { useState, useEffect } from 'react';

const useDataFetcher = (url) => {
  const [data, setData] = useState({ image_url: '', promptfordalle: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          throw new Error('Data fetching failed');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useDataFetcher;
