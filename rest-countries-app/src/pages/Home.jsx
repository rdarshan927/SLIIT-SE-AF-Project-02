import React, { useEffect, useState } from "react";
import { fetchAllCountries, fetchCountryByName, fetchCountryByRegion } from "../services/api";
import Header from "../components/Header";
import CountryCard from "../components/CountryCard";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    const getData = async () => {
      let data;
      if (search) {
        data = await fetchCountryByName(search);
      } else if (region) {
        data = await fetchCountryByRegion(region);
      } else {
        data = await fetchAllCountries();
      }
      setCountries(data);
    };
    getData();
  }, [search, region]);

  return (
    <div className="p-4">
      <Header search={search} setSearch={setSearch} region={region} setRegion={setRegion} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {countries?.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default Home;
