import axios from 'axios'

const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const apiKey = process.env.REACT_APP_WEATHER_API

const getCountries = () =>{
  return axios.get(url).then(response => response.data)
}

const getWeather = (lat, lon) =>{
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  return axios.get(url).then(response => response.data)
}




export default {getCountries, getWeather}

