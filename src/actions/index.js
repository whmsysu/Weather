import axios from 'axios';

const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${ require('../config/keys').OPEN_WEATHER_MAP_API_KEY }`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city){
  const url = `${ROOT_URL}&q=${city}`;
  const request = axios.get(url);
  return {
    type: FETCH_WEATHER,
    payload: request
  };
}
