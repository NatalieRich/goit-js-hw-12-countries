const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountry(countryeId) {
  return fetch(`${BASE_URL}/name/${countryeId}`).then(response =>
    response.json(),
  );
}

export default { fetchCountry };