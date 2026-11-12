import {useEffect, useState} from 'react'
import countriesService from './services/countries.js'
import Countries from "./components/Countries";

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService
        .getAllCountries()
        .then(setCountries)
  }, [])

  const getFilteredCountries = () => {
    if (!query) {
      return []
    }

    const iQuery = query.toLowerCase()

    // handles ambiguous search hits: like South Sudan and Sudan
    const country = countries.find(c => c.name.common.toLowerCase() === iQuery)
    if (country) {
      return [country]
    }

    return countries.filter(country =>
        country.name.common.toLowerCase().includes(iQuery)
    );
  }

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
      <div>
        find countries{': '}
        <input value={query} onChange={handleQueryChange} />
        <Countries
            countries={getFilteredCountries()}
            onShowCountry={setQuery}
        />
      </div>
  )
}

export default App
