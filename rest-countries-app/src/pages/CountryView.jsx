import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCountryByCode } from "../services/api";
import CountryDetails from "../components/CountryDetails";

const CountryView = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetchCountryByCode(code).then(data => {
      setCountry(data[0]);
    });
  }, [code]);

  return (
    <div className="p-4">
      {country ? <CountryDetails country={country} /> : <p>Loading country...</p>}
    </div>
  );
};

export default CountryView;
