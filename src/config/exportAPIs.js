import axios from 'axios';

export const baseWeatherAPI = axios.defaults.baseURL = process.env.REACT_APP_WEATHER_API_URL;
export const baseWeatherIconsAPI = process.env.REACT_APP_WEATHER_API_ICONS_URL;
export const openWeatherAPIkey = process.env.REACT_APP_WEATHER_API_KEY;