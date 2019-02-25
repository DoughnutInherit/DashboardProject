import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEvent, setTime, setEvents } from '../../actions/actionAppointment';
import './Appointment.css';
import dailyInfo from '../../services/dailyInfo.json';

class Appointment extends Component {
  static propTypes = {
    event: PropTypes.object,
    setEvent: PropTypes.func,
    currentTime: PropTypes.string,
    setTime: PropTypes.func,
    events: PropTypes.array,
    setEvents: PropTypes.func,
  }

  changePageAlert = (currentTime, eventIni) => {

  };

  componentWillReceiveProps = () => {

  }

  componentDidMount = () => {
    this.props.setEvents(dailyInfo.events);

    setInterval(() => {
      this.props.setTime(new Date().toString());
    }, 1000);
  };

  render() {
    debugger;
    return (
      <div>
        <div>
          <h4>{this.props.events[0].title}</h4>
        </div>
        <div>
          <p>{this.props.events[0].description}</p>
          {this.props.events[0].datIni !== undefined
            ? <p>{this.props.events[0].datIni.toLocaleTimeString('en-US')}</p>
            : <p />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  event: state.appointment.event,
  currentTime: state.appointment.time,
  events: state.appointment.events,
});

export default connect(mapStateToProps, {
  setEvent, setTime, setEvents,
})(Appointment);
