import axios from 'axios'

const countriesBaseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const openWeatherBaseUrl = 'https://openweathermap.org'
const openWeatherApiUrl = 'https://api.openweathermap.org'

const getAllCountries = () => {
  return axios
      .get(`${countriesBaseUrl}/api/all`)
      .then(({ data }) => data)
}

const getWeather = (lat, lng) => {
  return axios
      .get(`${openWeatherApiUrl}/data/2.5/weather`, {
        params: {
          units: 'metric',
          lat: lat,
          lon: lng,
          appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
        }
      })
      .then(({ data }) => {
        const [{ icon, description }] = data.weather // use a primary weather condition([0])
        return {
          temp: data.main.temp,
          windSpeed: data.wind.speed,
          conditionIcon: {
            png: `${openWeatherBaseUrl}/payload/api/media/file/${icon}.png`,
            alt: description
          },
        }
      })
}

export default {getAllCountries, getWeather}
