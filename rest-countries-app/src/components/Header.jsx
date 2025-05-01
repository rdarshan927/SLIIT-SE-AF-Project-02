import React from "react";

const Header = ({ search, setSearch, region, setRegion, language, setLanguage }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="relative w-full md:w-1/3">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 w-full px-4 py-3 border-0 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full px-4 py-3 border-0 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none cursor-pointer"
        >
          <option value="">Filter by Region</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Europe">Europe</option>
          <option value="Americas">Americas</option>
          <option value="Oceania">Oceania</option>
        </select>
        
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-4 py-3 border-0 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none cursor-pointer"
        >
          <option value="">Filter by Language</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="Arabic">Arabic</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Russian">Russian</option>
          <option value="Chinese">Chinese</option>
          <option value="German">German</option>
          <option value="Japanese">Japanese</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
