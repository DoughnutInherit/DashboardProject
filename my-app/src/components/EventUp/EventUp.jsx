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
    if (this.props.index < this.props.events.length && this.props.event.description !== this.props.allDayEvent.description) {
      this.props.setIndex(this.props.index + 1);
    }
    clearTimeout(this.timer);
  }

  render() {
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
  index: state.appointment.eventIndex,
  event: state.appointment.event,
  events: state.appointment.events,
  actionTime: state.appointment.actionTime,
  allDayEvent: state.appointment.allDayEvent,
});

export default connect(mapStateToProps, {
  setIndex,
})(EventUp);
