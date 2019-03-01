import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Weather.css';
import PropTypes from 'prop-types';
import { months, weatherUrl } from '../../constants/constants';
import { getWeatherFromUrl } from '../../services/serviceWorker';
import { addWeather, setActualDate } from '../../actions/actionWeather';
import icons from '../../constants/icons/icons';


class Weather extends Component {
  static propTypes = {
    weather: PropTypes.object,
    addWeather: PropTypes.func,
    getError: PropTypes.func,
    setActualDate: PropTypes.func,
    date: PropTypes.string,
  }

  weatherComponent = (url, today) => {
    today = new Date();
    let date = months[today.getMonth()] + ' ' + (today.getDate()) + ', ' + today.getFullYear();
    this.props.setActualDate(date);
    
    getWeatherFromUrl(url)
      .then(response => this.props.addWeather(response))
      .catch(e => {
        const { message, stack } = e;
        return this.props.getError({ message, stack });
      }
    );
  }

  componentDidMount = () => {
    const url = weatherUrl();
    var today = new Date();
    this.weatherComponent(url, today);
    setInterval(() => {
        this.weatherComponent(url, today);
      }
    , 600000)
  };

  render() {
    const { main } = this.props.weather;
    const { weather } = this.props.weather;
    if (main !== undefined) {
      return (
        <div align="center" className="container">
          <h2>
            {Math.trunc(main.temp)}
            Cº
          </h2>
          <img src={icons[weather[0].icon]} alt={weather[0].description} width='20px' heigth='20px'/>
          <p>{weather[0].main}</p>
          <p>Barcelona</p>
          <p>{this.props.date}</p>
        </div>
      );
    }
    return (
      <div align="center" className="container">
        <h2>No hay datos</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  weather: state.list.weather,
  date: state.list.date,
});

export default connect(mapStateToProps, {
  addWeather, setActualDate,
})(Weather);
