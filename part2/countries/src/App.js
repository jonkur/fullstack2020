import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CountryFilter = ({countryFilter, updateCountryFilter}) => (
  <div>
      Find countries:
      <input value={countryFilter} onChange={updateCountryFilter} />
  </div>
)

const CountryListing = ({setCountryFilter, filteredCountries, countryFilter}) => {
  if (filteredCountries.length > 10) {
    return (
      <div>
        <p>Too many matches, please specify more accurate filter</p>
      </div>
    )
  } else if (filteredCountries.length > 1) {
    const exactMatchCountry = 
      filteredCountries.find((country) => country.name.toLowerCase() === countryFilter.toLowerCase())
    if (exactMatchCountry) {
      return <CountryDisplay country={exactMatchCountry} />
    } else {
      return (
        <div>
          {filteredCountries.map((country) => (
              <p key={country.name}>{country.name}  
              <button onClick={() => setCountryFilter(country.name)}>show</button></p>
          ))}
        </div>
      )
    }
    } else if (filteredCountries.length === 1) {
      return (
        <CountryDisplay country={filteredCountries[0]} />
      )
    } else {
      return (
        <div>
          No countries found.
        </div>
      )
    }
}

const CountryDisplay = ({country}) => (
  <div>
    <h3>{country.name}</h3>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <h5>Spoken languages:</h5>
    <ul>
      {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
    </ul>
    <img style={{width: 300}} src={country.flag} alt='flag' />
  </div>
)

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