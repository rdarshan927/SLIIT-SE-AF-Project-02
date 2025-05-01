import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchCountryByCode } from '../services/api';
import CountryCard from '../components/CountryCard';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { currentUser } = useAuth();
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFavorites = async () => {
      if (!currentUser || !currentUser.favorites.length) {
        setFavoriteCountries([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const countries = await Promise.all(
          currentUser.favorites.map(async (code) => {
            const data = await fetchCountryByCode(code);
            return data?.[0];
          })
        );
        setFavoriteCountries(countries.filter(Boolean));
      } catch (error) {
        console.error('Error fetching favorite countries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getFavorites();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-center pt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Favorites</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-lg mx-auto">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Please sign in to view and manage your favorite countries.
            </p>
            <Link
              to="/login"
              className="inline-block px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Your Favorite Countries
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : favoriteCountries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favoriteCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              You haven't added any countries to your favorites yet.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Countries
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;