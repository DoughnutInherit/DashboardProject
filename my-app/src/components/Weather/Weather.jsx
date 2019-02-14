import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Weather.css';
import { weatherUrl } from '../../urls';
import PropTypes from 'prop-types';
import { getWeatherFromUrl } from '../../services/serviceWorker';
import { addWeather } from '../../actions/action';

class Weather extends Component {
  static propTypes = {
    weather: PropTypes.object,
    addWeather: PropTypes.func,
  }

  componentDidMount = () => {
    const url = weatherUrl();
    getWeatherFromUrl(url)
      .then(response => this.props.addWeather(response))
      .catch(e => {
        const { message, stack } = e;
        return this.props.getError({ message, stack });
      });
  };

  render() {
    console.log(this.props.weather);
    const { main } = this.props.weather;
    const { weather } = this.props.weather;
    if (main !== undefined) {
      return (
        <div align="center">
          <h2>{main.temp - 273.15} Cº</h2>
          <p>{weather[0].main}</p>
          <p>Barcelona</p>
        </div>
      );
    }
    return (<div />);
  }
}

const mapStateToProps = (state) => ({
  weather: state.list.weather,
});

export default connect(mapStateToProps, {
  addWeather,
})(Weather);
