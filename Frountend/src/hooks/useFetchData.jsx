import React from 'react'
import { useEffect,useState } from 'react'
import { token } from '../config'

const useFetchData = (url) => {
    const [data,setData] = useState([])
    const [loading,setLoding] = useState(false)
    const [error,setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoding(true);
            console.log("Fetching data from:", url);  // Debugging log
            try {
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const result = await res.json();
                if (!res.ok) {
                    throw new Error(result.message + '☹️');
                }
                setData(result.data);
                setLoding(false);
            } catch (err) {
                setLoding(false);
                setError(err.message);
            }
        };
        fetchData();
    }, [url]);
    

  return {
    data,loading,error,
  };
};

export default useFetchData
