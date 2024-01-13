import { useState, useEffect } from 'react'
import data from './services/data'

const CountryInfos = ({country}) =>{
  return (
    <div style={{display:'inline-block'}}>
      <h2>{country.name.common}</h2>
      <p>Capital : {country.capital[0]}</p>
      <p>Area : {(country.area).toLocaleString()} km2</p>
      <p>Population : {(country.population).toLocaleString()}</p>
      <h3>Languages</h3>
      <ul>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png}/>
    </div>
  )
}

const CountryWeather = ({country}) => {
  const [condition, setCondition] = useState('')
  const [iconUrl, setIconUrl] = useState('')
  const [main, setMain] = useState({temp:'', humidity:'', temp_max:'', temp_min:'',feels_like:''})
  const lat = country.capitalInfo.latlng[0]
  const lon = country.capitalInfo.latlng[1]
  const style = {
    display:'inline-block',
    fontSize : 20,
    verticalAlign:'top',
    backgroundColor:'rgba(102, 102, 255, 0.247)',
    color:'rgb(18, 18, 70)',
    borderRadius:10,
    padding:20
  }

  useEffect(()=>{
    data.getWeather(lat, lon)
    .then(current =>{
      setIconUrl(`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`)
      setMain(current.main)
      setCondition(current.weather[0].description)
    })
  }, [])

  return (
    <div style={style}>
      <h2>Weather in {country.capital[0]}</h2>
      <img src={iconUrl}/><span style={{fontSize:40}}>{Math.round(main.temp)}°C</span><span>, {condition}</span><br/>
      <p>Feels like : {Math.round(main.feels_like)}°C   Humidity : {main.humidity} %</p>
      <p>Min-T : {Math.round(main.temp_min)}°C, Max-T : {Math.round(main.temp_max)}°C</p>
    </div>
  )
}

const Results = ({results, handleShow}) =>{
  if (results.length === 1){
    return (
      <>
      <CountryInfos country={results[0]} />
      <CountryWeather country={results[0]} />
      </>
    )
  } else if (results.length <= 10){
    return results.map(country =>{
      return (
        <li key={country.name.common} style={{listStyleType:"none"}}>
          {country.name.common} 
          <button onClick={()=> handleShow(country.name.common)}>Show</button>
        </li>
      )})
  } else {
    return <p>Too many matches, specify another filter</p>
  }
}

const App = () => {
  const [value, setValue] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const syncValue = event => { 
    setValue(event.target.value)
  }
  const matchResults = () => {
    return !value ? [] : allCountries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))
  }
  const handleShow = (value) =>{
    setValue(value)
  }

  useEffect(()=>{
    data.getCountries().then(allCountries => {
      setAllCountries(allCountries)
    })
  },[])

  return (
    <>
    <p>Find countries : <input value={value} onChange={syncValue} /></p>
    <Results results={matchResults()} handleShow={handleShow} />
    </>
  )
}



export default App