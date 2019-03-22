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
    const date = months[today.getMonth()] + ' ' + (today.getDate()) + ', ' + today.getFullYear();
    this.props.setActualDate(date);

    getWeatherFromUrl(url)
      .then(response => this.props.addWeather(response))
      .catch(e => {
        const { message, stack } = e;
        return this.props.getError({ message, stack });
      });
  }

  componentDidMount = () => {
    const url = weatherUrl();
    var today = new Date();
    this.weatherComponent(url, today);
    
    setInterval(() => {
      this.weatherComponent(url, today);
    },
    600000);
  };

  render() {
    const { main } = this.props.weather;
    const { weather } = this.props.weather;
    if (main !== undefined) {
      return (
        <div className="row weatherStyles">
          <div className="col-lg-6">
            <img src={icons[weather[0].icon]} alt={weather[0].description} />
          </div>
          <div className="col-lg-6">
            <h1 className="weatherTemp">
              {Math.trunc(main.temp)}
              Cº
            </h1>
            <h4 className="cityName">Barcelona</h4>
            <p className="weatherDate">{this.props.date}</p>
          </div>
        </div>
      );
    }
    return (
      <div align="center" className="weatherContainer">
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
