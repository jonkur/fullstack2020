import React from 'react'
import WeatherDisplay from './WeatherDisplay'

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
      <WeatherDisplay country={country} />
    </div>
)

export default CountryDisplay