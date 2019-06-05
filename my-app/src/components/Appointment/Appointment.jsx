import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  setEvents, setEvent, setIndex, setActionTime,
} from '../../actions/actionAppointment';
import './Appointment.css';
import {
  getDailyEvents,
  calculateUntilEventStart,
  calculateUntilEventEnd,
  checkIfShowNewEvent,
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
    let timeRemeaningToStart;
    let timeRemeaningToEnd;

    debugger;
    if (events.length !== 0) {
      const checkShowNewEvent = checkIfShowNewEvent(index, events, title);
      if (title === undefined && !checkShowNewEvent) {
        if (index < events.length) {
          //Case: No ADE and Show isn't needed but still evens reminding
          timeRemeaningToStart = calculateUntilEventStart(now, moment(events[index].entryDate), title);
          timeRemeaningToEnd = calculateUntilEventEnd(now, moment(events[index].departureDate), title);
        }
      }
      else {
        //Case: Show is needed
        if (events.length === 1 && title !== undefined) {
          // Case: Only 1 ADE
          const endTime = moment(events[0].departureDate).diff(now);
          timeRemeaningToEnd = endTime;
          timeRemeaningToStart = 0;
        }
        else {
          // Case: Multiple events with ADE
          timeRemeaningToStart = calculateUntilEventStart(now, moment(events[index].entryDate), title);
          timeRemeaningToEnd = calculateUntilEventEnd(now, moment(events[index].departureDate), title);
        }
        //  Case: NO events, go Dash with DEFAULT message
      }
    }



    /*
    setear eventos timer y navegacion
    */


    // this.props.setEvent(this.props.allDayEvent);
    if (index < events.length && events.length  !== 0) {
      this.props.setActionTime(timeRemeaningToEnd);
      this.timer = setTimeout(() => {
        this.navigate('Event');
      }, timeRemeaningToStart);
    }



  }

  componentDidMount = () => {
    // this.props.setEvents(dailyInfo.events);
    const bearerToken = `Bearer ${this.props.bearerToken}`;

    const now = moment().format('YYYY-MM-DD');
    getDailyEvents(`https://localhost:5001/api/event/${now}`, bearerToken)
      .then(response => { this.props.setEvents(response); })
      .catch((err) => {
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
