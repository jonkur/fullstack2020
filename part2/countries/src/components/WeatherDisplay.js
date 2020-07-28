import React, {useState, useEffect} from 'react'
import axios from 'axios'

const WeatherDisplay = ({country}) => {
    const [weather, setWeather] = useState('')

    useEffect(() => {
      let mounted = true
      axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${country.capital}`)
      .then(res => {
        if (mounted) setWeather(res.data)
      })
  
      return () => mounted = false
    }, [country.name, country.capital])
    
    if (weather.error && weather.error.code === 101) {
      return (
        <div>
          <p>Weatherstack API key not valid or configured</p>
          <p>Start app with "REACT_APP_WEATHERSTACK_API_KEY='(key here)' npm start"</p>
        </div>
      )
    } else if (!weather.current) {
      return (
        <div>
          <p>Could not fetch weather information for this location.</p>
          <p>Please try again a bit later...</p>
        </div>
      )
    } else {
      return (
        <div>
          <h4>Weather in {country.capital}</h4>
          <p>Temperature: {weather.current.temperature}</p>
          <img style={{width: 150}} src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} />
          <p>Wind: {weather.current.wind_speed}mph, direction {weather.current.wind_dir}</p>
        </div>
      )
    }
  }

  export default WeatherDisplay