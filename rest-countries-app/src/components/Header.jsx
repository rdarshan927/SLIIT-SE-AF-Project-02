import React from "react";

const Header = ({ search, setSearch, region, setRegion }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-blue-100 rounded-xl">
      <input
        type="text"
        placeholder="Search country by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 border rounded-md w-full md:w-1/3"
      />
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="px-4 py-2 border rounded-md w-full md:w-1/4"
      >
        <option value="">All Regions</option>
        <option value="Asia">Asia</option>
        <option value="Africa">Africa</option>
        <option value="Europe">Europe</option>
        <option value="Americas">Americas</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default Header;
