import React, { useEffect, useState } from "react";
import { 
  fetchAllCountries, 
  fetchCountryByName, 
  fetchCountryByRegion,
  fetchCountryByLanguage 
} from "../services/api";
import Header from "../components/Header";
import CountryCard from "../components/CountryCard";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        let data;
        if (search) {
          data = await fetchCountryByName(search);
        } else if (region) {
          data = await fetchCountryByRegion(region);
        } else if (language) {
          data = await fetchCountryByLanguage(language);
        } else {
          data = await fetchAllCountries();
        }
        setCountries(data || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [search, region, language]);

  // Clear other filters when one is selected
  const handleSearchChange = (value) => {
    setSearch(value);
    if (value) {
      setRegion("");
      setLanguage("");
    }
  };

  const handleRegionChange = (value) => {
    setRegion(value);
    if (value) {
      setSearch("");
      setLanguage("");
    }
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    if (value) {
      setSearch("");
      setRegion("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white w-full">
      <div className="container mx-auto px-4 py-8">
        <Header 
          search={search} 
          setSearch={handleSearchChange} 
          region={region} 
          setRegion={handleRegionChange}
          language={language}
          setLanguage={handleLanguageChange}
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : countries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {countries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-600 dark:text-gray-400">No countries found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
