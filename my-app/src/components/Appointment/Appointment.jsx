import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  setEvents, setIndex, setEvent, setActionTime,
} from '../../actions/actionAppointment';
import './Appointment.css';
import dailyInfo from '../../services/dailyInfo.json';
import getDailyEvents from '../../services/serviceWorker';

class Appointment extends Component {
  static propTypes = {
    history: PropTypes.object,
    event: PropTypes.object,
    events: PropTypes.array,
    setEvents: PropTypes.func,
    setEvent: PropTypes.func,
    setIndex: PropTypes.func,
    index: PropTypes.number,
    allDayEvent: PropTypes.object,
    setAllDayEvent: PropTypes.object,
    setActionTime: PropTypes.func,
  }

  navigate = () => {
    this.props.history.push('Event');
  }

  nextEvent = () => {
    debugger;
    if (this.props.index >= this.props.events.length) {
      debugger;
      return 0;
    }
    if (this.props.index === 0) {
      return 1;
    }
    return this.props.index;
  }

  checkNextActionTime = () => {
    // Aqui miro si haz que avisar de un evento o no mirando si
    //  el iempo qeu queda para que empieye es superior a 0
    const now = moment();
    let check = false;
    const indexAux = this.nextEvent();
    debugger;
    if (this.props.index !== 0) {
      let eventTimeIni;
      if (indexAux === 0) {
        eventTimeIni = moment(this.props.events[indexAux].departureDate);
      } else {
        eventTimeIni = moment(this.props.events[indexAux].entryDate);
      }
      const timeRemeaning = eventTimeIni.diff(now);
      if (timeRemeaning <= 0) {
        check = true;
      }
    }
    return check;
  }

  calculateUntilEventEnd = () => {
    // En caso de que se tenga que avisar de un evento
    debugger;
    const now = moment();
    this.props.setEvent(this.props.events[this.props.index]);
    const actionTime = moment(this.props.events[this.props.index].departureDate);
    const timeRemeaning = actionTime.diff(now);
    return timeRemeaning;
  }

  calculateUntilEventStart = () => {
    // En caso de que no se tenga que avisaar z tengamos que esperar a que empieze uno
    const now = moment();
    const indexAux = this.nextEvent();
    this.props.setEvent(this.props.allDayEvent);
    let actionTime;
    if (indexAux === 0) {
      actionTime = moment(this.props.events[indexAux].departureDate);
    } else {
      actionTime = moment(this.props.events[indexAux].entryDate);
    }

    const timeRemeaning = actionTime.diff(now);
    return timeRemeaning;
  }

  componentDidUpdate = () => {
    debugger;
    if (this.props.allDayEvent !== undefined) {
      const alertNewEvent = this.checkNextActionTime();
      if (alertNewEvent) {
        this.props.setActionTime(this.calculateUntilEventEnd());
      } else {
        this.props.setActionTime(this.calculateUntilEventStart());
      }
      this.navigate();
    } else {
      this.timer = setTimeout(() => {
        this.navigate();
      }, this.calculateUntilEventEnd());
    }
  }

  // componentDidUpdate = () => {
  //   const now = moment();
  //   if (this.props.event.entryDate !== undefined) {
  //     debugger;
  //     if (this.props.allDayEvent !== undefined) {
  //       this.props.setEvent(this.props.allDayEvent);
  //       this.navigate('Event');
  //     } else {
  //       //NO ESNEÑA EVENTO
  //       const eventTimeIni = moment(this.props.event.entryDate);
  //       const timeRemeaning = eventTimeIni.diff(now);
  //       this.timer = setTimeout(() => {
  //         this.navigate('Event');
  //       }, timeRemeaning);
  //     }
  //   }
  // }

  componentDidMount = () => {
    debugger;
    //const now = '2019-02-11';
    // const now = moment().format('YYYY-MM-DD');
    // getDailyEvents(`https://localhost:44377/api/event/${now}`)
    //   .then(response => this.props.setEvents(response));


    this.props.setEvents(dailyInfo.events);
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
          <p className="eventDescription">{this.props.event.description}</p>
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
  setEvents, setIndex, setEvent, setActionTime,
})(Appointment);
