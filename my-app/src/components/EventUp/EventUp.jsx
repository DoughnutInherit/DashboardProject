/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setIndex } from '../../actions/actionAppointment';
import './EventUp.css';

class EventUp extends Component {
  static propTypes = {
    history: PropTypes.object,
    event: PropTypes.object,
    events: PropTypes.array,
    actionTime: PropTypes.number,
    index: PropTypes.number,
    setIndex: PropTypes.func,
    allDayEvent: PropTypes.object,
  }

  navigate = () => {
    this.props.history.push('Dashboard');
  }

  componentDidMount = () => {
    this.timer = setTimeout(() => {
      this.navigate();
    }, this.props.actionTime);
  }

  componentWillUnmount = () => {
    const {
      index, events, event, allDayEvent,
    } = this.props;
    if ((index < events.length && event.title  !== allDayEvent.title)  || (event.title  === allDayEvent.title && index === 0)) {
      this.props.setIndex(this.props.index + 1);
    }
    clearTimeout(this.timer);
  }

  render() {
    const { event } = this.props;
    return (
      <div class="row alertContainer">
        <div class="col titleStyle">
          <h1>
            ¡
          {event.title}
            !
          </h1>
        </div>
        <div class="w-100" />
        <div class="col descriptionStyle">
          <p>{event.description}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  index: state.appointment.eventIndex,
  event: state.appointment.event,
  events: state.appointment.events,
  actionTime: state.appointment.actionTime,
  allDayEvent: state.appointment.allDayEvent,
});


export default connect(mapStateToProps, {
  setIndex,
})(EventUp);
