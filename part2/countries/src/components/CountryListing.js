import React, {useState} from 'react'
import CountryDisplay from './CountryDisplay'

const CountryListing = ({setCountryFilter, filteredCountries, countryFilter}) => {
    const [country, setCountry] = useState('')
    
    if (country && filteredCountries.length === 1 &&
        country.name === filteredCountries[0].name) {
      return <CountryDisplay country={country} />
    } else if (!country && filteredCountries.length === 1) {
      setCountry(filteredCountries[0])
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      const exactMatchCountry = filteredCountries.find(c => c.name.toLowerCase() === countryFilter.toLowerCase())
      if (exactMatchCountry) {
        if (country && exactMatchCountry.name === country.name) {
          return <CountryDisplay country={country} />
        } else {
          setCountry(exactMatchCountry)
        }
      } else if (country) {
        setCountry('')
      } else {
        return (
          <div>
            {filteredCountries.map((c) => (
                <p key={c.name}>{c.name} 
                <button onClick={() => setCountryFilter(c.name)}>show</button></p>
            ))}
          </div>
        )
      }
    } else if (filteredCountries.length === 0) {
      if (country) setCountry('')
      return (
        <div>
          <p>No countries found.</p>
        </div>
      )
    } else {
      if (country) setCountry('')
      return (
        <div>
          <p>Too many matches, please specify more accurate filter</p>
        </div>
      )
    }
  }

  export default CountryListing