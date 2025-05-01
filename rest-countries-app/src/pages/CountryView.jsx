import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCountryByCode } from "../services/api";
import CountryDetails from "../components/CountryDetails";

const CountryView = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCountry = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCountryByCode(code);
        if (data && data.length > 0) {
          setCountry(data[0]);
          setError(null);
        } else {
          setError("Country not found");
        }
      } catch (err) {
        setError("Failed to load country details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    getCountry();
  }, [code]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-red-600 mb-4">{error}</h2>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Return Home
            </button>
          </div>
        ) : (
          <CountryDetails country={country} />
        )}
      </div>
    </div>
  );
};

export default CountryView;
