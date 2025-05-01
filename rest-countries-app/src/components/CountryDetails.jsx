import React from "react";
import { Link } from "react-router-dom";

const CountryDetails = ({ country }) => {
  const { name, flags, capital, region, population, languages, subregion, tld, currencies, borders } = country;
  
  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center px-4 py-2 mb-8 bg-white dark:bg-gray-800 rounded-md shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <div className="shadow-lg rounded-lg overflow-hidden">
          <img 
            src={flags.svg} 
            alt={`Flag of ${name.common}`} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{name.common}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
            <div>
              <p className="mb-2"><span className="font-semibold">Native Name:</span> {name.nativeName ? Object.values(name.nativeName)[0].common : name.common}</p>
              <p className="mb-2"><span className="font-semibold">Population:</span> {population.toLocaleString()}</p>
              <p className="mb-2"><span className="font-semibold">Region:</span> {region}</p>
              <p className="mb-2"><span className="font-semibold">Sub Region:</span> {subregion || 'N/A'}</p>
              <p className="mb-2"><span className="font-semibold">Capital:</span> {capital?.[0] || 'N/A'}</p>
            </div>
            
            <div>
              <p className="mb-2"><span className="font-semibold">Top Level Domain:</span> {tld?.[0] || 'N/A'}</p>
              <p className="mb-2">
                <span className="font-semibold">Currencies:</span>{" "}
                {currencies ? Object.values(currencies).map(currency => currency.name).join(', ') : 'N/A'}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Languages:</span>{" "}
                {languages ? Object.values(languages).join(', ') : 'N/A'}
              </p>
            </div>
          </div>
          
          {borders && borders.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Border Countries:</h3>
              <div className="flex flex-wrap gap-2">
                {borders.map(border => (
                  <Link 
                    key={border} 
                    to={`/country/${border}`}
                    className="px-6 py-1 bg-white dark:bg-gray-800 shadow-sm rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {border}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
