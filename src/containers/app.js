import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import WeatherList from '../containers/weather_list';
import Location from 'browser-location';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

import GoogleMapsLoader from 'google-maps';

import { GOOGLE_MAP_API_KEY } from '../keys';

GoogleMapsLoader.KEY = GOOGLE_MAP_API_KEY;


class App extends Component {
  constructor(props){
      super(props);
      Location.get(function (err, position) {
        //=> null, {coords: {...}, timestamp: ...}
        if (err == null){
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          GoogleMapsLoader.load(function(google){
            new google.maps.Geocoder().geocode({'location': {lat, lng} }, (results, status) =>{
              for (let i=0; i<results[0].address_components.length; i++){
                  if (results[0].address_components[i].types[0] === "locality" ){
                    props.fetchWeather(results[0].address_components[i].long_name);
                    break;
                  }
              }
            });
          });
        }
        else{
          console.log(err);
          //default city new york
          props.fetchWeather('New York');
        }
      });
  }

  render() {
    return (
      <div style={{ padding: '50px 20px', textAlign: 'center' }}>
          <h1>Weather</h1>
          <SearchBar />
          <WeatherList />
      </div>
    );
  }
}


function mapDispactchToProps(dispatch){
  return bindActionCreators({ fetchWeather: fetchWeather}, dispatch);
}

export default connect(null, mapDispactchToProps)(App);
