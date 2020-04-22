import React, { useState } from 'react';
import { Container, Box, ButtonGroup, Button  } from '@material-ui/core';
import { css } from 'emotion';
import SearchCity from './components/SearchCity';
import WeatherInfo from './components/WeatherInfo';
import { baseWeatherAPI, openWeatherAPIkey } from './config/exportAPIs';
import loadingSpinner from './assets/loading-spinner.gif';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [cityForecast, setCityForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unitState, setUnitState] = useState('');

  const handleChange = ({ target }) => ({
    [target.name]: setCity(target.value),
  })

  const changeUnit = (unit) => {
    setUnitState(unit);
  }

  const requestWeatherForCity = async (unit) => {
    setLoading(true);
    changeUnit(unit === 'metric' ? 'C' : 'F');
    const { data } = await axios.get(`${baseWeatherAPI}`, {
      params: {
        q: city,
        appid: openWeatherAPIkey,
        units: unit,
      }
    })
    setCityForecast([data]);
    setLoading(false);
  }
  
  
  return (
    <Box>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button disabled={city.length > 2 ? false : true } onClick={() => requestWeatherForCity('metric')}>&deg;C</Button>
        <Button disabled={city.length > 2 ? false : true } onClick={() => requestWeatherForCity('imperial')}>&deg;F</Button>
      </ButtonGroup>
      <Container>
        <SearchCity cityName={city} onValueChange={handleChange} search={() => requestWeatherForCity('metric')}/>
        {
          loading ? (
                <img className={css`
                  position: absolute;
                  left: 0;
                  right: 0;
                  margin: auto;
                `} src={loadingSpinner} alt="loading" />
          ) : 
          cityForecast.map((data, index) => {
            return <WeatherInfo key={index} weatherData={data} unit={unitState} />
          })
          
        }
      </Container>
    </Box>
  );
}

export default App;
