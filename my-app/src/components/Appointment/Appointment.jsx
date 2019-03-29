import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  setEvents, setEvent, setIndex, setActionTime,
} from '../../actions/actionAppointment';
import './Appointment.css';
import dailyInfo from '../../services/dailyInfo.json';
import {
  getDailyEvents,
  calculateUntilEventStart,
  checkNextActionTime,
  calculateUntilEventEnd,
  calculateTotalEventTime,
  calculateDifference,
  setCheckedIndex,
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
  }

  navigate = (url) => {
    this.props.history.push(url);
  }

  componentDidUpdate = () => {
    const now = moment();
    const { title } = this.props.allDayEvent;
    const { index, allDayEvent, events } = this.props;
    const alertNewEvent = checkNextActionTime(index, title, events);

    let timeRemeaning;

    debugger;
    if (title !== undefined && index <= events.length) {
      setCheckedIndex(index, this.props.setIndex);
      if (alertNewEvent) {
        if (index === 0) {
          this.props.setActionTime(calculateUntilEventEnd(events, 1, title));
        } else {
          this.props.setActionTime(calculateUntilEventEnd(events, index, title));
        }

      } else {
        this.props.setActionTime(
          calculateUntilEventStart(events, index, title, allDayEvent, this.props.setEvent),
        );
      }
      if (title !== undefined && index >= this.props.events.length) {
        this.props.setEvent(this.props.allDayEvent);
      }
      this.navigate('Event');
    } else if (alertNewEvent) {
      const endTime = moment(events[index].departureDate);
      timeRemeaning = calculateDifference(endTime, now);
      this.props.setActionTime(timeRemeaning);
      this.navigate('Event');
    } else {
      try {
        const totalEventTime = calculateTotalEventTime(index, events);
        const eventStartTime = moment(events[index].entryDate);
        const timeRemeaningToStart = this.calculateDifference(eventStartTime, now);
        this.props.setActionTime(totalEventTime);
        this.timer = setTimeout(() => {
          this.navigate('Event');
        }, timeRemeaningToStart);
      } catch (error) {
        debugger;
      }
    }
  }

  componentDidMount = () => {
    this.props.setEvents(dailyInfo.events);
    //const now = '2019-02-11';
    // const now = moment().format('YYYY-MM-DD');
    // getDailyEvents(`https://localhost:44377/api/event/${now}`)
    //   .then(response => this.props.setEvents(response));
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
});

export default connect(mapStateToProps, {
  setEvents, setEvent, setActionTime, setIndex,
})(Appointment);
