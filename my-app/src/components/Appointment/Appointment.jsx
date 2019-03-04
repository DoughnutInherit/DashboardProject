import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { setEvent, setTime, setEvents } from '../../actions/actionAppointment';
import './Appointment.css';
import dailyInfo from '../../services/dailyInfo.json';

class Appointment extends Component {
  static propTypes = {
    history: PropTypes.object,
    event: PropTypes.object,
    setEvent: PropTypes.func,
    currentTime: PropTypes.string,
    setTime: PropTypes.func,
    events: PropTypes.array,
    setEvents: PropTypes.func,
  }

  changePageAlert = (eventIni) => {
    const now = moment();
    const diffInSeconds = now.diff(eventIni, 'seconds');

    if (diffInSeconds === 0) {
      this.props.history.push('Event');
    }
  };

  componentWillReceiveProps = () => {

  }

  componentDidMount = () => {
    this.props.setEvents(dailyInfo.events);

    setInterval(() => {
      this.props.setTime(new Date().toString());
      this.changePageAlert(this.props.events[0].dateIni);
    }, 1000);
  };

  render() {
    if ((this.props.events[0]) !== undefined) {
      return (
        <div>
          <div>
            <h4>{this.props.events[0].title}</h4>
          </div>
          <div>
            <p>{this.props.events[0].description}</p>
            {this.props.events[0].dateIni !== undefined
              ? <p>{this.props.events[0].dateIni.toLocaleString()}</p>
              : <p />
            }
          </div>
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
  event: state.appointment.event,
  currentTime: state.appointment.time,
  events: state.appointment.events,
});

export default connect(mapStateToProps, {
  setEvent, setTime, setEvents,
})(Appointment);
