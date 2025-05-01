import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  const { flags, name, capital, region, population, cca3 } = country;

  return (
    <Link to={`/country/${cca3}`}>
      <div className="border rounded-xl p-4 hover:shadow-md transition">
        <img src={flags.svg} alt={name.common} className="w-full h-40 object-cover rounded-md" />
        <h2 className="text-xl font-bold mt-2">{name.common}</h2>
        <p>Capital: {capital?.[0]}</p>
        <p>Region: {region}</p>
        <p>Population: {population.toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default CountryCard;
