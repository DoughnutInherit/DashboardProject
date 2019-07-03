import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  setEvents, setEvent, setIndex, setActionTime,
} from '../../actions/actionAppointment';
import './Appointment.css';
import {
  calculateTimeDiff,
  checkIfShowNewEvent,
  getApiData,
} from '../../services/serviceWorker';

class Appointment extends Component {
  static propTypes = {
    history: PropTypes.object,
    event: PropTypes.object,
    events: PropTypes.array,
    setEvents: PropTypes.func,
    setEvent: PropTypes.func,
    index: PropTypes.number,
    allDayEvent: PropTypes.object,
    setAllDayEvent: PropTypes.object,
    setActionTime: PropTypes.func,
    setIndex: PropTypes.func,
    bearerToken: PropTypes.object,
  }

  navigate = (url) => {
    this.props.history.push(url);
  }

  componentDidUpdate = () => {
    const now = moment();
    const { title } = this.props.allDayEvent;
    const { index, events } = this.props;
    const ADE = title;
    let timeRemeaningToStart;
    let timeRemeaningToEnd;


    // Case hay eventos
    if (events.length !== 0) {
      const checkShowNewEvent = checkIfShowNewEvent(index, events, ADE);
      if (!checkShowNewEvent) {
        // Case: NO Show
        if (index < events.length) {
          if (ADE === undefined) {
            timeRemeaningToStart = calculateTimeDiff(now, moment(events[index].entryDate));
            timeRemeaningToEnd = calculateTimeDiff(now, moment(events[index].departureDate));
          } else if (events.length !== 1) {
            timeRemeaningToStart = 0;
            timeRemeaningToEnd = calculateTimeDiff(now, moment(events[index].entryDate));
          } else {
            timeRemeaningToStart = 0;
            timeRemeaningToEnd = calculateTimeDiff(now, moment(events[0].departureDate));
          }
        } else if (ADE !== undefined) {
          timeRemeaningToStart = 0;
          timeRemeaningToEnd = calculateTimeDiff(now, moment(events[0].departureDate));
          this.props.setEvent(events[0]);
        }
      } else {
        // Case: Show event
        timeRemeaningToStart = calculateTimeDiff(now, moment(events[index].entryDate));
        timeRemeaningToEnd = calculateTimeDiff(now, moment(events[index].departureDate));
      }
    }

    if ((index < events.length && events.length !== 0) || (ADE !== undefined)) {
      this.props.setActionTime(timeRemeaningToEnd);
      this.timer = setTimeout(() => {
        this.navigate('Event');
      }, timeRemeaningToStart);
    }
  }

  componentDidMount = () => {
    const bearerToken = `Bearer ${this.props.bearerToken}`;
    const now = moment().format('YYYY-MM-DD');
    getApiData(`https://localhost:5001/api/event/${now}`, bearerToken)
      .then(response => {
        const events = response.filter(x => {
          const timeRemeaning = calculateTimeDiff(moment(), moment(x.departureDate));
          return timeRemeaning >= 0;
        });
        this.props.setEvents(events);
      })
      .catch(() => {
        alert('Your validation is expired!');
        this.navigate('Login');
      });
  };

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div className="row eventContainer">
        <div className="col">
          <h2 className="eventTitle">Próximas visitas:</h2>
        </div>
        <div className="w-100" />
        <div className="col">
          {this.props.event === undefined
            ? <p className="eventDescription">Sin eventos</p>
            : <p className="eventDescription">{this.props.event.description}</p>
          }

          {this.props.event.entryDate !== undefined
            ? <p>{this.props.event.entryDate.toLocaleString()}</p>
            : <p />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  index: state.appointment.eventIndex,
  event: state.appointment.event,
  allDayEvent: state.appointment.allDayEvent,
  events: state.appointment.events,
  bearerToken: state.loginReducer.bearerToken,
});

export default connect(mapStateToProps, {
  setEvents, setEvent, setActionTime, setIndex,
})(Appointment);
