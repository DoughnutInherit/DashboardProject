import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Weather.css';
import PropTypes from 'prop-types';
import { months } from '../../constants/months';
import { weatherUrl } from '../../urls';
import { getWeatherFromUrl } from '../../services/serviceWorker';
import { addWeather, setActualDate } from '../../actions/actionWeather';

class Weather extends Component {
  static propTypes = {
    weather: PropTypes.object,
    addWeather: PropTypes.func,
    getError: PropTypes.func,
    setActualDate: PropTypes.func,
    date: PropTypes.string,
  }

  componentDidMount = () => {
    var today = new Date();
    let date = months[today.getMonth()] + ' ' + (today.getDate()) + ', ' + today.getFullYear();
    this.props.setActualDate(date);
    const url = weatherUrl();
    getWeatherFromUrl(url)
      .then(response => this.props.addWeather(response))
      .catch(e => {
        const { message, stack } = e;
        return this.props.getError({ message, stack });
      });
  };

  render() {
    const { main } = this.props.weather;
    const { weather } = this.props.weather;
    if (main !== undefined) {
      return (
        <div align="center">
          <h2>
            {main.temp}
            Cº
          </h2>
          <p>{weather[0].main}</p>
          <p>Barcelona</p>
          <p>{this.props.date}</p>
        </div>
      );
    }
    return (<div />);
  }
}

const mapStateToProps = (state) => ({
  weather: state.list.weather,
  date: state.list.date,
});

export default connect(mapStateToProps, {
  addWeather, setActualDate,
})(Weather);
