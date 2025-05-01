import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

const CountryCard = ({ country }) => {
  const { flags, name, capital, region, population, cca3 } = country;

  return (
    <Link to={`/country/${cca3}`} className="block h-full relative">
      <div className="h-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
        <div className="h-48 overflow-hidden relative">
          <FavoriteButton countryCode={cca3} />
          <img 
            src={flags.svg} 
            alt={name.common} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white truncate">{name.common}</h2>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p><span className="font-semibold">Population:</span> {population.toLocaleString()}</p>
            <p><span className="font-semibold">Region:</span> {region}</p>
            <p><span className="font-semibold">Capital:</span> {capital?.[0] || 'N/A'}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
