import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';
import Spinner from 'react-spinkit';

import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = require('../config/keys').GOOGLE_MAP_API_KEY;

class WeatherList extends Component{
  renderWeather(cityData){
    if (cityData != null) {
      const name = cityData.city.name;
      const temps = cityData.list.map( weather => weather.main.temp);
      const pressures = cityData.list.map( weather => weather.main.pressure);
      const humidities = cityData.list.map( weather => weather.main.humidity);
      const lon = cityData.city.coord.lon;
      const lat = cityData.city.coord.lat;

      return (
        <tr key={ name }>
          <td><GoogleMap lon={lon} lat={lat} /></td>
          <td>
            <Chart data={temps} color = "orange" units="K"/>
          </td>
          <td>
            <Chart data={pressures} color = "green" units="hPa"/>
          </td>
          <td>
            <Chart data={humidities} color = "black" units="%"/>
          </td>
        </tr>
      );
    }
  }

  render(){
    if (this.props.weather.length === 0){
      const style = {
        width: "100%",
        textAlign: "center"
      }

      return (
        <div style={ style }>
          Retrieving current weather
          <Spinner name="ball-beat" />
        </div>
      );
    }

    const dataArray = this.props.weather.map(this.renderWeather);
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature(K)</th>
            <th>Presure (hPa)</th>
            <th>Humidity(%)</th>
          </tr>
        </thead>
        <tbody>
        { dataArray }
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state){
  return {
    weather: state.weather
  }
}

export default connect(mapStateToProps)(WeatherList);
