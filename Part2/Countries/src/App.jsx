import { useState, useEffect } from 'react'
import axios from 'axios'

const getWeatherData = (lat, long, apiKey) => {
  return 
}

const Filter = ({ filterCountries, setSearch, weather }) => {
  

  if (filterCountries.length > 10) {
    return <h5>Too many matches, specify another filter</h5>
  }

  if (filterCountries.length === 1 && weather) {
    const country = filterCountries[0];
    const languages = Object.values(country.languages);

    return (
      <div>
        <h2>{country.name.common}</h2>
        <h5>Capital {country.capital}</h5>
        <h5>Area {country.area}</h5>
        <h3>Languages:</h3>
        <ul>
         {languages.map((language, id) => <h5 key={id}>{language}</h5>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt}/>
        <h2>Weather in {country.capital}</h2>
        <h5>temperature {weather.main.temp} Celsius</h5>
        <img src={"https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} />
        <h5>wind {weather.wind.speed} m/s</h5>
      </div>
    )
  }

  return (
    <div>
      {filterCountries.map((country, id) => {
        return (
          <div key={id}>
            <h5>{country.name.common}</h5>
            <button onClick={() => setSearch(country.name.common)}>show</button>
          </div>
        )
      })}
    </div>
  )
}

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(null);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const filterCountries = countries.filter(country => (
    country.name.common.toLowerCase().includes(search.toLowerCase())
  ));

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(res => {
        setCountries(res.data)
      })
  }, []);

  useEffect(() => {
    if (filterCountries.length === 1) {
      const country = filterCountries[0];
      const api_key = import.meta.env.VITE_SOME_KEY;

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}&units=metric`)
        .then(res => res.data)
        .then(weatherData => {
          setWeather(weatherData);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [filterCountries]);

  return (
    <div>
      <input onChange={handleSearch} placeholder='find countries'/>
      <Filter filterCountries={filterCountries} setSearch={setSearch} weather={weather}/>
    </div>
  )
}

export default App
