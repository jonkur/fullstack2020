import React from 'react'

const CountryFilter = ({countryFilter, updateCountryFilter}) => (
    <div>
        Find countries:
        <input value={countryFilter} onChange={updateCountryFilter} />
    </div>
)

export default CountryFilter