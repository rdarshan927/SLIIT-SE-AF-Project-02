const BASE_URL = "https://restcountries.com/v3.1";

export const fetchAllCountries = () =>
  fetch(`${BASE_URL}/all`).then(res => res.json());

export const fetchCountryByName = (name) =>
  fetch(`${BASE_URL}/name/${name}`).then(res => res.json());

export const fetchCountryByRegion = (region) =>
  fetch(`${BASE_URL}/region/${region}`).then(res => res.json());

export const fetchCountryByCode = (code) =>
  fetch(`${BASE_URL}/alpha/${code}`).then(res => res.json());

// The REST Countries API doesn't directly support filtering by language
// We'll fetch all countries and filter on the client side
export const fetchCountryByLanguage = async (language) => {
  const allCountries = await fetchAllCountries();
  return allCountries.filter(country => {
    if (!country.languages) return false;
    return Object.values(country.languages).some(
      lang => lang.toLowerCase().includes(language.toLowerCase())
    );
  });
};
