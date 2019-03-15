import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { setEvents, setIndex } from '../../actions/actionAppointment';
import './Appointment.css';
import dailyInfo from '../../services/dailyInfo.json';
import getDailyEvents from '../../services/serviceWorker';

class Appointment extends Component {
  static propTypes = {
    history: PropTypes.object,
    event: PropTypes.object,
    events: PropTypes.array,
    setEvents: PropTypes.func,
    setIndex: PropTypes.func,
    index: PropTypes.number,
  }

  navigate = () => {
    this.props.history.push('Event');
  }

  componentDidUpdate = () => {
    const now = moment();
    if (this.props.event.entryDate !== undefined) {
      const eventTimeIni = moment(this.props.event.entryDate);
      const timeRemeaning = eventTimeIni.diff(now);
      this.timer = setTimeout(() => {
        this.navigate();
      }, timeRemeaning);
    }
  }

  componentDidMount = () => {
    //const now = '2019-02-11';
    const now = moment().format('YYYY-MM-DD');
    getDailyEvents(`https://localhost:44377/api/event/${now}`)
      .then(response => this.props.setEvents(response));

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
  events: state.appointment.events,
  index: state.appointment.eventIndex,
  event: state.appointment.event,
});

export default connect(mapStateToProps, {
  setEvents, setIndex,
})(Appointment);
