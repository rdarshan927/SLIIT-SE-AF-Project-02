import React from "react";

const CountryDetails = ({ country }) => {
  const { name, flags, capital, region, population, languages } = country;
  return (
    <div className="p-4">
      <img src={flags.svg} alt={name.common} className="w-full max-w-md mx-auto rounded-xl" />
      <h1 className="text-3xl font-bold mt-4 text-center">{name.common}</h1>
      <p><strong>Capital:</strong> {capital?.[0]}</p>
      <p><strong>Region:</strong> {region}</p>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
      <p><strong>Languages:</strong> {Object.values(languages).join(', ')}</p>
    </div>
  );
};

export default CountryDetails;
