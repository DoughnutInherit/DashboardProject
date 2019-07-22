import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Appointment from '../../components/Appointment/Appointment';
import DynamicContent from '../../components/DynamicContent/DynamicContent';
import Birthday from '../../components/Birthday/Birthday';
import Weather from '../../components/Weather/Weather';
import {
  setEvents,
  setActionTime,
  setEvent,
} from '../../actions/actionAppointment';
import {
  getApiData,
} from '../../services/serviceWorker';

import * as signalR from '@aspnet/signalr';
import { HubConnectionBuilder } from '@aspnet/signalr';
import cookies from 'js-cookie';
import moment from 'moment';

import '../../../node_modules/video-react/dist/video-react.css';
import './Dashboard.css';

class Dashboard extends Component {
  static propTypes = {
    history: PropTypes.object,
    events: PropTypes.array,
    index: PropTypes.number,
    setActionTime: PropTypes.func,
    setEvents: PropTypes.func,
    setEvent: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      hubConnection: {},
    };
  }

  componentDidMount = () => {
    const hubConnection = new HubConnectionBuilder().withUrl("http://localhost:5000/eventos")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    hubConnection.start();
    this.getEvents();
    hubConnection.on("updateEvents", () => {
      window.location.reload();
    });
    this.setState({ hubConnection });
  }

  componentWillReceiveProps = (nextProps) => {
    const { events, setActionTime, setEvent } = nextProps;
    const now = moment();
    let timeRemeaningToStart;
    let timeRemeaningToEnd;

    if (events.length > 0 && events.length !== 0) {

      const eventStartTime = events[0].entryDate;
      const eventStopTime = events[0].departureDate;

      timeRemeaningToStart = moment(eventStartTime).diff(now);
      timeRemeaningToEnd = moment(eventStopTime).diff(now);

      setActionTime(timeRemeaningToEnd);
      setEvent(events[0])

      this.timer = setTimeout(() => {
        this.navigate('Event');
      }, timeRemeaningToStart);

    } else {
      setEvent({
        description: "Sin eventos para el dia de hoy, que tengas un buen dia!"
      })
    }

  }

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  }

  getEvents = () => {
    const cacheToken = cookies.get('token')
    const bearerToken = `Bearer ${cacheToken}`;
    const now = moment().format('YYYY-MM-DD');

    getApiData(`https://localhost:5001/api/event/${now}`, bearerToken)
      .then(response => {
        const events = response.filter(x => {
          const timeRemeaning = moment(x.departureDate).diff(moment());
          return timeRemeaning >= 0;
        });
        this.props.setEvents(events);
      })
      .catch((err) => {
        alert("Error: " + err.message);
        if (err.status === 401) {
          cookies.remove('token');
          this.navigate('Login');
        }
      });
  }

  navigate = (url) => {
    this.props.history.push(url);
  }

  checkAllDayEvent = () => {
    const { allDayEvent } = this.props;

    if (allDayEvent === undefined) {
      return false
    }

    return true;
  }

  render() {
    return (
      <div className="container-fluid dashboard">
        <Fragment>
          <div className="row topRow">
            <div className="col-lg-7 appointmentContainer shadow">
              <Appointment history={this.props.history} />
            </div>
            <div className="col-lg-4 offset-md-1 weatherContainer shadow">
              <Weather />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <Birthday />
            </div>
            <div className="col-lg-7 offset-md-1">
              <DynamicContent />
            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  index: state.appointment.eventIndex,
  events: state.appointment.events,
});

export default connect(mapStateToProps, {
  setEvents, setActionTime, setEvent
})(Dashboard);
