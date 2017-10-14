import React, { Component } from 'react';
import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = require('../config/keys').GOOGLE_MAP_API_KEY;

class GoogleMap extends Component{
  componentDidMount(){
    const map = this.refs.map;
    const lat = this.props.lat;
    const lng = this.props.lon;
    GoogleMapsLoader.load(function(google){
      new google.maps.Map(map, {
        zoom: 12,
        center: { lat, lng }
      });
    });
  }

  render(){
    return (<div ref="map" />);
  }
}

export default GoogleMap;
