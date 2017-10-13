import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

import {Typeahead} from 'react-bootstrap-typeahead';
import axios from 'axios';
import Cities from 'list-of-us-cities';

class SearchBar extends Component {
  constructor(props){
      super(props);
      this.state = {
        term: '',
        autocomplete_array: []
      };
  }

  onInputChange = (value) =>{
    this.setState({
      term: value
    });
  }

  onFormSubmit = (event) =>{
    event.preventDefault();
    if (this.state.term === "") return;
    this.props.fetchWeather(this.state.term);
    this.setState({term: ''});
    this.refs.typeahead.getInstance().clear();
  }

  render(){
    return (
      <form onSubmit={ this.onFormSubmit } className="input-group">
        <Typeahead
          placeholder = {'Get a five-day forecast in your favorite cities'}
          options = { Cities }
          onInputChange={ this.onInputChange }
          minLength={3}
          submitFormOnEnter={true}
          autoFocus={true}
          ref="typeahead"
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    );
  }
}

function mapDispactchToProps(dispatch){
  return bindActionCreators({ fetchWeather: fetchWeather}, dispatch);
}

export default connect(null, mapDispactchToProps)(SearchBar);
