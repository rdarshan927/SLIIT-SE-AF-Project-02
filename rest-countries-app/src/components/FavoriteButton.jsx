import React from 'react';
import { useAuth } from '../context/AuthContext';

const FavoriteButton = ({ countryCode }) => {
  const { currentUser, toggleFavorite, isFavorite } = useAuth();
  const isFav = isFavorite(countryCode);
  
  if (!currentUser) return null;
  
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(countryCode);
      }}
      className={`absolute top-2 right-2 z-10 p-2 rounded-full ${
        isFav 
          ? 'bg-red-500 text-white' 
          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
      } hover:scale-110 transition-all duration-200`}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={isFav ? 'currentColor' : 'none'}
        stroke="currentColor" 
        className="w-5 h-5"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;