import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { setEvents, setIndex } from '../../actions/actionAppointment';
import './Appointment.css';
import dailyInfo from '../../services/dailyInfo.json';

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
    if (this.props.event.dateIni !== undefined) {
      const eventTimeIni = moment(this.props.event.dateIni);
      const timeRemeaning = eventTimeIni.diff(now);
      this.timer = setTimeout(() => {
        this.navigate();
      }, timeRemeaning);
    }
  }

  componentDidMount = () => {
    this.props.setEvents(dailyInfo.events);
  };

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div>
        <div>
          <h4>{this.props.event.title}</h4>
        </div>
        <div>
          <p>{this.props.event.description}</p>
          {this.props.event.dateIni !== undefined
            ? <p>{this.props.event.dateIni.toLocaleString()}</p>
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
