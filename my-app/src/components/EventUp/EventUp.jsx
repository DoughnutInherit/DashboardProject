/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { setEvents, setIndex, setEvent } from '../../actions/actionAppointment';
import './EventUp.css';

class EventUp extends Component {
  static propTypes = {
    history: PropTypes.object,
    event: PropTypes.object,
    setEvent: PropTypes.func,
    events: PropTypes.array,
    setEvents: PropTypes.func,
    index: PropTypes.number,
    setIndex: PropTypes.func,
  }

  navigate = () => {
    this.props.history.push('Dashboard');
  }

  componentDidMount = () => {
    const now = moment();
    const eventTimeEnd = moment(this.props.events[this.props.index].departureDate);
    const timeRemeaning = eventTimeEnd.diff(now);
    this.timer = setTimeout(() => {
      this.navigate();
    }, timeRemeaning);
  }

  componentWillUnmount = () => {
    if (this.props.index < this.props.events.length) {
      this.props.setIndex(this.props.index + 1);
      this.props.setEvent(this.props.events[this.props.index]);
    }
    clearTimeout(this.timer);
  }

  render() {
    debugger;
    return (
      <div class="row alertContainer">
        <div class="col titleStyle">
          <h1>
            ¡
            {this.props.event.title}
            !
          </h1>
        </div>
        <div class="w-100" />
        <div class="col descriptionStyle">
          <p>{this.props.event.description}</p>
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
  setEvents, setIndex, setEvent,
})(EventUp);
