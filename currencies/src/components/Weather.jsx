import {useEffect, useState} from 'react'
import countriesService from '../services/countries.js'

const Weather = ({ location, geolocation }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countriesService
        .getWeather(...geolocation)
        .then(setWeather)
  }, [location, geolocation])

  if (!weather) {
    return null
  }

  const {temp, conditionIcon, windSpeed} = weather
  return (
      <div>
        <h2>Weather in {location}</h2>
        <div>
          Temperature {temp} Celsius
        </div>
        <img src={conditionIcon.png} alt={conditionIcon.alt}/>
        <div>
          Wind {windSpeed} m/s
        </div>
      </div>
  )
}

export default Weather
