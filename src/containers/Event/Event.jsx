/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EventUp from '../../components/EventUp/EventUp';
import {
  setEvent
} from '../../actions/actionAppointment';
import moment from 'moment';
import './Event.css';

class Event extends Component {
  static propTypes = {
    history: PropTypes.object,
    events: PropTypes.array,
    allDayEvent: PropTypes.object,
    actionTime: PropTypes.number,
    setEvent: PropTypes.func,
  };

  navigate = () => {
    this.props.history.push('Dashboard');
  }

  setTimeoutEvents = (event) => {
    const now = moment();

    this.timer = setTimeout(() => {
      this.props.setEvent(event);
      setTimeout(() => { this.props.setEvent(this.props.allDayEvent); }, moment(event.departureDate).diff(moment()))
    }, moment(event.entryDate).diff(now));

  }

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  }

  componentDidMount = () => {
    const { allDayEvent } = this.props;

    if (Object.entries(allDayEvent).length > 0) {

      this.props.events.shift();
      this.props.setEvent(this.props.allDayEvent);

      for (let index = 0; index < this.props.events.length; index++) {
        this.setTimeoutEvents(this.props.events[index]);
      }

    } else {
      this.timer = setTimeout(() => {
        this.navigate();
      }, this.props.actionTime);

    }

  }


  render() {
    return (
      <div className="background">
        <div className="container-fluid containerAlert opac">
          <EventUp history={this.props.history} />
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  events: state.appointment.events,
  index: state.appointment.eventIndex,
  allDayEvent: state.appointment.allDayEvent,
  actionTime: state.appointment.actionTime,
});

export default connect(mapStateToProps, {
  setEvent
})(Event);
