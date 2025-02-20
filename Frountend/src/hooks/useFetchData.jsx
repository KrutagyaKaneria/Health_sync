import { useEffect, useState } from "react";
import { token } from "../config"; // Ensure token is imported correctly

const useFetchData = (url) => {
  const [data, setData] = useState(null); // Use null instead of empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Something went wrong ☹️");
        }

        setData(result.data);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

      fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
