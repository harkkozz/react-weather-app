import React from 'react'
import { css } from 'emotion';
import { baseWeatherIconsAPI } from '../config/exportAPIs';
import { Grid, Card } from '@material-ui/core';

const WeatherInfo = ({ weatherData, unit }) => {

  const weatherConditionIcon = weatherData.weather.map(({ icon }) => `${baseWeatherIconsAPI}${icon}@2x.png`);
  const weatherConditionMain = weatherData.weather.map(({ main }) => main);
  const weatherConditionDescription = weatherData.weather.map(({ description }) => description).toString().toUpperCase();
  const temp = Math.round(weatherData.main.temp);
  const minTemp = Math.round(weatherData.main.temp_min);
  const maxTemp = Math.round(weatherData.main.temp_max);
  const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();

  return (
    <div className={css`
      text-align: center;
      margin-top: 5%;
    `}>
      <h1>{weatherData.name}, {weatherData.sys.country} ({ weatherConditionMain })</h1>
      <div className={css`display: inline-flex;`}>
        <img src={weatherConditionIcon} alt="Weather condition" />
        <h1>{ temp }&deg;{unit}</h1>
      </div>
      <Card elevation={5} className={css`margin-top: 50px;`}>
        <h3>{weatherConditionDescription}</h3>
        <Grid container direction="row" justify="center" alignItems="center" className={css`
          margin-top: 40px;
          text-align: left;
        `}>
          <Grid item className={css`
            margin: 0 20px;
            padding: 10px;
          `}>
            <Card elevation={3} className={css`height: 120px; padding: 20px;`}>
              <Card className={css`
                  background-color: lightblue; 
                  color: white;
                  text-align: center;
                  margin-bottom: 10px;
                `}>{ minTemp }&deg;{unit}</Card>
              <Card className={css`
                background-color: lightcoral; 
                color: white;
                text-align: center;
              `}>{ maxTemp }&deg;{unit}</Card>
              <p><b>Feels like:</b> { weatherData.main.feels_like }&deg;{unit}</p>
            </Card>
            
          </Grid>
          <Grid item className={css`
            padding: 20px;
          `}>
            <Card elevation={3} className={css`height: 120px; padding: 20px;`}>
              <p><b>Humidity: </b>{ weatherData.main.humidity } %</p>
              <p><b>Pressure: </b>{ weatherData.main.pressure }hpa</p>
              <p><b>Wind speed: </b>{ weatherData.wind.speed }m/s</p>
            </Card>
          </Grid>
          <Grid item className={css`
            padding: 20px;
          `}>
            <Card elevation={3} className={css`height: 120px; padding: 20px;`}>
              <p><b>Sunrise: </b>{ sunrise }</p>
              <p><b>Sunset: </b>{ sunset }</p>
            </Card>
          </Grid>
          <Grid item className={css`
            padding: 20px;
          `}>
            <Card elevation={3} className={css`padding: 20px;`}>
              <p><b>Geo coords: </b>[{ weatherData.coord.lat }, { weatherData.coord.lon }]</p>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </div>
    
  );
}

export default WeatherInfo;