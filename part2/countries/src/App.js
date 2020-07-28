import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CountryFilter from './components/CountryFilter'
import CountryListing from './components/CountryListing'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const updateCountryFilter = (e) => {
    setCountryFilter(e.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountries(res.data))
    }, [])

    return (
      <div>
        <CountryFilter countryFilter={countryFilter} updateCountryFilter={updateCountryFilter} />
        <CountryListing setCountryFilter={setCountryFilter} countryFilter={countryFilter} filteredCountries={countries.filter(country => 
          country.name.toLowerCase().includes(countryFilter.toLowerCase()))} />
      </div>
    )
}

export default App;